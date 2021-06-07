import 
React, { 
useEffect } from 'react';

import { 
connect  } from 'react-redux';

import {
Link } from '@reach/router';
  
import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import { 
loadCourses } from 'Services/course/Actions/Courses';

import ListItemComponent from 'Services/course/Pages/Users/Components/ListItemComponent';
//import NavLinks from 'Services/course/Pages/Components/NavLinks';
import './style.css';

const OnlineQuestionsSavedAnswersPage = ({ 
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

function onMatchListItem( match, listItem ) {
  if ( match ){
      // setCurrentPage( listItem );
  }
} 

// let savedQuestions = onlineQuestions?.filter( question => question.savedQuestions?.includes( studentId ) );
// let savedCourses = courses.filter( course => savedQuestions?.courseId === course?._id );
let savedCourses = [ 
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" },
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" } ,
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" },  
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" },  
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" },
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" } ,
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" },  
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" }, 
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" },
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" } ,
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" },  
  { _id: '000111 ', name: "Chemistry" }, 
  { _id: '000222 ', name: "Physics" }, 
];

let links = savedCourses.map(( course, index ) => {
 return { id: course?._id, title: course?.name, path:`student/${studentId}/course/${ course?._id }`, _id: course?._id }; 
});

return (
  <div className="savedAnswers" id="savedAnswers">
    <div className="content" id="content"> 
    {
        <div>
              <span className="sidebar"> 
               <span>
               <ListItemComponent
                    ulClassName={"savedAnswersList"}
                    liClassName={"savedAnswers-item"}
                    id={studentId}
                    altLinkPath={"student"}
                    collection={links}
                    onMatchListItem={onMatchListItem}
                    path={undefined}
                 >
                     {( selectedPage ) => (
                          <span>      
                            <div>
                              <Link to={selectedPage?.path}> <span title={selectedPage?.title} > { selectedPage?.title } </span> </Link> 
                              <br></br>
                            </div>                            
                          </span>                    
                      )}
                 </ListItemComponent>
               </span>

               <div className="sideBarSavedCourses">
                 {children}
               </div>
                  
                </span>       
      </div> 
    }   
  </div>      
</div>  
);
};

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

export default connect( mapState, mapDispatch )(OnlineQuestionsSavedAnswersPage);

