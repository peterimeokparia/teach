import React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import {
saveCalendarEvent,
deleteCalendar } from 'Services/course/Actions/Calendar';

import {
saveTimeLine } from 'Services/course/Actions/TimeLines'; 

import {
frequencyCollection,
days,
eventEnum,
getTimeLineItemDetailsFromCalendarEvents } from 'Services/course/Pages/CalendarPage/helpers';

import {
studentsOption } from 'Services/course/Pages/CalendarPage/helpers';

import SessionScheduling from 'Services/course/Pages/CalendarPage/Components/SessionScheduling';
import EventForm from 'Services/course/Pages/CalendarPage/Components/EventForm';
import moment from "moment";

const EditCalendarEvents = ({
saveInProgress,  
onSaveError, 
error,
className,
onSubmit,
currentUser,
currentUsers,
calendar,
calendars,
pushNotificationSubscribers,
deleteCalendar,
saveCalendarEvent,
testAdminUsers,
emailAddresses,
currentEvent,
setIsRecurringEvent,
calendarEventType,
setIsEditMode,
setSelectedItemId,
timeLines,
saveTimeLine,
children }) => {

let titleInitialValue = currentEvent ? currentEvent?.title : '';
let startTimeInitialValue = currentEvent ?  ( currentEvent?.rrule ) ? currentEvent?.rrule?.dtstart : currentEvent?.start : new Date();
let endTimeInitialValue = currentEvent ? currentEvent?.end : new Date();
let allDayInitialValue = currentEvent ? currentEvent?.allDay : false;
let recurringEventInitialValue = currentEvent ?  ( currentEvent?.rrule ) ? true :  currentEvent?.recurringEvent : false;
let weekDaysInitialValue = currentEvent ? currentEvent?.weekDays : [];
let endDateInitialValue = ( currentEvent?.rrule ) ? currentEvent?.rrule?.until : new Date(); 
let frequencyInitialValue = currentEvent ? currentEvent?.rrule?.freq : '';
let intervalInitialValue = currentEvent ? currentEvent?.rrule?.interval : 1;
let durationInitialValue = currentEvent ? currentEvent?.duration : 1;
let formDataInitialValue = currentEvent ? currentEvent?.formData : {} ;

const [ title, setEventTitle ] = useState(titleInitialValue);
const [ start, setEventStartTime ] = useState(startTimeInitialValue);
const [ end, setEventEndTime ] = useState(endTimeInitialValue);
const [ allDay, setAllDay ] = useState(allDayInitialValue);
const [ recurringEvent, setRecurringEvent ] = useState(recurringEventInitialValue);   
const [ weekDays, setWeekDays ] = useState(weekDaysInitialValue);
const [ endDate, setEndDate ] = useState(endDateInitialValue); 
const [ frequency, setFrequency ] = useState(frequencyInitialValue); 
const [ interval, setInterval ] = useState(intervalInitialValue); 
const [ duration, setDuration ] = useState(durationInitialValue);
const [ editing, setEditing ] = useState(false); 
const [ freqCollectionData, setFreqCollectionData ] = useState(frequencyCollection); 
const [ startDateDateTime, setStartDateDateTime ] = useState((start) ? start?.split('T')[0] : new Date()?.toLocaleDateString('en-US'));
const [ endDateDateTime, setEndDateDateTime ] = useState((end) ? end?.split('T')[0] : new Date()?.toLocaleDateString('en-US'));
const [ startTimeDateTime, setStartTimeDateTime ] = useState((start) ? start?.split('T')[1] : new Date()?.toLocaleTimeString('en-US'));
const [ endTimeDateTime, setEndTimeDateTime ] = useState((end) ? end?.split('T')[1] : new Date()?.toLocaleTimeString('en-US'));
const [ scheduledStudents, setScheduledStudents ] = useState((calendarEventType === eventEnum.SessionScheduling) ? formDataInitialValue?.formData : []);
const [ location, setEventLocation ] = useState((formDataInitialValue?.formData?.location ) ? formDataInitialValue?.formData?.location : '');
const inputRef = useRef();

useEffect (() => {

    if ( editing ) {
        inputRef.current.focus();
    }
}, [ editing ]); 

if ( saveInProgress ) {
    return <div>...loading</div>
} 

if ( onSaveError ) {
    return <div> { onSaveError.message } </div> ;
}

const reset = () => {
    setValues();
    setEditing(false);
}

const submit = (e) => {
    e.preventDefault();
    onSubmit({
        title, 
        start: `${startDateDateTime}T${startTimeDateTime}`, // fix issue with wrong time format
        end: `${endDateDateTime}T${endTimeDateTime}`, // fix issue with wrong time format
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
        scheduledStudents,
        location
    }).then(reset)
     .catch( error => {
        setEditing(false);
        setEditing(true);
    });
    
    let timeLine = timeLines?.find(timeLine => timeLine?.timeLineName === calendarEventType );
    alert('testUpdatedTimeLineItems before delete');
    alert( JSON.stringify( timeLine ) );

    let items = timeLine?.items.filter(item => item?.id.includes( currentEvent?.id ));

    if ( items?.length > 1 && !recurringEvent ) {

        let itemIdsToUpdate = timeLine?.items?.filter(item => item?.id.includes( currentEvent?.id ) && item?.isRecurringEvent)?.map( items => items?.id );

        timeLine = {...timeLine, items: timeLine?.items?.filter(item => !itemIdsToUpdate.includes(item?.id)) }
       
        timeLine = { 
            ...timeLine,
            items:{
                ...timeLine.items, 
                id:`${currentEvent?.id}_${timeLine?.items?.length + 1}`,
                title,
                start_time: moment(`${startDateDateTime}T${startTimeDateTime}`).local().format(),
                end_time: moment(`${endDateDateTime}T${endTimeDateTime}`).local().format(),
                isRecurringEvent: recurringEvent
            }         
         }
    }

    if ( items?.length > 1 && recurringEvent ) {
        timeLine = {...timeLine, items: timeLine?.items.filter(item => !item.includes(currentEvent?.id)) }

        let config = {
            title, 
            frequency,
            duration, 
            calendarEventType,
            calendars,
            eventId: currentEvent?.id,  
            calendarId: calendar?._id, 
            isRecurringEvent: recurringEvent,
            users: currentUsers,
            timeLines: {...timeLines, timeLine },
            initialDateStartTime: `${startDateDateTime}T${startTimeDateTime}`,
            initialDateEndTime: ( recurringEvent ) ? `${moment(`${endDate}T${endTimeDateTime}`)?.local().format('YYYY-MM-DD[T]HH:mm:ss') }` : `${endDateDateTime}T${endTimeDateTime}`  } // fix 

            timeLine = getTimeLineItemDetailsFromCalendarEvents( config )
    }

    let testUpdatedTimeLineItem = { ...timeLine, items };
    alert('testUpdatedTimeLineItems after delete');
    alert( JSON.stringify( testUpdatedTimeLineItem ) );
 
    alert('timeLine timeLine timeLine');
    alert( JSON.stringify( timeLine ) );
    saveTimeLine( timeLine );
 };

 const handleRecurringEvent = (e) => {
    let isChecked = e.target.checked;
    let value = e.target.value;

    if ( isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(true);

        if ( editing ) {
            setIsRecurringEvent(true);
        }
    }

    if ( !isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(false);

        if ( editing ) {
            setIsRecurringEvent(false);
        }
    }  
}

const handleAllDayEvent = (e) => {
  
   let isChecked = e.target.checked;
   let value = e.target.value;

   if ( isChecked && (value === 'isAllDay') ) {
        setAllDay(true)
   }

   if ( !isChecked && (value === 'isAllDay') ) {
       setAllDay(false)
   }  
}

const beginEditing = ( selectedItem ) => {
    setValues();
    setEditing(true);
    setSelectedItemId(selectedItem?.id);
    setIsEditMode(true);

    if ( selectedItem?.rrule ) {
        setIsRecurringEvent(true);
        updateFrequencyCollection(frequency);
    }  
}

const performDelete = () => {
let calendarEvents = calendar?.calendarEvents?.filter(eventToRemove => eventToRemove?.id !== currentEvent?.id );
saveCalendarEvent( 
{ 
    ...calendar, 
    calendarEvents 
},
    currentEvent,
    currentUser,
    pushNotificationSubscribers?.filter(subscriber => testAdminUsers.includes( subscriber?.userId ) ),
    emailAddresses
); 

let timeLine = timeLines?.find(timeLine => timeLine?.timeLineName === calendarEventType );
let items = timeLine?.items.filter(item => !item?.id.includes( currentEvent?.id ));
let testUpdatedTimeLineItem = { ...timeLine, items };
 //update items on the backEnd with action
    if ( timeLine ) {
        saveTimeLine( testUpdatedTimeLineItem );
    }
}
    

const performDeleteAll = ( calendar ) => {
    deleteCalendar(calendar, currentUser, pushNotificationSubscribers);
}

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
}
 
