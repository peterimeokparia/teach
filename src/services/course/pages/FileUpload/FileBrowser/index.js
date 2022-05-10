const FileBrowser = ({width, height, path, type, classname}) => {
  return (
     <div> 
        <video width={width} height={height} controls >
          <source src={path} type={type}/> 
        </video>
     </div>
  );
}

export default FileBrowser;