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
getStyles,
formTypes } from 'services/course/pages/FormBuilder/helpers';

import useFormFieldHook from '../hooks/useFormFieldHook';
import CheckBox from 'services/course/pages/FormBuilder/FormFields/Components/CheckBox';
import RadioButton from 'services/course/pages/FormBuilder/FormFields/Components/RadioButton';
import DropDown from 'services/course/pages/FormBuilder/FormFields/Components/DropDown';
import TextField from 'services/course/pages/FormBuilder/FormFields/Components/TextField';
import TextLabel from 'services/course/pages/FormBuilder/FormFields/Components/TextLabel';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import EditorComponent from 'services/course/pages/components/EditorComponent';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import MenuItem from '@mui/material/MenuItem';
import 'services/course/pages/FormBuilder/formStyles/quizz/style.css';
import 'services/course/pages/FormBuilder/formStyles/report/style.css';
// import './style.css';
// I need a toggle field
// I need a digital signature type field
// Report form field answers can be weighted 
//- we would report on this - as well as chart these 
// - profiling response and creating weighted response for review

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
  handleMaxDialog,
  setMarkDown,
  toggleFormFieldSelector,
  saveStudentsAnswerPoints,
  setUpdatePoints,
  children }) => {

  let {
    userId, 
    formUuId,
    formId,
    question,
    formType,
    formName,
    formBuilderStatus
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
    handleMaxDialog, 
    setMarkDown,
    fields,
    formFieldAnswers,
    formQuestionPoints,
    toggleFormFieldSelector,
    saveStudentsAnswerPoints,
    setUpdatePoints,
    previewMode,
    question };

  let {
    modalProps, 
    formAnswers,
    boundryRef, 
    formFields,
    isPreviewMode,
    handleRndPostioning,
    dropDownValueCallBack,
    onhandleSelected,
    addGroupedFormFields,
    handleFormFieldAnswers,
    handleSelectorFormFieldAnswers,
    setFormType,
    handleEditor
  } = useFormFieldHook( fieldProps );  

  useUserVerificationHook( currentUser, operatorBusinessName );
  useOnLoadingHook( formFieldsLoading, onFormFieldsLoadingError );
  useOnLoadingHook( formFieldAnswersLoading, onFormFieldAnswersLoadingError );

  fieldProps = { 
    ...fieldProps, 
    dropDownValueCallBack,
    handleFormFieldAnswers,
    handleSelectorFormFieldAnswers,
    addGroupedFormFields,
    onhandleSelected,  
  };
return (
    <div className={getStyles(formType)?.builder} ref={ boundryRef }> 
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
                  onDragStart={() => {  if ( !isPreviewMode( element )  ) return; }}
                  onDragStop={(e, d) => handleRndPostioning(d.x, d.y, element) }
                  minWidth={250}
                  minHeight={50}
                  bounds="parent"
                  allowAnyClick={ isPreviewMode( element ) }
                  disableDragging={ !isPreviewMode( element ) }
                  onResize={() => {  if ( !isPreviewMode( element )  ) return; }}
              >
              <div className={getStyles(formType)?.content}>
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
                  <div className="radio">,
                    <label>  
                    { !isPreviewMode( element ) &&  <span className="textfield">  { element?.inputValue } </span> }  
                      <TextField 
                        fieldProps={fieldProps}
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
                        fieldProps={fieldProps}
                        previewMode={ isPreviewMode( element ) } 
                        formFieldElement={element} 
                      />
                    </label> 
                  </div>
                }
                { (element?.inputType === inputType.RadioButton ) &&  
                    <div className="radio">
                      <label> 
                        {/* radio answer key issue */}
                      { !isPreviewMode( element ) &&  <span>   { element?.inputValue } </span> } 
                        <RadioButton 
                          fieldProps={fieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={ element } 
                        />
                      </label> 
                    </div>
                }
                { (element?.inputType === inputType.CheckBox) &&
                    <div className="radio">     
                      <label>
                      { !isPreviewMode( element ) &&  <span>   { element?.inputValue } </span> } 
                      <CheckBox 
                        fieldProps={fieldProps}
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
                        fieldProps={fieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                        dropDownValues={ element?.dropDownOptions }
                      />
                      </label>
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