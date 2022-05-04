import {
connect } from 'react-redux';

import {
addNewFormBuilder,
saveFormBuilder,
loadFormBuilders,
loadPagedFormBuilders } from 'services/course/actions/formbuilders';

import { 
addTime,
saveTime,
loadTestTimers } from 'services/course/actions/countdowntimer';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
getSortedRecordsByDate } from 'services/course/selectors';

import { 
addMissedAnswers } from "services/course/actions/missedanswers";
  
import useSetFormBuilderHook from './hooks/useSetFormBuilderHook';
import Modal from 'react-modal';
import FloatingActionButtonZoom from 'services/course/pages/components/FloatingActionButtonZoom';
import 'services/course/pages/FormBuilder/formStyles/quizz/style.css';
import 'services/course/pages/FormBuilder/formStyles/report/style.css';
import 'services/course/pages/FormBuilder/formStyles/quizzWithPoints/style.css';
import './style.css';

const FormBuilder = ({  
    operatorBusinessName,
    formType,
    formName,
    formId,
    formUuId,
    userId,
    eventId, 
    courseId,
    lessonId,
    currentUser,
    users,
    formBuilders,
    addMissedAnswers,
    addNewFormBuilder,
    saveFormBuilder,
    loadFormBuilders,
    loadPagedFormBuilders,
    addTime,
    saveTime,
    loadTestTimers, 
    timer,
    currentUserTimer,
    allTimers,
    onlineQuestions,
    formFieldAnswers,
    reportFormFieldAnswers }) => {

    let { 
      pendingFormsInBuildState,
      publishedFormsInBuildState,
      inProgressFormsInTakingState,
      submittedFormsInTakingState,  
      allSubmittedFormsInSubmittedState,
      currentUsersSubmittedFormsInSubmittedState,
      formsInBuildState,
      formsInUse
    } = useSetFormBuilderHook( formType, currentUser, loadFormBuilders, loadTestTimers, formBuilders );

    let props = {
      operatorBusinessName,
      currentUser,
      users,
      loadPagedFormBuilders,
      formBuilders,
      formsInBuildState,
      formsInUse,
      pendingFormsInBuildState,
      publishedFormsInBuildState,
      inProgressFormsInTakingState,
      submittedFormsInTakingState,
      allSubmittedFormsInSubmittedState,
      currentUsersSubmittedFormsInSubmittedState,
      formType,
      formName,
      formId,
      formUuId,
      userId,
      courseId,
      lessonId,
      addNewFormBuilder,
      loadFormBuilders,
      saveFormBuilder,
      addTime,
      saveTime,
      loadTestTimers,
      timer,
      currentUserTimer,
      allTimers,
      onlineQuestions,
      formFieldAnswers,
      reportFormFieldAnswers,
      eventId,
      addMissedAnswers
    };

    return <> 
    <div className="formbuilder-action-toolbars">
      <h2>{`${ props?.formType?.toUpperCase()}`}</h2>
      <FloatingActionButtonZoom props={props}/> 
    </div>
    </>
};
// create / use selectors for some of these
const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    users: Object.values( state.users.users ),
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions)?.filter( question => question?.formName === ownProps.formName ),
    formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers )?.filter( answer => answer?.formName === ownProps.formName ),
    formBuilders: getSortedRecordsByDate(Object.values( state.formBuilders?.formBuilders ).filter(form => form?.formId === ownProps?.formId), 'createDateTime' ),
    timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.formName && timer?.role === role?.Tutor ),
    allTimers: Object?.values( state?.timers?.timers ),
    reportFormFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers )?.filter( answer => answer?.formName === ownProps.formName &&
                              answer?.formType === 'report'  && answer?.eventId === ownProps?.eventId ),
  };
};

export default connect( mapState, { addMissedAnswers, addNewFormBuilder, saveFormBuilder, loadFormBuilders, addTime, saveTime, loadTestTimers, loadPagedFormBuilders } )(FormBuilder);
