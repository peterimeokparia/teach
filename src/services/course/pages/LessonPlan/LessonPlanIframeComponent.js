import React from 'react'

import ReactIframe from '../Components/ReactIframe';



const LessonPlanIframeComponent = ({
className,
id, 
name, 
source, 
width, 
height, 
allow, 
scrolling, 
frameBorder }) => {

  return(
        
          ( source ) ? <div id={id}>
                    <ReactIframe
                         className={className}
                         name={name}
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