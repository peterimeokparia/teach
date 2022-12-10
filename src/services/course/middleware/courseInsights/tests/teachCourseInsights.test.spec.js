import { handleCourseInsights } from 'services/course/middleware/courseInsights/helpers';

describe('Get total number of outcome questions in course', () => {
    it('should get the total number of outcome questions in course', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 1,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 50, 
            percentageNumberOfQuestionsFailedOutcome: 50,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 50
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 2,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { totalNumberOfOutcomeQuestionsInCourse } = handleCourseInsights( questionInsightsCollection );
    
       expect( ( totalNumberOfOutcomeQuestionsInCourse > 0) ).toEqual( true );
       expect( ( totalNumberOfOutcomeQuestionsInCourse === 10 ) ).toEqual( true );
    });   

    it('should get the total number of questions that passed outcomes in course', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 1,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 50, 
            percentageNumberOfQuestionsFailedOutcome: 50,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 50
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 2,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { totalNumberOfQuestionsPassedOutcomeInCourse } = handleCourseInsights( questionInsightsCollection );
    
       expect( ( totalNumberOfQuestionsPassedOutcomeInCourse > 0) ).toEqual( true );
       expect( ( totalNumberOfQuestionsPassedOutcomeInCourse === 3 ) ).toEqual( true );
     });

     it('should get the percentage of questions that passed outcomes in course', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 1,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 50, 
            percentageNumberOfQuestionsFailedOutcome: 50,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 50
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 2,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { percentageNumberOfQuestionsPassedOutcomeInCourse } = handleCourseInsights( questionInsightsCollection );
    
       expect( ( percentageNumberOfQuestionsPassedOutcomeInCourse > 0) ).toEqual( true );
       expect( ( percentageNumberOfQuestionsPassedOutcomeInCourse === 30 ) ).toEqual( true );
     });


     it('should get the total number of questions that failed outcomes in course', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 1,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 50, 
            percentageNumberOfQuestionsFailedOutcome: 50,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 50
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 2,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { totalNumberOfQuestionsFailedOutcomeInCourse } = handleCourseInsights( questionInsightsCollection );
    
       expect( ( totalNumberOfQuestionsFailedOutcomeInCourse > 0) ).toEqual( true );
       expect( ( totalNumberOfQuestionsFailedOutcomeInCourse === 7 ) ).toEqual( true );
     });


     it('should get the percentage of questions that failed outcomes in course', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 1,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 50, 
            percentageNumberOfQuestionsFailedOutcome: 50,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 50
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 2,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { percentageNumberOfQuestionsFailedOutcomeInCourse } = handleCourseInsights( questionInsightsCollection );
    
       expect( ( percentageNumberOfQuestionsFailedOutcomeInCourse > 0) ).toEqual( true );
       expect( ( percentageNumberOfQuestionsFailedOutcomeInCourse === 70 ) ).toEqual( true );
     });


    
     it('should get the total number of unattempted questions that failed outcomes in course', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 1,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 50, 
            percentageNumberOfQuestionsFailedOutcome: 50,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 50
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 2,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { totalNumberOfUnAttemptedOutcomeQuestionsInCourse } = handleCourseInsights( questionInsightsCollection );
    
       expect( ( totalNumberOfUnAttemptedOutcomeQuestionsInCourse > 0) ).toEqual( true );
       expect( ( totalNumberOfUnAttemptedOutcomeQuestionsInCourse === 3 ) ).toEqual( true );
     });

     it('should get the percentage number of unattempted questions that failed outcomes in course', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 1,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 50, 
            percentageNumberOfQuestionsFailedOutcome: 50,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 50
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 2,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 2,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 2,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse } = handleCourseInsights( questionInsightsCollection );

       expect( ( percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse > 0) ).toEqual( true );
       expect( ( percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse === 43 ) ).toEqual( true );
     });
     
     it('should get the course insights', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';

        let questionInsights1 = {
            outcomeId,
            id: '001',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0001',
            numberOfQuestionsInOutcome: 3,
            numberOfQuestionsPassedOutcome: 3,
            numberOfQuestionsFailedOutcome: 0,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 100, 
            percentageNumberOfQuestionsFailedOutcome: 0,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights2 = {
            outcomeId,
            id: '002',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0002',
            numberOfQuestionsInOutcome: 3,
            numberOfQuestionsPassedOutcome: 2,
            numberOfQuestionsFailedOutcome: 1,
            totalNumberOfAttemptedFailedQuestions: 1,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 67, 
            percentageNumberOfQuestionsFailedOutcome: 33,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights3 = {
            outcomeId,
            id: '003',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0003',
            numberOfQuestionsInOutcome: 3,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 3,
            totalNumberOfAttemptedFailedQuestions: 3,
            numberOfUnAttemptedQuestionsInOutcome: 0,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 0
        };

        let questionInsights4 = {
            outcomeId,
            id: '004',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0004',
            numberOfQuestionsInOutcome: 3,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 3,
            totalNumberOfAttemptedFailedQuestions: 2,
            numberOfUnAttemptedQuestionsInOutcome: 1,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 33
        };

        let questionInsights5 = {
            outcomeId,
            id: '005',
            formType,
            formName,
            courseId,
            lessonId: 'LESSON0005',
            numberOfQuestionsInOutcome: 3,
            numberOfQuestionsPassedOutcome: 0,
            numberOfQuestionsFailedOutcome: 3,
            totalNumberOfAttemptedFailedQuestions: 0,
            numberOfUnAttemptedQuestionsInOutcome: 3,
            percentageNumberOfQuestionsPassedOutcome: 0, 
            percentageNumberOfQuestionsFailedOutcome: 100,
            percentageNumberOfUnAttemptedQuestionsInFailureRate: 100
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,  questionInsights4,  questionInsights5 ];

       let { totalNumberOfOutcomeQuestionsInCourse,
            totalNumberOfQuestionsPassedOutcomeInCourse,
            totalNumberOfQuestionsFailedOutcomeInCourse,
            totalNumberOfAttemptedFailedOutcomeQuestionsInCourse,
            totalNumberOfUnAttemptedOutcomeQuestionsInCourse,
            percentageNumberOfQuestionsPassedOutcomeInCourse,
            percentageNumberOfQuestionsFailedOutcomeInCourse,
            percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse } = handleCourseInsights( questionInsightsCollection );

       expect( ( totalNumberOfOutcomeQuestionsInCourse > 0) ).toEqual( true );
       expect( ( totalNumberOfOutcomeQuestionsInCourse === 15 ) ).toEqual( true );
       expect( ( totalNumberOfQuestionsPassedOutcomeInCourse === 5 ) ).toEqual( true );
       expect( ( totalNumberOfQuestionsFailedOutcomeInCourse === 10 ) ).toEqual( true );
       expect( ( totalNumberOfAttemptedFailedOutcomeQuestionsInCourse === 6 ) ).toEqual( true );
       expect( ( totalNumberOfUnAttemptedOutcomeQuestionsInCourse === 4 ) ).toEqual( true );
       expect( ( percentageNumberOfQuestionsPassedOutcomeInCourse === 33 ) ).toEqual( true );
       expect( ( percentageNumberOfQuestionsFailedOutcomeInCourse === 67 ) ).toEqual( true );
       expect( ( percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse === 40 ) ).toEqual( true );
     });
});

// course outcome objective: Teacher - high level view of how he / she is doing carrying the class along
// - all students on the same page
// - % of students doing well 
// - % of students struggling in course
//- % of further study coaching completed 
// - I'll need box plot for some of these
