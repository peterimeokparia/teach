import FileUpload from 'services/course/pages/components/FileUpload';

export function LessonFileUpload({
previewMode,
currentLesson,
fileUploadUrl,
setFilesToRemove,
saveAction
}){
const onChangeHandler = event => {
    let files = [ ...currentLesson?.files ];

    for (let index = 0; index < event.target.files.length; index++) {    
        files = [...files, `http://localhost:3000/files/${event.target.files[index]?.name}` ];            
    }
    saveAction({ ...currentLesson, files });
};

return (
    <div>                                
        {( previewMode )  
        ?   ( 
            <div> 
                <FileUpload 
                    fileUploadUrl={fileUploadUrl}
                    onChangeHandler={onChangeHandler}
                />
            <div> 
            {currentLesson?.files?.length > 0 && (
                <ul>
            {currentLesson?.files?.map( (file, index) =>  ( 
                <li key={index}> 
                    <a  href={file} target="_blank" rel="noopener noreferrer"> {file}  </a> 
                    <button onClick={() => setFilesToRemove(file)}> x </button>  
                </li> 
            ))}
                </ul> 
            )}
            </div>
            </div> 
            )
        :   ( <div>
                {currentLesson?.files?.length > 0 && (
                    <ul>
                        {currentLesson?.files?.map( (file, index)  =>  ( 
                            <li key={index}> 
                                <a  href={file} target="_blank" rel="noopener noreferrer"> {file}  </a> 
                            </li>))
                        }
                    </ul> 
                )}
            </div> ) 
        }
    </div>  
); }