import 
React, { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
setMarkDown, 
saveLesson } from '../../actions';

import { 
SET_LESSON_MARKDOWN } from '../../actions';

import {
role } from '../../../../helpers/pageHelpers';

import EditorComponent from './Components/EditorComponent';

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
import MultiEditorComponent from './Components/OnlineQuestionsMultiEditorComponent';

import './DemoClickToAddDiv.css';


const plugins = {
  // Define plugins for content cells.

  // To import multiple plugins, use [slate(), image, spacer, divider]
  content: [slate()],

  // Define plugins for layout cells
  layout: [background({ defaultPlugin: slate() })],
};


const DemoClickToAddDiv = ({ lessonId, children}) => {

// let stage;

  useEffect(() => {

    // let dropDownDiv;

    // stage = document.getElementById('stage');
  
    // stage.addEventListener('click', e => {

    //     setCounter( counter += 1);
        
    //   let spanEl = document.createElement('form');
    //   spanEl.name='testForm';
    //   spanEl.method='POST';
    //   spanEl.style.top = e.pageY + 'px';
    //   spanEl.style.left = e.pageX + 'px';
    //   spanEl.style.background = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    //   let _input = document.createElement('input');
    //   _input.type='text';
    //   _input.name='testInput';
    //   _input.value="this is a test";
    //   spanEl.appendChild(_input);
    //   stage.appendChild(spanEl);

      // dropDownDiv = document.createElement(`span`);
      // dropDownDiv.setAttribute("id", `DropDownSelectorComponent${counter}`);
      // dropDownDiv.style.top = e.pageY + 'px';
      // dropDownDiv.style.left = e.pageX + 'px';
      // dropDownDiv.style.background = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

      // let testDiv = document.querySelector(`.DropDownSelectorComponent`)

      // dropDownDiv.appendChild(testDiv)
      // stage.appendChild(dropDownDiv);
      // e.preventDefault()    

    // });


  }, []);
 
  const [ mouseClickosition, setMouseClickPosition ] = useState({});
  let [ counter, setCounter ] = useState(0);

  const [ markDownContent,  setMarkDownContent ] = useState(null)
  
  


  // return (

  //   <MultiEditorComponent />
  // )

  return (

    <div className="LessonPlan">

      <div className="stage" id="stage"> 

          <div>

            <MultiEditorComponent 
                lessonId={lessonId}
            />

        </div>    

    </div>  

  </div>
     
);

}


export default DemoClickToAddDiv;