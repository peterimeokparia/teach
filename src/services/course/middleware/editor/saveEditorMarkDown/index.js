import {
handleEditorFullTextSearchContent } from 'services/course/middleware/fullTextSearches/indexMarkDownContent';

export const saveEditorMarkDown = ( store, editorObject, contentType, markDownContent, pageUrl ) => { 

    if ( !editorObject ) { console.warn('no editorObject'); return; };

    handleEditorFullTextSearchContent( store, editorObject?.element, editorObject?.route, contentType, markDownContent, pageUrl ); 
}