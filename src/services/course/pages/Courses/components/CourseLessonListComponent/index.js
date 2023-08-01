import { connect } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { mapState, mapDispatch } from '../../storeConnector';
import NewItemComponent from 'services/course/pages/components/NewItemComponent';
import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import useNewLessonPageHook from 'services/course/pages/Lessons/hooks/useNewLessonPageHook';

const CourseLessonListComponent = ({
    onLessonError,
    courseId,
    selectedTutorId,
    currentUser, 
    saveLessonInProgress, 
    addNewLesson,
    saveLesson,
}) => {
    let { 
        newLessonItemProps, 
    } = useNewLessonPageHook( onLessonError, saveLessonInProgress );
  return (
    // <div className="sidebar"> 
        <div> 
            <ListItem
                collection={lessonsByCourseId}
                onMatchListItem={onMatchListItem}
                path={"lessons"}
            >
                {( lesson ) => (
                    <NewItemComponent
                        className="lesson-item"
                        initialValue={lesson?.title ?? ""}
                        items={lessonsByCourseId}
                        item={lesson}
                        onSubmit={(title) => saveLesson({...lesson, title})}
                        {...newLessonItemProps}
                    >
                        { 
                            children( lesson )
                        }
                    </NewItemComponent>

                )}
            </ListItem>    
            <Roles role={currentUser?.role === role.Tutor }>
                <NewItemComponent
                    className="add-lesson-button"
                    initialValue={""}
                    onSubmit={title => addNewLesson( {title, introduction: title, courseId, lessonDate: Date.now(), userId: selectedTutorId } )} 
                    items={lessonsByCourseId}
                    {...newLessonItemProps}
                >
                    {(edit) =>  (
                        <div>
                        <button 
                            className="add-lesson-button"
                            onClick={edit}> 
                            Add New Lesson
                        </button>
                        { onLessonError && onLessonError?.message  }
                        </div>
                    )}
                </NewItemComponent>
            </Roles>
        </div>                                         
    );
};

export default connect( mapState, mapDispatch )(CourseLessonListComponent);