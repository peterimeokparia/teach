function controlledDropDownComponent( Component, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField ){
    return function () {
        return <div className='row row-margin'> 
         <div className={`col ${ ( selectedFormField?._id === element?._id ) ? 'col-editor-selected' : 'col-editor' }`}>
                  {/* <div className="col col-margin-no-editor">  */}
                    {/* <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                      <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}>  */}
                      <div>
                        <Component 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) }
                          formFieldElement={element} 
                          dropDownValues={ element?.dropDownOptions }
                        />
                      {/* { handleDisplayingAnswerKeys( element ) } */}
                    </div>
                  </div>
              </div>;
    };
}

export default controlledDropDownComponent;

// return function () {
//   return <div className='row row-margin'> 
//             <div className={`col ${ ( selectedFormField?._id === element?._id ) ? 'col-editor-selected' : 'col-editor' }`}>
//               <Component 
//                 fieldProps={ formFieldProps }
//                 selectedQuestion={ previewMode?.question }
//                 previewMode={ isPreviewMode( element ) } 
//                 formFieldElement={ element } 
//                 readOnly={ readOnly }
//               /> 
//             </div>      
//           </div>; 
// };