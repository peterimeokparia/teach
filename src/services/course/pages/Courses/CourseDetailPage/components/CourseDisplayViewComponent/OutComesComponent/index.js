import { connect } from 'react-redux';
import { addNewOutcome, saveOutcome, loadOutcomes, deleteOutcome, setSelectedOutcome } from 'services/course/actions/outcomes';
import { togglePreviewMode, toggleModal } from 'services/course/actions/app';
import { getUsersByOperatorId, getOperatorFromOperatorBusinessName, getTutorsLessonUserNotesByLessonId } from 'services/course/selectors';
import { saveFormBuilder } from 'services/course/actions/formbuilders';
import useLessonOutComesHook from 'services/course/pages/Courses/hooks/useLessonOutComesHook';
import OutComesRecommenderForm from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesRecommenderForm';
import OutComesCardItem from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesCardItem';
import AddOutComeComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/AddOutComeComponent';
import CardItemComponent from 'services/course/pages/components/CardItemComponent';
import useCardItemComponentHook from 'services/course/pages/components/CardItemComponent/hooks/useCardItemComponentHook';
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
  isFormModalOpen,
  toggleModal,
  toggleQuestionModal,
  formType, 
  formName,
  concepts,
  selectedOutcome,
  lessonId, 
  loadOutcomes,
  saveOutcome,
  setSelectedOutcome,
  questions,
  lessonNotes,
  togglePreviewMode
}) => {
  let { cardItemProps
  } = useLessonOutComesHook({ operatorBusinessName, lesson, courseId, outcomeType, currentUser, 
    outcomes, toggleModal, toggleQuestionModal, formType, formName, isFormModalOpen, saveFormBuilder });

  let { editCardTitleProps
  } = useCardItemComponentHook( outcomes, loadOutcomes, saveOutcome, setSelectedOutcome );

  let { setEditButton, setCurrentOutcome, resetEditingOutcomeTitle } = cardItemProps;

return  ( ( concepts ) 
            ? <OutComesRecommenderForm outCome={ selectedOutcome } cardItemProps={cardItemProps} currentUser={currentUser} openRecommenderModal={concepts}/>  
            : <div className="row outcomes" onBlur={() => setEditButton( false )}>
                <CardItemComponent
                  cardItemCollection={outcomes}
                  {...editCardTitleProps}
                  // handleClickedCardItem={setCurrentOutcome}
                  // handleCardItemOnBlur={resetEditingOutcomeTitle}
                  cardItemProps={cardItemProps}

                >
                 {( cardItem, index, cardItemProps ) => (
                      <OutComesCardItem
                        {...editCardTitleProps}
                        outcome={cardItem}
                        cardIndex={index}
                        cardItemProps={cardItemProps} 
                        lessonId={lessonId}
                      /> 
                  )}
                </CardItemComponent>
                {/* <OutComesCardItem outcomes={outcomes} currentUser={currentUser} cardItemProps={cardItemProps} lessonNotes={lessonNotes} />  */}
                <AddOutComeComponent outcomes={outcomes} buttonText={buttonText} cardItemProps={cardItemProps}/>  
              </div>);
    };

const mapDispatch = {
    addNewOutcome, 
    deleteOutcome,
    loadOutcomes,
    setSelectedOutcome,
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

