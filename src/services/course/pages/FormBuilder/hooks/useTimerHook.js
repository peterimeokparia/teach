import { 
useState, 
useEffect } from "react";

import {
useDispatch } from 'react-redux';

import { 
addTime,
saveTime } from 'services/course/actions/countdowntimer';

import { 
role } from "services/course/helpers/PageHelpers";

import {
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import Countdown from "react-countdown";
import Swal from 'sweetalert2';


function useTimerHook( props ) {
    const dispatch = useDispatch();
    const TIMER_INIT = 60000;

    let {
        currentUser, 
        currentUserTimer,
        editing,
        timer,
        formType, 
        formName, 
        formUuId,
        formBuilderStatus,
        previewMode,
        allTimers,
        studentsCummulativePointsReceived
    } = props;

    const [ currentTimer, setCurrentUserTimer ] = useState( allTimers?.find( timer => timer?.formName === formName && timer?.userId === currentUser?._id ) );
    const [ testStatus, setTestStatus ] = useState( false ); 
    let   [ testTime, setTestTime ] = useState( !getTime() ? TIMER_INIT : getTime() );
    const [ countDownTimerTest, setCountDownTimerTest ] = useState( countDownTimer() );
   
function setAddTime(){
    setTestStatus( false );
    setTestTime( testTime += TIMER_INIT );
};

function resetTimer(){
    setTestStatus( false );
    setTestTime( TIMER_INIT );
};

function saveTestTimer(){
  if ( !timer?._id && currentUser?.role === role?.Tutor ) {  
     dispatch( addTime( { formType, formName, formUuId, userId: currentUser?._id,  testTime, role: currentUser?.role } ) );
     return;
  } 
    dispatch( saveTime( { ...timer, testTime } ) );
};

function getTime(){
    return ( currentTimer?.testTime );  
};

function countDownTimer(){
    // Random component
    const msg = "Test Complete";
    const Completionist = () => {
        return Swal.fire({
            title: msg,
            icon: 'info',
            html: `<div>${msg} ${msg}</div>`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#673ab7',
            cancelButtonText: 'No'
        });
    };

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };

    return <Countdown 
                date={ Date.now() + testTime}
                renderer={renderer}
            />
}

return {
    countDown: () => countDownTimerTest,
    setAddTime,
    resetTimer,
    saveTestTimer
}; };

export default useTimerHook;