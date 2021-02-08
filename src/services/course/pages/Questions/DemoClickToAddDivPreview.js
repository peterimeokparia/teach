import 
React, { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
loadQuestions } from '../../actions';

import {
labelValue,
elementMeta,
questionType } from './questionHelpers';

import { 
SET_LESSON_MARKDOWN } from '../../actions';

import {
role } from '../../../../helpers/pageHelpers';

import EditorComponent from './EditorComponent';

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

// Define which plugins we want to use.
// We only have slate and background available, so load those.

import DropDownSelectorComponent from '../Components/DropDownSelectorComponent';
import MultiInputEmailComponent from '../Email/MultiInputEmailComponent';
import MultiEditorComponent from './MultiEditorComponent';

import './answers.css';


const plugins = {
  // Define plugins for content cells.

  // To import multiple plugins, use [slate(), image, spacer, divider]
  content: [slate()],

  // Define plugins for layout cells
  layout: [background({ defaultPlugin: slate() })],
};


const DemoClickToAddDivPreview = ({ 
lessonId, 
children,
Questions,
loadQuestions }) => {

 

  useEffect(() => {

  }, []);
 


  let test = Questions;

  const handleAnswerOnChangeEvent = ( event ) => {
    let testR = event;
  }

  return (


    <div className="LessonPlan">

     <div className="stage" id="stage">   

    <div className="answers">

          <div className="content"> 

           
          <div className="sidebar" />

           
        <div>
         {
           test.map(( element, index ) => (
              
                <div>
           
                 <div className={"multipleChoiceQuestion"}>
                  <label className={"labelQuestion"}>
                       Question: { element.questionNumber}
                  </label>     

                      <span>
                      <Dante
                          key={index}
                          content= {JSON.parse(element?.question)} 
                          read_only={true } 
                      />  
                      </span>
                      
                    </div>
             
                  
                
                  <div> 
                    { 
                        element.markDownEditorFormInputFields.map(element => (

                       <>
                          <div className={elementMeta.multipleChoice}>
                            <span> 
                                {  element?.multipleChoiceLabelValue }
                            </span>
                                  <input
                                    className="multipleChoiceRadio"
                                    type={"radio"}
                                    value={element?.multipleChoiceValue}
                                    onChange={handleAnswerOnChangeEvent} 
                                />
                                <span>
                                { element?.value }
                                </span>   
                                
                        
                          </div>
                              </>
                              )  
                            )
                              }
                                
                            </div>
                      
                            
                          </div>

                        )
                        )
                    }
                  </div>    

                  </div>  

                  </div>

          </div>

         </div>
            
      );
    }


const mapState = ( state, ownProps ) => {
  return {
      Questions: Object.values(state.questions.questions)
  }
}


export default connect(mapState, { loadQuestions } )(DemoClickToAddDivPreview);