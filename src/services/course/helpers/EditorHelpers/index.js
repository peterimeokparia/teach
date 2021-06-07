export const lorem = {"blocks":[{"key":"99c5e","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit metus, interdum quis risus id, varius lacinia neque. Suspendisse eget luctus lectus. Phasellus nulla neque, dignissim semper nisi id, interdum porta lorem. Donec in justo tellus. Curabitur placerat mi neque, sed luctus lectus interdum sodales. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":26,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"29ovb","text":"Cras vel viverra ante. Mauris ac condimentum dui, et venenatis quam. Integer pellentesque convallis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pharetra mollis consequat. Vivamus rutrum libero non imperdiet consectetur. Integer auctor metus at libero fringilla","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
export const h1 = {"blocks":[{"key":"2hrar","text":"hit enter","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
export const code = {"blocks":[{"key":"cb66d","text":"How do you insert a line break in javascript?","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":45,"style":"BOLD"}],"entityRanges":[{"offset":34,"length":10,"key":0}],"data":{}},{"key":"v4mv","text":"Just finished the search function lesson and wanted to have a cleaner print-out as suggested, got this far but how do I create actual line breaks between each of the values?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"nf4m","text":"var search = function (name) {\nfor (var names in friends) {\nif (name ===  friends[names].firstName) {\n    console.log(\n        \"First Name: \"+friends[names].firstName,\n        \"Last Name: \"+friends[names].lastName,\n        \"Number: \"+friends[names].number,\n        \"Address: \"+friends[names].address );\n}\n","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":305,"style":"CODE"}],"entityRanges":[],"data":{"syntax":"javascript"}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://es.wikipedia.org/wiki/JavaScript"}}}};
export const placeHolder = {"blocks":[{"key":"99c5e","text":"Enter text here. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":26,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"29ovb","text":"Cras vel viverra ante. Mauris ac condimentum dui, et venenatis quam. Integer pellentesque convallis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pharetra mollis consequat. Vivamus rutrum libero non imperdiet consectetur. Integer auctor metus at libero fringilla","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
export const askHomeWorkQuestionPlaceHolder = {"blocks":[{"key":"99c5e","text":"What's your question? ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":26,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"29ovb","text":"Cras vel viverra ante. Mauris ac condimentum dui, et venenatis quam. Integer pellentesque convallis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pharetra mollis consequat. Vivamus rutrum libero non imperdiet consectetur. Integer auctor metus at libero fringilla","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
export const homeWorkAnswerPlaceHolder = {"blocks":[{"key":"99c5e","text":"Answer question. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":26,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"29ovb","text":"Cras vel viverra ante. Mauris ac condimentum dui, et venenatis quam. Integer pellentesque convallis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pharetra mollis consequat. Vivamus rutrum libero non imperdiet consectetur. Integer auctor metus at libero fringilla","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};
export const commentsPlaceHolder = {"blocks":[{"key":"99c5e","text":"Enter comments here. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":26,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"29ovb","text":"Cras vel viverra ante. Mauris ac condimentum dui, et venenatis quam. Integer pellentesque convallis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pharetra mollis consequat. Vivamus rutrum libero non imperdiet consectetur. Integer auctor metus at libero fringilla","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}};

export const saveMarkDownContent = (saveAction, teachObject, content,  cacheName, timeoutDuration) => {
  if ( !  ( cacheName || timeoutDuration )  ) return Error('passSaveMarkDownContentTimerHandleByValue-Config is not set.');
  let timerHandle = undefined;

  try {
   if ( timerHandle ) {
      clearTimeout( timerHandle  );
   }

    timerHandle = setTimeout(()=>{
    // let markDownContent = sessionStorage.getItem( cacheName );
    let markDownContent = content;
    // alert('saving content');
    // alert(JSON.stringify( teachObject ) );
    // alert(  content );
    saveAction( { ...teachObject, markDownContent } );
   }, timeoutDuration );   
  } catch (error) {
    throw Error( error );
  };
};





// export const saveMarkDownContent = ( timerHandle, saveAction, teachObject, editorContent, cacheName, timeoutDuration) => {

//   if ( !  ( editorContent || cacheName || timeoutDuration )  ) return Error('passSaveMarkDownContentTimerHandleByValue-Config is not set.');

//   try {

       
//    let timeHandleTest;

//    if ( timeHandleTest ) {
//     clearTimeout( timeHandleTest  )
//    }

//    if ( timerHandle ) {
//       clearTimeout( timerHandle  )
//    }
   
//    //sessionStorage.setItem(cacheName, editorContent );


//     timerHandle = setTimeout(()=> {

//       //sessionStorage.setItem(cacheName, editorContent );

//      timeHandleTest = setTimeout(() => {
  
  
//       let markDownContent = sessionStorage.getItem( cacheName );
//        saveAction({...teachObject, markDownContent});
  
//      })



//    }, timeoutDuration, timeHandleTest );


    
//   } catch (error) {
//     throw Error( error );
//   }
// }







// export const saveMarkDownContent = ( timerHandle, saveAction, teachObject, editorContent, cacheName, timeoutDuration) => {

//   if ( !  ( editorContent || cacheName || timeoutDuration )  ) return Error('passSaveMarkDownContentTimerHandleByValue-Config is not set.');

//   try {
//     sessionStorage.setItem(cacheName, editorContent );
       
//    if ( timerHandle ) {
//       clearTimeout( timerHandle  )
//    }

//     timerHandle = setTimeout(()=>{

//     let markDownContent = sessionStorage.getItem( cacheName );
//     saveAction({...teachObject, markDownContent});
//    }, timeoutDuration );
    
//   } catch (error) {
//     throw Error( error );
//   }
// }