import { 
useState, 
useEffect } from "react";

import {
useDispatch } from 'react-redux';

import {
getOnlineQuestion } from 'services/course/pages/OnlineQuestionsPage/helpers';

import { 
addPoints } from 'services/course/pages/FormBuilder/helpers';

import { 
addTime,
saveTime } from 'services/course/actions/countdowntimer';

import { 
loadFormFieldPoints } from 'services/course/actions/formquestionpoints';

function useFormFieldQuestionsHook( props ) {

    let {
      onlineQuestions, 
      courseId, 
      formType,
      formName,
      formUuId,
      onlineQuestionId, 
      saveOnlineQuestion, 
      studentsTotalPointsReceived,
      studentsTotalPointsReceivedFromPersistence,
      timer,
    } = props;
    
    const dispatch = useDispatch();
    const [ previewMode, togglePreviewMode ] = useState({ question: undefined, isPreviewMode: false });
    const [ currentQuestions, setCurrentQuestions ] = useState([]);
    const [ handleMaxDialog, setHandleMaxDialog ] = useState(undefined);
    const [ enableAddPointsToQuestionInputField, setEnableAddPointsToQuestionInputField ] = useState(false);
    const [ questionPoint, setQuestionPoints ] = useState(0);
    const [ selectedQuestion, setSelectedQuestion ] = useState(0);
    const [ editing, setEditing ] = useState(false);
 
    useEffect( () => {
      let currentCourseQuestions = getOnlineQuestion( onlineQuestions, courseId, onlineQuestionId );
  
      if ( currentCourseQuestions?.length > currentQuestions?.length ) {
        setCurrentQuestions( currentCourseQuestions?.filter( question => question?.formName === formName) );
      }
    }, [ getOnlineQuestion( onlineQuestions, courseId, onlineQuestionId )?.length > currentQuestions?.length ]  )

function getPoints(){
  return studentsTotalPointsReceived?.cummulativePoints ? studentsTotalPointsReceived['cummulativePoints'] : studentsTotalPointsReceivedFromPersistence?.cummulativePoints; 
}

function toggleQuestionPointField( question ){
  setEnableAddPointsToQuestionInputField( !enableAddPointsToQuestionInputField )
};

function toggleSetPreviewMode( question ) {
  setSelectedQuestion( question?._id );
  if ( previewMode?.isPreviewMode ) {
    togglePreviewMode( { question, isPreviewMode: false } );
    setQuestionPoints( 0 );
    setEditing( false );
  } else {
    togglePreviewMode( { question, isPreviewMode: true } );
    setEditing( true );
  }
};

function toggleFormFieldSelector( element ) {
  if ( handleMaxDialog?.isMaxDialogOpen ) {
    setHandleMaxDialog({ question: element, isMaxDialogOpen: false  });
  } else {
    setHandleMaxDialog({ question: element, isMaxDialogOpen: true  });
  }
};

return {
    handleMaxDialog,  
    previewMode,  
    currentQuestions,
    studentsTotalPointsReceived,
    enableAddPointsToQuestionInputField,
    questionPoint,
    selectedQuestion,
    studentsCummulativePointsReceived: getPoints(),
    editing,
    toggleFormFieldSelector,
    toggleSetPreviewMode,
    toggleQuestionPointField,
    addPoints: ( pointValue, element ) => addPoints( pointValue, element, saveOnlineQuestion, setQuestionPoints ) ,
}; };

export default useFormFieldQuestionsHook;