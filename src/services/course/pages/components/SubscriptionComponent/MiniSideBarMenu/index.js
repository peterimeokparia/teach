import { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
handleAddPushNotificationSubscriptionToEntity,
handleEmailNotificationSubscriptionToEntity,
handleSavingEntityAction } from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import ToggleButton from 'services/course/pages/components/ToggleButton';

import formTypeSelector from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector';
import './style.css';
  
const MiniSideBarMenu = ({ 
  question, 
  formType,
  children }) => {

  const [ menuVisible, setMenuVisibility ] = useState(false);
  const handleMouseDown = ( event ) => {
      setMenuVisibility( !menuVisible );
      event.stopPropagation();
  };

  let props = {
    question,
    formType
  };
  
return (
    <span >
        { children( handleMouseDown,  menuVisible ) }
    </span>
    );
};

const mapState = ( state, ownProps ) => {
    return {
      currentUser: state.users.user,
      courses: Object.values( state?.courses?.courses ),
      hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted
    };
};

export default connect( mapState, { saveOnlineQuestions } )( MiniSideBarMenu );