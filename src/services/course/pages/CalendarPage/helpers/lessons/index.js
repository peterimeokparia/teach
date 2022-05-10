import {
eventEnum,
studentsOption } from 'services/course/pages/CalendarPage/helpers';

import {
iconStyleMain } from './inlineStyles';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
LESSONNOTES,
STUDENTNOTES } from 'services/course/actions/notes';

import { 
navigate } from '@reach/router';

import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import NotesIcon from '@material-ui/icons/Notes';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import SchoolIcon from '@mui/icons-material/School';
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
import moment from "moment";
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/list/main.css";
import './style.css';

export function handleLessons( renderSwitchProps  ){

    const lesson = {
        lesson: 'Lesson',
        lessonNotes: 'LessonNotes',
        myNotes: 'MyNotes',
        videoCall: 'VideoCall',
        recordedSession: 'RecordedSession',
        whiteBoard: 'WhiteBoard'
    };

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
        formNames,
        handleEventClick,
        handleSelect,
        courseId,
        lessonId, 
        classRoomId,
        renderEventContent,
        lessonProps
    } = renderSwitchProps;

    let {
        allNotes,
        currentEventId,
        formName,
        selectedUser,
        currentUser,
        title,
        markDownContent,
        content,
        noteDate,
        operatorId,
        eventId,
        addNotes,
        loadAllNotes
    } = lessonProps;

    const course = courses?.find( course => course?._id === courseId ); 
    const lessonNote = allNotes?.find( note => note?.lessonId === lessonId && note?.noteType === LESSONNOTES );
    const myNote = allNotes?.find( note => note?.lessonId === lessonId && note?.noteType === STUDENTNOTES );
    const goToPage = ( url ) => { window.location.href = url; };

    function handlePageNavigation( page ) {

        switch ( page ) {
            case lesson.lesson:
                navigate(`/${operatorBusinessName}/lessonplan/course/${courseId}/lesson/${lessonId}`);
                return 
            case lesson.lessonNotes:
                navigate(`/${operatorBusinessName}/notes/${lessonNote?._id}/noteType/${LESSONNOTES}/course/${courseId}/lesson/${lessonId}`);
                return
             case lesson.myNotes:
                navigate(`/${operatorBusinessName}/notes/${myNote?._id}/noteType/${STUDENTNOTES}/course/${courseId}/lesson/${lessonId}/user/${userId}`);
                return;
            case lesson.videoCall:
                navigate(`/${operatorBusinessName}/meetings/course/${courseId}/lesson/${lessonId}`);
                return;
            case lesson.recordedSession:
                const url = `http://localhost:3000/videos/LessonVideo_${lessonId}.webm`
                goToPage( url );
                return;
            case lesson.whiteBoard:
                navigate(`/${operatorBusinessName}/board/course/${courseId}/lesson/${lessonId}`);
                return;
            default:
                break;
        }
    }

    return ( 
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}> 
        <div className="boardEditorDisplay">
            <div className="OnlineHelp">
            {"hello"}
                <form>    
                    <div className="center">
                        {
                        <div className="">   
                            <div className="row">
                                <div className="cols">
                                    <SchoolIcon
                                        style={ iconStyleMain() }
                                        className="comment-round-button-1"
                                        onClick={() => handlePageNavigation( lesson.lesson )}
                                    />
                                </div>
                                <div className="cols">
                                    <NotesIcon
                                        style={ iconStyleMain() }
                                        className="comment-round-button-2"
                                        onClick={() => handlePageNavigation( lesson.lessonNotes )}
                                    />
                                </div>
                                <div className="cols">
                                    <NotesIcon
                                        style={ iconStyleMain() }
                                        className="comment-round-button-3"
                                        onClick={() => handlePageNavigation( lesson.myNotes )}
                                    />
                                </div> 
                            </div>

                            <div className="rowBetween"/> 
                            
                            <div className="row">
                                <div className="cols">
                                <VideoCallIcon 
                                    style={ iconStyleMain() }
                                    className="comment-round-button-1"
                                    onClick={() => handlePageNavigation( lesson.videoCall )}
                                />
                                </div>
                                <div className="cols">
                                    <PlayLessonIcon
                                        style={ iconStyleMain() }
                                        className="comment-round-button-2"
                                        onClick={() => handlePageNavigation( lesson.recordedSession )}
                                    />
                                </div>
                                <div className="cols">
                                    <DashboardCustomizeIcon
                                        style={ iconStyleMain() }
                                        className="comment-round-button-1"
                                        onClick={() => handlePageNavigation( lesson.whiteBoard )}
                                    />
                                </div> 
                            </div>
                        </div>
                    }
                    </div>
                </form>
                </div>
            </div>    
    </Modal>)    
}