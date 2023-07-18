import { connect } from 'react-redux';
import { loadAllNotes, addNotes, saveNotes, SET_NOTES_MARKDOWN, LESSONNOTES } from 'services/course/actions/notes';
import { togglePreviewMode } from 'services/course/actions/app';
import { editor_upload_url, handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';
import { saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 
import { getLessonByLessonIdSelector, getStudentsLessonUserNotesByLessonId,
    getTutorsLessonUserNotesByLessonId, getNoteByNoteId } from 'services/course/selectors';
import EditorComponent  from 'services/course/pages/components/EditorComponent';
import './style.css';

const Notes = ({
    noteType,
    saveEditorMarkDownObjectToMw,
    lesson,
    privateNotes,
    tutorsLessonNote,
}) => {
    const selectedNote = ( noteType === LESSONNOTES )
                            ? tutorsLessonNote
                            : privateNotes;

 return <div className="builder3"> 
        <header>
        {
            <div className="multicolortext">
                { lesson?.title }
            </div>
        }
        </header>
        <div className="content">
        <div className="onlinequestion-list-items">  
            <div className="OnlineListItems">
            <div className="lesson-content"> 
            </div>   
            <div className="lesson2">  
                <br></br>   <br></br>     <br></br>        
                { 
                    <EditorComponent
                        upload_url={editor_upload_url}
                        handleChange={(editor) => handleChange({ ...selectedNote, markDownContent: editor }, SET_NOTES_MARKDOWN, `/notes/`, saveEditorMarkDownObjectToMw )}
                        content={ selectedNote?.markDownContent }
                    /> 
                }            
            </div> 
            </div>
        </div>
        </div>
    </div>;
};

const mapDispatch = {
    loadAllNotes,
    addNotes, 
    saveNotes,
    saveEditorMarkDownObjectToMw,
    togglePreviewMode
};

const mapState = (state, ownProps) => {
    return {
        note: getNoteByNoteId( state, ownProps ),
        lesson: getLessonByLessonIdSelector( state, ownProps ),
        privateNotes: getStudentsLessonUserNotesByLessonId( state, ownProps ),
        tutorsLessonNote: getTutorsLessonUserNotesByLessonId( state, ownProps ),
    };
};

export default connect( mapState, mapDispatch )(Notes);