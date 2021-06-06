import React from 'react';

import {
points } from 'Services/course/Pages/QuestionsPage/helpers';

//import EditorComponent  from '../EditorComponent';
import PointsDistribution from '../PointsDistribution';
import MultiFieldComponent from '../MultiFieldComponent';
import VideoComponent from '../VideoComponent';
import LessonPlanIframeComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanIframeComponent';
import './style.css';

const ListItems = ({config}) =>
{
  if ( ! config?.form ) {
  return <div>{"Test."}</div>;
  }

  return config?.form?.map((element) => (
    <> 
     <div className={"multipleChoiceQuestion"}>
      <label className={"labelQuestion"}>
        <br></br>               
        { `Question: ${element?.id}` }
      </label>
      <div>
          {( config.pointsDistributionType === points.PerQuestion ) &&  (!config.previewMode) &&   
             < PointsDistribution
                  element={element}
                  name={points.pointsPerQuestion}
                  value={element.questionPoints}
                  handlePointsPerQuestion={config.handlePointsPerQuestion}
                  handlePointsPerQuestionParam={element?.id}
             />
          }
         <div>
            <label className="labelPoints">
                {`Points :${ ( config.pointsDistributionType === points.Equally ) ? config.questionPoints :  element.questionPoints } `}
              <div>
                { `Points Received: ${ element?.pointsReceived && element?.pointsReceived[config.currentUser?._id]}` }
              </div>
            </label>
        </div>    
      </div>
      <div>
          {/* <EditorComponent
              className={"answerDisplay"}
              key={element?.id}
              id={element?.id}
              name={element?.name}
              onChange={(editor) => config?.handleChange(editor, element?.id, editorContentType.Question, element )}
              content={JSON.parse( element?.markDownContent )}//{JSON.parse( element?.markDownContent ) }
              upload_url={config.upload_url}
              upload_handler={( file, imageBlock ) => config?.uploadImageUrl( file, imageBlock, element?.id )}
              readOnly={config.previewMode? true : false }
          />  */}
      </div>
      {( config.previewMode )    ?  <div>
            < LessonPlanIframeComponent
                key={element?.id}
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
            <VideoComponent
                key={element?.id}
                id={element?.id}
                name={element?.id}
                objectId={config.currentLessonQuestions?._id}
                videoMetaData={{inputFieldId: element?.id, currentQuestion: element} }
                videoMetaDataExternalId={'name'}
                videoNamePrefix={"QuestionVideoMarkDownEditors"}
                videoName={`${element?.id}_${element?.questionNumber}_${element?.id}_${element?.type}`}
                setRecordingCompletionStatus={status => config?.setRecordingCompletionStatus( status, element?.id )}
                handleSubmit={config?.handleSubmit}
            />
                { config?.videoUploaded  &&  <button className="test" onClick={ config?.saveRecording }>Save Recording</button> }
          </div>
        }
      <div>
        {(  !config.previewMode   ) &&  
          <div>
              { "Explanation"}
              {/* <EditorComponent
                  key={element?.id}
                  id={element?.id}
                  name={element?.name}
                  onChange={(editor) => config?.handleExplanationContentMarkDownChange(editor, element?.id, editorContentType?.Explanation)}
                  content= { JSON.parse( element?.multipleChoiceQuestionExplanationAnswer ) }
                  readOnly={config?.previewMode? true : false }
              />  */}
          </div>
        }
       </div>
        {( element?.multipleChoiceQuestionAnswerKey ) && (  !config?.previewMode   ) &&
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
              currentUser={config?.currentUser} 
              questionNumber={ element?.id }
              markDownEditorNumber={element?.name}
              objectId={config.currentLessonQuestions?._id}
              inputFieldObject={config?.inputFieldObject}
              handleUpdatingMarkDownEditor={fields => config?.handleUpdatingMarkDownEditor( fields, element?.id )}
              handleUpdatingMarkDownEditorPointsReceived={fields => config?.handleUpdatingMarkDownEditorPointsReceived( fields, element?.id )}
              previewMode={config?.previewMode}
              inputFieldData={element}
              lesson={config.lesson}
              togglePreviewMode={config?.togglePreviewMode}
              handleSubmit={config?.handleSubmit}
          />
       {
          ( element.explanationQuestionAnswerKey ) &&
              <div>
                { "Explanation Question Your Answer" }
                  {/* <EditorComponent
                      key={element?.id}
                      id={element?.id}
                      name={element?.name}
                      content= {JSON.parse( element?.explanationQuestionAnswer )}
                      read_only={ true } 
                    />  */}
                  { "Explanation Question Correct Answer" }
                    {/* <EditorComponent
                        key={element?.id}
                        id={element?.id}
                        name={element?.name}
                        content= { JSON.parse( element?.explanationQuestionAnswerKey ) }
                        read_only={ true  } 
                    />  */}
              </div>
        }
             </div>
      </>
  ));
};

export default ListItems;