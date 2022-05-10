// import './style.css';

export function FormFileUpload({
previewMode,
currentObject,
fileUploadUrl,
selectedFileToRemove,
saveAction,
fileViewer
}){
const onChangeHandler = event => {
 
    let files = [ ...currentObject?.files ];

    for (let index = 0; index < event.target.files.length; index++) {    
        files = [...files, `http://localhost:3000/files/${event.target.files[index]?.name}` ];            
    }

    saveAction({ ...currentObject, files });
};

let fileViewProps = {
    previewMode, 
    fileUploadUrl, 
    onChangeHandler, 
    currentObject, 
    className: "lessonFileUploadFilelist",
}

return (
    <> 
     { fileViewer( fileViewProps ) }
    </>
 
); }
