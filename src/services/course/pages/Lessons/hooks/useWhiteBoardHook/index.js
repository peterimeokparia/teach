import { 
useState, 
useEffect } from 'react';

import { 
useDispatch,
useSelector } from 'react-redux';

function useWhiteBoardHook( props ) {

  let { 
    // currentUsser,
    // savedWhiteBoards,
    //loadWhiteBoardData,
    loadWhiteBoardDataByWid,
    toggleTeachBoardOrEditor,
    whiteBoardId
  } = props;

  const [ savedWhiteBoardCount, setSavedWhiteBoardCount ] = useState(0);
  const [ isOpen, setIsOpen ] = useState(false);
  const dispatch = useDispatch();
  const whiteBoards = useSelector( state => state.whiteBoardData.whiteBoardData );

function getSavedBoards(){
  loadWhiteBoardDataByWid(whiteBoardId);
  setIsOpen(true);
};
  
function handleClose(){
  setIsOpen(false);
};

function handleTogglingBoardEditorViewOnUpdatedWhiteBoardCount(){
  if ( whiteBoardId ){ 
    let whiteBoardCount = getCurrentSavedWhiteBoardCount();

  if ( whiteBoardCount > savedWhiteBoardCount ) {
      //loadWhiteBoardData();
      toggleTeachBoardOrEditor();
      toggleTeachBoardOrEditor();
      setSavedWhiteBoardCount( whiteBoardCount );
    }
  }
};

function getCurrentSavedWhiteBoardCount(){
  let usersWhiteBoard  = undefined;
  if ( whiteBoardId ) {
    usersWhiteBoard = Object.values( whiteBoards )?.filter( board => board?.wid === whiteBoardId );
  }
  return usersWhiteBoard?.length
};

return {
  isOpen,
  setIsOpen: (val) => setIsOpen(val),
  handleClose: () => handleClose(),
  getSavedBoards: () => getSavedBoards()
}; }

export default useWhiteBoardHook;