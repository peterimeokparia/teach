import ReactIframe from 'teach/src/services/course/pages/components/ReactIframe';

const MeetingIframe = ({ 
className, 
name, 
source, 
width, 
height,
scrolling, 
frameBorder, 
recorderLink}) => {
return(
     <div>
          <ReactIframe
               className={className}
               name={name}
               source={source}
               width={width}
               height={height}
               allow="camera;microphone"
               scrolling={scrolling}
               frameBorder={frameBorder}
          />  
     </div>
);}

export default MeetingIframe;