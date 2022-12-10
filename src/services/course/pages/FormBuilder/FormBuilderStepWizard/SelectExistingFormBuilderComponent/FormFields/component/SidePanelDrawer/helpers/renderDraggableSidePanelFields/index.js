import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldsByFormFieldId } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { saveDraggableIconStyle } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';
import { getFieldInputStyle } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer/helpers';

import SaveIcon from '@material-ui/icons/Save';
import Swal from 'sweetalert2';

function renderDraggableSidePanelFields( props ) {
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

export default renderDraggableSidePanelFields;