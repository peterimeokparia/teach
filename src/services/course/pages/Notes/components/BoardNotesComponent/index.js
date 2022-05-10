import {
useEffect,
useState } from 'react';

import { 
connect } from 'react-redux';

import {
addNotes,
loadAllNotes,
saveNotes,
SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';
    
import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getLessonByLessonIdSelector,
// getLessonUserNotesByEventId, 
getEventByEventId} from 'services/course/selectors';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 

import {
editor_upload_url,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import EditorComponent from 'services/course/pages/components/EditorComponent';
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import './style.css';
import NavLinks from 'services/course/pages/components/NavLinks';

const BoardNotesComponent = ({ 
    meetingId,
    user, 
    users,
    lesson,
    note,
    event,
    allNotes,
    classRoomId, 
    courseId,
    lessonId,
    userId,
    lessons,
    eventId,
    operatorBusinessName,
    loadAllNotes,
    addNotes,
    saveNotes,
    saveEditorMarkDownObjectToMw }) => {
        
    useEffect(() => {
        loadAllNotes();
    }, []);

return (
    <div className="BoardNotes">    

        <div>
            <BoardEditorComponent 
                meetingId={lessonId}
                courseId={courseId}
                lessonId={lessonId}
                classRoomId={lessonId}
                eventId={lessonId}
                whiteBoardLessonId={lessonId}
                operatorBusinessName={operatorBusinessName}
                saveIconVisible={true}
            >
                <div></div>
               {/* <div className="children-section">
                <div className="children-subsection">
                    <div className="notes-title">
                        <div>
                        { <label>
                            <NavLinks to={`/teach/notes/${user?._id}/course/${courseId}/lesson/${lessonId}/event/${eventId}`}> 
                                <label className="navLink">{lesson?.title}</label>
                            </NavLinks> 

                            </label> 
                        }
                        </div>
                        <label className="title-date">
                            {`${new Date().toLocaleString()}` }
                        </label>
                    </div>
                     <EditorComponent  
                        upload_url={editor_upload_url} 
                        handleChange={(editor) => handleChange({ ...note, markDownContent: editor }, SET_NOTES_MARKDOWN, `/notes/`, saveEditorMarkDownObjectToMw )}
                        content={ event?.markDownContent }
                     /> 
                </div>
               </div> */}
            </BoardEditorComponent>    
        </div> 
    </div>
    );
};

const mapDispatch = {
    loadAllNotes,
    addNotes,
    saveNotes,
    saveEditorMarkDownObjectToMw
};

const mapState = ( state, ownProps )   => {
    return {
    user: state?.users?.user,
    operatorBusinessName: state.operators.operatorBusinessName,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    // note: getLessonUserNotesByEventId(state, ownProps),
    
    event: getEventByEventId(state, ownProps),
    lesson: getLessonByLessonIdSelector( state, ownProps )
    };
};

export default connect(mapState, mapDispatch )(BoardNotesComponent);
    
    