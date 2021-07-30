import { 
useEffect } from 'react';

import { 
connect  } from 'react-redux';

import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import { 
loadCourses } from 'Services/course/Actions/Courses';

import { 
Markup } from 'interweave';

import NavLinks from 'Services/course/Pages/Components/NavLinks';
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

