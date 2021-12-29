import { 
lessonSeedData } from 'services/course/Pages/Lessons/tests/lessonSeedData.js';

import {
userSeedData } from 'services/course/Pages/SignUp/tests/userSeedData.js';

import {
gradesSeedData } from 'services/course/Pages/GradesPage/Tests/gradesSeedData.js';

import {
attendanceSeedData } from 'services/course/Pages/AttendancePage/tests/attendanceSeedData.js';

import {
meetingSeedData } from 'services/course/Pages/Meeting/Tests/meetingSeedData.js';

import {
courseSeedData } from 'services/course/Pages/Courses/tests/courseSeedData.js'

import { 
onlineQuestionsSeedData } from 'services/course/Pages/OnlineQuestionsPage/tests/onlineQuestionsSeedData.js';

import {
paginationSeedData } from 'services/course/pages/components/Pagination/tests/paginationSeedData.js';

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
    'paginationSeedData': paginationSeedData
};