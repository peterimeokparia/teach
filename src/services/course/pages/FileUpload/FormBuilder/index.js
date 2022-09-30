import { connect } from 'react-redux';
import { addNewFormBuilder, saveFormBuilder, loadFormBuilders, loadPagedFormBuilders } from './node_modules/services/course/actions/formbuilders';
import { addTime,saveTime,loadTestTimers } from './node_modules/services/course/actions/countdowntimer';
import { role } from './node_modules/services/course/helpers/PageHelpers';
import { getSortedRecordsByDate } from './node_modules/services/course/selectors';
import { addMissedAnswers } from "./node_modules/services/course/actions/missedanswers";
import { handleFormDisplayName } from './node_modules/services/course/pages/FormBuilder/helpers';
import TabPanelDisplay from './node_modules/services/course/pages/components/TabPanelDisplay';
import './node_modules/services/course/pages/FormBuilder/formStyles/quizz/style.css';
import './node_modules/services/course/pages/FormBuilder/formStyles/report/style.css';
import './node_modules/services/course/pages/FormBuilder/formStyles/quizzWithPoints/style.css';
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
  reportFormFieldAnswers,
  }) => {
    let props = {
      operatorBusinessName, currentUser, users, loadPagedFormBuilders,
      formBuilders, formType, formName, formId, formUuId, userId, courseId,
      lessonId, addNewFormBuilder, loadFormBuilders, saveFormBuilder, addTime,
      saveTime, loadTestTimers, timer, currentUserTimer, allTimers, onlineQuestions,
      formFieldAnswers, reportFormFieldAnswers, eventId, addMissedAnswers
    };

  return <> 
    <div className="formbuilder-action-toolbars">
        <h2>{`${ handleFormDisplayName(props?.formType)?.toUpperCase() }`}</h2>
        <TabPanelDisplay props={props}/> 
    </div>
    </>;
};

const mapDispatch = { 
  addMissedAnswers, addNewFormBuilder, saveFormBuilder, loadFormBuilders, addTime, 
  saveTime, loadTestTimers, loadPagedFormBuilders
};

// create / use selectors for some of these
const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    users: Object.values( state.users.users ),
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions)?.filter( question => question?.formName === ownProps.formName ),
    formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers )?.filter( answer => answer?.formName === ownProps.formName ),
    formBuilders: getSortedRecordsByDate(Object.values( state.formBuilders?.formBuilders ).filter(form => form?.formName === ownProps?.formName), 'createDateTime' ),
    timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.formName && timer?.role === role?.Tutor ),
    allTimers: Object?.values( state?.timers?.timers ),
    reportFormFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers )?.filter( answer => answer?.formName === ownProps.formName &&
                              answer?.formType === 'report'  && answer?.eventId === ownProps?.eventId ),
  };
};

export default connect( mapState, mapDispatch )(FormBuilder);
