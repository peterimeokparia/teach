import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadNotesByNoteId, saveNotes } from 'services/course/actions/notes';

const useNoteSelectionHook = ( props ) => {
    let { operatorBusinessName, selectedLesson, courseId, lessonId, lessonNotes, note } = props;

    const dispatch = useDispatch();
    const [ noteSelectionValue, setNoteSelectionValue ] = useState( 1 );
    let [ selectedNote, setSelectedNote ] = useState( lessonNotes );
    const [ noteDetailPageLink, setNoteDetailPageLink ] = useState(`/lessons/${lessonId}/more` );
    const [ noteTitle, setNoteTitle ] = useState( selectedLesson?.title );

    const toggleDisplayedNotes = () => {
        let val = noteSelectionValue;
      
        setNoteSelectionValue( val +1  );
        displaySelectedNote( noteSelectionValue );

        if ( noteSelectionValue === 2 ) {
            setNoteSelectionValue( 1  );
            return;
        }
    };

    const displaySelectedNote = ( selection ) => { 
        switch (selection) {

            case 1:
                dispatch(saveNotes(note));
                dispatch(loadNotesByNoteId( note?._id ));
                setSelectedNote(note);
                setNoteDetailPageLink(`/${operatorBusinessName}/notes/${selectedNote?._id}/course/${courseId}/lesson/${lessonId}`); 
                setNoteTitle('My Lesson Notes');
                break;
            default:
                dispatch(saveNotes(lessonNotes));
                dispatch(loadNotesByNoteId( lessonNotes?._id ));
                setSelectedNote(lessonNotes);
                setNoteDetailPageLink(`/lessons/${lessonId}/more`);
                setNoteTitle(selectedLesson?.title);

        }
    };

    return {
        toggleDisplayedNotes,
        selectedNote,
        noteDetailPageLink,
        noteTitle
    };
};

export default useNoteSelectionHook;