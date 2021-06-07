import 
React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
saveOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import ToggleButton from 'Services/course/Pages/Components/ToggleButton';
import './style.css';

const MiniSideBarMenu = ({ 
question, 
currentUser, 
key,
saveOnlineQuestion,
handleAddPushNotificationSubscription,
handleEmailNotificationSubscription,
handleSaving,
pushNotificationsEnabled,
emailNotificationsEnabled,
entitySavedEnabled,
children }) => {
const [ menuVisible, setMenuVisibility ] = useState(false);
const handleMouseDown = ( event ) => {
    setMenuVisibility( !menuVisible );
    event.stopPropagation();
};

return (
    <span key={ key }
    >
        { children( key, handleMouseDown,  menuVisible ) }
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
                      isChecked={ pushNotificationsEnabled }
                      value={ 'isRecurring' }
                      onChange={ handleAddPushNotificationSubscription }
                      placeHolder="push" 
                  />
                  <span key={question?._id} className={ "toggleButton" }>
                  <label> Receive email notifications. </label>
                  <ToggleButton
                      className={ "navlinkItem" }
                      isChecked={ emailNotificationsEnabled }
                      value={ 'isRecurring' }
                      onChange={ handleEmailNotificationSubscription } 
                      placeHolder="email" 
                  />
                  </span>
                  <span key={question?._id} className={ "toggleButton" }>
                  <label> Save question. </label>
                  <ToggleButton
                      isChecked={ entitySavedEnabled }
                      value={ 'isRecurring' }
                      onChange={ handleSaving } 
                      placeHolder="save" 
                  />
                  </span>
                {/* Don't delete questions when there are answers and comments. */}
              </span>
            } 
        </div>
    </span>
    );
};

export default connect( null, { saveOnlineQuestion } )( MiniSideBarMenu );