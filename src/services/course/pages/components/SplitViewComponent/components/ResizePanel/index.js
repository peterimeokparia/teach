import {
useEffect,
useRef } from 'react';

import {
SPLIT_VIEW_ORIENTATION } from '../../helpers';

const ResizePanel = ({ 
    children,
    panelDimension, 
    setpanelDimension,
    orientation }) => {

    const panelRef = useRef();

    useEffect(() => {
        
        if ( panelRef?.current ) {

            if ( !panelDimension ) {
                setpanelDimension( (orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT) ? panelRef?.current?.clientHeight : panelRef?.current?.clientWidth );
                return;
            }
        }

        if ( (orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT) ) {
            
            panelRef.current.style.height = `${panelDimension}px`;

        } else {

            panelRef.current.style.width = `${panelDimension}px`;
        }

    },[ panelRef, panelDimension,  setpanelDimension ]);

    
return (
        <div ref={ panelRef } >
        {
           children
        } 
        </div>);
};

export default ResizePanel;
    
    