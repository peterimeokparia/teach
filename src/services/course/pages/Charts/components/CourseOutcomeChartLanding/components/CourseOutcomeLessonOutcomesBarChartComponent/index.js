import { getTertiarySectionData  } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { borderShades } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { helpIconStyleBarQuestionPanel } from './inlineStyles.js';
import HelpIcon from '@material-ui/icons/Help';
import CourseOutcomeChartLandingSidePanel from 'services/course/pages/Charts/components/CourseOutcomeChartLandingSidePanel';
import CourseLessonOutcomesQuestionListComponent from 'services/course/pages/Charts/components/CourseOutcomeChartLanding/components/CourseLessonOutcomesQuestionListComponent';
import './style.css';

const CourseOutcomeLessonOutcomesBarChartComponent = ({ pieChartData, groupedChartProps, datasets, formTypeSelectorProp, lessons }) => {
    
  let { tertiaryData, courseOutcomes, handleToggleButton, mainHeaderOutcomeTitle, lessonLabelTitle, toggleQuestionPanel, setToggleQuestionPanel, selectedOutcome } = pieChartData;

  let { selectedMultiSelectFormTypeOptions } = formTypeSelectorProp;

  let lessonItem = lessons?.find(item => item?.title.toLowerCase() === lessonLabelTitle?.toLowerCase() );

  let lessonOutcomes = null;

  if ( lessonItem ) {
    lessonOutcomes = courseOutcomes?.filter( item => item?.lessonId === lessonItem?._id );
  }

 return <div className='col course-sidepanel'> 
 <h3>{`Pass Rate per Lesson Outcome`}</h3>
 <div>
   {  lessonOutcomes && lessonOutcomes?.map(outcome => {
     return <div> 
       {
         outcome?._id
       }
       <button className='toggleButton2' onClick={() => handleToggleButton()}>{''}</button>
       <CourseOutcomeChartLandingSidePanel 
         groupedChartProps={ groupedChartProps }
         datasets={ datasets }
         pieChartData={pieChartData}
         lessonTitle={lessonLabelTitle} 
         outcome={outcome} 
         selectedMultiSelectFormTypeOptions={selectedMultiSelectFormTypeOptions}
         classNameMain={'chartWrapperMainSidePanel'}
         classNameSub={'chartWrapperSubSidePanel'}
       />
        {( selectedOutcome?._id === outcome?._id ) && 
          <div>
            { <div className={`row course-bar-tertiary-sidepanel`}>
                  {/* <button className='toggleButton2' onClick={handleToggleButton}>{''}</button> */}
                  {( selectedOutcome?._id === outcome?._id ) &&
                    <div className={'course-insights-data'}>
                      <div className={'row course-insights-data-title'}> 
                      <h4>{`${outcome?.title} : ${mainHeaderOutcomeTitle}`}</h4>
                        <div className='col'> 
                        {/* <button className='toggleButtonQuestionPanel' onClick={()=> setToggleQuestionPanel()}>{''}</button> */}
                        <HelpIcon 
                            style={helpIconStyleBarQuestionPanel()}
                            className="comment-round-button-1"
                            onClick={() => setToggleQuestionPanel()}
                        />
                        </div> 
                      </div>
                      { ( mainHeaderOutcomeTitle ) && 
                        <div className='row justify-content-center' style={{background: borderShades( mainHeaderOutcomeTitle.toLowerCase().trim() ) }}>
                        { <> 
                          { ( toggleQuestionPanel ) 
                            ? tertiaryData.map(( data ) =>  getTertiarySectionData( data ) ) 
                            : <CourseLessonOutcomesQuestionListComponent  pieChartData={pieChartData}/> 
                           }
                          </>
                        }
                        </div>
                      }
                    </div>
                  }
                  </div> 
            } 
            </div>
        }
       </div>
     })
   }
 </div>
</div>
}

export default CourseOutcomeLessonOutcomesBarChartComponent;