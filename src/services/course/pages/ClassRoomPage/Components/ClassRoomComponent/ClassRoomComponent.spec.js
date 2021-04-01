import {
addNewGrade,
markAttendance  } from '../../actions.js.js';


import {
ADD_NEW_GRADE_BEGIN,
ADD_NEW_GRADE_SUCCESS,
MARK_ATTENDANCE_BEGIN,
MARK_ATTENDANCE_SUCCESS } from '../../actions.js.js';


jest.mock('../../api');


describe('addNewGrade', () => {

   const studentId = "5fab4846c2a96278c56381c9";
   const studentOne = { _id: studentId };
   const selectedStudents = [ studentOne ];
   const currentGrades = [ { studentId, score: 50 } ];
   const course = { name: "intro to psychology" }
   const pushNotificationUsers = [ { studentId } ]


   it('should add a new grade with percentage increase', async () => {

      const mockDispatch = jest.fn();

      const grade = {
      selectedStudents,    
      score: "100", 
      }

      await addNewGrade(
      studentOne,
      course,
      grade,
      currentGrades,
      pushNotificationUsers  
      )(mockDispatch);

      console.log('ADD ADD ADD GRADES',mockDispatch.mock.calls)
      expect(mockDispatch.mock.calls.length).toBe(3);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ADD_NEW_GRADE_BEGIN
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type: ADD_NEW_GRADE_SUCCESS,
         payload: {
            selectedStudents: selectedStudents,
            score: grade.score,
            studentId,
            percentChange: 100,
            symbol: '>'
         }
      });      
   });



   it('should add a new grade with percentage decrease', async () => {

      const mockDispatch = jest.fn();

      const grade = {
      selectedStudents,    
      score: "0", 
      }

      await addNewGrade(
      studentOne,
      course,
      grade,
      currentGrades,
      pushNotificationUsers  
      )(mockDispatch);

      console.log('ADD ADD ADD GRADES',mockDispatch.mock.calls)
      expect(mockDispatch.mock.calls.length).toBe(3);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ADD_NEW_GRADE_BEGIN
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type: ADD_NEW_GRADE_SUCCESS,
         payload: {
            selectedStudents: selectedStudents,
            score: grade.score,
            studentId,
            percentChange: 100,
            symbol: '<'
         }
      });      
   });



   it('should add a new grade with no change', async () => {

      const mockDispatch = jest.fn();

      const grade = {
      selectedStudents,    
      score: "50", 
      }

      await addNewGrade(
      studentOne,
      course,
      grade,
      currentGrades,
      pushNotificationUsers  
      )(mockDispatch);

      console.log('ADD ADD ADD GRADES',mockDispatch.mock.calls)
      expect(mockDispatch.mock.calls.length).toBe(3);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ADD_NEW_GRADE_BEGIN
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type: ADD_NEW_GRADE_SUCCESS,
         payload: {
            selectedStudents: selectedStudents,
            score: grade.score,
            studentId,
            percentChange: 0,
            symbol: '-'
         }
      });      
   });
});




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
      }


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