import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { role } from 'services/course/helpers/PageHelpers';
import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { loadMeetings  } from 'services/course/actions/meetings';
// import { loadMeetings, saveMeeting } from 'services/course/actions/meetings';
import { setOperator  } from 'services/course/actions/operator';
import { loadUsers  } from 'services/course/actions/users';
import { loadGrades } from 'services/course/actions/grades';
import { loadLessons  } from 'services/course/actions/lessons';
import { enableTeachPlatform } from 'services/course/actions/classrooms';
// import { showJoinMeetingPopupAfterTheTutorStartsTheMeeting } from 'services/course/pages/Meeting/helpers';
import Swal from 'sweetalert2';

function useClassRoomComponentHook( operatorBusinessName, selectedUser, operator, selectedUserId, sessions, pushNotificationSubscribers ) {
    const [ dropDownDisplayOption, setDropDownDisplayOption ] = useState( "" );
    const [ listOfStudents, setListOfStudents ] = useState([]);
    const dispatch = useDispatch();

    let currentUser= useSelector(state => state.users.user);
    let selectedCourseFromLessonPlanCourseDropDown= useSelector(state => state.courses.selectedCourseFromLessonPlanCourseDropDown);
    let meetings= useSelector(state => Object.values( state.meetings.meetings ) );
    
    useEffect(() => {    
        if ( !operator ) {
            dispatch(setOperator(getItemFromSessionStorage('operator')));
        }

        if ( selectedCourseFromLessonPlanCourseDropDown ) {
            dispatch(loadLessons( selectedCourseFromLessonPlanCourseDropDown?._id ));
        }

        if ( listOfStudents?.length > 0 ){
            listOfStudents?.forEach( student => { 
                dispatch( loadGrades( student ) ); 
            }); 
        } 

        if ( (! listOfStudents[0]?.courses.includes( selectedCourseFromLessonPlanCourseDropDown?._id )) || (! selectedUser?.courses.includes( selectedCourseFromLessonPlanCourseDropDown?._id )) ) {
            setListOfStudents([]);
        }

        // let joinMeetingPopupConfig = {
        //     selectedCourseFromLessonPlanCourseDropDown, 
        //     currentUser, 
        //     operatorBusinessName, 
        //     meetings, 
        //     saveMeeting
        // };
        // if ( currentUser?.role === role.Student && currentUser?.lessonInProgress ) {
        //     showJoinMeetingPopupAfterTheTutorStartsTheMeeting( joinMeetingPopupConfig );
        // }

        dispatch( loadUsers() );
        dispatch( loadMeetings() );
    }, [ selectedCourseFromLessonPlanCourseDropDown ] ); 
    //  }, [ dispatch,  selectedCourseFromLessonPlanCourseDropDown, currentUser, listOfStudents, meetings, operator, operatorBusinessName, selectedUser?.courses] );

     const pushNotificationUsers = pushNotificationSubscribers?.filter(pushuser => listOfStudents?.find(student => student?._id === pushuser?.userId));

    function enableTeachCoursePlatform() {
        if ( ( currentUser?.role === role.Tutor && ( ( !listOfStudents ) || ( listOfStudents?.length === 0 )) ) ) {
            Swal.fire({
                title: `Please invite students before starting a new teaching session.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Invite.',
                confirmButtonColor: '#673ab7',
                cancelButtonText: 'Not now.'
            }).then( (response) => {
              if ( response?.value ) {
                  return;
              } else { 
                  dispatch( enableTeachPlatform( { listOfStudents, selectedTutorId: selectedUserId, operatorBusinessName, sessions, operator } ) );
              }
            }); 
        } else {
            dispatch( enableTeachPlatform( { listOfStudents, selectedTutorId: selectedUserId, operatorBusinessName, sessions, operator } ) );
        }
    }

    return {
        dropDownDisplayOption, 
        listOfStudents,
        pushNotificationUsers,
        setDropDownDisplayOption:( option ) => setDropDownDisplayOption( option ), 
        setListOfStudents: ( students ) => setListOfStudents( students ), 
        enableTeachCoursePlatform
    };
}

export default useClassRoomComponentHook;
