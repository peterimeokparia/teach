import { connect } from 'react-redux';
import { addNewOutcome, saveOutcome, loadOutcomes, deleteOutcome } from 'services/course/actions/outcomes';
import { togglePreviewMode, toggleModal } from 'services/course/actions/app';
import { getUsersByOperatorId, getOperatorFromOperatorBusinessName, getTutorsLessonUserNotesByLessonId } from 'services/course/selectors';
import { saveFormBuilder } from 'services/course/actions/formbuilders';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import useLessonOutComesHook from 'services/course/pages/Courses/hooks/useLessonOutComesHook';
import OutComesRecommenderForm from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesRecommenderForm';
import OutComesCardItem from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesCardItem';
import AddOutComeComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/AddOutComeComponent';
import './style.css';

const OutComesComponent = ({
  operatorBusinessName,
  saveFormBuilder,
  buttonText,
  courseId,
  lesson,
  outcomeType,
  outcomes,
  currentUser,
  togglePreviewMode, 
  isFormModalOpen,
  toggleModal,
  toggleQuestionModal,
  formType, 
  formName,
  concepts,
  selectedOutcome,
  questions,
  lessonNotes, 
  lessonId, 
}) => {
  let { cardItemProps
  } = useLessonOutComesHook({ operatorBusinessName, lesson, courseId, outcomeType, currentUser, 
    outcomes, toggleModal, toggleQuestionModal, formType, formName, isFormModalOpen, saveFormBuilder });

  let { setEditButton } = cardItemProps;

return  ( ( concepts ) 
            ? <OutComesRecommenderForm outCome={ selectedOutcome } cardItemProps={cardItemProps} currentUser={currentUser} openRecommenderModal={concepts}/>  
            : <div className="row outcomes" onBlur={() => setEditButton( false )}>
                <OutComesCardItem outcomes={outcomes} currentUser={currentUser} cardItemProps={cardItemProps} lessonNotes={lessonNotes} /> 
                <AddOutComeComponent outcomes={outcomes} buttonText={buttonText} cardItemProps={cardItemProps}/>  
              </div>);
    };

const mapDispatch = {
    addNewOutcome, 
    deleteOutcome,
    loadOutcomes,
    saveOutcome, 
    togglePreviewMode, 
    toggleModal,
    saveFormBuilder
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        currentUser: state.users.user,
        course: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        courses: Object.values( state.courses.courses ),
        lessons: Object.values(state.lessons.lessons),
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        toggleQuestionModal: state.app.toggleModal,
        isFormModalOpen: state?.formBuilders?.isFormModalOpen,
        questions:  Object.values(state.onlineQuestions.onlineQuestions),
        selectedOutcome: state.outcomes.selectedOutcome,
        concepts: state.outcomes.concepts,
        lessonNotes: getTutorsLessonUserNotesByLessonId(state, ownProps)
    };
};

export default connect( mapState, mapDispatch )(OutComesComponent);

