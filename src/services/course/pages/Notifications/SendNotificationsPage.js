import 
React, {
useState,
useEffect    
} from 'react';

import { 
connect } from 'react-redux';

import { 
sendPushNotificationMessage,
loadSubscribedPushNotificationUsers } from '../../actions';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getPushNotificationUsersByOperatorId } from '../../Selectors';


import Select from 'react-select';

import SendNotificationForm from './SendNotificationForm';


const SendNotificationsPage = ({  
operatorBusinessName,
operator,  
users,
loadSubscribedPushNotificationUsers,
pushMessageSubscribers,        
sendPushNotificationMessage, 
selectedPushMessageUsers }) => {

const [ pushNotificationMessageSubscribers, setPushNotificationMessageSubscribers ] = useState([]); 
const [ handleFormReset, setHandleFormReset ] = useState(false);   


const handleSendingPushMessage = ( title, message ) => {

  sendPushNotificationMessage( pushNotificationMessageSubscribers.map(user => user?.value), { title, body: message } );
};


useEffect(() => {

loadSubscribedPushNotificationUsers();

if ( handleFormReset ){

    setPushNotificationMessageSubscribers([])
    
    setHandleFormReset(false);
}
    
}, [ loadSubscribedPushNotificationUsers, handleFormReset, pushNotificationMessageSubscribers ]);  


const selectDropDownOptions = pushMessageSubscribers?.filter(subscribeduser => users?.find(usr => subscribeduser?.userId === usr?._id ) ).map(item => ( { value: item,  label: item?.userId }));

return (
        <div>
                <SendNotificationForm 
                      handleSendingPushMessage={handleSendingPushMessage}
                      setHandleFormReset={setHandleFormReset}
                />
                <div></div>

                <label>

                Select users

                <Select
                    isMulti
                    value={ pushNotificationMessageSubscribers }
                    onChange={ setPushNotificationMessageSubscribers }
                    options={ selectDropDownOptions } 
                />
                </label>
        </div>
 );
}


const mapDispatch = (state, ownProps) => {

    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        selectedPushMessageUsers: state.notifications.selectedPushNotificationMessageUsers,
        pushMessageSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
    };
  }
  


export default connect(mapDispatch, { sendPushNotificationMessage, loadSubscribedPushNotificationUsers })(SendNotificationsPage);