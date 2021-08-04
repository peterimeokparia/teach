import { 
useEffect } from 'react';

import { 
connect  } from 'react-redux';

import {
getOperatorFromOperatorBusinessName,
getCoursesByOperatorId } from 'services/course/selectors';

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import './style.css';

const OnlineQuestionsCourseListPage = ( {
  operatorBusinessName,
  operator,
  courses, 
  loginUser,
  currentUser,
  courseId } ) => {
  useEffect(() => {
  }, []);

return(
    <div className="OnlineQuestionsCourseListPage"> 
        <div className="content">
          <div>   
            <div> <br></br> </div>
            <div>
              <div className="row">
                { courses.map(( course, index ) => (
                    <div 
                      key={""}   
                      className="col-1"
                    > 
                        <div 
                          className="hvr-pulse-grow"
                        >
                            <LibraryBooksIcon 
                              style={{fontSize: 70}}
                              className="comment-round-button-4"
                              onClick={() => window.location.href = `http://localhost:3000/boomingllc/homework/askquestion/course/${course?._id}`}
                            />
                              <label className="course-title">{course?.name}</label>
                        </div>      
                    </div>
                ))}                      
                </div> 

            </div>
        </div>
      </div>
    </div> 
  );
};

const mapDispatch = { 
};

const mapState = ( state, ownProps ) => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    currentUser: state.users.user,
    courses: getCoursesByOperatorId(state, ownProps)
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsCourseListPage);
