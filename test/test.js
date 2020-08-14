import assert from 'assert';
import fs from 'fs';
//import { uploadVideos } from './../src/services/course/api';
// /Users/peterimeokparia/Documents/VsCode/Work/Projects/Teach/teach-platform/src/services/course/api.js



describe('Saving files', () => {

  //let testFile = '/Users/peterimeokparia/Documents/VsCode/Work/Projects/Test/file3.webm';

  let testFiles= '/Users/peterimeokparia/Documents/VsCode/Work/Projects/Teach/teach-platform/BackEnd/public/videos';
  //let testFile = './public/videos';




      describe('Saving a file to a specific location', () => {
        it('should save the file in the path specified.', () => {
  
        //uploadVideos(testFile);
    
        fs.readFile(testFiles, '', (err, data) => {
          if (err) return console.error(err);

           console.log('result', data);
         
           assert.equal('test'.length, data.length);  
        });  
      
        });
      }); 
  });




//   describe('Saving files', () => {
//     describe('Saving a file to a specific location', () => {
//       it('should save the file in the path specified.', () => {
//       let file = 'peterimeokparia/Test/file3.webm';
//       let testFile = '/Users/peterimeokparia/Documents/VsCode/Work/Projects/Test/file3.webm';

//       let fileReader = new FileReader();

 
//       uploadVideos(file);

//       assert.notEqual(null, fileReader());  
//       // assert.notEqual('test'.length, data.length);      
//       });
//     }); 
// });
