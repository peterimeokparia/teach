import React from 'react';

const FileBrowser = ({width, height, path, type, classname}) => {
  return (
     <div>
              
              <video width={width} height={height} controls >
                <source src={path} type={type}/>
                  {/* <source src="/videos/3222d2315b4e8b8589291f457e7507df" type="video/webm"/> */}
                                </video>
     </div>
  );
}


export default FileBrowser;