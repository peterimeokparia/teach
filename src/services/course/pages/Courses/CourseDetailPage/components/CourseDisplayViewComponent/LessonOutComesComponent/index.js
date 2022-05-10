import { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Link, navigate } from '@reach/router';

import { 
addNewOutcome, 
saveOutcome } from 'services/course/actions/outcomes';

import { 
togglePreviewMode } from 'services/course/actions/app';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 
    
import {
role } from 'services/course/helpers/PageHelpers';

import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector,
getOperatorFromOperatorBusinessName, 
getCalendarByCalendarEventType, 
getCalendarsByOperatorId, 
getLessonOutcomesByLessonId } from 'services/course/selectors';

import { 
addCalendar } from 'services/course/actions/calendar';

import { 
deleteQuestionIconStyle,
sideBarEditIconStyle,
sideBarDeleteIconStyle,
sideBarHomeWorkIconStyle,
sideBarHelpIconStyle,
swapHorizIconStyle,
calendarStyle } from '../../inlineStyles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MainMenu from 'services/course/pages/components/MainMenu';
import NewLessonPage from 'services/course/pages/Lessons/NewLessonPage';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import MuiCardListItemComponent from 'services/course/pages/components/MuiCardListItemComponent';
import ListItemDetailComponent from 'services/course/pages/components/ListItem/components/ListItemDetailComponent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Swal from 'sweetalert2';

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardItem = ( cardProp, currentUser ) => ( 
  <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {
        cardProp?.title 
        }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      {/* <Roles
        role={ currentUser?.role === role.Tutor }
      > */}
        <EditIcon 
            // onClick={() => { edit(lesson.title); } }
            color="action"
            className="comment-round-button-1"
            // style={ sideBarEditIconStyle() }
        />

        <DeleteIcon 
            // onClick={remove}
            color="action"
            className="comment-round-button-3"
            // style={ sideBarDeleteIconStyle() }
        />
    {/* </Roles> */}
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>

     
    </Card>
);

const LessonOutComesComponent = ({
    props,
    buttonText,
    previewMode,
    saveOutcome,
    setMarkDown,
    addNewOutcome,
    onLessonError,
    courseId,
    lessonId,
    calendars,
    calendar,
    addCalendar,
    users,
    courses,
    setVideoUrl,
    selectedTutorId,
    currentVideoUrl,
    course,
    lessons,
    togglePreviewMode,
    operatorBusinessName,
    operator,
    courseDetailChildren,
    currentUser, 
    lessonOutComes,
    selectedLessonPlanLesson }) => {

    const onMatchListItem = ( match, listItem ) => {
        if( match ){
            // setCurrentLesson( listItem );
            // setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${course?._id}/${listItem._id}/${listItem.title}`);
            // setItemInSessionStorage('currentLesson', listItem);

            // if ( previewMode && (currentUser?.role === role.Tutor) && (!listItem?.introduction || listItem?.introduction === "") ) {
            //     const msg = "Please enter a lesson introduction.";
                
            //     Swal.fire(msg);
            //     return false;
            // }
        }
    }; 

    let outcomeProps = {
        courseId,
        lessonId, 
        userId: currentUser?._id,
        parentId: lessonId,
        outcomeType: 'lesson'
    }

    function handleLessonOutcome( editItemFunc ){
        editItemFunc();
    }

return ( <div className="row">
        {( lessonOutComes ).map(cardProps => ( 

           <div>
           {   <div className='col'> 
               {
                   <div className="listItem">  
                       <div className="lessons">  
                        <div className="lesson-item">
                          {
                              
                               cardItem(cardProps)

                          }
                       </div>
                       </div>
                   </div>
               }
              
           </div>
           }
         </div>

            
         ))
        }

</div>)
};

const mapDispatch = {
    addNewOutcome, 
    saveOutcome, 
    setMarkDown,
    togglePreviewMode,
    addCalendar
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        calendar: getCalendarByCalendarEventType(state, ownProps),
        calendars: getCalendarsByOperatorId(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        isLessonsLoading:state.lessons.lessonsLoading,
        videoUrl: state.lessons.videoUrl,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        course: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        onLessonError: state.lessons.onsaveOutcomeError,
        courses: Object.values( state.courses.courses ),
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
        lessonStarted: state.lessons.lessonStarted,
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess, 
        lessonOutComes: getLessonOutcomesByLessonId(state, ownProps )
    };
};

export default connect( mapState, mapDispatch )(LessonOutComesComponent);