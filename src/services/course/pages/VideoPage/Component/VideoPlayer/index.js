import React from 'react';

const VideoPlayer = ({ className, videoRef, handleCanPlay  }) => {

    return   (    
         <span> 
            <video controls autoPlay
                 className={className}
                 ref={videoRef}
                 onCanPlay={handleCanPlay}
            />
         </span> 
    )
}

export default VideoPlayer;
