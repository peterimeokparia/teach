const VideoPlayer = ({ className, videoRef, handleCanPlay  }) => {

    return   (    
         <span> 
            <video controls autoPlay
                 className={className}
                 ref={videoRef}
                 onCanPlay={handleCanPlay}
                 width={"300px"}
                 height={"300px"}
            />
         </span> 
    )
}

export default VideoPlayer;
