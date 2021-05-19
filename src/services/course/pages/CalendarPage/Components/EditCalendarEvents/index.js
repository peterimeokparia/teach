import React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import {
saveCalendar,
deleteCalendar } from 'Services/course/Actions/Calendar';

import {
saveTimeLine } from 'Services/course/Actions/TimeLines'; 

import {
frequencyCollection,
days,
eventEnum,
getTimeLineItemDetailsFromCalendarEvents,
getCurrentTimeInUsersLocale,
updateFrequencyCollection } from 'Services/course/Pages/CalendarPage/helpers';

import {
studentsOption } from 'Services/course/Pages/CalendarPage/helpers';

import SessionScheduling from 'Services/course/Pages/CalendarPage/Components/SessionScheduling';
import EventForm from 'Services/course/Pages/CalendarPage/Components/EventForm';

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
saveCalendar,
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

let titleInitialValue = currentEvent ? currentEvent?.event?.title : '';
let locationInitialValue = currentEvent ? currentEvent?.location : '';
let startTimeInitialValue = currentEvent ?  ( currentEvent?.event?.recurringEvent ) ? currentEvent?.event?.rrule?.dtstart : currentEvent?.event?.start : new Date();
let endTimeInitialValue = currentEvent ? currentEvent?.event?.end : new Date();
let allDayInitialValue = currentEvent ? currentEvent?.event?.allDay : false;
let recurringEventInitialValue = currentEvent ?  ( currentEvent?.event?.recurringEvent ) : false;
let weekDaysInitialValue = currentEvent ? currentEvent?.event?.weekDays : [];
let endDateInitialValue = ( currentEvent?.event?.recurringEvent ) ? currentEvent?.event?.rrule?.until : new Date(); 
let frequencyInitialValue = currentEvent ? currentEvent?.event?.rrule?.freq : '';
let intervalInitialValue = currentEvent ? currentEvent?.event?.rrule?.interval : 1;
let durationInitialValue = currentEvent ? currentEvent?.event?.duration : 1;
let schedulingDataInitialValue = ( currentEvent?.schedulingData?.length > 0 ) ? currentEvent?.schedulingData : [] ;

const [ title, setEventTitle ] = useState(titleInitialValue);
const [ location, setEventLocation ] = useState(locationInitialValue);
const [ start, setEventStartTime ] = useState(startTimeInitialValue);
const [ end, setEventEndTime ] = useState(endTimeInitialValue);
const [ allDay, setAllDay ] = useState(allDayInitialValue);
const [ recurringEvent, setRecurringEvent ] = useState(recurringEventInitialValue);   
const [ weekDays, setWeekDays ] = useState(weekDaysInitialValue);
const [ endDate, setEndDate ] = useState( getCurrentTimeInUsersLocale( endDateInitialValue )?.format('YYYY-MM-DD') ); 
const [ frequency, setFrequency ] = useState(frequencyInitialValue); 
const [ interval, setInterval ] = useState(intervalInitialValue); 
const [ duration, setDuration ] = useState(durationInitialValue);
const [ editing, setEditing ] = useState(false); 
const [ freqCollectionData, setFreqCollectionData ] = useState(frequencyCollection); 
const [ startDateDateTime, setStartDateDateTime ] = useState((start) ? getCurrentTimeInUsersLocale( start )?.format('YYYY-MM-DD'): new Date()?.toLocaleDateString('en-US'));
const [ endDateDateTime, setEndDateDateTime ] = useState((end) ? getCurrentTimeInUsersLocale( end )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
const [ startTimeDateTime, setStartTimeDateTime ] = useState((start) ? getCurrentTimeInUsersLocale( start )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
const [ endTimeDateTime, setEndTimeDateTime ] = useState((end) ? getCurrentTimeInUsersLocale( end )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
const [ schedulingData, setSchedulingData ] = useState((calendarEventType === eventEnum.SessionScheduling && schedulingDataInitialValue?.length > 0) ? schedulingDataInitialValue : []);
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
        schedulingData,
        location
    }).then(reset)
     .catch( error => {
        setEditing(false);
        setEditing(true);
    });
    
    // let timeLine = timeLines?.find(timeLine => timeLine?.timeLineName === calendarEventType );
    // alert('testUpdatedTimeLineItems before delete');
    // alert( JSON.stringify( timeLine ) );

    // let items = timeLine?.items.filter(item => item?.id.includes( currentEvent?.event?.id ));

    // if ( items?.length > 1 && !recurringEvent ) { // when would this be true?

    //     let itemIdsToUpdate = timeLine?.items?.filter(item => item?.id.includes( currentEvent?.event?.id ) && item?.isRecurringEvent)?.map( items => items?.id );

    //     timeLine = {...timeLine, items: timeLine?.items?.filter(item => !itemIdsToUpdate.includes(item?.id)) }
       
    //     timeLine = { 
    //         ...timeLine,
    //         items:{
    //             ...timeLine.items, 
    //             id:`${currentEvent?.event?.id}_${timeLine?.items?.length + 1}`,
    //             title,
    //             start_time: moment(`${startDateDateTime}T${startTimeDateTime}`).local().format(),
    //             end_time: moment(`${endDateDateTime}T${endTimeDateTime}`).local().format(),
    //             isRecurringEvent: recurringEvent
    //         }         
    //      }
    // }

    // if ( items?.length > 1 && recurringEvent ) {
    //     timeLine = {...timeLine, items: timeLine?.items.filter(item => !item.includes(currentEvent?.event?.id)) }

    //     let config = {
    //         title, 
    //         frequency,
    //         duration, 
    //         calendarEventType,
    //         calendars,
    //         eventId: currentEvent?.event?.id,  
    //         calendarId: calendar?._id, 
    //         isRecurringEvent: recurringEvent,
    //         users: currentUsers,
    //         timeLines: {...timeLines, timeLine },
    //         initialDateStartTime: `${startDateDateTime}T${startTimeDateTime}`,
    //         initialDateEndTime: ( recurringEvent ) ? `${moment(`${endDate}T${endTimeDateTime}`)?.local().format('YYYY-MM-DD[T]HH:mm:ss') }` : `${endDateDateTime}T${endTimeDateTime}`  } // fix 

    //         timeLine = getTimeLineItemDetailsFromCalendarEvents( config )
    // }

    // let testUpdatedTimeLineItem = { ...timeLine, items };
    // alert('testUpdatedTimeLineItems after delete');
    // alert( JSON.stringify( testUpdatedTimeLineItem ) );
 
    // alert('timeLine timeLine timeLine');
    // alert( JSON.stringify( timeLine ) );
    // saveTimeLine( timeLine );
 };

 const handleRecurringEvent = (e) => {
    let isChecked = e.target.checked;
    let value = e.target.value;

    if ( isChecked && ( value === 'isRecurring' ) ) {
        setRecurringEvent(true);

        if ( editing ) {
            setIsRecurringEvent(true);
        }
    }

    if ( !isChecked && ( value === 'isRecurring' ) ) {
        setRecurringEvent(false);

        if ( editing ) {
            setIsRecurringEvent(false);
            setFrequency('Select');
            updateFrequencyCollection(frequency, setFreqCollectionData);
        }
    }  
}

