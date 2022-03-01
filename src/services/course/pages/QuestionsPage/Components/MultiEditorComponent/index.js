import { 
useState, 
useEffect } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/node_modules/react';

import { 
connect } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/node_modules/react-redux';

import { 
addNewQuestion,
saveQuestion,
loadQuestions,
setMarkDownEditor } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/node_modules/Services/course/Actions/Questions';

import { 
togglePreviewMode } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/node_modules/Services/course/Actions/App';

import {
savedQuestionsExist } from './helpers';

import { 
addNewGrade } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/node_modules/Services/course/Actions/Grades';

import {
elementMeta,
points,
markDownEditorFieldCollection } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/node_modules/Services/course/Pages/QuestionsPage/helpers';

import {
placeHolder } from 'services/course/pages/QuestionsPage/components/MultiEditorComponent/node_modules/Services/course/helpers/EditorHelpers';

import PointsDistribution from '../PointsDistribution';
import DropDown from '../../../Components/DropDown';
import ListItems from '../ListItems';
import './style.css';

const MultiEditorComponent = ( {
  currentUser,   
  lessonId,
  lessons,  
  inputFieldOptions,
  markDownEditors,
  setMarkDownEditor,
  previewMode,
  exam,
  question,
  questions,
  latestQuestion,
  togglePreviewMode,
  addNewQuestion,
  saveQuestion,
  loadQuestions,
  addNewGrade, 
  video } ) => {
  let currentLessonQuestions = questions.find( question => question?.lessonId === lessonId );  
  let lessonTitle = lessons.find(lesson => lesson?._id === lessonId )?.title;
  // let [ pointsReceived, setPointsReceived ] = useState({});
  const [ pointsDistributionType, setPointsDistributionType ] = useState( "" );
  const [ questionPoints, setQuestionPoints ] = useState( 0 );

  useEffect( () => {
    loadQuestions();
    if ( currentLessonQuestions ) {   
          setMarkDownEditor( currentLessonQuestions?.questions );
    }
  },[ previewMode, loadQuestions, setMarkDownEditor ] );  

  let config = { 
    markDownEditors, 
    inputFieldOptions, 
    placeHolder, 
    pointsDistributionType, 
    questionPoints 
  };

const addNewMarkDownEditor = () => {
  setMarkDownEditor(  [
    ...markDownEditors,
    markDownEditorFieldCollection(config)   
  ]);
};

const removeMarkDownEditor = () => {
  let lastInputField = markDownEditors[(markDownEditors?.length - 1)];
  let decrementedFieldSet = markDownEditors?.filter( input => input?.name !== lastInputField?.name );

  setMarkDownEditor( [ ...decrementedFieldSet ] );
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

const handlePointDistributionType = ( options ) => {
  setPointsDistributionType(options);
};

const togglePreview = () => {
  togglePreviewMode();
  loadQuestions();
};

const handleSubmit = () => {
  setMarkDownEditor( markDownEditors );
  if ( savedQuestionsExist( currentLessonQuestions?.questions ) ) {

      saveQuestion( {...currentLessonQuestions, questions: markDownEditors } );
      
  } else {

    let newQuestion = {
        lessonId, 
        questions:markDownEditors,
        studentId:null, 
        operatorId:null, 
        coursesCovered:null, 
        lessonsCovered:null, 
        examId:null, 
        assignmentId:null, 

    };
    addNewQuestion( newQuestion ); 
  } 
};

let form = (  previewMode   )  ?  currentLessonQuestions?.questions  :   markDownEditors;

return(
      <div className="answers"> 
          <header>
            <button className="test" onClick={ togglePreview }>Toggle Preview Mode</button>
                  Lesson: {lessonTitle}
                  {/* Total Points Received: {markDownEditors[0]?.totalPointsReceived[currentUser?._id ]} */}
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
                                {/* { pointsReceived[ currentUser?._id ] }  */}
                                {/* { markDownEditors[0]?.totalPointsReceived[currentUser?._id] } */}
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
                        <ListItems
                          lessonId={lessonId}
                          form={ form } 
                          handlePointsPerQuestion={handlePointsPerQuestion}
                          pointsDistributionType={pointsDistributionType}
                          questionPoints={questionPoints}
                        />
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
    markDownEditors: state.questions.markDownEditors,
    previewMode: state.app.previewMode,
  };
};

export default connect(mapState, { addNewQuestion, saveQuestion, loadQuestions, addNewGrade, setMarkDownEditor, togglePreviewMode })(MultiEditorComponent);




 //}, [ previewMode, loadQuestions, setMarkDownEditors, currentLessonQuestions ] );  