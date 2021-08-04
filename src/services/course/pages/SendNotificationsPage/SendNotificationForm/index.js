import { useState } from 'react';

const SendNotificationForm = ({
error,    
handleSendingPushMessage,
setHandleFormReset }) => {
const [ notificationMessage, setNotificationMessage ] = useState('');
const [ notificationTitle, setNotificationTitle ] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  resetForm();
};

const sendPushNotificationMessage = ( title, message ) => {
  handleSendingPushMessage( title, message );
  resetForm();
};

const resetForm = () => {
  setNotificationTitle('');
  setNotificationMessage('');
  setHandleFormReset(true);
};

return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>
                  Push Notification Message Title
                  <input
                    name="notification-title"
                    type="text"
                    value={notificationTitle}
                    onChange={ e => setNotificationTitle( e.target.value ) }
                    placeholder={"push notification title"}
                  >  
                  </input>
                </label>
                <label>
                    Push Notification Message
                  <input
                      name="notification-message"
                      type="text"
                      value={notificationMessage}
                      onChange={ e => setNotificationMessage( e.target.value ) }
                      placeholder={"push notification message"}
                  >  
                  </input>
                  </label>
                  { error  && (<div className="error"> { error.message }</div>)}
                  <div></div>
                  <button 
                    type="submit" 
                    onClick={e => sendPushNotificationMessage( notificationTitle, notificationMessage )}
                  >
                  Send Message
                  </button>
            </form>
        </div>
); };

export default SendNotificationForm;