function setValues () {
    setEventTitle(titleInitialValue);
    setEventStartTime(startTimeInitialValue);
    setEventEndTime(endTimeInitialValue);
    setRecurringEvent(recurringEventInitialValue);
    setWeekDays(weekDaysInitialValue);
    setEndDate(endDateInitialValue);
    setFrequency(frequencyInitialValue);
    setInterval(intervalInitialValue);
    setDuration(durationInitialValue);
    setEventLocation((formDataInitialValue?.formData?.location ) ? formDataInitialValue?.formData?.location : '');
    setScheduledStudents((calendarEventType === eventEnum.SessionScheduling) ? formDataInitialValue?.formData : []);
    setStartDateDateTime((start) ? start?.split('T')[0] : new Date()?.toLocaleDateString('en-US'));
    setEndDateDateTime((end) ? end?.split('T')[0] : new Date()?.toLocaleDateString('en-US'));
    setStartTimeDateTime((start) ? start?.split('T')[1] : new Date()?.toLocaleTimeString('en-US'));
    setEndTimeDateTime((end) ? end?.split('T')[1] : new Date()?.toLocaleTimeString('en-US'));
}

function updateFrequencyCollection( freq ) {

    if ( freq ) {

        let freqObject = frequencyCollection?.filter(item => item?.id !== freq );
        let testfreqObject = freqObject?.find(item => item?.id === 'Select');

       if ( testfreqObject ) {
            testfreqObject['name'] = freq;
            testfreqObject['_id'] = freq;
            testfreqObject['id'] = freq;
       }
       setFreqCollectionData( freqObject );
    }  
}

