import { 
useSelector, 
useDispatch } from 'react-redux';

import { 
useState, 
useEffect } from "react";

import { 
role } from 'Services/course/helpers/PageHelpers';

import {
loadMeetings,   
saveMeeting } from 'Services/course/Actions/Meetings';

import { 
loadUsers  } from 'Services/course/Actions/Users';

import {
loadGrades } from 'Services/course/Actions/Grades';

import{ 
loadLessons  } from 'Services/course/Actions/Lessons';

import {
showJoinMeetingPopupAfterTheTutorStartsTheMeeting } from 'Services/course/Pages/Meeting/helpers';

function useClassRoomComponentHook( operatorBusinessName, selectedUser ) {

    // let {
    //     operatorBusinessName, 
    //     selectedUser } = props;
        
    const [ dropDownDisplayOption, setDropDownDisplayOption ] = useState( "" );
    const [ listOfStudents, setListOfStudents ] = useState([]);
    const [ setUpdateUserTimerHandle, setNewMeetingTimerHandle ] = useState( undefined );
    const [ animateInvitationButton, setAnimationForEmailInvitationEffect ] = useState( false );
    const dispatch = useDispatch();

    let currentUser= useSelector(state => state.users.user);
    let selectedLessonFromLessonPlanDropDown= useSelector(state => state.lessons.selectedLessonFromLessonPlanDropDown);
    let selectedCourseFromLessonPlanCourseDropDown= useSelector(state => state.courses.selectedCourseFromLessonPlanCourseDropDown);
    let meetings= useSelector(state => Object.values( state.meetings.meetings ))
    
    useEffect(() => {    

        if ( selectedCourseFromLessonPlanCourseDropDown ) {
            dispatch(loadLessons( selectedCourseFromLessonPlanCourseDropDown?._id ));
        }

        listOfStudents.forEach( student => { 
            dispatch( loadGrades( student ) ); 
        });  

        if ( (! listOfStudents[0]?.courses.includes( selectedCourseFromLessonPlanCourseDropDown?._id )) || (! selectedUser?.courses.includes( selectedCourseFromLessonPlanCourseDropDown?._id )) ) {
            setListOfStudents([]);
        }

        let joinMeetingPopupConfig = {
            setUpdateUserTimerHandle, 
            selectedCourseFromLessonPlanCourseDropDown, 
            currentUser, 
            operatorBusinessName, 
            setNewMeetingTimerHandle, 
            meetings, 
            saveMeeting
        };

        if ( currentUser?.role === role.Student && currentUser?.lessonInProgress ) {
            showJoinMeetingPopupAfterTheTutorStartsTheMeeting( joinMeetingPopupConfig );
            setNewMeetingTimerHandle( undefined );
        }

        dispatch( loadUsers() );
        dispatch( loadMeetings() );
    }, [ loadGrades, loadLessons, loadUsers, selectedCourseFromLessonPlanCourseDropDown, selectedLessonFromLessonPlanDropDown, loadMeetings, saveMeeting ] );
 
    return {
        setDropDownDisplayOption:( option ) => setDropDownDisplayOption( option ), 
        setListOfStudents: ( students ) => setListOfStudents( students ), 
        setAnimationForEmailInvitationEffect: ( value ) => setAnimationForEmailInvitationEffect( value ),
        setNewMeetingTimerHandle: ( value ) => setNewMeetingTimerHandle( value ),
        dropDownDisplayOption, 
        listOfStudents,
        animateInvitationButton,
        setUpdateUserTimerHandle
    };
}

export default useClassRoomComponentHook;
