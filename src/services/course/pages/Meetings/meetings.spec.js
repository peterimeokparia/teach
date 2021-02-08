import {
UPDATE_INVITEE_SESSION_URL } from '../../actions.js';


import {
addNewMeeting,  
updateUserInvitationUrl } from '../../actions.js';



jest.mock('../../api');



describe('addNewMeeting', () => {

  const meetingId = "5fab4846c2a96278c56381c9";
 
  let meetingCollection = ["one", "two", "three", "four"];

  
  let currentUser = {
     role: "Student",
     meetings: [ "one", "two", "three", "four" ],
     meetingId:  meetingId
 };

  let currentSession = { 
     numberOfSessions: 5,
     totalNumberOfSessions: 5,
     typeOfSession: "Package",
     autoRenew: true
  };

  let meetingInitConfiguration = {
     invitees: [ "one", "two", "three", "four" ], 
     userId: "007",
     sessions: [currentSession],
     timeStarted: "Today",
     courseId: "C0001",
     lessonId: "L001",
     courseTitle: "Introduction to wood work",
     lessonTitle: "Picking the right saw",
     lessonPlanUrl: "www.test.com", 
     currentUser: currentUser
  }
  

 



  it('should add a new meeting', async () => {

     const mockDispatch = jest.fn();

     await addNewMeeting(
        meetingInitConfiguration.invitees,
        meetingInitConfiguration.userId,
        meetingInitConfiguration.sessions,
        meetingInitConfiguration.timeStarted,
        meetingInitConfiguration.courseId,
        meetingInitConfiguration.lessonId,
        meetingInitConfiguration.courseTitle,
        meetingInitConfiguration.lessonTitle,
        meetingInitConfiguration.lessonPlanUrl,
        meetingInitConfiguration.currentUser,
        meetingInitConfiguration.usersWhoJoinedTheMeeting

     )(mockDispatch);

     expect(mockDispatch.mock.calls.length).toBe(3);
     expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: 'ADD NEW MEETING BEGIN'
     });
     expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: 'LAST LOGGEDIN USER',
        payload: {
           role: "Student",
           meetings: currentUser.meetings,
           meetingId: meetingId
        }
     });
     expect(mockDispatch.mock.calls[1][0].payload.meetings.includes(meetingId)).toBe(true);
     expect(mockDispatch.mock.calls[2][0]).toEqual(
        {
           type: 'ADD NEW MEETING SUCCESS',
           payload: {
              _id: meetingId,
              invitees: [ ...meetingInitConfiguration.invitees ],
              currentUser,
              meetings: [ ...currentUser.meetings ]
           }
         }
     );
     
  });
});



describe('updateUserInvitationUrl', () => {
  
   const courseId = "COURSE5fab4846c2a96278c56381c9";
   const lessonId = "LESSON5fab4846c2a96278c56381c9";
   const userId = "USER5fab4846c2a96278c56381c9"

   const inviteeSessionUrl = "http://www.teach/lessoninprogress.com";
   const nameOfLessonInProgress = "Solar System"; 
   const lessonInProgress = true;
   
   let user = {
       _id: userId
   }

   let lesson = {
       name: "Solar System" ,
       courseId: courseId,
       _id: "LESSON5fab4846c2a96278c56381c9"
   } 
  
it('should call 1 action', () => {

     const mockDispatch = jest.fn();
 
     updateUserInvitationUrl(
       user,
       inviteeSessionUrl,
       nameOfLessonInProgress,
       lessonInProgress
     )(mockDispatch)
 
 
     console.log('new lesson', mockDispatch.mock.calls)
     expect(mockDispatch.mock.calls.length).toBe(1);
     expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: UPDATE_INVITEE_SESSION_URL,
        payload: {
           _id: userId,
           inviteeSessionUrl: inviteeSessionUrl,
           lessonInProgress: lessonInProgress,
           nameOfLessonInProgress: nameOfLessonInProgress
         }
     });   
 
  });
 
});