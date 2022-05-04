import 
React, { 
useState,
useEffect } from 'react';

import { 
connect } from 'react-redux';
    
import {
loadFormFields,
saveFormField } from 'services/course/actions/formfields';

import {
loadFormFieldAnswers,
saveFormFieldAnswer } from 'services/course/actions/formfieldanswers';

import {
loadOnlineQuestions,
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import { 
getOperatorFromOperatorBusinessName,    
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import { 
addMissedAnswers } from "services/course/actions/missedanswers";

import { 
navigate } from '@reach/router';

import EditorComponent from 'services/course/pages/components/EditorComponent';

const MissedQuestionsComponent = ( { 
  operator,
  fieldProps,
  previewMode, 
  currentUser,
  formFieldElement,
  elememtFormFields,
  display,
  setMissedQuestions,
  addMissedAnswers,
  onlineQuestions, 
  formFields,
  formFieldAnswers,
  formType,
  formName,
  formId,
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
  saveOnlineQuestions,
  studentAnswerByQuestionId,
  loadOnlineQuestions,
  loadFormFields,
  saveFormField,
  loadFormFieldAnswers,
  saveFormFieldAnswer,
  operatorBusinessName } ) => {

  let missedQuestionProps = {
    onlineQuestions, 
    formFields,
    formFieldAnswers,
    formType,
    formName,
    formId,
    operatorBusinessName
  };

  useEffect( () => {

    addMissedAnswers( missedQuestionProps );

  }, []);

  useEffect(() => {

    if ( missedQuestions?.length > 0 ) {
      setMissedQuestions( missedQuestions );
    }

  }, [missedQuestions?.length === 0])
        
  const handleSelectedQuestion = ( question ) => {

    if ( ! question ) return;

    navigate(`/${operatorBusinessName}/formBuilder/${answerFormType}/${answerFormName}/${question?.courseId}/${answerFormUuId}/${answerFormUserId}/Taking/000/#${question?._id}`);

  };

return(
    <>
    {
    <div>
       { missedQuestions?.length > 0 && display && <div> {"Missed Questions."} </div> &&
          [ ...new Set( missedQuestions ) ]?.map(question => (
            <div>
              <div 
                className="explanation-content" 
                onClick={() => handleSelectedQuestion( question )} > 
                <EditorComponent
                  id={question?._id}
                  name={question?._id}
                  content={ question?.markDownContent }
                  readOnly={ true }
                /> 
            </div>
            </div>
          ))
       }
    </div>
    }
    </>
    )
};

 const mapDispatch = {
    addMissedAnswers,
    loadOnlineQuestions, 
    loadFormFields,
    saveFormField,
    loadFormFieldAnswers,
    saveFormFieldAnswer,
    saveOnlineQuestions
  };
  
  const mapState = ( state, ownProps ) => { 
    return {
      operator: getOperatorFromOperatorBusinessName(state, ownProps),
      currentUser: state.users.user,
      currentUsers: Object.values( state.users.users ),
      onlineQuestions: Object.values(state?.onlineQuestions?.onlineQuestions),
      formFields: Object.values( state?.formFields?.formFields ).filter( field => field?.formType === ownProps?.formType && 
        field?.formName === ownProps?.formName ),
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.formType === ownProps?.formType && 
        field?.formName === ownProps?.formName ),
      elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
      formFieldsLoading: state?.formFields?.formFieldsLoading,
      onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
      formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
      onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
      formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
      studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps),
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

export default connect( mapState, mapDispatch )(MissedQuestionsComponent);
