import { 
useState, 
useEffect } from "react";

import { 
useDispatch } from 'react-redux';
  
import { 
toggleContentChanged,
loadOnlineQuestions } from 'services/course/actions/onlinequestions';

import { 
addPoints } from 'services/course/pages/FormBuilder/helpers';

function useFormFieldQuestionsHook( props ) {

  let {
    saveOnlineQuestion, 
    studentsTotalPointsReceived,
    studentsTotalPointsReceivedFromPersistence,
  } = props;

  const dispatch = useDispatch();
  const [ previewMode, togglePreviewMode ] = useState({ question: undefined, isPreviewMode: false });
  const [ enableAddPointsToQuestionInputField, setEnableAddPointsToQuestionInputField ] = useState(false);
  const [ questionPoint, setQuestionPoints ] = useState(0);
  const [ selectedQuestion, setSelectedQuestion ] = useState(0);
  const [ editing, setEditing ] = useState(false);
    
function getPoints(){
  return studentsTotalPointsReceived?.cummulativePoints ? studentsTotalPointsReceived['cummulativePoints'] : studentsTotalPointsReceivedFromPersistence?.cummulativePoints; 
}

function toggleQuestionPointField( question ){
  setEnableAddPointsToQuestionInputField( !enableAddPointsToQuestionInputField )
};

function toggleSetPreviewMode( question ) {
  setSelectedQuestion( question?._id );
  dispatch( toggleContentChanged() );
  
  if ( previewMode?.isPreviewMode ) {
    togglePreviewMode( { question, isPreviewMode: false } );
    setQuestionPoints( 0 );
    setEditing( false );
    dispatch( loadOnlineQuestions() );
  } else {
    togglePreviewMode( { question, isPreviewMode: true } );
    setEditing( true );
    dispatch( loadOnlineQuestions() );
  }
};

return {
    previewMode,  
    studentsTotalPointsReceived,
    enableAddPointsToQuestionInputField,
    questionPoint,
    selectedQuestion,
    studentsCummulativePointsReceived: getPoints(),
    editing,
    setSelectedQuestion,
    toggleSetPreviewMode,
    toggleQuestionPointField,
    addPoints: ( pointValue, element ) => addPoints( pointValue, element, saveOnlineQuestion, setQuestionPoints ) ,
}; };

export default useFormFieldQuestionsHook;