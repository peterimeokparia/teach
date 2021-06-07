import 
React, { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewQuestion,
saveQuestion,
loadQuestions } from 'Services/course/Actions/Questions';

import { 
addNewGrade } from 'Services/course/Actions/Grades';

import {
elementMeta,
editorContentType,
points,
markDownEditorFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import { 
uploadFiles } from 'Services/course/helpers/ServerHelper';

import {
placeHolder } from 'Services/course/helpers/EditorHelpers';

import PointsDistribution from '../PointsDistribution';
import DropDown from '../../../Components/DropDown';
import ListItems from '../ListItems';
import './style.css';

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
let currentLessonQuestions = questions.find( question => question?.lessonId === lessonId );  
let upload_url = "http://localhost:9005/api/v1/fileUploads";
let totalPointsReceived = 0;
let [ markDownEditors, setMarkDownEditors ] = useState( [] );
let lessonTitle = lessons.find(lesson => lesson?._id === lessonId )?.title;
let [ pointsReceived, setPointsReceived ] = useState({});
const [ inputFieldObject, setInputFieldObject ] = useState([]);
const [ previewMode, setPreviewMode ] = useState(false);
const [ pointsDistributionType, setPointsDistributionType ] = useState( "" );
const [ questionPoints, setQuestionPoints ] = useState( 0 );
const [ videoUploaded, setVideoUploaded ] = useState( false );

useEffect( () => {
  loadQuestions();
  if ( currentLessonQuestions ) {   
      setMarkDownEditors( currentLessonQuestions?.questions );
  }
}, [ previewMode, loadQuestions, setMarkDownEditors, currentLessonQuestions ] );  
// }, [ previewMode, loadQuestions, setMarkDownEditors ] );  

let config = { markDownEditors, inputFieldOptions, placeHolder, pointsDistributionType, questionPoints };

const addNewMarkDownEditor = () => {
  setMarkDownEditors(
  [
    ...markDownEditors,
    markDownEditorFieldCollection(config)   
  ]);
};

const removeMarkDownEditor = () => {
  let lastInputField = markDownEditors[(markDownEditors?.length - 1)];
  let decrementedFieldSet = markDownEditors?.filter( input => input?.name !== lastInputField?.name );

  setMarkDownEditors(
  [
    ...decrementedFieldSet
  ]);
};

const handleChange = ( editor, id, type ) => {
  if ( markDownEditors.find( obj => obj?.id === id )[ elementMeta.markDownContent ] === JSON.stringify( editor.emitSerializedOutput() )) return;
  if (  type === editorContentType.Question  ) {  
      if ( markDownEditors ) {
          markDownEditors.find( obj => obj?.id === id )[ elementMeta.markDownContent ]  = JSON.stringify( editor.emitSerializedOutput() );
          //JSON.stringify(editor.emitSerializedOutput());  
      }   
  }
};

const handleExplanationContentMarkDownChange = ( editor, id, type ) => {
  if ( markDownEditors.find( obj => obj?.id === id )[ elementMeta.multipleChoiceQuestionExplanationAnswer ] === JSON.stringify( editor.emitSerializedOutput() )) return;
  if ( type === editorContentType.Explanation ) {
     markDownEditors.find( obj => obj?.id === id )[ elementMeta.multipleChoiceQuestionExplanationAnswer ]  = JSON.stringify( editor.emitSerializedOutput() );
  }   
};

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
  };
};

const handleUpdatingMarkDownEditor = ( inputfieldData, id ) => {
  setInputFieldObject( inputfieldData?.data );
  let currentEditor = markDownEditors.find( editor => editor.questionNumber === id  );

  currentEditor[ inputfieldData?.fieldName ] = inputfieldData?.data;
};

const handleUpdatingMarkDownEditorPointsReceived = ( inputfieldData, id ) => {
  setInputFieldObject( inputfieldData?.data );
  let currentEditor = markDownEditors.find( editor => editor.questionNumber === id  );

  currentEditor[ inputfieldData?.fieldName ][currentUser?._id] = inputfieldData?.data;
  if ( inputfieldData?.fieldName === elementMeta.pointsReceived ) {
        calculateTotalPointsReceived(currentUser); 
  }
};

const handlePointDistributionType = ( options ) => {
  setPointsDistributionType(options);
};

const togglePreviewMode = () => {
  setPreviewMode( ! previewMode );
  loadQuestions();
};

function savedQuestionsExist( currentLessonQuestions ) {
  return currentLessonQuestions?.length > 0;
};

const saveRecording = () => {
  togglePreviewMode();
  setVideoUploaded( false );
  if ( savedQuestionsExist( currentLessonQuestions?.questions ) ) {
      saveQuestion( {...currentLessonQuestions, questions: markDownEditors } );
  } else {
      addNewQuestion(lessonId,null, null, null, null, null, null, markDownEditors);  
  }
};

