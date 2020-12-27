// import React from 'react';

// import { connect } from 'react-redux';

// import {} from '../actions';

// import {  momentLocalizer } from 'react-big-calendar';

// import moment from 'moment';

// import CalendarComponent from './CalendarComponent';


moment.locale("en-GB");

const localizer = momentLocalizer(moment)


const CalendarPage2 = ({
currentUser, 
}) =>  {
 

const getSelectedSlotEventData = ( slotInfo, eventTitle ) => {

    let newEventData = {
        user: currentUser,
        eventTitle: eventTitle,
        startDate: slotInfo.start.toLocaleString(),
        endDate: slotInfo.end.toLocaleString(),
        action: slotInfo.action
    }

}


    return (
      <div>
           <CalendarComponent
              getSelectedSlotEventData={getSelectedSlotEventData} 
           />
      </div>
    );

}



const mapState = (state, ownProps)   => {
  return {
    currentUser: state.users.user
  };
}


export default connect(mapState, {} )(CalendarPage2);