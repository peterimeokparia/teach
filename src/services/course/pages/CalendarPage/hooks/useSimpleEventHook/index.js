import {
transformDateTime } from 'services/course/pages/CalendarPage/helpers';

function useSimpleEventHook(  slotInfo ){
    const [ start, end, allDay ] = Object.entries(slotInfo);
    const [ calendarViewType ] = Object.entries(slotInfo?.view);
    let dateTimeString = transformDateTime( start[1], end[1], calendarViewType, allDay[1] );

    return {
        start: dateTimeString?.resStartStr,
        end: dateTimeString?.resEndStr,
        duration: ( new Date( dateTimeString?.resEndStr ) - new Date( dateTimeString?.resStartStr ) )
    }
}

export default useSimpleEventHook;