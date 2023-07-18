import './style.css'

export function formFileViewer( props ){
    let {
        previewMode, 
        fileUploadUrl, 
        onChangeHandler, 
        currentObject, 
        deleteFile, 
        getFileName, 
        openFile, 
        className
    } = props;

return(
    // <div className={className}>  
    <div className={"fileViewerFileUpload"}>  
     {/* <iframe name="hiddenFrame" class="hide" height="20px"></iframe> */}
        <div className="files-file-Container">
            <div class="container"> 
            {/* <div class="row">  */}
            {/* <div class="col-md-19"> */}
            <form method="POST" action={fileUploadUrl} id="#" enctype="multipart/form-data" target="hiddenFrame">
            <button type="submit" class="button uploadBtn" value="upload" >{"upload"}</button>    
                <div class="form-group files"> 
                {/* <label> Upload file(s). </label> */}
                <input type="file" name="file" class="form-control" multiple onChange={onChangeHandler}></input> 
                </div> 
            </form>  
            {/* </div> */}
            {/* {Validations.setErrorMessageContainer() } */}
            {/* </div> */}
            </div>
        </div>

        {/* <div> 
            {currentObject?.files?.length > 0 && (
            <div>
                {currentObject?.files?.map( (file, index) =>  ( 
                    <label onClick={() => deleteFile(file)}>
                        {getFileName( file )}
                    <a  href={file} target="_blank" rel="noopener noreferrer"> {getFileName( file )}  </a> 
                    </label>
                ))}
            </div> 
            )}
        </div> */}

        {/* <div>
            {currentObject?.files?.length > 0 && (
                <div>
                    {currentObject?.files?.map( (file, index)  =>  ( 
                        <label onClick={() => openFile(file)}>
                            {getFileName( file )}
                        </label>
                    ))}
                </div> 
                )}
        </div>  */}
    </div>

)}
