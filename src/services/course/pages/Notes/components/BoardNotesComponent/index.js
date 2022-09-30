import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addNotes, loadAllNotes, saveNotes } from 'services/course/actions/notes';
import { getOperatorFromOperatorBusinessName, getUsersByOperatorId, getLessonByLessonIdSelector, getEventByEventId } from 'services/course/selectors';
import { saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import './style.css';

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
    }, [ loadAllNotes ]);

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
    event: getEventByEventId(state, ownProps),
    lesson: getLessonByLessonIdSelector( state, ownProps )
    };
};

export default connect(mapState, mapDispatch )(BoardNotesComponent);
    
    