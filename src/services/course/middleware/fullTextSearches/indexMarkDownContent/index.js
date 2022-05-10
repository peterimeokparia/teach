import {
update,
getById,
addEditorFullTextSearchContent,
saveEditorContent } from 'services/course/api';

export function handleEditorFullTextSearchContent( store, element, route, contentType, markDownContent, pageUrl, duration = 5000) {
   const saveEditorContentHandle = setTimeout(() => {
       update( element, route )
       .then( response1 => { 
         handleFullTextSearchMarkDownContent( element, contentType,  markDownContent, pageUrl );
         handleFullTextSearchTextContent( element, contentType, markDownContent, pageUrl );
         clearTimeout( saveEditorContentHandle );
         //return response1;
       })
       .catch( error => { console.warn( JSON.stringify( error )) 
         //return error;
       });
   }, duration, store );
 }

function handleFullTextSearchMarkDownContent( element, contentType, markDownContent, pageUrl ){

   let fullTextSearchContent = null;
   if ( markDownContent && ( !markDownContent?.rows ) && typeof( markDownContent ) === 'string'  ) return;

      fullTextSearchContent = markDownContentFullTextSearch( markDownContent );
      saveFullTextSearchContent( element, contentType, fullTextSearchContent, pageUrl );
}

function handleFullTextSearchTextContent( element, contentType, textContent, pageUrl ) {

   if ( typeof(textContent !== 'string') || textContent?.rows !== undefined ) return;

   saveFullTextSearchContent(  element, contentType, textContent, pageUrl );
}

function saveFullTextSearchContent( element, contentType, fullTextSearchContent, pageUrl ) {
   getById( element?._id, `/fulltextsearch?contentId=`)
      .then( response => {
         if ( response?.length > 0 && response.find(item => item?.contentId === element?._id)  ) {
            let upatedResponse = response.find(item => item?.contentId === element?._id);
            upatedResponse[contentType] = fullTextSearchContent;
            saveEditorContent( upatedResponse, '/fulltextsearch/'); 
         } else {
            addEditorFullTextSearchContent(fullTextSearchItem( element, contentType, fullTextSearchContent, pageUrl ), '/fulltextsearch', 2000);
         }
      })
      .catch( error => { console.warn( error )});
}

function fullTextSearchItem( element, contentType, fullTextSearchContent,  pageUrl ){

   let fullTextSearchItemObject = {
      contentId: element?._id,
      modelNamePrimary: "",
      modelNameSecondary: "",
      formType: element?.formType,
      formName: element?.formName,
      formUuId: element?.formUuId,
      type: element?.inputType,
      fullTextSearchContent: "",
      fullTextSearchMarkDownContent: "",
      fullTextSearchExplanationMarkDownContent: "",
      route: pageUrl, 
      dateFirstIndexed: Date.now(),
      userId: element?.userId,
      operatorId: sessionStorage.getItem('operator')?._id
   }

   fullTextSearchItemObject[contentType] = fullTextSearchContent;
   return fullTextSearchItemObject;
}

   let newText = "";

function findFullTextSearchMarkDownContentText( cellBlock ){
  if ( cellBlock?.dataI18n?.default?.slate ) { 
    let textBlock = Object.values( cellBlock?.dataI18n?.default?.slate )?.find( child => Object.values(child))?.children?.find(child => Object.values(child));
    if ( textBlock ) {
      newText += textBlock?.text ;
    }
  }
}

function findMarkDownContentRowCellFields(row){
  return Object.values(row["cells"]).find(cell => Object.values(cell));
}

export function markDownContentFullTextSearch( markDownObject ){
      newText = "\n";
   markDownObject?.rows?.filter(row => Object.values(row))?.
      map(row => {
         findFullTextSearchMarkDownContentText(findMarkDownContentRowCellFields(row));
      });
      return newText;
}

export function buildSearchContent( ...args ) {

   if ( arguments?.length === 0 ) return;

   let searchContent = "";

   let argumentArray = args.map( (item, index) =>  { 
         searchContent += ` ${item} `;
      });
   return searchContent;
}


 