import {
getHostName } from 'services/course/helpers/PageHelpers';

export const pageNavigationHelper = {
    login: (operatorBusinessName) => `${getHostName() ? 'http://localhost:3000' : 'https://ravingfanstudents.com'}/${operatorBusinessName}/login`,
    users: (operatorBusinessName) => `${getHostName() ? 'http://localhost:3000' : 'https://ravingfanstudents.com'}/${operatorBusinessName}/users`,
    classRoom: (operatorBusinessName, classRoomId) => `/${operatorBusinessName}/LessonPlan/invite/userverified/classRoom/${classRoomId}`
};