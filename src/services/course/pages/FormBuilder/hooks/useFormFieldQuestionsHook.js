import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadFormFields } from 'services/course/actions/formfields';
import { loadFormFieldPointsByUserId, addNewFormFieldPoint } from 'services/course/actions/formquestionpoints';
import { addPoints } from 'services/course/pages/FormBuilder/helpers';
import { addNewFormField } from 'services/course/actions/formfields';
import { manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
import { addFormFieldConfig } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/helpers';
import { toggleContentChanged,setSelectedOnlineQuestion, loadOnlineQuestions } from 'services/course/actions/onlinequestions';

function useFormFieldQuestionsHook( props ) {
  let { saveOnlineQuestion, currentUser, formId, formName, formUuId, studentsTotalPointsReceived, studentsTotalPointsReceivedFromPersistence } = props;

  const [ previewMode, togglePreviewMode ] = useState({ question: undefined, isPreviewMode: false });
  const [ enableAddPointsToQuestionInputField, setEnableAddPointsToQuestionInputField ] = useState(false);
  const [ questionPoint, setQuestionPoints ] = useState(0);
  const [ hydratePointsFromPersitence, setHydratePointsFromPersitence ] = useState( studentsTotalPointsReceivedFromPersistence?.cummulativePoints );
  const [ editing, setEditing ] = useState(false);
  const [ missedQuestions, setMissedQuestions ] = useState(undefined);
  const dispatch = useDispatch();

  let noStudentsPoints = studentsTotalPointsReceived?.cummulativePoints === 0;

  useEffect(() => {
    if ( !studentsTotalPointsReceivedFromPersistence?.cummulativePoints ) {
      let cummulativePoints = studentsTotalPointsReceived?.cummulativePoints ? studentsTotalPointsReceived?.cummulativePoints : 0;

      dispatch( addNewFormFieldPoint({ userId: currentUser?._id, cummulativePoints, formUuId, formName }) );
    }

    dispatch( loadFormFieldPointsByUserId( currentUser?._id ) );

    if (  studentsTotalPointsReceivedFromPersistence?.cummulativePoints !== undefined  ) {
      setHydratePointsFromPersitence( studentsTotalPointsReceivedFromPersistence?.cummulativePoints );
    }
  }, [] );

  useEffect(() => {
    if ( studentsTotalPointsReceived?.cummulativePoints !== undefined ) {
        if ( studentsTotalPointsReceived?.cummulativePoints === 0 ) {
          setHydratePointsFromPersitence( studentsTotalPointsReceived?.cummulativePoints );
        }
     }
  }, [ noStudentsPoints, studentsTotalPointsReceived?.cummulativePoints ] );
 
function getPoints(){
  return studentsTotalPointsReceived?.cummulativePoints ? studentsTotalPointsReceived['cummulativePoints'] : hydratePointsFromPersitence;
}

function toggleQuestionPointField( question ){
  setEnableAddPointsToQuestionInputField( !enableAddPointsToQuestionInputField );
};

function toggleSetPreviewMode( question ) {
  dispatch( setSelectedOnlineQuestion( question ) );
  dispatch( toggleContentChanged() );
  
  if ( previewMode?.isPreviewMode ) {
    togglePreviewMode( { question, isPreviewMode: false } );
    setQuestionPoints( 0 );
    setEditing( false );
    dispatch( loadOnlineQuestions() );
    dispatch( loadFormFields() );
  } else {
    togglePreviewMode( { question, isPreviewMode: true } );
    setEditing( true );
    dispatch( loadOnlineQuestions() );
    dispatch( loadFormFields() );
  }
};

function handleMissedQuestions( missedquestions ) {
  setMissedQuestions( missedquestions );
}

function addNewFormInputField( typeOfInput, uuid ){
  let props = { typeOfInput, question: previewMode?.question, uuid, currentUser, formId };
  
  dispatch( addNewFormField( manageFormFieldCollection( addFormFieldConfig( props ))) );
}

return {
  previewMode,  
  studentsTotalPointsReceived,
  enableAddPointsToQuestionInputField,
  questionPoint,
  studentsCummulativePointsReceived: getPoints(),
  editing,
  missedQuestions,
  addNewFormInputField,
  handleMissedQuestions,
  toggleSetPreviewMode,
  toggleQuestionPointField,
  addPoints: ( pointValue, element ) => addPoints( pointValue, element, saveOnlineQuestion, setQuestionPoints ) ,
}; };

export default useFormFieldQuestionsHook;