import { 
lessonSeedData } from 'teach/src/services/course/api/__mocks__/node_modules/services/course/Pages/Lessons/tests/lessonSeedData.js.js';

import {
userSeedData } from 'teach/src/services/course/api/__mocks__/node_modules/services/course/Pages/SignUp/tests/userSeedData.js.js';

import {
gradesSeedData } from 'teach/src/services/course/api/__mocks__/node_modules/services/course/Pages/GradesPage/Tests/gradesSeedData.js.js';

import {
attendanceSeedData } from 'teach/src/services/course/api/__mocks__/node_modules/services/course/Pages/AttendancePage/tests/attendanceSeedData.js.js';

import {
meetingSeedData } from 'teach/src/services/course/api/__mocks__/node_modules/services/course/Pages/Meeting/Tests/meetingSeedData.js.js';

import {
courseSeedData } from 'teach/src/services/course/api/__mocks__/node_modules/services/course/Pages/Courses/tests/courseSeedData.js.js'

import { 
onlineQuestionsSeedData } from 'teach/src/services/course/api/__mocks__/node_modules/services/course/Pages/OnlineQuestionsPage/tests/onlineQuestionsSeedData.js.js';

export let seedData = {
    '/courses': courseSeedData,
    '/courses/':courseSeedData,
    '/lessons': lessonSeedData, 
    '/lessons/': lessonSeedData,   
    '/lessons?courseId=': lessonSeedData,
    '/users': userSeedData, 
    '/users/': userSeedData, 
    '/users/register': userSeedData,
    '/users/user?id=': userSeedData,
    '/grades': gradesSeedData,
    '/attendance': attendanceSeedData,
    '/meetings' : meetingSeedData,
    '/onlinequestions': onlineQuestionsSeedData, 
    '/onlinequestions/': onlineQuestionsSeedData,  
};