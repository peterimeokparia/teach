import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveOutcome, loadOutcomes, loadOutcomeByOutcomeId } from 'services/course/actions/outcomes';
import { role } from 'services/course/helpers/PageHelpers';
import { togglePreviewMode, toggleModal } from 'services/course/actions/app'; 
import { toggleNewFormBuilderModal } from 'services/course/actions/formbuilders';
import { setLinkedItem } from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesRecommenderForm/helpers'; 
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers'; 
import { getUsersByOperatorId, getOperatorFromOperatorBusinessName } from 'services/course/selectors';
import CloseIcon from '@mui/icons-material/Close';
import QuestionBuilder from 'services/course/pages/components/QuestionBuilder';
import FormQuestions from 'services/course/pages/FormBuilder/FormQuestions';
import Modal from 'react-modal';
import HelpIcon from '@material-ui/icons/Help';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Roles from 'services/course/pages/components/Roles'; 
import './style.css';

const OutComesRecommenderForm = ({ 
    outCome, outcomes, cardItemProps, currentUser, openRecommenderModal, saveOutcome, 
    loadOutcomes, loadOutcomeByOutcomeId, onlineQuestionProperties
 }) => {
    let {
        selectedOutcome, buildFurtherQuestions, toggleQuestionModal, formType, handleSettingConceptsModal,
        operatorBusinessName, isFormModalOpen, handleModalClose, goToFurtherQuestions } = cardItemProps;

    const lessonOutcome = outcomes?.find( outcome => outcome?._id === outCome?._id);
    const [ title, setTitle ] = useState('');
    const [ selectedConcept, setSelectedConcept ] = useState('');

    useEffect(() => {
        if ( selectedConcept ) {
            setTitle(selectedConcept );
            loadOutcomeByOutcomeId( lessonOutcome?._id );
        }
    }, [ selectedConcept ]);

    useEffect(() => {
        loadOutcomes();
    }, [ isFormModalOpen, openRecommenderModal ]);

    function addConcept( concept ){
        if ( lessonOutcome?.lessonConcepts?.find( item => item?.concept === concept ) ) {
            Swal.fire({
                title: `Please select existing concept`,
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#c244d8'
            });
        }
        
        if ( !lessonOutcome?.lessonConcepts?.find( item => item?.concept === concept ) ) {
            saveOutcome({...lessonOutcome, lessonConcepts: [ ...lessonOutcome?.lessonConcepts, { type:'concept', concept, id: lessonOutcome?._id } ] });
        }
        loadOutcomeByOutcomeId( lessonOutcome?._id );
    }

    function removeConcept( conceptToRemove ) {
        let updatedConcepts = lessonOutcome?.lessonConcepts?.filter( concept => concept?.concept !== conceptToRemove );

        saveOutcome({...lessonOutcome, lessonConcepts: updatedConcepts });
        loadOutcomeByOutcomeId( lessonOutcome?._id );
    }

    function addLink( title, link, concept, type, uniqueId) {
        if ( !lessonOutcome?.lessonConcepts?.find( item => item?.concept === concept ) ) {
            saveOutcome({...lessonOutcome, lessonConcepts: [ ...lessonOutcome?.lessonConcepts, { type:'concept', concept, id: lessonOutcome?._id } ], links: [ ...lessonOutcome?.links, { type, link, title, concept,  id: lessonOutcome?._id, uniqueId } ] });
        } else {
            saveOutcome({...lessonOutcome, lessonConcepts: lessonOutcome?.lessonConcepts, links: [ ...lessonOutcome?.links, { type, link, title, concept,  id: lessonOutcome?._id, uniqueId } ] });
        }
        loadOutcomeByOutcomeId( lessonOutcome?._id );
    }

    function removeLink( uniqueIdToRemove ) {
        let updatedLinks = lessonOutcome?.links?.filter( link => link?.uniqueId !== uniqueIdToRemove );

        saveOutcome({...lessonOutcome, links: updatedLinks });
        loadOutcomeByOutcomeId( lessonOutcome?._id );
    }

    return (<div> 
               {( isFormModalOpen ) 
                ? <Modal isOpen={ toggleQuestionModal }  onRequestClose={() => handleModalClose( lessonOutcome )} style={{overlay: {}, content: { "marginLeft": "-1.7%" }}}>
                    <QuestionBuilder props={ onlineQuestionProperties }>
                     { ( props ) => 
                        {
                        return <div>
                            <FormQuestions 
                                outcomeId={lessonOutcome?._id} 
                                formName={props?.formName}
                                formBuilderState={props?.formBuilderState}
                                formBuilderStatus={props?.formBuilderStatus}
                                operatorBusinessName={operatorBusinessName}
                                formType={props?.formType}
                                formId={props?.formId}
                                eventId={props?.eventId} 
                                formUuId={props?.formUuId}
                                userId={currentUser?._id}
                                courseId={props?.courseId}
                                lessonId={props?.lessonId}
                            /> 
                        </div>;
                        }
                     }
                    </QuestionBuilder>                         
                    <CloseIcon 
                        style={{ color: 'red', position: 'fixed', zIndex: '1', top: '1.7%', 
                            fontSize: 30, 'marginLeft': '96.2%',cursor: 'pointer'  
                        }}
                        onClick={() => handleModalClose(lessonOutcome)}
                    />
                  </Modal> // refactor - inprogress
                : <Modal isOpen={ openRecommenderModal } onRequestClose={() => handleSettingConceptsModal( !openRecommenderModal, lessonOutcome  )}
                    style={{
                        overlay: {
                        backgroundColor: 'skyblue',
                        opacity: 0.95,
                        overflow: 'hidden',
                    },
                        content: {
                        width: '65%',
                        height: '90%',
                        "marginTop": "1%",
                        "marginLeft": "14%",
                        border: 1,
                        borderStyle: 'dashed',
                        scrollbarWidth: 'none',
                        overflow: 'hidden', 
                        overflowY: 'auto'
                    }}}
                > 
                {  <div className="modal-content">
                    {<div className='Recommender'>
                        <div className='title'> 
                         <span className='multicolortext'>
                             {`Further Study`}
                         </span>
                        </div>
                         
                        <Roles role={ currentUser?.role === role.Tutor}>
                            <Box sx={{ minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
                            <FormControl fullWidth>
                                <TextField id="outlined-basic" label="Enter new concept" variant="outlined" value={title} onChange={e => setTitle( e?.target?.value )}/>
                            </FormControl>
                            </Box>
                            <Box sx={{ minWidth: 120 }}>
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
                                                    style={ { marginBottom: '20px', fontSize: '25px', fontFamily: `Courier New, Courier, monospace` }} >
                                                            { item?.concept }
                                                </MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                            </Box>
                            <div className="row"> 
                            <>
                            <div className='col'>  <button onClick={() => setLinkedItem( title, 'links', addLink, addConcept, lessonOutcome?.lessonConcepts, title )}>{`learning link(s)`} </button> </div>
                            <div className='col'>  <button onClick={() => setLinkedItem( title, 'videos', addLink, addConcept, lessonOutcome?.lessonConcepts, title  )}>{`learning video link(s)`} </button> </div>
                            </>    
                            </div>          
                            <br></br>
                        </Roles>
                            <form>
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
                                        <div className="row">
                                        <div className='col'>
                                            <p>
                                                <a href={link?.link}>
                                                    <label className='link-label'> {link?.title} </label> 
                                                </a> 
                                            </p>
                                            <p className={'linked-articles'}>   
                                            <div className='row justify-content-center'>
                                                <span>
                                                {<span className='justify-content-center '>
                                                    {<>
                                                        <HelpIcon 
                                                            id="QuizzIcon"
                                                            data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                                            className="round-button-2"
                                                        />
                                                     </>
                                                    }
                                                </span>
                                                }
                                                </span>
                                                { link?.questions?.map( (question, index) => { 
                                                    return (<span><button className="questions-outcome" onClick={() => goToFurtherQuestions(lessonOutcome, question)}>{`${(index+1)}`}</button></span> );
                                                })
                                                }
                                            </div>
                                            </p>
                                        </div>
                                        <Roles role={ currentUser?.role === role.Tutor}>
                                            <div className='col links-question'>
                                                <HelpIcon 
                                                    id="QuizzIcon"
                                                    data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                                    className="round-button-2"
                                                    onClick={() => buildFurtherQuestions( lessonOutcome, link )}
                                                />
                                            </div>
                                            <div className='col links-delete'>
                                                <DeleteIcon 
                                                    id="QuizzIcon"
                                                    data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                                    className="round-button-2"
                                                    onClick={() => removeLink( link?.uniqueId )}
                                                />
                                            </div>
                                        </Roles>
                                        </div>      
                                        </>  
                                    }
                                    </>
                                    )))
                                    }
                                    { ( lessonOutcome?.links && lessonOutcome?.links.map( link => (
                                        <> 
                                        {( link?.concept === concept?.concept && link?.type === 'videos' ) && 
                                           <div className="row">
                                            <div className='col'>
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
                                            <p className={'linked-articles'}>
                                            <div className='row justify-content-center'>
                                            {<span className='justify-content-center'>
                                                {<>
                                                    <HelpIcon 
                                                        id="QuizzIcon"
                                                        data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                                        className="round-button-2"
                                                        onClick={() => buildFurtherQuestions( lessonOutcome, link )}
                                                    />
                                                </>
                                                }
                                             </span>
                                            }
                                            { <>
                                                {  link?.questions?.map( ( question, index ) => {
                                                    return (<span><button className="questions-outcome" onClick={() => goToFurtherQuestions(lessonOutcome, question)}>{`${(index+1)}`}</button></span> )
                                                    })
                                                }
                                              </>    
                                            }
                                            </div>
                                            </p>
                                            </div>
                                            <Roles role={ currentUser?.role === role.Tutor}>
                                                <div className='col'>
                                                    <HelpIcon 
                                                        id="QuizzIcon"
                                                        data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                                        className="round-button-2"
                                                        onClick={() => buildFurtherQuestions( lessonOutcome, link )}
                                                    />
                                                </div>
                                                <div className='col'>
                                                    <DeleteIcon 
                                                        id="QuizzIcon"
                                                        data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                                        className="round-button-2"
                                                        onClick={() => removeLink( link?.link )}
                                                    />
                                                </div>
                                            </Roles>
                                            </div>
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
                    }
                </div>
                }
                </Modal>
        }
        </div> 
    );
};

const mapDispatch = {
    togglePreviewMode, 
    toggleModal,
    toggleNewFormBuilderModal,
    saveOutcome,
    loadOutcomes,
    loadOutcomeByOutcomeId
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
        onlineQuestionProperties: state?.onlineQuestions?.onlineQuestionProperties 
        
    };
};

export default  connect( mapState, mapDispatch )(OutComesRecommenderForm);


