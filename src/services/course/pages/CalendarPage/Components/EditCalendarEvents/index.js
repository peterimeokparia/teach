import { 
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
initializeEventForm } from './helpers';

import {
frequencyCollection,
days,
eventEnum,
// getTimeLineItemDetailsFromCalendarEvents,
getCurrentTimeInUsersLocale,
updateFrequencyCollection } from 'Services/course/Pages/CalendarPage/helpers';

import {
studentsOption } from 'Services/course/Pages/CalendarPage/helpers';

import SessionScheduling from 'Services/course/Pages/CalendarPage/Components/TimeLine/SessionScheduling';
import Select from 'react-select';
import DropDown from 'Services/course/Pages/Components/DropDown';
import ToggleButton from 'Services/course/Pages/Components/ToggleButton';

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
    const [ editing, setEditing ] = useState(false);
    const inputRef = useRef();

    useEffect (() => {
    if ( editing ) {
        inputRef.current.focus();
    }
    }, [ editing ]); 

    if ( saveInProgress ) {
        return <div>...loading</div>;
    } 
    if ( onSaveError ) {
        return <div> { onSaveError.message } </div> ;
    }

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
        };
    };  
};

const handleAllDayEvent = (e) => {  
   let isChecked = e.target.checked;
   let value = e.target.value;

   if ( isChecked && ( value === 'isAllDay' ) ) {
        setAllDay(true);
   }
   if ( !isChecked && ( value === 'isAllDay' ) ) {
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
};
    
const performDeleteAll = ( calendar ) => { // change??
    deleteCalendar(calendar, currentUser, pushNotificationSubscribers);
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
};
 
function setValues () {
    setEventTitle(initialValue?.title);
    setEventLocation(initialValue?.location);
    setEventStartTime(initialValue?.startTime);
    setEventEndTime(initialValue?.endTime);
    setRecurringEvent(initialValue?.recurringEvent);
    setWeekDays(initialValue?.weekDays);
    setEndDate( getCurrentTimeInUsersLocale( initialValue?.endDate )?.format('YYYY-MM-DD') );
    setFrequency(initialValue?.frequency);
    setInterval(initializeEventForm?.interval);
    setDuration(initializeEventForm?.duration);
    setSchedulingData((calendarEventType === eventEnum.SessionScheduling && initialValue?.schedulingData?.length > 0) ? initialValue?.schedulingData : []);
    setStartDateDateTime((start) ? getCurrentTimeInUsersLocale( start )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
    setEndDateDateTime((end) ? getCurrentTimeInUsersLocale( end )?.format('YYYY-MM-DD') : new Date()?.toLocaleDateString('en-US'));
    setStartTimeDateTime((start) ? getCurrentTimeInUsersLocale( start )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
    setEndTimeDateTime((end) ? getCurrentTimeInUsersLocale( end )?.format('HH:mm:ss') : new Date()?.toLocaleTimeString('en-US'));
};
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
                                optionCollection={( editing && recurringEvent ) ? freqCollectionData : frequencyCollection }
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
             <button onClick={submit} disabled={saveInProgress} > {`Edit`} </button> 
        </form>
        </span>
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



// let timeLine = timeLines?.find(timeLine => timeLine?.timeLineName === calendarEventType );
// let items = timeLine?.items.filter(item => !item?.id.includes( currentEvent?.event?.id ));
// let testUpdatedTimeLineItem = { ...timeLine, items };
//  //update items on the backEnd with action
//     if ( timeLine ) {
//         saveTimeLine( testUpdatedTimeLineItem );
//     }