import { 
useState,
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
getOperatorFromOperatorBusinessName,
getSortedRecordsByDate } from 'Services/course/Selectors';

import {
loadOnlineComments,
addNewOnlineComment,
deleteOnlineComment,
saveOnlineComment } from 'Services/course/Actions/OnlineComments'; 

import {
SET_ONLINECOMMENTS_MARKDOWN } from 'Services/course/Actions/OnlineComments'; 

import {
manageCommentsFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import {
getCalendarColor } from 'Services/course/Pages/CalendarPage/helpers';

import {
getCommentIdCollection } from './helpers';

import { 
Accordion, 
AccordionSummary
} from '@material-ui/core';

import { 
styleObj, 
replyIconStyle, 
deleteIconStyle, 
iconStyle } from './inlineStyles';

import moment from "moment";
import EditorComponent  from '../../../Components/EditorComponent';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCommentOutlinedIcon from '@material-ui/icons/AddCommentOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './style.css';

const ReplyComments = ({ 
  answer,
  sortedComments,
  loadOnlineComments,
  comment,
  addComment,
  parentComment,
  onlineCommentsCollectionTest,
  operator,
  currentUser,
  currentUsers,
  comments,
  courseId, 
  question, 
  onlineQuestionAnswerId, 
  addNewOnlineComment,
  deleteOnlineComment,
  saveOnlineComment,
  parentComments,
  getSortedCommentContent,
  commentParentId }) => {
  const [ contentChanged, setContentChanged ] = useState( false );
  let inputFieldOptions;

  useEffect(() => {
    loadOnlineComments();
    if ( contentChanged  ) {
      loadOnlineComments();
      setContentChanged( false );
    }
  }, [ loadOnlineComments, contentChanged ] );      

  let onlineComments = getSortedRecordsByDate( comments?.filter( comment => comment?.onlineQuestionId === question?._id && comment?.onlineQuestionAnswerId === answer?._id ), 'commentDateTime');

  if ( ! onlineComments ) { return <div>{''}</div>; }

const addNewComment = ( parentComment ) => {
  let config = { 
      onlineQuestionId: question?._id,
      onlineQuestionAnswerId: answer?._id,
      commentParentId: ( parentComment?._id === undefined ) ? null :  parentComment?._id,
      childComments: [],
      courseId, 
      userId: currentUser?._id, 
      placeHolder: null,
      questionCreatedBy: ( currentUser?._id ) ? (currentUser?.firstname) : 'anonymous', 
      operator: operator?._id,
      color: ( parentComment?._id === undefined ) ? getCalendarColor( parentComment ) :  parentComment?.color, 
      inputFieldOptions, 
  };

  addNewOnlineComment( manageCommentsFieldCollection(config) );
  setContentChanged( true );
};

const onhandleSelected = ( selectedComment ) => {
  deleteOnlineComment( selectedComment );
  setContentChanged( true );
};

const getMainComment = ( comment ) => {
return <div> {
  <div className={"commentCards"}>  
    <div style={styleObj( comment?.color )}> 
    <div className={""}>
    { 
        <div>
          {<div>{`ParentId ${ comment?.commentParentId }`}</div> }
          {<div>{`CommentId ${ comment?._id }`}</div>}
          { 
            <div> 
                { <span>{`Comment by ${ currentUsers?.find(_user => _user?._id === comment?.userId)?.firstname }`}</span> }
                { <span>{` on ${  moment( comment?.commentDateTime ).local() }`} </span>}
            </div>
          }
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
                  onClick={() => onhandleSelected(comment)}
                />
              </span>
          </span>
          </div>     
    }
     </div>
    </div>
  </div>  
  } 
</div>;
};

const getChildComments = ( collection ) => {
  return <>  
      { collection?.map(( element, index )  => {      
      return  [ element ].map( (comment, subindex ) => {
      return <div id={comment?._id}>
        <> 
            <div className={"commentCards"}> 
            <div style={styleObj( comment?.color )}> 
            <div className={""}>
              <EditorComponent
                  className={""}
                  id={ comment?._id }
                  name={ comment?.name } 
                  editorConfiguration={{
                    enableAutoSave: true,
                    entity: comment, 
                    stateObjectType: { propNameOne: "onlineComments",  propNameTwo: "onlineComments" }, 
                    actionDescription: SET_ONLINECOMMENTS_MARKDOWN, 
                    actionObject: saveOnlineComment, 
                    duration: 2000 
                   }}
                  content={ comment?.markDownContent }
              /> 
              </div>
              <div>
                  { <div>{`ParentId ${ comment?.commentParentId }`}</div> }
                  { <div>{`CommentId ${ comment?._id }`}</div>  }
                  { <span>{`Comment by ${ currentUsers?.find(_user => _user?._id === comment?.userId)?.firstname }`}</span> }
                  { <span>{` on ${  moment( comment?.commentDateTime ).local() }`} </span>  }
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
                        onClick={() => onhandleSelected(comment)}
                      />
                  </span>
              </span> 
            </div>
            </div>
        </> 
          <div className={ "parentCommentHighLight"}> 
            { ( onlineComments?.filter( _comment => _comment?.commentParentId ===  comment?._id)?.length > 0) &&       
               <Accordion square>  
                <AccordionSummary  
                  id="panel1d-header"
                  className="panel1d-header"
                  expandIcon={ ( onlineComments?.filter( _comment => _comment?.commentParentId ===  comment?._id)?.length > 0) && <ExpandMoreIcon fontSize={'large'}/>}
                  aria-controls="panel1a-content"
                > 
                </AccordionSummary>
                {
                  <div>
                    {
                      getChildComments( getSortedRecordsByDate(onlineComments?.filter( _comment => _comment?.commentParentId ===  comment?._id), 'commentDateTime') )
                    }
                  </div>
                }
              </Accordion>       
            }     
            </div> 
      </div>;
      });
  })
  }
  </>;
};

const callOnLineComments = ( ) => { 
  return Object.values( getCommentIdCollection() )?.filter(test => test?.parentkey !== null )?.map( (answerComments, index) => {  
      if ( answerComments?.commentKey === 'parent' ) {               
            return getMainComment( answerComments?.children );
          } else {
            return<Accordion square >  
            <AccordionSummary 
              expandIcon={ ( answerComments?.children)?.length > 0 && <ExpandMoreIcon fontSize={'large'}/>}
            >
            </AccordionSummary>
            <div className={"parentCommentHighLight"}>
              {  
                getChildComments( answerComments?.children )
              }
            </div>
         </Accordion>; 
      }
  });   
};

return (
  <>
    {
      <span>
        <AddCommentOutlinedIcon
            style={iconStyle()}
            className="comment-round-button-1"
            onClick={() => addNewComment( comment )}
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
  
export default connect(mapState, { loadOnlineComments, addNewOnlineComment, saveOnlineComment, deleteOnlineComment })(ReplyComments);
