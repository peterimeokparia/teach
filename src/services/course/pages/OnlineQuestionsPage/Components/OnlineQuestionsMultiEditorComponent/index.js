import 
React, { 
useState, 
useEffect } from 'react';

import { 
connect,
useDispatch } from 'react-redux';

import { 
loginUser } from 'Services/course/Actions/Users';

import {
loadSubscribedPushNotificationUserByUserId,  
sendPushNotificationMessage,  
retryPushNotificationMessage,
loadSubscribedPushNotificationUsers, 
subscribePushNotificationUser,
savePushNotificationUser } from 'Services/course/Actions/Notifications';

import {
loadFailedPushNotifications } from 'Services/course/Actions/FailedPushNotifications';

import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import {
saveMarkDownContent } from 'Services/course/helpers/EditorHelpers'; 

import {
elementMeta,
onlineMarkDownEditorFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId,
//getFailedPushNotificationQueue 
} from 'Services/course/Selectors';

import { 
uploadFiles } from 'Services/course/helpers/ServerHelper';

import {
askHomeWorkQuestionPlaceHolder, 
homeWorkAnswerPlaceHolder } from 'Services/course/helpers/EditorHelpers';

import {
handlePushNotificationSubscription } from 'Services/course/helpers/PageHelpers';

import OnlineListItems from '../OnlineListItems';
import HelpIcon from '@material-ui/icons/Help';
import { helpIconStyle } from './inlineStyles';
import './style.css';

// import {} from 'Services/../../src/worker.js'
// Read  https://levelup.gitconnected.com/react-redux-hooks-useselector-and-usedispatch-f7d8c7f75cdd
// https://autopush.readthedocs.io/en/latest/http.html

