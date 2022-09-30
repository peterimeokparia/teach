import { useState, useCallback, useEffect } from 'react';

const useContextMenuHook = () => {
    const [ anchorPoint, setAnchorPoint ] = useState( { x: 0, y: 0 } );
    const [ show, setShow ] = useState( false );  
    const handleContextMenu =  useCallback(   
     ( event ) => {
            event.preventDefault();
            setAnchorPoint( { x: event.pageX, y: event.pageY } );
            setShow( true );
        }, 
        [ setAnchorPoint, setShow ]
    );
    
    const handleClick = useCallback(
        () => ( show ? setShow( false ) : null ), [ show ]
    );
  
    useEffect(() => { 
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenu);
    return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("contextmenu", handleContextMenu);  
        };
    });
    
    return {
        anchorPoint,
        show,
        setShow
    };
};
    
export default useContextMenuHook;