import { 
useState, 
useEffect } from "react";

import { 
useDispatch } from 'react-redux';

import { 
loadUsers } from "services/course/actions/users";

import { 
loadAllCalendars } from 'services/course/actions/calendar';

import {   
loadAllEvents } from 'services/course/actions/event';

import {
loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';

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