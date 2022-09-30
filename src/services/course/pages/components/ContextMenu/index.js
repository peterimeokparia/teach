import useContextMenuHook from 'services/course/pages/components/ContextMenu/hooks/useContextMenuHook';
import './style.css';

const ContextMenu = ({children, editorRef}) => {
    let {
     anchorPoint,
     show } = useContextMenuHook();

     if ( true ) {
        let midDistance = undefined;
        
        if ( editorRef?.current?.clientWidth ) {
            midDistance = ( editorRef.current.clientWidth / 2 );
        }
         return ( <div className={ ((anchorPoint?.x < midDistance ) ? "menu-2" : "menu" )}> { children }</div> ); 
     }

    return (
        <></>
        );
};

export default ContextMenu;