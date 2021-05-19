import { 
role } from 'Services/course/helpers/PageHelpers';

import {
getTimeZoneDateTime } from 'Services/course/helpers/ServerHelper';

import moment from "moment";
import randomColor from 'randomcolor';



export const getCalendarColor = ( calendars ) => {
    let color = null;
    let existingColor = null;

    do {
        color = generateRandomColor();
        existingColor = calendars?.find( calendar => calendar?.color === color );

        if ( !existingColor ) {
            break;
        }
        
    } while ( existingColor );

    return color;
}

export const generateRandomColor = () => {
 //let randomSeed = Math.floor(Math.random() * 2000);
  return randomColor({ luminosity: 'light',  hue: 'random' })
}

export const getCalendarPageHeading = ( calendarEventType ) => {
    let calendarHeading = null;
    switch ( calendarEventType ) {
        case eventEnum.ConsultationForm:
        calendarHeading = 'New Consultation'; 
            break;
        case eventEnum.SessionScheduling:
        calendarHeading = 'Schedule Session'; 
            break;
        default:
        calendarHeading = 'Calendar'   
            break;
    }
    return calendarHeading;
}

export let frequencyCollection = [
    {_id:'Select', id:'Select',   name:'Select'},
    {_id:'yearly',id:'yearly',   name:'yearly'},
    {_id:'monthly',id:'monthly',  name:'monthly'},
    {_id:'weekly',id:'weekly',   name:'weekly'},
    {_id:'daily',id:'daily',    name:'daily'},
    {_id:'hourly',id:'hourly',   name:'hourly'},
    {_id:'minutely',id:'minutely', name:'minutely'},
    {_id:'secondly', id:'secondly', name:'secondly'}
]

export const newCalendarEventData = ( event, location, schedulingData, consultation ) => {
    return {
        event: ( event ) ? event : {},
        location: ( location ) ? location : '',
        schedulingData: ( schedulingData?.length > 0 ) ? schedulingData : [],
        consultation: ( consultation ) ? consultation : {} 
    };
}
export function updateFrequencyCollection( freq, setFreqCollectionData ) {
    let freqObject = frequencyCollection;

    if ( freq && (freq !== 'Select') ) {
        freqObject = frequencyCollection?.filter(item => item?.id !== freq );
        let eventFreq = freqObject?.find(item => item?.id === 'Select');

        if ( eventFreq ) {
            [ 'name', '_id', 'id' ].forEach(element => {
                eventFreq[ element ] = freq;
            });
        }   
    } 
    setFreqCollectionData( freqObject );
}

export const style = {
    eventListBody: "component-seconday-event-list-body",
    eventListBodyEdit: "component-seconday-event-list-body-edit",
    eventListBodyOthers: "component-seconday-event-list-body-others",
    eventListBodyEditRecurring:"component-seconday-event-list-body-edit-recurring"
}


let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
export const days = weekDays.map(item => ( { value: item,  label: item } )  );

export const studentsOption = ( currentUsers ) => currentUsers?.filter(user => user?.role === role?.Student ).map(item => ( { value: item,  label: item?.firstname } )  );

export const tutorsOption = ( currentUsers ) => currentUsers?.filter(user => user?.role === role?.Tutor ).map(item => ( { value: item,  label: item?.firstname } )  );

export const courseOption = ( courses ) => courses?.map(item => ( { value: item,  label: item?.name } ));

export const createNewCalendarEvent = (config) => {

    const [start, end, startStr, endStr, allDay ] = Object.entries(config?.slotInfo);

    let event = {}

    try {
        let startStrTransformer = startStr[1]?.split('T');
        let endStrTransformer = endStr[1]?.split('T');
        let resStr = `${startStrTransformer[0]}T${startStrTransformer[1].split('-')[0]}`
        let resEnd = `${endStrTransformer[0]}T${endStrTransformer[1].split('-')[0]}`

        if ( config?.recurringAppointment ) {
            event =  { 
                title: config?.title,
                rrule: {
                    freq: config?.frequency,
                    interval: config?.interval,
                    dtstart: resStr, 
                    until: resEnd
                },
                duration: config?.duration
            };
        } else {
            event = {
                title: config?.title,
                allDay: allDay[1],
                start: resStr,
                end: resEnd,
                duration: config?.duraton
            };
        }
    } catch (error) { 

        console.log(error);
    }
    return event;
}

