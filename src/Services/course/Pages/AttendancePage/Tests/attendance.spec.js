import {
markAttendance  } from 'services/course/actions/attendance';

import {
MARK_ATTENDANCE_BEGIN,
MARK_ATTENDANCE_SUCCESS } from 'services/course/actions/attendance';

jest.mock('../../../Api');

describe('markAttendance', () => {
   const studentId = "5fab4846c2a96278c56381c9";
   const studentOne = { _id: studentId };
   const selectedStudents = [ studentOne ];
   const course = { name: "intro to psychology" }
   const courseId = "c5fab4846c2a96278c56381c9";
   const lessonId = "l5fab4846c2a96278c56381c9";
   const pushNotificationUsers = [ { studentId } ]
   const attendanceDate = Date.now();
   const attendanceMark = "Attended";

   it('should add a new attendance record', async () => {
      const mockDispatch = jest.fn();

      let attendaceData = { 
         attendanceDate, 
         attendanceMark,
         selectedStudents,
         courseId, 
         lessonId 
      };

      await markAttendance(
      studentOne,
      course,
      attendaceData,
      pushNotificationUsers  
      )(mockDispatch);

      console.log('mock mock',mockDispatch.mock.calls[1][0])
      expect(mockDispatch.mock.calls.length).toBe(3);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: MARK_ATTENDANCE_BEGIN
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual(
         {
            type: MARK_ATTENDANCE_SUCCESS,
            payload: {
               attendanceDate,
               attendanceMark,
               selectedStudents,
               courseId,
               lessonId
            }
          }
      ); 
   });
});