import { getTotalPointsReceived, getNumberOfStudentsAttemptedQuestion, getStudentQuestionInsights } from 'services/course/middleware/questionInsight/helpers';

describe('Generate question insights', () => {
    
    it('should get students total points received checkboxField', () => {
        let checkboxField1 = {
            _id: 'FORMFIELD0001',
            inputType: 'checkbox',
            formFieldGroupId: 'Test001',
            questionId: 'QUESTION001',
            formName: 'FORM0001',
            formUuId: 'FORMUUI001',
            answer: 'a',
            answerKey : 'a',
            points: 5
        };
    
        let checkboxField2 = {
            _id: 'FORMFIELD0002',
            inputType: 'checkbox',
            formFieldGroupId: 'Test001',
            questionId: 'QUESTION001',
            formName: 'FORM0001',
            formUuId: 'FORMUUI001',
            answer: 'b',
            answerKey : 'b',
            points: 5
        };
    
        let checkboxField3 = {
            _id: 'FORMFIELD0003',
            inputType: 'checkbox',
            formFieldGroupId: 'Test001',
            questionId: 'QUESTION001',
            formName: 'FORM0001',
            formUuId: 'FORMUUI001',
            answer: 'c',
            answerKey : 'c',
            points: 5
        };
       let formFieldCollection = [ checkboxField1, checkboxField2, checkboxField3 ];
       let totalQuestionPoints = getTotalPointsReceived( formFieldCollection );
 
       expect( (totalQuestionPoints > 0 ) ).toEqual( true );
       expect( totalQuestionPoints ).toEqual( 15 );
    });   

    it('should get students total points received radioButtonField', () => {
        let radioField1 = {
            _id: 'FORMFIELD0001',
            inputType: 'radio',
            formFieldGroupId: 'Test001',
            questionId: 'QUESTION001',
            formName: 'FORM0001',
            formUuId: 'FORMUUI001',
            answer: 'a',
            answerKey : 'a',
            points: 5
        };
    
        let radioField2 = {
            _id: 'FORMFIELD0002',
            inputType: 'radio',
            formFieldGroupId: 'Test001',
            questionId: 'QUESTION001',
            formName: 'FORM0001',
            formUuId: 'FORMUUI001',
            answer: '',
            answerKey : null,
            points: 0
        };
    
        let radioField3 = {
            _id: 'FORMFIELD0003',
            inputType: 'radio',
            formFieldGroupId: 'Test001',
            questionId: 'QUESTION001',
            formName: 'FORM0001',
            formUuId: 'FORMUUI001',
            answer: '',
            answerKey : null,
            points: 0
        };
       let formFieldCollection = [ radioField1, radioField2, radioField3 ];
       let totalQuestionPoints = getTotalPointsReceived( formFieldCollection );
 
       expect( (totalQuestionPoints > 0 ) ).toEqual( true );
       expect( totalQuestionPoints ).toEqual( 5 );
    });   
 });
 
 describe('Generate form question insights', () => {  
    const questionId = 'TESTQUESTION001';
    const formName = 'TESTFORMNAME001'

    let insightsObj1 = {
        questionId,
        formName,
        answerId: 'TESTANSWER001',
        userId: 'TESTUSER001', 
        formUuId: 'TESTUUID001'
    };

    let insightsObj2 = {
        questionId,
        formName,
        answerId: 'TESTANSWER002',
        userId: 'TESTUSER001', 
        formUuId: 'TESTUUID001'
    };

    let insightsObj3 = {
        questionId,
        formName,
        answerId: 'TESTANSWER0011',
        userId: 'TESTUSER0011', 
        formUuId: 'TESTUUID0011'
    };

    let insightsObj4 = {
        questionId,
        formName,
        answerId: 'TESTANSWER00111',
        userId: 'TESTUSER00111', 
        formUuId: 'TESTUUID00111'
    };

    let insightsObj5 = {
        questionId,
        formName,
        answerId: 'TESTANSWER001111',
        userId: 'TESTUSER001111', 
        formUuId: 'TESTUUID001111'
    };

    it('should return undefined if no question insights', () => {
        let questionInsightsStudentCollection = [];
 
        let { numberOfStudents } = getNumberOfStudentsAttemptedQuestion( { _id: questionId }, questionInsightsStudentCollection  );
 
        expect( numberOfStudents > 0 ).toEqual( false );
     });
    
    it('should get a unique set of all students that answered the question', () => {
       let questionInsightsStudentCollection = [ insightsObj1, insightsObj2, insightsObj3, insightsObj4, insightsObj5 ];

       let { numberOfStudents } = getNumberOfStudentsAttemptedQuestion( { _id: questionId }, questionInsightsStudentCollection  );

       expect( numberOfStudents > 0 ).toEqual( true );
       expect( numberOfStudents  ).toEqual( 4 );
    });
 });

 describe('Generate form question insights', () => {  
    const questionId = 'TESTQUESTION001';
    const formName = 'TESTFORMNAME001'

    let insightsObj1 = {
        questionId,
        formName,
        userId: 'TESTUSER001', 
        formUuId: 'TESTUUID001',
        totalPointsReceived: 20,
        fail: true
    };

    let insightsObj2 = {
        questionId,
        formName,
        userId: 'TESTUSER0021', 
        formUuId: 'TESTUUID001',
        totalPointsReceived: 20,
        fail: true
    };

    let insightsObj3 = {
        questionId,
        formName,
        userId: 'TESTUSER0011', 
        formUuId: 'TESTUUID0011',
        totalPointsReceived: 20,
        partialPoints: true
    };

    let insightsObj4 = {
        questionId,
        formName,
        answerId: 'TESTANSWER00111',
        userId: 'TESTUSER00111', 
        formUuId: 'TESTUUID00111',
        totalPointsReceived: 0,
        passed: true
    };

    let insightsObj5 = {
        questionId,
        formName,
        userId: 'TESTUSER001111', 
        formUuId: 'TESTUUID001111',
        totalPointsReceived: 20,
        passed: true
    };

    let insightsObj6 = {
        questionId,
        formName,
        userId: 'TESTUSER0011112', 
        formUuId: 'TESTUUID0011112',
        totalPointsReceived: 10,
        passed: true
    };

    let insightsObj7 = {
        questionId,
        formName,
        answerId: 'TESTANSWER001113',
        userId: 'TESTUSER001113', 
        formUuId: 'TESTUUID001113',
        totalPointsReceived: undefined
    };

    let insightsObj8 = {
        questionId,
        formName,
        userId: 'TESTUSER0011113', 
        formUuId: 'TESTUUID0011113',
        totalPointsReceived: 10,
        passed: true
    };

    it('should return undefined if no question insights', () => {
        let insights, questionInsightsStudentCollection = [insightsObj1, insightsObj2, insightsObj3, insightsObj4, insightsObj5, insightsObj6, insightsObj7];
        let numberOfStudents = getStudentQuestionInsights( { _id: questionId }, insights );

        expect( numberOfStudents > 0 ).toEqual( false );
   });

   it('should get a unique set of all students that passed the question', () => {
        let insights = [ insightsObj1, insightsObj2, insightsObj3, insightsObj4, insightsObj5, insightsObj6, insightsObj7, insightsObj8 ];
        let { passed } = getStudentQuestionInsights( { _id: questionId, pointsAssigned: 20 }, insights );

        expect( passed > 0 ).toEqual( true );
        expect( passed ).toEqual( 4 );
   });

   it('should get a unique set of all students with partial points', () => {
        let insights = [ insightsObj1, insightsObj2, insightsObj3, insightsObj4, insightsObj5, insightsObj6, insightsObj7  ];
        let { partialPoints  } = getStudentQuestionInsights( { _id: questionId, pointsAssigned: 20 }, insights );

        expect( partialPoints > 0 ).toEqual( true );
        expect( partialPoints ).toEqual( 1 );
    });

    it('should get a unique set of students that failed the question', () => {
        let insights = [ insightsObj1, insightsObj2, insightsObj3, insightsObj4, insightsObj5, insightsObj6, insightsObj7  ];
        let { fail  } = getStudentQuestionInsights( { _id: questionId, pointsAssigned: 20 }, insights );

        expect( fail > 0 ).toEqual( true );
        expect( fail  ).toEqual( 2 );
    });
});