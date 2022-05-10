import { 
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import {
saveEvent } from 'services/course/actions/event';

import {
eventEnum,
courseOption,     
updatedCurrentEvent } from 'services/course/pages/CalendarPage/helpers';

import {
getUsersByOperatorId,
getOperatorFromOperatorBusinessName,
getEventsByOperatorId,    
getCalendarByCalendarEventType,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import {
role } from 'services/course/helpers/PageHelpers';

import Select from 'react-select';
import Roles from 'services/course/pages/components/Roles';
import EventListItems from 'services/course/pages/CalendarPage/components/EventListItems';
import EditCalendarEvents from 'services/course/pages/CalendarPage/components/EditCalendarEvents';
import useConsultationFormHook from 'services/course/pages/CalendarPage/hooks/useConsultationFormHook';
import useCalendarEventsDetailHook from '../../hooks/useCalendarEventsDetailHook';
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
    saveEvent,
    courses }) => {
    let {
        liClassName,
        liClassNameEditView,
        isRecurringEvent, 
        setIsRecurringEvent,
        isEditMode, 
        setIsEditMode,
        setSelectedItemId,
        ShowAllCalendarEvents, 
        setShowAllCalendarEvents
    } = useCalendarEventsDetailHook();

    let {
        coursesInterestedIn, 
        setCoursesInterestedIn,
    } = useConsultationFormHook();
    
    handleNewCalendarConsultation();

function onMatchListItem( match, listItem ) {
    // remove?
}

function updatedCalendarEvent( updatedEvent, events, selectedCalendarEventId ) {
    let currentEvent = events?.find(evnt => evnt?._id === selectedCalendarEventId),  updatedCalendarEvent = {};

    updatedEvent = { ...updatedEvent, consultation:{ coursesInterestedIn } };
    if ( updatedEvent?.recurringEvent ) {
        let { allDay, ...updatedExistingEvent } = currentEvent;
        
        updatedCalendarEvent = updatedCurrentEvent( updatedExistingEvent, updatedEvent );
    } else {
        updatedCalendarEvent = updatedCurrentEvent( currentEvent, updatedEvent );
    }
    return updatedCalendarEvent;
}

function showAllCalendarEvents () {
    setShowAllCalendarEvents(true);
};

function getClassName(item) {
    return ( isEditMode && isRecurringEvent ) ?  liClassNameEditView : liClassName; 
};

function getEventsForSelectedUser() {
    return events?.filter( evnt => evnt?.userId === userId );
};

function handleNewCalendarConsultation(){
    if ( selectedCalendarEventId ) {
        let newEvent = events?.find( _event =>  _event?._id === selectedCalendarEventId );
        
        if ( selectedCalendarEventId && 
                    newEvent && 
                    newEvent?.event?.title === eventEnum.Available && 
                    currentUser?._id !== newEvent?.userId  ) {
            saveEvent( { ...newEvent, userId: currentUser?._id }, currentUser );
        }
    }
};

    let testAdminUsers =  [ calendar?.userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ];
    let emailAddresses = Object.values(currentUsers)?.filter(user => testAdminUsers?.includes(user?._id))?.map(user => user?.email);
    let currentEvents = getEventsForSelectedUser();

return   ( 
    <div className="CalendarComponentEventList">   
    <div className="" />  
        <div className="component-list-body">   
              <label>
                    Select Courses you are interested in:
                    <Select
                        placeholder={`Add Courses`}
                        isMulti
                        value={coursesInterestedIn}
                        onChange={setCoursesInterestedIn}
                        options={courseOption( Object.values( courses ) )} 
                    />    
                </label>        
                <EventListItems
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
                    currentUser={currentUser}
                    currentEvent={selectedEvent}
                    className="lesson-item"
                    onSubmit={( updatedEvent ) => saveEvent({
                        ...updatedCalendarEvent( updatedEvent, events, selectedCalendarEventId )
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
                    <Link to={`/${operatorBusinessName}/${selectedEvent?.calendarEventType}/calendar/${calendarId}/user/${userId}/event/${selectedEvent?._id}`}> <span title={ selectedEvent?._id } ><h2> { selectedEvent?.event?.title } </h2> </span> </Link> 
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
                    <span>
                        <button 
                            className="edit-event-btn"
                            onClick={() => { edit( selectedEvent ); } }                                          
                        > 
                            Edit
                        </button>
                        <button
                            className="delete-event-btn"
                            onClick={() => { remove( selectedEvent ); }}> 
                            Delete 
                        </button> 
                    </span>
                    <Roles
                        role={ currentUser?.role === role.Tutor }
                    >
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
        </div>    
    </div> 
); };

const mapState = (state, ownProps)   => {
    return {
    courses: state.courses.courses,
    currentUser: state.users.user,
    user: state.users.user,
    currentUsers: getUsersByOperatorId(state, ownProps),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    calendar: getCalendarByCalendarEventType(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    calendarEventType: state.calendar.calendarEventType,
    // adminUsers: state.admins.adminUsers to do
    };
};

export default connect(mapState, { saveEvent } )(CalendarEventsDetailPage);