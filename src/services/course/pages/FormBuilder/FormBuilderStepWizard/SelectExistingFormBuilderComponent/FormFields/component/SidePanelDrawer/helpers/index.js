import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldsByFormFieldId } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { saveDraggableIconStyle } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';
import SaveIcon from '@material-ui/icons/Save';
import Swal from 'sweetalert2';
import './style.css';

export function renderExplanationSidePanelFields( props ){
    let {
      fieldProps,
      fieldRef,
      previewMode,
      fieldAnswer,
      formFieldElement,
      openDrawer,
      setOpenDrawer,
      selectedQuestion,
      points,
      addExplanationQuestionFieldPoints,
      addExplanationAnswerFieldPoints,
      saveFormFieldAnswerWithPoints } = props;
    let {
      formBuilderState,
      formBuilderStatus
     } = fieldProps;

    function getExplanationAnswerPoint(){
      return ( formBuilderState === elementMeta.state.Taking || 
        [ elementMeta.status.Reviewing,  elementMeta.status.Reviewed ].includes( formBuilderStatus ) )
        ? ( ( fieldAnswer?.points < 0 ) ? '' : fieldAnswer?.points?.toString() )  
        : '';
    }

    async function assignAnswerPoints() {
      if ( !previewMode  ) {
        handleAssigningPoints( 'Assign Points', formFieldElement );
      }

      if ( previewMode  ) {
        Swal.fire({
          title: 'Deduct points?',
          icon: 'question',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `Cancel`,
        }).then((result) =>  {
          if ( result.isConfirmed ) {
            handleAssigningPoints( 'Deduct Points', formFieldElement );
          } else if (result.isDenied) {
            Swal.fire('No points assigned', '', 'info');
          }
        });
      }

      async function handleAssigningPoints( title, formElement ){
        const { value: inputValue } = await Swal.fire({
          title,
          icon: 'info',
          showCancelButton: true,
          input: 'range',
          inputLabel: 'Points',
          inputAttributes: {
              min: 1,
              max: parseInt( formElement?.labelValue, 10 ),
              step: 1
            },
            inputValue: parseInt( formElement?.labelValue, 10 )
        });

        if ( inputValue ) {
          if ( !previewMode ) {
            addExplanationAnswerFieldPoints( inputValue );
            if ( fieldAnswer?.points > 0 ) {
              let points = fieldAnswer?.points + parseInt( inputValue, 10 );
              let copy = { ...fieldAnswer, points, answer: points?.toString() }; 

              saveFormFieldAnswerWithPoints( copy );
            }
          }

          if ( previewMode ) {
            addExplanationAnswerFieldPoints( ( -inputValue ) );
            if ( fieldAnswer?.points > 0 ) {
              let points = ( fieldAnswer?.points-parseInt( inputValue, 10 ) );
              let copy = { ...fieldAnswer, points, answer: points?.toString()}; 

              saveFormFieldAnswerWithPoints( copy );
            }
          }
        }
      }
    }

    return <>
        { ( formFieldElement.inputType === inputType.ExplanationAnswerEditor ) &&
         <>
         { ( previewMode ) 
            ? <span className={ ( previewMode && formFieldElement.selected ) ? `field-input-selected` : `field-input`}>  
                <span onClick={() => setOpenDrawer( !openDrawer )}> 
                  <input
                    ref={ formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                    type={"number"}
                    value={ points }
                    onChange={e => addExplanationQuestionFieldPoints( e.target.value )}
                  />  
                </span>
              </span>
            : <label 
                className={ 'explanation-label-test-selected' } 
                for={ formFieldElement?._id }
                onClick={() => addExplanationAnswerFieldPoints( parseInt( formFieldElement?.labelValue, 10 ))}
              > 
                {/* { formFieldElement?.labelValue }  */}
                { formFieldElement?.points } 
              </label>  
          }
          { 
            <span className={ ( previewMode && formFieldElement.selected ) ? `field-input-selected` : `explanation-field-input`}>  
              <span onClick={() => assignAnswerPoints()}> 
                <input
                  ref={ formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                  type={"text"}
                  value={ getExplanationAnswerPoint() } 
                />  
              </span>
            </span>
          }
       </>
        }
    </>;
}

export function renderDraggableSidePanelFields( props ) {
    let {
        fieldProps,
        fieldRef,
        previewMode,
        formFieldElement,
        openDrawer,
        setOpenDrawer,
        selectedQuestion,
        saveFormField,
    } = props;

    let {
      itemMoved,
      setItemMoved,
      handleFieldMoved,
      formBuilderState,
      selectedFormField,
    } = fieldProps;

    function setDraggableAnswerKey( formFieldElement ){
      if ( previewMode && formBuilderState === elementMeta.state.Manage ) {
        saveFormField({ ...formFieldElement,  answerKey: formFieldElement?.position.toString() });
        loadFormFieldsByFormFieldId( formFieldElement );
        setOpenDrawer( !openDrawer );
      }
    } 

    function saveItemMoved( ){
      if ( formFieldElement?.selected && !previewMode ) {
          Swal.fire({
            title: 'This item has already been saved.',
            icon: 'warning',
            html: "<div>Item already saved.</div>",
            showCancelButton: false,
            confirmButtonText: 'Back',
            cancelButtonText: 'Do not save item'
          }).then( (response) => {
            if ( response?.value ) {  
              console.log('item saved');
            } 
          });
        return;
      }
     
      Swal.fire({
        title: 'Save item',
        icon: 'question',
        html: "<div>Save Item.</div>",
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: `Move. Don't save.`
      }).then( (response) => {
        if ( response?.value ) {  
          let copy = { ...formFieldElement, selected: true }; 

          handleFieldMoved( copy );
        } else {
          if ( itemMoved ) {
            setItemMoved( false );
          }
        }
      });
    }
    
    return <> 
        { (formFieldElement.inputType === inputType.DraggableListItem ) &&
          <>
             {  ( formFieldElement._id === selectedFormField?._id && !previewMode ) 
                    ? <span onClick={() => saveItemMoved()}>
                      <span className={ ( formFieldElement.selected ) ? getFieldInputStyle(formFieldElement.inputType)?.unselected : getFieldInputStyle(formFieldElement.inputType)?.selected}>  
                        <input
                          ref={ formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                          type={"number"}
                          value={ formFieldElement?.position }
                          disabled={ ( formBuilderState === elementMeta.state.Taking && formFieldElement?.selected )  }
                      /> 
                      </span>
                      {( !formFieldElement?.selected ) && 
                        <SaveIcon 
                          style={ saveDraggableIconStyle() }
                          className="lesson-plan-round-button-4"
                          onClick={ () => saveItemMoved() }
                        />  
                      } 
                      </span> 
                    :  <span className={ ( formFieldElement.selected ) ? getFieldInputStyle(formFieldElement.inputType)?.unselected : getFieldInputStyle(formFieldElement.inputType)?.selected}>  
                        <span onClick={() => setDraggableAnswerKey( formFieldElement )}> 
                          <input
                            ref={ formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                            type={"number"}
                            value={ formFieldElement?.position }
                            disabled={ ( formBuilderState === elementMeta.state.Taking && formFieldElement?.selected ) }
                          />  
                        </span>
                      </span>
             }
          </>
        }       
    </>; 
}

export function renderInputSidePanelFields( props ){
    let {
        fieldRef,
        previewMode,
        formFieldElement,
        openDrawer,
        setOpenDrawer,
        selectedQuestion,
        inputValue,
        setInputValue,
        handleChangedValue,
        saveFormField,
    } = props;

    return <> 
        {( previewMode && ![ inputType?.ExplanationAnswerEditor, inputType?.DraggableListItem ].includes( formFieldElement?.inputType )  ) && 
            <span className={ ( previewMode && formFieldElement.selected ) ? getFieldInputStyle(formFieldElement.inputType)?.unselected : getFieldInputStyle(formFieldElement.inputType)?.selected}> 
                <span onClick={() => setOpenDrawer( !openDrawer )}>
                <input
                    ref={ formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                    type={"text"}
                    value={inputValue}
                    onChange={e => handleChangedValue( e.target.value, setInputValue, { ...formFieldElement, inputValue: e.target.value }, saveFormField )}
                    placeholder={formFieldElement?.inputValue} 
                />  
                </span>  
            </span>
        }
    </>;
}


function getFieldInputStyle( inputtype ){
  if ( inputtype === inputType.CheckBox ) 
  return { unselected: 'field-input-checkbox', selected: 'field-input-checkbox-selected'  };
  
  return { unselected: 'field-input', selected: 'field-input-selected'  }
}

export function renderDropDownSidePanelFields( props ){
  let {
      fieldRef,
      previewMode,
      formFieldElement,
      openDrawer,
      setOpenDrawer,
      selectedQuestion,
      inputValue,
      setInputValue,
      handleChangedValue,
      saveFormField,
  } = props;  
  return <> 
      {( previewMode && formFieldElement?.inputType && inputType.DropDown) && 
          <span className={ ( previewMode && formFieldElement.selected ) ? getFieldInputStyle(formFieldElement.inputType)?.unselected : getFieldInputStyle(formFieldElement.inputType)?.selected}> 
              <span onClick={() => setOpenDrawer( !openDrawer )} />
          </span>
      }
  </>;
}