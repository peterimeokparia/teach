import { connect } from 'react-redux';
import { formNames } from 'services/course/pages/CalendarPage/helpers';
import { iconStyleMain } from './inlineStyles';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import useSimpleEventHook from 'services/course/pages/CalendarPage/hooks/useSimpleEventHook';
import useAddEventToCalendarHook from 'services/course/pages/CalendarPage/hooks/useAddEventToCalendarHook';
import './style.css';

const LessonNavigationComponent = ({ props }) => {
    let {
        calendarSlotInfo,
        user,
        courses,
        lessons,
        courseId,
        lessonId
    } = props;

    let {
        start,
        end,
        duration
    } = useSimpleEventHook( calendarSlotInfo );

    let {
        addEventToCalendar
    } = useAddEventToCalendarHook( props );

    const lessonCalendarObjects = { 
        Board: {
            formName: formNames?.Board,
            title: courses?.find( course => course?._id === courseId )?.name,
            backgroundColor: "pink", 
            textColor: "blue",
            user
        }, 
        LessonNotes: {
            formName: formNames?.Notes,
            title: lessons?.find( lsn => lsn?._id === lessonId )?.title,
            backgroundColor: "yellow", 
            textColor: "black",
            user
        }, 
        StudentNotes: {
            formName: formNames?.StudentNotes,
            title: `${courses?.find( course => course?._id === courseId )?.name}_${lessons?.find( lsn => lsn?._id === lessonId )?.title}`,
            backgroundColor: "blue", 
            textColor: "purple",
            user
        }
    };

    function addLessonEventToCalendar( lessonCalendarProps ) {
        let event = {
            title: lessonCalendarProps?.title,
            backgroundColor: lessonCalendarProps?.backgroundColor,
            textColor: lessonCalendarProps?.textColor,
            url: "",
            recurringEvent: false, 
            allDay: false,
            start,
            end,
            duration
        };

        addEventToCalendar( event, lessonCalendarProps?.formName );
    }

return (
    <div className="OnlineHelp">
        <h1>{`.`}</h1> 
        <br></br>
        <form>    
            <div className="center">
                {
                <div>   
                <div className="">
                 
                  <span>
                  <DashboardCustomizeIcon
                    style={ iconStyleMain() }
                    className="comment-round-button-1"
                    onClick={() => addLessonEventToCalendar( lessonCalendarObjects?.Board )}
                  />
                  </span>
                </div>
                </div>
            }
            </div>
        </form>
    </div>
); };

 

export default connect(null, null)(LessonNavigationComponent);