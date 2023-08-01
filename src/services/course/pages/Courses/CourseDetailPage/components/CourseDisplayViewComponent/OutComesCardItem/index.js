
import { connect } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { buildLessonNotes } from 'services/course/actions/notes';
import { setCurrentOutcome } from 'services/course/actions/outcomes';
import { getTutorsLessonUserNotesByLessonId } from 'services/course/selectors';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import Roles from 'services/course/pages/components/Roles';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import NotesIcon from '@mui/icons-material/Notes';
import Typography from '@mui/material/Typography';

const OutComesCardItem = ({ 
    outcome,
    cardItemProps,
    lessonNotes,
    selectedOutcome,
    currentUser,
    handleEditingItemTitleOnSubmit,
    handleCardItemOnBlur,
    setItemTitle,
    editingItem,
    setEditingItem,
    cardIndex,
    lessonId
 }) => {
    let {
        // setEditingItem, handleCardItemOnBlur, editingItem,
        handleRecommendations,handleDeleteOutcome, handleEditingOutcomeTitleOnSubmit,
        setOutcomeTitle, itemTitle, inputRef,operatorBusinessName, buildLessonInsights 
    } = cardItemProps;
return ( <>
            <Typography variant="h5" component="div"> Measurable </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"> outcome </Typography>
            <Typography sx={{ minWidth: 275, maxHeight:305, backgroundColor: outcome?.color }}variant="body2">
                {
                    `At the end of this lesson, each student will understand ` 
                }
                { ( editingItem && (selectedOutcome?._id === outcome?._id ) ) 
                    ? <div>
                        <form onSubmit={e => handleEditingItemTitleOnSubmit(e, outcome )} className="">
                        <input 
                            ref={inputRef}
                            type="text"  
                            onChange={ e => setItemTitle( e.target.value ) } 
                            value={ itemTitle } 
                            onBlur={() => handleCardItemOnBlur(outcome)} 
                            placeholder={selectedOutcome?.title}
                        />
                        </form>
                        </div> 
                    : !outcome?.title ? <b>{`...`}</b> :  <b>{outcome?.title}</b>
                }
                </Typography>
                <Roles role={ currentUser?.role === role.Tutor }>
                    <EditIcon 
                        onClick={() => setEditingItem(outcome) }
                        color="action"
                        className="comment-round-button-1"
                    />
                    <DeleteIcon 
                        onClick={() => handleDeleteOutcome(outcome) }
                        color="action"
                        className="comment-round-button-3"
                    />
                    <NotesIcon 
                        onClick={() => buildLessonNotes({ outcome, operatorBusinessName, currentUser, lessonNotes }) } 
                        color="action"
                        className="comment-round-button-4"
                    />
                    <HelpIcon 
                        onClick={() => buildLessonInsights(outcome) }
                        color="action"
                        className="comment-round-button-5"
                    />
                </Roles>
                <HelpIcon 
                    onClick={() => buildLessonInsights(outcome) }
                    color="action"
                    className="comment-round-button-5"
                />
                <CardActions>
                    <Button onClick={() => handleRecommendations( outcome )} size="small">Recommend Further Study</Button>
                </CardActions>
            </>
        );
};

const mapState = (state, ownProps) => {
    return {
        selectedOutcome: state?.outcomes?.selectedOutcome,
        currentUser: state?.users?.user,
        lessonNotes: getTutorsLessonUserNotesByLessonId(state, ownProps),
        selectedOutcome: state.outcomes.selectedOutcome
    };
};

export default  connect( mapState, { buildLessonNotes, setCurrentOutcome } )(OutComesCardItem);









// import { connect } from 'react-redux';
// import { role } from 'services/course/helpers/PageHelpers';
// import { buildLessonNotes } from 'services/course/actions/notes';
// import { setCurrentOutcome } from 'services/course/actions/outcomes';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import HelpIcon from '@material-ui/icons/Help';
// import Roles from 'services/course/pages/components/Roles';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import NotesIcon from '@mui/icons-material/Notes';
// import Typography from '@mui/material/Typography';

// const OutComesCardItem = ({ buildLessonNotes, lessonNotes, outcomes, currentUser, selectedOutcome, cardItemProps, setCurrentOutcome }) => {
//     let {
//         setEditingItem, handleCardItemOnBlur, editingOutcome,
//         handleRecommendations,handleDeleteOutcome, handleEditingOutcomeTitleOnSubmit,
//         setOutcomeTitle, itemTitle, inputRef, toggleQuestionModal, formType,
//         formName, courseId, lesson, operatorBusinessName, buildLessonInsights, isFormModalOpen } = cardItemProps;
    
//     return (( outcomes ).map((outcome, index) => ( 
//                     <div className='col' onClick={() => setCurrentOutcome( outcome )}> 
//                     {  <div className="cardItem">
//                         { <Card sx={{ minWidth: 275, maxHeight:305, backgroundColor: outcome?.color, marginBottom:3.6, 
//                             boxShadow: 9 }}  onBlur={() => handleCardItemOnBlur(outcome)}>
//                             <CardContent>
//                                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                     {
//                                         `learning outcome # ${(index+1)}`
//                                     }
//                                     { 
//                                             `Test: OutcomeId: ${ outcome?._id }`
//                                     }
//                                 </Typography>
//                                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                                 <br></br>
//                                 </Typography>
//                                 <Typography variant="h5" component="div"> Measurable </Typography>
//                                 <Typography sx={{ mb: 1.5 }} color="text.secondary"> outcome </Typography>
//                                 <Typography sx={{ minWidth: 275, maxHeight:305, backgroundColor: outcome?.color }}variant="body2">
//                                 {
//                                     `At the end of this lesson, each student will understand ` 
//                                 }
//                                 { ( editingOutcome && (selectedOutcome?._id === outcome?._id ) ) 
//                                     ? <div>
//                                         <form onSubmit={e => handleEditingOutcomeTitleOnSubmit(e, outcome )} className="">
//                                         <input 
//                                             ref={inputRef}
//                                             type="text"  
//                                             onChange={ e => setOutcomeTitle( e.target.value ) } 
//                                             value={ itemTitle } 
//                                             onBlur={() => handleCardItemOnBlur(outcome)} 
//                                             placeholder={selectedOutcome?.title}
//                                         />
//                                         </form>
//                                         </div> 
//                                     : !outcome?.title ? <b>{`...`}</b> :  <b>{outcome?.title}</b>
//                                 }
//                                 </Typography>
//                             </CardContent>
//                             <Roles role={ currentUser?.role === role.Tutor }>
//                                 <EditIcon 
//                                     onClick={() => setEditingItem(outcome) }
//                                     color="action"
//                                     className="comment-round-button-1"
//                                 />
//                                 <DeleteIcon 
//                                     onClick={() => handleDeleteOutcome(outcome) }
//                                     color="action"
//                                     className="comment-round-button-3"
//                                 />
//                                 <NotesIcon 
//                                     onClick={() => buildLessonNotes({ outcome, operatorBusinessName, currentUser, lessonNotes }) } 
//                                     color="action"
//                                     className="comment-round-button-4"
//                                 />
//                                 <HelpIcon 
//                                     onClick={() => buildLessonInsights(outcome) }
//                                     color="action"
//                                     className="comment-round-button-5"
//                                 />
//                             </Roles>
//                             <HelpIcon 
//                                     onClick={() => buildLessonInsights(outcome) }
//                                     color="action"
//                                     className="comment-round-button-5"
//                             />
//                             <CardActions>
//                                 <Button onClick={() => handleRecommendations( outcome )} size="small">Recommend Further Study</Button>
//                             </CardActions>
//                         </Card>  
//                         }
//                         </div>
//                     }
//                     </div>
//                 )
//             ));
// };

// const mapState = (state, ownProps) => {
//     return {
//         selectedOutcome: state?.outcomes?.selectedOutcome,
//         currentUser: state?.users?.user
//     };
// };

// export default  connect( mapState, { buildLessonNotes, setCurrentOutcome } )(OutComesCardItem);

 

 