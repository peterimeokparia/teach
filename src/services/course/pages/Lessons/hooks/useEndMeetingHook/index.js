import { 
useEffect } from 'react';

import { 
useSelector } from 'react-redux';

import {
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
navigate } from '@reach/router';
    
function useEndMeetingHook( meetingEndingPromo, classRoomId ) {
    let tutor = Object.values( useSelector( state => state.users.users ) )?.find( usr => usr?._id === classRoomId );   
    let operatorBusinessName = getItemFromSessionStorage('operatorBusinessName');
    let meetingUrl = `/${operatorBusinessName}/LessonPlan/classRoom/${tutor?._id}/${meetingEndingPromo}`;
    
    useEffect(() => {
        if ( meetingEndingPromo && ( meetingEndingPromo === "thankyou" ) ) {
            navigate( meetingUrl );
        }
    }, [] );
    return;  
}

export default useEndMeetingHook;