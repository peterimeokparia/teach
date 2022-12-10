// refactor
import { FormFileUpload } from 'services/course/pages/components/FormFileUpload';
import { lessonFileViewer } from 'services/course/pages/Courses/helpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import LessonPlanIframeComponent from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponent';
import OutComesComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesComponent';
import OutcomeChartLanding from 'services/course/pages/Charts/components/OutcomeChartLanding';

const fileUploadUrl =  "/api/v1/fileUploads";

export const incrementDisplayedItemCount = ( toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount ) => {
    if ( toggleLessonItemDisplayCount === 2 ) {
        setToggleLessonItemDisplayCount( 0 );
        return;
    }
    setToggleLessonItemDisplayCount( toggleLessonItemDisplayCount + 1 );
};

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
                < LessonPlanIframeComponent
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
     return <div className="boardEditorDisplay"> 
                <div>{'Fix BoardEditor'}</div>
             {/* <BoardEditorComponent 
                 courseId={courseId}
                 lessonId={selectedlesson?._id}
                 classRoomId={selectedTutorId}
                 operatorBusinessName={operatorBusinessName}
                 saveIconVisible={true}
             /> */}
             </div>;
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
 }
};