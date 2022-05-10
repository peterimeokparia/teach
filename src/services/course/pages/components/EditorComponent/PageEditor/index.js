import {
uploadContent } from 'services/course/helpers/ServerHelper';

// // import image from '@react-page/plugins-image';
// // The background plugin
import 
background, { 
ModeEnum } from '@react-page/plugins-background';

import { 
imagePlugin } from '@react-page/plugins-image';

// // The editor core
import Editor from '@react-page/editor';

import slate from '@react-page/plugins-slate';
// // The divider plugin
import divider from '@react-page/plugins-divider';
// // The html5-video plugin
import html5video from '@react-page/plugins-html5-video';
// // The native handler plugin
import native from '@react-page/plugins-default-native';



import '@react-page/plugins-image/lib/index.css';

// // The video plugin
import video from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';

// // The spacer plugin
import spacer from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';

import "@react-page/plugins-slate/lib/index.css";
import "@react-page/plugins-image/lib/index.css";
import "@react-page/editor/lib/index.css";
// import PageLayout from '../../components/PageLayout';

import './style.css';


// Define which plugins we want to use.
//https://codesandbox.io/s/peaceful-varahamihira-i5t7o?file=/src/plugins.ts
//https://codesandbox.io/s/qzxqc?file=/src/components/plugins.js

const PageEditor = ({
  id, 
  name,
  content,
  className,
  handleChange,
  readOnly,
  upload_url }) => {

  const imageUploadService = () => (file, reportProgress) => {
      let formData = new FormData();

      if ( file ) {
        formData.append('file', file);
       // uploadContent(`${upload_url}${file?.name}`, formData);  
      }
      
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        reportProgress(counter * 10);
        if (counter > 9) {
          clearInterval(interval);
          resolve({ url: `http://localhost:3000/files/${file?.name}` });
        }
      }, 500);
    });
  };

  const cellPlugins = [
    slate(),
    imagePlugin({
        imageUpload:imageUploadService(),
      }),
    background({
      enabledModes:
      ModeEnum.COLOR_MODE_FLAG |
      ModeEnum.IMAGE_MODE_FLAG |
      ModeEnum.GRADIENT_MODE_FLAG,
    }), 
      spacer,
      video,
      divider,
      html5video,
      native,
    ];
return (
      <div 
        id={id}
        name={name}
        className={className}
      > 
      <Editor 
        cellPlugins={cellPlugins} 
        value={content}
        onChange={handleChange}
        sidebarPosition={'rightAbsolute'} 
      />
      </div>      
    );
}

export default PageEditor;