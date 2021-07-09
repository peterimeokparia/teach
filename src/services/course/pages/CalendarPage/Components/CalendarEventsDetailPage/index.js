import { 
useEffect, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import {
loadAllCalendars } from 'Services/course/Actions/Calendar';

import {
loadAllEvents,
saveEvent } from 'Services/course/Actions/Event';

import {
style } from 'Services/course/Pages/CalendarPage/helpers';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
getUsersByOperatorId,
getOperatorFromOperatorBusinessName,
getEventsByOperatorId,    
getCalendarEventsByUserIdSelector,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

import {
role } from 'Services/course/helpers/PageHelpers';

import Roles from 'Services/course/Pages/Components/Roles';
import EventListItems from 'Services/course/Pages/CalendarPage/Components/EventListItems';
import EditCalendarEvents from 'Services/course/Pages/CalendarPage/Components/EditCalendarEvents';
import './style.css';

const CalendarEventsDetailPage = ({ 
operatorBusinessName,
operator, 
currentUser,
user,
currentUsers,
calendar,
events,
pushNotificationSubscribers,
selectedCalendarEventId,
calendarEventType,
calendarId,
eventId,
userId,
loadAllCalendars,
loadAllEvents,
saveEvent,
loadSubscribedPushNotificationUsers }) => {
const [isRecurringEvent, setIsRecurringEvent] = useState(false);
const [isEditMode, setIsEditMode]  = useState(false);
const [selectedItemId, setSelectedItemId]  = useState('');
const [ShowAllCalendarEvents, setShowAllCalendarEvents] = useState(false);
let liClassName = style.eventListBody ,  liClassNameEditView = "";

useEffect(( ) => {
    loadAllEvents();
    loadAllCalendars();
    loadSubscribedPushNotificationUsers();   
}, [ loadAllCalendars,loadSubscribedPushNotificationUsers, loadAllEvents ]);
// }, [ loadAllCalendars,loadSubscribedPushNotificationUsers ]);

if ( isEditMode ) {
    liClassName =  style.eventListBodyEdit;
    liClassNameEditView= style.eventListBodyOthers;
}

if ( isRecurringEvent ) {
    liClassName =  style.eventListBodyEditRecurring;
    liClassNameEditView= style.eventListBodyOthers;
}

function onMatchListItem( match, listItem ) {
}

function updatedCalendarEvent( updatedEvent, selectedEvent, events, selectedCalendarEventId ) {
    let currentEvent = events?.find(evnt => evnt?._id === selectedCalendarEventId),  updatedCalendarEvent = {};
 
    if ( updatedEvent?.recurringEvent ) {
        const { allDay, ...updatedExistingEvent } = currentEvent;
    
        updatedCalendarEvent = {
            ...updatedExistingEvent,
            event: {
                title: updatedEvent?.title,
                duration: updatedEvent?.duration,
                recurringEvent: updatedEvent?.recurringEvent,
                start: updatedEvent?.start, 
                end: updatedEvent?.end,
                rrule: {
                    dtstart: updatedEvent?.start,
                    until: updatedEvent?.endDate,
                    byweekday: updatedEvent?.weekDays,
                    freq: updatedEvent?.frequency,
                    interval: updatedEvent?.interval,
                }
            },
            location: updatedEvent?.location,
            schedulingData: updatedEvent?.schedulingData
        };
    } else {
        updatedCalendarEvent = { 
            ...currentEvent,
            event: {
                title: updatedEvent?.title,
                duration: updatedEvent?.duration,
                allDay: updatedEvent?.allDay,
                recurringEvent: updatedEvent?.recurringEvent,
                start: updatedEvent?.start, 
                end: updatedEvent?.end,
                rrule: {
                    dtstart: currentEvent?.event?.rrule?.dtstart,
                    until: currentEvent?.event?.rrule?.until,
                    byweekday: currentEvent?.event?.rrule?.byweekday,
                    freq: currentEvent?.event?.rrule?.freq,
                    interval: currentEvent?.event?.rrule?.interval,
                }
            },
            location: updatedEvent?.location,
            schedulingData: updatedEvent?.schedulingData
        };
    }
    return updatedCalendarEvent;
}

let testAdminUsers =  [ calendar?.userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ];
let emailAddresses = Object.values(currentUsers)?.filter(user => testAdminUsers?.includes(user?._id))?.map(user => user?.email);

function showAllCalendarEvents () {
    setShowAllCalendarEvents(true);
};

function getClassName(item) {
    return ( isEditMode & selectedItemId !== item?._id ) ? ( isRecurringEvent & selectedItemId === item?._id ) ? liClassName : liClassNameEditView : liClassName; 
};

function getEventsForSelectedUser() {
    return events?.filter(evnt => evnt?.userId === userId );
};

let currentEvents = getEventsForSelectedUser();

return   ( 
    <>   
    <div className="ComponentEventList">   
    <div className="" />  
       <div className="component-list-body">   
        {(calendar) && <EventListItems
                            getClassName={getClassName}
                            collection={ ShowAllCalendarEvents ? currentEvents : ( selectedCalendarEventId ) ? events?.filter(evnt => evnt?._id === selectedCalendarEventId) : currentEvents }
                            selectedCalendarEventId={selectedCalendarEventId}
                            onMatchListItem={onMatchListItem}
                            path={"event"}
                            ulClassName={"ComponentCourseListItem"}
                        >
                        {( selectedEvent ) => (            
                        < EditCalendarEvents
                            setIsRecurringEvent={setIsRecurringEvent}
                            setIsEditMode={setIsEditMode}
                            setSelectedItemId={setSelectedItemId}
                            currentEvent={selectedEvent}
                            className="lesson-item"
                            onSubmit={( updatedEvent ) => saveEvent({
                                ...updatedCalendarEvent( updatedEvent, selectedEvent, events, selectedCalendarEventId )
                            },
                                currentUser,
                                pushNotificationSubscribers,
                                emailAddresses
                            )}
                        >
                        { (edit, remove, removeAll ) => (
                        <div className=""> 
                        <div className="event-list-items">
                            <div className="">
                            <div className="row justify-content-sm-center">  
                            <Link to={`/${operatorBusinessName}/${calendarEventType}/calendar/${calendarId}/user/${userId}/event/${selectedEvent?._id}`}> <span title={ selectedEvent?._id } ><h2> { selectedEvent?.event?.title } </h2> </span> </Link> 
                            </div> 
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}> {'Location'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{ ( selectedEvent?.location )  } </div>  
                                </div>
                            </div> 
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}> {'Recurring Event'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{ ( selectedEvent?.event?.recurringEvent?.toString() )  } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'All Day Event'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{ ( selectedEvent?.event?.allDay === undefined ) ? 'false' : selectedEvent?.event?.allDay?.toString()  } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'Event Start'} </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">   
                                <div className="subBodyText"> {(selectedEvent?.event?.recurringEvent) ? new Date(selectedEvent?.event?.rrule?.dtstart)?.toLocaleString() : new Date(selectedEvent?.event?.start)?.toLocaleString() }  </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}> {'Event End'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{(selectedEvent?.event?.recurringEvent) ? new Date(selectedEvent?.event?.rrule?.until)?.toLocaleDateString() : new Date(selectedEvent?.event?.end)?.toLocaleString() } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'Frequency'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{(selectedEvent?.event?.recurringEvent) ? selectedEvent?.event?.rrule?.freq : '' } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'Duration'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText"><h5> { ((parseInt(selectedEvent?.event?.duration)/1000)/3600)  } </h5> </div>  
                                </div>
                            </div>
                            {selectedEvent?.schedulingData?.map(student => ( 
                                <> 
                                <div className="row justify-content-sm-center">
                                     <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                        <div className={'mainBodyText'}> {'Student'}  </div>  
                                    </div>
                                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2"> 
                                         <div className="subBodyText">{student?.value?.firstname} </div>
                                    </div>
                                </div>

                                <div className="row justify-content-sm-center">
                                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                        <div className={'mainBodyText'}> {'Email'}  </div>  
                                    </div>
                                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2"> 
                                        <div className="subBodyText">{student?.value?.email} </div>
                                    </div>
                                </div>
                                </>
                            ))}
                            </div>    
                         <br></br>
                            <div className="row justify-content-sm-center">
                            <div className="col-10">
                            <div className="event-buttons">    
                            <Roles
                                role={currentUser?.role === role.Tutor }
                            >
                                <span>
                                    <button 
                                        className="edit-event-btn"
                                        onClick={() => { edit( selectedEvent ); } }                                          
                                    > 
                                        Edit
                                    </button>
                                </span>
                            </Roles>
                            <Roles
                                role={ currentUser?.role === role.Tutor }
                            >
                                <span>
                                    <button
                                        className="delete-event-btn"
                                        onClick={() => { remove( selectedEvent ); }}> 
                                        Delete 
                                    </button> 
                                </span>
                                <span>
                                    <button
                                        className="delete-event-btn"
                                        onClick={() => { removeAll( calendar ); }}> 
                                        Delete All Events 
                                    </button> 
                                </span>
                                <span>
                                    <button
                                        className="delete-event-btn"
                                        onClick={showAllCalendarEvents}> 
                                        View All Events 
                                    </button> 
                                </span>
                            </Roles>
                            </div>
                            </div> 
                            </div>    
                            </div>
                        </div>
                        )}
                        </EditCalendarEvents> 
                        )
                    }
                </EventListItems>  
            }    
            </div>    
        </div> 
        </>
); };

const mapState = (state, ownProps)   => {
  return {
    currentUser: state.users.user,
    user: state.users.user,
    currentUsers: getUsersByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    calendarEventType: state.calendar.calendarEventType
  };
};

export default connect(mapState, { loadAllEvents, saveEvent, loadAllCalendars, loadSubscribedPushNotificationUsers } )(CalendarEventsDetailPage);