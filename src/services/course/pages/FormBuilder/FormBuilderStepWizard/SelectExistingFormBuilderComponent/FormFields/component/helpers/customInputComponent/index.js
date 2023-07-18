function customInputComponent( Component, formFieldProps, previewMode, isPreviewMode, element, selectedFormField, readOnly ){
    return function () {
        return <div className='row row-margin'> 
                  <div className={`col ${ ( selectedFormField?._id === element?._id ) ? 'col-editor-selected' : 'col-editor' }`}>
                    <Component 
                      fieldProps={ formFieldProps }
                      selectedQuestion={ previewMode?.question }
                      previewMode={ isPreviewMode( element ) } 
                      formFieldElement={ element } 
                      readOnly={ readOnly }
                    /> 
                  </div>      
                </div>; 
    };
}

export default customInputComponent;