import { 
connect } from 'react-redux';

import {
handleAddPushNotificationSubscriptionToEntity,
handleEmailNotificationSubscriptionToEntity,
handleSavingEntityAction } from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import ToggleButton from 'services/course/pages/components/ToggleButton';

const Basic = ({
    question, 
    currentUser,
    saveOnlineQuestion }) => {

return (
    <div>
        {   <span>
            <span  className={ "navlinkItem" }>
                <label> Receive push notifications. </label>
                <ToggleButton
                    className={ "toggleButton" }
                    isChecked={ (question?.questionPushNotificationSubscribers?.includes( currentUser?._id ) || question?.userId === currentUser?._id) }
                    value={ 'isRecurring' }
                    onChange={ () => handleAddPushNotificationSubscriptionToEntity( question, question?.questionPushNotificationSubscribers, currentUser,  saveOnlineQuestion, elementMeta.questionPushNotificationSubscribers  ) }
                    placeHolder="push" 
                />
            </span>
            <span className={ "toggleButton" }>
                <label> Receive email notifications. </label>
                <ToggleButton
                    className={ "navlinkItem" }
                    isChecked={ (question?.questionEmailNotificationSubscribers?.includes( currentUser?._id )) }
                    value={ 'isRecurring' }
                    onChange={ () => handleEmailNotificationSubscriptionToEntity( question, question?.questionEmailNotificationSubscribers, currentUser,  saveOnlineQuestion, elementMeta.questionEmailNotificationSubscribers  ) } 
                    placeHolder="email" 
                />
                </span>
                <span  className={ "toggleButton" }>
                <label> Save question. </label>
                <ToggleButton
                    isChecked={ (question?.savedQuestions?.includes( currentUser?._id )) }
                    value={ 'isRecurring' }
                    onChange={ ( ) => handleSavingEntityAction( question, question?.savedQuestions, currentUser, saveOnlineQuestion, elementMeta.savedQuestions ) } 
                    placeHolder="save" 
                />
                </span>
            {/* Don't delete questions when there are answers and comments. */}
            </span>
        } 
    </div>
);
};

const mapDispatch = {
    saveOnlineQuestion
};

const mapState = ( state, ownProps ) => {
    return {
      currentUser: state.users.user,
      courses: Object.values( state?.courses?.courses )
    };
};

export default connect( mapState, mapDispatch )(Basic);
    