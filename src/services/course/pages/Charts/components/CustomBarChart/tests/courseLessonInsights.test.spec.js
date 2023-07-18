import { buildCourseLessonOutcomeData } from './node_modules/services/course/pages/Charts/components/helpers/customChartHelpers/customBarChartHelper/groupedStackedBarChartDataHelper';
import isEqual from 'react-fast-compare'; 

describe('Build course lesson outcomes', () => {
    it('should generate course lesson outcome data', () => {

        const courseId = "COURSE001"; 'rgb(255, 99, 132)'
        const lessonOne = "LESSON001";
        const lessonTwo = "LESSON002";
        const lessonThree = "LESSON003";
        const outcomeOne = "OUTCOME001";
        const outcomeTwo = "OUTCOME002";
        const outcomeThree = "OUTCOME003";
        const insightsOne = "INSIGHTS001";
        const insightsTwo = "INSIGHTS002";
        const insightsThree = "INSIGHTS003";

        let lessons = [
            {
                title: "The moon.",
                courseId,
                _id: lessonOne
            },
            {
                title: "The stars.",
                courseId,
                _id: lessonTwo
            },
            {
                title: "The universe.",
                courseId,
                _id: lessonThree
            }
        ];

        let courseOutcomes = [
            {
                title: "Building blocks.",
                courseId,
                lessonId: lessonOne,
                _id: outcomeOne

            },
            {
                title: "Gaseous illumination.",
                courseId,
                lessonId: lessonOne,
                _id: outcomeTwo
            },
            {
                title: "Elemental moon crater",
                courseId,
                lessonId: lessonOne,
                _id: outcomeThree
            },
            {
                title: "Building blocks.",
                courseId,
                lessonId: lessonTwo,
                _id: outcomeOne

            },
            {
                title: "Gaseous illumination.",
                courseId,
                lessonId: lessonTwo,
                _id: outcomeTwo
            },
            {
                title: "Elemental moon crater",
                courseId,
                lessonId: lessonTwo,
                _id: outcomeThree
            },

            {
                title: "Building blocks.",
                courseId,
                lessonId: lessonThree,
                _id: outcomeOne

            },
            {
                title: "Gaseous illumination.",
                courseId,
                lessonId: lessonThree,
                _id: outcomeTwo
            },
            {
                title: "Elemental moon crater",
                courseId,
                lessonId: lessonThree,
                _id: outcomeThree
            }
        ];

        let outcomeInsights = [
            {
                courseId,
                lessonId: lessonOne,
                outcomeId: outcomeOne,
                percentageNumberOfQuestionsPassedOutcome: 50,
                _id: insightsOne
            },
            {
                courseId,
                lessonId: lessonOne,
                outcomeId: outcomeTwo,
                percentageNumberOfQuestionsPassedOutcome: 51,
                _id: insightsTwo
            },
            {
                courseId,
                lessonId: lessonOne,
                outcomeId: outcomeThree,
                percentageNumberOfQuestionsPassedOutcome: 49,
                _id: insightsThree
            },
            {
                courseId,
                lessonId: lessonTwo,
                outcomeId: outcomeOne,
                percentageNumberOfQuestionsPassedOutcome: 50,
                _id: insightsOne
            },
            {
                courseId,
                lessonId: lessonTwo,
                outcomeId: outcomeTwo,
                percentageNumberOfQuestionsPassedOutcome: 51,
                _id: insightsTwo
            },
            {
                courseId,
                lessonId: lessonTwo,
                outcomeId: outcomeThree,
                percentageNumberOfQuestionsPassedOutcome: 49,
                _id: insightsThree
            },
            {
                courseId,
                lessonId: lessonThree,
                outcomeId: outcomeOne,
                percentageNumberOfQuestionsPassedOutcome: 50,
                _id: insightsOne
            },
            {
                courseId,
                lessonId: lessonThree,
                outcomeId: outcomeTwo,
                percentageNumberOfQuestionsPassedOutcome: 51,
                _id: insightsTwo
            },
            {
                courseId,
                lessonId: lessonThree,
                outcomeId: outcomeThree,
                percentageNumberOfQuestionsPassedOutcome: 49,
                _id: insightsThree
            }
        ];
        
        let { labels, datasets } = buildCourseLessonOutcomeData({ lessons, courseOutcomes, outcomeInsights });

        expect( ( labels?.length > 0) ).toEqual( true );
        expect( ( datasets?.length > 0) ).toEqual( true );

        let labelData = ["The moon.","The stars.","The universe."];

        expect( isEqual( labels, labelData ) ).toEqual( true );
        expect( isEqual( datasets[0].data, [50] ) ).toEqual( true );
        expect( isEqual( datasets[1].data, [51] ) ).toEqual( true );
        expect( isEqual( datasets[2].data, [49] ) ).toEqual( true );
        expect( isEqual( datasets[3].data, [null, 50] ) ).toEqual( true );
        expect( isEqual( datasets[4].data, [null, 51] ) ).toEqual( true );
        expect( isEqual( datasets[5].data, [null, 49] ) ).toEqual( true );
        expect( isEqual( datasets[6].data, [null, null, 50] ) ).toEqual( true );
        expect( isEqual( datasets[7].data, [null, null, 51] ) ).toEqual( true );
        expect( isEqual( datasets[8].data, [null, null, 49] ) ).toEqual( true );
    });
});









// LETS GO!!! HIGHER THAN 10%. LETS GO FOR ONE MORE ZERO!!! 100%
// course outcome objective: Teacher - high level view of how he / she is doing carrying the class along
// - all students on the same page
// - % of students doing well 
// - % of students struggling in course
//- % of further study coaching completed 
// - I'll need box plot for some of these
