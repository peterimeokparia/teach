import 
React, { 
useState, 
useEffect } from 'react';

import {
role } from 'Services/course/helpers/PageHelpers';

import { 
placeHolder } from 'Services/course/helpers/EditorHelpers';

import {
elementMeta,
editorContentType,
labelType,
inputType,
dropDownOptions, 
points, 
handleSettingMultipleChoiceValue,
setMultipleChoiceLabelValue,
setMultipleChoiceValue,
calculatePointsReceived,
handleMarkDownContentChange,
handleMultiFieldFormEvents,
contentType, 
setFieldCollection} from 'Services/course/Pages/QuestionsPage/helpers';

import EditorComponent  from 'Services/course/Pages/QuestionsPage/Components/EditorComponent';
import VideoComponent from 'Services/course/Pages/QuestionsPage/Components/VideoComponent';
import LessonPlanIframeComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanIframeComponent';
import DropDown from 'Services/course/Pages/Components/DropDown';
import './style.css';

const MultiFieldComponent = ( { 
currentUser,  
questionNumber,
markDownEditorNumber,
inputFieldOptions,
handleUpdatingMarkDownEditor,
handleUpdatingMarkDownEditorPointsReceived,
previewMode,
inputFieldData,
objectId,
loadQuestions,
togglePreviewMode,
handleSubmit }) =>  {
 
const [ fieldName,  setFieldName ] = useState( "" );
const [ fieldValue,  setFieldValue ] = useState( "" );
const [ multipleChoiceAnswer, setMultipleChoiceAnswer ] = useState( "" );
const [ inputFields, setInputFields ] = useState([]);
const [ labelDropDownSelectedValue, setlabelDropDownSelectedValue ] = useState( "" );
const [ inputTypeValue, setinputTypeValue ] = useState( "" );
const [ videoUploaded, setVideoUploaded ] = useState( false );
// high light answer
useEffect(() => {
  let inputFieldBuilder = document.getElementById( elementMeta.InputFieldCreator );
  handleMultiFieldFormEvents( inputFieldBuilder, 'click', inputFields, handleUpdatingMarkDownEditor, elementMeta.markDownEditorFormInputFields ); 
  handleMultiFieldFormEvents( inputFieldBuilder, 'mouseup', inputFields, handleUpdatingMarkDownEditor, elementMeta.markDownEditorFormInputFields ); 
  handleMultiFieldFormEvents( inputFieldBuilder, 'mousedown', inputFields, handleUpdatingMarkDownEditor, elementMeta.markDownEditorFormInputFields ); 

  if ( inputFieldData ) {
    setInputFields( inputFieldData?.markDownEditorFormInputFields );
  } 
  if ( previewMode ) {
     setVideoUploaded( false );
  }
  // inputFields, inputTypeValue, setInputFields
}, [ inputFields, inputTypeValue, setInputFields ] )  

let config = { questionNumber, markDownEditorNumber, inputFields, inputTypeValue, inputFieldOptions, labelDropDownSelectedValue, placeHolder };

const addNewInputField = () => {
  if ( inputFields ) {
     handleUpdatingMarkDownEditor( { data: inputFields, fieldName: elementMeta.markDownEditorFormInputFields } ); 
  }
  let fieldCollection =  [...inputFields.filter(obj =>  obj?.questionNumber === questionNumber && obj?.markDownEditorNumber === markDownEditorNumber ),
    setFieldCollection(config, setMultipleChoiceValue, setMultipleChoiceLabelValue)  
  ]
  setInputFields( fieldCollection );
  if ( fieldCollection ) {
     handleUpdatingMarkDownEditor( { data: fieldCollection, fieldName: elementMeta.markDownEditorFormInputFields } ); 
  }
} 

const removeInputField = () => {
  let lastInputField = inputFields[(inputFields?.length - 1)];
  let decrementedFieldSet = inputFields?.filter( input => input?.name !== lastInputField?.name );
  setInputFields(
  [
    ...decrementedFieldSet
  ]);
  handleUpdatingMarkDownEditor( { data: decrementedFieldSet, fieldName: elementMeta.markDownEditorFormInputFields } ); 
}

const handleChange = ( event ) => {
  setFieldName( event.target.name );
  setFieldValue( event.target.value );
  inputFields.find(obj => obj?.name === event?.target?.name && 
        obj?.questionNumber === questionNumber && obj?.markDownEditorNumber === markDownEditorNumber )[ elementMeta.value ] = event.target.value;
  setInputFields( inputFields );      
  handleUpdatingMarkDownEditor( { data: inputFields, fieldName: elementMeta.markDownEditorFormInputFields } );       
}

const handleMultipleChoiceAnswerChange = ( event ) => {
  setMultipleChoiceAnswer( event.target.value );
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
          handleUpdatingMarkDownEditorPointsReceived( { data: calculatePointsReceived( inputFieldData?.multipleChoiceQuestionAnswerKey, event.target.value, inputFieldData?.questionPoints  ), fieldName: elementMeta.pointsReceived } ); 
          handleSubmit();
      }
   }    
}   

const handleDropDownSelectorLabelTypeChange = ( selectedOption ) => {
  handleDropDownSelectors( setlabelDropDownSelectedValue, elementMeta.labelTypeDropDownSelectedValue, selectedOption );
}

const handleDropDownSelectorInputTypeChange = ( selectedOption ) => {
  handleDropDownSelectors( setinputTypeValue, elementMeta.inputTypeDropDownSelectedValue, selectedOption );
}

const saveRecording = () => { 
  togglePreviewMode();
  setVideoUploaded( false );
}

const handleFormSubmit = ( event ) => {
    event.preventDefault();
};

function setRecordingCompletionStatus( videoUploaded, id ){
  if ( videoUploaded ) {
      setVideoUploaded( videoUploaded );
  }
}

function handleDropDownSelectors( setSelectedOptionHandler, label, selectedOption ){
  setSelectedOptionHandler( selectedOption );
  if ( inputFields?.length ) {
    inputFields.find(obj => obj?.questionNumber === questionNumber && 
      obj?.markDownEditorNumber === markDownEditorNumber )[ label ] = selectedOption;
  }  
}

let formInputFields = ( previewMode ) ? inputFieldData?.markDownEditorFormInputFields : inputFields;
return(
    <div className={elementMeta.InputFieldCreator}  id={elementMeta.InputFieldCreator}>
      <form onSubmit={ handleFormSubmit }>
      {formInputFields?.map((element) => (
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
                      key={element?.id}
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
                <EditorComponent
                    key={element?.id}
                    id={`input${element?.id}`}
                    name={`editor${element?.id}`}
                    content={ JSON.parse( element?.explanationAnswerValue )}
                    onChange={ ( editor ) => handleMarkDownContentChange( inputFields, editor, element?.id, 
                                currentUser?.role, editorContentType.Explanation, handleUpdatingMarkDownEditor, 
                                        questionNumber, markDownEditorNumber )}
                />
        }
        {( contentType( element.editorContentType ).isMultipleChoiceContentType  )  ?
              ( previewMode )   ?   <span>{element?.value}</span>    
                                :   <input
                                      className={elementMeta.multipleChoice}
                                      key={element?.id}
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
      }
      { ( contentType( element.editorContentType ).isVideoContentType ) &&   ( !previewMode )  &&  
                                    <div> 
                                      <VideoComponent
                                          key={element?.id}
                                          id={element?.id}
                                          name={element?.id}
                                          objectId={objectId}
                                          videoMetaData={{inputFieldId: element?.id, currentQuestion: inputFieldData} }
                                          videoMetaDataExternalId={'name'}
                                          videoNamePrefix={"QuestionVideoMultipleChoiceInputFields"}
                                          videoName={`${inputFieldData?.id}_${inputFieldData?.questionNumber}_${element?.id}_${element?.type}`}
                                          setRecordingCompletionStatus={status => setRecordingCompletionStatus( status, element?.id )}
                                          handleSubmit={handleSubmit}
                                        />
                                      {(element.editorContentType === editorContentType.VideoPlayer && videoUploaded ) && <button className="test" onClick={ saveRecording }>Save Recording</button> }
                                    </div>
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
    )
}

export default MultiFieldComponent;