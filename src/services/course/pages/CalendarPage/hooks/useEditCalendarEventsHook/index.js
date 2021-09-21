import { 
useState, 
useRef, 
useEffect } from 'react';

import {
frequencyCollection,
getCurrentTimeInUsersLocale,
updateFrequencyCollection } from 'services/course/pages/CalendarPage/helpers';

import {
initializeEventForm } from 'services/course/pages/CalendarPage/components/EditCalendarEvents/helpers';

function useEditCalendarEventsHook( config ){
    let {
        currentEvent, 
        eventEnum,
        calendarEventType,
        onSubmit,
        setIsRecurringEvent,
        setSelectedItemId,
        setIsEditMode } = config;

    const initialValue = initializeEventForm( currentEvent );
    const [ title, setEventTitle ] = useState(initialValue?.title);
    const [ location, setEventLocation ] = useState(initialValue?.location);
    const [ start, setEventStartTime ] = useState(initialValue?.startTime);
    const [ end, setEventEndTime ] = useState(initialValue?.endTime);
    const [ allDay, setAllDay ] = useState(initialValue?.allDay);
    const [ recurringEvent, setRecurringEvent ] = useState(initialValue?.recurringEvent);   
    const [ weekDays, setWeekDays ] = useState(initialValue?.weekDays);
    const [ endDate, setEndDate ] = useState( getCurrentTimeInUsersLocale( initialValue?.endDate )?.format('YYYY-MM-DD') ); 
    const [ frequency, setFrequency ] = useState(initialValue?.frequency); 
    const [ interval, setInterval ] = useState(initialValue?.interval); 
    const [ duration, setDuration ] = useState(initialValue?.duration);
    const [ freqCollectionData, setFreqCollectionData ] = useState(frequencyCollection); 
    const [ startDateDateTime, setStartDateDateTime ] = useState((start) ? getCurrentTimeInUsersLocale( start )?.format('YYYY-MM-DD'): new Date()?.toLocaleDateString('en-US'));
    const [ endDateDateTime, setEndDateDateTime ] = useState((end) ? getCurrentTimeInUsersLocale( end )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
    const [ startTimeDateTime, setStartTimeDateTime ] = useState((start) ? getCurrentTimeInUsersLocale( start )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
    const [ endTimeDateTime, setEndTimeDateTime ] = useState((end) ? getCurrentTimeInUsersLocale( end )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
    const [ schedulingData, setSchedulingData ] = useState((calendarEventType === eventEnum.SessionScheduling && initialValue?.schedulingData?.length > 0) ? initialValue?.schedulingData : []);
    const [ consultation, setConsultation ] = useState((initialValue?.consultation !== undefined ) ? initialValue?.consultation : { coursesInterestedIn: [] });
    const [ editing, setEditing ] = useState(false);
    const inputRef = useRef();

    useEffect (() => {
        if ( editing ) {
            inputRef?.current?.focus();
        }
    }, [ editing ]); 

const reset = () => {
    setValues();
    setEditing(false);
};

const submit = (e) => {
    e.preventDefault();
    onSubmit({
        title, 
        start: `${startDateDateTime}T${startTimeDateTime}`, 
        end: `${endDateDateTime}T${endTimeDateTime}`,
        startDateDateTime,
        endDateDateTime,
        startTimeDateTime,
        endTimeDateTime,
        recurringEvent,
        weekDays,
        endDate,
        frequency, 
        interval,
        duration,
        consultation,
        schedulingData,
        location
    }).then(reset)
     .catch( error => {
        setEditing(false);
        setEditing(true);
        console.error( error );
    });
 };

 const handleRecurringEvent = (e) => {
    let isChecked = e.target.checked;
    let value = e.target.value;

    if ( isChecked && ( value === eventEnum.isRecurring ) ) {
        setRecurringEvent(true);
        if ( editing ) {
            setIsRecurringEvent(true);
        }
    }
    if ( !isChecked && ( value === eventEnum.isRecurring ) ) {
        setRecurringEvent(false);
        if ( editing ) {
            setIsRecurringEvent(false);
            setFrequency('Select');
            updateFrequencyCollection(frequency, setFreqCollectionData);
        };
    };  
};

const handleAllDayEvent = (e) => {  
   let isChecked = e.target.checked;
   let value = e.target.value;

   if ( isChecked && ( value === eventEnum.isAllDay ) ) {   
        setAllDay(true);
   }
   if ( !isChecked && ( value === eventEnum.isAllDay ) ) {
       setAllDay(false);
   }  
};

const beginEditing = ( selectedItem ) => {
    setValues();
    setEditing(true);
    setSelectedItemId(selectedItem?._id);
    setIsEditMode(true);

    if ( selectedItem?.event?.recurringEvent ) {
        setIsRecurringEvent(true);
        updateFrequencyCollection(frequency, setFreqCollectionData);
    }  
};

function setValues () {
    setEventTitle((initialValue?.title === 'Available') ? '' : initialValue?.title );
    setEventLocation(initialValue?.location);
    setEventStartTime(initialValue?.startTime);
    setEventEndTime(initialValue?.endTime);
    setRecurringEvent(initialValue?.recurringEvent);
    setWeekDays(initialValue?.weekDays);
    setEndDate( getCurrentTimeInUsersLocale( initialValue?.endDate )?.format('YYYY-MM-DD') );
    setFrequency(initialValue?.frequency);
    setInterval(initializeEventForm?.interval);
    setDuration(initializeEventForm?.duration);
    setConsultation((initialValue?.consultation !== undefined ) ? initialValue?.consultation : { coursesInterestedIn: [] });
    setSchedulingData((calendarEventType === eventEnum.SessionScheduling && initialValue?.schedulingData?.length > 0) ? initialValue?.schedulingData : []);
    setStartDateDateTime((start) ? getCurrentTimeInUsersLocale( start )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
    setEndDateDateTime((end) ? getCurrentTimeInUsersLocale( end )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
    setStartTimeDateTime((start) ? getCurrentTimeInUsersLocale( start )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
    setEndTimeDateTime((end) ? getCurrentTimeInUsersLocale( end )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
};

return {
    title,
    location,
    start,
    end,
    allDay,
    recurringEvent,
    weekDays,
    endDate,
    frequency,
    interval,
    duration,
    freqCollectionData,
    startDateDateTime,
    endDateDateTime,
    startTimeDateTime,
    endTimeDateTime, 
    schedulingData,
    editing,
    inputRef,
    setEventTitle: (val) => setEventTitle( val ),
    setEventLocation: (val) => setEventLocation( val ),
    setEventStartTime: (val) => setEventStartTime( val ),
    setEventEndTime: (val) => setEventEndTime( val ),
    setAllDay: (val) => setAllDay( val ),
    setRecurringEvent: (val) => setRecurringEvent( val ),
    setWeekDays: (val) => setWeekDays( val ),
    setEndDate: (val) => setEndDate( val ),
    setFrequency: (val) => setFrequency( val ),
    setInterval: (val) => setInterval( val ),
    setDuration: (val) => setDuration( val ),
    setFreqCollectionData: (val) => setFreqCollectionData( val ),
    setStartDateDateTime: (val) => setStartDateDateTime( val ),
    setEndDateDateTime: (val) => setEndDateDateTime( val ),
    setStartTimeDateTime: (val) => setStartTimeDateTime( val ),
    setEndTimeDateTime: (val) => setEndTimeDateTime( val ),
    setConsultation: (val) => setConsultation( val ),
    setSchedulingData: (val) => setSchedulingData( val ),
    setEditing: (val) => setEditing( val ),
    reset,
    submit,
    handleRecurringEvent,
    handleAllDayEvent,
    beginEditing
}; };

export default useEditCalendarEventsHook;