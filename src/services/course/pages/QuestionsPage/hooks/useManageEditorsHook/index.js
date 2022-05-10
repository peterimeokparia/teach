import { 
useState, 
useEffect } from 'react';

import { 
useDispatch } from 'react-redux';
    
import { 
addNewOnlineAnswer,
saveOnlineAnswer,
loadOnlineAnswers,
deleteOnlineAnswer } from 'Services/course/Actions/OnlineAnswers';

import { 
navigate } from '@reach/router';

import {
elementMeta,  
editorContentType } from 'Services/course/Pages/QuestionsPage/helpers';

import {
manageEditorsFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import {
pageNavigationHelper } from 'services/course/pages/QuestionsPage/components/ManageEditors/helpers';

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