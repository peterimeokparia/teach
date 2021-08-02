import { 
useEffect } from 'react';

import NavLinks from 'services/course/pages/components/NavLinks';

const OnlineQuestionDetailPage = ({ 
  operatorBusinessName, 
  onlineQuestionId, 
  courseId }) => {

useEffect(() => {}, []);

return (
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

export default OnlineQuestionDetailPage;