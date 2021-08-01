import { 
useState, 
useEffect, 
useRef } from 'react';

import {
frequencyCollection,
days,
transformDateTime } from 'services/course/pages/CalendarPage/helpers';

import EventForm from 'services/course/pages/CalendarPage/components/EventForm'
import './style.css'

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
    let isChecked = event.target.checked;
    let value = event.target.value;

    if ( isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(true)
    }

    if ( !isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(false)
    }
}

const submit = (e, formData) => {
    e.preventDefault();

const [ start, end, startStr, endStr, allDay ] = Object.entries(slotInfo);

let event = {}
let dateTimeString = transformDateTime( startStr, endStr, undefined );    

if ( recurringEvent ) {
    event =  { 
        title: formData?.title,
        rrule: {
            freq: formData?.frequency,
            interval: formData?.interval,
            dtstart: dateTimeString?.resStartStr,
            until: dateTimeString?.resEndStr
        },
        duration
    };
    
} else {
    event = {
        title: formData?.title,
        allDay: formData?.allDay[1],
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