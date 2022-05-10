import FileUpload from 'services/course/pages/components/FileUpload';
import './style.css';

export function FileUploadWithPreview({className}){
    //lessonFileUploadFilelist 

    function getFileNames( link ){
        return link;
    };

return (
    <> 
    {( previewMode, fileUploadUrl, onChangeHandler, currentObject, deleteFile, getFileName, openFile, fileViewerClassName ) => (

           <div className={className}>                                
            {( previewMode )  
            ?   ( 
                <div> 
                    <FileUpload 
                        fileUploadUrl={fileUploadUrl}
                        onChangeHandler={onChangeHandler}
                    />
                <div> 
                {currentObject?.files?.length > 0 && (
                <div>
                    {currentObject?.files?.map( (file, index) =>  ( 
                        <label onClick={() => deleteFile(file)}>
                            {/* {'fix file upload'} */}
                            {getFileNames( file )} 
                        {/* <a  href={file} target="_blank" rel="noopener noreferrer"> {getFileName( file )}  </a>  */}
                        </label>
                    ))}
                </div> 
                )}
                </div>
                </div> 
                )
            :   ( <div>
                    {currentObject?.files?.length > 0 && (
                    <div>
                        {currentObject?.files?.map( (file, index)  =>  ( 
                            <label onClick={() => openFile(file)}>
                                 {/* {'fix file upload'} */}
                                {getFileNames( file )}
                            </label>
                        ))}
                    </div> 
                    )}
                </div> ) 
            }
            </div> 



    )}
    </> 
); }