function formDataObjectSelector( Component, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField ){
    return function () {
        return   <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                    <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                      <Component 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                        dropDownValues={ element?.dropDownOptions }
                      />
                    </label>
                  { handleDisplayingAnswerKeys( element ) }
                </div>;
    };
}

export default formDataObjectSelector;