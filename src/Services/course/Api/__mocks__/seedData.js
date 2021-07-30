import { 
lessonSeedData } from 'Services/course/Pages/Lessons/tests/lessonSeedData.js';

import {
userSeedData } from 'Services/course/Pages/SignUp/tests/userSeedData.js';

import {
gradesSeedData } from 'Services/course/Pages/GradesPage/Tests/gradesSeedData.js';

import {
attendanceSeedData } from 'Services/course/Pages/AttendancePage/tests/attendanceSeedData.js';

import {
meetingSeedData } from 'Services/course/Pages/Meeting/Tests/meetingSeedData.js';

import {
courseSeedData } from 'Services/course/Pages/Courses/tests/courseSeedData.js'

import { 
onlineQuestionsSeedData } from 'Services/course/Pages/OnlineQuestionsPage/tests/onlineQuestionsSeedData.js';

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