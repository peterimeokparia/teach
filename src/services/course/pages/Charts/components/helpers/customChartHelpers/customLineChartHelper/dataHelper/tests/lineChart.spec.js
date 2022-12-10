import { getMainLineChartData } from 'services/course/pages/Charts/components/helpers/customChartHelpers/customLineChartHelper/dataHelper';

describe('Get main course outcome line chart dataset', () =>  {  
    
    let lesson = {
        _id: '617d1764820eed6d0cadc114',
        title: 'Atoms'
    }

    let dataObj1 = {
        formType: "homework",
        formName : "Atoms-homework_70bf955b-b492-430c-9ddc-69be65da7314",
        outcomeId: "62d96c2789c2a6149386e907",
        courseId: "613ac665f6ca0ce27d863330",
        lessonId: "617d1764820eed6d0cadc114",
        userId: "61651592729ccf50b9ac7f11",
        numberOfQuestionsInOutcome: 1,
        numberOfQuestionsPassedOutcome: 1,
        numberOfQuestionsFailedOutcome: 0,
        totalNumberOfAttemptedFailedQuestions: 0,
        numberOfUnAttemptedQuestionsInOutcome: 0,
        percentageNumberOfQuestionsPassedOutcome: 100,
        percentageNumberOfQuestionsFailedOutcome: 0,
        percentageNumberOfUnAttemptedQuestionsInFailureRate: null
    };

    let dataObj2 = {
        formType: "homework",
        formName : "Atoms-homework_70bf955b-b492-430c-9ddc-69be65da7314",
        outcomeId: "62d96c2789c2a6149386e907",
        courseId: "613ac665f6ca0ce27d863330",
        lessonId: "617d1764820eed6d0cadc114",
        userId: "61651592729ccf50b9ac7f11",
        numberOfQuestionsInOutcome: 1,
        numberOfQuestionsPassedOutcome: 1,
        numberOfQuestionsFailedOutcome: 0,
        totalNumberOfAttemptedFailedQuestions: 0,
        numberOfUnAttemptedQuestionsInOutcome: 0,
        percentageNumberOfQuestionsPassedOutcome: 100,
        percentageNumberOfQuestionsFailedOutcome: 0,
        percentageNumberOfUnAttemptedQuestionsInFailureRate: null
    };

    let courseInsights = [ dataObj1, dataObj2 ];
    
    it('should return a record of plot line data.', async () => {
        
        let plotLines = [];

        getMainLineChartData( lesson, courseInsights, plotLines );

        expect( ( plotLines?.length > 0 )  ).toBe( true );  

        let { lessonTitle, rate } = plotLines[0]

        expect(  lessonTitle === 'Atoms'  ).toBe( true );  
        expect(  rate === 100  ).toBe( true );  

    });

});