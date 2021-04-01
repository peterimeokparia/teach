import React from 'react';

import FileUpload from 'Services/course/Pages/Components/FileUpload';

export function LessonFileUpload({
previewMode,
currentLesson,
fileUploadUrl,
typeOfUpload,
setFilesToRemove
}){
return (
    <div>                                
        {( previewMode )  
        ?   ( 
            <div> 
                <FileUpload 
                    teachObject={currentLesson}
                    fileUploadUrl={fileUploadUrl}
                    typeOfUpload={typeOfUpload}
                    teachObjectName={"lessons"}
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
)}