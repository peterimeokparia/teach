import { getNumberOfStudentsAttemptedOutcome, getTheNumberOfStudentsResultForAttemptedOutcomes , resultProp} from 'services/course/middleware/outcomeInsight/helpers';

describe('Get number of students that attempted questions with a specific outcome', () => {
    
    it('should get the total number of students that attempted questions with one specific outcome', () => {
        const outcomeId = 'TESTOUTCOME001';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';
        const lessonId = 'LESSON0001';

        let questionInsights1 = {
            outcomeId,
            questionId: '001',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights2 = {
            outcomeId,
            questionId: '002',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights3 = {
            outcomeId,
            questionId: '003',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3 ];

       let { numberOfStudentsAttemptedOutcome } = getNumberOfStudentsAttemptedOutcome( questionInsightsCollection );
    
       expect( (numberOfStudentsAttemptedOutcome > 0) ).toEqual( true );
       expect( (numberOfStudentsAttemptedOutcome === 6) ).toEqual( true );
    });   

    it('should get the total number of students that attempted questions with multiple outcomes', () => {
        const outcomeId = 'TESTOUTCOME001';
        const outcomeId2 = 'TESTOUTCOME0012';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';
        const lessonId = 'LESSON0001';

        let questionInsights1 = {
            outcomeId,
            questionId: '001',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights2 = {
            outcomeId,
            questionId: '002',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights3 = {
            outcomeId,
            questionId: '003',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

        let questionInsights4 = {
            outcomeId2,
            questionId: '004',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights5 = {
            outcomeId2,
            questionId: '005',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights6 = {
            outcomeId2,
            questionId: '006',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,
                                questionInsights4, questionInsights5,  questionInsights6  ];

       let { numberOfStudentsAttemptedOutcome } = getNumberOfStudentsAttemptedOutcome( questionInsightsCollection );
    
       expect( (numberOfStudentsAttemptedOutcome > 0) ).toEqual( true );
       expect( (numberOfStudentsAttemptedOutcome === 12) ).toEqual( true );
    });
 });

 describe('Get the number of pass/fail results for given outcomes', () => {
    
    it('should get the total number of students that passed questions for multiple outcomes-by LessonID', () => {
        const outcomeId = 'TESTOUTCOME001';
        const outcomeId2 = 'TESTOUTCOME002';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';
        const lessonId = 'LESSON0001';

        let questionInsights1 = {
            outcomeId,
            questionId: '001',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights2 = {
            outcomeId,
            questionId: '002',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights3 = {
            outcomeId,
            questionId: '003',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

        let questionInsights4 = {
            outcomeId2,
            questionId: '004',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights5 = {
            outcomeId2,
            questionId: '005',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights6 = {
            outcomeId2,
            questionId: '006',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3, questionInsights4,
            questionInsights5, questionInsights6 ];

       let { numberOfStudentsPassedOutcome } = getTheNumberOfStudentsResultForAttemptedOutcomes( questionInsightsCollection, resultProp.numberOfStudentsPassedQuestion );
    
       expect( (numberOfStudentsPassedOutcome > 0) ).toEqual( true );
       expect( (numberOfStudentsPassedOutcome === 8 ) ).toEqual( true );
    });   

    it('should get the total number of students that failed questions for multiple outcomes-by LessonID', () => {
        const outcomeId = 'TESTOUTCOME001';
        const outcomeId2 = 'TESTOUTCOME002';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';
        const lessonId = 'LESSON0001';

        let questionInsights1 = {
            outcomeId,
            questionId: '001',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights2 = {
            outcomeId,
            questionId: '002',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights3 = {
            outcomeId,
            questionId: '003',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

        let questionInsights4 = {
            outcomeId2,
            questionId: '004',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights5 = {
            outcomeId2,
            questionId: '005',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights6 = {
            outcomeId2,
            questionId: '006',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,
                                questionInsights4, questionInsights5,  questionInsights6  ];

       let { numberOfStudentsFailedOutcome } = getTheNumberOfStudentsResultForAttemptedOutcomes( questionInsightsCollection, resultProp.numberOfStudentsFailedQuestion );
    
       expect( (numberOfStudentsFailedOutcome > 0) ).toEqual( true );
       expect( (numberOfStudentsFailedOutcome === 2) ).toEqual( true );
    });

    it('should get the total number of students with partial points for multiple outcomes-by LessonID', () => {
        const outcomeId = 'TESTOUTCOME001';
        const outcomeId2 = 'TESTOUTCOME002';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';
        const lessonId = 'LESSON0001';

        let questionInsights1 = {
            outcomeId,
            questionId: '001',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights2 = {
            outcomeId,
            questionId: '002',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights3 = {
            outcomeId,
            questionId: '003',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

        let questionInsights4 = {
            outcomeId2,
            questionId: '004',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights5 = {
            outcomeId2,
            questionId: '005',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights6 = {
            outcomeId2,
            questionId: '006',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3,
                                questionInsights4, questionInsights5,  questionInsights6  ];

       let { numberOfStudentsPartialPointsOutcome } = getTheNumberOfStudentsResultForAttemptedOutcomes( questionInsightsCollection, resultProp.numberOfStudentsPartialQuestionPoints );

       expect( (numberOfStudentsPartialPointsOutcome > 0) ).toEqual( true );
       expect( (numberOfStudentsPartialPointsOutcome === 2) ).toEqual( true );
    });
 });

 describe('Get the percentage break down of pass/fail/partial points results for given outcomes', () => {
    
    it('should get the total number of students that passed questions for multiple outcomes-by LessonID', () => {
        const outcomeId = 'TESTOUTCOME001';
        const outcomeId2 = 'TESTOUTCOME002';
        const formName = 'TESTFORMNAME001'
        const formType = 'quizzwithpoints';
        const courseId = 'COURSE0001';
        const lessonId = 'LESSON0001';

        let questionInsights1 = {
            outcomeId,
            questionId: '001',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights2 = {
            outcomeId,
            questionId: '002',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights3 = {
            outcomeId,
            questionId: '003',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

        let questionInsights4 = {
            outcomeId2,
            questionId: '004',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 2,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights5 = {
            outcomeId2,
            questionId: '005',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 1,
            numberOfStudentsPartialQuestionPoints: 0
        };

        let questionInsights6 = {
            outcomeId2,
            questionId: '006',
            formType,
            formName,
            courseId,
            lessonId,
            numberOfStudentsAttemptedQuestion: 2,
            numberOfStudentsPassedQuestion: 1,
            numberOfStudentsFailedQuestion: 0,
            numberOfStudentsPartialQuestionPoints: 1
        };

       let questionInsightsCollection = [ questionInsights1, questionInsights2,  questionInsights3, questionInsights4,
            questionInsights5, questionInsights6 ];

       let { percentageNumberOfStudentsPassedOutcome } = getTheNumberOfStudentsResultForAttemptedOutcomes( questionInsightsCollection, resultProp.numberOfStudentsPassedQuestion );
       let { percentageNumberOfStudentsFailedOutcome } = getTheNumberOfStudentsResultForAttemptedOutcomes( questionInsightsCollection, resultProp.numberOfStudentsFailedQuestion );
       let { percentageNumberOfStudentsPartialPointsOutcome } = getTheNumberOfStudentsResultForAttemptedOutcomes( questionInsightsCollection, resultProp.numberOfStudentsPartialQuestionPoints );
    
       expect( (percentageNumberOfStudentsPassedOutcome === 66.66666666666666 ) ).toEqual( true );
       expect( (percentageNumberOfStudentsFailedOutcome === 16.666666666666664 ) ).toEqual( true );
       expect( (percentageNumberOfStudentsPartialPointsOutcome === 16.666666666666664 ) ).toEqual( true );

    });
 });