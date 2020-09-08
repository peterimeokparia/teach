import React from 'react';
import Swal from 'sweetalert2';
import { Validations } from  '../../../helpers/validations';


const DuplicateCheck = ({item, collection}) => {


  return ( collection?.includes( item ) && <div> 

              <video width={width} height={height} controls >
                <source src={path} type={type}/>
                  {/* <source src="/videos/3222d2315b4e8b8589291f457e7507df" type="video/webm"/> */}
                                </video>
     </div>
  );
}


export default DuplicateCheck;