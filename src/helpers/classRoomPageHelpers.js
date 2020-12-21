import { 
Link, 
Match, 
navigate, 
Redirect } from '@reach/router';

import { 
updateUserInvitationUrl,
userNavigationHistory } from '../services/course/actions.js';

import { 
sendEmail } from '../services/course/api.js';


import { 
MultiInputEmailComponent } from '../services/course/pages/MultiInputEmailComponent.js';
    
import Swal from 'sweetalert2';



export const emailMessageOptions = (currentUser, invitationUrl) => {
    return {
        from: "teachpadsconnect247@gmail.com",
        subject: "Hey! Join my lesson!",
        messageBody: invitationUrl,
        userId: currentUser?._id
    }
}



export const emailInputOptions = {
    name:"inputO",
    type:"email",
    placeHolder:"Invite your friends!"
}



export function navigateToStudentDetailPage( futureLink, userNavigationHistoryAction ){

    userNavigationHistoryAction( getCurrentPageUrl() );

    navigate(futureLink)
}
    
    
const getCurrentPageUrl = () => window.location.href; 


export const classRoomPageComponentConfig = ( currentUser, users, courses, lessons, currentCourse, selectedUserId  ) => {

    let coursesCreatedByTheSelectedTutor = courses?.filter(course =>  course?.createdBy === selectedUserId);
    let listOfCourses = coursesCreatedByTheSelectedTutor?.filter(course => course);
    let listOfLessons = lessons?.filter(lesson => lesson?.courseId === currentCourse?._id);

    return {
            selectedUser: users?.find(user => user?._id === selectedUserId),
            studentsSubscribedToCoursesByThisTutor: users?.filter(usr => usr?.role === "Student" && ( coursesCreatedByTheSelectedTutor?.find( course => usr?.courses?.includes( course?._id)))),
            listOfCoursesForTheSelectedStudent: [ { name: 'Select' }, ...listOfCourses ],
            listOfLessonsForTheSelectedStudent: [ { title: ( currentUser?.role === "Tutor" ? "Add New Lesson" : "" ), description:( currentUser?.role === "Tutor" ? "Add New Lesson" : "" ) }, ...listOfLessons ],
            toggleBetweenAttendanceGradeDisplay: [ { name: 'Attendance / Grade' },  { _id: "Grade",  name: 'Grade' }, {_id: "Attendance", name: 'Attendance'} ]

    };
};



export const joinMeetingPopupMessage = ( swalTitle, showConfirmationButton, onConfirmationNavigateToUrl, onCancelationNavigateToUrl ) => {

    Swal.fire({
        title: swalTitle,
        icon: 'warning',
        // html: currentUser?.cart?.map((item, index) => '<ul><li key=' + `${index}` + '>' + `${item?.name}` + '</li></ul') + "Do you still want to log out?",
        showCancelButton: true,
        showConfirmButton: ( showConfirmationButton ),
        confirmButtonText: 'Join',
        confirmButtonColor: '#673ab7',
        cancelButtonText: 'Next time'
      }).then( (response) => {
     
        if ( response?.value ) {
          
            navigate( onConfirmationNavigateToUrl );
        
        } else {
          
            navigate( onCancelationNavigateToUrl );
        }
     
     });       
}



export const newMeetingInvitePromoMessage = ( setInviteButtonAnimationEffect ) => {

    Swal.fire({
        title: "Please wait. Your meeting has not started.",
        icon: 'info',
        html: '<div><p> While you wait,<br></br> earn points, gift cards and rewards. <br></br> Invite a friend to use the platform. </p></div>',
        showCancelButton: false,
        showConfirmButton: ( true ),
        confirmButtonText: 'Invite Your Friends',
        // confirmButtonColor: '#673ab7',
        confirmButtonColor: '#20c997',
        cancelButtonText: 'Next time'
      }).then( (response) => {
     
        if ( response?.value ) {
          
            setInviteButtonAnimationEffect( true );
        
        } 
     
     });  


}

