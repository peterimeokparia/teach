import { connect } from 'react-redux';
import { getUsersByOperatorId, getOperatorFromOperatorBusinessName, 
    getLessonOutcomesByLessonId, getNoteByNoteId } from 'services/course/selectors';
import { addNotes, saveNotes, buildLessonNotes } from 'services/course/actions/notes';
import { setMarkDown } from 'services/course/actions/editor';
import useLessonNoteHook from 'services/course/pages/Lessons/hooks/useLessonNoteHook';
import QuestionOutcomeComponent from 'services/course/pages/FormBuilder/FormQuestions/components/QuestionOutcomeComponent';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
import NotesIcon from '@mui/icons-material/Notes';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ListItem from 'services/course/pages/components/ListItem'; 
import MeasurableOutcomeResult from 'services/course/pages/Lessons/LessonNote/components/MeasurableOutcomeResult'; 
import './style.css';

const LessonNote = ({ buildLessonNotes, operatorBusinessName, noteId, noteType, lessonId, courseId, 
    outcomes, outcomeId, outcome, lessonNote, setMarkDown, currentUser, addNotes, saveNotes }) => {
    let { saveNotesMarkDown, onMatchListItem, toggleConcepts } = useLessonNoteHook( setMarkDown );

return (<div>
        <Box
            sx={{
            display: 'flex',
            '& > :not(style)': {
                m: 1,
                width: 575,
                height: 968,
            },
                marginLeft: 5,
                marginTop: -2
            }}
        >
            <Paper sx={{ minWidth: 1470, maxHeight:1505, backgroundColor: lessonNote?.color, marginBottom:3.6, 
                boxShadow: 20, marginLeft: -150, overflow: 'hidden',  overflowY: 'scroll', scrollbarWidth: 'none' }}    
                variant="outlined"
            > 
                <div className='row justify-content-center'>  
                <div className='row justify-content-center'>         
                <div className='col lessonNote-header'>
                    <box className={'lessonNote-header-inner'} sx={{ width: 1200, minWidth: 1020, marginTop: '40px' }} align="center">
                    <Typography sx={{  minWidth: 275, maxHeight:505, backgroundColor: outcome?.color }}variant="h4" align="center">{`${ lessonNote?.title?.toUpperCase()  }`}</Typography>
                    <Typography className={'lessonNote-header-inner-date-time'} sx={{  minWidth: 275, maxHeight:505, backgroundColor: outcome?.color }}variant="h5" align="center">{ new Date( lessonNote?.noteDate  ).toLocaleString() }</Typography>
                    </box>
                </div>
                </div>
                </div>
                <div className='Recommender'>
                    <div>
                    <p className={'linked-articles'}>   
                        <div className='row justify-content-center'>
                        <div className='row'>
                            <div className='col'>
                            <Box sx={{ width: 1200, minWidth: 1020, marginTop: '40px', marginLeft: -42  }}>
                            <MyEditorTest2  
                                element={ lessonNote } 
                                content={ lessonNote?.markDownContent } 
                                readOnly={ false } 
                                showMenuButtons={ true } 
                                setElementContentFromEditorState={ editorState => saveNotesMarkDown( lessonNote, editorState ) }
                            /> 
                            </Box>
                            </div>
                        </div> 
                        </div>
                        </p>

                        <p className={'linked-articles'}>   
                        <div className='row justify-content-center'>
                        <div className='row'>
                            <div className='col'>
                                <MeasurableOutcomeResult header={'Pass'} rate={'20'} passFailRate={'15'}/>
                            </div>
                            <div className='col'>
                                <MeasurableOutcomeResult header={'Coaching Plan'} rate={'2'} passFailRate={'2'}/>
                            </div>
                        </div> 
                        </div>
                        </p>
                    </div>
                </div>
            </Paper>
            <div className={'stage-2'}>
            <ListItem
                collection={ outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonId  ) }
                onMatchListItem={()=>onMatchListItem}
                ul={'sidebar_list'}
                li={'sidebar_list_body'}
                path={"lessons"}
            >
                {( outcome, index ) => (
                <QuestionOutcomeComponent 
                    outcome={outcome}
                    index={index}
                    handleOnBlur={() => toggleConcepts}
                >
                {( outcome ) => 
                    <NotesIcon 
                        onClick={() => { buildLessonNotes({ outcome, lessonNote }) }}
                        color="action"
                        className="comment-round-button-4"
                    /> 
                }
                </QuestionOutcomeComponent>  
                )}
            </ListItem>
            </div>
        </Box>
        </div>
)};

const mapDispatch = {
    setMarkDown, 
    addNotes, 
    saveNotes,
    buildLessonNotes
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        currentUser: state.users.user,
        lessonNote: getNoteByNoteId(state, ownProps),
        outcomes: getLessonOutcomesByLessonId(state, ownProps),
        course: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        courses: Object.values( state.courses.courses ),
        lessons: Object.values(state.lessons.lessons),     
    };
};

export default  connect( mapState, mapDispatch )(LessonNote);


