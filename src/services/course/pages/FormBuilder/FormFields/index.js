import { 
connect } from 'react-redux';

import { 
Rnd } from 'react-rnd';

import {
addNewFormField,
deleteFormField,
saveFormField,
loadFormFields } from 'services/course/actions/formfields';

import {
addNewFormFieldAnswer,
deleteFormFieldAnswer,
saveFormFieldAnswer,
saveFormFieldAnswerByFieldId,
saveStudentsAnswerPoints,
loadFormFieldAnswers } from 'services/course/actions/formfieldanswers';

import {
addNewFormFieldPoint,
deleteFormFieldPoints,
saveFormFieldPoint,
saveFormFieldPointsByFieldId,
loadFormFieldPoints } from 'services/course/actions/formquestionpoints';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 

import { 
useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';

import { 
useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';

import {
getStyles } from 'services/course/pages/FormBuilder/helpers';

import {
manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

import {
addGroupedFormFieldsConfig  } from 'services/course/pages/FormBuilder/FormFields/helpers';

import useFormFieldHook from '../hooks/useFormFieldHook';
import CheckBox from 'services/course/pages/FormBuilder/FormFields/components/CheckBox';
import RadioButton from 'services/course/pages/FormBuilder/FormFields/components/RadioButton';
import DropDown from 'services/course/pages/FormBuilder/FormFields/components/DropDown';
import DataObjectSelector from 'services/course/pages/FormBuilder/FormFields/components/DataObjectSelector';
import TextField from 'services/course/pages/FormBuilder/FormFields/components/TextField';
import TextLabel from 'services/course/pages/FormBuilder/FormFields/components/TextLabel';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import MenuItem from '@mui/material/MenuItem';
import Date from 'services/course/pages/FormBuilder/FormFields/components/Date';
import Numbers from 'services/course/pages/FormBuilder/FormFields/components/Numbers';
import NumberPosition from 'services/course/pages/FormBuilder/FormFields/components/NumberPosition';
import Time from 'services/course/pages/FormBuilder/FormFields/components/Time';
import Toggle from 'services/course/pages/FormBuilder/FormFields/components/Toggle';
import DateTime from 'services/course/pages/FormBuilder/FormFields/components/DateTime';
import NumberPercentage from 'services/course/pages/FormBuilder/FormFields/components/NumberPercentage';
import FileUploadField from 'services/course/pages/FormBuilder/FormFields/components/FileUploadField'; 
import 'services/course/pages/FormBuilder/formStyles/quizz/style.css';
import 'services/course/pages/FormBuilder/formStyles/report/style.css';

const FormFields = ({ 
  operatorBusinessName,
  courseId,
  lessonId,
  previewMode,
  currentUser,
  addNewFormField,
  saveFormField,
  loadFormFields,
  deleteFormField,
  addNewFormFieldAnswer,
  deleteFormFieldAnswer,
  saveFormFieldAnswer,
  saveFormFieldAnswerByFieldId,
  loadFormFieldAnswers,
  addNewFormFieldPoint,
  formFieldAnswersError,
  deleteFormFieldPoints,
  saveFormFieldPoint,
  saveFormFieldPointsByFieldId,
  loadFormFieldPoints,
  fields,
  formFieldsLoading,
  onFormFieldsLoadingError, 
  formFieldAnswers,
  formQuestionPoints,
  formFieldAnswersLoading,
  onFormFieldAnswersLoadingError,
  form,
  setMarkDown,
  saveStudentsAnswerPoints,
  setUpdatePoints,
  modalProps,
  children }) => {

  let {
    userId, 
    formUuId,
    formId,
    question,
    formType,
    formName,
    formBuilderStatus,
    eventId
  } = form; 

  let fieldProps = { 
    loadFormFields, 
    addNewFormField, 
    saveFormField,  
    deleteFormField,
    addNewFormFieldAnswer,
    formFieldAnswersError,
    deleteFormFieldAnswer,
    saveFormFieldAnswer,
    saveFormFieldAnswerByFieldId,
    loadFormFieldAnswers,
    addNewFormFieldPoint,
    deleteFormFieldPoints,
    saveFormFieldPoint,
    saveFormFieldPointsByFieldId,
    loadFormFieldPoints,
    courseId, 
    lessonId,
    formId,
    formUuId,
    formType,
    formName,
    formBuilderStatus,
    userId,
    currentUser,
    setMarkDown,
    fields,
    formFieldAnswers,
    formQuestionPoints,
    saveStudentsAnswerPoints,
    setUpdatePoints,
    previewMode,
    question,
    eventId };

  let {
    boundryRef, 
    formFields,
    moveInputField, 
    setMoveInputField,
    isPreviewMode,
    handleRndPostioning,
    onhandleSelected,
    handleFormFieldAnswers,
    handleSelectorFormFieldAnswers,
    handleEditor
  } = useFormFieldHook( fieldProps );  

  useUserVerificationHook( currentUser, operatorBusinessName );

  useOnLoadingHook( formFieldsLoading, onFormFieldsLoadingError );

  useOnLoadingHook( formFieldAnswersLoading, onFormFieldAnswersLoadingError );

  let formFieldProps = { 
    ...fieldProps, 
    moveInputField,
    setMoveInputField,
    handleFormFieldAnswers, 
    handleSelectorFormFieldAnswers, 
    addGroupedFormFields, 
    onhandleSelected 
  };

  function addGroupedFormFields( element ){ 
    addNewFormField( manageFormFieldCollection( addGroupedFormFieldsConfig( element, formUuId, currentUser ) ) );
  }
   
return (
    <div className={getStyles( formType )?.builder} ref={ boundryRef }> 
      <div className="headerboundry">
      </div>
      <div className="answerEditorBuilder">
        <MaxWidthDialog modalProps={modalProps}>
        {
          ( item ) => {
            return <MenuItem value={item}>{ item }</MenuItem>
          }
        }
        </MaxWidthDialog> 
          { formFields?.map( element => (
              <Rnd
                default={{
                  x: element?.xAxisformFieldPosition,
                  y: element?.yAxisformFieldPosition,
                  width: 250,
                  height: 50,
                }}
                  onDragStart={ !moveInputField }
                  onDragStop={(e, d) => handleRndPostioning(d.x, d.y, element) }
                  minWidth={250}
                  minHeight={50}
                  bounds="parent"
                  allowAnyClick={ false }
                  disableDragging={ !moveInputField }
                  onResize={ false }
              >
              <div className={getStyles( formType )?.content}>
                <div className="onlinequestion-list-items">
                <div className=""> 
                <div className="">
                <div> 
                <div>
                <div className="question-card-top-right" /> 
                <div className="" />
                { (element?.inputType === inputType.Explanation) && 
                  <div className="explanation-answer">
                    { 'Explanation answer'}
                    { handleEditor( element ) }
                  </div>
                }
                { (element?.inputType === inputType.Text) &&
                  <div className="radio">
                    <label>  
                    { !isPreviewMode( element ) &&  <span className="textfield">  { element?.inputValue } </span> }  
                      <TextField 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) } 
                        formFieldElement={element} 
                      />
                    </label> 
                  </div>
                }
                { (element?.inputType === inputType.TextLabel) &&
                  <div className="radio">
                    <label>  
                    { !isPreviewMode( element ) &&  <span className="textfield">  { element?.inputValue } </span> }  
                      <TextLabel 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) } 
                        formFieldElement={element} 
                      />
                    </label> 
                  </div>
                }
                { (element?.inputType === inputType.RadioButton ) &&  
                    <div className="radio">
                      <label> 
                  { !isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                        <RadioButton 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={ element } 
                        />
                      </label> 
                    </div>
                }
                { (element?.inputType === inputType.CheckBox) &&
                    <div className="radio">     
                      <label>
                      { !isPreviewMode( element ) &&  <span>   {  element?.inputValue } </span> } 
                        <CheckBox 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                      </label>  
                    </div>
                }
                { (element?.inputType === inputType.DropDown ) &&  
                    <div className="radio">  
                      <label> 
                      <DropDown 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                        dropDownValues={ element?.dropDownOptions }
                      />
                      </label>
                    </div>
                } 
                { (element?.inputType === inputType?.FileUpload ) &&  
                    <div className="radio">  
                      <label> 
                      <FileUploadField 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                      />
                      </label>
                    </div>
                } 
                { (element?.inputType === inputType?.DataObjectSelector ) &&  
                    <div className="radio">  
                      <label> 
                      <DataObjectSelector 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                        dropDownValues={ element?.dropDownOptions }
                      />
                      </label>
                    </div>
                } 
                { (element?.inputType === inputType.Number) &&
                    <div className="radio">     
                      { isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                        <Numbers 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                    </div>
                }
                 { (element?.inputType === inputType.NumberPercentage) &&
                    <div className="radio">     
                      { isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                        <NumberPercentage 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                    </div>
                }
                { (element?.inputType === inputType.NumberPosition) &&
                    <div className="radio">     
                      { isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                        <NumberPosition 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                    </div>
                }
                { (element?.inputType === inputType.Date) &&
                    <div className="radio">     
                      <label>
                        <Date 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                      </label>  
                    </div>
                }
                { (element?.inputType === inputType.Time) &&
                  <div className="radio">     
                    <label>
                    { !isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                      <Time 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) } 
                        formFieldElement={element} 
                      />
                    </label>  
                  </div>
               }
               { (element?.inputType === inputType.DateTime) &&
                <div className="radio">     
                  <label>
                  { !isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                    <DateTime 
                      fieldProps={formFieldProps}
                      previewMode={ isPreviewMode( element ) } 
                      formFieldElement={element} 
                    />
                  </label>  
                </div>
              }
              { (element?.inputType === inputType.Toggle) &&
                <div className="radio">     
                  <>
                    <Toggle 
                      fieldProps={formFieldProps}
                      previewMode={ isPreviewMode( element ) } 
                      formFieldElement={element} 
                    />
                  </>  
                </div>
              }
                </div>
                </div>
                </div>  
                </div>
              </div>
              </div> 
              </Rnd>
            )) 
          }
        </div>
      </div>  
      );
    };

    const mapDispatch = {
      addNewFormField,
      saveFormField,
      loadFormFields,
      deleteFormField,
      addNewFormFieldAnswer,
      deleteFormFieldAnswer,
      saveFormFieldAnswer,
      saveFormFieldAnswerByFieldId,
      loadFormFieldAnswers,
      setMarkDown,
      addNewFormFieldPoint,
      deleteFormFieldPoints,
      saveFormFieldPoint,
      saveFormFieldPointsByFieldId,
      loadFormFieldPoints,
      saveStudentsAnswerPoints,
    };
    
    const mapState = ( state, ownProps ) => { 
      return {
        currentUser: state.users.user,
        fields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.form?.question?._id ),
        formFieldsLoading: state?.formFields?.formFieldsLoading,
        onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
        formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.form?.question?._id ),
        formFieldAnswersError: state?.formFieldAnswers?.onSaveError,
        formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
        onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
        formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.form?.question?._id )
      };
    };
    
export default connect( mapState, mapDispatch )(FormFields);    