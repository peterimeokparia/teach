import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetLessonError, deleteLesson } from 'services/course/actions/lessons';
import { forms } from 'services/course/pages/Lessons/NewLessonPage/helpers';

function useNewLessonPageHook( lessonError, saveLessonInProgress ) {
    const [ fieldValue, setFieldValue ] = useState("");
    const dispatch = useDispatch();

    function setField( input ) {
        setFieldValue( input );
    }

    function resetItemError() {
        dispatch( resetLessonError() );
    }

    function deleteItemAction( lesson ) {
        dispatch( deleteLesson( lesson ) );
    }

    return {
        newLessonItemProps: {
            error: lessonError,
            fieldValue,
            inputType: 'text',
            editItem: false,
            saveItemInProgress: saveLessonInProgress, 
            forms,
            resetItemError, 
            deleteItemAction,
            setField,
        }
    };
}

export default useNewLessonPageHook;