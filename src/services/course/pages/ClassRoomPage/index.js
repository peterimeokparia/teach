import { 
useEffect } from 'react';

import {
connect } from 'react-redux';

import {
loadSubscribedPushNotificationUsers } from 'services/course/actions/notifications';

import {
loadMeetings } from 'services/course/actions/meetings'; 

import{
loadUsers } from 'services/course/actions/users';

import { 
navigate } from '@reach/router';

import {  
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import ClassRoomComponent from 'services/course/pages/ClassRoomPage/components/ClassRoomComponent';
import 'react-toastify/dist/ReactToastify.css';

const ClassRoomPage = ({
    operatorBusinessName,
    operator,
    currentUser,   
    selectedUserId, 
    loadMeetings,
    loadUsers,
    loadSubscribedPushNotificationUsers }) => {  
    if ( ! currentUser?.userIsValidated  ) {
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