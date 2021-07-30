import { 
useState, 
useEffect } from "react";

import { 
useDispatch } from 'react-redux';

import { 
loadUsers } from "Services/course/Actions/Users";

import { 
loadAllCalendars } from 'Services/course/Actions/Calendar';

import {   
loadAllEvents } from 'Services/course/Actions/Event';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

function useAddNewCalendarHook(){
    const [ selectedTutors,  setSelctedTutors ] = useState([]);
    const [ calendarType,  setCalendarType ] = useState([]);
    const dispatch = useDispatch();

    useEffect(( ) => {
        dispatch( loadAllCalendars() );
        dispatch( loadAllEvents() );
        dispatch( loadSubscribedPushNotificationUsers() );
        dispatch( loadUsers() );
    },[  dispatch ]);
    //    },[ loadAllCalendars, loadSubscribedPushNotificationUsers, loadAllEvents, loadUsers,  ]);

const onChange = ( data ) => {
    setSelctedTutors( data );
};

return {
    selectedTutors,  
    calendarType,  
    onChange: ( val ) => onChange( val ),
    setSelctedTutors: ( val ) => setSelctedTutors( val ),
    setCalendarType: (val ) => setCalendarType( val )
}; };

export default useAddNewCalendarHook;