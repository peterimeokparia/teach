import useSchedulingHook from 'services/course/pages/CalendarPage/hooks/useSchedulingHook';
import Select from 'react-select';
import DropDown from 'services/course/pages/components/DropDown';
import ToggleButton from 'services/course/pages/components/ToggleButton';
import './style.css';

const Scheduling = ({  
    handleSubmit,
    schedulingData, 
    saveInProgress,
    onSaveError,
    slotInfo,
    submitEventButtonText,
    children }) => {
    let {
        inputRef, 
        submit,
        title, 
        setEventTitle, 
        location, 
        setEventLocation, 
        startDateDateTime, 
        setStartDateDateTime, 
        startTimeDateTime, 
        setStartTimeDateTime,
        endDateDateTime, 
        setEndDateDateTime, 
        endTimeDateTime, 
        setEndTimeDateTime, 
        allDay, 
        handleAllDayEvent, 
        recurringEvent, 
        handleRecurringEvent, 
        freqCollectionData,
        frequencyCollection,
        setFrequency,
        interval,
        setInterval,
        weekDays,
        setWeekDays,
        days,
        endDate,
        setEndDate
    } = useSchedulingHook( handleSubmit, schedulingData, slotInfo );

    if ( saveInProgress ) {
        return <div>...loading</div>;
    }; 

    if ( onSaveError ) {
        return <div> { onSaveError.message } </div> ;
    };

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
             <button onClick={ submit } disabled={saveInProgress} > {`${submitEventButtonText}`} </button> 
        </form>
        </span>
    </div>
); };

export default Scheduling;