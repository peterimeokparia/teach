import { 
Link, navigate } from '@reach/router';

import {
FormFileUpload } from 'services/course/pages/components/FormFileUpload';

import {
lessonFileViewer } from 'services/course/pages/Courses/helpers';

import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import LessonPlanIframeComponent from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponent';

const fileUploadUrl =  "/api/v1/fileUploads";

export const incrementDisplayedItemCount = ( toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount ) => {
    //navigate(`/teach/animate`);
    ///navigate(`/teach/search`)
    //navigate(`/teach/editor`)
    // navigate(`/teach/questions/missedQuestions/quizzwithpoints/Bonds-quizz_4caf799f-371a-4332-853e-7eb477e2a48e`);
    if ( toggleLessonItemDisplayCount === 2 ) {
        setToggleLessonItemDisplayCount( 0 );
        return;
    }
    setToggleLessonItemDisplayCount( toggleLessonItemDisplayCount + 1 );
};

export const toggleDisplayedItems = ( key, selectedlesson, courseDisplayProps ) => {

    let {
        previewMode,
        setFileToRemove,
        saveLesson,
        operatorBusinessName,
        courseId,
        selectedTutorId,
    } = courseDisplayProps;

 switch (key) {
     case 1:
     return <div className="boardEditorDisplay">
             <BoardEditorComponent 
                 courseId={courseId}
                 lessonId={selectedlesson?._id}
                 classRoomId={selectedTutorId}
                 operatorBusinessName={operatorBusinessName}
                 saveIconVisible={true}
             />
             </div>
     case 2:
     return < FormFileUpload
                 previewMode={previewMode}
                 currentObject={selectedlesson}
                 typeOfUpload={'userlessonfiles'}
                 fileUploadUrl={fileUploadUrl}
                 setFilesToRemove={setFileToRemove}
                 msg={"Please click on the lesson link before uploading files."}
                 saveAction={saveLesson}
                 fileViewer={lessonFileViewer}
             />
     default:
     return < LessonPlanIframeComponent
                 name="embed_readwrite" 
                 source={selectedlesson?.videoUrl}
                 width="700px"
                 height="400px"
                 allow="camera;microphone"
                 scrolling="auto"
                 frameBorder="10" 
                 className={"iframe"}
             />;
 }
};