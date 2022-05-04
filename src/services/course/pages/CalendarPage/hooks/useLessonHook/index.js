import { 
useState, 
useEffect } from "react";

function useLessonHook( calendarEventType, events, calendarId, user ) {
    const [ renderLessonModal, setRenderLessonModal ] = useState(false);
    const [ lessonProps, setLessonProps ] = useState( undefined );

    useEffect(() => {

    }, [ renderLessonModal, lessonProps ]);

return {
    renderLessonModal,
    lessonProps, 
    setLessonProps,
    setRenderLessonModal
}; };

export default useLessonHook;