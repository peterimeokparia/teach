import { 
connect } from 'react-redux';

import {
addNewGrade,
saveGrade } from 'Services/course/Actions/Grades';

import {
markAttendance,
saveAttendance } from 'Services/course/Actions/Attendance';

import {
role } from 'Services/course/helpers/PageHelpers';

import {
Links } from 'Services/course/Pages/OnlineQuestionsPage/helpers';

import {
Link } from '@reach/router';

import ListItemComponent from '../ListItemComponent';
import LoginLogout from './node_modules/Services/course/Pages/LoginPage/Components/LoginLogout';
import Roles from './node_modules/Services/course/Pages/Components/Roles';
import MultiInputEmailComponent from './node_modules/Services/course/Pages/Email/MultiInputEmailComponent';
import NavLinks from '../../../Components/NavLinks';
import './style.css';

const StudentDisplayViewComponent = ({
operatorBusinessName,
operator,       
currentUser,
selectedStudents,
emailInputOptions,
emailMessageOptions,
lessonPlanUrl,
setCurrentPage,
setLessonPlanUrl,
currentPage,
courseId,
lessonId,
course,
lessons,
navigationHistory,
parentChild,
children  }) => {

function onMatchListItem( match, listItem ) {

  if ( match ){
      setCurrentPage( listItem );
  }
} 
 
return (
    <div className="StudentDetails"> 
    <header>                
        <NavLinks to={navigationHistory?.replace('http://localhost:3000', "")}>  
          {/* <h1>{selectedStudents?.firstname + " : StudentId:" + selectedStudents?._id}</h1>  */}
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
                    altLinkPath={"student"}
                    collection={Links( selectedStudents )}
                    onMatchListItem={onMatchListItem}
                    path={undefined}
                 >
                  {( selectedPage ) => (
                    <div>      
                      <div>
                        <Link to={selectedPage?.path}> <span title={selectedPage?.title} > { selectedPage?.title } </span> </Link> 
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
                    { parentChild }
                  </div>                                           
                </div>
                <div className="sidebar"> 
                <Roles
                  role={currentUser?.role === role.Student }
                >                         
                    <MultiInputEmailComponent
                      setLesson={lessons && Object.values(lessons)?.find(lesson => lesson?._id === lessonId)}
                      inputFieldOptions={emailInputOptions}
                      messageOptions={emailMessageOptions} 
                    />
                </Roles>
                </div>
          </div>
        </div>
      );
}

export default connect( null, { addNewGrade, saveGrade,  markAttendance, saveAttendance } )(StudentDisplayViewComponent);