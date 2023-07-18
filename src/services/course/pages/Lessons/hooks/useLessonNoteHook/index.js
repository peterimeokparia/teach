import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAllNotes, SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

function useLessonNoteHook( setMarkDown ) {
    const dispatch = useDispatch();
    const saveContentInterVal = 1000;
    
    useEffect(() => { dispatch( loadAllNotes() ) }, []);

    function saveNotesMarkDown(lessonNote, markDownContent){
     setMarkDown( SET_NOTES_MARKDOWN, '/notes/content/', { ...lessonNote, markDownContent }, saveContentInterVal);
    }

    function onMatchListItem(stub){
        /* */
    }

    function toggleConcepts(stub){
        /* */
    }

    return {
        saveNotesMarkDown,
        onMatchListItem, 
        toggleConcepts 
    }; 
}

export default useLessonNoteHook;