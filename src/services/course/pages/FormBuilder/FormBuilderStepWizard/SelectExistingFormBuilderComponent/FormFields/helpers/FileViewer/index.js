import './style.css';

export function formFileViewer( props ){
    let { fileUploadUrl, onChangeHandler } = props;

return(
    <div className={"fileViewerFileUpload"}>  
        <div className="files-file-Container">
            <div class="container"> 
            <form method="POST" action={fileUploadUrl} id="#" enctype="multipart/form-data" target="hiddenFrame">
            <button type="submit" class="button uploadBtn" value="upload" >{"upload"}</button>    
                <div class="form-group files"> 
                <input type="file" name="file" class="form-control" multiple onChange={onChangeHandler}></input> 
                </div> 
            </form>  
            </div>
        </div>
    </div>
    );
}
