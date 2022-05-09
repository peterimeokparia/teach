import {
eventEnum,
studentsOption } from 'services/course/pages/CalendarPage/helpers';

import {
iconStyleMain } from './inlineStyles';

import { 
role } from 'services/course/helpers/PageHelpers';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import NotesIcon from '@material-ui/icons/Notes';
import FullCalendar from '@fullcalendar/react';
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listWeek from "@fullcalendar/list";
import ConsultationForm from 'services/course/pages/CalendarPage/components/ConsultationForm';
import Modal from "react-modal";
import SessionScheduling from 'services/course/pages/CalendarPage/components/TimeLines/SessionScheduling';
import OnlineTutoringRequestForm from 'services/course/pages/CalendarPage/components/OnlineTutoringRequestForm';
import Forms from 'services/course/pages/CalendarPage/components/Forms';
import Scheduling from 'services/course/pages/CalendarPage/components/Scheduling/index.js';
import LessonNavigationComponent from 'services/course/pages/CalendarPage/components/LessonNavigationComponent';
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import './style.css';

export function renderSwitch( renderSwitchProps ) {

    let {
        operatorBusinessName,
        isModalOpen,
        closeModal,
        calendarSlotInfo,
        addNewCalendarEvent,
        user,
        users,
        courses,
        scheduledStudents,
        setScheduledStudents,
        studentsOption,
        events, 
        userId, 
        publishedForms, 
        calendarEventType, 
        calendarId, 
        addNewFormBuilder,
        eventDataObj,
        component,
        handleEventClick,
        handleSelect,
        renderEventContent
    } = renderSwitchProps;

    switch ( component ) {

        case eventEnum.NewEvent:
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <Scheduling
                            slotInfo={calendarSlotInfo}
                            schedulingData
                            submitEventButtonText={"Add New Event"}
                            handleSubmit={addNewCalendarEvent} 
                        />
                    </Modal>;
        case eventEnum.ConsultationForm:
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <ConsultationForm 
                            user={user}
                            slotInfo={calendarSlotInfo}
                            courses={courses}
                            handleSubmit={addNewCalendarEvent}
                        /> 
                    </Modal>;
        case eventEnum.SessionScheduling:
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <SessionScheduling 
                            scheduledStudents={scheduledStudents}
                            onChange={setScheduledStudents}
                            options={studentsOption(users)}
                        > 
                            <Scheduling
                                slotInfo={calendarSlotInfo}
                                schedulingData={scheduledStudents}
                                submitEventButtonText={"Schedule Session"}
                                handleSubmit={addNewCalendarEvent} 
                            />  
                        </ SessionScheduling>
                    </Modal>;
        case eventEnum.TutorCalendar:
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <SessionScheduling 
                            scheduledStudents={scheduledStudents}
                            onChange={setScheduledStudents}
                            options={studentsOption(users)}
                        > 
                        {(user.role === role.Student ) && 
                            <ConsultationForm 
                                user={user}
                                slotInfo={calendarSlotInfo}
                                courses={courses}
                                handleSubmit={addNewCalendarEvent}
                            />  
                        } 
                            <Scheduling
                                slotInfo={calendarSlotInfo}
                                schedulingData={scheduledStudents}
                                submitEventButtonText={"Schedule Session"}
                                handleSubmit={addNewCalendarEvent} 
                            />  
                        </ SessionScheduling>
                    </Modal>;
        case eventEnum.OnlineTutoringRequest:
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <OnlineTutoringRequestForm 
                            scheduledStudents={scheduledStudents}
                            onChange={setScheduledStudents}
                            options={studentsOption(users)}
                        > 
                            <Scheduling
                                slotInfo={calendarSlotInfo}
                                schedulingData={scheduledStudents}
                                submitEventButtonText={"Schedule Session"}
                                handleSubmit={addNewCalendarEvent} 
                            />  
                        </ OnlineTutoringRequestForm>
                    </Modal>;
        case eventEnum.ReportForms:
        case eventEnum.QuizzForms:    
            return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                        <Forms
                            reportProps={ { events, currentUser: user, selectedUserId: userId, publishedForms, calendarEventType, calendarId, addNewFormBuilder } }
                            operatorBusinessName={operatorBusinessName}
                            slotInfo={calendarSlotInfo}
                            handleSubmit={addNewCalendarEvent}
                        />
                    </Modal>;
        case eventEnum.Lessons:  
        return <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
                    <LessonNavigationComponent props={renderSwitchProps}/>
                </Modal>;
        default:
            return <div>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, listWeek, interactionPlugin, rrulePlugin]}
                        navLinks={true}
                        headerToolbar={{
                            left: 'prev, next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        weekNumbers={true}
                        initialView='dayGridMonth'
                        // eventContent={renderEventContent}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        select={handleSelect}
                        events={ eventDataObj }
                        eventClick={handleEventClick}
                    />
                    <FullCalendar  
                        defaultView="listWeek" 
                        plugins={[listWeek, dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]} 
                        events={ eventDataObj } 
                        initialView='listWeek' 
                    />
                </div>;
    }
}