import { lessonSeedData } from 'services/course/pages/Lessons/tests/lessonSeedData.js';
import { userSeedData } from 'services/course/pages/SignUp/tests/userSeedData.js';
import { gradesSeedData } from 'services/course/pages/GradesPage/tests/gradesSeedData.js';
import { attendanceSeedData } from 'services/course/pages/AttendancePage/tests/attendanceSeedData.js';
import { meetingSeedData } from 'services/course/pages/Meeting/tests/meetingSeedData.js';
import { courseSeedData } from 'services/course/pages/Courses/tests/courseSeedData.js'
import { onlineQuestionsSeedData } from 'services/course/pages/OnlineQuestionsPage/tests/onlineQuestionsSeedData.js';
import { paginationSeedData } from 'services/course/pages/components/Pagination/tests/paginationSeedData.js';
import { courseOutcomesSeedData } from 'services/course/pages/components/OutcomeBuilderComponent/tests/outcomesSeedData.js';

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
    'paginationSeedData': paginationSeedData,
    '/outcomes': courseOutcomesSeedData, 
    '/outcomes/': courseOutcomesSeedData, 
};