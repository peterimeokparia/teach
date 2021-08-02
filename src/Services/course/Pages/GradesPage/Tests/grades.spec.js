import {
addNewGrade,
ADD_NEW_GRADE_BEGIN,
ADD_NEW_GRADE_SUCCESS } from 'services/course/actions/grades';

import {
calculateGrade } from 'services/course/pages/GradesPage/components/AddStudentGrade/helpers';

jest.mock('../../../Api');

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
         calculateGrade( 
            studentOne, 
            grade, 
            currentGrades), 
            course, 
            pushNotificationUsers 
            )(mockDispatch);

      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ADD_NEW_GRADE_BEGIN
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type: ADD_NEW_GRADE_SUCCESS,
         payload: {
            grade: {
              selectedStudents: grade.selectedStudents,
              score:  grade.score,
              studentId: '5fab4846c2a96278c56381c9',
              percentChange: 100,
              symbol: '>'
            },
            course: { name: 'intro to psychology' },
            pushNotificationUser: pushNotificationUsers
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
         calculateGrade( 
            studentOne, 
            grade, 
            currentGrades), 
            course, 
            pushNotificationUsers 
            )(mockDispatch);

      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ADD_NEW_GRADE_BEGIN
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type: ADD_NEW_GRADE_SUCCESS,
         payload: {
            grade: {
              selectedStudents: grade.selectedStudents,
              score: '0',
              studentId: '5fab4846c2a96278c56381c9',
              percentChange: 100,
              symbol: '<'
            },
            course: { name: 'intro to psychology' },
            pushNotificationUser: pushNotificationUsers
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
         calculateGrade( 
            studentOne, 
            grade, 
            currentGrades), 
            course, 
            pushNotificationUsers 
            )(mockDispatch);

      expect(mockDispatch.mock.calls.length).toBe(2);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
         type: ADD_NEW_GRADE_BEGIN
      });
      expect(mockDispatch.mock.calls[1][0]).toEqual({
         type: ADD_NEW_GRADE_SUCCESS,
         payload: {
            grade: {
              selectedStudents: grade.selectedStudents,
              score: '50',
              studentId: '5fab4846c2a96278c56381c9',
              percentChange: 0,
              symbol: '-'
            },
            course: { name: 'intro to psychology' },
            pushNotificationUser: pushNotificationUsers
          }
      });      
   });
});