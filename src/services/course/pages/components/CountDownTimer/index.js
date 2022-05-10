import { 
connect } from 'react-redux';

import {
timerHeader } from 'services/course/pages/FormBuilder/FormFields/inlineStyles';

import { 
role } from 'services/course/helpers/PageHelpers';
  
import React from "react";
import useTimerHook from 'services/course/pages/FormBuilder/hooks/useTimerHook';
import Tooltip from '@mui/material/Tooltip';
import TimerIcon from '@mui/icons-material/Timer';
import './style.css';

const CountDownTimer = ({ 
  props,
  timer,
  allTimers,
  currentUserTimer,
  currentUser }) => {

  let {
    previewMode,
  } = props;

  let {
    countDown,
    setAddTime,
    resetTimer,
    saveTestTimer
  } = useTimerHook( { ...props, currentUser, currentUserTimer, allTimers } );
 
return (
    <div className="clock">
        <div className="digital"> 
        { countDown() }
        {
          <> 
          { ( previewMode?.isPreviewMode ) ?   <Tooltip title="Add Time" arrow>
                                                  <TimerIcon 
                                                    style={timerHeader()}
                                                    className="comment-round-button-2"
                                                    onClick={ setAddTime }
                                                  /> 
                                                </Tooltip> 
                                              
                                            : <div></div>  
          }
          { ( previewMode?.isPreviewMode )  ?   <Tooltip title="Reset Timer" arrow>
                                                  <TimerIcon 
                                                    style={timerHeader()}
                                                    className="comment-round-button-1"
                                                    onClick={ resetTimer } 
                                                  /> 
                                                </Tooltip>
          
                                            : <div></div>
          }
           { ( previewMode?.isPreviewMode ) ?  <Tooltip title="Save Curent Timer" arrow>
                                                  <TimerIcon 
                                                    style={timerHeader()}
                                                    className="comment-round-button-3"
                                                    onClick={ saveTestTimer }
                                                  /> 
                                               </Tooltip>
                                            : <div></div>
          }
          </>
        }
        </div> 
    </div>
); };

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state?.users?.user,
    timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.questionProps?.formName && timer?.role === role?.Tutor ),
    allTimers: Object?.values( state?.timers?.timers ),
    currentUserTimer:  Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.questionProps?.formName && timer?.userId === ownProps?.currentUser?._id ),
    studentsTotalPointsReceivedFromPersistence: Object?.values( state?.formFieldPoints?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.questionProps?.formName && field?.formUuId === ownProps?.formUuId && field?.userId === ownProps?.userId ),
  };
};
  
export default connect(mapState, null )( CountDownTimer );
