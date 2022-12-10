import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldsByFormFieldId } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { saveDraggableIconStyle } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';
import SaveIcon from '@material-ui/icons/Save';
import Swal from 'sweetalert2';

function renderExplanationSidePanelFields( props ){
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
              > 
                { formFieldElement?.points } 
              </label>  
          }
          {[ elementMeta.status.Reviewing,  elementMeta.status.Reviewed ].includes( formBuilderStatus ) &&
            <div className={ ( previewMode && formFieldElement.selected ) ? `field-input-selected` : `explanation-field-input`}>  
               <span onClick={() => assignAnswerPoints()}> 
                 <input
                   ref={ formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                   type={"text"}
                   value={ getExplanationAnswerPoint() } 
                 />  
               </span>
             </div>
          }
       </>
        }
    </>;
}

export default renderExplanationSidePanelFields;