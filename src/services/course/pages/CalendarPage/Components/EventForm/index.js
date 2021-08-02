import Select from 'react-select';
import DropDown from 'services/course/pages/components/DropDown';
import ToggleButton from 'services/course/pages/components/ToggleButton';

const EventForm = ({ props })  => {
    return(
      <span>
        <form className={""}
              onSubmit={props?.Submit}> 
            <span className="row">    
                <input
                    ref={props?.inputRef}
                    type="text" 
                    disabled={props?.saveInProgress} 
                    value={props?.title} 
                    onChange={(e) => props?.setEventTitle(e.target.value)}
                    placeholder="Event Title"
                />
            </span>
            <span className="row">    
                <input
                    ref={props?.inputRef}
                    type="text" 
                    disabled={props?.saveInProgress} 
                    value={props?.location} 
                    onChange={(e) => props?.setEventLocation(e.target.value)}
                    placeholder="Event Location"
                />
            </span>
            <span className="row"> 
            <span className='col'>
            {"Start Date"}
               <input
                    ref={props?.inputRef}
                    type="date" 
                    //disabled={props?.saveInProgress} 
                    value={props?.startDateDateTime} 
                    onChange={(e) => props?.setStartDateDateTime(e.target.value)}
                    placeholder="Event Start"
                />
            </span>
            <span className="col">
            {"Start Time"}
                <input
                    ref={props?.inputRef}
                    type="time" 
                    disabled={props?.saveInProgress} 
                    value={props?.startTimeDateTime} 
                    onChange={(e) => props?.setStartTimeDateTime(e.target.value)}
                    placeholder="Event Start"
                />
            </span>
            </span> 
            <span className="row"> 
            <span className='col'>
            {"End Date"}
               <input
                    ref={props?.inputRef}
                    type="date" 
                    disabled={props?.saveInProgress} 
                    value={props?.endDateDateTime} 
                    onChange={(e) => props?.setEndDateDateTime(e.target.value)}
                    placeholder="Event End"
                />
            </span>
            <span className="col">
            {"End Time"}
                <input
                    ref={props?.inputRef}
                    type="time" 
                    disabled={props?.saveInProgress} 
                    value={props?.endTimeDateTime} 
                    onChange={(e) => props?.setEndTimeDateTime(e.target.value)}
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
                        isChecked={props?.allDay}
                        isDisabled={props?.saveInProgress}
                        value={'isAllDay'}
                        onChange={props?.handleAllDayEvent} 
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
                        isChecked={props?.recurringEvent}
                        isDisabled={props?.saveInProgress}
                        value={'isRecurring'}
                        onChange={props?.handleRecurringEvent} 
                    />
                 </span>
            </span>
            {( props?.recurringEvent ) &&  <div>
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
                                                        optionCollection={(props.isEditMode && props.recurringEvent) ? props?.freqCollectionData : props?.frequencyCollection}
                                                        setOptionSelectedValue={props?.setFrequency} 
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
                                                disabled={props?.saveInProgress} 
                                                value={props?.interval} 
                                                onChange={(e) => props?.setInterval(e.target.value)}
                                            />
                                            </label> 

                                            <label className="recurring">
                                            Only on these week days:
                                            <span className="tooltiptext">
                                                Set recurring events only on the weekdays selected.
                                            </span>
                                            <Select
                                                isMulti
                                                value={props?.weekDays}
                                                onChange={props?.setWeekDays}
                                                options={props?.days} 
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
                                                ref={props?.inputRef}
                                                type="date" 
                                                disabled={props?.saveInProgress} 
                                                value={props?.endDate} 
                                                onChange={(e) => props?.setEndDate(e.target.value)}
                                                placeholder="Event End"
                                            />
                                            </span>
                                            <span className="col">
                                            {"End Time"}
                                            <input
                                                ref={props?.inputRef}
                                                type="time" 
                                                disabled={props?.saveInProgress} 
                                                value={props?.endTimeDateTime} 
                                                onChange={(e) => props?.setEndTimeDateTime(e.target.value)}
                                                placeholder="Event End"
                                            />
                                            </span>
                                            </span>
                                            </label>
                                            </div>
            }  
            { props?.onSaveError && (
                <div className="saveError-message">
                    Error: { props?.onSaveError.message }
                </div>
            )}
             <button onClick={props?.submit} disabled={props?.saveInProgress} > {`${props?.submitEventButtonText}`} </button> 
        </form>
        </span>
    );
};

export default EventForm;