const handleAllDayEvent = (e) => {  
   let isChecked = e.target.checked;
   let value = e.target.value;

   if ( isChecked && ( value === 'isAllDay' ) ) {
        setAllDay(true)
   }

   if ( !isChecked && ( value === 'isAllDay' ) ) {
       setAllDay(false)
   }  
}

const beginEditing = ( selectedItem ) => {
    setValues();
    setEditing(true);
    setSelectedItemId(selectedItem?._id);
    setIsEditMode(true);

    if ( selectedItem?.event?.recurringEvent ) {
        setIsRecurringEvent(true);
        updateFrequencyCollection(frequency, setFreqCollectionData);
    }  
}

const performDelete = () => { // change to saveEvent
    let calendarEvents = calendar?.calendarEvents?.filter(eventToRemove => eventToRemove?.id !== currentEvent?.event?.id );
    saveCalendar( 
    { 
        ...calendar, 
        calendarEvents 
    },
        currentEvent,
        currentUser,
        pushNotificationSubscribers?.filter(subscriber => testAdminUsers.includes( subscriber?.userId ) ),
        emailAddresses
    ); 

// let timeLine = timeLines?.find(timeLine => timeLine?.timeLineName === calendarEventType );
// let items = timeLine?.items.filter(item => !item?.id.includes( currentEvent?.event?.id ));
// let testUpdatedTimeLineItem = { ...timeLine, items };
//  //update items on the backEnd with action
//     if ( timeLine ) {
//         saveTimeLine( testUpdatedTimeLineItem );
//     }

}
    
const performDeleteAll = ( calendar ) => { // change??
    deleteCalendar(calendar, currentUser, pushNotificationSubscribers);
}

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
}
 
function setValues () {
    setEventTitle(titleInitialValue);
    setEventLocation(locationInitialValue);
    setEventStartTime(startTimeInitialValue);
    setEventEndTime(endTimeInitialValue);
    setRecurringEvent(recurringEventInitialValue);
    setWeekDays(weekDaysInitialValue);
    setEndDate( getCurrentTimeInUsersLocale( endDateInitialValue )?.format('YYYY-MM-DD') );
    setFrequency(frequencyInitialValue);
    setInterval(intervalInitialValue);
    setDuration(durationInitialValue);
    setSchedulingData((calendarEventType === eventEnum.SessionScheduling && schedulingDataInitialValue?.length > 0) ? schedulingDataInitialValue : []);
    setStartDateDateTime((start) ? getCurrentTimeInUsersLocale( start )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
    setEndDateDateTime((end) ? getCurrentTimeInUsersLocale( end )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
    setStartTimeDateTime((start) ? getCurrentTimeInUsersLocale( start )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
    setEndTimeDateTime((end) ? getCurrentTimeInUsersLocale( end )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
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
    location, 
    setEventLocation
}

return editing ? (
           <> 
                <span className="events"> 
                {(calendarEventType === eventEnum.SessionScheduling) &&  
                    <SessionScheduling 
                        scheduledStudents={schedulingData}
                        onChange={setSchedulingData}
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

export default connect(null, { saveCalendar, deleteCalendar, saveTimeLine } )(EditCalendarEvents);