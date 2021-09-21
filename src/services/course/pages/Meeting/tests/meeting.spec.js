import {
UPDATE_INVITEE_SESSION_URL,
LAST_LOGGEDIN_USER } from 'services/course/actions/users';

import {
addNewMeeting } from 'services/course/actions/meetings';

import {
updateUserInvitationUrl } from 'services/course/actions/users';

import { meetingConfig } from 'services/course/pages/classroompage';

jest.mock('../../../Api');

describe('addNewMeeting', () => {
   const meetingId = "5fab4846c2a96278c56381c9";
   let meetingCollection = [ "one", "two", "three", "four" ];

   let currentUser = {
      role: "Student",
      meetings: [ "one", "two", "three", "four" ],
      meetingId
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
      currentUser: currentUser,
      usersWhoJoinedTheMeeting: [ "one", "two", "three" ]
   };

it('should add a new meeting', async () => {

      const mockDispatch = jest.fn();

      await addNewMeeting(
      meetingInitConfiguration
      )(mockDispatch);

      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: 'ADD NEW MEETING BEGIN'
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual(
         {
         type: 'ADD NEW MEETING SUCCESS',
         payload: {
            invitees: [ 'one', 'two', 'three', 'four' ],
            userId: '007',
            sessions:  meetingInitConfiguration.sessions,
            timeStarted: 'Today',
            courseId: 'C0001',
            lessonId: 'L001',
            courseTitle: 'Introduction to wood work',
            lessonTitle: 'Picking the right saw',
            lessonPlanUrl: 'www.test.com',
            currentUser: {
               role: 'Student',
               meetings: currentUser.meetings,
               meetingId: meetingId
            },
            usersWhoJoinedTheMeeting: [
               "one",
                  "two",
               "three" 
            ]
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
         {
         ...user,
         inviteeSessionUrl,
         nameOfLessonInProgress,
         lessonInProgress
         }
      )(mockDispatch)
   
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