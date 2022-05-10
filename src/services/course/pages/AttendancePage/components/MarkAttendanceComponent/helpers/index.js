export function markAttendanceForSelectedStudents( pushNotificationUsers, selectedCourseFromCourseDropDrown, attendance, markAttendanceAction ) {
    attendance.selectedStudents?.forEach(student => {
       let attendanceData = { ...attendance, studentId: student?._id  };
       
       markAttendanceAction( student, selectedCourseFromCourseDropDrown, attendanceData, pushNotificationUsers );
    });
};