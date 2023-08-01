import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import { goToCalendar } from 'services/course/pages/Users/helpers';
import { incrementDisplayedItemCount } from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/helpers';
import { restrictTextLength } from 'services/course/helpers/PageHelpers';
import { Link } from '@reach/router';
import { role } from 'services/course/helpers/PageHelpers';
import Roles from 'services/course/pages/components/Roles';
import { sideBarEditIconStyle, sideBarDeleteIconStyle,sideBarHomeWorkIconStyle,sideBarHelpIconStyle,
    swapHorizIconStyle, calendarStyle, sideBarFurtherStudyIconStyle } from 'services/course/pages/Courses/CourseDetailPage/components/inlineStyles';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

export const NewLessonPageDetails = ({
    edit, 
    remove, 
    forms, 
    lesson,
    toggleLessonItemDisplayCount, 
    setToggleLessonItemDisplayCount, 
    startLessonSession, calendarProps, 
    formProps,
    resetSelectedSearchItem,
    currentUser, 
}) => {
    return (
        <div>
            <div onClick={resetSelectedSearchItem}>
            {
                <Link to={`lessons/${lesson._id}`}> <span title={lesson?._id} className="lessonMultiColor">{ restrictTextLength( lesson?.title, 10, 10 ) }</span></Link>
            } 
            </div>
            <div className="row justify-content-center"> 
                <span>
                <SportsScoreIcon 
                    onClick={() => startLessonSession()}
                    color="action"
                    className="comment-round-button-2"
                    style={ calendarStyle() }
                    data-cy={`start-lesson`}
                />
                <CalendarMonthIcon 
                    onClick={() => goToCalendar( calendarProps, currentUser, eventEnum?.Lessons )}
                    color="action"
                    className="comment-round-button-4"
                    style={ calendarStyle() }
                    data-cy={`lesson-calendar`}
                />
                </span>
            </div>
            <div className="row justify-content-center">
            <span> 
            <Roles role={ currentUser?.role === role.Tutor }>
                <EditIcon 
                    onClick={() => { edit(lesson.title); } }
                    color="action"
                    className="comment-round-button-1"
                    style={ sideBarEditIconStyle() }
                    data-cy={`edit-lesson`}
                />
            </Roles>
            <Roles role={currentUser?.role === role.Tutor }>
                <DeleteIcon 
                    onClick={remove}
                    color="action"
                    className="comment-round-button-3"
                    style={ sideBarDeleteIconStyle() }
                    data-cy={`delete-lesson`}
                />
            </Roles>
                <HelpIcon 
                    onClick={() => { forms( lesson, formTypes.quizzwithpoints, formProps ); } }
                    color="action"
                    className="comment-round-button-2"
                    style={ sideBarHelpIconStyle(currentUser) }
                    data-cy={`lesson-quizz-with-points`}
                />
                <HomeOutlinedIcon 
                    onClick={() => { forms( lesson, formTypes.homework, formProps ); } }
                    color="action"
                    className="comment-round-button-4"
                    style={ sideBarHomeWorkIconStyle() }
                    data-cy={`lesson-home-work`}
                />
                <AutoStoriesIcon
                    onClick={() => { forms( lesson, formTypes.lessoninsights, formProps ); } }
                    color="action"
                    className="comment-round-button-9"
                    style={ sideBarFurtherStudyIconStyle() }
                    data-cy={`lesson-insights`}
                />
                <SwapHorizIcon 
                    onClick={() => incrementDisplayedItemCount(  toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount ) }
                    color="action"
                    className="comment-round-button-6"
                    style={ swapHorizIconStyle() }
                    data-cy={`toggle-lesson-items`}b
                />
            </span> 
            </div>   
        </div> 
    );
}

export default NewLessonPageDetails;