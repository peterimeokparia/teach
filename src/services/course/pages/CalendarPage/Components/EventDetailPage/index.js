import 
React,{
useEffect    
} from 'react';

import { 
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import {
loadAllCalendars,     
saveCalendar } from 'Services/course/Actions/Calendar';

import {
loadAllEvents } from 'Services/course/Actions/Event';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
getEventsByOperatorId,    
getCalendarsByOperatorId,    
getOperatorFromOperatorBusinessName,    
getCalendarEventsByUserIdSelector,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

import {
role } from 'Services/course/helpers/PageHelpers';

import {
eventEnum } from 'Services/course/Pages/CalendarPage/helpers';

import Roles from 'Services/course/Pages/Components/Roles';
import ListItem from 'Services/course/Pages/Components/ListItem';
import EditCalendarEvents from 'Services/course/Pages/CalendarPage/Components/EditCalendarEvents';
import ToggleButton from 'Services/course/Pages/Components/ToggleButton';
import Select from 'react-select';


const EventDetailPage = ({ 
operatorBusinessName,
operator, 
currentUser,
user,
currentUsers,
calendar,
calendars,
events,
saveCalendar,
pushNotificationSubscribers,
calendarEventType,
calendarId,
eventId,
userId,
loadAllEvents,
loadAllCalendars,
loadSubscribedPushNotificationUsers }) => {

useEffect(( ) => {
    loadAllEvents();
    loadAllCalendars();
    loadSubscribedPushNotificationUsers();
},[ loadAllCalendars,loadSubscribedPushNotificationUsers, loadAllEvents ]);

function onMatchListItem( match, listItem ) {
    if ( match ){
        // fix
    }
}

function updatedCalendarEvent(events, selectedEvent, updatedEvent) {
    let localCalendarEvents = events;
    let eventToUpdate = localCalendarEvents?.find(event => event?._id === selectedEvent?._id);
    eventToUpdate['title'] =  updatedEvent?.event?.title;
    eventToUpdate['start'] = updatedEvent?.event?.start;
    eventToUpdate['end'] = updatedEvent?.event?.end;
    eventToUpdate['allDay'] = updatedEvent?.event?.allDay;
    localCalendarEvents[selectedEvent?._id] = eventToUpdate;
    return localCalendarEvents;
}

let testAdminUsers =  [ calendar?.userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ];
let emailAddresses = Object.values(currentUsers).filter(user => testAdminUsers.includes(user?._id))?.map(user => user?.email);

let event = events.find(event => event?._id === eventId);
if ( event ) {
    // alert('Found Event');
    // alert(JSON.stringify( event ) )
}

return (
    <div>
        <div>
            {event?.event?.title}
        </div>
        <div>
            {event?.event?.start}
        </div>
        <div>
            {event?.event?.end}
        </div>
        <div>
            {event?.event?.allDay}
        </div>
        {( calendarEventType === eventEnum?.ConsultationForm) && 
            <div>
                <div> { 'Consultee Information '} </div>
                <div> {event?.consultation?.firstName} </div>
                <div> {event?.consultation?.lastName} </div>
                <div> {event?.consultation?.studentsName} </div>
                <div> {event?.consultation?.email} </div>
                <div> {event?.consultation?.phone} </div>
                <div> <h4>{'Courses Interested In'}</h4> </div>
                <div> {event?.consultation?.coursesInterestedIn?.map(course => (
                    <div> { course?.label } </div>
                ))} 
                </div>

                <div className='events'> 
                    <form>
                        <h4> { 'Client Management '}  </h4>
                        <h5>{'Contacted Client?'}</h5>
                        <ToggleButton
                            isChecked={"config?.recurringEvent"}
                            isDisabled={"config?.saveInProgress"}
                            value={'isRecurring'}
                            onChange={"config?.handleRecurringEvent"} 
                        />
                        <h5>{'Contact Date & Time'}</h5>
                        <input
                        type={'date'}
                        />
                        <input
                            type={'time'}
                        />

<div> 
                    <h5>{'Notes'}</h5>
                    <input
                       type={'textarea'}
                    />
                </div>
                <div> 
                    <h5>{'Contacted by'}</h5>
                    <Select
                        placeholder={`User`}
                        isMulti
                        value={'coursesInterestedIn'}
                        onChange={'setCoursesInterestedIn'}
                        options={'userOption( users )'} 
                    />    
                </div>
                        
                    </form>
                    
                </div>
              
            </div>
        }
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
                            onSubmit={(updatedevent) => saveCalendar({
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
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps)
  };
}

export default connect(mapState, { saveCalendar, loadAllCalendars, loadSubscribedPushNotificationUsers, loadAllEvents } )(EventDetailPage);