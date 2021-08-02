export const links = (selectedStudents, courseId ) => {
    return [ 
      { _id: "SavedAnswers", title: "Saved Answers", path:`student/${ selectedStudents?._id }/savedanswers`, _id: selectedStudents?._id }, 
      { _id: "Grades", title: "Grades", path:`student/${ selectedStudents?._id }/grades`, _id: selectedStudents?._id }, 
      { _id: "Attendance", title: "Attendance", path: `student/${ selectedStudents?._id  }/attendance`, _id: selectedStudents?._id }, 
      { _id: "Session", title: "Session", path: `student/${ selectedStudents?._id  }/sessions/courseId/${courseId}`, _id: selectedStudents?._id },
    ];
  }