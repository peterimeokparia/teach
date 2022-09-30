function controlledNumberInputComponent( Component, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField ){
    return function () {
        return  <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>  
                    <Component 
                      fieldProps={formFieldProps}
                      previewMode={ isPreviewMode( element ) } 
                      formFieldElement={element} 
                    />
                    { handleDisplayingAnswerKeys( element ) }
                    { isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                </div>;
    };
}

export default controlledNumberInputComponent;