import {
useState,
useEffect,
useRef } from 'react';

import {
SPLIT_VIEW_ORIENTATION } from './helpers';

import './style.css';

const SplitViewComponent = ({ 
  left,
  left_top, 
  right_bottom, 
  className,
  orientation }) => {

  const [ leftWidthTopHeight, setLeftWidthTopHeight ] = useState( (orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT) ? 450 : 1500);
  const [ rightWidthBottomHeight, setRightWidthBottomHeight ] = useState( (orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT) ? 450 : 500);
  const [ separatorPosition, setSeparatorPosition ] = useState(0);
  const [ dragging, setDragging ] = useState(false);
  const [ mouseDown, setMouseDown ] = useState(false);
  const splitViewRef = useRef();
 
  useEffect(() => {
      document?.addEventListener( 'mousemove', onMouseMove );
      document.addEventListener( 'touchmove', onTouchMove );
      document?.addEventListener( 'mouseup', onMouseUp );
    return () => {
      document?.removeEventListener( 'mousemove', onMouseMove );
      document.removeEventListener( 'touchmove', onTouchMove );
      document?.removeEventListener( 'mouseup', onMouseUp );
    };
  });

  const onMouseDown = e => {
    setMouseDown( true );
    setSeparatorPosition( ( orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT ) ? e.clientY : e.clientX );
    setDragging( true );
  };

  const onTouchStart = e => {
    setSeparatorPosition( ( orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT ) ? e.touches[0].clientY  : e.touches[0].clientX);
    setDragging(true);
  };

  const MIN_LENGTH = 10;
  const onMove = ( clientAxis ) => {

    if ( !dragging ) {
      return;
    }

    if ( mouseDown && dragging && leftWidthTopHeight && rightWidthBottomHeight && separatorPosition ) {

      let newleftWidthTopHeight = leftWidthTopHeight + ( clientAxis - separatorPosition );
      let newrightWidthBottomHeight = rightWidthBottomHeight + ( separatorPosition - clientAxis );

      setSeparatorPosition( clientAxis  );

      if ( newleftWidthTopHeight < MIN_LENGTH ) {
        setLeftWidthTopHeight( MIN_LENGTH );
        return;
      }

      if ( splitViewRef ) {

        const splitViewWidth = ( orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT )  
                                ? splitViewRef?.current?.clientHeight 
                                : splitViewRef?.current?.clientWidth;

         if ( newleftWidthTopHeight > ( splitViewWidth - MIN_LENGTH ) ) {
          setLeftWidthTopHeight( ( splitViewWidth - MIN_LENGTH ) );
            return;
         }

         if ( newrightWidthBottomHeight > ( splitViewWidth ) ) {
          setRightWidthBottomHeight( ( splitViewWidth - MIN_LENGTH ) );
          return;
        }
      }
      setLeftWidthTopHeight( newleftWidthTopHeight );
      setRightWidthBottomHeight( newrightWidthBottomHeight );
    }
  };

  const onMouseMove = e => {
    if ( dragging ) {
      e.preventDefault();
      onMove( ( orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT ) ? e?.clientY  : e?.clientX );
    }
  };

  const onTouchMove = e => {
    if ( dragging ) {
     onMove( ( orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT )  ? e?.clientY : e?.clientX );
    }
  };

  const onMouseUp = e => {
    setMouseDown( false );
    setDragging( false );
    //setSeparatorPosition(e.clientX);
    setSeparatorPosition(undefined);
  };

  const resetRightAndLeftPositions = () => {
    setLeftWidthTopHeight( (orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT) ? 450 : 1500 );
    setRightWidthBottomHeight( (orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT) ? 450 : 500 );
  };

  const stopDragging = () => {
    if ( dragging ) {
      setDragging( false );
     }
  };

return (
   <div className={`splitmain${(orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT) ? '-height' : "" }`} onTouchEnd={onMouseUp} onBlur={onMouseUp} onMouseUp={onMouseUp}>  
    <div className={ `splitView${(orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT)? '-height' : "" } ${className ?? "" }`} ref={splitViewRef} onTouchEnd={onMouseUp} onMouseUp={onMouseUp}>
      {
        left_top(stopDragging, leftWidthTopHeight, setLeftWidthTopHeight )
      } 
      <div 
        className={`divider-hitbox${(orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT)? '-height' : "" }`} 
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onMouseUp}
        onDoubleClick={resetRightAndLeftPositions}
       >
      <div className={`divider${(orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT)? '-height' : "" }`} onMouseUp={onMouseUp}> 
          <div className={`dragbar${(orientation === SPLIT_VIEW_ORIENTATION?.HEIGHT)? '-height' : "" }`}
            onTouchEnd={onMouseUp}
            onBlur={onMouseUp}
            onMouseUp={onMouseUp}
          />
      </div> 
      </div>
      <div>
      <div onTouchEnd={onMouseUp} onBlur={onMouseUp} onMouseUp={onMouseUp}>
        { 
          right_bottom( stopDragging, rightWidthBottomHeight, setRightWidthBottomHeight )
        }
        </div>
      </div>
    </div>
    </div>
  );
};

export default SplitViewComponent;

