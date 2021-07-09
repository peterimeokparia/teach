import { 
useState, 
useEffect, 
useRef } from 'react';

import {
newCalendarEventData,
frequencyCollection,
days,
transformDateTime,
datePatternIncludesTimeSequence,
getDate,
getTime } from 'Services/course/Pages/CalendarPage/helpers';

import { 
Validations } from 'Services/course/helpers/Validations';

import Select from 'react-select';
import DropDown from 'Services/course/Pages/Components/DropDown';
import ToggleButton from 'Services/course/Pages/Components/ToggleButton';

import './style.css';

const Scheduling = ({  
    handleSubmit,
    schedulingData, 
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
    const [ endTimeDateTime, setEndTimeDateTime ] = useState(  startTimeDateTime );
    const [ freqCollectionData, setFreqCollectionData ] = useState(frequencyCollection); 
    const inputRef = useRef();

    useEffect (() => {
        if ( inputRef ) {
            inputRef.current.focus();
        }
        if ( start === undefined ) {
            // const [ start, end, startStr, endStr, allDay ] = Object.entries(slotInfo);
            const [ start, end, allDay ] = Object.entries(slotInfo);
            const [ calendarViewType ] = Object.entries(slotInfo?.view);
            let dateTimeString = transformDateTime( start[1], end[1], calendarViewType, allDay[1] );

            setStartDateDateTime( getDate( dateTimeString?.resStartStr ) );
            setEndDateDateTime( getDate( dateTimeString?.resEndStr ));
            setStartTimeDateTime( getTime( dateTimeString?.resStartStr ) );
            setEndTimeDateTime( getTime( dateTimeString?.resEndStr ) );
            setEventStartTime( dateTimeString?.resStartStr );
            setEventEndTime( dateTimeString?.resEndStr );
            setAllDay( allDay[1] );
        }
    // }, [ ]);
    }, [ slotInfo, start ]);  

    if ( saveInProgress ) {
        return <div>...loading</div>;
    }; 

    if ( onSaveError ) {
        return <div> { onSaveError.message } </div> ;
    };

const handleRecurringEvent = (event) => {
    let isChecked = event.target.checked;
    let value = event.target.value;

    if ( isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(true);
    };

    if ( !isChecked && (value === 'isRecurring') ) {
        setRecurringEvent(false);
    };  
};

const handleAllDayEvent = (event) => {
   let isChecked = event.target.checked;
   let value = event.target.value;

   if ( isChecked && (value === 'isAllDay') ) {
        setAllDay(true);
        setStartEndTimesOnAllDaySelection(true);
   }

   if ( !isChecked && (value === 'isAllDay') ) {
       setAllDay(false);
       setStartEndTimesOnAllDaySelection(false);
   }  
};

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

// const [ start, end, startStr, endStr, allDay ] = Object.entries(slotInfo);
const [ start, end, allDay ] = Object.entries(slotInfo);
const [ calendarViewType ] = Object.entries(slotInfo?.view);

let event = {}, dateTimeString = transformDateTime( start[1], end[1], calendarViewType, allDay[1] );

if ( recurringEvent && ! allDay[1] ) {
    event =  { 
        title: title,
        recurringEvent,
        rrule: {
            freq: frequency,
            interval: interval,
            dtstart: `${startDateDateTime}T${startTimeDateTime}`,
            until: endDate 
        },
        duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) )
    };  
} else if ( ( recurringEvent && allDay[1]) ) {
    event =  { 
        title: title,
        recurringEvent,
        allDay: allDay[1],
        rrule: {
            freq: frequency,
            interval: interval,
            dtstart: `${startDateDateTime}T${startTimeDateTime}`,
            until: endDate
        },
        duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) )
    };
} else {
    event = {
        title: title,
        recurringEvent,
        allDay: allDay[1],
        start: `${startDateDateTime}T${startTimeDateTime}`,
        end: `${endDateDateTime}T${endTimeDateTime}`, 
        duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) )
    };
}
    handleSubmit( newCalendarEventData(event, location, schedulingData, undefined ) );
};

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
return (
    <div className="events">
        {children}
        <br></br>
        <span>
        <form className={""} onSubmit={submit}> 
            <span className="row">    
                <input
                    ref={inputRef}
                    type="text" 
                    disabled={saveInProgress} 
                    value={title} 
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Event Title"
                />
            </span>
            <span className="row">    
                <input
                    ref={inputRef}
                    type="text" 
                    disabled={saveInProgress} 
                    value={location} 
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Event Location"
                />
            </span>
            <span className="row"> 
            <span className='col'>
            {"Start Date"}
               <input
                    ref={inputRef}
                    type="date" 
                    value={startDateDateTime} 
                    onChange={(e) => setStartDateDateTime(e.target.value)}
                    placeholder="Event Start"
                />
            </span>
            <span className="col">
            {"Start Time"}
                <input
                    ref={inputRef}
                    type="time" 
                    disabled={saveInProgress} 
                    value={startTimeDateTime} 
                    onChange={(e) => setStartTimeDateTime(e.target.value)}
                    placeholder="Event Start"
                />
            </span>
            </span> 
            <span className="row"> 
            <span className='col'>
            {"End Date"}
               <input
                    ref={inputRef}
                    type="date" 
                    disabled={saveInProgress} 
                    value={endDateDateTime} 
                    onChange={(e) => setEndDateDateTime(e.target.value)}
                    placeholder="Event End"
                />
            </span>
            <span className="col">
            {"End Time"}
                <input
                    ref={inputRef}
                    type="time" 
                    disabled={saveInProgress} 
                    value={endTimeDateTime} 
                    onChange={(e) => setEndTimeDateTime(e.target.value)}
                    placeholder="Event End"
                />
            </span>
            </span>
            <span className="row"> 
                 <span className="col-sm-3">
                    <label>
                        All Day ?
                    </label>   
                </span>
                <div class="w-10"></div>
                 <span className="col-sm-6"> 
                    <ToggleButton
                        isChecked={allDay}
                        isDisabled={saveInProgress}
                        value={'isAllDay'}
                        onChange={handleAllDayEvent} 
                    />
                 </span>
            </span>
            <span className="row"> 
                 <span className="col-sm-3">
                    <label>
                        Is Recurring ?
                    </label>   
                </span>
                <div class="w-10"></div>
                 <span className="col-sm-6"> 
                    <ToggleButton
                        isChecked={recurringEvent}
                        isDisabled={saveInProgress}
                        value={'isRecurring'}
                        onChange={handleRecurringEvent} 
                    />
                 </span>
            </span>
            {( recurringEvent ) &&  
            <div>
            <span className="row"> 
                    <span className="col-sm-3"> 
                    <label className="recurring">
                        <label className="recurring">
                            Frequency:                                
                        </label> 
                        <label className="recurring">
                        <span className="tooltiptext">
                            How often?
                        </span>
                        </label>
                        </label> 
                    </span>
                    <div class="w-10"></div>
                        <span className="col-sm-6">
                            <DropDown 
                                label={""}
                                key={"_id"}
                                value={"name"}
                                optionCollection={(recurringEvent) ? freqCollectionData : frequencyCollection}
                                setOptionSelectedValue={setFrequency} 
                            />
                        </span>
                    </span>
                    <label className="recurring">
                    Interval:
                    <span className="tooltiptext">
                        How often do you want to repeat this recurring event per your frequency selection?
                        Default is 1.
                    </span>
                    <input
                        type="number"
                        min="1" 
                        max="100" 
                        disabled={saveInProgress} 
                        value={interval} 
                        onChange={(e) => setInterval(e.target.value)}
                    />
                    </label> 

                    <label className="recurring">
                    Only on these week days:
                    <span className="tooltiptext">
                        Set recurring events only on the weekdays selected.
                    </span>
                    <Select
                        isMulti
                        value={weekDays}
                        onChange={setWeekDays}
                        options={days} 
                    />
                    </label>

                    <label className="recurring">
                    Until:
                    <span className="tooltiptext">
                        Stop this recurring event on the date specified.
                    </span> 
                    <span className="row"> 
                    <span className='col'>
                    {"End Date"}
                    <input
                        ref={inputRef}
                        type="date" 
                        disabled={saveInProgress} 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="Event End"
                    />
                    </span>
                    <span className="col">
                    {"End Time"}
                    <input
                        ref={inputRef}
                        type="time" 
                        disabled={saveInProgress} 
                        value={endTimeDateTime} 
                        onChange={(e) => setEndTimeDateTime(e.target.value)}
                        placeholder="Event End"
                    />
                    </span>
                    </span>
                    </label>
            </div>
            }  
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}
             <button onClick={submit} disabled={saveInProgress} > {`${submitEventButtonText}`} </button> 
        </form>
        </span>
    </div>
); };

export default Scheduling;