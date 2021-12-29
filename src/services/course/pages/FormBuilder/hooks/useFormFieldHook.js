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
addFormFieldConfig,
addGroupedFormFieldsConfig  } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
inputType,
elementMeta,  
editorContentType } from 'services/course/pages/QuestionsPage/helpers';
      
import {
manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
  
import {
upload_url,
uploadImageUrl,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';
  
import {
getById } from 'services/course/api';
    
import {
v4 as uuidv4 } from 'uuid';

import EditorComponent from 'services/course/pages/components/EditorComponent';

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
    handleMaxDialog, 
    previewMode,
    toggleFormFieldSelector,
    question,
    fields,
    formFieldAnswers,
    userId,
    currentUser,
    setMarkDown,
    saveStudentsAnswerPoints,
    setUpdatePoints
  } =  fieldProps;

  const [ contentChanged, setContentChanged ] = useState( undefined );
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
   buildTestForCurrentStudent( formFields, formAnswers  );
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
 
  }, [ fields?.length, loadFormFields, formAnswers?.length, loadFormFieldAnswers, contentChanged, setContentChanged, previewMode, saveStudentsAnswerPoints ] );   

function setFormType(){
  switch (currentUser?.role) {
    case role.Student:
      return formAnswers;
    case role.Tutor:
      return formFields;
    default:
      break;
  }
};

function addFormField( typeOfInput ){
  const uuid = uuidv4();
  let props = { typeOfInput, question, uuid, currentUser, formId };
  addNewFormField( manageFormFieldCollection( addFormFieldConfig( props ) ) );
  setContentChanged( true );
};

function addGroupedFormFields( element, currentUser ){ 
  addNewFormField( manageFormFieldCollection( addGroupedFormFieldsConfig( element, formUuId, currentUser ) ) );
  setContentChanged( true );
};

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
  
function handleFormFieldAnswers( element, inputValue ){
  let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id  );

  if ( existingAnswer ) {   
    saveFormFieldAnswer( { ...existingAnswer, answer: inputValue  } );    
  } else {
    let formFieldAnswer = { ...getFormFieldAnswers( element, question, currentUser, formUuId), inputValue, answer: inputValue }; 
    addNewFormFieldAnswer( formFieldAnswer );
  }

  if ( currentUser?.role === role.Tutor && formBuilderStatus === elementMeta.status.Editing ) {
    saveFormField({ ...element, answerKey: (inputValue === null ? null : inputValue), inputValue });  
  }
};

function handleSelectorFormFieldAnswers( element, inputValue, answer, selected ){
  if ( formBuilderStatus === elementMeta.status.NotEditing  ) {
    let existingAnswer = formAnswers?.find( answer => answer?.fieldId === element?._id );

    if ( existingAnswer ) {    
      saveFormFieldAnswer( { ...existingAnswer, answer: answer, inputValue, selected  } );
    } else {
      let formFieldAnswer = { ...getFormFieldAnswers( element, question, currentUser, formUuId), answer: answer, inputValue, selected  }; 

      addNewFormFieldAnswer(   formFieldAnswer  );
    }
  }

  if ( currentUser?.role === role.Tutor && formBuilderStatus === elementMeta.status.Editing ) {
      if ( selected ) {
        saveFormField({ ...element, answerKey: (inputValue === null ? null : inputValue), inputValue, selected: false  });  
      } else {
        saveFormField({ ...element, answerKey: null, inputValue, selected: false  });  
      }
  }
};

function handleRndPostioning( xaxis, yaxis, element ){
  saveFormField({ ...element, xAxisformFieldPosition: xaxis,  yAxisformFieldPosition: yaxis });
  setContentChanged( true );
};

let modalProps =  {
  isOpen: handleMaxDialog?.isMaxDialogOpen, 
  collection: [ inputType.Text, inputType.TextLabel, inputType.RadioButton, inputType.DropDown, inputType.Explanation, inputType.CheckBox ],
  dialogTitle:'Select input type',
  InputLabel: 'type',
  question,
  addNewFormField,
  selectEventChangeHandler: addFormField,
  handleClose: () => toggleFormFieldSelector( handleMaxDialog?.question ),        
};

function isPreviewMode( element ){
  return ( element?.questionId === previewMode?.question?._id && 
    previewMode?.isPreviewMode === true );
};

function handleMarkDownEditorChange( editor, element ){
  switch ( currentUser?.role ) {
    case role.Student:
      handleChange(editor, element, "formFieldAnswers", SET_FORMFIELDANSWERS_MARKDOWN, saveFormFieldAnswer, setMarkDown);
    break;
    case role.Tutor:
      if ( formBuilderStatus === elementMeta.status.Editing ) {
        handleChange(editor,  element, "formFields", SET_FORMFIELDS_MARKDOWN, saveFormField, setMarkDown);
        setContentChanged( true ); 
      } else {
        handleChange(editor, element, "formFieldAnswers", SET_FORMFIELDANSWERS_MARKDOWN, saveFormFieldAnswer, setMarkDown);
      }
    break;
    default:
    break;
  };
};

async function buildTestForCurrentStudent( formField, answers ){
  alert( formBuilderStatus )
  let explanationFormField = formField?.filter( field => field?.inputType === 'explanation'); 
  let answerExplanationFormField = answers?.filter( field => field?.inputType === 'explanation');
  
  if ( ( currentUser?.role === role.Student ) && ( explanationFormField?.length === answerExplanationFormField?.length ) ) return;

  if ( ( currentUser?.role === role.Student || currentUser?.role === role.Tutor && formBuilderStatus === elementMeta.status.NotEditing ) && ( explanationFormField?.length > 0 )  
            && ( explanationFormField?.length > answerExplanationFormField?.length ) ) {

    explanationFormField.forEach( element => {
      getById( element?._id, `/formfieldanswers/formfield?formfieldId=`)
        .then( resp => {
          if ( resp.length === 0 ) {
            if ( !answerExplanationFormField?.map( ans => ans?._id )?.find( elem => elem?._id === element?._id )?._id ) {
              addNewFormFieldAnswer( getFormFieldAnswers( element, question, currentUser, formUuId ) );
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

  if ( formBuilderStatus === elementMeta.status.Editing ) {
    <EditorComponent
      id={element?._id}
      name={element?.name}
      handleChange={(editor) => handleMarkDownEditorChange( editor, element )}
      content={ element?.markDownContent }
      upload_url={upload_url}
      upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveFormField ) }
      readOnly={(element?.questionCreatedBy === currentUser?._id) ? false : true}
      readOnly={false}
    /> 
  } else {
     return formExplanationAnswers?.map(element => {
            return <EditorComponent
                    id={element?._id}
                    name={element?.name}
                    handleChange={(editor) => handleMarkDownEditorChange( editor, element )}
                    content={ element?.markDownContent }
                    upload_url={upload_url}
                    upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveFormField ) }
                    readOnly={(element?.questionCreatedBy === currentUser?._id) ? false : true}
                  /> 
     });
  }
};

return {
    formFields,
    boundryRef,
    modalProps,  
    formAnswers,
    setFormType,
    isPreviewMode,
    handleChange,
    handleRndPostioning,
    onhandleSelected,
    addGroupedFormFields,
    handleFormFieldAnswers,
    handleSelectorFormFieldAnswers,
    handleMarkDownEditorChange,
    handleEditor
}; };

export default useFormFieldHook;