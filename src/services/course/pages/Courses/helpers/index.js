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

