import { 
formNames } from 'services/course/pages/CalendarPage/helpers';

import {
role } from 'services/course/helpers/PageHelpers';

import {
LESSONNOTES,
STUDENTNOTES } from 'services/course/actions/notes';

export function handleLessonNotes( props ) {

    let {
        allNotes,
        currentEventId,
        formName,
        selectedUser,
        currentUser,
        title,
        courseId,
        lessonId,
        userId,
        markDownContent,
        content,
        noteDate,
        operatorId,
        eventId,
        operatorBusinessName,
        addNotes,
        loadAllNotes
    } = props;

    if ( formName !== formNames?.Board ) return;

        let existingNote = allNotes?.find( note => note?.eventId === currentEventId && note?.userId === currentUser?._id );

        if ( !existingNote ) { 

            let noteProp = {
                title,
                courseId,
                lessonId,
                userId: currentUser?._id,
                markDownContent: null,
                content: null,
                noteDate: Date.now,
                operatorId,
                eventId: currentEventId,
                noteType: ( currentUser?.role === role.Tutor ) ? LESSONNOTES : STUDENTNOTES
            };
 
            addNotes( noteProp )
            .then( response => {
                loadAllNotes();
                return;
            })
            .catch( error => { console.log( error) });  
        }

        return;
}

