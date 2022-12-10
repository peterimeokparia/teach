import { connect } from 'react-redux';
import { mapDispatch, mapState } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/connectors';
import { getStyles } from 'services/course/pages/FormBuilder/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { getTertiarySectionData  } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import 'services/course/pages/FormBuilder/formStyles/quizz/style.css';
import 'services/course/pages/FormBuilder/formStyles/report/style.css';
import './style.css';

const QuestionInsightsComponent = ({ 
    operatorBusinessName,
    courseId,
    lessonId,
    previewMode,
    form,
    toggleSetPreviewMode,
    currentUser,
    selectedFormField,
    setDraggableFormFields,
    setSelectedFormField,
    modalProps,
    missedQuestions,
}) => {
    let { userId, formUuId, formId, question, formType, formName, formBuilderState, formBuilderStatus, eventId } = form; 
return (
      <div className={getStyles( formType )?.builder } style={{ 'backgroundColor': missedQuestions?.find(ans => ans?._id === question?._id) && 
        ( formBuilderStatus === elementMeta.status.Reviewed || formBuilderStatus === elementMeta.status.Review )  
          ? "#C8FDC8" 
          :"#ffa500" 
        }} 
      >
          "#d2e3f7"
      <div className="headerboundry2"/>
      <div className="answerEditorBuilder2" style={{ 'backgroundColor': missedQuestions?.find(ans => ans?._id === question?._id) && 
        ( formBuilderStatus === elementMeta.status.Reviewed || formBuilderStatus === elementMeta.status.Review )  
          ? "#C8FDC8" 
          :"#ffa500" 
        }}>
      <div className="listItem">
      <div className={`row course-tertiary-sidepanel`}>
      <div className={'course-insights-data'} style={{ 'backgroundColor': missedQuestions?.find(ans => ans?._id === question?._id) && 
        ( formBuilderStatus === elementMeta.status.Reviewed || formBuilderStatus === elementMeta.status.Review )  
          ? "#C8FDC8" 
          :"#d2e3f7" 
        }}>
        {/* <div className={'course-insights-data-title'} onClick={() => getLessonInsights()}>
          <h4>{(!mainHeaderOutcomeTitle) ? `Hover over a data point to view data` : mainHeaderOutcomeTitle}</h4>
        </div> */}
        { 
          <div className='row justify-content-center' >
          { <> 
            { [{}, {}, {}, {}, {}].map(( data ) =>  getTertiarySectionData( data ) ) }
            </>
          }
          </div>
        }
      </div>
   </div>
      {/* <ul className={'lessons'}>
          { ['test tet test']?.map( element => (
            <div>
              <li className={'lesson-item2'}>
                <div className="question-card-top-right" /> 
                {
                    element

                }
              </li>  
            </div>
            )) 
          }
        </ul> */}
        </div>
      </div>
      </div>  
      );
  };

export default connect( mapState, mapDispatch )(QuestionInsightsComponent);    