const OnlineQuestionsMultiEditorComponent = ( {
operatorBusinessName,
loadSubscribedPushNotificationUserByUserId,
sendPushNotificationMessage,
retryPushNotificationMessage,
//loadFailedPushNotifications,
loginUser,
operator,
currentUser,
onlineQuestionId,   
courseId,
inputFieldOptions,
onlineQuestion,
onlineQuestions,
latestQuestion,
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion,
failedOnlineQuestionNotifications,
pushNotificationUsers,
loadSubscribedPushNotificationUsers,
subscribePushNotificationUser,
savePushNotificationUser } ) => {
let currentCourseQuestionCollection = onlineQuestions?.filter( question => question?.courseId === courseId );
let currentCourseQuestions = ( onlineQuestionId === undefined || !onlineQuestionId ) 
        ? currentCourseQuestionCollection
        : currentCourseQuestionCollection?.filter(question => question?._id === onlineQuestionId);
           
let upload_url = "http://localhost:9005/api/v1/fileUploads";
let [ question, setQuestion ] = useState(undefined);
let [ markDownContent, setMarkDownContent ] = useState(undefined);
const [ previewMode, setPreviewMode ] = useState(false);
const [ videoUploaded, setVideoUploaded ] = useState( false );
const dispatch = useDispatch();

useEffect(() => {
  dispatch( loadFailedPushNotifications() );
  setQuestion('');  // change
  setMarkDownContent(); // change
   let failedOnlineQuestionPushNotifications = failedOnlineQuestionNotifications.filter( push => push.userId === currentUser?._id );

    //handlePushNotificationSubscription( pushNotificationUsers, currentUser, subscribePushNotificationUser, savePushNotificationUser );
    
    // if ( currentSubscription?.subscriptions?.length === 0  && failedOnlineQuestionPushNotifications?.length === 0) {
    //   handlePushNotificationSubscription( pushNotificationUsers, currentUser, subscribePushNotificationUser, savePushNotificationUser );
    // }
    // if ( failedOnlineQuestionPushNotifications?.length === 0 ) {
    //   navigate(`/${operatorBusinessName}/login`);
    // }
    if ( failedOnlineQuestionPushNotifications?.length > 0 ) { 
      let currentSubscription = pushNotificationUsers?.filter( user => user?.userId === currentUser?._id );
      let callToHandlePushNotificationSubscription = 0;

      failedOnlineQuestionPushNotifications.forEach( failedNotification => {
          let failedPushErrorStatusCode = [ 400, 404, 502 ];

          if ( failedPushErrorStatusCode.includes( failedNotification?.errorStatusCode ) ) {
            if ( callToHandlePushNotificationSubscription < 1 ) {
              callToHandlePushNotificationSubscription += 1;
              handlePushNotificationSubscription( pushNotificationUsers, currentUser, subscribePushNotificationUser, savePushNotificationUser );
              loadSubscribedPushNotificationUserByUserId( currentUser?._id );
            }
          } 
          
          let subscriptionObject = JSON.parse( failedNotification?.failedNotificationObject );
          let subpayload = JSON.parse(subscriptionObject?.payload);

          retryPushNotificationMessage( 
            currentSubscription, { 
            title: subpayload?.title, 
            body: subpayload?.body,
          }, failedNotification );
        });
    };
  }, [ dispatch, failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, retryPushNotificationMessage, subscribePushNotificationUser, savePushNotificationUser, loadSubscribedPushNotificationUserByUserId]);
// }, [ loadFailedPushNotifications ]);

let config = { 
  courseId: '000111', 
  onlineQuestionId,
  userId: currentUser?._id, 
  questionCreatedBy: ( currentUser?._id ) ? ( currentUser?.firstname ) : 'anonymous', 
  operator: operator?._id,
  inputFieldOptions, 
  placeHolder: askHomeWorkQuestionPlaceHolder, 
  homeWorkAnswerPlaceHolder,
  videoUrl: null
};

const addNewQuestion = () => {
  addNewOnlineQuestion( onlineMarkDownEditorFieldCollection(config) );  
}; 

const deleteQuestion = ( selectedQuestion ) => {
  deleteOnlineQuestion( selectedQuestion );
  loadOnlineQuestions();
};

// let questionHandleChangeTimerHandle = null, timeOutDuration = 5000;
// const handleChange = ( editor, question ) => {
//   saveMarkDownContent( 
//     questionHandleChangeTimerHandle, 
//     saveOnlineQuestion,
//     question,
//     JSON.stringify( editor.emitSerializedOutput() ),
//     `${question?._id}`,
//     timeOutDuration
//   );     
// }

let questionHandleChangeTimerHandle = null, timeOutDuration = 5000;

const handleChange = ( editor, question ) => {
  saveMarkDownContent( 
    questionHandleChangeTimerHandle, 
    saveOnlineQuestion,
    question,
    JSON.stringify( editor.emitSerializedOutput() ),
    `${question?._id}`,
    timeOutDuration
  );     
};

const togglePreviewMode = () => {
  setPreviewMode( ! previewMode );
  loadOnlineQuestions();
};

function savedQuestionsExist( currentCourseQuestions ) {
 return currentCourseQuestions?.length > 0; 
};

const saveQuestion = ( selectedQuestion ) => {
  saveOnlineQuestion({...selectedQuestion, markDownContent });
};

const saveRecording = () => {
  loadOnlineQuestions();
  setVideoUploaded( false );
  if ( savedQuestionsExist( question ) ) {
      saveOnlineQuestion( question );
  };  
};

async function uploadImageUrl(file, imageBlock, question) {
  await fetch( imageBlock?.img?.currentSrc )
        .then( result => result.blob())
        // .then( response => { uploadFiles([ response ], currentCourseQuestions, upload_url, "questions", file?.name,  null )
        .then( response => { uploadFiles([ response ], question, upload_url, "questions", file?.name,  null )
        .then( resp => { console.log( resp ); } ); })
        .catch( error => { console.log( error ); });

  let inputFieldObject = JSON.parse( question )[ elementMeta.markDownContent ];
  
  Object.values(inputFieldObject).forEach( block => {
    if ( Object.keys( block ).length > 0 ) {
       block.find( obj => obj?.type === "image" && obj?.data?.url === imageBlock?.img?.currentSrc ).data.url = `http://localhost:3000/files/${ file?.name }`;
    } });

  question[ elementMeta.markDownContent ] = JSON.stringify( inputFieldObject );  
  saveOnlineQuestion( { ...question } );
}

function setRecordingCompletionStatus( videoUploaded, id ){
  if ( videoUploaded ) {
     setVideoUploaded( videoUploaded );
  }
}

const handleSubmit = () => {
  if ( videoUploaded ) {     
      loadOnlineQuestions(); 
  } else {
  if ( savedQuestionsExist( currentCourseQuestions ) ) {
      saveOnlineQuestion( { ...currentCourseQuestions } ); // change
  } 
  }   
};

let form = currentCourseQuestions?.length > 0 ? currentCourseQuestions : undefined;
let listItemConfig = { 
  form, 
  previewMode, 
  handleChange,
  upload_url, 
  uploadImageUrl,
  currentCourseQuestions, 
  setRecordingCompletionStatus, 
  videoUploaded, 
  saveRecording,
  courseId,
  operator,
  onlineQuestionId,
  currentUser, 
  togglePreviewMode,
  saveQuestion,
  deleteQuestion,
  handleSubmit };

  return(
    <div className="builder"> 
        <header>
        </header>
          <div className="content">  
                {
                   <div className="sidebar">
                     <div className="input-field-builder-selector">  
                     </div>
                  </div>
                }
                <div> 
                {
                  <div className="onlinequestion-list-items"> 
                     <OnlineListItems 
                        config={ listItemConfig } 
                        courseId={ courseId }
                        currentUser={ currentUser }
                    />
                  </div>
                 
                }
                <div> <br></br> </div>
                {
                  <span>
                    <HelpIcon 
                      style={helpIconStyle()}
                      className="comment-round-button-4"
                      onClick={() => addNewQuestion()}
                    />
                  </span>
                }
                <div>
                    { (!previewMode) && <button  className={'form-builder-btn'} onClick={handleSubmit} > { savedQuestionsExist( onlineQuestions ) ? "Save Edits" : "Save" }</button>}
              </div>
          </div>
        </div>
      </div> 
  );
};

const mapDispatch = { 
  loginUser,
  addNewOnlineQuestion, 
  saveOnlineQuestion, 
  loadOnlineQuestions, 
  deleteOnlineQuestion, 
  loadFailedPushNotifications,
  sendPushNotificationMessage, 
  retryPushNotificationMessage, 
  subscribePushNotificationUser, 
  savePushNotificationUser, 
  loadSubscribedPushNotificationUsers, 
  loadSubscribedPushNotificationUserByUserId 
};

const mapState = ( state, ownProps ) => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    currentUser: state.users.user,
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications )
    // failedOnlineQuestionNotifications: getFailedPushNotificationQueue(state, ownProps)
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsMultiEditorComponent);