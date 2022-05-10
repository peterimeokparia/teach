import FileUpload from 'services/course/pages/components/FileUpload';

export const emailMessageOptions = ( currentUser, invitationUrl ) => {
    return { 
        from: "teachpadsconnect247@gmail.com",
        subject: "Hey! Join my lesson!",
        messageBody: invitationUrl,
        userId: currentUser?._id
    };
};

export const emailInputOptions = {
    name:"inputO",
    type:"email",
    placeHolder:"Invite your friends!"
};

export function courseDetailPageComponentConfig(
    course,
    courseId,
    currentUser,
    operatorBusinessName,
    operator,
    setPreviewEditMode,
    previewMode,
    lessons,
    saveLesson,
    addNewLesson,
    children,
    fileUploadUrl,
    setFileToRemove,
    emailInputOptions,
    emailMessageOptions,
    setCurrentLesson,
    setVideoUrl,
    setLessonPlanUrl,
    currentLesson,
    currentLessonVideoUrl
    ) {
    return {
    course,
    courseId,
    currentUser,
    operatorBusinessName,
    operator,
    setPreviewEditMode,
    previewMode,
    lessons,
    saveLesson,
    lessonDate: Date.now(),
    addNewLesson,
    courseDetailChildren: children,
    fileUploadUrl,
    setFileToRemove,
    emailInputOptions,
    emailMessageOptions: emailMessageOptions(currentUser.invitationUrl),
    setCurrentLesson,
    setVideoUrl,
    setLessonPlanUrl,
    currentLesson,
    currentLessonVideoUrl
}; };

export function lessonFileViewer( props  ){
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
                    <div> </div>
                    // <label onClick={() => deleteFile(file)}> fix file upload
                    //     {file}
                    //     {getFileName( file )}
                    // <a  href={file} target="_blank" rel="noopener noreferrer"> {getFileName( file )}  </a> 
                    // </label>
                ))}
            </div> 
            )}
            </div>
            </div> 
            )
        :   ( <div>
                {currentObject?.files?.length > 0 && (
                <div>
                    {/* {currentObject?.files?.map( (file, index)  =>  ( 
                        <label onClick={() => openFile(file)}>
                            { file }
                            {() => getFileName( file )}
                        </label>
                    ))} */}
                </div> 
                )}
            </div> ) 
        }
    </div> 
)}
