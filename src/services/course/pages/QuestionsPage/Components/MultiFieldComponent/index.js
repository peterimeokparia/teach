import { 
useState, 
useEffect } from 'react';

import {
connect } from 'react-redux';

import {
role } from 'services/course/helpers/PageHelpers';

import { 
placeHolder } from 'services/course/helpers/EditorHelpers';

import {
loadQuestions,
saveQuestion,
setMarkDownEditor } from 'services/course/actions/questions';

import {
toggleRecordingStatus } from 'services/course/actions/video';

import {
elementMeta,
editorContentType,
labelType,
dropDownOptions, 
handleSettingMultipleChoiceValue,
setMultipleChoiceLabelValue,
setMultipleChoiceValue,
calculatePointsReceived,
handleMultiFieldFormEvents,
contentType, 
setFieldCollection} from 'services/course/pages/QuestionsPage/helpers';

import EditorComponent from 'services/course/pages/Components/EditorComponent';
import VideoComponent from 'services/course/pages/QuestionsPage/components/VideoComponent';
import LessonPlanIframeComponent from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponent';
import DropDown from 'services/course/pages/Components/DropDown';
import './style.css';
// upload files to do

const MultiFieldComponent = ( { 
  currentUser,  
  element,
  lessonId,
  markDownEditors,
  setMarkDownEditor,
  inputFieldOptions,
  previewMode,
  objectId,
  questions,
  loadQuestions,
  saveQuestion,
  toggleRecordingStatus,
  video,
  togglePreviewMode }) =>  { 

  const [ fieldName,  setFieldName ] = useState( "" );
  const [ fieldValue,  setFieldValue ] = useState( "" );
  // const [ multipleChoiceAnswer, setMultipleChoiceAnswer ] = useState( "" );
  const [ inputFields, setInputFields ] = useState([]);
  const [ labelDropDownSelectedValue, setlabelDropDownSelectedValue ] = useState( "" );
  const [ inputTypeValue, setinputTypeValue ] = useState( "" );

  useEffect(() => {
    let inputFieldBuilder = document.getElementById( elementMeta.InputFieldCreator );

    handleMultiFieldFormEvents( inputFieldBuilder, 'click', inputFields, handleUpdatingMarkDownEditor, elementMeta.markDownEditorFormInputFields ); 
    handleMultiFieldFormEvents( inputFieldBuilder, 'mouseup', inputFields, handleUpdatingMarkDownEditor, elementMeta.markDownEditorFormInputFields ); 
    handleMultiFieldFormEvents( inputFieldBuilder, 'mousedown', inputFields, handleUpdatingMarkDownEditor, elementMeta.markDownEditorFormInputFields ); 

    if ( element ) {
      setInputFields( element?.markDownEditorFormInputFields );
    } 
  }, [ inputFields, inputTypeValue, setInputFields, handleUpdatingMarkDownEditor, element ] );  

  let questionNumber = element?.id;
  let markDownEditorNumber= element?.name;
  let currentLessonQuestions = questions.find( question => question?.lessonId === lessonId );  

const addNewInputField = () => {
  let config = { questionNumber, markDownEditorNumber, inputFields, inputTypeValue, inputFieldOptions, labelDropDownSelectedValue, placeHolder };

  if ( inputFields ) {
     handleUpdatingMarkDownEditor( { data: inputFields, fieldName: elementMeta.markDownEditorFormInputFields } ); 
  }
  
  let fieldCollection =  [...inputFields.filter(obj =>  obj?.questionNumber === questionNumber && obj?.markDownEditorNumber === markDownEditorNumber ),
    setFieldCollection(config, setMultipleChoiceValue, setMultipleChoiceLabelValue)  
  ];

  setInputFields( fieldCollection );

  if ( fieldCollection ) {
     handleUpdatingMarkDownEditor( { data: fieldCollection, fieldName: elementMeta.markDownEditorFormInputFields } ); 
  }
};

const removeInputField = () => {
  let lastInputField = inputFields[(inputFields?.length - 1)];
  let decrementedFieldSet = inputFields?.filter( input => input?.name !== lastInputField?.name );

  setInputFields(
  [
    ...decrementedFieldSet
  ]);
  handleUpdatingMarkDownEditor( { data: decrementedFieldSet, fieldName: elementMeta.markDownEditorFormInputFields } ); 
};

const handleMarkDownContentChange = ( event ) => {
  setFieldName( event.target.name );
  setFieldValue( event.target.value );
  inputFields.find(obj => obj?.name === event?.target?.name && 
        obj?.questionNumber === questionNumber && obj?.markDownEditorNumber === markDownEditorNumber )[ elementMeta.value ] = event.target.value;
  setInputFields( inputFields );      
  handleUpdatingMarkDownEditor( { data: inputFields, fieldName: elementMeta.markDownEditorFormInputFields } );       
};

const handleMultipleChoiceAnswerChange = ( event ) => {
  // setMultipleChoiceAnswer( event.target.value );
  let inputField = inputFields.find(obj => obj?.id.toString() === event?.target?.id && 
    obj?.questionNumber === questionNumber && obj?.markDownEditorNumber === markDownEditorNumber );

   if ( inputField ) {
      if ( currentUser.role === role.Tutor ) {
          inputField[ elementMeta.multipleChoiceAnswerKeyValue ] = event.target.value;
          handleSettingMultipleChoiceValue( inputField, event, elementMeta.multipleChoiceQuestionAnswerKey, elementMeta.multipleChoiceQuestionAnswerKeyInputValue, handleUpdatingMarkDownEditor );
      }
      if ( currentUser.role === role.Student ) {
          inputFields.find(obj => obj?.questionNumber === questionNumber && obj?.markDownEditorNumber === markDownEditorNumber)[ elementMeta.questionAnsweredOnDateTime ] = Date.now(); 
          inputField[ elementMeta.multipleChoiceAnswerValue ] = event.target.value;
          handleSettingMultipleChoiceValue( inputField, event,  elementMeta.multipleChoiceQuestionStudentAnswer, elementMeta.multipleChoiceQuestionStudentAnswerInputValue, handleUpdatingMarkDownEditor );
          handleUpdatingMarkDownEditorPointsReceived( { data: calculatePointsReceived( element?.multipleChoiceQuestionAnswerKey, event.target.value, element?.questionPoints  ), fieldName: elementMeta.pointsReceived } ); 
      }
   }    
};

const handleDropDownSelectorLabelTypeChange = ( selectedOption ) => {
  handleDropDownSelectors( setlabelDropDownSelectedValue, elementMeta.labelTypeDropDownSelectedValue, selectedOption );
};

const handleDropDownSelectorInputTypeChange = ( selectedOption ) => {
  handleDropDownSelectors( setinputTypeValue, elementMeta.inputTypeDropDownSelectedValue, selectedOption );
};

const saveRecording = ( element ) => { 
  togglePreviewMode();
  toggleRecordingStatus({ ...video[ element?._id ], recordingStatus: false });
};

const handleFormSubmit = ( event ) => {
    event.preventDefault();
};

const handleChange = ( editor, id, type ) => {
  if ( markDownEditors.find( obj => obj?.id === id )[ elementMeta.markDownContent ] === JSON.stringify( editor.emitSerializedOutput() )) return;
  if (  type === editorContentType.Question  ) {  
      if ( markDownEditors ) {
          markDownEditors.find( obj => obj?.id === id )[ elementMeta.markDownContent ]  = JSON.stringify( editor.emitSerializedOutput() ); 
      }   
  }
  setMarkDownEditor( markDownEditors );
};

const handleUpdatingMarkDownEditorPointsReceived = ( inputfieldData, id ) => {
  let currentEditor = markDownEditors.find( editor => editor.questionNumber === id  );

  currentEditor[ inputfieldData?.fieldName ][currentUser?._id] = inputfieldData?.data;
  if ( inputfieldData?.fieldName === elementMeta.pointsReceived ) {
        calculateTotalPointsReceived(currentUser); 
  }
  setMarkDownEditor( markDownEditors );
  saveQuestion( { ...currentLessonQuestions, questions: markDownEditors } );
};

function handleUpdatingMarkDownEditor( inputfieldData, id ){
  let currentEditor = markDownEditors.find( editor => editor.questionNumber === id  );

  currentEditor[ inputfieldData?.fieldName ] = inputfieldData?.data;
  setMarkDownEditor( markDownEditors );
};

function handleDropDownSelectors( setSelectedOptionHandler, label, selectedOption ){
  setSelectedOptionHandler( selectedOption );
  if ( inputFields?.length ) {
    inputFields.find(obj => obj?.questionNumber === questionNumber && 
      obj?.markDownEditorNumber === markDownEditorNumber )[ label ] = selectedOption;
  }  
};

let totalPointsReceived = 0;

function calculateTotalPointsReceived(user){
  markDownEditors.forEach( element => {
   let value =  isNaN(parseInt( element[ elementMeta.pointsReceived ][user?._id], 10 ))  ? 0 : parseInt( element[ elementMeta.pointsReceived ][user?._id], 10 );

    totalPointsReceived += value;
    let total = {};

    total[user._id] = totalPointsReceived;
    // setPointsReceived(total);
    element[elementMeta.totalPointsReceived][user?._id] = totalPointsReceived;
  });
  markDownEditors[0].totalPointsReceived[user?._id] = totalPointsReceived;
  setMarkDownEditor( markDownEditors );
  loadQuestions();
};

let formInputFields = ( previewMode ) ? element?.markDownEditorFormInputFields : inputFields;

return(
    <div className={elementMeta.InputFieldCreator}  id={elementMeta.InputFieldCreator}>
      <form onSubmit={ handleFormSubmit }>
      {formInputFields?.map( (element) => (
          <div className={elementMeta.multipleChoice}>
              <label name={ element?.id } />
              <span className={elementMeta.multipleChoicelabel}> 
                  {
                    ( previewMode ) && ( contentType( element.editorContentType ).isMultipleChoiceContentType  ) && <span>{ element.multipleChoiceLabelValue } </span>
                  }
                  { ( ! previewMode ) && inputTypeValue && contentType( element.editorContentType ).isMultipleChoiceContentType && 
                          setMultipleChoiceLabelValue( inputFields,  
                              (labelDropDownSelectedValue === "") ? labelType.Alphabet : labelDropDownSelectedValue, element?.id, questionNumber, markDownEditorNumber ) 
                  }
              </span>
        {( contentType( element.editorContentType ).isMultipleChoiceContentType )  &&    
                <span className={elementMeta.multipleChoicelabel}> 
                    <input
                      id={element?.id} 
                      name={elementMeta.multipleChoiceAnswer}
                      type={elementMeta.radio}
                      value={setMultipleChoiceValue( inputFields,  (labelDropDownSelectedValue === "") ? labelType.Alphabet : labelDropDownSelectedValue, element?.id )}
                      onChange={handleMultipleChoiceAnswerChange}
                      placeholder="first name"
                    />
                </span>
        }
        {( contentType( element.editorContentType ).isExplanationContentType )  && 
           <div> 
                <EditorComponent
                  id={`input${element?.id}`}
                  name={`editor${element?.id}`}
                  content={ element?.explanationAnswerValue }
                  //onChange={handleMarkDownContentChange}
                  // onChange={ ( editor ) => handleMarkDownContentChange( inputFields, editor, element?.id, 
                  //             currentUser?.role, editorContentType.Explanation, handleUpdatingMarkDownEditor, 
                  //                     questionNumber, markDownEditorNumber )}
                />

           </div>
        }
        {( contentType( element.editorContentType ).isMultipleChoiceContentType  )  ?
              ( previewMode )   ?   <span>{element?.value}</span>    
                                :   <input
                                      className={elementMeta.multipleChoice}
                                      id={element?.id} 
                                      name={element?.name}
                                      type={element?.type}
                                      value={ ( element?.name === fieldName ) ? fieldValue : inputFields?.find( obj => obj.name === element?.name)[ elementMeta.value ] }
                                      onChange={handleChange}
                                      placeholder={element?.placeHolderText}
                                    />  
                                : <div></div>
        }
        {( contentType( element.editorContentType ).isVideoContentType ) &&   ( previewMode )  &&  
                                 <div>
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
      }
      { ( contentType( element.editorContentType ).isVideoContentType ) &&   ( !previewMode )  &&  
                                  <div> 
                                    <VideoComponent
                                        id={element?.id}
                                        objectId={objectId}
                                        videoMetaDataExternalId={'name'}
                                        videoNamePrefix={"QuestionVideoMultipleChoiceInputFields"}
                                      />
                                    {(element.editorContentType === editorContentType.VideoPlayer &&  video[ element?._id ]?.recordingStatus ) && <button className="test" onClick={ () => saveRecording( element ) }>Save Recording</button> }
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
    </div>
      ))} 
          {( ! previewMode) && 
                  <div>
                        <div className="input-field-builder-selector">  
                          <DropDown 
                            label={""}
                            key={elementMeta._id}
                            value={elementMeta.name}
                            optionCollection={dropDownOptions.inputOptions}
                            setOptionSelectedValue={handleDropDownSelectorInputTypeChange} 
                            disabled={inputFields?.length === 0 }
                          />
                        </div>
                        <div className="input-field-builder-selector">  
                          {( inputTypeValue && inputFields.length > 0 ) && 
                            <DropDown 
                              label={""}
                              key={elementMeta._id}
                              value={elementMeta.name}
                              optionCollection={ dropDownOptions.labelOptions }
                              setOptionSelectedValue={handleDropDownSelectorLabelTypeChange} 
                              disabled={inputFields?.length === 0 }
                            />
                          }
                        </div>
                  </div>
              }
              {( inputTypeValue ) && ( ! previewMode) && 
                  <span>
                      <input className="input-field-builder-btn" type="button" onClick={addNewInputField} value="+" />
                      <input className="input-field-builder-btn" type="button" onClick={removeInputField} value="-" />
                  </span>
              }
        </form>  
        <div>                         
    </div>  
            
    </div>
    );
};

const mapState = ( state, ownProps ) => {
  return {
    questions: Object.values(state.questions.questions),
    currentUser: state.users.user,
    video: state.hasRecordingStarted.recording,
    questions: Object.values(state.questions.questions),
    latestQuestion: state.questions.latestQuestion,
    lessons: Object.values(state.lessons.lessons),
    markDownEditors: state.questions.markDownEditors,
    previewMode: state.questions.previewMode,
  };
};

export default connect( mapState, { setMarkDownEditor, loadQuestions, saveQuestion, toggleRecordingStatus } )( MultiFieldComponent );

// }, [ inputFields, inputTypeValue, setInputFields ] )  