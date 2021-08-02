import { 
connect } from 'react-redux';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 

import Dante from 'dante3';

// Load some exemplary plugins:
// The rich text area plugin
//import slate from '@react-page/plugins-slate';

// A plugin for background images
//import background from '@react-page/plugins-background';

// Stylesheets for the rich text area plugin -- Dante2//import '@react-page/plugins-slate/lib/index.css';

// Stylesheets for  background layout plugin
//import '@react-page/plugins-background/lib/index.css';
//import { ImageBlockConfig } from 'dante3/package/es/components/blocks/image.js'; 
// import { 
// ImageBlockConfig } from 'dante3/package/umd/Dante'; 

import './style.css';
// Define which plugins we want to use.
// We only have slate and background available, so load those.

// const plugins = {
//   // Define plugins for content cells.
//   // To import multiple plugins, use [slate(), image, spacer, divider]
//   content: [slate()],
//   // Define plugins for layout cells
//   layout: [background({ defaultPlugin: slate() })],
// };

const EditorComponent = ({
id, 
name,
content,
className,
handleChange,
onChange,
readOnly,
setMarkDown,
upload_url,
body_placeholder,
upload_handler,
editorConfiguration }) => {
return (
       <div 
         id={id}
         name={name}
         className={className}
        > 
        <Dante
              onUpdate={handleChange}  
              content= { content }
              //body_placeholder={"Write text here."}
            // onUpdate={ onChange }           
            //  onChange={onChange} 
            //  body_placeholder={"Write text here."}
            //  widgets={[
            //    ImageBlockConfig({
            //      options: {
            //      upload_url,
            //      upload_handler,
            //      },
            //    }),
            //]}
           read_only={readOnly} 
           //read_only={readOnly} 
         />   
       </div>      
   );
};

export default connect(null, { setMarkDown })(EditorComponent);

