import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getFormFieldAnswers } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
import { role } from 'services/course/helpers/PageHelpers';
import { SET_FORMFIELDANSWERS_MARKDOWN } from 'services/course/actions/formfieldanswers';
import { SET_FORMFIELDS_MARKDOWN, loadFormFieldsByQuestionId, loadFormFields } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';      
import { handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';
import { getMarkDownAsText } from 'services/course/pages/FormBuilder/FormTables/helpers';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
import { addGroupedFormFieldsConfig  } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/helpers';
import Latex from "react-latex";    
import Form from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/helpers/Form';
import Swal from 'sweetalert2';

function useFormFieldHook( fieldProps ) {
  let { 
    formBuilderState, formBuilderStatus, addNewFormField, saveFormField, loadFormFieldsByFormFieldId, loadFormFields,
    deleteFormField, loadOnlineQuestionsByQuestionId, loadFormFieldAnswers, addNewFormFieldAnswer, saveFormFieldAnswer, saveDraggableFormFieldAnswer, formType, formName, 
    formId, formUuId, previewMode, question, fields, formFieldAnswers, userId, currentUser, saveEditorMarkDownObjectToMw, saveStudentsAnswerPoints, eventId
  } =  fieldProps;

  const [ contentChanged, setContentChanged ] = useState( undefined );
  const [ moveInputField, setMoveInputField ] = useState( false );
  const boundryRef = useRef( null );
  const saveContentInterVal = 7000;

  useEffect(() => {
    loadFormFields();  /// remove - performance
  }, []);
  
  let formFields = fields?.filter( field => field?.formType === formType 
      && field?.formName === formName );

  let formAnswers = formFieldAnswers?.filter( field => 
    field?.formType === formType 
      && field?.formName === formName 
       && field?.formUuId === formUuId
        && field?.userId === (userId ? userId : currentUser?._id) );
           
  useEffect(() => { 
    if ( contentChanged ) {
        loadFormFields();
        loadFormFieldAnswers();
        setContentChanged( false );
    }
    if ( previewMode?.previewMode ) {
        loadFormFields();
        loadFormFieldAnswers();
    }
  }, [ fields?.length, loadFormFields, formAnswers?.length, loadFormFieldAnswers, contentChanged, setContentChanged, previewMode, saveStudentsAnswerPoints, moveInputField ] );   

function onhandleSelected( selected ) {
  Swal.fire({
    title: 'Confirm Delete',
    icon: 'warning',
    showCancelButton: true,
    showConfirmButton: ( true ),
    confirmButtonText: 'Ok',
    confirmButtonColor: '#673ab7',
    cancelButtonText: 'No'
    })
    .then( (response) => {
    if ( response?.value ) {
      deleteFormField( selected );
      setContentChanged( true );
      return;
    } else {
        return;
    } })
    .catch(error =>{   
        throw Error(`Failed to delete question. ${error}`);
    });
};

function handleMarkDownEditorAnswers( element, markDownContent, prevPoints, editorProps ) {
  // let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id  );
  let existingAnswer = element;
  let props = { 
    element, markDownContent, existingAnswer, answer: null, prevPoints, formState: formBuilderState, formStatus: formBuilderStatus,
    addNewFormFieldAnswer, saveFormFieldAnswer, saveFormField, selected: null, question, currentUser, formUuId, eventId, getFormFieldAnswers,
    ...editorProps
  };

  const form = new Form( props );

  form.handleFormMarkDownEditorFieldInManageState();
  form.handleFormMarkDownEditorFieldInTakingState();
}

function handleMarkDownEditorAnswersPoints( element, prevPoints, editorProps ){
  let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id  );
  let props = {
    element, existingAnswer, answer: null, prevPoints, formState: formBuilderState, formStatus: formBuilderStatus, addNewFormFieldAnswer, 
    saveFormFieldAnswer, saveFormField, selected: null, question, currentUser, formUuId, eventId, getFormFieldAnswers, 
    answerKeyPoints: question?.pointsAssigned?.toString(), ...editorProps
  };

  const form = new Form( props );

  form.handleFormMarkDownEditorAnswerFieldInManageState();
}

function handleDraggableFormFieldAnswers( element, prevPoints, position ){
  let existingAnswer = formAnswers?.find( answer => answer?._id === element?._id && answer?.formUuId === formUuId  );


  let props = {
    element, value: null, existingAnswer, answer: null, prevPoints, position, formState: formBuilderState,
    formStatus: formBuilderStatus, addNewFormFieldAnswer, saveFormFieldAnswer, saveFormField, selected: null,
    question, currentUser, formUuId, eventId, saveDraggableFormFieldAnswer, 
     getFormFieldAnswers
  };

  const form = new Form( props );

  form.handleDraggableFormFieldInManageState();
  form.handleDraggableFormFieldInTakingState();
}
  
function handleFormFieldAnswers( element, inputValue, prevPoints ){
  let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id  );
  let props = {
    element, value: inputValue, existingAnswer, answer: null, prevPoints,
    formState: formBuilderState, formStatus: formBuilderStatus, addNewFormFieldAnswer,
    saveFormFieldAnswer, saveFormField, selected: null, question, currentUser,
    formUuId, eventId, getFormFieldAnswers
  };

  const form = new Form( props );

  form.handleFormInputFieldInManageState();
  form.handleFormInputFieldInTakingState();
}

