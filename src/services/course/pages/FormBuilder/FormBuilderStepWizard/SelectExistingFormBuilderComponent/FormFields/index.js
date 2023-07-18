import { connect } from 'react-redux';
import { inputType } from 'services/course/pages/QuestionsPage/helpers'; 
import { useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';
import { useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';
import { getStyles } from 'services/course/pages/FormBuilder/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { formFieldInputCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
import { mapDispatch, mapState } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/connectors';
import useFormFieldHook from 'services/course/pages/FormBuilder/hooks/useFormFieldHook';
import useDraggableListItemComponentHook from 'services/course/pages/FormBuilder/hooks/useDraggableListItemComponentHook';
import DropDown from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/DropDown';
//import DropDownAnswerComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/DropDownAnswerComponent';
import DataObjectSelector from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/DataObjectSelector';
import TextField from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/TextField';
import TextLabel from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/TextLabel';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import DraggableListItemComponent from 'services/course/pages/components/DraggableListItemComponent';
import DraggableEditorComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/DraggableEditorComponent';
import MenuItem from '@mui/material/MenuItem';
import DateComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/DateComponent';
import Numbers from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/Numbers';
import NumberPosition from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/NumberPosition';
import Time from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/Time';
import DateTime from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/DateTime';
import NumberPercentage from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/NumberPercentage';
import FileUploadField from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/FileUploadField'; 
import RadioButtonAnswerComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/RadioButtonAnswerComponent';
import ExplainAnswerComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/ExplainAnswerComponent';
import CheckBoxAnswerComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/CheckBoxAnswerComponent';
import ToggleAnswerComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/ToggleAnswerComponent';
import customInputComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/customInputComponent';
import controlledTextInputComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/controlledTextInputComponent';
import controlledNumberInputComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/controlledNumberInputComponent';
import controlledDateTimeInputComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/controlledDateTimeInputComponent';
import formFileUploadComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/formFileUploadComponent';
import formDataObjectSelector from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/formDataObjectSelector';
import controlledDropDownComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/controlledDropDownComponent';
import formDraggableEditorComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/helpers/formDraggableEditorComponent';
import 'services/course/pages/FormBuilder/formStyles/quizz/style.css';
import 'services/course/pages/FormBuilder/formStyles/report/style.css';

const FormFields = ({ 
  operatorBusinessName,
  courseId,
  lessonId,
  previewMode,
  toggleSetPreviewMode,
  currentUser,
  selectedFormField,
  setDraggableFormFields,
  setSelectedFormField,
  addNewFormField,
  saveFormField,
  loadFormFields,
  loadFormFieldAnswersByQuestionId,
  loadFormFieldsByQuestionId,
  loadFormFieldsByFormFieldId,
  deleteFormField,
  addNewFormFieldAnswer,
  deleteFormFieldAnswer,
  saveFormFieldAnswer,
  saveDraggableFormFieldAnswer,
  saveFormFieldAnswerByFieldId,
  loadFormFieldAnswers,
  loadFormFieldAnswersByFormFieldId,
  addNewFormFieldPoint,
  formFieldAnswersError,
  deleteFormFieldPoints,
  saveFormFieldPoint,
  saveFormFieldPointsByFieldId,
  loadFormFieldPoints,
  loadOnlineQuestionsByQuestionId,
  fields,
  draggableFormFieldCollection,
  formFieldsLoading,
  onFormFieldsLoadingError, 
  formFieldAnswers,
  formQuestionPoints,
  formFieldAnswersLoading,
  onFormFieldAnswersLoadingError,
  form,
  saveEditorMarkDownObjectToMw,
  setMarkDown,
  saveStudentsAnswerPoints,
  setUpdatePoints,
  draggableFormFields,
  modalProps,
  missedQuestions,
  maxDialogCollection,
  studentsTotalPointsReceived,
  studentsTotalPointsReceivedFromPersistence
}) => {

  let { userId, formUuId, formId, question, formType, formName, formBuilderState, formBuilderStatus, eventId } = form; 

  let fieldProps = { selectedFormField, draggableFormFields, setDraggableFormFields, loadOnlineQuestionsByQuestionId, loadFormFields, 
    loadFormFieldAnswersByQuestionId, loadFormFieldsByQuestionId, loadFormFieldsByFormFieldId, addNewFormField, saveFormField, deleteFormField,
    addNewFormFieldAnswer, formFieldAnswersError, deleteFormFieldAnswer, saveFormFieldAnswer, saveFormFieldAnswerByFieldId, loadFormFieldAnswers,
    loadFormFieldAnswersByFormFieldId, addNewFormFieldPoint, deleteFormFieldPoints, saveFormFieldPoint, saveFormFieldPointsByFieldId, loadFormFieldPoints,
    courseId, lessonId, formId, formUuId, formType, formName, formBuilderState, formBuilderStatus, userId, currentUser, saveEditorMarkDownObjectToMw,
    fields, formFieldAnswers, formQuestionPoints, saveStudentsAnswerPoints, setUpdatePoints, previewMode, toggleSetPreviewMode, question, eventId, setMarkDown,
    studentsTotalPointsReceived, studentsTotalPointsReceivedFromPersistence, saveDraggableFormFieldAnswer
  };

  let { boundryRef, formFields, moveInputField, formFieldProps,
    isPreviewMode, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, handleDraggableFormFieldAnswers 
  } = useFormFieldHook( fieldProps );  

  let { draggableListItemProps 
  } = useDraggableListItemComponentHook( fieldProps, handleDraggableFormFieldAnswers, draggableFormFieldCollection );
  
  useUserVerificationHook( currentUser, operatorBusinessName );
  useOnLoadingHook( formFieldsLoading, onFormFieldsLoadingError );
  useOnLoadingHook( formFieldAnswersLoading, onFormFieldAnswersLoadingError );

return (
      <div className={getStyles( formType )?.builder } style={{ 'backgroundColor': missedQuestions?.find(ans => ans?._id === question?._id) && 
        ( formBuilderStatus === elementMeta.status.Reviewed || formBuilderStatus === elementMeta.status.Review )  
          ? "#C8FDC8" 
          :"#d2e3f7" 
        }} 
        ref={ boundryRef }
      >
      { formDraggableEditorComponent( DraggableListItemComponent, DraggableEditorComponent, 
          formFieldProps, draggableListItemProps, isPreviewMode, previewMode, setSelectedFormField  )() 
      }
      <div className="headerboundry"/>
      <div className="answerEditorBuilder">
      <div className="listItem">
      <ul className={'lessons'}>
        <MaxWidthDialog modalProps={modalProps} collection={formFieldInputCollection}>
        {( item, index ) => {
            return <MenuItem key={`${index}`} value={item}> { item } </MenuItem>;
        }}
        </MaxWidthDialog> 
          { formFields?.map( element => (
            <div>
              {/* <li className={'lesson-item2'}  onClick={() => setSelectedFormField(element)}> */}
              <li className={'lesson-item2'}>
                <div className="question-card-top-right" /> 
                { ( element?.inputType === inputType.Text ) && controlledTextInputComponent(TextField, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() }
                { ( element?.inputType === inputType.TextLabel ) && controlledTextInputComponent(TextLabel, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() }
                { ( element?.inputType === inputType.ExplanationAnswerEditor ) && customInputComponent(ExplainAnswerComponent, formFieldProps, previewMode, isPreviewMode, element, selectedFormField)() }
                { ( element?.inputType === inputType.RadioButton ) && customInputComponent(RadioButtonAnswerComponent, formFieldProps, previewMode, isPreviewMode, element, selectedFormField, false)() }
                { ( element?.inputType === inputType.CheckBox ) && customInputComponent(CheckBoxAnswerComponent, formFieldProps, previewMode, isPreviewMode, element, selectedFormField)() }
                { ( element?.inputType === inputType.Toggle ) && customInputComponent(ToggleAnswerComponent, formFieldProps, previewMode, isPreviewMode, element, selectedFormField)() }
                { ( element?.inputType === inputType.DropDown ) && controlledDropDownComponent(DropDown, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )()} 
                { ( element?.inputType === inputType.FileUpload ) && formFileUploadComponent(FileUploadField, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() } 
                { ( element?.inputType === inputType.DataObjectSelector ) && formDataObjectSelector(DataObjectSelector, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() } 
                { ( element?.inputType === inputType.Number ) && controlledNumberInputComponent(Numbers, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() }
                { ( element?.inputType === inputType.NumberPercentage ) && controlledNumberInputComponent(NumberPercentage, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() }
                { ( element?.inputType === inputType.NumberPosition ) && controlledNumberInputComponent(NumberPosition, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() }
                { ( element?.inputType === inputType.Date ) && controlledDateTimeInputComponent(DateComponent, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() } 
                { ( element?.inputType === inputType.Time ) && controlledDateTimeInputComponent(Time, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() } 
                { ( element?.inputType === inputType.DateTime ) && controlledDateTimeInputComponent(DateTime, formFieldProps, moveInputField, handleHighlightingFormAnswers, handleDisplayingAnswerKeys, isPreviewMode, element, selectedFormField )() } 
              </li>  
            </div>
            )) 
          }
        </ul>
        </div>
      </div>
      </div>  
      );
  };

export default connect( mapState, mapDispatch )(FormFields);    