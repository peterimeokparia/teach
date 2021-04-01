import React from 'react';

const ReactIframe = ({  className, name, source, width, height, allow, scrolling, frameBorder }) => {
    return (
        <iframe
            title={name}
            name={name} 
            src={source}
            width={width}
            height={height}
            allow="camera;microphone"
            scrolling={scrolling}
            frameBorder={frameBorder}
            className={className}
        >
        </iframe>
    );
}

export default ReactIframe;