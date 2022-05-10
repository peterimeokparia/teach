
import 
React from 'react';

import PageEditor from 'services/course/pages/components/EditorComponent/PageEditor';
import './style.css';

const EditorComponent = ({
   id, 
   name,
   content,
   className,
   handleChange,
   readOnly,
   upload_url }) => {

return ( 

   <PageEditor
      // id={id}
      // name={name}
      // className={className}
      upload_url={upload_url}
      handleChange={handleChange}  
      content={ content }
      // readOnly={readOnly}   
   /> 

   );
};

export default EditorComponent;