export const eventEnum = {
    NewEvent: "newevent",
    IsModalOpen: "ismodalopen",
    ConsultationForm: "consultationform",
    SessionScheduling: "sessionscheduling",
    OnlineTutoringRequest: "onlinetutoringrequest",
    FullCalendar: "fullcalendar",
    DayGridMonth: "dayGridMonth",
    TimeGridDay: "timeGridDay"
}

let calendarTypes = [eventEnum?.ConsultationForm, eventEnum?.SessionScheduling ]; 
export const calendarOptions = calendarTypes.map(item => ( { value: item,  label: item } )  );

export const transformDateTime = ( startStr,  endStr, calendarViewType, allDay ) => {
    if ( ! startStr || ! endStr || ! calendarViewType || allDay === undefined ) return;

     return {
        resStartStr: getCurrentTimeInUsersLocale(startStr)?.format('YYYY-MM-DD[T]HH:mm:ss'),
        resEndStr:  getCurrentTimeInUsersLocale(endStr)?.format('YYYY-MM-DD[T]HH:mm:ss')
    }
}

export const getDateTime = ( dateTimeObj ) => {
    let dateTime = dateTimeObj;

    if ( dateTimeObj?.includes('T') ) {
        dateTime =  dateTimeObj?.split('T');  
    }
    return dateTime;
}

export const momentEnum = {
    MINUTES: 'minutes',
    HOURS: 'hours',
    DAYS: 'days',
    MONTHS: 'months',
    YEARS: 'years',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    MONTH: 'month',
    YEAR: 'year',
} 

export const durationEnum = {
    WEEKS: 7,
    DAYS: 1,
    MINUTES: 1,
    HOURS: 1,
    MONTHS: 1,
    YEARS: 1
}


export function getTimeLineItems( calendarEvent ) {

    if ( calendarEvent === undefined ) throw new Error( "Missing calendarEvent" );
    
    let eventCollection = ( calendarEvent?.timeLineItems?.length > 0 ) ?  calendarEvent?.timeLineItems : [];
    let eventCollectionLength = eventCollection?.length;
    let initialEventDateTime = calendarEvent?.event?.start;
    let numberOfEventSlots = getTheNumberOfCalendarEventSlots( calendarEvent?.event );
    
    
    try {
        if ( calendarEvent?.event?.recurringEvent && calendarEvent?.event?.rrule?.freq ) {  
            
            eventCollection.push({ 
                id: `${calendarEvent?._id}_${( eventCollectionLength + 1)}`,
                group: calendarEvent?.calendarId,
                title: calendarEvent?.event?.title,
                start_time: moment( initialEventDateTime )?.local().format('YYYY-MM-DD[T]HH:mm:ss'),
                end_time: moment( initialEventDateTime ).add(durationEnum.HOURS, momentEnum.HOUR )?.local().format('YYYY-MM-DD[T]HH:mm:ss'), 
                isRecurringEvent: calendarEvent?.event?.recurringEvent,
                color: calendarEvent?.event?.color, 
            });
    
            for( let i = 0;  i < (numberOfEventSlots-1); i++ ) {

                switch ( calendarEvent?.event?.rrule?.freq ) {
                    case "minutely":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.MINUTES, momentEnum.MINUTES);
                        break;
                    case "hourly":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.HOURS, momentEnum.HOURS);
                        break;
                    case "daily":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.DAYS, momentEnum.DAYS);
                        break;
                    case "weekly":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.WEEKS, momentEnum.DAYS);
                        break;
                    case 'monthly':
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.MONTHS, momentEnum.MONTHS);
                        break;
                    case 'yearly':
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.YEARS, momentEnum.YEARS);
                        break;    
                    default:
                        break;
                }
                eventCollectionLength = eventCollection?.length;
                eventCollection.push({ 
                    id: `${calendarEvent?._id}_${( eventCollectionLength + 1)}`,
                    group: calendarEvent?.calendarId,
                    title: calendarEvent?.event?.title,
                    start_time: moment( initialEventDateTime )?.local().format('YYYY-MM-DD[T]HH:mm:ss'),
                    end_time: moment( initialEventDateTime ).add(durationEnum.HOURS, momentEnum.HOUR )?.local().format('YYYY-MM-DD[T]HH:mm:ss'), 
                    isRecurringEvent: calendarEvent?.event?.recurringEvent,
                    color: calendarEvent?.event?.color 
                });
            }
            
        } else {

                let eventCollectionLength = eventCollection?.length;
                eventCollection.push({ 
                    id: `${calendarEvent?._id}_${( eventCollectionLength + 1)}`,
                    group: calendarEvent?.calendarId,
                    title: calendarEvent?.event?.title,
                    start_time: moment( initialEventDateTime )?.local().format('YYYY-MM-DD[T]HH:mm:ss'),
                    end_time: moment( initialEventDateTime ).add(durationEnum.HOURS, momentEnum.HOUR )?.local().format('YYYY-MM-DD[T]HH:mm:ss'), 
                    isRecurringEvent: calendarEvent?.event?.recurringEvent,
                    color: calendarEvent?.event?.color 
                });
        }
        
    } catch ( error ) {
        console.log( error );
    }
    return eventCollection;
}

