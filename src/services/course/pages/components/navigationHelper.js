export const navContent = ( user, operatorBusinessName, currentRole, role ) => { return { 

    users: [
              { id: 0, hrefValue: `/${operatorBusinessName}/LessonPlan/StudyHall/${user?.firstname}/StudyHall/${user?.firstname}` , item: 'Study Hall' }, 
              { id: 1, hrefValue: `/${operatorBusinessName}/mycourses` , item: 'My Courses' },
              { id: 2, hrefValue: `/${operatorBusinessName}/courses` , item: 'All Courses' },
              { id: 3, hrefValue:  (currentRole === role ) ? `/${operatorBusinessName}/users` : "" , item: (currentRole === role ) ? `My Tutors` : ""}
           ]
   }
};
       
