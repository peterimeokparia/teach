import { 
useEffect } from 'react';

import {
connect } from 'react-redux';

import {
loadSubscribedPushNotificationUsers } from 'Services/course/Actions/Notifications';

import {
loadMeetings } from 'Services/course/Actions/Meetings'; 

import{
loadUsers } from 'Services/course/Actions/Users';

import { 
navigate } from '@reach/router';

import {  
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

import ClassRoomComponent from './Components/ClassRoomComponent';
import 'react-toastify/dist/ReactToastify.css';

const ClassRoomPage = ({
    operatorBusinessName,
    operator,
    currentUser,   
    selectedUserId, 
    loadMeetings,
    loadUsers,
    loadSubscribedPushNotificationUsers }) => {  
    
    if ( ! currentUser?.userIsValidated || ! operator ) {
        navigate(`/${operatorBusinessName}/login`);
    }
    
    useEffect(() => {    
        loadUsers();
        loadMeetings();
        loadSubscribedPushNotificationUsers();
    }, [ loadUsers, loadMeetings, loadSubscribedPushNotificationUsers ] );

return (<ClassRoomComponent 
            selectedUserId={selectedUserId}
            operatorBusinessName={operatorBusinessName}
        /> 
    );
};

const mapDispatch = {
    loadMeetings,
    loadUsers,
    loadSubscribedPushNotificationUsers,
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        currentUser: state.users.user,
    };
};

export default connect(mapState, mapDispatch)(ClassRoomPage);