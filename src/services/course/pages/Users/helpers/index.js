import {
useDispatch } from 'react-redux';

import { 
navigate } from '@reach/router';

import Swal from 'sweetalert2';


export const links = (selectedStudents, courseId) => {
    return [ 
      { id: "SavedAnswers", title: "Saved Answers", path:`student/${ selectedStudents?._id }/savedanswers`, _id: selectedStudents?._id }, 
      { id: "Grades", title: "Grades", path:`student/${ selectedStudents?._id }/grades`, _id: selectedStudents?._id }, 
      { id: "Attendance", title: "Attendance", path: `student/${ selectedStudents?._id  }/attendance`, _id: selectedStudents?._id }, 
      { id: "Session", title: "Session", path: `student/${ selectedStudents?._id  }/sessions/courseId/${courseId}`, _id: selectedStudents?._id },
      { id: "Logins", title: "Logins", path:`student/${ selectedStudents?._id }/logins`, _id: selectedStudents?._id }, 
    ];
};

export function addUsersToMeeting( meetingProps, enableTeachPlatform ) {

  let {
    setAddUsers,
    listOfStudents, 
    selectedTutorId: selectedUserId, 
    operatorBusinessName, 
    sessions, 
    operator
} = meetingProps;

  Swal.fire({
    title: 'Please Add Meeting Attendees',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Add Attendees',
    confirmButtonColor: '#673ab7',
    cancelButtonText: 'No Attendees'
  }).then( (response) => {
      if ( response?.value ) {       
          setAddUsers( true )
      } else {
        enableTeachPlatform({ listOfStudents, selectedTutorId: selectedUserId, operatorBusinessName, sessions, operatorId: operator?._id } );
        navigate(`/${operatorBusinessName}/LessonPlan/classRoom/${selectedUserId}`);
      }
  });
};

export const studentOption = ( students ) => students?.map(item => ( { value: item,  label: item?.firstname } ));