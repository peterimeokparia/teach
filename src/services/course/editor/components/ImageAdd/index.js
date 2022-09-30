import { useState } from 'react';
import { editor_upload_url } from 'services/course/pages/OnlineQuestionsPage/helpers';
import { uploadContent } from 'services/course/helpers/ServerHelper';
import { purple, green } from '@material-ui/core/colors';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import Input from '@mui/material/Input';
import './styles.css';

const reportProgress = ( result ) => {
  alert(JSON.stringify( result ));
};
  
const imageUploadService = (file) => {
  let formData = new FormData();

  if ( file ) {
    formData.append('file', file);
    uploadContent(`${editor_upload_url}${file?.name}`, formData);  
  }
  
return new Promise((resolve, reject) => {
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    if( !file ) {
      reject('no file selected');
    }
    reportProgress(counter * 10);
    if (counter > 9) {
      clearInterval(interval);
      resolve({ url: `http://localhost:3000/files/${file?.name}` });
    }
  }, 500);
 });
};

const ImageAdd = ({
  editorState, 
  setEditorState,
  modifier
}) => {
  const [ src, setUrl ] = useState( 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f2ba0ce35b750cf280ed5319c07ae13c&auto=format&fit=crop&w=150&q=80' );

    function addImage() {
      setEditorState( modifier( editorState, src ));
    }

    function changeUrl( evt ) {
      setUrl( evt.target.value );
    }

    function handleFile(e){
      const file = e.target.files[0];

      imageUploadService(file);
  
      const src = `http://localhost:3000/files/${file?.name}`;

      setEditorState( modifier( editorState, src ));

      // if ( file.type.indexOf("image") === 0 ){
      //   imageUploadService(file);
      //     const src = URL.createObjectURL( file );
      //     setEditorState( modifier( editorState, src ));
      //     setEditorState( modifier(editorState, { src: src }) );
      // }
    }

    const fabGreenStyle = {
      color: 'common.white',
      bgcolor: green[100],
      '&:hover': {
        bgcolor: green[100],
      },
      minWidth: 30,
    };

    const fabPurpleStyle = {
      color: 'common.white',
      bgcolor: purple[100],
      '&:hover': {
        bgcolor: purple[100],
      },
    };

    return (
      <div className={'row addImage'}>
         {/* <input
           type="file"
           onChange={ handleFile }
           placeholder="Add image from file"
         />     */}
         <div className='col col-add-file'>
         <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Input sx={{...fabGreenStyle}} type="file" placeholder="Add image from file" onChange={ handleFile } focused/>
        </Box>
         </div>
        <div className='col col-add-image'>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField sx={{...fabPurpleStyle}} id="standard-basic" color="secondary" variant="standard" value={ src } onChange={ changeUrl } placeholder="Paste the image url …" focused/>
        </Box>
        <div className='col-addIcon'>
         <ImageIcon className="mui-headerStyleDropdownButtons" onClick={ addImage }/>
        </div>
      </div>
     
    </div>
    );
};

export default ImageAdd;