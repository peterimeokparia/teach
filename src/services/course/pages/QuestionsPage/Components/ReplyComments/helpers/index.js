import { 
getSortedRecordsByDate } from 'services/course/pages/QuestionsPage/components/ReplyComments/helpers/node_modules/Services/course/Selectors';

export const getCommentIdCollection = ( onlineComments ) => {
    let commentObjects = {}, children = [];
    
    getSortedRecordsByDate(onlineComments?.filter(_comments => _comments?.commentParentId == null   ), 'commentDateTime' )?.forEach(element => {
      children = onlineComments?.find(_comments => _comments?.commentParentId === null && _comments?._id === element?._id);
      if ( children ) {
        commentObjects[ `parent_${element?._id}` ] = { commentKey: 'parent', parentkey: element?._id, children };
      }
      children = getSortedRecordsByDate(onlineComments?.filter(_comments => _comments?.commentParentId !== null && _comments?.commentParentId === element?._id  ), 'commentDateTime');
      commentObjects[ element?._id ] = { commentKey: element?._id,  parentkey: element?._id,  children };
      // children = getSortedRecordsByDate(onlineComments?.filter(_comments => _comments?.commentParentId === element?._id  ), 'commentDateTime');
      // commentObjects[ element?._id ] = { commentKey: element?._id,  parentkey: element?._id,  children };
    });
  return commentObjects;
};