import HelpIcon from '@material-ui/icons/Help';
import ListItem from 'services/course/pages/components/ListItem';
import QuestionOutcomeComponent from 'services/course/pages/FormBuilder/FormQuestions/components/QuestionOutcomeComponent';
import OutcomeChartSidePanel from 'services/course/pages/Charts/components/OutcomeChartSidePanel';
import  'services/course/pages/components/styles/course_detail_styles/style.css';
import  'services/course/pages/components/styles/course_detail_outcome_styles/style.css';
import  'services/course/pages/components/styles/sidebar_styles/style.css';

const CourseDisplayViewOutcomeComponent = ({ displayProps, courseDisplayProps, onMatchListItem }) => {
    let {
        concepts,toggleLessonOutcomeInsightModal,outcomes, toggleConcepts, currentOutcome
    } = courseDisplayProps;

    let { 
        lessonItem, updateQuestionOutcomeId,
    } = displayProps;
    
return <> 
    <div className="sidebar-2"> 
    { concepts &&
        <div>
            <ListItem
                collection={ outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonItem?._id  ) }
                onMatchListItem={onMatchListItem}
                ul={'sidebar_list'}
                li={'sidebar_list_body'}
                path={"lessons"}
            >
            {( outcome, index ) => (
                <QuestionOutcomeComponent 
                    outcome={outcome}
                    index={index}
                    handleOnBlur={() => toggleConcepts}
                >
                {( outcome ) => 
                    <HelpIcon 
                        onClick={() => { updateQuestionOutcomeId(outcome) }}
                        color="action"
                        className="comment-round-button-4"
                    /> 
                }
                </QuestionOutcomeComponent>  
            )}
            </ListItem>  
        </div>       
        }
    </div>    
    <div className="sidebar-3"> 
    { ( lessonItem && toggleLessonOutcomeInsightModal ) && 
        <OutcomeChartSidePanel outcome={currentOutcome}/> 
    } 
    </div>  
    </>
}

export default CourseDisplayViewOutcomeComponent;