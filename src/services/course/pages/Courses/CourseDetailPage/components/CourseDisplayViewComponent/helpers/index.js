// refactor

import * as React from 'react';
import { FormFileUpload } from 'services/course/pages/components/FormFileUpload';
import { lessonFileViewer } from 'services/course/pages/Courses/helpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { styled } from '@mui/material/styles';
import { red, white } from '@mui/material/colors';
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import LessonPlanIframeComponent from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponent';
import OutComesComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesComponent';
import OutcomeChartLanding from 'services/course/pages/Charts/components/OutcomeChartLanding';
import CardGridItemComponent from 'services/course/pages/components/CardGridItemComponent';
import LessonDetails from 'services/course/pages/LessonDetails';
import { navigate } from '@reach/router';


const fileUploadUrl =  "/api/v1/fileUploads";

export const incrementDisplayedItemCount = ( toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount ) => {
    if ( toggleLessonItemDisplayCount === 2 ) {
        setToggleLessonItemDisplayCount( 0 );
        return;
    }
    setToggleLessonItemDisplayCount( toggleLessonItemDisplayCount + 1 );
};

let testCollection = [
    {_id: "one", item:"one"}, {_id: "two", item:"one"}, {_id: "three", item:"one"}, {_id: "four", item:"one"}, 
    {_id: "five", item:"one"}, {_id: "six", item:"one"}, {_id: "seven", item:"one"}, {_id: "eight", item:"one"}, 
    {_id: "nine", item:"one"}, {_id: "ten", item:"one"}, {_id: "eleven", item:"one"}, {_id: "twelve", item:"one"}, 
    {_id: "thirteen", item:"one"}, {_id: "fourteen", item:"one"}, {_id: "fifteen", item:"one"}, {_id: "sixteen", item:"one"}, 
];

    
function onMatchGridListItem( match, item ) {
    if ( match ) {
        navigate(`${match?.uri}`)
    }
}

export const toggleDisplayedItems = ( toggleDisplayItemProps ) => {
    let { key, 
        selectedlesson, 
        courseDisplayProps, 
        lessonOutcomes, 
        courseOutcomes,
        lessonPieChartData
    } = toggleDisplayItemProps;

    let { previewMode,
        setFileToRemove,
        saveLesson,
        operatorBusinessName,
        courseId,
        selectedTutorId,
        toggleLessonOutcomeInsightModal
    } = courseDisplayProps;

 switch (key) {
    case 1: 
     return <div className="lesson-video">
                <LessonPlanIframeComponent
                    name="embed_readwrite" 
                    source={selectedlesson?.videoUrl}
                    width="700px"
                    height="400px"
                    allow="camera;microphone"
                    scrolling="auto"
                    frameBorder="10" 
                    className={"iframe"}
                />
            </div>;
     case 2:
        return  <>
            { ( selectedlesson && !toggleLessonOutcomeInsightModal ) &&
                !isEmptyObject(lessonPieChartData) && 
                <OutcomeChartLanding pieChartData={lessonPieChartData}/>
            }
            <OutComesComponent
                operatorBusinessName={operatorBusinessName} 
                buttonText={ 'Add New Lesson Outcome' }
                outcomeType={'lesson'}
                outcomes={lessonOutcomes }
                courseId={ courseId }
                lesson={ selectedlesson }
                lessonId={ selectedlesson?._id }
            />;              
        </> 
    //  case 2:
    //  return <div className="boardEditorDisplay"> 
    //             <div>{'Fix BoardEditor'}</div>
    //          {/* <BoardEditorComponent 
    //              courseId={courseId}
    //              lessonId={selectedlesson?._id}
    //              classRoomId={selectedTutorId}
    //              operatorBusinessName={operatorBusinessName}
    //              saveIconVisible={true}
    //          /> */}
    //          </div>;
     case 3:
     return  <div>{'Fix File Viewer'}</div>
            // <FormFileUpload
            //     previewMode={previewMode}
            //     currentObject={selectedlesson}
            //     typeOfUpload={'userlessonfiles'}
            //     fileUploadUrl={fileUploadUrl}
            //     setFilesToRemove={setFileToRemove}
            //     msg={"Please click on the lesson link before uploading files."}
            //     saveAction={saveLesson}
            //     fileViewer={lessonFileViewer}
            //  />;
     default:
    return  <>
            <CardGridItemComponent 
                collection={testCollection}
                onMatchGridListItem={ onMatchGridListItem }
                path={ `lessons/${selectedlesson?._id}/lessondetails` }
            >
                {( lessonDetails, index ) => (
                    <LessonDetails 
                        lessonDetails={lessonDetails} 
                        lessonId={selectedlesson?._id}
                        expandCardSubContent={false}
                    />
                )}   
            </CardGridItemComponent> 
            </>      
 }
};