function handleSelectorFormFieldAnswers( element, inputValue, answer, selected, prevPoints ){
  let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id);
  
  let props = {
    element, value: inputValue, existingAnswer, answer, answerKey: element?.answerKey, prevPoints,
    formState: formBuilderState, formStatus: formBuilderStatus, addNewFormFieldAnswer, saveFormFieldAnswer,
    saveFormField, selected, question, currentUser, formUuId, eventId, getFormFieldAnswers,
  };
 
  const form = new Form( props );

  form.handleFormSelectInputFieldInManageState();
  form.handleFormSelectInputFieldInTakingState();
};

function handleRndPostioning( xaxis, yaxis, element ){
  saveFormField({ ...element, xAxisformFieldPosition: xaxis,  yAxisformFieldPosition: yaxis });
  setContentChanged( true );
};


function isPreviewMode( element  ){
  return ( element?.questionId === previewMode?.question?._id && 
    previewMode?.isPreviewMode === true );
};

function handleMarkDownEditorChange( editor, element ){
  switch ( currentUser?.role ) {
    case role.Student:
      handleChange({ ...element, markDownContent: editor }, SET_FORMFIELDANSWERS_MARKDOWN, `/formfieldanswers/`, saveEditorMarkDownObjectToMw );
      handleFormFieldAnswers( element, getMarkDownAsText( element?.markDownContent ) );    
    break;
    case role.Tutor:
      if ( formBuilderState === elementMeta.state.Manage ) {
        handleChange({ ...element, markDownContent: editor }, SET_FORMFIELDS_MARKDOWN, `/formfields/`, saveEditorMarkDownObjectToMw );
        setContentChanged( true ); 
      } else {
        handleChange({ ...element, markDownContent: editor }, SET_FORMFIELDANSWERS_MARKDOWN, `/formfieldanswers/`, saveEditorMarkDownObjectToMw );   
      }
    break;
    default:
    break;

  };
};

function handleEditor( element, markDownContent ){
  saveFormField( { ...element, markDownContent } );
  loadFormFieldsByFormFieldId( element?._id );
}

function handleHighlightingFormAnswers( element ) {
  if ( (formBuilderStatus !== elementMeta.status.Review) || ( formBuilderStatus !== elementMeta.status.Reviewed ) ) return 'radio';
  if ( element?.inputType === inputType.RadioButton && 
      element?.selected === true && element?.answerKey !== null ) {
        return 'radio-highlighted';
  }
  if ( element?.inputType === inputType.CheckBox && element?.answerKey !== null ) {
      return 'radio-highlighted';
  }
  if ( element?.inputType === inputType.DropDown && element?.answerKey !== null ) {
    return 'radio-highlighted';
  }
  if ( element?.answerKey !== null ) {
    return 'radio-highlighted';
  }
}

function handleDisplayingAnswerKeys( element ){
  return ( <div>{ formBuilderState !== elementMeta.state.Taking && element?.answerKey !== null &&  <Latex>{`answer: $${element?.answerKey}$`}</Latex> } </div>);
}

function addGroupedFormFields( element ){ 
  const yCoordinateIncrementValue = 150;
  
  addNewFormField( manageFormFieldCollection( addGroupedFormFieldsConfig( element, formUuId, currentUser, yCoordinateIncrementValue, formFields  ) ) );
}

let formFieldProps = { 
  ...fieldProps, 
  moveInputField,
  loadOnlineQuestionsByQuestionId, 
  setMoveInputField,
  handleMarkDownEditorAnswers,
  handleMarkDownEditorAnswersPoints,
  handleFormFieldAnswers, 
  handleSelectorFormFieldAnswers, 
  handleDraggableFormFieldAnswers,
  onhandleSelected,
  addGroupedFormFields, 
};

return {
    formFields,
    boundryRef,
    formAnswers,
    moveInputField, 
    saveContentInterVal, 
    formFieldProps,
    isPreviewMode,
    handleChange,
    handleRndPostioning,
    handleMarkDownEditorChange,
    handleEditor,
    handleHighlightingFormAnswers,
    handleDisplayingAnswerKeys,
    handleDraggableFormFieldAnswers
}; };

export default useFormFieldHook;