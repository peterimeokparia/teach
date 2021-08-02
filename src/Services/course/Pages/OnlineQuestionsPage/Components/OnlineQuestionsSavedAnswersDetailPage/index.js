import { 
useEffect } from 'react';

import { 
connect  } from 'react-redux';

import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion } from 'teach/src/services/course/actions/onlinequestions';

import { 
loadCourses } from 'teach/src/services/course/actions/courses';

import { 
Markup } from 'interweave';

import NavLinks from 'teach/src/services/course/pages/components/NavLinks';
import './style.css';

const OnlineQuestionsSavedAnswersDetailPage = ({ 
  operatorBusinessName, 
  studentId, 
  onlineQuestions,
  loadCourses,
  courses,
  courseId, 
  children }) => {
  useEffect(() => {
    loadOnlineQuestions();
    loadCourses();
  }, []);

  let savedQuestions = onlineQuestions?.filter(question => question.savedQuestions?.includes( studentId ) && question?.courseId === courseId );
    
return (
  <div className="stage" id="stage">
    <div> 
    { savedQuestions?.map(( question  ) => (
               <div 
                 className={"savedQuestions"} 
               >  
                <NavLinks to={`/${operatorBusinessName}/homework/askquestion/course/${ courseId }/question/${ question?._id }`}>
                    <div className="navlink-text"> 
                      { 
                        <Markup content={ question?.markDownContent } />     
                      } 
                    </div>
                </NavLinks>
               </div>
          ))
        }
      </div> 
</div>  
); };

const mapDispatch = { 
  loadCourses,
  addNewOnlineQuestion, 
  saveOnlineQuestion, 
  loadOnlineQuestions, 
  deleteOnlineQuestion
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    courses: Object.values(state.courses.courses),
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsSavedAnswersDetailPage);

