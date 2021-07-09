import { 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import {
onlineQuestionCourseId } from 'Services/course/Actions/OnlineQuestions';

import OnlineQuestionsMultiEditorComponent from './Components/OnlineQuestionsMultiEditorComponent';

const OnlineQuestionsPage = ({ 
  operatorBusinessName, 
  onlineQuestionId, 
  courseId, 
  onlineQuestionCourseId }) => {
    
  useEffect(() => {
    if ( courseId ) {
      onlineQuestionCourseId( courseId );
    }
}, [ courseId, onlineQuestionCourseId ]);
 
return (
    <div className="stage" id="stage">
      <div className="" id=""> 
        <div>
          <OnlineQuestionsMultiEditorComponent 
            onlineQuestionId={onlineQuestionId} 
            operatorBusinessName={operatorBusinessName}
          />
        </div>    
    </div>      
  </div>  
 );
};

export default connect(null, { onlineQuestionCourseId })( OnlineQuestionsPage );