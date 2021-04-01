import 
React,{
useEffect    
} from 'react';

import { 
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import {
loadAllCalendarEvents,     
saveCalendarEvent } from 'Services/course/Actions/Calendar';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
getOperatorFromOperatorBusinessName,    
getCalendarEventsByUserIdSelector,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

import {
role } from 'Services/course/helpers/PageHelpers';

import Roles from 'Services/course/Pages/Components/Roles';
import ListItem from 'Services/course/Pages/Components/ListItem';
import EditCalendarEvents from 'Services/course/Pages/CalendarPage/Components/EditCalendarEvents';

const EventDetailPage = ({ 
operatorBusinessName,
operator, 
currentUser,
user,
currentUsers,
calendar,
saveCalendarEvent,
pushNotificationSubscribers,
calendarEventType,
calendarId,
eventId,
userId,
loadAllCalendarEvents,
loadSubscribedPushNotificationUsers }) => {

    useEffect(( ) => {

        loadAllCalendarEvents();
        loadSubscribedPushNotificationUsers();
    
    },[ loadAllCalendarEvents,loadSubscribedPushNotificationUsers ]);

function onMatchListItem( match, listItem ) {

    if ( match ){
        // fix
    }
}

function updatedCalendarEvent(calendarEvents, selectedEvent, updatedEvent) {
    let localCalendarEvents = calendarEvents;
    let eventToUpdate = localCalendarEvents?.find(event => event?.id === selectedEvent?.id);
    eventToUpdate['title'] =  updatedEvent.title;
    eventToUpdate['start'] = updatedEvent.start;
    eventToUpdate['end'] = updatedEvent.end;
    eventToUpdate['allDay'] = updatedEvent.allDay;
    localCalendarEvents[selectedEvent?.id] = eventToUpdate;
    return localCalendarEvents;
}

let testAdminUsers =  [ calendar?.userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ];
let emailAddresses = Object.values(currentUsers).filter(user => testAdminUsers.includes(user?._id))?.map(user => user?.email);

let event = calendar?.calendarEvents.find(event => event?.id === eventId);
return (
    <div>
        <div>
            {event?.title}
        </div>
        <div>
            {event?.start}
        </div>
        <div>
            {event?.end}
        </div>
        <div>
            {event?.allDay}
        </div>
    </div>
)

return   (    
    <div>    
        {(calendar) && <ListItem
                            collection={calendar?.calendarEvents}
                            onMatchListItem={onMatchListItem}
                            path={"event"}
                        >
                        {( selectedEvent ) => (
                        < EditCalendarEvents
                            event={selectedEvent}
                            currentUser={currentUser}
                            pushNotificationUser={pushNotificationSubscribers}
                            className="lesson-item"
                            onSubmit={(updatedevent) => saveCalendarEvent({
                                ...calendar, 
                                calendarEvents: [...updatedCalendarEvent(calendar?.calendarEvents, selectedEvent,  updatedevent)]
                            }, 
                            selectedEvent,
                            currentUser,
                            pushNotificationSubscribers,
                            emailAddresses )}
                        >
                        { (edit, remove ) => (
                        <div>      
                        <div>
                                {/* <div><h6>{selectedEvent?.title}</h6></div> */}
                                {/* <span> Score </span> */}
                                <Link to={`event/${selectedEvent?.id}`}> <span title={selectedEvent?._id} >{ selectedEvent?.title } </span> </Link> 
                               <div className="row">
                                <div className="col-2">
                                    <div className="gradesHeader"> Event Id</div>
                                    <div className="gradesHeader"> All Day?</div>
                                    <div className="gradesHeader"> Event Start</div>
                                    <div className="gradesHeader"> Event End</div>
                                    <div className="gradesHeader"> Duration </div>
                                    <div className="gradesHeader"> Student  </div>
                                    <div className="gradesHeader"> Email  </div>
                                </div>
                                {/* /:operatorBusinessName/:calendarEventType/calendar/:calendarId/event */}
                                {/* <Link to={`calendar/${ calendarId }/event/${selectedEvent?._id}`}> <span title={selectedEvent?._id} >{ selectedEvent?.title } </span> </Link>  */}
                                <div className="col-10">
                                    <div className="grades"> { selectedEvent?.id } </div>
                                    <div className="grades"> { selectedEvent?.allDay?.toString() } </div>
                                    <div className="grades"> { selectedEvent?.start } </div>
                                    <div className="grades"> { selectedEvent?.end } </div>
                                    <div className="grades"> { ((parseInt(selectedEvent?.duration)/1000)/3600)  } </div>
                                    <div className="grades"> { selectedEvent?.formData?.scheduledStudents.map((student, idx) => (
                                        <span>
                                            { student?.value?.firstname } 
                                            <div> 
                                                {student?.value?.email} 
                                            </div>
                                        </span>  
                                     ))} </div>
                                </div>   
                            </div>
                            <br></br>
                            <div> 
                            <Roles
                                role={currentUser?.role === role.Tutor }
                            >
                                <button 
                                    className="edit-lesson-btn"
                                    onClick={() => { edit( selectedEvent ) } }                                          
                                > 
                                    Edit
                                </button>
                            </Roles>
                            <Roles
                                role={ currentUser?.role === role.Tutor }
                            >
                                <span>
                                    <button
                                        className="delete-lesson-btn"
                                        onClick={() => { remove( selectedEvent ) }}> 
                                        Delete 
                                    </button> 
                                </span>
                            </Roles>
                            </div>  
                            </div>       
                        </div>
                        )}
                        </EditCalendarEvents> 
                        )
                    }
                </ListItem>                    
            }     
        </div> 
) }

const mapState = (state, ownProps)   => {
  return {
    currentUser: state.users.user,
    user: state.users.user,
    currentUsers: state.users.users,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps)
  };
}

export default connect(mapState, { saveCalendarEvent, loadAllCalendarEvents, loadSubscribedPushNotificationUsers } )(EventDetailPage);