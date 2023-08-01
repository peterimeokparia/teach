import './style.css';

const LessonDetailsDetailPage = ({
    operatorBusinessName,  
    currentUser,
    courseId,
    lessonId,
    course,
    lessons,
    isLessonsLoading,
    selectedTutorId, 
    loadLessons,
    addNewLesson,
    saveLesson,
    previewMode,
    setCurrentLesson,
    selectedLessonPlanLesson,
    studentsSubscribedToThisCourse,
    sessions,
    currentOutcome,
    setLessonCourse,
    onLessonError,
    lessonDetailId, 
    selectedCardId,
    children
}) => {
    return <>
    {/* card flip https://codepen.io/desandro/pen/LmWoWe */}
        {`operatorBusinessName: ${ operatorBusinessName } `}
        {`selectedTutorId: ${ selectedTutorId } `}
        {`courseId: ${ courseId } `}
        {`lessonId: ${ lessonId } `}
        {`lessonDetailId: ${ lessonDetailId } `}

        {/* 
            if last selected radiance is the same as the recently selected radiance then
            toggle the radiance
        */}
       
        <div className="scene scene--card">
            {/* <div className="card is-flipped"> */}
            <div className="card">
               {( () => {
                    switch (selectedCardId) {
                        case 1: 
                            return (
                                <div className="card is-flipped-full">
                                    <div className="card__face card__face--front">fr-1</div>
                                    <div className="card__face card__face--back">bk-1</div>
                                </div>
                            );
                        case 2: 
                            return (
                                <div className="card is-flipped-test">
                                    <div className="card__face card__face--front">fr-2</div>
                                    <div className="card__face card__face--back">bk-2</div>
                                </div>
                            );    
                        case 3: 
                            return (
                                <div className="card is-flipped">
                                    <div className="card__face card__face--front">fr-3</div>
                                    <div className="card__face card__face--back">bk-3</div>
                                </div>
                            );    
                        default:
                            return (
                                <div className="card is-flipped-full">
                                    <div className="card__face card__face--front">fr-d</div>
                                    <div className="card__face card__face--back">bk-d</div>
                                </div>
                            );    
                    }
                 })()
               }
            </div>
            
            </div>
            <p>Click card to flip.</p>
    </>
}

export default LessonDetailsDetailPage;


{/* <div className="card__face card__face--front">front</div>
<div className="card__face card__face--back">back</div>
{ children } */}