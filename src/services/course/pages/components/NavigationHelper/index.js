import { 
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

export const navContent = ( user, operatorBusinessName, currentRole, role, permissionDeniedGroup ) => { 
   operatorBusinessName = ( !operatorBusinessName ) ? getItemFromSessionStorage('operatorBusinessName') : operatorBusinessName;


   return { 
      users: permissionDeniedGroup?.includes(operatorBusinessName) 
         ?  getNavigationLinksBasedOnRoles( user?.role, user, operatorBusinessName )
         :  [ 
               { id: 1, hrefValue: `/${operatorBusinessName}/mycourses` , item: 'My Courses' },
               { id: 2, hrefValue: `/${operatorBusinessName}/courses` , item: 'All Courses' },
               { id: 3, hrefValue:  (currentRole === role ) ? `/${operatorBusinessName}/users` : "" , item: (currentRole === role ) ? `My Tutors` : "Tutors"},
               { id: 4, hrefValue: `/${operatorBusinessName}/students` , item: 'Students' },
               { id: 5, hrefValue: `/${operatorBusinessName}/forms` , item: 'Forms' },
               { id: 6, hrefValue: `/${operatorBusinessName}/forms/${formTypes.report}` , item: 'Reports' }
            ]
   };
};
       
function getNavigationLinksBasedOnRoles( userRole, user, operatorBusinessName ){

   switch (userRole) {
      case role.Tutor:
         return  [
            { id: 0, hrefValue: `/${operatorBusinessName}/users` , item: 'Tutors' }, 
            { id: 1, hrefValue: `/${operatorBusinessName}/students` , item: 'Students' },
         ];
      case role.Student:
         return  [
            { id: 0, hrefValue: `/${operatorBusinessName}/users` , item: 'Tutors' }, 
            { id: 1, hrefValue: `/${operatorBusinessName}/students` , item: 'Students' },
            { id: 2, hrefValue: `/${operatorBusinessName}/LessonPlan/StudyHall/${user?._id}` , item: 'Study Hall' },
         ];
      default:
         break;
   }
};
