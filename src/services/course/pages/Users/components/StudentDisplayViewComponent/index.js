import { 
  connect } from 'react-redux';
  
  import {
  saveGrade } from 'services/course/actions/grades';
  
  import {
  markAttendance,
  saveAttendance } from 'services/course/actions/attendance';
  
  import {
  role } from 'services/course/helpers/PageHelpers';
  
  import {
  Link } from '@reach/router';
  
  import { 
  getLessonsByCourseIdSelector, 
  getOperatorFromOperatorBusinessName } from 'services/course/selectors';
  
  import { 
  emailMessageOptions, 
  emailInputOptions } from  'services/course/pages/Courses/helpers';
  
  import { 
  links } from 'services/course/pages/Users/helpers';
  
  import ListItemComponent from '../ListItemComponent';
  import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
  import Roles from 'services/course/pages/components/Roles';
  import MultiInputEmailComponent from 'services/course/pages/Email/MultiInputEmailComponent';
  import NavLinks from '../../../components/NavLinks';
  
  const StudentDisplayViewComponent = ({
    props,
    currentUser,
    selectedCourseFromLessonPlanCourseDropDown,
    selectedLessonFromLessonPlanDropDown,
    lessons,
    navigationHistory  }) => {
    let {operatorBusinessName, selectedStudents, childrenProps} = props;
  
  function onMatchListItem( match, listItem ) {
    if ( match ){
       console.log(`Item match ${listItem}`);
    }
  }; 
   
  return (
      <div className="CourseDetail"> 
      <header className="header">                
          <NavLinks to={navigationHistory?.replace('http://localhost:3000', "")}>  
            <h1>{selectedStudents?.firstname + " : StudentId:" + selectedStudents?._id}</h1> 
          </NavLinks> 
          <LoginLogout
            operatorBusinessName={operatorBusinessName}
            user={currentUser} 
          />
      </header>
      <div className="content"> 
                <div className="sidebar"> 
                  <ListItemComponent
                      id={selectedStudents?._id}
                      ulClassName={"lessons"}
                      liClassName={"lesson-item"}
                      altLinkPath={"student"}
                      collection={links( selectedStudents, selectedCourseFromLessonPlanCourseDropDown?._id )}
                      onMatchListItem={onMatchListItem}
                      path={undefined}
                   >
                       {( selectedPage ) => (
                            <div>      
                              <div>
                                <Link to={selectedPage?.path} > <span title={selectedPage?.title} > { selectedPage?.title } </span> </Link> 
                                <br></br>
                                <div> 
                                </div>  
                              </div>                            
                            </div>                    
                        )}
                   </ListItemComponent>    
                  </div>          
                  <div className="lesson"> 
                      <div>
                           {childrenProps}
                      </div>                                           
                  </div>
                  <div className="sidebar"> 
                  <Roles
                    role={currentUser?.role === role.Student }
                  >                         
                    <MultiInputEmailComponent
                      setLesson={lessons && Object.values(lessons)?.find(lesson => lesson?._id === selectedLessonFromLessonPlanDropDown?._id)}
                      inputFieldOptions={emailInputOptions}
                      messageOptions={emailMessageOptions} 
                    />
                  </Roles>
                  </div>
            </div>
          </div>
        );
  };
  
  const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        users: Object.values(state?.users?.users),
        lessons: getLessonsByCourseIdSelector( state, ownProps ),
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown,
        navigationHistory: state.users.navigationHistory
    };
  };
  
  export default connect( mapState, { saveGrade,  markAttendance, saveAttendance } )(StudentDisplayViewComponent);