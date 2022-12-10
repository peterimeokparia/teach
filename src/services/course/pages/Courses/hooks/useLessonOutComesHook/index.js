import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect, useRef } from 'react';
import { addNewOutcome, saveOutcome, loadOutcomes, deleteOutcome, setOutcomeLink, setSelectedOutcome, toggleConcepts } from 'services/course/actions/outcomes';
import { toggleNewFormBuilderModal, setIsMaxQuestionDialogOpen } from 'services/course/actions/formbuilders';
import { addNewFormBuilder, saveFormBuilder } from 'services/course/actions/formbuilders';
import { addNotes, saveNotes } from 'services/course/actions/notes';
import { setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import { getItemColor } from 'services/course/helpers/PageHelpers';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers'; 
import { role } from 'services/course/helpers/PageHelpers';
import { generateUuid } from 'services/course/pages/Users/helpers';
import { setSwalInput } from 'services/course/helpers/PageHelpers';

function useLessonOutComesHook( props ) {
  let { operatorBusinessName, lesson, courseId, outcomeType, currentUser, toggleModal, 
     isFormModalOpen, toggleQuestionModal, outcomes, formName } = props;
  
  let formType = formTypes.furtherstudy;

  const [ title, setTitle ] = useState('');
  const [ outcomeTitle, setOutcomeTitle ] = useState('');
  const [ editButton, setEditButton ] = useState( false );
  const [ editingOutcome, setEditingOutcome ] = useState( false );
  const formBuilders = useSelector( state => Object.values( state.formBuilders?.formBuilders ) );
  const formBuilderState = (currentUser?.role === role.Tutor) ? elementMeta.state.Manage : elementMeta.state.Taking;
  const formBuilderStatus = (currentUser?.role === role.Tutor) ? elementMeta.status.Pending : elementMeta.status.InProgress;
  const uuid = generateUuid();
  const formUuId = uuid;
  const outcomeName = `${lesson?.title}-quizz_${formTypes?.furtherstudy}_${formUuId}`;
  const lessonId = lesson?._id;
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    loadOutcomes();
  }, []);

  useEffect(() => {
    if ( editButton ) {
      inputRef?.current?.focus();
    }

    if ( editingOutcome ) {
      inputRef?.current?.focus();
    }
  },[ editButton, editingOutcome ]);

  useEffect(() => {
    loadOutcomes();
  }, [ isFormModalOpen ]);

function handleSettingConceptsModal() {
  dispatch(toggleConcepts());
}

function handleRecommendations(outcomeProps){
  dispatch(setSelectedOutcome( outcomeProps ));
  handleSettingConceptsModal();
}

function buildLessonInsights(outcome) {
  handleAddingFormBuilder( handleSavingFormBuilder( outcome, undefined, formTypes.lessoninsights ),  outcome, undefined, formTypes.lessoninsights );
}

function buildFurtherQuestions(outcome, link) {
  let linkId = link?.uniqueId;

  buildQuestions( outcome );
  dispatch( setIsMaxQuestionDialogOpen( false ) );
  dispatch( setOutcomeLink( link ) );
  handleAddingFormBuilder( handleSavingFormBuilder( outcome, linkId, formTypes.furtherstudy ),  outcome, linkId, formTypes.furtherstudy );
}

function buildQuestions( outcomeProps ){
  dispatch(setSelectedOutcome( outcomeProps ));
  handleModal();
}

function goToFurtherQuestions(outcome, question, e) {
  e?.preventDefault();
  buildQuestions( outcome );
  dispatch( setSelectedOnlineQuestion( question ) );
  handleAddingFormBuilder( handleSavingFormBuilder( outcome, undefined, formTypes.furtherstudy ),  outcome, undefined, formTypes.furtherstudy );
}

function handleAddingFormBuilder( formbuilder, outcome, linkId, formType ){
  let newFormBuilder = {
    operatorBusinessName, formType, formName: outcome?.outcomeName, courseId, lessonId, formId:lessonId,formUuId,createDateTime: Date.now(),
    takingDateTime: Date.now(), createdBy:currentUser?._id, userId:currentUser?._id, status:formBuilderStatus, 
    state:formBuilderState, eventId:'000', outcomeId:outcome?._id, linkId
  };

  let builder  = formBuilders?.find( builder => builder?.formName === outcome?.outcomeName );

  if ( builder && !formbuilder && currentUser?.role === role.Student ) {
    let formDisplayName = builder?.formDisplayName;

    dispatch( addNewFormBuilder({ ...newFormBuilder, linkId, formDisplayName,  state: formBuilderState, status: formBuilderStatus  }) );
  }

  if ( !formbuilder && currentUser?.role === role.Tutor ) {
      setSwalInput('Enter a display name', 'Enter display name', outcome?.color)
      .then( formDisplayName => {  
        if ( formDisplayName ) {
          dispatch( addNewFormBuilder({ ...newFormBuilder, formDisplayName,  state: formBuilderState, status: formBuilderStatus  }) );
        }
      })
      .catch(error => { console.log( `There was problem saving the display name. ${JSON.stringify( error )}` ) });
  }
}

function handleSavingFormBuilder( outcome, linkId, formType ) {
  let formBuilder = formBuilders?.find( builder => builder?.formName === outcome?.outcomeName && 
      builder?.userId === currentUser?._id && 
        builder?.formType === formType );

  if ( formBuilder ) {
    dispatch( saveFormBuilder({ ...formBuilder, linkId, state: formBuilderState, status: formBuilderStatus  }) );
  }
  return formBuilder;
}

function handleModal(){
  dispatch( toggleNewFormBuilderModal() );
  toggleModal();
}

function handleModalClose(outcome){
  toggleModal();
  dispatch( toggleNewFormBuilderModal() );
}

function resetEditingOutcomeTitle( outcomeProps ){
  handleOutcomeEditActions( outcomeProps );
}

function editOutcomeTitle( selectedOutcome ){
  setOutcomeTitle( selectedOutcome?.title );
  dispatch(setSelectedOutcome( selectedOutcome ));
  setEditingOutcome( true );
}

function handleEditingOutcomeTitleOnSubmit( e, outcomeProps ) {
  e.preventDefault();
  handleOutcomeEditActions( outcomeProps );
}

function handleOutcomeEditActions( outcomeProps ){
  let copy = { ...outcomeProps, title: outcomeTitle };

  if ( !copy?.color ){
    copy = { ...outcomeProps, color: getItemColor(outcomes)  };
  }
  dispatch( saveOutcome(copy) );
  setOutcomeTitle('');
  setEditingOutcome( false );
  dispatch( loadOutcomes() );
}

function handleAddNewOutcomeOnSubmit(e) {
  e.preventDefault();
  let outcomeProps = { courseId, lessonId, userId: currentUser?._id, parentId: lessonId, outcomeType, outcomeName,  color: getItemColor( outcomes ) };

  dispatch( addNewOutcome( { ...outcomeProps, title } ) );
  setEditButton( false );
  dispatch( loadOutcomes() );
}

function handleDeleteOutcome( outcomeProps ) {
  dispatch( deleteOutcome( outcomeProps ) );
  dispatch( loadOutcomes() );
}

return { 
  cardItemProps: { 
    buildQuestions, buildFurtherQuestions, handleRecommendations, editOutcomeTitle, lesson, formType, formName,
    addNewOutcome, setEditButton, resetEditingOutcomeTitle, operatorBusinessName, isFormModalOpen, handleSettingConceptsModal,
    handleEditingOutcomeTitleOnSubmit, setOutcomeTitle, handleDeleteOutcome, editButton, handleModal, handleModalClose,
    setTitle, title, handleAddNewOutcomeOnSubmit, inputRef, editingOutcome, toggleQuestionModal, courseId, currentUser,
    goToFurtherQuestions, buildLessonInsights
  }
 }; 
}

export default useLessonOutComesHook;