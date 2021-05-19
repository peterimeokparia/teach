import 
React, { 
useState, 
useEffect, 
useRef } from 'react';

import {
frequencyCollection,
days,
transformDateTime } from 'Services/course/Pages/CalendarPage/helpers';

import EventForm from 'Services/course/Pages/CalendarPage/Components/EventForm'
import './style.css'

// submitEvent,
// submitEventButtonText === Add / Save
// saveInProgress,
// onSaveError,
// setEndDate,
// endDate,
// days,
// setWeekDays,
// weekDays,
// setInterval,
// interval,
// setFrequency,
// frequencyCollection,
// handleRecurringEvent,
// setEventTitle,
// title,
// inputRef
// handleSubmit

const Events = ({
handleSubmit,    
saveInProgress,
onSaveError,
slotInfo,
currentUsers,
currentUser,
userId,
pushNotificationSubscribers,
operator,
addCalendarEvent  }) => {

const [ title, setEventTitle ] = useState('');
const [ recurringEvent, setRecurringEvent ] = useState(false);
const [ weekDays, setWeekDays ] = useState([]);
const [ endDate, setEndDate ] = useState(new Date()); 
const [ frequency, setFrequency ] = useState(''); 
const [ interval, setInterval ] = useState(1); 
const [ duration, setDuration ] = useState(1); 
const inputRef = useRef();

useEffect (() => {

    if ( inputRef ) {
        inputRef.current.focus();
    }
    
}, []); 

if ( saveInProgress ) {
    return <div>...loading</div>
} 

if ( onSaveError ) {
    return <div> { onSaveError.message } </div> ;
}

const handleRecurringEvent = (event) => {

    alert('test test')
    let isChecked = event.target.checked;
    let value = event.target.value;

    if ( isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(true)
    }

    if ( !isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(false)
    }
}

const submit = (e) => {
    e.preventDefault();

const [ start, end, startStr, endStr, allDay ] = Object.entries(slotInfo);

let event = {}
let dateTimeString = transformDateTime( startStr, endStr, undefined );    

if ( recurringEvent ) {

    event =  { 
        title: title,
        rrule: {
            freq: frequency,
            interval: interval,
            dtstart: dateTimeString?.resStartStr,
            until: dateTimeString?.resEndStr
        },
        duration
    };
    
} else {

    event = {
        title: title,
        allDay: allDay[1],
        start: dateTimeString?.resStartStr,
        end: dateTimeString?.resEndStr,
        duration
    };
}

handleSubmit(event);  
}

let eventFormConfig = {
    submit,
    submitEventButtonText:"Add New Event",
    saveInProgress,
    onSaveError,
    setEndDate,
    endDate,
    days,
    setWeekDays,
    weekDays,
    setInterval,
    interval,
    setFrequency,
    frequencyCollection,
    handleRecurringEvent,
    recurringEvent,
    setEventTitle,
    title,
    inputRef,
    handleSubmit
}

return (
    <div className="events">
        <h2>{`New Event`}</h2> 
        <br></br>
        <EventForm config={eventFormConfig}/>  
    </div>
)};

export default Events;