import 
React, {
useState } from 'react';

import VideoComponent from 'Services/course/Pages/QuestionsPage/Components/VideoComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import './style.css';

const OnlineQuestionVideoComponent = ({
element,
config } ) => { 

let [ selectedQuestion, setSelectedQuestion ] = useState(undefined);

const handleSelectedQuestion = ( selected ) => {
    setSelectedQuestion( selected );
}

return (
      <div className=""> 
        <div 
          onClick={() => handleSelectedQuestion(  element )} 
        >
          <div className={ config?.videoClassName }>
            <video
              className={ config?.videoClassName }
              src={element?.videoUrl}
              autoPlay={false}
              controls
            >
            </video>
          </div>
          <div> 
          <span>
            <VideoComponent
                key={ element?._id }
                id={ element?._id }
                name={element?._id}
                displayMaterialButton={true}
                videoSectionClassName={ config?.videoSectionClassName }
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
          <span>
          { ( element?.videoUrl !== "" || element?.videoUrl !== undefined) &&     
            <span 
                key={element?._id}
                id={ element?._id }
                name={element?._id}
            >
              <DeleteIcon 
                style={config.deleteIconStyle(  config?.hasRecordingStarted, element?._id, selectedQuestion?._id  )}
                className="comment-round-button-3"
                onClick={() => config.deleteVideo( { ...element, videoUrl: "" } )}
              />
            </span>
          }
          </span>
          { config.videoUploaded  && 
            <span
              key={element?._id}
              id={ element?._id }
              name={element?._id}
            >
              <SaveIcon
                style={config.saveIconStyle( element?._id, selectedQuestion?._id )} 
                onClick={ config.saveRecording }
              />
            </span>
          }
          </div>
        </div>
         
    </div>  
  );
}

export default OnlineQuestionVideoComponent;