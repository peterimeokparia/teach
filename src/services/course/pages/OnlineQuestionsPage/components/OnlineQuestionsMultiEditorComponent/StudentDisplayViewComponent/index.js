import { 
connect } from 'react-redux';

import {
addNewGrade,
saveGrade } from 'services/course/actions/grades';

import {
markAttendance,
saveAttendance } from 'services/course/actions/attendance';

import {
role } from 'services/course/helpers/PageHelpers';

import {
Links } from 'services/course/pages/OnlineQuestionsPage/helpers';

import {
Link } from '@reach/router';

import ListItemComponent from '../ListItemComponent';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Roles from 'services/course/pages/components/Roles';
import MultiInputEmailComponent from 'services/course/pages/Email/MultiInputEmailComponent';
import NavLinks from '../../../../components/NavLinks';
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