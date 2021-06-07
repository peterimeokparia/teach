import 
React, { 
useEffect } from 'react';

import NavLinks from './node_modules/Services/course/Pages/Components/NavLinks';

import OnlineQuestionsMultiEditorComponent from './node_modules/Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionsMultiEditorComponent';
import './style.css';

const OnlineQuestionsSavedAnswersPage = ({ 
  operatorBusinessName, 
  onlineQuestionId, 
  courseId }) => {

useEffect(() => {}, []);

return (
    // <div className="LessonPlan">
    <div className="">
      <div className="stage" id="stage"> 
        <div>
            <NavLinks to={`/${operatorBusinessName}/homework/askquestion/000111`}>
                <span className="navlink-text"> {"Chemistry..."} </span>
            </NavLinks>
        </div>    
    </div>      
  </div>  
 );
}

export default OnlineQuestionsSavedAnswersPage;