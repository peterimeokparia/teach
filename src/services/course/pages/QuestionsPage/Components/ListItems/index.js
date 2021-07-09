import { 
connect } from 'react-redux';

import {
points } from 'Services/course/Pages/QuestionsPage/helpers';

import {
saveQuestion,
loadQuestions,
setMarkDownEditor } from 'Services/course/Actions/Questions';

import {
videoComponentMeta } from 'Services/course/Actions/Video';

import {
togglePreviewMode } from 'Services/course/Actions/App';

import {
upload_url,
uploadImageUrl } from 'Services/course/Pages/OnlineQuestionsPage/helpers';

import {
elementMeta,
editorContentType } from 'Services/course/Pages/QuestionsPage/helpers';

import {
updateMarkDownEditorContent } from './helpers';

import Interweave from 'interweave';
import EditorComponent from 'Services/course/Pages/Components/EditorComponent';
import PointsDistribution from '../PointsDistribution';
import MultiFieldComponent from '../MultiFieldComponent';
import VideoComponent from '../VideoComponent';
import LessonPlanIframeComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanIframeComponent';
import './style.css';

const ListItems = ({
  previewMode,
  form,
  handlePointsPerQuestion,
  togglePreviewMode,
  questions,
  currentUser,
  questionPoints,
  markDownEditors,
  setMarkDownEditor,
  saveQuestion,
  pointsDistributionType,
  videoComponentMeta,
  video,
  loadQuestions,
  lessonId }) => {

  if ( !form?.length ) {
    return <div>{"No answers."}</div>;
  }

  let currentLessonQuestions = questions?.find( question => question?.lessonId === lessonId ); 

const handleChange = (  editor, element, type, elementkey ) => { //elementMeta.markDownContent
  if (  type === editorContentType.Question && markDownEditors?.length > 0 ) { 
 
    let markDownObject = markDownEditors?.find( obj => obj?.id === element?.id );
    if ( markDownObject ){

      let newDumbArray = [ ...markDownEditors ];

      //alert( editor.getHTML() )
      alert(JSON.stringify( markDownEditors ))

      let markDownContent = editor.getHTML();

      markDownObject = { ...markDownObject, markDownContent }
      alert(JSON.stringify( markDownObject  ))

      alert(JSON.stringify( [ ...markDownEditors, { ...markDownObject }   ] ))

      markDownEditors = newDumbArray.splice( markDownEditors.indexOf( markDownObject ), 1, markDownObject  )

      //alert(JSON.stringify( markDownEditors ))
     // setMarkDownEditor( [ ...markDownEditors, { ...markDownObject, markDownContent: editor.getHTML()  }   ] );
      //saveQuestion( { ...currentLessonQuestions, questions: [ ...markDownEditors, { ...markDownObject, markDownContent: editor.getHTML()  }   ]  } );
    // let testr = newDumbArray.splice( markDownEditors.indexOf( markDownObject ), 1, newObject  )
    }

    
 
  }
   //setMarkDownEditor( markDownEditors );

};

const handleExplanationContentMarkDownChange = (markDownEditors, editor, element, type ) => { // elementMeta.multipleChoiceQuestionExplanationAnswer
  if ( type === editorContentType.Explanation ) {
    markDownEditors = [ ...updateMarkDownEditorContent( markDownEditors, editor, element, elementMeta.markDownContent ) ];
  }
  setMarkDownEditor( markDownEditors );   
};

// const saveUploadedContent = ( markDownEditors ) => {
//   saveQuestion( { ...currentLessonQuestions, questions: markDownEditors } );
// };

return form?.map( (element) => (
  <> 
     <div className={"multipleChoiceQuestion"}>
      <label className={"labelQuestion"}>
        <br></br>               
        { `Question: ${element?.id}` }
      </label>
      <div>
          {( pointsDistributionType === points.PerQuestion ) &&  (!previewMode) &&   
             < PointsDistribution
                  element={element}
                  name={points.pointsPerQuestion}
                  value={element.questionPoints}
                  handlePointsPerQuestion={(e) => handlePointsPerQuestion(e, element?._id )}
                  handlePointsPerQuestionParam={element?.id}
             />
          }
         <div>
            <label className="labelPoints">
                {`Points :${ ( pointsDistributionType === points.Equally ) ? questionPoints :  element.questionPoints } `}
              <div>
                { `Points Received: ${ element?.pointsReceived && element?.pointsReceived[currentUser?._id]}` }
              </div>
            </label>
        </div>    
      </div>
      <div> 
          <EditorComponent
              className={"answerDisplay"}
              id={element?.id}
              handleChange={(editor) => handleChange(editor, element, editorContentType.Question, elementMeta.markDownContent )}
              content={element?.markDownContent }
              // onChange={(editor) => handleChange(editor, element?.id, editorContentType.Question, element )}
              // handleChange={(editor) => handleChange(editor, element?.id, editorContentType.Question, element )}
              //upload_url={upload_url}
              //upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, currentLessonQuestions, saveUploadedContent ) }
              //readOnly={ previewMode ? true : false }
          /> 
      </div>
      {( previewMode )    
        ?  <div>
            < LessonPlanIframeComponent
                id={element?.id}
                name="embed_readwrite"
                source={element?.videoUrl}
                width="500px"
                height="400px"
                allow="camera;microphone"
                scrolling="auto"
                frameBorder="0" 
            />
          </div>
       :  <div>
              { 
                <VideoComponent
                  id={element?.id}
                  element={element}
               />
              }
          </div>
        
                  // export const videoMeta = element  => { 
                  //   return {
                  //     videoCallIconMain,
                  //     deleteIconStyle: onlineQuestionVideoDeleteIconStyle,
                  //     videoCallIcon,
                  //     shareScreenIcon,
                  //     exitVideoCallIcon,
                  //     videoNamePrefix: 'OnlineQuestionVideoMarkDownEditors', 
                  //     recordButtonText: 'Record Question',
                  //     displayMaterialButton: true,
                  //     videoSectionClassNameRecording: "mainVideoSection-recording",
                  //     videoSectionClassNameRecordingStopped: "mainVideoSection-recordingStopped",
                  //     videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
                  //     videoClassName: ( element?.videoUrl === ""  ) ? "videoPlayer" : "",
                  //     exitVideoCallIconPageName: "OnlineListItems",
                  //     videoSectionCallOut: "videoSectionCallOut",
                  //     videoMetaData: { inputFieldId: element?._id, currentQuestion: element, name: element?._id?.toString() },
                  //     videoName: `${element?._id}_${element?._id}_${element?._id}_${element?.type}`,
                  //     videoMetaDataExternalId:'name',
                  //     buttonClassName: `toggle-stage-btns${( true ) ? "-show" : "-hide"}`, 
                  //     objectId: element?._id, 
                  //     displaySavedRecording: true
                  //   }};
                  
                  //   < MaterialUiVideoComponent 
                  //   className={"onlineQuestionVideoComponent"} 
                  //   element={ element } 
                  //   videoMeta={videoMeta( element )}
                  //   saveRecording={saveRecording}
                  //   extendedMeetingSettings={false} 
                  // />
        }
      <div>
        {(  !previewMode   ) &&  
          <div>
              { "Explanation"}
              <EditorComponent
                  id={element?.id}
                  handleChange={(editor) => handleExplanationContentMarkDownChange(editor, element, editorContentType?.Explanation)}
                  content= {   element?.multipleChoiceQuestionExplanationAnswer  }
                  readOnly={previewMode ? true : false }
              /> 
          </div>
        }
       </div>
        {( element?.multipleChoiceQuestionAnswerKey ) && (  !previewMode   ) &&
          <div  className={"answerDisplay"}>
              <div>
                  { "Your Answer:" }
                <span> <label>  {element?.multipleChoiceQuestionStudentAnswer} </label> 
                  <span className={"answerValue"}> <label>{ element?.multipleChoiceQuestionStudentAnswerInputValue }  </label>  </span>
                </span> 
              </div>
              <div>
                  { "Correct Answer: " }
                  <span> <label>  {element?.multipleChoiceQuestionAnswerKey} </label>
                      <span className={"answerValue"}> { element?.multipleChoiceQuestionAnswerKeyInputValue } </span>
                  </span>
              </div>           
          </div>
        }
          <MultiFieldComponent
              element={element}
              objectId={currentLessonQuestions?._id}
              lessonId={lessonId}
          />
       {( element.explanationQuestionAnswerKey ) &&
          <div>
            { "Explanation Question Your Answer" }
            <Interweave content={JSON.parse( element?.explanationQuestionAnswer)} />;

              { "Explanation Question Correct Answer" }
            <Interweave content={JSON.parse( element?.explanationQuestionAnswerKey)} />;
          </div>
        }
          </div>
      </>
  ));
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    questions: Object.values(state.questions.questions),
    latestQuestion: state.questions.latestQuestion,
    lessons: Object.values(state.lessons.lessons),
    markDownEditors: state.questions.markDownEditors,
    previewMode: state.app.previewMode,
  };
};

export default connect(mapState, { setMarkDownEditor, togglePreviewMode, saveQuestion, videoComponentMeta, loadQuestions })( ListItems );