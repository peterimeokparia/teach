import React from 'react';

import FileUpload from '../FileUpload/FileUpload';


import { 
Link } from '@reach/router';


export function FileUploadComponent({
previewMode,
currentLesson,
fileUploadUrl,
typeOfUpload,
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
                                                    typeOfUpload={typeOfUpload}
                                                    teachObjectName={"lessons"}
                                            />

                                            <div> 

                                            { currentLesson?.files?.length > 0 && (
                                        <ul>
                                                {
                                                    currentLesson?.files?.map( (file, index) =>  ( 
                                                        <li key={index}> 
                                                            {/* <Link to={file}> {file?.split('-')[1]} </Link> */}
                                                            <a  href={file} target="_blank"> {file}  </a> 
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
                                                               <a  href={file} target="_blank"> {file}  </a> 
                                                               {/* <Link to={file}> {file?.split('-')[1]} </Link>  */}
                                                          </li> )  )
                                                    
                                                    }
                                            </ul> 
                                            )}
                                        </div> ) 
            
            }
        </div>  
    )
}