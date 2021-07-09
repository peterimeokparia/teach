import { 
connect } from 'react-redux';

import { 
Rnd } from 'react-rnd';

import { 
meetingConfigSettings } from  'Services/course/Pages/Lessons/LessonPlan/helpers';


import Meeting from 'Services/course/Pages/Meeting';
    
const DraggableMeetingComponent = ({ 
    courseTitle, 
    lessonTitle, 
    fullMeetingStage, 
    hideMeetingStage, 
    session,
    currentUser } ) => {
    
    let settings = meetingConfigSettings( courseTitle, lessonTitle );
    const meetingSettings = settings;
    const meetingStyleContainer = ( fullMeetingStage ) ? 'meeting-full' :  ( hideMeetingStage ) ? 'meeting-hide' : `meeting`; 

    return (
    <div className={ meetingStyleContainer }>   
      <Rnd>                 
        <div>
        { ( session  )? <Meeting
                userName={currentUser?.firstname}   
                roomName={meetingSettings.roomName}
                containerWidth={( fullMeetingStage ) 
                  ? meetingSettings.fullScreen.meetingContainerStyle.containerWidth 
                  : meetingSettings.popOutScreen.meetingContainerStyle.containerWidth}
                containerHeight={( fullMeetingStage ) 
                  ? meetingSettings.fullScreen.meetingContainerStyle.containerHeight 
                  : meetingSettings.popOutScreen.meetingContainerStyle.containerHeight}   
              />
            : <div> </div>          
        }
        </div>
      </Rnd> 
    </div>
)};

const mapState = ( state, ownProps )   => {
  return {
    currentUser: state.users.user
  };
};
export default connect(mapState, null)(DraggableMeetingComponent);

 