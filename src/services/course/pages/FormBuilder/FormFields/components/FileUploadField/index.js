import { 
useState,
useEffect }from 'react';

import { 
connect } from 'react-redux';

import {
saveFormField } from 'services/course/actions/formfields';

import { 
addNewFormFieldAnswer,
saveFormFieldAnswer } from 'services/course/actions/formfieldanswers';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
FormFileUpload } from 'services/course/pages/components/FormFileUpload';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import {
getFormFieldAnswers } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

import { 
formFileViewer } from '../../helpers/FileViewer';

import FormFileViewerPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFileViewerPanel';
import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import useFormFileUploadHook from '../../../hooks/useFormFileUploadHook';
//import './style.css';

const FileUploadField = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    saveFormField,
    addNewFormFieldAnswer,
    saveFormFieldAnswer,
    saveOnlineQuestions,
    elememtFormFields,
    studentsAnswer,
    dropDownValues,
    formFieldAnswersError,
    currentUser }) => {
        
    const [ answer, setStudentsAnswer ] = useState( null );

    let {
        question, 
        formUuId, 
        eventId 
        } = fieldProps;
     
        // Disable field if the user viewing the submitted form isn't the one submitting the form.
    useEffect(() => { 

        if ( studentsAnswer?.answer && ( studentsAnswer?.answer !== null || studentsAnswer?.answer !== "" ) ) {
            
            setStudentsAnswer( studentsAnswer['answer'] );
        }

    }, [ studentsAnswer && studentsAnswer?.answer && ( studentsAnswer?.answer !== null || studentsAnswer?.answer !== "" ) ]);

    // saveFormFieldAnswer, saveFormField

    let {
        fileUploadUrl, 
        selectedFileToRemove
    } = useFormFileUploadHook({ saveFormField, fileUploadUrl: "/api/v1/fileUploads", formFieldElement });

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField } );

    const handleFormFileUpload = () => {

        if ( elementMeta?.state.Manage ) {
            
            return { currentObject: formFieldElement, action: saveFormField };
        }

        if ( elementMeta?.state.Taking && ( studentsAnswer || answer )   ) {

            return { currentObject: studentsAnswer, action: saveFormFieldAnswer };
        }
        
        if ( elementMeta?.state.Taking && !( studentsAnswer || answer ) ) {

            let answerProps = {
                element: formFieldElement,
                question,
                formUuId, 
                eventId,
                currentUser 
            }

            let formFieldAnswer = getFormFieldAnswers( answerProps ); 
      
            return { currentObject: formFieldAnswer, action: addNewFormFieldAnswer };
        }
    }
    
    function getFileName( link ){
        return link.split('files/')[1];
    };
    
    const openFile = (file) => {
        window.open(`${file}`);
    };
    
    const deleteFile = ( fileToDelete ) => {
        if( window.confirm(`Are you sure you want to delete ${fileToDelete}`) ){
            selectedFileToRemove( fileToDelete );
        }
    };

    let fileProps = {
        fileCollection: ( elementMeta?.state.Manage ) ? formFieldElement : studentsAnswer, 
        getFileName,
        openFile,
        deleteFile
    }
return(
    <>
    { ( previewMode ) &&
        <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
        </div>
    }
    {  
     <>  
        {/* clean this up */}
        <div className="formfield-file-upload">
            <FormFileUpload
                previewMode={previewMode}
                currentObject={  ( elementMeta?.state.Manage ) ? formFieldElement : studentsAnswer  }
                // currentObject={ { test: 'test object'} }
                typeOfUpload={'userlessonfiles'} //userlessonfiles
                fileUploadUrl={fileUploadUrl}
                selectedFileToRemove={selectedFileToRemove}
                msg={"Please click on the link before uploading files."}
                saveAction={ saveFormField }
                //saveAction={ handleFormFileUpload?.action }
                fileViewer={formFileViewer}
            />
        </div>
        <FormFileViewerPanel  props={ fileProps } getFileName={getFileName}/>
        </>
    }
    </>
    );
}

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ).find( field => field?.fieldId === ownProps?.formFieldElement?._id  && field?.formName === ownProps?.formFieldElement?.formName && field?.formUuId === ownProps?.fieldProps?.formUuId && field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        error: state.lessons.onSaveLessonError
    };
};

export default connect( mapState, { saveFormField, saveOnlineQuestions, saveFormFieldAnswer, addNewFormFieldAnswer } )(FileUploadField);
