import { 
  useEffect } from 'react';
  
  import { 
  connect  } from 'react-redux';
  
  import {
  Link } from '@reach/router';
  
  import { 
  addNewOnlineQuestion,
  saveOnlineQuestions,
  loadOnlineQuestions,
  deleteOnlineQuestion } from 'services/course/actions/onlinequestions';
  
  import { 
  loadCourses } from 'services/course/actions/courses';
  
  import ListItemComponent from 'services/course/pages/Users/components/ListItemComponent';
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
  
  function onMatchListItem( match, listItem ) {
    if ( match ){
        // setCurrentPage( listItem );
        //https://scienceblogs.com/tetrapodzoology/2008/07/21/history-of-treeclimbing-dinosaurs
        //https://www.youtube.com/watch?v=nRyUgkt07ys
    }
  } 
  
  let links = courses.map(( course, index ) => {
    return { id: course?._id, title: course?.name, path:`student/${studentId}/course/${ course?._id }`, _id: course?._id }; 
  });
  
  return (
    <div 
      className="savedAnswers" 
      id="savedAnswers"
    >
    <div 
      className="content" 
      id="content"
    > 
      { <div>
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
                { children }
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
    saveOnlineQuestions, 
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
  
  