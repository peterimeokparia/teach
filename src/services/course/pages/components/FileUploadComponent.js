import React from 'react';
import FileUpload from '../FileUpload';

import { 
Link, 
Match, 
navigate, 
Redirect } from '@reach/router';


export function FileUploadComponent({
previewMode,
currentLesson,
fileUploadUrl,
setFilesToRemove
}){

    return (
        <div>                                
            {      
                ( previewMode )  ?   ( 
                                        <div> 
                                            <FileUpload 
                                                    teachObject={currentLesson}
                                                    fileUploadUrl={fileUploadUrl}
                                                    teachObjectName={"lessons"}
                                            />

                                            <div> 

                                            { currentLesson?.files?.length > 0 && (
                                        <ul>
                                                {
                                                    currentLesson?.files?.map( (file, index) =>  ( 
                                                        <li key={index}> 
                                                            <Link to={file}> {file?.split('-')[1]} </Link>
                                                            <button onClick={() => setFilesToRemove(file)}> x </button>  
                                                        </li> 
                                                    ) )
                                                }
                                        </ul> 
                                        )}

                                            </div>

                                        </div> 
                                    )

                                :   ( <div>
                                            { currentLesson?.files?.length > 0 && (
                                                <ul>
                                                    {
                                                        currentLesson?.files?.map( (file, index)  =>  ( 
                                                          <li 
                                                             key={index}> 
                                                               <Link to={file}> {file?.split('-')[1]} </Link> 
                                                          </li> )  )
                                                    
                                                    }
                                            </ul> 
                                            )}
                                        </div> ) 
            
            }
        </div>  
    )
}