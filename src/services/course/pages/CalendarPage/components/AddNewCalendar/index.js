import { 
    connect } from 'react-redux';
    
    import {
    getEventsByOperatorId,
    getPushNotificationUsersByOperatorId,
    getCalendarByCalendarEventType,     
    getOperatorFromOperatorBusinessName, 
    getUsersByOperatorId,
    getCalendarsByOperatorId,
    getTimeLinesByOperatorId } from 'services/course/selectors';
    
    import { 
    addCalendar } from 'services/course/actions/calendar';
    
    import {
    calendarOptions,    
    tutorsOption,
    getCalendarColor } from 'services/course/pages/CalendarPage/helpers';
    
    import useAddNewCalendarHook from 'services/course/pages/CalendarPage/hooks/useAddNewCalendarHook';
    import Select from 'react-select';
    import './style.css';
    
    const AddNewCalendar = ({
        operatorBusinessName,
        pushNotificationSubscribers,
        operator,
        calendarEventType,
        calendar,
        calendarId,
        calendars,
        events,
        pushNotUsers,
        addCalendar,
        timeLines,
        users,
        userId }) => {
        let {
            selectedTutors,  
            calendarType,  
            setCalendarType,
            onChange
        } = useAddNewCalendarHook();
    
    const onFormSubmit = ( evnt ) => {
        evnt.preventDefault();
    };
    
    const submitForm = () => {
        if ( calendarType ) {
            let testAdminUsers =  [ userId, '603d37814967c605df1bb450', '6039cdc8560b6e1314d7bccc' ]; // refactor
            let emailAddresses = Object.values(users).filter(user => testAdminUsers.includes(user?._id))?.map(user => user?.email);
            let operatorId = operator?._id; 
       
            let calendarConfig = ( tutor ) => {
                return { // refactor // use calendar and event class objects
                    calendar: {
                    userId: tutor?._id,
                    calendarEventType: calendarType?.label,
                    operatorId,
                    firstName: users?.find(usr => usr?._id === tutor?._id)?.firstname,
                    color: getCalendarColor( calendars )
                    }, 
                    event: undefined, 
                    location: undefined, 
                    schedulingData: undefined, 
                    consultation: undefined, 
                    calendarEventType: calendarType?.label, 
                    operatorId, 
                    currentUser: tutor, 
                    pushNotificationUser: pushNotificationSubscribers?.filter(subscriber => testAdminUsers?.includes( subscriber?.userId ) ), 
                    emailAddresses
                };
            };
    
            selectedTutors?.forEach(element => {
                let user = users?.find( usr => usr?._id === element?.value?._id);
    
                addCalendar( calendarConfig(user) );
            });
        };
    };
    
    return (
    
        <> 
         <h2>{`Add New Calendar`}</h2> 
            <br></br>
            <div className="events">
                <form onSubmit={onFormSubmit}>  
                    <Select
                        value={calendarType}
                        onChange={setCalendarType}
                        options={calendarOptions} 
                    />
                    <Select
                        placeholder={`Add Tutors(s)`}
                        isMulti
                        value={selectedTutors}
                        onChange={onChange}
                        options={ tutorsOption( users ) } 
                    />
                <br></br>
                <button onClick={submitForm}> {"Add Calendar(s)"} </button> 
                </form>
                <br></br>
            </div>
        </>    
    ); };
    
    const mapDispatch = {
        addCalendar
    };
    
    const mapState = ( state, ownProps )  => ({
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        calendar: getCalendarByCalendarEventType(state, ownProps),
        calendars: getCalendarsByOperatorId(state, ownProps),
        events: getEventsByOperatorId(state, ownProps),
        pushNotUsers: state?.notifications?.pushNotificationSubscribers,
        pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
        timeLines: getTimeLinesByOperatorId(state, ownProps)
    });
    
    export default connect(mapState, mapDispatch)(AddNewCalendar);