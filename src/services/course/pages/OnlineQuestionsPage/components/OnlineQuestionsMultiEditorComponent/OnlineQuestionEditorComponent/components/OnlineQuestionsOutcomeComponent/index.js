import ListItem from 'services/course/pages/components/ListItem';
import TemporaryDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/TemporaryDrawer';
import QuestionOutcomeComponent from 'services/course/pages/FormBuilder/FormQuestions/components/QuestionOutcomeComponent';
import HelpIcon from '@material-ui/icons/Help';

const OnlineQuestionsOutcomeComponent = ({
    onlineQuestionsConfig,
    isDrawerOpen,
    onMatchListItem,
    setIsDrawerOpen,
    setQuestionOutcome,
    toggleConcepts,
    updateQuestionOutcomeId }) => {
    let { lessonId, outcomes } = onlineQuestionsConfig;

    return <TemporaryDrawer  anchor='right' setToggleDrawer={isDrawerOpen} >
        <div>
        { <ListItem
            collection={ outcomes.filter(outcome => outcome?.lessonId === lessonId ) }
            onMatchListItem={() => onMatchListItem}
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
                        onClick={() => { updateQuestionOutcomeId(outcome, setQuestionOutcome, setIsDrawerOpen ) }}
                        color="action"
                        className="comment-round-button-4"
                    /> 
                }
            </QuestionOutcomeComponent>  
            )}
            </ListItem>  
        }
        </div>
        </TemporaryDrawer>
};
export default OnlineQuestionsOutcomeComponent;