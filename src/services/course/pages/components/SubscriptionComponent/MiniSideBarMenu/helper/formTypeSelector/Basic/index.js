import { connect } from 'react-redux';
import { handleAddPushNotificationSubscriptionToEntity, handleEmailNotificationSubscriptionToEntity, handleSavingEntityAction } from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper';
import { saveOnlineQuestions, addNewOnlineQuestionFromExisting } from 'services/course/actions/onlinequestions';
import { onlineMarkDownEditorFieldCollection, inputType } from 'services/course/pages/QuestionsPage/helpers';
import { addQuestionConfig } from 'services/course/pages/OnlineQuestionsPage/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import ToggleButton from 'services/course/pages/components/ToggleButton';
import './style.css';

const Basic = ({
    question, 
    currentUser,
    onlineQuestionProperties,
    saveOnlineQuestions,
    isCopyingExistingQuestionInProgress,
    addNewOnlineQuestionFromExisting }) => {
        
return (
    <div>
        {   <span>
            <span className={ "navlinkItem" }>
                <label> Receive push notifications. </label>
                <ToggleButton
                    className={ "toggleButton" }
                    isChecked={ (question?.questionPushNotificationSubscribers?.includes( currentUser?._id ) || question?.userId === currentUser?._id) }
                    value={ 'isRecurring' }
                    onChange={ () => handleAddPushNotificationSubscriptionToEntity( question, question?.questionPushNotificationSubscribers, currentUser,  saveOnlineQuestions, elementMeta.questionPushNotificationSubscribers  ) }
                    placeHolder="push" 
                />
            </span>
            <span className={ "toggleButton" }>
                <label> Receive email notifications. </label>
                <ToggleButton
                    className={ "navlinkItem" }
                    isChecked={ (question?.questionEmailNotificationSubscribers?.includes( currentUser?._id )) }
                    value={ 'isRecurring' }
                    onChange={ () => handleEmailNotificationSubscriptionToEntity( question, question?.questionEmailNotificationSubscribers, currentUser,  saveOnlineQuestions, elementMeta.questionEmailNotificationSubscribers  ) } 
                    placeHolder="email" 
                />
                </span>
                <span  className={ "toggleButton" }>
                <label> Save question. </label>
                <ToggleButton
                    isChecked={ (question?.savedQuestions?.includes( currentUser?._id )) }
                    value={ 'isRecurring' }
                    onChange={ ( ) => handleSavingEntityAction( question, question?.savedQuestions, currentUser, saveOnlineQuestions, elementMeta.savedQuestions ) } 
                    placeHolder="save" 
                />
                </span>
                <>
                {( isCopyingExistingQuestionInProgress ) && 
                    <span  className={ "toggleButton" }>
                      <label> Copy question. </label>
                      <div>
                      <button
                        className={'copy-question'}
                        onClick={ () => addNewOnlineQuestionFromExisting({ ...onlineMarkDownEditorFieldCollection( question ), markDownContent: question?.markDownContent, answerExplanationMarkDownContent: question?.answerExplanationMarkDownContent,  ...onlineQuestionProperties }, {...onlineQuestionProperties, oldQuestionId: question?._id } ) } 
                      />
                      </div>
                      </span>
                } 
                </>
              
            {/* Don't delete questions when there are answers and comments. */}
            </span>
        } 
    </div>
);
};

const mapDispatch = {
    saveOnlineQuestions,
    addNewOnlineQuestionFromExisting
};

const mapState = ( state, ownProps ) => {
    return {
      isCopyingExistingQuestionInProgress:  state?.onlineQuestions?.copyOnlineQuestionProperties,
      onlineQuestionProperties: state?.onlineQuestions?.copyOnlineQuestionProperties,
      currentUser: state.users.user,
      courses: Object.values( state?.courses?.courses )
    };
};

export default connect( mapState, mapDispatch )(Basic);
    