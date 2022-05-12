import { useReactMediaRecorder } from "react-media-recorder";

import { 
saveAs } from 'file-saver';

const RecordView = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false, audio: true, screen: true });

 
    const mediaUrl = ( blob ) => {
        if ( blob ) {
            alert(JSON.stringify(blob))
            saveAs(blob, "recording.webm")
        }
        return blob;
    }

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaUrl(mediaBlobUrl)} controls autoPlay loop />
    </div>
  );
};

export default RecordView;