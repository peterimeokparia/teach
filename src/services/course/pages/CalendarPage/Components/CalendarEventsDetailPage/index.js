import { 
    connect } from 'react-redux';
    
    import { 
    Link } from '@reach/router';
    
    import {
    saveEvent } from 'teach/src/services/course/actions/event';
    
    import {
    updatedCurrentEvent} from 'teach/src/services/course/pages/CalendarPage/helpers';
    
    import {
    getUsersByOperatorId,
    getOperatorFromOperatorBusinessName,
    getEventsByOperatorId,    
    getCalendarEventsByUserIdSelector,
    getPushNotificationUsersByOperatorId } from 'teach/src/services/course/selectors';
    
    import {
    role } from 'teach/src/services/course/helpers/PageHelpers';
    
    import Roles from 'teach/src/services/course/pages/components/Roles';
    import EventListItems from 'teach/src/services/course/pages/CalendarPage/components/EventListItems';
    import EditCalendarEvents from 'teach/src/services/course/pages/CalendarPage/components/EditCalendarEvents';
    import './style.css';
    import useCalendarEventsDetailHook from '../../hooks/useCalendarEventsDetailHook';
    
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
        saveEvent }) => {
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
        
    
    function onMatchListItem( match, listItem ) {
        // remove?
    }
    
    function updatedCalendarEvent( updatedEvent, events, selectedCalendarEventId ) {
        let currentEvent = events?.find(evnt => evnt?._id === selectedCalendarEventId),  updatedCalendarEvent = {};
     
        if ( updatedEvent?.recurringEvent ) {
            const { allDay, ...updatedExistingEvent } = currentEvent;
            
            updatedCalendarEvent = updatedCurrentEvent( updatedExistingEvent, updatedEvent );
        } else {
            updatedCalendarEvent = updatedCurrentEvent( currentEvent, updatedEvent );
        }
        return updatedCalendarEvent;
    }
    
        let testAdminUsers =  [ calendar?.userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ];
        let emailAddresses = Object.values(currentUsers)?.filter(user => testAdminUsers?.includes(user?._id))?.map(user => user?.email);
    
    function showAllCalendarEvents () {
        setShowAllCalendarEvents(true);
    };
    
    function getClassName(item) {
        // return ( isEditMode & selectedItemId !== item?._id ) ? ( isRecurringEvent & selectedItemId === item?._id ) ? liClassName : liClassNameEditView : liClassName; 
        return ( isEditMode && isRecurringEvent ) ?  liClassNameEditView : liClassName; 
    };
    
    function getEventsForSelectedUser() {
        return events?.filter( evnt => evnt?.userId === userId );
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
        calendarEventType: state.calendar.calendarEventType,
        // adminUsers: state.admins.adminUsers to do
      };
    };
    
    export default connect(mapState, { saveEvent } )(CalendarEventsDetailPage);