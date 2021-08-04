export function addNewGradesForSelectedStudents( pushNotificationUsers, selectedCourseFromCourseDropDrown, newGrade, grades, addNewGradeAction ){
    newGrade.selectedStudents?.forEach(student => {
       let currentGrades = grades?.filter( grd => grd?.studentId === student?._id );

       addNewGradeAction( calculateGrade( student, newGrade, currentGrades), selectedCourseFromCourseDropDrown, pushNotificationUsers );
      // addNewGradeAction( student, selectedCourseFromCourseDropDrown, newGrade, currentGrades, pushNotificationUsers );
    });  
};

export function calculateGrade( student, grade, currentGrades ){
         let result, symbol;

         if ( currentGrades ) {
            let previousTestScore = currentGrades[currentGrades?.length -1]?.score;
            let currentTestScore = parseInt(grade?.score, 10);

               if ( previousTestScore ) {
                    if ( previousTestScore > currentTestScore ) {
                        result =  ( ( ( previousTestScore - currentTestScore ) / previousTestScore ) * 100 );
                        symbol = "<";
                     }
            
                    if ( currentTestScore > previousTestScore ) {
                        result =  ( ( ( currentTestScore - previousTestScore ) / previousTestScore ) * 100 );        
                        symbol = ">";
                    }

                   if ( currentTestScore === previousTestScore ) {
                        result = 0;
                        symbol = "-";
                    }
                }      
         } else {
            result = 0;
            symbol = "-";
        } 
    return { ...grade, studentId: student?._id, percentChange: result, symbol: symbol }; 
}