export function getTimeLineItemDetailsFromCalendarEvents( config ) {

    if ( config === undefined ) throw new Error( "Missing config" );
    
    let timeLineExists = config?.timeLines?.find(timeline => timeline?.timeLineName === config?.calendarEventType );
    let eventCollection = ( timeLineExists ) ? timeLineExists?.items : [];
    let initialEventDateTime = config?.initialDateStartTime;
    let numberOfEventSlots = getTheNumberOfCalendarEventSlots( config );
    
    try {
        if ( config?.isRecurringEvent ) {  

            eventCollection.push({ 
                id: `${config?.eventId}_${(eventCollection?.length + 1)}`,
                group: config?.calendarId,
                title: config?.title,
                start_time: moment( initialEventDateTime )?.local().format('YYYY-MM-DD[T]HH:mm:ss'),
                end_time: moment( initialEventDateTime ).add(durationEnum.HOURS, momentEnum.HOUR )?.local().format('YYYY-MM-DD[T]HH:mm:ss'), 
                // end_time: moment( initialEventDateTime ).add(config?.duration, momentEnum.HOUR )?.local().format('YYYY-MM-DD[T]HH:mm:ss'),
                isRecurringEvent: config?.isRecurringEvent 
            });
    
            for( let i = 0;  i < (numberOfEventSlots-1); i++ ) {
    
                switch ( config?.frequency ) {
                    case "minutely":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.MINUTES, momentEnum.MINUTES);
                        break;
                    case "hourly":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.HOURS, momentEnum.HOURS);
                        break;
                    case "daily":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.DAYS, momentEnum.DAYS);
                        break;
                    case "weekly":
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.WEEKS, momentEnum.DAYS);
                        break;
                    case 'monthly':
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.MONTHS, momentEnum.MONTHS);
                        break;
                    case 'yearly':
                        initialEventDateTime = setInitialEventTime( initialEventDateTime, durationEnum.YEARS, momentEnum.YEARS);
                        break;    
                    default:
                        break;
                }
                eventCollection.push({ 
                    id: `${config?.eventId}_${(eventCollection?.length + 1)}`,
                    group: config?.calendarId,
                    title: config?.title,
                    start_time: moment( initialEventDateTime )?.local().format('YYYY-MM-DD[T]HH:mm:ss'), 
                    end_time: moment( initialEventDateTime ).add(durationEnum.HOURS, momentEnum.HOUR )?.local().format('YYYY-MM-DD[T]HH:mm:ss'),
                    isRecurringEvent: config?.isRecurringEvent  
                });
            }
            
        } else {
                eventCollection.push({ 
                    id: `${config?.eventId}_${(eventCollection?.length + 1)}`,
                    group: config?.calendarId,
                    title: config?.title,
                    start_time: moment( config?.initialDateStartTime )?.local().format('YYYY-MM-DD[T]HH:mm:ss'), 
                    end_time: moment( config?.initialDateEndTime )?.local().format('YYYY-MM-DD[T]HH:mm:ss'),
                    isRecurringEvent: config?.isRecurringEvent 
                });
        }
        
    } catch ( error ) {
        console.log( error );
    }
    let timeLineName = config?.calendarEventType;
    let items = eventCollection;
    let groups = getTimeLineGroups( config?.timeLines, config?.calendars, config?.users );
    return  ( timeLineExists ) ? { ...timeLineExists, items: eventCollection, groups } : { timeLineName, items, groups };
}

