import { 
useState, 
useEffect } from "react";

import {
useDispatch } from 'react-redux';

import { 
addTime,
saveTime } from 'services/course/actions/countdowntimer';

import {
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import Countdown from "react-countdown";
import Swal from 'sweetalert2';
import { role } from "services/course/helpers/PageHelpers";

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
        previewMode,
        allTimers,
        studentsCummulativePointsReceived
    } = props;

    const [ currentTimer, setCurrentUserTimer ] = useState( allTimers?.find( timer => timer?.formName === formName && timer?.userId === currentUser?._id ) );
    const [ testStatus, setTestStatus ] = useState( false ); 
    const [ countDownTimerTest, setCountDownTimerTest ] = useState( undefined );
    let   [ testTime, setTestTime ] = useState( getTime() );
    const   [ points,  setTotalPointsReceived ] = useState( );
   
    // useEffect( () => {   
    //     if ( !testStatus ) {
    //         setTestStatus( true );
    //         setCountDownTimerTest( () => countDownTimer( renderer  ))
    //     }
    // }, [ !testStatus ] );

    // useEffect( () => {   

    //     let currentTestTimer = allTimers?.find( timer => timer?.formName === formName && timer?.userId === currentUser?._id );

    //     if ( currentTestTimer ) {
    //         setCurrentUserTimer( currentTestTimer );
    //     }

    // }, [] );

    // find conditional statement for this
    // useEffect( () => {   
    //     if ( ( studentsCummulativePointsReceived > 0 || studentsCummulativePointsReceived === 0 ) && sessionStorage?.getItem('redherrings') !== studentsCummulativePointsReceived ) {
    //         sessionStorage?.setItem('redherrings', studentsCummulativePointsReceived);
    //      }

    // }  );

function renderer({ total, days, hours, minutes, seconds, completed, api, props, formatted, points, studentsCummulativePointsReceived }){
    if (completed) {
 
            return Swal.fire({
                        title: `CONGRATULATIONS!!!  You scored: ${sessionStorage?.getItem('redherrings')} This is a test message. Thanks!`,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Join',
                        confirmButtonColor: '#673ab7',
                        cancelButtonText: 'Next time'
                    }).then( (response) => {
                        if ( response?.value ) {
                            //navigate( `${currentUser?.inviteeSessionUrl}/${currentMeeting?._id}` );
                        } else { 
                            //directUserNavigation( currentUser, operatorBusinessName ); 
                        }
                    });
    } else {
            
        if ( seconds === 0 && currentTimer?._id ){
            setItemInSessionStorage('formbuildertimer', { ...currentTimer, testTime: total });
        } 
        return <span> {days}:{hours}:{minutes}:{seconds} </span>;
    }
};
        
function countDownTimer( renderer ){
    if ( !renderer ) return;

    return <Countdown 
            date={  Date.now() + testTime  } 
            renderer={ renderer }
            intervalDelay={0}
            precision={3}
        />;
};

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
    return ( currentTimer?.testTime ? currentTimer?.testTime :  TIMER_INIT);  
};

return {
    countDown: () => countDownTimerTest,
    setAddTime,
    resetTimer,
    saveTestTimer
}; };

export default useTimerHook;