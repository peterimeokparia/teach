import { getSortedRecordsByPosition } from 'services/course/selectors';
import { saveOnlineQuestions } from "services/course/actions/onlinequestions";
import { addNewExplainerOnlineQuestionAnswer, deleteExplainerOnlineQuestionAnswer } from "services/course/actions/onlinequestionexplainanswer";
import { deleteFormField } from 'services/course/actions/formfields';

export function addNewExplainerAnswer( store, question ){
    let explainAnswer = {...question, type: 'explainAnswer', parentId: question?._id };
    delete explainAnswer._id;
    store.dispatch( addNewExplainerOnlineQuestionAnswer( explainAnswer ) );
};

export function deleteExplainerAnswerOnQuestionDelete( store, question ){
    let explainerAnswers = Object.values(store.getState()?.onlineQuestionsExplainerAnswers?.onlineQuestionsExplainerAnswers );
    let explainerAnswer = explainerAnswers?.find( explainer => explainer?.parentId === question?._id );

    store.dispatch( deleteExplainerOnlineQuestionAnswer( explainerAnswer ) );
};

export const getFormFieldsToDelete = ( store, selectedQuestion ) => {
    let formFields = Object.values( store.getState()?.formFields?.formFields );
    let fieldsToDelete = formFields?.filter( field => field?.questionId === selectedQuestion?._id );

    if ( fieldsToDelete?.length === 0 || undefined ) return;

    try {
        fieldsToDelete?.forEach(element => {
            store.dispatch( deleteFormField( element ) );
        });
    } catch ( error ) {
        throw Error(`There was problem deleting formfields for question: ${ selectedQuestion?._id } ${ selectedQuestion }`);
    }
};

export const rePositionFormQuestionsOnDelete = ( store, selectedQuestion ) => {
   let formQuestions = store.getState()?.onlineQuestions?.onlineQuestions;
   let currentCourseQuestions = Object.values( formQuestions )?.filter( question => question.formName === selectedQuestion?.formName );

   if ( currentCourseQuestions?.length === 1 ) return;
   
   let currentQuestions = currentCourseQuestions?.filter( question => question?.formUuId === selectedQuestion?.formUuId && question?._id !== selectedQuestion?._id );
   let sortedItems = getSortedRecordsByPosition( currentQuestions, 'position' );

       sortedItems.forEach( ( element, index ) => {
           let repositionedItem = { ...element, position: ( index + 1) };

           store.dispatch( saveOnlineQuestions( repositionedItem ) );
       });

    try {
        
    } catch ( error ) {
        throw Error(`There was problem deleting formfields for question: ${ selectedQuestion?._id } ${ selectedQuestion }`);
    }
};
    