import 
React, { 
useEffect } from 'react';

import MultiEditorComponent from './Components/MultiEditorComponent';

const QuestionPage = ({ 
lessonId }) => {

useEffect(() => {}, []);
 
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

export default QuestionPage;