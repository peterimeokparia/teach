import { 
connect } from 'react-redux';

import {
saveCalendar,
deleteCalendar } from 'services/course/actions/calendar';

import {
frequencyCollection,
days,
eventEnum } from 'services/course/pages/CalendarPage/helpers';

import {
studentsOption } from 'services/course/pages/CalendarPage/helpers';

import useEditCalendarEventsHook from 'services/course/pages/CalendarPage/hooks/useEditCalendarEventsHook';
import SessionScheduling from 'services/course/pages/CalendarPage/components/TimeLines/SessionScheduling';
import Select from 'react-select';
import DropDown from 'services/course/pages/components/DropDown';
import ToggleButton from 'services/course/pages/components/ToggleButton';
import './style.css';

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
    children }) => {
    let useEditCalendarEventHookProp = {
        currentUser,
        currentEvent, 
        eventEnum,
        calendarEventType,
        onSubmit,
        setIsRecurringEvent,
        setSelectedItemId,
        setIsEditMode
    };
    let {
        title,
        location,
        allDay,
        recurringEvent,
        weekDays,
        endDate,
        frequency,
        interval,
        freqCollectionData,
        startDateDateTime,
        endDateDateTime,
        startTimeDateTime,
        endTimeDateTime, 
        schedulingData,
        editing,
        inputRef,
        setEventTitle,
        setEventLocation,
        setWeekDays,
        setEndDate,
        setFrequency,
        setInterval,
        setStartDateDateTime,
        setEndDateDateTime,
        setStartTimeDateTime,
        setEndTimeDateTime,
        setSchedulingData,
        reset,
        submit,
        handleRecurringEvent,
        handleAllDayEvent,
        beginEditing
    } = useEditCalendarEventsHook( useEditCalendarEventHookProp );

    if ( saveInProgress ) {
        return <div>...loading</div>;
    } 
    if ( onSaveError ) {
        return <div> { onSaveError.message } </div> ;
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
};
    
const performDeleteAll = ( calendar ) => { // change??
    deleteCalendar(calendar, currentUser, pushNotificationSubscribers);
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
};
 
return editing ? (
    <div className="events-main">       
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
                                initialValue={frequency}
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
            </div> 
            ) : ( 
                 children(beginEditing, performDelete, performDeleteAll)
                );                         
};

export default connect(null, { saveCalendar, deleteCalendar } )(EditCalendarEvents);