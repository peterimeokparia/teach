import './style.css';

const ReactIframe = ({  
    className, 
    name, 
    source, 
    width, 
    height, 
    scrolling, 
    frameBorder }) => {
    return (
        <div className={"iframe"}>
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
        </div>
       
    );
};

export default ReactIframe;