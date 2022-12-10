import { connect } from 'react-redux';
import { getTertiarySectionData  } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import MyEditorTest3 from 'services/course/editor/MyEditorTest3';
import './style.css';

const CourseLessonOutcomesQuestionListComponent = ({ pieChartData, lessons, formBuilders, onlineQuestions, studentQuestionInsights  }) => {
    
  let { courseOutcomes, mainHeaderOutcomeTitle, lessonLabelTitle, courseOutcomeInsights } = pieChartData;

  let lessonItem = lessons?.find(item => item?.title.toLowerCase() === lessonLabelTitle?.toLowerCase() );

  let lessonOutcomes = null;

  if ( lessonItem ) {
    lessonOutcomes = courseOutcomes?.filter( item => item?.lessonId === lessonItem?._id );
  }

  let { _id, formType, formName, outcomeId, courseId, lessonId, userId  } = courseOutcomeInsights?.find(item => item?.formType?.toLowerCase()?.trim() === mainHeaderOutcomeTitle?.toLowerCase()?.trim()) || {};

  let questionList, formBuilder, questions;
  if (formType, formName, outcomeId, userId ) {
    
      questionList = studentQuestionInsights?.filter( item => item?.outcomeId === outcomeId && item?.formType === formType )?.map(item => item?.questionId );
    
      formBuilder = formBuilders?.filter( item => item?.formName === formName && item?.userId === userId );

    if ( questionList?.length > 0 ) {
      questions = onlineQuestions?.filter(item => questionList.includes( item?._id ));
    }
  }

 return <div> 
 <div>
   {  questions && questions?.map(question => {
     return <div> 
         <div className={`course-question-tertiary-sidepanel-main`}>
           {<div className={'course-question-tertiary-sidepanel'}>
               {<div style={{background: 'white' }}>
               {
                  <MyEditorTest3  
                    element={ question } 
                    content={ question?.markDownContent } 
                    readOnly={ true }
                    showMenuButtons={ false  } 
                  />
                }
                <div className='row justify-content-center'>
                  { <> 
                    {  
                      [{}, {}, {}].map(( data ) =>  getTertiarySectionData( data ) ) 
                     
                      }
                    </>
                  }
                </div>
                </div>
               }
             </div>
           }
       </div>
       </div>
     })
   }
 </div>
</div>
}

const mapState = ( state ) => ({
  currentUser: state?.users?.user,
  lessons: Object?.values(state?.lessons?.lessons),
  outcomes: Object?.values(state?.outcomes?.outcomes),
  outcomeInsights: Object?.values(state?.outcomeInsights?.outcomeInsights),
  toggleLessonOutcomeInsightModal: state?.outcomeInsights?.lessonOutcomeInsightModal,
  formBuilders: Object?.values( state?.formBuilders?.formBuilders ),
  studentQuestionInsights: Object.values( state?.studentQuestionInsights?.studentQuestionInsights ),
  onlineQuestions:  Object.values(state.onlineQuestions.onlineQuestions),
});

export default connect(mapState,null)(CourseLessonOutcomesQuestionListComponent);