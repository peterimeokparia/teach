import 
React, { 
useEffect } from 'react';

import { 
connect  } from 'react-redux';

import {
getOperatorFromOperatorBusinessName } from 'Services/course/Selectors';

// import HelpIcon from '@material-ui/icons/Help';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

// import { 
// helpIconStyle } from './inlineStyles';
import './style.css';

const OnlineQuestionsCourseListPage = ( {
operatorBusinessName,
loginUser,
operator,
currentUser,
courses, 
courseId,
} ) => {
useEffect(() => {
}, [  ]);

let courseListIconCollection = [ 
    { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 },
    { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 },
    // { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 },
    // { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 }, { fontSize: 70 },
  ];

return(
    <div className="OnlineQuestionsCourseListPage"> 

          <div className="content">
                {
                //    <div className="sidebar">
                //      <div className="input-field-builder-selector">  
                //      </div>
                //   </div>
                }
                <div> 
              
                <div> <br></br> </div>
                <div>
                <div className="row">
                     { courseListIconCollection.map(( ) => (
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
                                          onClick={() => window.location.href = "http://localhost:3000/boomingllc/homework/askquestion/course/000111"}
                                      />
                                       
                                      <label className="course-title">{"Chemistry"}</label>
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
    // courses: getCoursesByOperatorId(state, ownProps)
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsCourseListPage);