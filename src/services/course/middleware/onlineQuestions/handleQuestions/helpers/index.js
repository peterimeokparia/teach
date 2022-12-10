import { setCopyingExistingQuestion, setCopyingQuestionProperties } from 'services/course/actions/onlinequestions';
import { setIsMaxQuestionDialogOpen } from 'services/course/actions/formbuilders';
import { addNewOnlineQuestion } from 'services/course/actions/onlinequestions';
import { onlineMarkDownEditorFieldCollection, inputType } from 'services/course/pages/QuestionsPage/helpers';
import { addQuestionConfig } from 'services/course/pages/OnlineQuestionsPage/helpers';
import { toggleContentChanged, setSelectedOnlineQuestion, loadOnlineQuestions } from 'services/course/actions/onlinequestions';


export function handleCopyingExistingQuestion( store, props ) {
    let { typeOfInput, onlineQuestionProperties, questionOutcome } = props;
    let { dispatch } = store;

    if ( typeOfInput !== inputType.CopyExistingQuestion ) return;

    dispatch( setCopyingQuestionProperties({ ...onlineQuestionProperties, outcomeId: questionOutcome?._id }) );
    dispatch( setCopyingExistingQuestion( true ) );
    dispatch( setIsMaxQuestionDialogOpen( false ) );
}

export function handleAddingNewOnlineQuestion( store, props ) {
    let { config, verifyOutcome, setIsDrawerOpen, onlineQuestionProperties } = props;
    let { dispatch } = store;

    if ( !verifyOutcome( config, setIsDrawerOpen  ) ) return; 
    if ( config?.typeOfInput === inputType.CopyExistingQuestion ) return;
    
    dispatch( addNewOnlineQuestion( onlineMarkDownEditorFieldCollection( addQuestionConfig( config ))) );
    dispatch( setIsMaxQuestionDialogOpen( false ) );
    dispatch( toggleContentChanged() );
}