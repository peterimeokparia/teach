import React, { useState, useEffect } from 'react';


const ReactIframe = ({  className, name, source, width, height, allow, scrolling, frameBorder}) => {

    return (
        <iframe
            name={name} 
            src={source}
            width={width}
            height={height}
            allow={allow}
            scrolling={scrolling}
            frameBorder={frameBorder}
            className={className}
            allowFullScreen
        >
       </iframe>
    );

}



export default ReactIframe;