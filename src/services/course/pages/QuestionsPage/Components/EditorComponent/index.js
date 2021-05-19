import React from 'react';

import Dante from 'Dante2';

// Load some exemplary plugins:
// The rich text area plugin
import slate from '@react-page/plugins-slate';

// A plugin for background images
import background from '@react-page/plugins-background';

// Stylesheets for the rich text area plugin
import '@react-page/plugins-slate/lib/index.css';

// Stylesheets for  background layout plugin
import '@react-page/plugins-background/lib/index.css';
import { ImageBlockConfig } from 'Dante2/package/es/components/blocks/image.js'; 
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
onChange,
readOnly,
upload_url,
body_placeholder,
upload_handler }) => {
return (
       <div 
         id={id}
         name={name}
         className={className}
        > 
        <Dante
            content= {content} 
            onChange={onChange} 
            body_placeholder={'Party party party'}
            widgets={[
              ImageBlockConfig({
                options: {
                  upload_url,
                  upload_handler,
                },
              }),
           ]}
           read_only={false} 
          //  read_only={readOnly} 
         />  
       </div>      
   );
}

export default EditorComponent;
