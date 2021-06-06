import React from 'react';

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
}, [ loadCourses ]);  
// }, []);

let savedQuestions = onlineQuestions?.filter(question => question.savedQuestions?.includes( studentId ) && question?.courseId === courseId );
    
const getQuestionText = ( markDownContent ) => {
  const { blocks } = JSON.parse( markDownContent );
  let contentText="", getText =  blocks;

   return getText.map( obj => {
      return contentText.concat( ` ${ obj?.text} `);
  });
};

return (
  <div className="stage" id="stage">
    <div> 
    { savedQuestions?.map(( question, index ) => (
               <div 
                 className={"savedQuestions"} 
                 key={ index }
               >  
                    <NavLinks to={`/${operatorBusinessName}/homework/askquestion/course/${ courseId }/question/${ question?._id }`}>
                        <div className="navlink-text"> 
                         { 
                           getQuestionText(  question?.markDownContent )
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
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions), // create selector load online questions by studentId
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsSavedAnswersDetailPage);

