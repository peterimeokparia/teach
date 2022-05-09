import {
role } from 'services/course/helpers/PageHelpers';

import {
LESSONNOTES,
STUDENTNOTES } from 'services/course/actions/notes';

export function handleLessonNotes( props ) {

    let {
        currentUser,
        title,
        courseId,
        lessonId,
        userId,
        operatorId,
        eventId,
        addNotes,
        loadAllNotes
    } = props;

    let noteProp = {
        title,
        courseId,
        lessonId,
        userId,
        markDownContent: null,
        content: null,
        noteDate: Date.now,
        operatorId,
        eventId,
        noteType: ( currentUser?.role === role.Tutor ) ? LESSONNOTES : STUDENTNOTES
    };

    addNotes( noteProp )
    .then( response => {
        loadAllNotes();
        return;
    })
    .catch( error => { console.log( error) });  


    return;
}
    
    