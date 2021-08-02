export const pageNavigationHelper = {
    login: (operatorBusinessName) => `http://localhost:3000/${operatorBusinessName}/login`,
    users: (operatorBusinessName) => `http://localhost:3000/${operatorBusinessName}/users`,
    classRoom: (operatorBusinessName, classRoomId) => `/${operatorBusinessName}/LessonPlan/invite/userverified/classRoom/${classRoomId}`
};