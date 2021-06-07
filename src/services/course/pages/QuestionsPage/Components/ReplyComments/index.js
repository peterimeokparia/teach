import React from 'react';

import { 
connect } from 'react-redux';

import { 
getOperatorFromOperatorBusinessName,
getSortedRecordsByDate } from 'Services/course/Selectors';

import {
addNewOnlineComment,
saveOnlineComment } from 'Services/course/Actions/OnlineComments'; 

import {
manageCommentsFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import {
commentsPlaceHolder,    
saveMarkDownContent } from 'Services/course/helpers/EditorHelpers'; 

import {
getCalendarColor } from 'Services/course/Pages/CalendarPage/helpers';

import { 
Accordion, 
AccordionSummary, 
// AccordionDetails 
} from '@material-ui/core';

import moment from "moment";
import EditorComponent  from '../../../Components/EditorComponent';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import AddCommentIcon from '@material-ui/icons/AddComment';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { styleObj, replyIconStyle, deleteIconStyle, iconStyle} from './inlineStyles';
import './style.css';

const ReplyComments = ({ 
    answer,
    comment,
    addComment,
    parentComment,
    operator,
    currentUser,
    currentUsers,
    comments,
    courseId, 
    questionId, 
    onlineQuestionAnswerId, 
    addNewOnlineComment,
    saveOnlineComment,
    commentParentId }) => {
    const [expanded, setExpanded] = React.useState('panel1');
    let inputFieldOptions;

    let onlineComments = getSortedRecordsByDate( comments?.filter( comment => comment?.onlineQuestionId === questionId && comment?.onlineQuestionAnswerId === answer?._id ), 'commentDateTime');

    if ( ! onlineComments ) { return <div>{''}</div>; }
    const addNewComment = ( parentComment ) => {
        let config = { 
            onlineQuestionId: questionId,
            onlineQuestionAnswerId: answer?._id,
            commentParentId: ( parentComment?._id === undefined ) ? null :  parentComment?._id,
            childComments: [],
            courseId, 
            userId: currentUser?._id, 
            placeHolder: commentsPlaceHolder,
            questionCreatedBy: ( currentUser?._id ) ? (currentUser?.firstname) : 'anonymous', 
            operator: operator?._id,
            color: ( parentComment?._id === undefined ) ? getCalendarColor( parentComment ) :  parentComment?.color, 
            inputFieldOptions, 
        };

        addNewOnlineComment( manageCommentsFieldCollection(config) );
    };

    // const removeComments = () => {
    //       // let lastCommentField = comments[ ( comments?.length - 1 ) ];
    //       // let decrementedCommentSet = comments?.filter( input => input?.name !== lastCommentField?.name );
    // }

    let commentsHandleChangeTimerHandle = null, timeOutDuration = 5000;
     const handleChange = ( editor, comments ) => {
       saveMarkDownContent( 
        commentsHandleChangeTimerHandle, 
        saveOnlineComment,
         comments,
         JSON.stringify( editor.emitSerializedOutput() ),
         `${comments?._id}`,
         timeOutDuration
       );     
     };

    const getCommentIdCollection = () => {
        let commentObjects = {};
        let children = getSortedRecordsByDate( onlineComments?.filter(_comments => _comments?.commentParentId === null ), 'commentDateTime');

        commentObjects[ comment?._id ] = { children };
      return commentObjects;
    };

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

  const getChildComments = ( collection ) => {
    return <>  
        {collection.map(( element, index )  => {      
       return  [ element ]?.map( comment => {
        return <div>
          <> 
              <div className={"commentCards"}> 
              <div style={styleObj( comment?.color )}> 
              <div className={""}>
                <EditorComponent
                        className={""}
                        key={ comment?._id }
                        id={ comment?._id }
                        name={ comment?.name } 
                        onChange={(editor) => handleChange( editor, element )}
                        content={JSON.parse( comment?.markDownContent ) }
                    /> 
               </div>
               
                 <div>
                    { <span>{`Comment by ${ currentUsers?.find(_user => _user?._id === comment?.userId)?.firstname }`}</span> }
                    { <span>{` on ${  moment( comment?.commentDateTime ).local() }`} </span>}
                </div>
                <span> 
                    <span>
                          <ReplyIcon
                              style={replyIconStyle()}
                              className="comment-round-button-1"
                              onClick={() => addNewComment(comment)}
                          />
                    </span>
                    <span>
                          <DeleteIcon 
                            style={deleteIconStyle()}
                            className="comment-round-button-3"
                            onClick={() => addNewComment(comment)}
                        />
                    </span>
                </span> 
              </div>
              </div>
          </> 
          {
            <Accordion square  expanded={expanded === `panel${index}`} onChange={handleAccordionChange(`panel${index}`)}>  
                 <AccordionSummary aria-controls={`panel${index}-content`} id="panel1d-header">
                    { ( expanded === `panel${index}` ) ? (comment?.commentParentId === null) && <ExpandLessIcon />   : (comment?.commentParentId === null) &&  <ExpandMoreIcon />}  
                    { (comment?.commentParentId === null) &&  <Typography>{ ( expanded === `panel${index}` ) ? `Hide Comments` :  `Show Comments`}</Typography> }
                 </AccordionSummary>
                <div className={"parentCommentHighLight"}>
                 {  
                     getChildComments( getSortedRecordsByDate( onlineComments?.filter( _comment => _comment?.commentParentId === comment?._id ), 'commentDateTime') )
                 }
                </div> 
          </Accordion> 
          }
        </div>;
        });
    })
   }
    </>;
};

const callOnLineComments = ( ) => { 
    return Object.values( getCommentIdCollection() )?.map( answerComments => {
            return getChildComments ( answerComments?.children );
    });   
};

return (
        <>
            {
              <span>
                <AddCommentOutlinedIcon
                    style={iconStyle()}
                    className="comment-round-button-1"
                    onClick={() => addNewComment(comment)}
                />
              </span>
            }            
            { 
                callOnLineComments() 
            }                         
        </>
); };

const mapState = ( state, ownProps ) => {
    return {
      operator: getOperatorFromOperatorBusinessName(state, ownProps),
      currentUser: state.users.user,
      currentUsers: Object.values( state.users.users ),
      comments: Object.values( state?.onlineComments?.onlineComments )
    };
  };
  
export default connect(mapState, { addNewOnlineComment, saveOnlineComment  })(ReplyComments);