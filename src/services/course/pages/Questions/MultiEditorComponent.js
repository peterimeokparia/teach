import 
React, { 
useState, 
useRef, 
useEffect } from 'react';


import { 
connect } from 'react-redux';



import { 
addNewQuestion,
saveQuestion,
loadQuestions,
addNewGrade } from '../../actions';



import {
labelValue,
elementMeta,
editorContentType,
points } from './questionHelpers';



import { 
uploadFiles,
uploadVideos } from  '../../../../helpers/serverHelper';



import {
lorem,
h1,
code } from '../../../../helpers/editorHelpers';



import { 
Rnd } from 'react-rnd';



import EditorComponent  from './EditorComponent'
import MultiFieldComponent from './MultiFieldComponent';
import DropDownSelectorComponent from '../Components/DropDownSelectorComponent';
import VideoComponent from './VideoComponent';
import LessonPlanIframeComponent from '../LessonPlan/LessonPlanIframeComponent';
import e from 'cors';

import './answers.css';


const MultiEditorComponent = ( {
currentUser,   
lessonId,
lessons,  
inputFieldOptions,
exam,
question,
questions,
latestQuestion,
addNewQuestion,
saveQuestion,
loadQuestions,
addNewGrade, 
dispatch } ) => {
 


let lesson = lessons.find(lesson => lesson?._id === "5fcf8f4c3746f3032f4e2a11" );  
let totalPoints, testPoints, currentLessonQuestions = questions.find( question => question?.lessonId === lessonId );  
let upload_url = "http://localhost:9005/api/v1/fileUploads"
let totalPointsReceived = 0;
let imageObject = {};
let [ markDownEditors, setMarkDownEditors ] = useState( [] );
let lessonTitle = lessons.find(lesson => lesson?._id === lessonId )?.title;
let [ pointsReceived, setPointsReceived ] = useState( 0 );
const [ inputFieldObject, setInputFieldObject ] = useState([]);
const [ previewMode, setPreviewMode ] = useState(false);
const [ pointsDistributionType, setPointsDistributionType ] = useState( "" );
const [ questionPoints, setQuestionPoints ] = useState( 0 );
const [ videoUploaded, setVideoUploaded ] = useState( false );
const [ currentEditorsMarkDownContent, setCurrentEditorsMarkDownContent ] = useState( null )




useEffect( () => {

  loadQuestions();

  if ( currentLessonQuestions ) {   
      setMarkDownEditors( currentLessonQuestions?.questions );
  }
}, [ previewMode, loadQuestions, setMarkDownEditors, loadQuestions ] );  




const addNewMarkDownEditor = () => {
  setMarkDownEditors(
  [
      ...markDownEditors,
      { 
        questionNumber: markDownEditors?.length + 1,     
        id: markDownEditors?.length + 1,  
        name:`markDownEditor${(markDownEditors?.length + 1).toString()}`,  
        type: inputFieldOptions?.type,  
        placeHolderText: inputFieldOptions?.placeHolder,
        questionCreatedOnDateTime: Date.now(),
        markDownContent: {},
        value: "",
        multipleChoiceQuestionAnswerKey: "",
        multipleChoiceQuestionStudentAnswer: "",
        multipleChoiceQuestionStudentAnswerInputValue: "",
        multipleChoiceQuestionAnswerKeyInputValue: "",
        multipleChoiceQuestionExplanationAnswer: {},
        explanationQuestionAnswerKey: {},
        explanationQuestionAnswer: {},
        markDownEditorFormInputFields: [],
        pointsPerQuestion: pointsDistributionType,
        questionPoints: questionPoints,
        pointsReceived: 0,
        totalPointsReceived: 0,
        videoUrl: ""
      }   
  ]);
} 





const removeMarkDownEditor = () => {
  let lastInputField = markDownEditors[(markDownEditors?.length - 1)];
  let decrementedFieldSet = markDownEditors?.filter( input => input?.name !== lastInputField?.name );
  setMarkDownEditors(
  [
      ...decrementedFieldSet
  ]);
}





const handleChange = ( editor, id, type, currentMarkDownEditor ) => {
  if (  type === editorContentType.Question  ) {
      
      markDownEditors.find( obj => obj?.id === id )[ elementMeta.markDownContent ]  = 
          JSON.stringify(editor.emitSerializedOutput());
 
  }
}





const handleExplanationContentMarkDownChange = ( editor, id, type ) => {
  if ( type === editorContentType.Explanation ) {

     markDownEditors.find( obj => obj?.id === id )[ elementMeta.multipleChoiceQuestionExplanationAnswer ]  = 
       JSON.stringify(editor.emitSerializedOutput());

  }   
}





const handlePointsPerQuestion = ( event, id ) => {
  let inputFieldObject = markDownEditors?.find( obj => obj?.id === id );
  setQuestionPoints( event.target.value );

  if ( event.target.name === elementMeta.equalPointsDistribution ) {    
      if ( inputFieldObject ) {
        inputFieldObject[ elementMeta.questionPoints ] =   event.target.value;
      }
  } 

  if ( event.target.name === elementMeta.pointsPerQuestion ) {              
      if ( inputFieldObject ) {
        inputFieldObject[ elementMeta.questionPoints ] =   event.target.value;
      }
  }
}





const handleUpdatingMarkDownEditor = ( inputfieldData, id ) => {
  setInputFieldObject( inputfieldData?.data );
  let currentEditor = markDownEditors.find( editor => editor.questionNumber === id  )[ inputfieldData?.fieldName ];
  currentEditor  = inputfieldData?.data;

  if ( inputfieldData?.fieldName === elementMeta.pointsReceived ) {
       calculateTotalPointsReceived(); 
  }
}






const getCurrentMarkDownEditor = ( id, markDownEditorObjectValue ) => {
   if ( markDownEditorObjectValue ) {
       return markDownEditors?.find( obj => obj?.id === id )[ markDownEditorObjectValue ];
   } 
   return markDownEditors?.find( obj => obj?.id === id );
}






const handlePointDistributionType = ( options ) => {
  setPointsDistributionType(options)
}





const togglePreviewMode = () => {
  setPreviewMode( ! previewMode );
  loadQuestions();
}





function savedQuestionsExist( currentLessonQuestions ) {
  return currentLessonQuestions?.length > 0;
}




const saveRecording = () => {
   togglePreviewMode();
   setVideoUploaded( false );
}




function calculateTotalPointsReceived(){
  markDownEditors.forEach( element => {
     let value =  isNaN(parseInt( element[ elementMeta.pointsReceived ], 10 ))  ? 0 : parseInt( element[ elementMeta.pointsReceived ], 10 );
     totalPointsReceived += value;
      setPointsReceived( totalPointsReceived )
      element[elementMeta.totalPointsReceived] = totalPointsReceived;
  });
  markDownEditors[0].totalPointsReceived = totalPointsReceived;
}





async function uploadImageUrl(file, imageBlock, id) {
  
   let imageObject = {};
   imageObject['fileName'] = file?.name;
   imageObject['imageBlobUrl'] = imageBlock?.img?.currentSrc; 
   imageObject['currentOuterHtml'] = imageBlock?.img?.outerHTML;
   imageObject['newFileUrl'] = `http://localhost:3000/files/${ file?.name }`;

  const imageFile = await fetch( imageBlock?.img?.currentSrc )
     .then( result => result.blob())
       .then( response => { 
         uploadFiles([ response ], currentLessonQuestions, upload_url, "questions", file?.name,  null )
        .then( resp => {
            console.log( resp );
        })
      })
       .catch( error => { 
        console.log( error ) 
   });

  let inputFieldObject = JSON.parse(  markDownEditors.find(obj => obj?.id === id  )[ elementMeta.markDownContent ] );
  
  Object.values(inputFieldObject).forEach( block => {

    if ( Object.keys( block ).length > 0 ) {
       block.find( obj => obj?.type === "image" && obj?.data?.url === imageBlock?.img?.currentSrc ).data.url = `http://localhost:3000/files/${ file?.name }`;
    }   
  });
   
  markDownEditors.find( obj => obj?.id === id  )[ elementMeta.markDownContent ] = JSON.stringify( inputFieldObject );  
  saveQuestion( { ...currentLessonQuestions, questions: markDownEditors } );
}





function setRecordingCompletionStatus( videoUploaded, id ){
  if ( videoUploaded ) {
      setVideoUploaded( videoUploaded );
  }
}





const handleSubmit = () => {
      //addNewGrade

  if ( previewMode ){
       togglePreviewMode();   
  } else {

        if ( savedQuestionsExist( currentLessonQuestions?.questions ) ) {
            //calculateTotalPointsReceived();
            saveQuestion( {...currentLessonQuestions, questions: markDownEditors } );
        } else {
            addNewQuestion(lessonId,null, null, null, null, null, null, markDownEditors);  
        }
  }   
}




let form = (  previewMode   )  ?  currentLessonQuestions?.questions  :   markDownEditors;




return(
      <div className="answers"> 

                  <header>
                      <button className="test" onClick={ togglePreviewMode }>Toggle Preview Mode</button>
                              Lesson: {lessonTitle}
                              Total Points Received: { pointsReceived }
                              { form && <div> {form[0]?.totalPointsReceiveds } </div> }
                  </header>

                   <div className="content">  

                   {
                      ( !previewMode ) && <div className="sidebar">
                              <div className="input-field-builder-selector">  
                                {
                                  <DropDownSelectorComponent 
                                          label={""}
                                          key={elementMeta._id}
                                          value={elementMeta.name}
                                          optionCollection={[ {_id: "Point Distribution",  name:  "Point Distribution" }, { _id: points.PerQuestion,  name: points.PerQuestion }, { _id: points.Equally,  name: points.Equally } ]}
                                          setOptionSelectedValue={handlePointDistributionType} 
                                  />
                                }
                              </div>
                                   { pointsReceived }
                              <div>
                                  <button  className={'form-builder-btn'} onClick={handleSubmit} > { savedQuestionsExist( questions ) ? "Save Edits" : "Save" }</button>
                              </div>

                            </div>

                   }
                
                  <div> 
                    {
                      ( pointsDistributionType === points.Equally ) && 
                          <div> 
                              { "Points:" } 
                                <input
                                    id={points.equalPointsDistribution}
                                    type={"number"}
                                    name={points.equalPointsDistribution}
                                    value={ questionPoints }
                                    onChange={ ( event ) => handlePointsPerQuestion(event, points.equalPointsDistribution) }
                                />
                          </div>
                    }
   
                   {
                      form?.map((element) => (
                          <> 
                           <div className={"multipleChoiceQuestion"}>
                            <label className={"labelQuestion"}>
                              <br></br>               
                              { `Question: ${element?.id}` }
                            </label>
                            <div>
                                {
                                  ( pointsDistributionType === points.PerQuestion ) &&  (!previewMode) &&
                                    
                                    <input
                                        id={element?.id}
                                        type={"number"}
                                        name={points.pointsPerQuestion }
                                        value={ element.questionPoints }
                                        onChange={ ( event ) => handlePointsPerQuestion(event, element?.id) }
                                    />
                                }

                               <div>
                                  <label className="labelPoints">
                                      {`Points :${ ( pointsDistributionType === points.Equally ) ? questionPoints :  element.questionPoints } `}
                                    <div>
                                      { `Points Received: ${ element?.pointsReceived}` }
                                      {/* {`Points Received :${calculatePointsReceived(element.multipleChoiceQuestionAnswerKey?.toLowerCase(), element.multipleChoiceQuestionStudentAnswer?.toLowerCase(),  ( pointsDistributionType === points.Equally ) ? questionPoints :  element.questionPoints, element?.id  ) }` } */}
                                    </div>

                                  </label>
                              </div>    
                            </div>
                            
                            <div>
                                <EditorComponent
                                    className={"answerDisplay"}
                                    key={element?.id}
                                    id={element?.id}
                                    name={element?.name}
                                    onChange={(editor) => handleChange(editor, element?.id, editorContentType.Question, element )}
                                    content={JSON.parse( element.markDownContent ) }
                                    upload_url={upload_url}
                                    upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element?.id )}
                                    readOnly={previewMode? true : false }
                                /> 
                            </div>


                            {

                            // ( contentType( element.editorContentType ).isVideoContentType ) &&    

                              ( previewMode )    ?  <div>
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
                              :     <div> 
                                        <VideoComponent
                                              key={element?.id}
                                              id={element?.id}
                                              name={element?.id}
                                              objectId={currentLessonQuestions?._id}
                                              videoMetaData={{inputFieldId: element?.id, currentQuestion: element} }
                                              videoMetaDataExternalId={'name'}
                                              videoNamePrefix={"QuestionVideoMarkDownEditors"}
                                              videoName={`${element?.id}_${element?.questionNumber}_${element?.id}_${element?.type}`}
                                              setRecordingCompletionStatus={status => setRecordingCompletionStatus( status, element?.id )}
                                              handleSubmit={handleSubmit}
                                        />
                                        { videoUploaded  &&  <button className="test" onClick={ saveRecording }>Save Recording</button> }
                                  </div>

                              }

                            <div>
                              {
                                 (  !previewMode   ) &&  
                                <div>
                                  { "Explanation"}
                                   <EditorComponent
                                       key={element?.id}
                                       id={element?.id}
                                       name={element?.name}
                                       onChange={(editor) => handleExplanationContentMarkDownChange(editor, element?.id, editorContentType.Explanation)}
                                       content= { JSON.parse( element.multipleChoiceQuestionExplanationAnswer ) }
                                       readOnly={previewMode? true : false }
                                   /> 
                                </div>
                              }
                             
                             </div>
                      
                              {
                                  ( element.multipleChoiceQuestionAnswerKey ) && (  !previewMode   ) &&
                                      <div  className={"answerDisplay"}>
                                        <div>
                                            { "Your Answer:" }
                                          <span> <label>  {element.multipleChoiceQuestionStudentAnswer} </label> 
                                            <span className={"answerValue"}> <label>{ element.multipleChoiceQuestionStudentAnswerInputValue }  </label>  </span>
                                          </span> 
                                        </div>
                                    
                                        <div>
                                            { "Correct Answer: " }
                                            <span> <label>  {element.multipleChoiceQuestionAnswerKey} </label>
                                                <span className={"answerValue"}> { element.multipleChoiceQuestionAnswerKeyInputValue } </span>
                                              </span>
                                          </div> 
                                        
                                      </div>
                              }

                                  <MultiFieldComponent
                                        currentUser={currentUser}
                                        questionNumber={ element?.id }
                                        markDownEditorNumber={element?.name}
                                        objectId={currentLessonQuestions?._id}
                                        inputFieldObject={inputFieldObject}
                                        handleUpdatingMarkDownEditor={fields => handleUpdatingMarkDownEditor( fields, element?.id )}
                                        previewMode={previewMode}
                                        inputFieldData={element}
                                        lesson={lesson}
                                        togglePreviewMode={togglePreviewMode}
                                        handleSubmit={handleSubmit}  
                                  />
                             {
                                ( element.explanationQuestionAnswerKey ) &&
                                    <div>
                                      { "Explanation Question Your Answer" }
                                        <EditorComponent
                                              key={element?.id}
                                              id={element?.id}
                                              name={element?.name}
                                              content= {JSON.parse( element.explanationQuestionAnswer )}
                                              read_only={ true } 
                                          /> 
                      
                                        { "Explanation Question Correct Answer" }
                                          <EditorComponent
                                                key={element?.id}
                                                id={element?.id}
                                                name={element?.name}
                                                content= { JSON.parse( element.explanationQuestionAnswerKey ) }
                                                read_only={ true  } 
                                            /> 
                                    </div>
                              }
                                   </div>
                            </>
                          
                        ))  
                      }

                    <div> <br></br> </div>

                    {
                        (! previewMode ) &&  
                              <div>
                                  <input className="form-builder-btn" type="button" onClick={addNewMarkDownEditor} value="+" />
                                  <input className="form-builder-btn" type="button" onClick={removeMarkDownEditor} value="-" />
                              </div>   
                    }       
                  <div>
                     <button  className={'form-builder-btn'} onClick={handleSubmit} > { savedQuestionsExist( questions ) ? "Save Edits" : "Save" }</button>
                  </div>
           </div>
          </div>
        </div>
                       
    )
}


const mapState = ( state, ownProps ) => {
  return {
      currentUser: state.users.user,
      questions: Object.values(state.questions.questions),
      latestQuestion: state.questions.latestQuestion,
      lessons: Object.values(state.lessons.lessons),
  }
}

export default connect(mapState, { addNewQuestion, saveQuestion, loadQuestions, addNewGrade })(MultiEditorComponent);