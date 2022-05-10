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
useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';

import { 
useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';

import {
getStyles } from 'services/course/pages/FormBuilder/helpers';

import {
manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

import {
addGroupedFormFieldsConfig  } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';

import MissedQuestionComponent from 'services/course/pages/FormBuilder/FormQuestions/components/MissedQuestionsComponent';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from 'services/course/pages/components/SubscriptionComponent/MiniSideBarButton';
import Basic from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Basic'; 
import Latex from "react-latex";
import useFormFieldHook from 'services/course/pages/FormBuilder/hooks/useFormFieldHook';
import useFormFieldPanelHook from 'services/course/pages/FormBuilder/hooks/useFormFieldPanelHook';
import CheckBox from 'services/course/pages/FormBuilder/FormFields/component/CheckBox';
import RadioButton from 'services/course/pages/FormBuilder/FormFields/component/RadioButton';
import DropDown from 'services/course/pages/FormBuilder/FormFields/component/DropDown';
import DataObjectSelector from 'services/course/pages/FormBuilder/FormFields/component/DataObjectSelector';
import TextField from 'services/course/pages/FormBuilder/FormFields/component/TextField';
import TextLabel from 'services/course/pages/FormBuilder/FormFields/component/TextLabel';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import MenuItem from '@mui/material/MenuItem';
import Date from 'services/course/pages/FormBuilder/FormFields/component/Date';
import Numbers from 'services/course/pages/FormBuilder/FormFields/component/Numbers';
import NumberPosition from 'services/course/pages/FormBuilder/FormFields/component/NumberPosition';
import Time from 'services/course/pages/FormBuilder/FormFields/component/Time';
import Toggle from 'services/course/pages/FormBuilder/FormFields/component/Toggle';
import DateTime from 'services/course/pages/FormBuilder/FormFields/component/DateTime';
import NumberPercentage from 'services/course/pages/FormBuilder/FormFields/component/NumberPercentage';
import FileUploadField from 'services/course/pages/FormBuilder/FormFields/component/FileUploadField'; 
import MathScienceField from 'services/course/pages/FormBuilder/FormFields/component/MathScienceField';
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
  saveEditorMarkDownObjectToMw,
  saveStudentsAnswerPoints,
  setUpdatePoints,
  modalProps,
  missedQuestions,
  missedQuestionIds,
  leftUnAnsweredFormFields,
  leftUnAnsweredQuestions,
  unAnswerdQuestionIds,
  answerFieldId,
  answerFormType,
  answerFormName,
  answerFormUuId,
  answerFormUserId,
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
    saveEditorMarkDownObjectToMw,
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
    handleEditor, 
    handleHighlightingFormAnswers,
    handleDisplayingAnswerKeys, 
  } = useFormFieldHook( fieldProps );  

  let {
    selectedFormField, 
    setSelectedFormField,
  } = useFormFieldPanelHook();

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
    onhandleSelected,
    selectedFormField, 
    setSelectedFormField 
  };

  function addGroupedFormFields( element ){ 
    addNewFormField( manageFormFieldCollection( addGroupedFormFieldsConfig( element, formUuId, currentUser ) ) );
  }

  function selectFormField( selectedFormField ){
    if ( previewMode ) {
      setSelectedFormField( selectedFormField );
    }
   
  }
   
