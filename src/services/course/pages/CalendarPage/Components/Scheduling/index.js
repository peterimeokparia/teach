import 
React, { 
useState, 
useEffect, 
useRef } from 'react';

import {
frequencyCollection,
days,
transformDateTime,
datePatternIncludesTimeSequence,
getDate,
getTime } from 'Services/course/Pages/CalendarPage/helpers';

import { 
Validations } from 'Services/course/helpers/Validations';

import EventForm from 'Services/course/Pages/CalendarPage/Components/EventForm';
import './style.css';
import { stringAssembler } from 'Services/editor/etherpad-lite/src/static/js/Changeset';

const Scheduling = ({  
handleSubmit,
formData, 
saveInProgress,
onSaveError,
slotInfo,
submitEventButtonText,
children }) => {

const [ title, setEventTitle ] = useState('');
const [ location, setEventLocation ] = useState('');
const [ start, setEventStartTime ] = useState(undefined);
const [ end, setEventEndTime ] = useState(undefined);
const [ duration, setDuration ] = useState(1);
const [ startPrev, setEventStartTimePrev ] = useState(undefined);
const [ endPrev, setEventEndTimePrev ] = useState(undefined);
const [ allDay, setAllDay] = useState(false);
const [ recurringEvent, setRecurringEvent] = useState(false);
const [ weekDays, setWeekDays ] = useState([]);
const [ endDate, setEndDate ] = useState(undefined); 
const [ frequency, setFrequency ] = useState(''); 
const [ interval, setInterval ] = useState(1); 
const [ startDateDateTime, setStartDateDateTime ] = useState( new Date()?.toLocaleDateString('en-US') );
const [ endDateDateTime, setEndDateDateTime ] = useState( new Date()?.toLocaleDateString('en-US') );
const [ startTimeDateTime, setStartTimeDateTime ] = useState( new Date()?.toLocaleTimeString('en-US') );
const [ endTimeDateTime, setEndTimeDateTime ] = useState( new Date()?.toLocaleTimeString('en-US')); 
const inputRef = useRef();



useEffect (() => {

    if ( inputRef ) {
        inputRef.current.focus();
    }

    if ( start === undefined ) {
        const [ start, end, startStr, endStr, allDay ] = Object.entries(slotInfo);
        const [ calendarViewType ] = Object.entries(slotInfo?.view);

        let dateTimeString = transformDateTime( startStr, endStr, calendarViewType, allDay[1] );
        setStartDateDateTime( getDate( dateTimeString?.resStartStr ) );
        setEndDateDateTime( getDate( dateTimeString?.resEndStr ));
        setStartTimeDateTime( getTime( dateTimeString?.resStartStr ) );
        setEndTimeDateTime( getTime( dateTimeString?.resEndStr ) );
        setEventStartTime( dateTimeString?.resStartStr );
        setEventEndTime( dateTimeString?.resEndStr );
        setAllDay( allDay[1] );
    }

}, [ ]); 

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

const handleAllDayEvent = (event) => {
   let isChecked = event.target.checked;
   let value = event.target.value;

   if ( isChecked && (value === 'isAllDay') ) {
        setAllDay(true)
        setStartEndTimesOnAllDaySelection(true);
   }

   if ( !isChecked && (value === 'isAllDay') ) {
       setAllDay(false);
       setStartEndTimesOnAllDaySelection(false);
   }  
}

const submit = (e) => {
e.preventDefault();

if ( ! handleFormValidation('Event Title', title, '') ) {
    return;
}

if ( recurringEvent &&  ! handleFormValidation('Until', endDate, undefined) ) {
    return;
}

if ( recurringEvent && ! handleFormValidation('Frequency', frequency, 'Select') ) {
    return;
}

const [ startStr, endStr, allDayEvent ] = Object.entries(slotInfo); 
const [ calendarViewType ] = Object.entries(slotInfo?.view);

let event = {}, dateTimeString = transformDateTime( startStr, endStr, calendarViewType, allDayEvent[1] ); 

if ( recurringEvent && ! allDayEvent[1] ) {
    event =  { 
        title: title,
        rrule: {
            freq: frequency,
            interval: interval,
            dtstart: `${startDateDateTime}T${startTimeDateTime}`,
            until: endDate
        },
        duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) ),
    };  
} else if ( (recurringEvent && allDayEvent[1]) || ( recurringEvent && allDay ) ) {
    event =  { 
        title: title,
        allDay,
        rrule: {
            freq: frequency,
            interval: interval,
            dtstart: `${startDateDateTime}T${startTimeDateTime}`,
            //dtstart: dateTimeString?.resStartStr,
            until: endDate
        },
        duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) ),
    };
} else {
    event = {
        title: title,
        recurringEvent,
        allDayEvent,
        //start: dateTimeString?.resStartStr,
        //end: dateTimeString?.resEndStr,
        start: `${startDateDateTime}T${startTimeDateTime}`,
        end: `${endDateDateTime}T${endTimeDateTime}`, 
        duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) )
    };
}
    handleSubmit({ event, formData });
}

function handleFormValidation(fieldname, value, option){

    if ( value === option ) {
        Validations.warn(`Please correct ${ fieldname }`);
        return false;
    }
    return true;
}

function setStartEndTimesOnAllDaySelection( allDayChanged ) {

    if ( allDayChanged && datePatternIncludesTimeSequence( start, end ) ) {
        setEventStartTimePrev( start );
        setEventEndTimePrev( end );
        setEventStartTime( getDate ( start ) );
        setEventEndTime( getDate( end ) );
    } 

    if ( !allDayChanged && !datePatternIncludesTimeSequence( start, end ) ) {
        setEventStartTime( startPrev );
        setEventEndTime( endPrev );
    } 
}

let eventFormConfig = { 
    submit,
    submitEventButtonText: submitEventButtonText,
    eventTitlePlaceHolder: ''.
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
    start,
    setEventStartTime,
    end,
    setEventEndTime,
    allDay,
    setAllDay,
    handleAllDayEvent,
    location, 
    setEventLocation,
    duration, 
    setDuration,
    startDateDateTime, 
    setStartDateDateTime,
    endDateDateTime, 
    setEndDateDateTime,
    startTimeDateTime, 
    setStartTimeDateTime,
    endTimeDateTime, 
    setEndTimeDateTime 
}

return (
    <div className="events">
        {children}
        <br></br>
        <EventForm config={eventFormConfig}/>  
    </div>
)};

export default Scheduling;