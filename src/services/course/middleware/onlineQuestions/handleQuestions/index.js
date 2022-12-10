import { getSortedRecordsByPosition } from 'services/course/selectors';
import { handleAddingNewOnlineQuestion, handleCopyingExistingQuestion } from 'services/course/middleware/onlineQuestions/handleQuestions/helpers';
import { addNewOutcome, saveOutcome, loadOutcomes, deleteOutcome, setOutcomeLink, setSelectedOutcome, toggleConcepts } from 'services/course/actions/outcomes';
import { setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import { addNewFormBuilder, saveFormBuilder } from 'services/course/actions/formbuilders';

export function addNewQuestion( store, props ) {

    let {  currentCourseQuestions, onlineQuestionsConfig } = props;

    let { formUuId } = onlineQuestionsConfig;

    let formQuestions = null, sortedRecords = null, sortedRecordsLength = null, position = 1;

    try {
        formQuestions = formQuestions ?? currentCourseQuestions?.filter( question => question.formUuId === formUuId );
        sortedRecords = sortedRecords ?? getSortedRecordsByPosition( formQuestions, 'position' );
        sortedRecordsLength = sortedRecords?.length;
        position = ( !formQuestions || formQuestions?.length === 0  ) ? position : (sortedRecords[ sortedRecordsLength-1 ]?.position)+1;
        //handleCopyingExistingQuestion( store, props );
        handleAddingNewOnlineQuestion( store, props );

    } catch ( error ) {

        console.log( error ); 
       // handleCopyingExistingQuestion( store, props );
        handleAddingNewOnlineQuestion( store, props );
    }
} 

export function goToSelectedQuestion( store, props ) {
    let { dispatch } = store;

    let { outcome, question, formBuilders, currentUser, formType, formBuilderState, formBuilderStatus  } = props;

    dispatch( setSelectedOutcome( outcome ));
    dispatch( setSelectedOnlineQuestion( question ) );

    let formBuilder = formBuilders?.find( builder => builder?.formName === outcome?.outcomeName && 
        builder?.userId === currentUser?._id && 
          builder?.formType === formType );

    if ( formBuilder ) {
        dispatch( saveFormBuilder({ ...formBuilder, state: formBuilderState, status: formBuilderStatus }) );
    }
}