import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LessonEditor from './LessonEditor';
// import MarkDown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';
import { togglePreviewMode } from '../actions';



const TestLayOut = () => {

    
    return (

        <div className="CourseDetail"> 
              
              <header>         
                <div className="lesson-item"> 
                  LESSON ITEM
                </div>
              </header>


             <div className="content"> 

              <div className="sidebar"> 
                  SIDE BAR 1
                </div>
           
                <div className="lesson"> 
          
                {/* 
                   <div className="lesson-item">  */}


               <div className=""> 
                   
                   <MDEditor
                  value="Test Mark Down"
                  // preview={previewMode ? 'edit' : 'live'}
                  preview={'preview'}
                  textareaProps={""}
                  previewOptions={""}
                  text=""
                  // fullscreen={true}
                 />

                  <MDEditor.Markdown source="Test Mark Down" />
                   
                   
                   
                   
                    </div>     
                   <div> ROW 2 </div> 
                   <div> ROW 3 </div>         
              </div>
              </div>
        </div>

    );

}



 


export default TestLayOut