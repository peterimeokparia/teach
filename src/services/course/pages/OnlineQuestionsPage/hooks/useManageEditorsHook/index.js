import { 
useState, 
useEffect } from 'react';

import { 
useDispatch } from 'react-redux';
    
import { 
addNewOnlineAnswer,
loadOnlineAnswers,
deleteOnlineAnswer } from 'services/course/actions/onlineanswers';

import { 
navigate } from '@reach/router';

import {
elementMeta,  
editorContentType } from 'services/course/pages/QuestionsPage/helpers';

import {
manageEditorsFieldCollection } from 'services/course/pages/QuestionsPage/helpers';

import {
pageNavigationHelper } from 'services/course/pages/OnlineQuestionsPage/components/ManageEditors/helpers';

function useManageEditorsHook( answers, question, currentUser, operatorBusinessName, courseId ){
  
    const dispatch = useDispatch();

    const [ contentChanged, setContentChanged ] = useState( undefined );

    useEffect(() => { 
        if ( contentChanged ) {
            dispatch(loadOnlineAnswers());
            setContentChanged( false );
        }
    }, [ answers?.length, loadOnlineAnswers, contentChanged, setContentChanged ] );   

const addNewEditor = () => {
  let config = {
    question,
    type: "",  
    userId: currentUser?._id,
    files: [],
    answerBy: currentUser?.firstname,
    videoUrl: "",
    questionNumber: question?._id, 
    courseId, 
    onlineQuestionId:  question?._id,
    editorContentType: editorContentType.Explanation, 
    fieldName: elementMeta.explanationAnswerCollection, 
    placeHolder: null,
    currentQuestion: question
  };

  dispatch(addNewOnlineAnswer( manageEditorsFieldCollection( config ) ));
  setContentChanged( true );
};

const onhandleSelected = ( selected ) => {
  dispatch(deleteOnlineAnswer( selected ));
  setContentChanged( true );
};
 
const goToBlackBoard = ( answer ) => {
  navigate(pageNavigationHelper.homeWorkAskQuestionBoard( operatorBusinessName, courseId, answer));
};

const saveRecording = ( selectedElement ) => {
  //dispatch(saveOnlineAnswer( selectedElement ));
};

return {
  addNewEditor:() => addNewEditor(),
  onhandleSelected:(val) => onhandleSelected( val ),
  saveRecording:(val) => saveRecording( val ),
  goToBlackBoard:(val) => goToBlackBoard( val )
 };
};

export default useManageEditorsHook;