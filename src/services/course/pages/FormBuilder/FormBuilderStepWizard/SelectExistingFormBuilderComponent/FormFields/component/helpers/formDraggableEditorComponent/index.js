function formDraggableEditorComponent( ComponentList, ComponentEditor, formFieldProps, draggableListItemProps, isPreviewMode, previewMode, setSelectedFormField ){
    return function () {
        return   <div>
                      <ComponentList 
                        draggableListItemProps={ draggableListItemProps }
                        fieldProps={ formFieldProps }
                        selectedQuestion={ previewMode?.question }
                      >
                        {( item ) => 
                        { return <div onClick={() => setSelectedFormField(item)}> 
                         {/* { return <div>  */}
                            <div className="item">
                              <h2>{`${item?._id}_${item?.position}_${item?.parentComponentId}_${item?.points}_userID:_${item?.userId}_selected:_${item?.selected}`}</h2>
                              </div>
                                <ComponentEditor 
                                  draggableListItemProps={ draggableListItemProps }
                                  fieldProps={ formFieldProps }
                                  selectedQuestion={ previewMode?.question }
                                  previewMode={ isPreviewMode( item ) } 
                                  formFieldElement={ item } 
                                />
                              </div>;
                          }
                        }
                     </ComponentList> 
                </div>;
    };
}

export default formDraggableEditorComponent;