import React from "react";

import {
connect } from 'react-redux';

import {
editor_upload_url,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import { 
SET_ONLINEQUESTION_MARKDOWN } from 'services/course/actions/onlinequestions'; 

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 

import {
v4 as uuidv4 } from 'uuid';

import { 
role } from 'services/course/helpers/PageHelpers';

import DeleteIcon from '@material-ui/icons/Delete';
import EditorComponent from 'services/course/pages/components/EditorComponent';
import MathScienceLatex from 'services/course/pages/OnlineQuestionsPage/components/MathScienceLatex';
import CalculateIcon from '@mui/icons-material/Calculate';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import './style.css';

const MathScience = ({
  className,
  formElement, 
  previewMode, 
  currentUser,
  saveMathScienceFormField,
  loadMathScienceFormField,
  saveEditorMarkDownObjectToMw }) => { 
    return (
         <div>
             { 
                <>
                  {<div className="editor-component">
                     <EditorComponent
                        className={className}
                        id={formElement?._id}
                        name={formElement?.name} 
                        handleChange={(editor) => handleChange({ ...formElement, markDownContent: editor }, SET_ONLINEQUESTION_MARKDOWN, `/onlinequestions/`, saveEditorMarkDownObjectToMw )}
                        upload_url={editor_upload_url}
                        content={ formElement?.markDownContent }
                        readOnly={( currentUser?._id && formElement?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
                    />     
                    </div>
                  }
                  {
                   <div className="latex-component"> 
                        <MathScienceLatex 
                            previewMode={previewMode} 
                            formElement={formElement}
                            saveMathScienceFormField={saveMathScienceFormField}
                            loadMathScienceFormField={loadMathScienceFormField}
                        />
                    </div>
                  }
                </>      
             }
        </div>
    )
}

const mapState = ( state, ownProps ) => { 
    return {
      currentUser: state.users.user,
      formFieldsLoading: state?.formFields?.formFieldsLoading,
      onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.form?.question?._id ),
      formFieldAnswersError: state?.formFieldAnswers?.onSaveError,
      formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
      onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
      formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.form?.question?._id )
    };
  };

export default connect(mapState, { saveEditorMarkDownObjectToMw })(MathScience);