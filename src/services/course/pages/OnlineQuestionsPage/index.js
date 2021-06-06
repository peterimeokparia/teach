import 
React, { 
useEffect } from 'react';

import OnlineQuestionsMultiEditorComponent from './Components/OnlineQuestionsMultiEditorComponent';

const OnlineQuestionsPage = ({ operatorBusinessName, onlineQuestionId, courseId }) => {
useEffect(() => {}, []);
 
return (
    <div className="stage" id="stage">
      <div className="" id=""> 
        <div>
            <OnlineQuestionsMultiEditorComponent 
              onlineQuestionId={onlineQuestionId} 
              courseId={courseId}
              operatorBusinessName={operatorBusinessName}
            />
        </div>    
    </div>      
  </div>  
 );
};

export default OnlineQuestionsPage;