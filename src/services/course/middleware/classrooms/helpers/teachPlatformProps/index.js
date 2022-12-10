import { getLessonPlanUrls, getselectedTutor } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';

export function initializeTeachPlatform( meeting, store ) {
    if ( !meeting ) return Error('Initialize meeting props');

    let listOfStudents = meeting?.listOfStudents;
    let sessions = meeting?.sessions;
    let operatorBusinessName = meeting?.operatorBusinessName;
    let operator = Object.values( store?.getState()?.operators?.operators )?.find(ops => ops?.businessName === operatorBusinessName );
    let selectedTutorId = meeting?.selectedTutorId;
    let selectedLessonFromLessonPlanDropDown = store?.getState().lessons.selectedLessonFromLessonPlanDropDown;
    let selectedCourseFromLessonPlanCourseDropDown = store?.getState().courses.selectedCourseFromLessonPlanCourseDropDown;
    let pushNotificationSubscribers = Object.values( store?.getState()?.notifications?.pushNotificationSubscribers )?.filter( subscriber => subscriber?.operatorId === meeting?.operator?._id );
    let currentUser = store?.getState()?.users?.user;
     //users = Object.values( store?.getState()?.users?.users )?.filter( users => users?.operatorId === meeting?.operator?._id );// change back to this organization
    let users = Object.values( store?.getState()?.users?.users ); // test
    let selectedTutor = getselectedTutor( users, selectedTutorId );
    let url = getLessonPlanUrls( operatorBusinessName, selectedTutorId );

    return {
       listOfStudents,
       sessions,
       operatorBusinessName,
       operator,
       selectedTutorId,
       selectedLessonFromLessonPlanDropDown,
       selectedCourseFromLessonPlanCourseDropDown,
       pushNotificationSubscribers,
       currentUser,
       users,
       selectedTutor,
       url
     }
}