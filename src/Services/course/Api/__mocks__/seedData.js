import { 
lessonSeedData } from 'Services/course/Pages/Lessons/Tests/lessonSeedData.js';

import {
userSeedData } from 'Services/course/Pages/SignUp/Tests/userSeedData.js';

import {
gradesSeedData } from 'Services/course/Pages/GradesPage/Tests/gradesSeedData.js';

import {
attendanceSeedData } from 'Services/course/Pages/AttendancePage/Tests/attendanceSeedData.js';

import {
meetingSeedData } from 'Services/course/Pages/Meeting/Tests/meetingSeedData.js';

import {
formFieldSeedData } from 'Services/course/Pages/TestBuilder/FormFields/Tests/formFieldSeedData.js';

import {
courseSeedData } from 'Services/course/Pages/Courses/Tests/courseSeedData.js'

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
    '/formfields': formFieldSeedData, 
    '/formfields/': formFieldSeedData
};