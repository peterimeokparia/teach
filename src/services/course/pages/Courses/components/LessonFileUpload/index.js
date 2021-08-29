import FileUpload from 'services/course/pages/components/FileUpload';
import './style.css';

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

const getFileName = ( link ) => {
    return link.split('files/')[1];
};

const openFile = (file) => {
    window.open(`${file}`);
};

const deleteFile = ( fileToDelete ) => {
    if( window.confirm(`Are you sure you want to delete ${fileToDelete}`) ){
        setFilesToRemove( fileToDelete );
    }
};

return (
    <div className="lessonFileUploadFilelist">                                
        {( previewMode )  
        ?   ( 
            <div> 
                <FileUpload 
                    fileUploadUrl={fileUploadUrl}
                    onChangeHandler={onChangeHandler}
                />
            <div> 
            {currentLesson?.files?.length > 0 && (
            <div>
                {currentLesson?.files?.map( (file, index) =>  ( 
                     <span onClick={() => deleteFile(file)}>
                      {getFileName( file )}
                      {/* <a  href={file} target="_blank" rel="noopener noreferrer"> {getFileName( file )}  </a>  */}
                    </span>
                ))}
            </div> 
            )}
            </div>
            </div> 
            )
        :   ( <div>
                {currentLesson?.files?.length > 0 && (
                <div>
                    {currentLesson?.files?.map( (file, index)  =>  ( 
                        <span onClick={() => openFile(file)}>
                            {getFileName( file )}
                        </span>
                    ))}
                </div> 
                )}
            </div> ) 
        }
    </div>  
); }