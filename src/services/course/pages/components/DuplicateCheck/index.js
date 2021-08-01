const DuplicateCheck = ({item, collection}) => {
  return ( collection?.includes( item ) && <div> 
              <video width={width} height={height} controls >
                <source src={path} type={type}/>
              </video>
     </div>
  );
}

export default DuplicateCheck;