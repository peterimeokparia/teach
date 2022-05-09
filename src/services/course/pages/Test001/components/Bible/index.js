import { 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
loadAllNotes,
addNotes, 
saveNotes,
SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

import { 
togglePreviewMode } from 'services/course/actions/app';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 
    
import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector, 
// getLessonUserNotesByEventId 

} from 'services/course/selectors';

import LessonPlanIframeComponent  from 'services/course/pages/components/LessonPlanIframeComponent';
import EditorComponent  from 'services/course/pages/components/EditorComponent';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import './style.css';

const Bible = ({
    previewMode,
    saveLesson,
    setMarkDown,
    addNewLesson,
    setVideoUrl,
    loadAllNotes,
    addNotes, 
    saveNotes,
    lessonId,
    courseId,
    noteId,
    notes,
    eventId,
    selectedTutorId,
    currentVideoUrl,
    setLessonPlanUrl,
    setCurrentLesson,
    course,
    lessons,
    togglePreviewMode,
    operatorBusinessName,
    operator,
    currentUser, 
    selectedLessonPlanLesson
}) => {
    useEffect(() => {
        loadAllNotes();
    }, [ courseId ]);

function handleChange( editor, element ){
    let duration = 2000;  

    setMarkDown(
        element, 
        editor.getHTML(), 
        { propNameOne: "notes",  propNameTwo: "notes" }, 
        SET_NOTES_MARKDOWN, 
        saveNotes, 
        duration
    );
};

let lesson = lessons.find(lsn => lsn?._id === lessonId );
let note = notes.find(note => note?._id === noteId );
const canvasUrl = "https://www.biblegateway.com/quicksearch/";
const fullScreenSize = "400px";
//const canvasUrl = "https://www.biblegateway.com/passage/"
// const fullScreenSize = "1536px";

return <div className="builder5"> 
        <div className="content">
        <div className="onlinequestion-list-items">  
            <div className="OnlineListItems">
            <div className="lesson-content"> 
            </div>   
                <div className="lesson2">   
                <div className={`canvas-show`}> 
                         <header>
                        {
                            <div className="multicolortext">
                             
                                { "Message Title" }
                            </div>
                        }
                        </header>

                        {/* <iframe name="my_iframe" src="https://www.biblegateway.com/" width={"400px"} height="500px"></iframe> */}
                        {/* <iframe name="my_iframe" src="not_submitted_yet.aspx" width={"400px"} height="500px"></iframe> */}
             
                        < LessonPlanIframeComponent 
                            name="embed_readwrite" 
                            source={canvasUrl}
                            width={fullScreenSize}
                            height="550px"
                            allow="camera;microphone"
                            scrolling="yes"
                            frameBorder="0"
                            allowFullScreen
                        />      

                     
                  </div>
                {/* <form action="https://www.biblegateway.com/quicksearch/" method="post" target="my_iframe">
                  <table>
                    <tr><th>{ <header>
                        {
                            <div className="multicolortext">
                             
                                { "Message Title" }
                            </div>
                        }
                        </header>}</th></tr>
                    <tr><th>{"Lookup a word or passage in the Bible"}</th></tr>
                    <tr><td>
                    <div>
                    <input type="text" name="quicksearch" /><br />
                    <input type="submit" value="Search BibleGateway.com" /><br />
                    </div>
                    <a href="https://www.biblegateway.com/" title="The Bible in multiple languages, versions, and formats">
                    <img src="https://www.biblegateway.com/assets/images/logos/bglogo_sm.gif?103106" width="146" height="44" alt="BibleGateway.com"/></a><br />
                    <small>
                    <a href="https://www.biblegateway.com/usage/form/">Include this form on your page</a><br />
                    </small>
                    </td></tr>
                  </table>
                </form>     */}
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
    setMarkDown,
    togglePreviewMode
};

const mapState = (state, ownProps) => {
    return {
        operator: state.operators.opeator,
        operatorBusinessName: state?.operator?.operatorBusinessName,
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        isLessonsLoading:state.lessons.lessonsLoading,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        course: state.lessons.course,
        onLessonError: state.lessons.onSaveLessonError,
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        // notes: getLessonUserNotesByEventId( state, ownProps )
    };
};

export default connect( mapState, mapDispatch )(Bible);