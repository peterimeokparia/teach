import React from "react";
import LessonPlanIframeComponent  from 'services/course/pages/components/LessonPlanIframeComponent';

const mediaEnum = { IMAGE: 'IMAGE', VIDEO: 'VIDEO', IMAGE2: 'image', VIDEO2: 'video'};
const Image = props => {
    if (!!props.src) {
     return <img src={ props.src } alt=''/>;
    }
    return null;
};

const Video = props => {
    const fullScreenSize = "1150px";

    if ( props.src ) {
        if ( props.src.includes('webm')) {
            return < LessonPlanIframeComponent 
                        name="embed_readwrite" 
                        source={props.src}
                        width={fullScreenSize}
                        height="1900px"
                        allow="camera;microphone"
                        scrolling="yes"
                        frameBorder="0"
                        allowFullScreen
                    />;
        } 

        if ( props.src.includes('youtu')) {
            return <iframe  
                width="560" 
                height="315" 
                src={props.src}
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            >
            </iframe>
        }
     return  <video controls src={ props.src } />;
    }
    return null;
};

const Media = props => {
    if ( !props ) return;

    if ( ! props?.contentState?.getEntity(props.block.getEntityAt(0)) ) return;

    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();
    
    let media; 
        
    if ( type === mediaEnum.IMAGE || type === mediaEnum.IMAGE2 ) {
     media = <Image src={ src } alt=''/>;
    }

    if ( type === mediaEnum.VIDEO || type === mediaEnum.VIDEO2 ) {
     media = <Video src={ src } />;
    }

    return  media;
};

export const mediaBlockRenderer = block => {
    if ( !block ) return;
    if ( !Media ) return;
    if ( block?.getType() === "atomic" ) {
        return {
            component: Media,
            editable: false
        };
    }
    return null;
};