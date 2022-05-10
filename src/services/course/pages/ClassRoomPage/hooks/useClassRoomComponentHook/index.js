import { 
useSelector, 
useDispatch } from 'react-redux';

import { 
useState, 
useEffect } from "react";

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import {
loadMeetings,   
saveMeeting } from 'services/course/actions/meetings';

import { 
setOperator  } from 'services/course/actions/operator';

import { 
loadUsers  } from 'services/course/actions/users';

import {
loadGrades } from 'services/course/actions/grades';

import{ 
loadLessons  } from 'services/course/actions/lessons';

import {
showJoinMeetingPopupAfterTheTutorStartsTheMeeting } from 'services/course/pages/Meeting/helpers';

function useClassRoomComponentHook( operatorBusinessName, selectedUser, operator ) {
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

        let joinMeetingPopupConfig = {
            selectedCourseFromLessonPlanCourseDropDown, 
            currentUser, 
            operatorBusinessName, 
            meetings, 
            saveMeeting
        };

        if ( currentUser?.role === role.Student && currentUser?.lessonInProgress ) {
            showJoinMeetingPopupAfterTheTutorStartsTheMeeting( joinMeetingPopupConfig );
        }
        dispatch( loadUsers() );
        dispatch( loadMeetings() );
     }, [ dispatch, loadGrades, loadLessons, loadUsers, selectedCourseFromLessonPlanCourseDropDown, loadMeetings, saveMeeting ] );

    return {
        setDropDownDisplayOption:( option ) => setDropDownDisplayOption( option ), 
        setListOfStudents: ( students ) => setListOfStudents( students ), 
        dropDownDisplayOption, 
        listOfStudents,
    };
}

export default useClassRoomComponentHook;