let eventFormConfig =  {
    submit,
    submitEventButtonText: "Edit Event",
    saveInProgress,
    onSaveError,
    setEndDate,
    endDate,
    days,
    setWeekDays,
    weekDays,
    setInterval,
    interval,
    frequency,
    setFrequency,
    frequencyCollection,
    freqCollectionData,
    handleRecurringEvent,
    handleAllDayEvent,
    recurringEvent,
    setRecurringEvent,
    setEventTitle,
    title,
    inputRef,
    cancelEdit,
    start,
    setEventStartTime,
    end,
    setEventEndTime,
    allDay, 
    setAllDay,
    startDateDateTime,
    setStartDateDateTime,
    endDateDateTime,
    setEndDateDateTime,
    startTimeDateTime,
    setStartTimeDateTime,
    endTimeDateTime,
    setEndTimeDateTime,
    className: `${className || ''} editing ${error ? 'error' : ''}`,
    editing,
    recurringEvent,
    location, 
    setEventLocation
}

return editing ? (
           <> 
                <span className="events"> 
                {(calendarEventType === eventEnum.SessionScheduling) &&  
                    <SessionScheduling 
                        scheduledStudents={scheduledStudents}
                        onChange={setScheduledStudents}
                        options={studentsOption(currentUsers)}
                    /> 
                }
                    <EventForm config={eventFormConfig}/> 
                 <br></br>
                <form
                    className= {`${className || ''} editing ${error ? 'error' : ''}`} 
                >
                    <span>
                    <input
                        ref={ inputRef }
                        name="reset"
                        type="submit"
                        value={'Reset'}
                        onChange={ cancelEdit }
                    >
                    </input> 
                    </span>         
                </form>
                </span>
                   {error && <div>{error.message}</div>}
           </>
            ) : ( 
                   children(beginEditing, performDelete, performDeleteAll)
                );                         
};

export default connect(null, { saveCalendarEvent, deleteCalendar, saveTimeLine } )(EditCalendarEvents);