return (
    
      <div className={getStyles( formType )?.builder }  style={{  'backgroundColor': missedQuestions?.find(ans => ans?._id === question?._id) && ( formBuilderStatus === elementMeta.state.Submitted )  ? "#C8FDC8" :"rgb(101, 245, 101)" }} ref={ boundryRef }>
        <div className="headerboundry"/>
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
                  width: 0,
                  height: 50,
                }}
                  onDragStart={ !moveInputField }
                  onDragStop={(e, d) => handleRndPostioning(d.x, d.y, element) }
                  minWidth={0}
                  minHeight={50}
                  bounds="parent"
                  allowAnyClick={ false }
                  disableDragging={ !moveInputField }
                  onResize={ false }
                  onClick={() => selectFormField(element)}
              >
              <div className={getStyles( formType )?.content}>
                <div className="onlinequestion-list-items">
                <div className=""> 
                <div className="">
                <div> 
                <div>
                <div className="question-card-top-right" /> 
                <div className="" />
                  {(element?.inputType === inputType.LatexField ) && <div className="latex-field-component">  
                  <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                      <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}>
                      { !isPreviewMode( element ) &&  <span> { <Latex>{`$${element?.inputValue}$`}</Latex> } </span> } 
                        <MathScienceField 
                            previewMode={isPreviewMode( element )} 
                            formFieldElement={element} 
                            fieldProps={formFieldProps}
                        />
                    </label> 
                    </div>
                    </div>
                  }
                { (element?.inputType === inputType.Explanation) && 
                  <div className="explanation-answer">
                    { 'Explanation answer'}
                    { handleEditor( element ) }
                  </div>
                }
                { (element?.inputType === inputType.Text) &&
                  <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                    <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                    { !isPreviewMode( element ) &&  <span className="textfield">  { element?.inputValue } </span> }  
                        <TextField 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                          { handleDisplayingAnswerKeys( element ) }
                    </label> 
                  </div>
                }
                { (element?.inputType === inputType.TextLabel) &&
                  <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' :  handleHighlightingFormAnswers( element )}>
                   <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                    { !isPreviewMode( element ) &&  <span className="textfield">  { element?.inputValue } </span> }  
                      <TextLabel 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) } 
                        formFieldElement={element} 
                      />
                    </label> 
                    { handleDisplayingAnswerKeys( element ) }
                  </div>
                }
                { (element?.inputType === inputType.RadioButton ) &&  
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                      <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}>
                      { !isPreviewMode( element ) &&  <span> { <Latex>{`$${element?.inputValue}$`}</Latex> } </span> } 
                        <RadioButton 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={ element } 
                        />
                         { handleDisplayingAnswerKeys( element ) }
                      </label> 
                    </div>
                }
                { (element?.inputType === inputType.CheckBox) &&
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                     <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                     { !isPreviewMode( element ) &&  <span> { <Latex>{`$${element?.inputValue}$`}</Latex> } </span> } 
                        <CheckBox 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                        { handleDisplayingAnswerKeys( element ) }
                      </label>  
                    </div>
                }
                { (element?.inputType === inputType.DropDown ) &&  
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                      <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                      <DropDown 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                        dropDownValues={ element?.dropDownOptions }
                      />
                      { handleDisplayingAnswerKeys( element ) }
                      </label>

                    </div>
                } 
                { (element?.inputType === inputType?.FileUpload ) &&  
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                     <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                      <FileUploadField 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                      />
                      </label>
                      { handleDisplayingAnswerKeys( element ) }
                    </div>
                } 
                { (element?.inputType === inputType?.DataObjectSelector ) &&  
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                     <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                      <DataObjectSelector 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) }
                        formFieldElement={element} 
                        dropDownValues={ element?.dropDownOptions }
                      />
                      </label>
                      { handleDisplayingAnswerKeys( element ) }
                    </div>
                } 
                { (element?.inputType === inputType.Number) &&
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>   
                      { isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                        <Numbers 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                         { handleDisplayingAnswerKeys( element ) }
                    </div>
                }
                 { (element?.inputType === inputType.NumberPercentage) &&
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>  
                      { isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                        <NumberPercentage 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                         { handleDisplayingAnswerKeys( element ) }
                    </div>
                }
                { (element?.inputType === inputType.NumberPosition) &&
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}> 
                      { isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                        <NumberPosition 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                         { handleDisplayingAnswerKeys( element ) }
                    </div>
                }
                { (element?.inputType === inputType.Date) &&
                    <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>    
                      <label>
                        <Date 
                          fieldProps={formFieldProps}
                          previewMode={ isPreviewMode( element ) } 
                          formFieldElement={element} 
                        />
                        { handleDisplayingAnswerKeys( element ) }
                      </label>  
                    </div>
                }
                { (element?.inputType === inputType.Time) &&
                  <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                    <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                    { !isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                      <Time 
                        fieldProps={formFieldProps}
                        previewMode={ isPreviewMode( element ) } 
                        formFieldElement={element} 
                      />
                      { handleDisplayingAnswerKeys( element ) }
                    </label>  
                  </div>
               }
               { (element?.inputType === inputType.DateTime) &&
                 <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>
                  <label className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'label-move' : ''}> 
                  { !isPreviewMode( element ) &&  <span> { element?.inputValue } </span> } 
                    <DateTime 
                      fieldProps={formFieldProps}
                      previewMode={ isPreviewMode( element ) } 
                      formFieldElement={element} 
                    />
                     { handleDisplayingAnswerKeys( element ) }
                  </label>  
                </div>
              }
              { (element?.inputType === inputType.Toggle) &&
                <div className={(moveInputField && (selectedFormField?._id === element?._id)) ? 'radio-move' : handleHighlightingFormAnswers( element )}>  
                  <>
                    <Toggle 
                      fieldProps={formFieldProps}
                      previewMode={ isPreviewMode( element ) } 
                      formFieldElement={element} 
                    />
                     { handleDisplayingAnswerKeys( element ) }
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
      saveEditorMarkDownObjectToMw,
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
        formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.form?.question?._id ),
        missedQuestions: state?.missedQuestions?.missedQuestions,
        missedQuestionIds: state?.missedQuestions?.missedQuestionIds,
        leftUnAnsweredFormFields: state?.missedQuestions?.leftUnAnsweredFormFields,
        leftUnAnsweredQuestions: state?.missedQuestions?.leftUnAnsweredQuestions,
        unAnswerdQuestionIds: state?.missedQuestions?.unAnswerdQuestionIds,
        answerFieldId: state?.missedQuestions?.answerFieldId,
        answerFormType:state?.missedQuestions?.answerFormType,
        answerFormName: state?.missedQuestions?.answerFormName,
        answerFormUuId: state?.missedQuestions?.answerFormUuId,
        answerFormUserId: state?.missedQuestions?.answerFormUserId
      };
    };
    
export default connect( mapState, mapDispatch )(FormFields);    