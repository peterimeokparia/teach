import 
React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
saveOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import MiniSideBarButton from '../MiniSideBarButton';
import ToggleButton from 'Services/course/Pages/Components/ToggleButton';
import './style.css';

const MiniSideBarMenu = ({ 
question, 
currentUser, 
key,
saveOnlineQuestion }) => {

const [ menuVisible, setMenuVisibility ] = useState(false);

const handleAddPushNotificationSubscriptionToQuestion  = ( event ) => {
  if ( !question?.questionPushNotificationSubscribers?.includes( currentUser?._id ) ) {
    let questionPushNotificationSubscribers = [ ...question?.questionPushNotificationSubscribers, currentUser?._id ]
    saveOnlineQuestion( { ...question, questionPushNotificationSubscribers } );
  } else {
    let questionPushNotificationSubscribers = question?.questionPushNotificationSubscribers.filter( id => currentUser?._id !== id ) 
    saveOnlineQuestion( { ...question, questionPushNotificationSubscribers } );
  }
};

const handleEmailNotificationSubscriptionToQuestion  = ( event ) => {
  if ( !question?.questionEmailNotificationSubscribers?.includes( currentUser?._id ) ) {
    let questionEmailNotificationSubscribers = [ ...question?.questionEmailNotificationSubscribers, currentUser?._id ]
    saveOnlineQuestion( { ...question, questionEmailNotificationSubscribers } );
  } else {
    let questionEmailNotificationSubscribers = question?.questionEmailNotificationSubscribers.filter( id => currentUser?._id !== id ) 
    saveOnlineQuestion( { ...question, questionEmailNotificationSubscribers } );
  }
}

const handleSavingQuestions  = ( event ) => {
  if ( !question?.savedQuestions?.includes( currentUser?._id ) ) {
    let savedQuestions = [ ...question?.savedQuestions, currentUser?._id ]
    saveOnlineQuestion( { ...question, savedQuestions } );
  } else {
    let savedQuestions = question?.savedQuestions.filter( id => currentUser?._id !== id ) 
    saveOnlineQuestion( { ...question, savedQuestions } );
  }
}

const handleMouseDown = ( event ) => {
    setMenuVisibility( !menuVisible );
    event.stopPropagation();
}

return (
    <div key={ key }
    >
        <MiniSideBarButton
            key={ key }
            mouseDown={ handleMouseDown }
            navMenuVisible={ menuVisible } 
        />
        <div
            key={ key }
            id="sideFlyoutMenu"
            className={ menuVisible ? "show" : "hide" }
        >
            {
                  <span key={ question?._id } className={ "navlinkItem" }>
                  <label> Receive push notifications. </label>
                  <ToggleButton
                      className={ "toggleButton" }
                      isChecked={ question?.questionPushNotificationSubscribers?.includes( currentUser?._id ) || question?.userId === currentUser?._id }
                      value={ 'isRecurring' }
                      onChange={ handleAddPushNotificationSubscriptionToQuestion }
                      placeHolder="push" 
                  />
                  <span key={question?._id} className={ "toggleButton" }>
                  <label> Receive email notifications. </label>
                  <ToggleButton
                      className={ "navlinkItem" }
                      isChecked={ question?.questionEmailNotificationSubscribers?.includes( currentUser?._id )  } 
                      value={ 'isRecurring' }
                      onChange={ handleEmailNotificationSubscriptionToQuestion } 
                      placeHolder="email" 
                  />
                  </span>
                  <span key={question?._id} className={ "toggleButton" }>
                  <label> Save question. </label>
                  <ToggleButton
                      isChecked={ question?.savedQuestion?.includes( currentUser?._id ) } 
                      value={ 'isRecurring' }
                      onChange={ handleSavingQuestions } 
                      placeHolder="save" 
                  />
                  </span>
                {/* Don't delete questions when there are answers and comments. */}
              </span>
            } 
        </div>
    </div>
    )
}

export default connect( null, { saveOnlineQuestion } )( MiniSideBarMenu );