import { 
useState,
useEffect } from 'react';

import { 
useDispatch } from 'react-redux';

import {
loadOnlineComments,
addNewOnlineComment,
deleteOnlineComment } from 'services/course/actions/onlinecomments'; 

import {
manageCommentsFieldCollection } from 'services/course/pages/QuestionsPage/helpers';
    
import { 
getSortedRecordsByDate } from 'services/course/selectors';

import {
getCalendarColor } from 'services/course/pages/CalendarPage/helpers';

function useReplyCommentsHook( commentsConfig ){
    let {
        question, 
        answer, 
        currentUser, 
        operator, 
        courseId, 
        comments
    } = commentsConfig;

    const dispatch = useDispatch();

    let inputFieldOptions; 

    const [ contentChanged, setContentChanged ] = useState( false );

    useEffect(() => {
      dispatch(loadOnlineComments());

      if ( contentChanged  ) {
        dispatch(loadOnlineComments());
        setContentChanged( false );
      }
    }, [ loadOnlineComments, contentChanged ] );      
  
    let onlineComments = getSortedRecordsByDate( comments?.filter( comment => comment?.onlineQuestionAnswerId === answer?._id ), 'commentDateTime');
  
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
  
    dispatch(addNewOnlineComment( manageCommentsFieldCollection(config) ));
    setContentChanged( true );
};
  
const onhandleSelected = ( selectedComment ) => {
    dispatch(deleteOnlineComment( selectedComment ));
    setContentChanged( true );
};

return {
    onlineComments,
    addNewComment:(val) => addNewComment( val ),
    onhandleSelected:(val) => onhandleSelected( val )
}; };

export default useReplyCommentsHook;