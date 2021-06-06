import React from 'react';

import { 
connect } from 'react-redux';

import {
recordingStatusRecordingStarted,
recordingStatusRecordingStopped,
recordingDialogOpen,
recordingDialogClosed } from 'Services/course/Actions/Video';

import VideoComponent from 'Services/course/Pages/QuestionsPage/Components/VideoComponent';
// import SaveIcon from '@material-ui/icons/Save';
import './style.css';

const OnlineQuestionVideoComponent = ({
element,
config,
} ) => { 
return (
      <span className=""> 
        <span>
          {
            <div className={ config?.videoClassName }>
               <video
                 className={ config?.videoClassName }
                 src={element?.videoUrl}
                 autoPlay={false}
                 controls
               >
               </video>
            </div>
          }   
          <span> 
          <span>
            <VideoComponent
                element={element}
                config={config}
                key={ element?._id }
                id={ element?._id }
                name={element?._id}
                recordButtonText={ config?.recordButtonText }
                objectId={ element?._id }
                videoMetaData={{inputFieldId: element?._id, currentQuestion: element} }
                videoMetaDataExternalId={'name'}
                videoNamePrefix={ config?.videoNamePrefix }
                videoName={`${element?._id}_${element?._id}_${element?._id}_${element?.type}`}
                setRecordingCompletionStatus={status => config.setRecordingCompletionStatus( status, element?._id )}
                handleSubmit={config.handleSubmit}
            />
          </span>
          { 
            // <span
            //   key={element?._id}
            //   id={ element?._id }
            //   name={element?._id}
            // >
            //   <SaveIcon
            //     style={config.saveIconStyle( )} 
            //     onClick={ config.saveRecording }
            //   />
            // </span>
          }
          </span>
        </span>        
    </span>  
  );
};

const mapState = ( state, ownProps ) => {
  return {
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
    isRecordingDialogOpen: state.hasRecordingStarted.recordingDialogOpen
  };
};

export default connect( mapState, { recordingStatusRecordingStarted, recordingStatusRecordingStopped, recordingDialogClosed, recordingDialogOpen } )( OnlineQuestionVideoComponent );
