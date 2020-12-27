import React from 'react';

import ReactIframe from '../Components/ReactIframe';



const MeetingIframeComponent = ({ className, name, source, width, height, allow, scrolling, frameBorder, recorderLink}) => {

  return(
          <div>
               {/* { recorderLink() } */}
               <ReactIframe

                        className={className}
                        name={name }
                        source={source}
                        width={width}
                        height={height}
                        allow="camera;microphone"
                        scrolling={scrolling}
                        frameBorder={frameBorder}
                />  
 
          </div>
     );
}

export default MeetingIframeComponent;