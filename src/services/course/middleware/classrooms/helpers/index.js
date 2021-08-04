import {
    updateUser } from 'services/course/api';
    
    import { 
    navigate } from '@reach/router';
    
    import{
    sendEmails } from 'services/course/actions/emails';
    
    import{
    setLessonInProgressStatus } from 'services/course/actions/lessons';
    
    import {
    loadMeetingsByMeetingId,
    addNewMeeting,  
    saveMeeting } from 'services/course/actions/meetings'; 
    
    import{
    lastLoggedInUser,
    updateUserInvitationUrl, 
    loadUserByEmail,
    getCurrentUserById,
    updateCurrentUser } from 'services/course/actions/users';
    
    import{ 
    updateCurrentTutor } from 'services/course/actions/classrooms';
    
    import {
    getSelectedPushNotificationUsers,
    sendPushNotificationMessage } from 'services/course/actions/notifications';
    
    import {
    getMeetingInvitees,
    newMeetingInvitePromoMessage } from 'services/course/pages/Meeting/helpers';
    
    import {
    emailMessageOptions,
    getLessonPlanUrls,
    getSelectedUser,
    validationBeforeEnablingTeachPlatform,
    inviteUsersToLearningSessionConfig } from 'services/course/pages/ClassRoomPage/components/CourseLessonDropDownComponent/helpers';
    
    import { 
    role } from 'services/course/helpers/PageHelpers';
        
    import { 
    LAST_LOGGEDIN_USER } from 'services/course/actions/users';
    
    export const addNewClassRoomIdToStudentsAndTutors = ( classRoom, store ) => {
        classRoom?.classRoomUsers?.forEach(classroomuser => {
            let student = classroomuser?.value;
    
            updateUser( { ...student, classRooms: [ ...student?.classRooms, classRoom?.classroom?._id  ] });
        });
    
        let tutor = { ...classRoom.user, classRooms: [ ...classRoom.user.classRooms, classRoom?.classroom?._id ]};
    
        updateUser( tutor );
        store?.dispatch({ type: LAST_LOGGEDIN_USER, payload: tutor }); 
    }; 
    
    export const enableTeachPlatform = ( meeting, store  ) => {
        let listOfStudents = meeting?.listOfStudents;
        let sessions = meeting?.sessions;
        let operatorBusinessName = meeting?.operatorBusinessName;
        let selectedUserId = meeting?.selectedUserId;
        let selectedLessonFromLessonPlanDropDown = store?.getState().lessons.selectedLessonFromLessonPlanDropDown;
        let selectedCourseFromLessonPlanCourseDropDown = store?.getState().courses.selectedCourseFromLessonPlanCourseDropDown;
        let pushNotificationSubscribers = Object.values( store?.getState()?.notifications?.pushNotificationSubscribers )?.filter( subscriber => subscriber?.operatorId === meeting?.operator?._id );
        let currentUser = store?.getState()?.users?.user;
        let users = Object.values( store?.getState()?.users?.users )?.filter( users => users?.operatorId === meeting?.operator?._id );
        let selectedUser = (  selectedUserId === currentUser?._id) ? currentUser : getSelectedUser( users, selectedUserId );
        let url = getLessonPlanUrls( operatorBusinessName, selectedUserId );
    
        let enablePlatformProps = {
            selectedUserId, 
            currentUser,
            listOfStudents,
            sessions, 
            operatorBusinessName, 
            selectedLessonFromLessonPlanDropDown, 
            pushNotificationSubscribers,
            store
        };
    
        let  meetingProps = {
            userId: currentUser?._id,
            courseId: selectedCourseFromLessonPlanCourseDropDown?._id, 
            lessonId: selectedLessonFromLessonPlanDropDown?._id,
            sessions,
            courseTitle: selectedCourseFromLessonPlanCourseDropDown?.name,
            lessonTitle: selectedLessonFromLessonPlanDropDown?.title,
            meetingUrl: url?.lessonPlanUrl,
            timeStarted: Date.now(),
            timeEnded: Date.now(),
            usersWhoJoinedTheMeeting:[],
        }; 
    
        validationBeforeEnablingTeachPlatform( selectedCourseFromLessonPlanCourseDropDown, currentUser, role, listOfStudents );
    
        try {
             switch ( selectedUser?.role ) {
    
                 case role.Tutor:    
                    store.dispatch(setLessonInProgressStatus());
                    let meeting = inviteUsersToLearningSession( enablePlatformProps, store ); 
    
                    store?.dispatch(addNewMeeting( { ...meetingProps, invitees: meeting?.invitees, currentUser: meeting?.tutor }))
                     .then( meeting => {
                        handleMeeting( meeting, selectedUser, url?.lessonPlanUrl, selectedLessonFromLessonPlanDropDown?.title, true );
                        store.dispatch(updateCurrentUser( { ...selectedUser, meetingId: meeting?._id } ));
                        store.dispatch(getSelectedPushNotificationUsers( listOfStudents, pushNotificationSubscribers ));
                        store.dispatch(updateCurrentTutor( { ...selectedUser, meetingId: meeting?._id } ));
                        store.dispatch(lastLoggedInUser( { ...selectedUser, meetingId: meeting?._id } ));
                        sendEmailToMeetingInvitees( listOfStudents, url?.lessonPageUrl, store );
                        navigate( url?.lessonPlanUrl ); 
                     }) 
                     .catch(error => console.error( error ));  
                    return;
                case role.Student:
                    enablePlatformForStudentRole( enablePlatformProps  );
                    store.dispatch(updateCurrentTutor( selectedUser ));
                    return;
                 default:
                    waititingForMeetingToStartBeforeJoining( { currentUser, operatorBusinessName, selectedUserId, store } );
                    store.dispatch(updateCurrentTutor( selectedUser )); 
                    return;   
                    
             };
        } catch (error) {
            throw Error(` enableTeachPlatform ${error}`);    
        }
    };
    
    function inviteUsersToLearningSession( props, store ){
        let { 
            listOfStudents,
            sessions, 
            currentUser, 
            operatorBusinessName, 
            selectedUserId, 
            selectedLessonFromLessonPlanDropDown, 
            pushNotificationSubscribers } = props;
    
        let invitees = [], meetingConfig = undefined;  let url = getLessonPlanUrls( operatorBusinessName, selectedUserId );
    
        if ( currentUser?.role === role.Tutor  ) {
            meetingConfig = inviteUsersToLearningSessionConfig( sessions, currentUser, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );   
        
            store.dispatch(updateUserInvitationUrl( currentUser, meetingConfig.inviteeSessionUrl, meetingConfig.nameOfLessonInProgress, meetingConfig.lessonInProgress ));
                listOfStudents?.forEach(( invitee ) => { 
                    let currentSession = inviteUsersToLearningSessionConfig( sessions, invitee, url?.lessonPageUrl, selectedLessonFromLessonPlanDropDown );    
        
                    if ( ! currentSession?.userHasExhaustedPackageSessions ) {
                        invitees.push( currentSession.user ); 
                        store.dispatch(updateUserInvitationUrl( invitee, currentSession.inviteeSessionUrl, currentSession.nameOfLessonInProgress, currentSession.lessonInProgress ));  
                        let pushNotificationSubscriber = pushNotificationSubscribers?.filter( pushuser => pushuser?.userId === invitee?._id );
        
                        store.dispatch(sendPushNotificationMessage( pushNotificationSubscriber, { title:`${currentSession.nameOfLessonInProgress} is in progress!`, body:`Click to join: ${ currentSession.nameOfLessonInProgress }` })); 
                    }
                });
        }
            return { 
                tutor: meetingConfig?.user,  
                invitees 
            };
    };
    
    let newMeetingTimerHandle = null;
    
    async function enablePlatformForStudentRole( props ){
        let { 
            selectedUserId, 
            currentUser,
            operatorBusinessName,
            store   } = props;
    
        store.dispatch(loadUserByEmail(currentUser))
        .then(user => {
            if ( user?.meetingId !== "") {
                store.dispatch(loadMeetingsByMeetingId( user?.meetingId ))
                 .then(meeting => {
                    if ( user?.meetingId === meeting?._id ){
                        joinMeeting( user, meeting, newMeetingTimerHandle, store ); 
                    } else {
                        waititingForMeetingToStartBeforeJoining( { currentUser: user, operatorBusinessName, selectedUserId, store } );
                    }
                 })
                .catch( error => { 
                    console.error(`There was a problem finding the meeting. Please wait for meeting to start before joining.${ error} `);
                    waititingForMeetingToStartBeforeJoining( { currentUser: user, operatorBusinessName, selectedUserId, store } );
                });
            } else {
                waititingForMeetingToStartBeforeJoining( { currentUser: user, operatorBusinessName, selectedUserId, store } );
              return;            
            }          
        })
        .catch(error => {
            throw Error(` enablePlatformForStudentRole. ${error}`); 
        }); 
    };
    
    function waititingForMeetingToStartBeforeJoining( props ){
        let { 
            currentUser, 
            operatorBusinessName, 
            selectedUserId,
            store } = props;
    
        let url = getLessonPlanUrls( operatorBusinessName, selectedUserId );
        let timeOutPeriod = 15000; 
      
        if ( newMeetingTimerHandle ) {
            clearTimeout( newMeetingTimerHandle );
        }
    
        newMeetingTimerHandle = setInterval( updateCurrentUserAfterASetInterval, timeOutPeriod, newMeetingTimerHandle, currentUser, store );
        
        if ( !currentUser?.lessonInProgress ) {
            newMeetingInvitePromoMessage( url?.lessonPlanUrl, newMeetingTimerHandle );
        }
    };
    
    function updateCurrentUserAfterASetInterval( newMeetingTimerHandle, currentUser, store ) {
        if ( ! currentUser?.lessonInProgress ) {
            store.dispatch(getCurrentUserById( currentUser ));
            if ( currentUser?.lessonInProgress && newMeetingTimerHandle) {
                store.dispatch(updateCurrentUser( currentUser ));
                clearTimeout( newMeetingTimerHandle );
                return;
            }
            return;
        } 
    };
    
    function handleMeeting(meeting, currentuser, inviteeSessionUrl, nameOfLessonInProgress, lessonInProgress ){
        updateUser({
            ...currentuser,
            inviteeSessionUrl,
            nameOfLessonInProgress, 
            lessonInProgress,
            meetingId: meeting?._id, 
            meetings: [ ...currentuser?.meetings, meeting?._id  ]
        });        
        if (  meeting?.invitees?.length > 0 ) {
            meeting.invitees?.forEach(user => {
                updateUser({
                    ...user, 
                    inviteeSessionUrl,
                    nameOfLessonInProgress, 
                    lessonInProgress,
                    meetingId: meeting?._id, 
                    meetings: [ ...user?.meetings, meeting?._id ]
                });   
            });
        }
    };
    
    function joinMeeting(user, currentMeeting, updateCurrentUserTimerHandle, store){
        let inviteeToUpdate = getMeetingInvitees( user, currentMeeting, updateCurrentUserTimerHandle);
    
        store?.dispatch(saveMeeting( inviteeToUpdate?.meetingId, { ...currentMeeting, usersWhoJoinedTheMeeting:[ ...currentMeeting?.usersWhoJoinedTheMeeting, user?._id ]}));
        store.dispatch(lastLoggedInUser( { ...user, meetingId: currentMeeting?._id } ));
    }
    
    function sendEmailToMeetingInvitees( listOfStudents, url, store ){
        if ( listOfStudents?.length === 0 ) return;
    
        listOfStudents?.forEach( student => {
            let messageOptions = emailMessageOptions( student, url );
    
            store.dispatch(sendEmails(
                messageOptions?.from,
                student?.email,
                messageOptions?.subject,
                messageOptions?.messageBody,
                messageOptions?.userId
            ));
        });
    };