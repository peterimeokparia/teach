import { connect } from 'react-redux';
import { getCoursesByCreatedByIdSelector, getLessonByLessonIdSelector } from 'services/course/selectors';
import Meeting from 'services/course/pages/Meeting';

const ShowMeeting = ({
    lessonId,
    lesson,
    currentUser
}) => {
  return <div className="builder3"> 
        <header>
        {
            <div className="multicolortext">
                { lesson?.title }
            </div>
        }
        </header>
        <div className="content">
        <div className="onlinequestion-list-items">  
            <div className="OnlineListItems">
            <div className="lesson-content"> 
            </div>   
                <div className="lesson2">        
                    {      
                        <Meeting
                          userName={currentUser?.firstname}   
                          roomName={`${lessonId}`}
                          resizedHeight={"900px"}
                          containerHeight={"100%"}
                          containerWidth={"100%"}  
                        /> 
                    }            
                </div> 
            </div>
        </div>
        </div>
    </div>;
};

const mapState = (state, ownProps) => {
    return {
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        isLessonsLoading:state.lessons.lessonsLoading,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        course: state.lessons.course,
        onLessonError: state.lessons.onSaveLessonError,
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        lesson: getLessonByLessonIdSelector( state, ownProps )
    };
};

export default connect( mapState, null )(ShowMeeting);