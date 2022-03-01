import { 
useState, 
useEffect,
useRef } from 'react';

import {
getFormFieldAnswers } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
SET_FORMFIELDANSWERS_MARKDOWN } from 'services/course/actions/formfieldanswers';

import {
SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';
      
import {
upload_url,
uploadImageUrl,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';
  
import {
getById } from 'services/course/api';

import {
getMarkDownAsText } from 'services/course/pages/FormBuilder/FormTables/helpers';
    
import EditorComponent from 'services/course/pages/components/EditorComponent';
import Form from 'services/course/pages/FormBuilder/FormFields/helpers/Form';
import Swal from 'sweetalert2';

function useFormFieldHook( fieldProps ) {

  let { 
    formBuilderStatus,
    loadFormFields, 
    addNewFormField, 
    saveFormField,  
    deleteFormField,
    loadFormFieldAnswers, 
    loadFormFieldPoints,
    formFieldAnswersError,
    addNewFormFieldAnswer, 
    saveFormFieldAnswer,
    courseId, 
    lessonId,
    formId,
    formUuId,
    previewMode,
    question,
    fields,
    formFieldAnswers,
    userId,
    currentUser,
    setMarkDown,
    saveStudentsAnswerPoints,
    setUpdatePoints,
    eventId
  } =  fieldProps;

  const [ contentChanged, setContentChanged ] = useState( undefined );
  const [ moveInputField, setMoveInputField ] = useState(false)
  const boundryRef = useRef(null);
  
  let formFields = fields?.filter( field => field?.formId === formId
    && field?.formType === question?.formType 
      && field?.formName === question?.formName );

  let formAnswers = formFieldAnswers?.filter( field => field?.formId === formId 
      && field?.formType === question?.formType 
        && field?.formName === question?.formName 
          && field?.formUuId === formUuId 
          && field?.userId === (userId ? userId : currentUser?._id) );
           
  // come back to this...        
  useEffect(() => {
   //buildTestForCurrentStudent( formFields, formAnswers  );
  }, []);

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
  
function handleFormFieldAnswers( element, inputValue, prevPoints ){
  let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id  );

  let props = {
    element,
    value: inputValue,
    existingAnswer,
    answer: null,
    prevPoints,
    formStatus: formBuilderStatus,
    addNewFormFieldAnswer,
    saveFormFieldAnswer,
    getFormFieldAnswers,
    saveFormField,
    selected: null,
    question,
    currentUser,
    formUuId,
    eventId
  }

  const form = new Form( props );

  form.handleFormInputFieldInManageState();

  form.handleFormInputFieldInTakingState();

}

function handleSelectorFormFieldAnswers( element, inputValue, answer, selected, prevPoints ){

  let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id );

  let props = {
    element,
    value: inputValue,
    existingAnswer,
    answer,
    prevPoints,
    formStatus: formBuilderStatus,
    addNewFormFieldAnswer,
    saveFormFieldAnswer,
    getFormFieldAnswers,
    saveFormField,
    selected,
    question,
    currentUser,
    formUuId,
    eventId
  }

  const form = new Form( props );

  form.handleFormSelectInputFieldInManageState();

  form.handleFormSelectInputFieldInTakingState();

};

function handleRndPostioning( xaxis, yaxis, element ){
  saveFormField({ ...element, xAxisformFieldPosition: xaxis,  yAxisformFieldPosition: yaxis });
  setContentChanged( true );
};


function isPreviewMode( element ){
  return ( element?.questionId === previewMode?.question?._id && 
    previewMode?.isPreviewMode === true );
};

function handleMarkDownEditorChange( editor, element ){
  
  switch ( currentUser?.role ) {
    case role.Student:
      handleChange( editor, element, "formFieldAnswers", SET_FORMFIELDANSWERS_MARKDOWN, saveFormFieldAnswer, setMarkDown );
      handleFormFieldAnswers( element, getMarkDownAsText( element?.markDownContent ) );    
    break;
    case role.Tutor:
      if ( formBuilderStatus === elementMeta.state.Manage ) {
        handleChange( editor, element, "formFields", SET_FORMFIELDS_MARKDOWN, saveFormField, setMarkDown );
        setContentChanged( true ); 
      } else {
        handleChange( editor, element, "formFieldAnswers", SET_FORMFIELDANSWERS_MARKDOWN, saveFormFieldAnswer, setMarkDown );       
      }
    break;
    default:
    break;
  };
};

async function buildTestForCurrentStudent( formField, answers ){
  let explanationFormField = formField?.filter( field => field?.inputType === 'explanation'); 
  let answerExplanationFormField = answers?.filter( field => field?.inputType === 'explanation');
  
  if ( ( currentUser?.role === role.Student ) && ( explanationFormField?.length === answerExplanationFormField?.length ) ) return;

  if ( ( currentUser?.role === role.Student || currentUser?.role === role.Tutor && formBuilderStatus === elementMeta.state.Taking ) && ( explanationFormField?.length > 0 )  
            && ( explanationFormField?.length > answerExplanationFormField?.length ) ) {

    explanationFormField.forEach( element => {
      getById( element?._id, `/formfieldanswers/formfield?formfieldId=`)
        .then( resp => {
          if ( resp.length === 0 ) {
            if ( !answerExplanationFormField?.map( ans => ans?._id )?.find( elem => elem?._id === element?._id )?._id ) {

              let answerProps = {
                element, 
                question, 
                currentUser, 
                formUuId, 
                eventId  
              };

              addNewFormFieldAnswer( getFormFieldAnswers( answerProps ) );
            }
          }
        }) 
        .catch( error => { console.log( JSON.stringify( error ))} )
    });
  }
  setContentChanged( true );
};

function handleEditor( element ){
  let formExplanationAnswers = formAnswers?.filter( val => val?.fieldId === element?._id );

  if ( formBuilderStatus === elementMeta.state.Manage ) {
    return <EditorComponent
      id={element?._id}
      name={element?.name}
      handleChange={(editor) => handleMarkDownEditorChange( editor, element )}
      content={ element?.markDownContent }
      upload_url={upload_url}
      upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveFormField ) }
      readOnly={(element?.questionCreatedBy === currentUser?._id) ? false : true}
      readOnly={false}
    /> 
  }

  return formExplanationAnswers?.map(element => {
    return <EditorComponent
         id={element?._id}
         name={element?.name}
         handleChange={(editor) => handleMarkDownEditorChange( editor, element )}
         content={ element?.markDownContent }
         upload_url={upload_url}
         upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveFormField ) }
        //  readOnly={(element?.questionCreatedBy === currentUser?._id) ? false : true}
        readOnly={false}
       /> 
  });
};

return {
    formFields,
    boundryRef,
    formAnswers,
    moveInputField, 
    setMoveInputField,
    isPreviewMode,
    handleChange,
    handleRndPostioning,
    onhandleSelected,
    handleFormFieldAnswers,
    handleSelectorFormFieldAnswers,
    handleMarkDownEditorChange,
    handleEditor
}; };

export default useFormFieldHook;