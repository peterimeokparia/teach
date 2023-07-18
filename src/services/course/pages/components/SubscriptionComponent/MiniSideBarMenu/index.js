import { useState } from 'react';
import { connect } from 'react-redux';
import { saveOnlineQuestions } from 'services/course/actions/onlinequestions';
import './style.css';
  
const MiniSideBarMenu = ({ 
  children }) => {
  const [ menuVisible, setMenuVisibility ] = useState(false);
  const handleMouseDown = ( event ) => {
      setMenuVisibility( !menuVisible );
      event.stopPropagation();
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