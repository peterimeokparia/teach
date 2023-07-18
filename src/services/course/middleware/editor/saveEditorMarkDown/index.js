import { handleEditorFullTextSearchContent } from 'services/course/middleware/fullTextSearches/indexMarkDownContent';
import { setSelectedOnlineQuestion, SET_ONLINEQUESTION_MARKDOWN } from 'services/course/actions/onlinequestions';
import { SET_EXPLAINER_ANSWER_MARKDOWN } from 'services/course/actions/onlinequestionexplainanswer';
import { SET_FORMFIELDANSWERS_MARKDOWN } from 'services/course/actions/formfieldanswers';
import { SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';
import { setMarkDown } from 'services/course/actions/editor';

export const saveEditorMarkDown = ( store, editorObject, contentType, markDownContent, pageUrl ) => { 
    if ( !editorObject ) { console.warn('no editorObject'); return; };
    handleEditorFullTextSearchContent( store, editorObject?.element, editorObject?.route, contentType, markDownContent, pageUrl ); 
};

export const setCurrentEditorQuestion = ( store, question ) => {
    store.dispatch( setSelectedOnlineQuestion( question ) );
};

export const handleSavingQuestionEditorContent = ( store, editor ) => {
    let { question, markDownContent, saveContentInterVal } = editor;

    store?.dispatch( setMarkDown(  SET_ONLINEQUESTION_MARKDOWN, `/onlinequestions/content/`, { ...question, markDownContent }, saveContentInterVal  ) );
};

export const handleSavingExplainerAnswerQuestionEditorContent = ( store, editor ) => {
    let { question, markDownContent, saveContentInterVal } = editor;

    store?.dispatch( setMarkDown(  SET_EXPLAINER_ANSWER_MARKDOWN, `/onlinequestionexplainanswer/content/`, { ...question, markDownContent }, saveContentInterVal  ) );
};

export const handleSavingFormFieldEditorContent = ( store, editor ) => {
    let { formField, markDownContent, saveContentInterVal } = editor;

    store?.dispatch( setMarkDown(  SET_FORMFIELDS_MARKDOWN, `/formfields/content/`, { ...formField, markDownContent }, saveContentInterVal  ) );
};

export const handleSavingFormFieldAnswersEditorContent = ( store, editor ) => {
    let { formField, markDownContent, saveContentInterVal } = editor;

    store?.dispatch( setMarkDown(  SET_FORMFIELDANSWERS_MARKDOWN, `/formfieldanswers/content/`, { ...formField, markDownContent }, saveContentInterVal  ) );
};

  