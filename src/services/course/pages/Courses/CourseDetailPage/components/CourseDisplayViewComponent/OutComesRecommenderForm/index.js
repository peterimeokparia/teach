import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveOutcome, loadOutcomes, loadOutcomeByOutcomeId } from 'services/course/actions/outcomes';
import { saveFormBuilder } from 'services/course/actions/formbuilders';
import { role } from 'services/course/helpers/PageHelpers';
import { togglePreviewMode, toggleModal } from 'services/course/actions/app'; 
import { toggleNewFormBuilderModal } from 'services/course/actions/formbuilders';
import { setLinkedItem } from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesRecommenderForm/helpers'; 
import { getUsersByOperatorId, getOperatorFromOperatorBusinessName } from 'services/course/selectors';
import OutComesRecommenderFormDetail from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesRecommenderForm/components/OutComesRecommenderFormDetail'; 
import useOutComesFormDetailHook from 'services/course/pages/Courses/hooks/useOutComesFormDetailHook';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Roles from 'services/course/pages/components/Roles'; 
import Paper from '@mui/material/Paper';
import './style.css';

const OutComesRecommenderForm = ({ 
    outCome, outcomes, cardItemProps, currentUser, openRecommenderModal, saveOutcome, 
    loadOutcomes, loadOutcomeByOutcomeId, questions, saveFormBuilder
 }) => {
    let { isFormModalOpen } = cardItemProps;

    const lessonOutcome = outcomes?.find( outcome => outcome?._id === outCome?._id);

    let { outcomeFormDetail } = useOutComesFormDetailHook( lessonOutcome );

    let { addConcept, removeConcept, addLink, onSubmitTest } = outcomeFormDetail;

    const [ title, setTitle ] = useState('');
    const [ selectedConcept, setSelectedConcept ] = useState('');

    useEffect(() => {
        if ( selectedConcept ) {
            setTitle( selectedConcept );
            loadOutcomeByOutcomeId( lessonOutcome?._id );
        }
    }, [ selectedConcept ]);

    useEffect(() => {
        loadOutcomes();
    }, [ isFormModalOpen, openRecommenderModal ]);

    return (<Box
                sx={{
                display: 'flex',
                '& > :not(style)': {
                    m: 1,
                    width: 575,
                    height: 868,
                },
                 marginLeft: -17,
                 marginTop: -2
                }}
            >
                <Paper sx={{ minWidth: 1170, maxHeight:1305, backgroundColor: outCome?.color, marginBottom:3.6, 
                    boxShadow: 20, marginLeft: -150, overflow: 'hidden',  overflowY: 'scroll', scrollbarWidth: 'none' }}    
                    variant="outlined"
                >
                     <div className='Recommender'>
                        {/* <div className='title'> 
                         <span className='multicolortext'>
                             {`Further Study`}
                         </span>
                        </div> */}
                            <Roles role={ currentUser?.role === role.Tutor}>
                                <Box sx={{ width: 500, minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
                                <FormControl fullWidth>
                                    <TextField id="outlined-basic" label="Enter new concept" variant="outlined" value={title} onChange={e => setTitle( e?.target?.value )}/>
                                </FormControl>
                                </Box>
                                <Box sx={{ width: 500, minWidth: 120}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select existing concept</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedConcept}
                                        label="Select existing concept"
                                        onChange={e => setSelectedConcept( e.target.value)}
                                    >
                                    { lessonOutcome?.lessonConcepts && lessonOutcome?.lessonConcepts.map( item => {
                                        return <MenuItem value={item?.concept}
                                                    style={ { marginBottom: '20px', fontSize: '25px', fontFamily: `Courier New, Courier, monospace` }}>
                                                            { item?.concept }
                                                </MenuItem>;
                                    })}
                                    </Select>
                                </FormControl>
                                </Box>
                                <div className="row"> 
                                <>
                                <div className='col button-left'>  <button onClick={() => setLinkedItem( title, 'links', addLink, addConcept, lessonOutcome?.lessonConcepts, title )}>{`learning link(s)`} </button> </div>
                                <div className='col button-right'> <button onClick={() => setLinkedItem( title, 'videos', addLink, addConcept, lessonOutcome?.lessonConcepts, title  )}>{`learning video(s)`} </button> </div>
                                </>    
                                </div>          
                                <br></br>
                            </Roles>
                            <div className='form-display'>
                            <form onSubmit={e => onSubmitTest(e)}>
                            { ( lessonOutcome?.lessonConcepts && lessonOutcome?.lessonConcepts.map( concept => (
                                <> 
                                    <Roles role={ currentUser?.role === role.Tutor}>
                                    <div>
                                    <h3> 
                                    { `${concept?.concept}` }  
                                        <DeleteIcon 
                                            id="QuizzIcon"
                                            data-cy={`${(concept?.concept)?.toLowerCase()}QuizzIcon`}
                                            className="round-button-2"
                                            onClick={() => removeConcept( concept?.concept )}
                                        />
                                    </h3> 
                                    </div>
                                    </Roles>
                                    <div> 
                                    { ( lessonOutcome?.links && lessonOutcome?.links.map( link => (
                                    <> 
                                    {( link?.concept === concept?.concept && link?.type === 'links' ) && 
                                        <>
                                        <OutComesRecommenderFormDetail 
                                            link={link} 
                                            lessonOutcome={lessonOutcome} 
                                            outCome={outCome} 
                                            currentUser={currentUser}
                                            questions={questions} 
                                            cardItemProps={cardItemProps}
                                        />
                                        </>
                                    }
                                    </>
                                    )))
                                    }
                                    { ( lessonOutcome?.links && lessonOutcome?.links.map( link => (
                                        <> 
                                        {( link?.concept === concept?.concept && link?.type === 'videos' ) && 
                                            <>
                                            <p>
                                                <br></br>
                                                <iframe 
                                                    width="360" 
                                                    height="315" 
                                                    src={link?.link} 
                                                    title="YouTube video player" 
                                                    frameborder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                    allowfullscreen
                                                />
                                             </p>
                                            <OutComesRecommenderFormDetail 
                                                link={link} 
                                                lessonOutcome={lessonOutcome} 
                                                outCome={outCome} 
                                                currentUser={currentUser}
                                                questions={questions} 
                                                cardItemProps={cardItemProps}
                                            />
                                            </>
                                        }
                                        </>
                                    )))
                                    }
                                    </div>
                                    </>
                                    ))
                                )
                            }
                            </form>
                            </div>
                        </div>
                </Paper>
            </Box>
    )
};

const mapDispatch = {
    togglePreviewMode, 
    toggleModal,
    toggleNewFormBuilderModal,
    saveOutcome,
    loadOutcomes,
    loadOutcomeByOutcomeId,
    saveFormBuilder
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        currentUser: state.users.user,
        course: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        courses: Object.values( state.courses.courses ),
        lessons: Object.values(state.lessons.lessons),
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        toggleQuestionModal: state.app.toggleModal,
        isFormModalOpen: state?.formBuilders?.isFormModalOpen,
        outcomes: Object.values( state.outcomes.outcomes ),
        questions: Object.values( state.onlineQuestions.onlineQuestions ),
        onlineQuestionProperties: state?.onlineQuestions?.onlineQuestionProperties 
    };
};

export default  connect( mapState, mapDispatch )(OutComesRecommenderForm);


