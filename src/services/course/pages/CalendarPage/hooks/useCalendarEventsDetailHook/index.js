import { 
useEffect, 
useState } from 'react';

import { 
useDispatch } from 'react-redux';

import {
loadAllCalendars } from 'services/course/actions/calendar';

import {
loadAllEvents } from 'services/course/actions/event';

import {
loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';

import {
style } from 'services/course/pages/CalendarPage/helpers';

function useCalendarEventsDetailHook(){
    const [ isRecurringEvent, setIsRecurringEvent ] = useState(false);
    const [ isEditMode, setIsEditMode ]  = useState(false);
    const [ selectedItemId, setSelectedItemId ] = useState('');
    const [ ShowAllCalendarEvents, setShowAllCalendarEvents ] = useState(false);
    let [ liClassNameEditView, setLiClassNameEditView ] = useState(style.eventListBodyEditRecurring);
    let [ liClassName, setLiClassName ] = useState(style.eventListBody);

    const dispatch = useDispatch();

    useEffect(( ) => {
        dispatch( loadAllEvents() );
        dispatch( loadAllCalendars() );
        dispatch( loadSubscribedPushNotificationUsers() );   

        if ( isEditMode  ) {
            setLiClassName( style.eventListBodyEdit );
            setLiClassNameEditView( style.eventListBodyEditRecurring ); 
        }

        if (  isRecurringEvent ) {
            setLiClassName( style.eventListBodyEdit );
            setLiClassNameEditView( style.eventListBodyEditRecurring ); 
        }
    }, [ dispatch,  isEditMode, isRecurringEvent, setLiClassName, setLiClassNameEditView ]);
return {
    liClassName,
    liClassNameEditView,
    isRecurringEvent, 
    isEditMode, 
    selectedItemId, 
    ShowAllCalendarEvents, 
    setLiClassName: (val) => setLiClassName( val ),
    setLiClassNameEditView: (val) => setLiClassNameEditView( val ),
    setIsRecurringEvent: (val) => setIsRecurringEvent( val ),
    setIsEditMode: (val) => setIsEditMode( val ),
    setSelectedItemId: (val) => setSelectedItemId( val ),
    setShowAllCalendarEvents: (val) => setShowAllCalendarEvents( val ),
}; };

export default useCalendarEventsDetailHook;