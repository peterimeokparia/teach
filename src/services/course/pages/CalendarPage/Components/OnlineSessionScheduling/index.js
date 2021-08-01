import Select from 'react-select';
import DropDown from 'services/course/pages/components/DropDown';
import ToggleButton from 'services/course/pages/components/ToggleButton';

const OnlineSessionScheduling = ({ config })  => {

    return(
      <span>
        <form className={""}
              onSubmit={config?.Submit}> 
            <span className="row">    
                <input
                    ref={config?.inputRef}
                    type="text" 
                    disabled={config?.saveInProgress} 
                    value={config?.title} 
                    onChange={(e) => config?.setEventTitle(e.target.value)}
                    placeholder="Event Title"
                />
            </span>
            <span className="row">    
                <input
                    ref={config?.inputRef}
                    type="text" 
                    disabled={config?.saveInProgress} 
                    value={config?.location} 
                    onChange={(e) => config?.setEventLocation(e.target.value)}
                    placeholder="Event Location"
                />
            </span>
            <span className="row"> 
            <span className='col'>
                {"Start Date"}
               <input
                    ref={config?.inputRef}
                    type="date" 
                    //disabled={config?.saveInProgress} 
                    value={config?.startDateDateTime} 
                    onChange={(e) => config?.setStartDateDateTime(e.target.value)}
                    placeholder="Event Start"
                />
            </span>
            <span className="col">
            {"Start Time"}
                <input
                    ref={config?.inputRef}
                    type="time" 
                    disabled={config?.saveInProgress} 
                    value={config?.startTimeDateTime} 
                    onChange={(e) => config?.setStartTimeDateTime(e.target.value)}
                    placeholder="Event Start"
                />
            </span>
            </span> 
            <span className="row"> 
            <span className='col'>
            {"End Date"}
               <input
                    ref={config?.inputRef}
                    type="date" 
                    disabled={config?.saveInProgress} 
                    value={config?.endDateDateTime} 
                    onChange={(e) => config?.setEndDateDateTime(e.target.value)}
                    placeholder="Event End"
                />
            </span>
            <span className="col">
            {"End Time"}
                <input
                    ref={config?.inputRef}
                    type="time" 
                    disabled={config?.saveInProgress} 
                    value={config?.endTimeDateTime} 
                    onChange={(e) => config?.setEndTimeDateTime(e.target.value)}
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
                        isChecked={config?.allDay}
                        isDisabled={config?.saveInProgress}
                        value={'isAllDay'}
                        onChange={config?.handleAllDayEvent} 
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
                        isChecked={config?.recurringEvent}
                        isDisabled={config?.saveInProgress}
                        value={'isRecurring'}
                        onChange={config?.handleRecurringEvent} 
                    />
                 </span>
            </span>
            {( config?.recurringEvent ) &&  
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
                                optionCollection={(config.isEditMode && config.recurringEvent) ? config?.freqCollectionData : config?.frequencyCollection}
                                setOptionSelectedValue={config?.setFrequency} 
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
                        disabled={config?.saveInProgress} 
                        value={config?.interval} 
                        onChange={(e) => config?.setInterval(e.target.value)}
                    />
                    </label> 

                    <label className="recurring">
                    Only on these week days:
                    <span className="tooltiptext">
                        Set recurring events only on the weekdays selected.
                    </span>
                    <Select
                        isMulti
                        value={config?.weekDays}
                        onChange={config?.setWeekDays}
                        options={config?.days} 
                    />
                    </label>

                    <label className="recurring">
                    Until:
                    <span className="tooltiptext">
                        Stop this recurring event on the date specified.
                    </span> 
                    <input
                        type="date" 
                        disabled={config?.saveInProgress} 
                        value={config?.endDate} 
                        onChange={(e) => config?.setEndDate(e.target.value)}
                    />
                    </label>
                </div>
            }  
            { config?.onSaveError && (
                <div className="saveError-message">
                    Error: { config?.onSaveError.message }
                </div>
            )}
             <button onClick={config?.submit} disabled={config?.saveInProgress} > {`${config?.submitEventButtonText}`} </button> 
        </form>
        </span>
    );
}

export default OnlineSessionScheduling;