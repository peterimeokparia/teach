import * as React from 'react';
import { connect } from 'react-redux';
import { toggleCourseModal } from 'services/course/actions/courses';
import { toggleNewFormBuilderModal} from 'services/course/actions/formbuilders';
import { toggleOutComeFurtherStudyModal } from 'services/course/actions/outcomes';
import { addNewFormBuilder, saveFormBuilder, loadFormBuilders, loadPagedFormBuilders } from 'services/course/actions/formbuilders';
import { addTime,saveTime,loadTestTimers } from 'services/course/actions/countdowntimer';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { getFormsInCreatorsPublishedBucket, getFormsInCreatorsPendingBucket, 
  getFormsInCreatorsPublishedBucketWithOutcomeId, getFormsInCreatorsPendingBucketWithOutcomeId } from 'services/course/selectors/formBuilderFormSelectors';
import { helpIconStyle } from 'services/course/pages/Courses/MyCoursesPage/inlineStyles';
import { role } from 'services/course/helpers/PageHelpers';
import AddNewFormBuilderComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/AddNewFormBuilderComponent';
import SelectExistingFormBuilderComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent';
import Modal from 'react-modal';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './style.css';

const OutcomesFormBuilderComponent = ({
  operatorBusinessName,
  formType,
  formName,
  formId,
  userId,
  eventId, 
  courseId,
  lessonId,
  outcomeId,
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
  publishedForms,
  pendingForms,
  publishedFormsByOutcomeId,
  pendingFormsByOutcomeId,
  isModalOpen,
  isFormModalOpen,
  toggleCourseModal,
  furtherStudyModal,
  toggleOutComeFurtherStudyModal,
  toggleNewFormBuilderModal
}) => {
    let props = {
      operatorBusinessName, currentUser, users, loadPagedFormBuilders,
      formBuilders, formType, formName, formId,  userId, courseId, outcomeId,
      lessonId, addNewFormBuilder, loadFormBuilders, saveFormBuilder, addTime,
      saveTime, loadTestTimers, timer, currentUserTimer, allTimers, onlineQuestions,
      formFieldAnswers, reportFormFieldAnswers, eventId 
    };

    const editExistingFormBuilderForm = ( selectValue ) => {
        if ( selectValue ) {
          saveFormBuilder( { ...selectValue, state: elementMeta.state.Manage, status: elementMeta.status.Pending, userId: selectValue?.userId, eventId, outcomeId } );
          toggleNewFormBuilderModal();
        }
    };

return (
    <div>
        {
          <>
          <Modal 
            isOpen={isFormModalOpen} 
            onRequestClose={toggleNewFormBuilderModal}
          > 
            <div className={'row'}> 
            { ( furtherStudyModal  ) 
                ? <Modal 
                    isOpen={furtherStudyModal} 
                    onRequestClose={toggleOutComeFurtherStudyModal}
                  > 
                    <AddNewFormBuilderComponent props={props}/>
                  </Modal>
                :  <PostAddIcon 
                      style={helpIconStyle()}
                      className="comment-round-button-4"
                      onClick={toggleOutComeFurtherStudyModal}
                    />  
            }
            </div>
            <div className={'row existing-forms'}> 
            { 
                <SelectExistingFormBuilderComponent props={{editExistingFormBuilderForm, pendingFormsByOutcomeId}}/>
            }
            </div>
            </Modal>;
          </>
        }
    </div>
    );
};

const mapState = ( state, ownProps ) => {
    return {
      furtherStudyModal: state?.outcomes?.furtherStudyModal,
      isFormModalOpen: state?.formBuilders?.isFormModalOpen,
      currentUser: state.users.user,
      users: Object.values( state.users.users ),
      onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions)?.filter( question => question?.formName === ownProps.formName ),
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers )?.filter( answer => answer?.formName === ownProps.formName ),
      formBuilders: Object.values( state.formBuilders?.formBuilders ),
    //   formBuilders: getSortedRecordsByDate(Object.values( state.formBuilders?.formBuilders ).filter(form => form?.formName === ownProps?.formName), 'createDateTime' ),
      timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.formName && timer?.role === role?.Tutor ),
      allTimers: Object?.values( state?.timers?.timers ),
      publishedForms: getFormsInCreatorsPublishedBucket( state, ownProps ),
      pendingForms: getFormsInCreatorsPendingBucket(  state, ownProps ),
      publishedFormsByOutcomeId: getFormsInCreatorsPublishedBucketWithOutcomeId(  state, ownProps ), 
      pendingFormsByOutcomeId: getFormsInCreatorsPendingBucketWithOutcomeId(  state, ownProps ),
    };
  };
  

  export default connect( mapState, { toggleCourseModal, toggleNewFormBuilderModal, toggleOutComeFurtherStudyModal,
    addNewFormBuilder, saveFormBuilder, loadFormBuilders, addTime, saveTime, loadTestTimers, loadPagedFormBuilders } )(OutcomesFormBuilderComponent);