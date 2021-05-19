export function addNewGradesForSelectedStudents( pushNotificationUsers, selectedCourseFromCourseDropDrown, newGrade, grades, addNewGradeAction ){
    newGrade.selectedStudents.forEach(student => {
       let currentGrades = grades?.filter( grd => grd?.studentId === student?._id );
       addNewGradeAction( student, selectedCourseFromCourseDropDrown, newGrade, currentGrades, pushNotificationUsers );
    })  
}