import 
React, { 
useEffect } from 'react';

import NavLinks from 'Services/course/Pages/Components/NavLinks';

import OnlineQuestionsMultiEditorComponent from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionsMultiEditorComponent';
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
        {/* navigate(`/${operatorBusinessName}/homework/askquestion/000111`); */}
            <NavLinks to={`/${operatorBusinessName}/homework/askquestion/000111`}>
                <span className="navlink-text"> {"Chemistry..."} </span>
            </NavLinks>


            {/* <OnlineQuestionsMultiEditorComponent onlineQuestionId={onlineQuestionId} courseId={courseId}/> */}
        </div>    
    </div>      
  </div>  
 );
}

export default OnlineQuestionsSavedAnswersPage;