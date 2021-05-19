import 
React, { 
useEffect } from 'react';

import OnlineQuestionsMultiEditorComponent from './Components/OnlineQuestionsMultiEditorComponent';

const OnlineQuestionsPage = ({ operatorBusinessName, onlineQuestionId, courseId }) => {

useEffect(() => {}, []);
 
return (
    // <div className="LessonPlan">
    <div className="">
      <div className="stage" id="stage"> 
        <div>
            <OnlineQuestionsMultiEditorComponent 
              onlineQuestionId={onlineQuestionId} courseId={courseId}
              operatorBusinessName={operatorBusinessName}
            />
        </div>    
    </div>      
  </div>  
 );
}

export default OnlineQuestionsPage;