function setInitialEventTime( initialEventDateTime, duration, frequencyType ) {
    return  moment(initialEventDateTime).add( duration, frequencyType );
}

function getTheNumberOfCalendarEventSlots(config) {
    if ( config === undefined ) throw new Error("Missing config");
        let numberOfCalendarEventSlots = ( config?.recurringEvent ) ? null : 1;
    try {
        switch ( config?.rrule?.freq ) {
            case "minutely":
                numberOfCalendarEventSlots = getElapsedTime(config, 'minutes');
                break;
            case "hourly":
                numberOfCalendarEventSlots = getElapsedTime(config, 'hours');
                break;
            case "daily":
                numberOfCalendarEventSlots = getElapsedTime(config, 'days');
                break;
            case "weekly":
                numberOfCalendarEventSlots = getElapsedTime(config, 'days');
                break;
            case 'monthly':
                numberOfCalendarEventSlots = getElapsedTime(config, 'months');
                break;
            case 'yearly':
                numberOfCalendarEventSlots = getElapsedTime(config, 'years');
                break;    
            default:
                break;
        }
    } catch ( error ) {
        console.log( error );    
    } 
    return numberOfCalendarEventSlots;
}

function getElapsedTime(config, frequencyType ){    
    let NumberOfDays = 7;
    if ( config?.rrule?.frequency === "weekly") {
        return  (Math.round((moment(config?.end).diff(moment(config?.start), frequencyType)/ NumberOfDays )));
    }
    return  (Math.round((moment(config?.end).diff(moment(config?.start), frequencyType))));
}


function getTimeLineGroups( timeLines, calendars, users ) {
    let timeLineGroup = ( timeLines?.groups ) ? timeLines?.groups : [];
    calendars.forEach(calendar => {
        let existingTimeLineGroup = ( timeLines?.groups?.find(timeline => timeline?.id === calendar?._id ) );
        if ( ! existingTimeLineGroup ) {
            let firstName = users?.find( user => user?._id === calendar?.userId && user?.role === role.Tutor )?.firstname;
            timeLineGroup.push({
                id: calendar?._id,
                title: `${ firstName }_${ calendar?._id }_${ calendar?.userId }`,
                rightTitle: `${ firstName }_${ calendar?._id }_${ calendar?.userId }`,
                bgColor: "#FFFF00"
            });
        }
    });
    return timeLineGroup;
}

export function datePatternIncludesTimeSequence( start, end ) {
    return start?.includes('T') && end?.includes('T');
}

export function getDate(currentDateTimeSequence) {
    return moment( currentDateTimeSequence )?.format('YYYY-MM-DD');
}

export function getTime(currentDateTimeSequence) {
    return moment( currentDateTimeSequence )?.format('HH:mm:ss');
}

export function getCurrentTimeInUsersLocale( timeformat ){
    return getTimeZoneDateTime( timeformat );
}