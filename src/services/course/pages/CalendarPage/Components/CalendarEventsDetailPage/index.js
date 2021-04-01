import 
React,{
useEffect,
useState    
} from 'react';

import { 
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import {
loadAllCalendarEvents,     
saveCalendarEvent } from 'Services/course/Actions/Calendar';

import {
style } from 'Services/course/Pages/CalendarPage/helpers';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
getUsersByOperatorId,
getOperatorFromOperatorBusinessName,    
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
saveCalendarEvent,
pushNotificationSubscribers,
selectedCalendarEventId,
calendarEventType,
calendarId,
eventId,
userId,
loadAllCalendarEvents,
loadSubscribedPushNotificationUsers }) => {

const [isRecurringEvent, setIsRecurringEvent] = useState(false);
const [isEditMode, setIsEditMode]  = useState(false);
const [selectedItemId, setSelectedItemId]  = useState('');
const [ShowAllCalendarEvents, setShowAllCalendarEvents] = useState(false);
let liClassName = style.eventListBody ,  liClassNameEditView = "";

useEffect(( ) => {
    loadAllCalendarEvents();
    loadSubscribedPushNotificationUsers();   

}, [ loadAllCalendarEvents,loadSubscribedPushNotificationUsers ]);

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

function updatedCalendarEvent(calendarEvents, selectedEvent, updatedEvent) {
    let localCalendarEvents = calendarEvents;
    let eventToUpdate = localCalendarEvents?.find(event => event?.id === selectedEvent?.id);
    eventToUpdate['title'] =  updatedEvent?.title;
    eventToUpdate['start'] = updatedEvent?.start;
    eventToUpdate['end'] = updatedEvent?.end;
    eventToUpdate['duration'] = updatedEvent?.duration;
    eventToUpdate['formData']['location'] = updatedEvent?.location;
    eventToUpdate['formData']['formData'] = updatedEvent?.scheduledStudents;

    if ( eventToUpdate?.rrule ) {
        eventToUpdate['rrule']['dtstart'] = updatedEvent?.start;
        eventToUpdate['rrule']['until'] = updatedEvent?.endDate;
        eventToUpdate['rrule']['weekDays'] = updatedEvent?.weekDays;
        eventToUpdate['rrule']['freq'] = updatedEvent?.frequency;
        eventToUpdate['rrule']['interval'] = updatedEvent?.interval;
    }

    localCalendarEvents[selectedEvent?.id] = eventToUpdate;
    return localCalendarEvents;
}

let testAdminUsers =  [ calendar?.userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ];
let emailAddresses = Object.values(currentUsers)?.filter(user => testAdminUsers?.includes(user?._id))?.map(user => user?.email);

function showAllCalendarEvents () {
    setShowAllCalendarEvents(true);
}

function getClassName(item) {
    return ( isEditMode & selectedItemId !== item?.id ) ? ( isRecurringEvent & selectedItemId === item?.id ) ? liClassName : liClassNameEditView : liClassName 
}

return   ( 
    <>   
    <div className="ComponentEventList">   
    <div className="" />  
       <div className="component-list-body">   
        {(calendar) && <EventListItems
                            getClassName={getClassName}
                            collection={ShowAllCalendarEvents ? calendar?.calendarEvents : ( selectedCalendarEventId ) ? calendar?.calendarEvents?.filter(item => item?.id === selectedCalendarEventId) : calendar?.calendarEvents }
                            selectedCalendarEventId={selectedCalendarEventId}
                            onMatchListItem={onMatchListItem}
                            path={"event"}
                            ulClassName={"ComponentCourseListItem"}
                        >
                        {( selectedEvent ) => (        
                        < EditCalendarEvents
                            currentUsers={currentUsers}
                            calendarEventType={calendarEventType}
                            setIsRecurringEvent={setIsRecurringEvent}
                            setIsEditMode={setIsEditMode}
                            setSelectedItemId={setSelectedItemId}
                            calendar={calendar}
                            testAdminUsers={testAdminUsers}
                            emailAddresses={emailAddresses}
                            currentEvent={selectedEvent}
                            currentUser={currentUser}
                            pushNotificationSubscribers={pushNotificationSubscribers}
                            className="lesson-item"
                            onSubmit={(updatedEvent) => saveCalendarEvent({
                                ...calendar, 
                                calendarEvents: [...updatedCalendarEvent(calendar?.calendarEvents, selectedEvent,  updatedEvent)]
                            }, 
                            selectedEvent,
                            currentUser,
                            pushNotificationSubscribers,
                            emailAddresses )}
                        >
                        { (edit, remove, removeAll ) => (
                        <div className=""> 
                        <div className="event-list-items">
                            <div className="">
                            <div className="row justify-content-sm-center">  
                            <Link to={`/${operatorBusinessName}/${calendarEventType}/calendar/${calendarId}/${userId}/event/${selectedEvent?.id}`}> <span title={ selectedEvent?._id } ><h2> { selectedEvent?.title } </h2> </span> </Link> 
                            </div>     
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}> {'Recurring Event'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{ ( selectedEvent?.rrule === undefined ) ? false?.toString() : true?.toString() } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'All Day Event'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{ ( selectedEvent?.allDay === undefined ) ? 'false' : selectedEvent?.allDay?.toString()  } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'Event Start'} </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText"> {(selectedEvent?.rrule) ? new Date(selectedEvent?.rrule?.dtstart)?.toLocaleString() : new Date(selectedEvent?.start)?.toLocaleString() }  </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}> {'Event End'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{(selectedEvent?.rrule) ? new Date(selectedEvent?.rrule?.until)?.toLocaleDateString() : new Date(selectedEvent?.end)?.toLocaleString() } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'Frequency'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText">{(selectedEvent?.rrule) ? selectedEvent?.rrule?.freq : '' } </div>  
                                </div>
                            </div>
                            <div className="row justify-content-sm-center">         
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className={'mainBodyText'}>  {'Duration'}  </div>
                                </div>
                                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-2">
                                <div className="subBodyText"><h5> { ((parseInt(selectedEvent?.duration)/1000)/3600)  } </h5> </div>  
                                </div>
                            </div>
                            {selectedEvent?.formData?.formData?.map(student => ( 
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
                                        onClick={() => { edit( selectedEvent ) } }                                          
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
                                        onClick={() => { remove( selectedEvent ) }}> 
                                        Delete 
                                    </button> 
                                </span>
                                <span>
                                    <button
                                        className="delete-event-btn"
                                        onClick={() => { removeAll( calendar ) }}> 
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
) }

const mapState = (state, ownProps)   => {
  return {
    currentUser: state.users.user,
    user: state.users.user,
    currentUsers: getUsersByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
  };
}

export default connect(mapState, { saveCalendarEvent, loadAllCalendarEvents, loadSubscribedPushNotificationUsers } )(CalendarEventsDetailPage);