function calculateTotalPointsReceived(user){
  markDownEditors.forEach( element => {
    let value =  isNaN(parseInt( element[ elementMeta.pointsReceived ][user?._id], 10 ))  ? 0 : parseInt( element[ elementMeta.pointsReceived ][user?._id], 10 );

    totalPointsReceived += value;
    let total = {};

    total[user._id] = totalPointsReceived;
    setPointsReceived(total);
    element[elementMeta.totalPointsReceived][user?._id] = totalPointsReceived;
  });
  markDownEditors[0].totalPointsReceived[user?._id] = totalPointsReceived;
}

async function uploadImageUrl(file, imageBlock, id) {
  await fetch( imageBlock?.img?.currentSrc )
        .then( result => result.blob())
        .then( response => { uploadFiles([ response ], currentLessonQuestions, upload_url, "questions", file?.name,  null )
        .then( resp => { console.log( resp ); }); })
        .catch( error => { console.log( error ); });

  let inputFieldObject = JSON.parse(  markDownEditors.find(obj => obj?.id === id  )[ elementMeta.markDownContent ] );

  Object.values(inputFieldObject).forEach( block => {
    if ( Object.keys( block ).length > 0 ) {
       block.find( obj => obj?.type === "image" && obj?.data?.url === imageBlock?.img?.currentSrc ).data.url = `http://localhost:3000/files/${ file?.name }`;
    } });
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
  if ( previewMode && videoUploaded ) { // change for video upload
      togglePreviewMode();   
  } else {
    if ( savedQuestionsExist( currentLessonQuestions?.questions ) ) {
        //calculateTotalPointsReceived();
        saveQuestion( {...currentLessonQuestions, questions: markDownEditors } );
    } else {
        addNewQuestion(lessonId,null, null, null, null, null, null, markDownEditors);  
    }
  }   
};

let form = (  previewMode   )  ?  currentLessonQuestions?.questions  :   markDownEditors;

let listItemConfig = { 
  form, 
  pointsDistributionType,
  previewMode, 
  handlePointsPerQuestion, 
  questionPoints, 
  handleChange, 
  upload_url, 
  uploadImageUrl,
  currentLessonQuestions, 
  setRecordingCompletionStatus, 
  videoUploaded, 
  saveRecording,
  handleExplanationContentMarkDownChange,
  currentUser, 
  inputFieldObject,
  handleUpdatingMarkDownEditor,
  handleUpdatingMarkDownEditorPointsReceived, 
  togglePreviewMode,
  handleSubmit, 
  lesson };

    return(
      <div className="answers"> 
          <header>
              <button className="test" onClick={ togglePreviewMode }>Toggle Preview Mode</button>
                      Lesson: {lessonTitle}
                      Total Points Received: {markDownEditors[0]?.totalPointsReceived[currentUser?._id ]}
                      {/* { pointsReceived[ currentUser?._id ] } */}
          </header>
            <div className="content">  
                   {( !previewMode ) && <div className="sidebar">
                        <div className="input-field-builder-selector">  
                          {
                            <DropDown 
                                label={""}
                                key={elementMeta._id}
                                value={elementMeta.name}
                                optionCollection={[ {_id: "Point Distribution",  name:  "Point Distribution" }, { _id: points.PerQuestion,  name: points.PerQuestion }, { _id: points.Equally,  name: points.Equally } ]}
                                setOptionSelectedValue={handlePointDistributionType} 
                            />
                          }
                            </div>
                                { pointsReceived[ currentUser?._id ] }
                            <div>
                            <button  className={'form-builder-btn'} onClick={handleSubmit} > { savedQuestionsExist( questions ) ? "Save Edits" : "Save" }</button>
                            </div>
                          </div>
                   }
                  <div> 
                    {(pointsDistributionType === points.Equally ) && 
                        <div> 
                            { "Points:" }
                            {PointsDistribution(points.equalPointsDistribution, points.equalPointsDistribution, questionPoints, handlePointsPerQuestion, points.equalPointsDistribution)}  
                        </div>
                    }
                    {
                        <ListItems config={listItemConfig}/>
                    }
                    <div> <br></br> </div>
                    {(! previewMode ) &&  
                        <div>
                            <input className="form-builder-btn" type="button" onClick={addNewMarkDownEditor} value="+" />
                            <input className="form-builder-btn" type="button" onClick={removeMarkDownEditor} value="-" />
                        </div>   
                    }       
                  <div>
                     { (!previewMode) && <button  className={'form-builder-btn'} onClick={handleSubmit} > { savedQuestionsExist( questions ) ? "Save Edits" : "Save" }</button>}
                </div>
           </div>
          </div>
        </div> 
    );
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    questions: Object.values(state.questions.questions),
    latestQuestion: state.questions.latestQuestion,
    lessons: Object.values(state.lessons.lessons),
  };
};

export default connect(mapState, { addNewQuestion, saveQuestion, loadQuestions, addNewGrade })(MultiEditorComponent);