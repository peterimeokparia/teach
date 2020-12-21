import React, { useState } from 'react';

import ReactDOM from "react-dom";

import {render} from 'react-dom';

import { connect } from 'react-redux';

import { toggleCalendarNewEventForm } from '../actions';

import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';

import Modal from "react-modal";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import NewEventForm from './NewEventForm';

moment.locale("en-GB");
const localizer = momentLocalizer(moment)


const CalendarComponent = ({
calendarInputValues,
toggleCalendarNewEventForm,
toggleCalendarNewEventView,     
getSelectedSlotEventData}) => {
  

const [eventTitle, setEventTitle] = useState('');    


const getNewCalendarEventFormInputValue = (inputValueText) => {
    setEventTitle( inputValueText );
}


  const handleOnSelectSlotEvent = (slotInfo) => {
    toggleCalendarNewEventForm();
    getSelectedSlotEventData(slotInfo, eventTitle)
  }  

  return (
        
        ( toggleCalendarNewEventView )  ? <Modal 
                                              isOpen={isModalOpen} 
                                              onRequestClose={closeNewCourseModal} 
                                              onBlur={closeNewCourseModal}> 

                                              <NewEventForm
                                                  getNewCalendarEventFormInputValue={getNewCalendarEventFormInputValue} 
                                              /> 

                                            </Modal>
                                        : <div style={{ height: calendarInputValues.containerHeight }}>
                                            <Calendar
                                                selectable={calendarInputValues.selectable}
                                                localizer={localizer}
                                                events={calendarInputValues.events}
                                                step={calendarInputValues.step}
                                                timeslots={calendarInputValues.timeSlots}
                                                defaultView={calendarInputValues.defaultView}
                                                views={calendarInputValues.views}
                                                defaultDate={calendarInputValues.defaultDate}
                                                scrollToTime={calendarInputValues.scrollTime}
                                                onSelectEvent={event => alert(event.title)}
                                                onSelectSlot={handleOnSelectSlotEvent} /// handle this here or in the parent? Is the new event form a part of the calendar compnent?
                                                onView={calendarInputValues.onView}
                                            />
                                        </div>
        
    );

}

const mapState = (state) => {
  return {
     toggleCalendarNewEventView: state.calendar.toggleCalendarNewEventView

   };
}


export default connect(mapState, { toggleCalendarNewEventForm })(CalendarComponent);