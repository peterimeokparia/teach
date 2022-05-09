import {
newCalendarEventData, 
eventEnum } from 'services/course/pages/CalendarPage/helpers';

import { 
navigate } from '@reach/router';

import { 
generateUuid } from 'services/course/pages/Users/helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import TutorCourseLessonListComponent from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent';
import useSimpleEventHook from 'services/course/pages/CalendarPage/hooks/useSimpleEventHook';
import './style.css';
    
    const Courses = ({ 
        courseProps,
        handleSubmit,
        operatorBusinessName,
        slotInfo,
    }) => {
    
        let {
            events, 
            currentUser,
            selectedUserId,
            publishedForms, 
            calendarEventType,
            calendarId,
            addNewFormBuilder
        } = courseProps;
    
        let {
            start,
            end,
            duration
        } = useSimpleEventHook( slotInfo );
    
    function handleSelectedForm( selectedForm ){
        const selectedCalendarSlotDate = getEventStartDate(start);
        const selectedFormDisplayName = selectedForm?.formDisplayName;
        const formName = selectedForm?.formName;
        const formEvent = events?.find( event => event?.calendarEventType === calendarEventType && 
                                                event?.calendarId === calendarId &&            
                                                    event?.event?.title === selectedFormDisplayName && 
                                                        getEventStartDate( event?.event?.start ) === selectedCalendarSlotDate );
    
        const formEventSchedule = formEvent?.schedulingData[0];
        const formCalendarEventExists = ( formEventSchedule?._id === selectedForm?._id );
    
        if ( formCalendarEventExists ) {
    
                let formUuId = generateUuid();
            
                if ( selectedForm ) {
              
                  let newBuilder = {
                    operatorBusinessName: selectedForm?.operatorBusinessName,
                    formType: selectedForm?.formType,
                    formName: selectedForm?.formName,
                    courseId: selectedForm?.courseId,
                    lessonId: selectedForm?.lessonId,
                    formUuId,
                    formId: selectedForm?.formId,
                    createDateTime: selectedForm?.createDateTime,
                    takingDateTime: Date.now(),
                    createdBy: selectedForm?.createdBy,
                    userId: currentUser?._id,
                    status: elementMeta.status.InProgress,
                    state: elementMeta.state.Taking,
                    eventId: formEvent?._id
                  };
              
                  addNewFormBuilder( newBuilder );
    
                  return;
              
                }
        };
    
        let event = {};
    
        event = {
            title: `${selectedForm?.formDisplayName}`,
            recurringEvent: false,
            allDay: false,
            start,
            end,
            duration
        };
    
        handleSubmit( newCalendarEventData( event, 'location', [ selectedForm ], undefined, undefined, undefined, undefined ) );
    
        navigate(`/${operatorBusinessName}/schedule/${calendarEventType}/calendar/${calendarId}/user/${selectedUserId}`);
    }
    
    function getEventStartDate( startDateTime ){
        return startDateTime.split('T')[0];
    }
    
    return (
    <div className="events">
         <h2>{`Select A Form`}</h2> 
            <br></br>
            <TutorCourseLessonListComponent
                operatorBusinessName={operatorBusinessName} 
                user={currentUser} 
                forms={(calendarEventType === eventEnum.ReportForms) ? publishedForms?.filter(form => form?.formType === formTypes.report) : publishedForms?.filter(form => form?.formType !== formTypes.report)}
                //forms={publishedForms}
                setSelectedForm={handleSelectedForm}
            />  
    </div>
    ); };
    
    export default Courses;