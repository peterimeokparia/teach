import 
React, { 
useState, 
useEffect } from "react";

import { 
connect } from 'react-redux';

import {
addNewTimeLine,    
saveTimeLine,
loadTimeLines } from 'Services/course/Actions/TimeLines'; 

import {
getPushNotificationUsersByOperatorId,
getCalendarEventsByUserIdSelector,     
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCalendarsByOperatorId,
getTimeLinesByOperatorId } from 'Services/course/Selectors';

import Select from 'react-select';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import './style.css';

const TimeLine = ({ 
addNewTimeLine,
saveTimeLine,    
loadTimeLines,
timeLines,
calendarEventType,
userId,
operatorBusinessName,
operator,  }) => {

useEffect(( ) => {

    loadTimeLines();
    
},[ loadTimeLines ]);

let timeLine = timeLines?.find(timeline => timeline?.timeLineName === calendarEventType ),  timeLineItems = null, groupList = null;

if ( timeLine ) {
    const [ groups, items ] = Object.values(timeLine);
    groupList = groups;
    timeLineItems = items?.map(item => (
        {...item, start_time: moment( item?.start_time ), end_time: moment( item?.end_time)  }
    ));
}

return (
    <> 
     <h2>{`Time Lines`}</h2> 
        <br></br>
        <div className="events">

        <Timeline
                groups={groupList}
                items={timeLineItems}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
            />
            
            {/* <Timeline
                groups={testGroup}
                items={testItems}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
            /> */}
         
            <br></br>
        </div>
    </>    
)};

const mapDispatch = {
    loadTimeLines,
    saveTimeLine
};

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    user: state?.users?.user,
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    timeLines: getTimeLinesByOperatorId(state, ownProps)
})

export default connect(mapState, mapDispatch)(TimeLine);