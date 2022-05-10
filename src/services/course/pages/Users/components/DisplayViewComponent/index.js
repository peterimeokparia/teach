import { 
connect } from 'react-redux';

import {
saveGrade } from 'services/course/actions/grades';

import {
markAttendance,
saveAttendance } from 'services/course/actions/attendance';
  
import { 
getLessonsByCourseIdSelector } from 'services/course/selectors';

import ListItemComponent from '../ListItemComponent';

const DisplayViewComponent = ({
  item,
  ulClassName,
  liClassName,
  altLinkPath,
  collection,
  onMatchListItem,
  children }) => {

return (
      <ListItemComponent
          id={item?._id}
          ulClassName={ulClassName}
          liClassName={liClassName}
          altLinkPath={altLinkPath} //student
          collection={collection}
          onMatchListItem={onMatchListItem}
          path={undefined}
      >
        {( selectedItem ) => (
            <div>      
            { children(selectedItem)}                     
            </div>                    
        )}
      </ListItemComponent>             
    );
};
  
const mapState = (state, ownProps) => {
  return {
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

export default connect( mapState, { saveGrade,  markAttendance, saveAttendance } )(DisplayViewComponent);