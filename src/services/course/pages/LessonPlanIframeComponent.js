import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactIframe from './ReactIframe';



const LessonPlanIframeComponent = ({ className, name, source, width, height, allow, scrolling, frameBorder}) => {

  return(
        
          ( source ) ? <div>
                    <ReactIframe
                         className={className}
                         name={name }
                         source={source}
                         width={width}
                         height={height}
                         allow={allow}
                         scrolling={scrolling}
                         frameBorder={frameBorder}
                    />  
 
                  </div>

                 : <div></div>
        
     );
}

export default LessonPlanIframeComponent;