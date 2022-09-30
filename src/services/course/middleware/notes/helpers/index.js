import { navigate } from '@reach/router';
import { addNotes, saveNotes, loadAllNotes, LESSONNOTES } from 'services/course/actions/notes';

export const handleNotes = ( note, store ) => {
    try {
        handleNavigation( note );
    } catch (error) {
        console.error(`Problem with updating lesson notes: ${ error }`);
    }
};

function handleNavigation( note ){
    let { courseId, lessonId, operatorBusinessName, outcomeId, noteType } = note;

    switch ( noteType ) {
        case LESSONNOTES:
            navigate(`/${operatorBusinessName}/lessonnotes/${note?._id}/noteType/${noteType}/course/${courseId}/lesson/${lessonId}/outcome/${outcomeId}`);
            break;
        default:
            break;
    };
}


export const buildLessonNotes = ( noteProps, store ) => {
    let {
        lessonNote, lessonNotes, outcome, operatorBusinessName, currentUser
    } = noteProps;

    let tutorsLessonNote = ( !lessonNote ) 
                            ? lessonNotes.find( note => note?.outcomeId === outcome?._id ) 
                            : lessonNote

    if ( tutorsLessonNote?.outcomeId === outcome?._id ) {
        store.dispatch( saveNotes({...tutorsLessonNote, outcomeId: outcome?._id }) );
        store.dispatch( loadAllNotes() );
        return;
    }
    const lessonNoteProps = {
        title: outcome?.title, courseId: outcome?.courseId, lessonId: outcome?.lessonId, operatorBusinessName,
        userId: currentUser?._id, markDownContent: null, content: null, operatorId: outcome?.operatorId,
        eventId: outcome?.eventId, color: outcome?.color, outcomeId: outcome?._id, noteType: LESSONNOTES
    };
    
    store.dispatch( addNotes( lessonNoteProps ) );
    store.dispatch( loadAllNotes() );

};



