import {
formToTableConverter } from 'services/course/pages/FormBuilder/FormTables/helpers';

describe('Automate generating table data from forms.', () =>  {
    let text1 = "Reports", text2 = "Assignments";
    let markDownContent1 = `<p class="graf graf--p">${text1}</p>`;
    let markDownContent2 = `<p class="graf graf--p">${text2}</p>`

    let question1 = {
        _id:'61caa33ccb6bdd35d41907db',
        questionCreatedOnDateTime:'2021-12-28T05:40:12.435+00:00',
        markDownContent: markDownContent1,
        pointsAssigned:0,
        pointsReceived:0,
        formType:'report',
        formName:'dailysurvey_706c5df3-54df-4ed9-9f01-0365d5739c5f',
        formUuId:'706c5df3-54df-4ed9-9f01-0365d5739c5f',
        userId:'6165117e729ccf50b9ac7e64',
        questionCreatedBy:'teachuser',
        videoUrl:null,
        xAxisformFieldPosition:100,
        yAxisformFieldPosition:-4,
        columnMinWidth:100,
        columnMinHeight:10,
        columnAlign:'left',
        __v:0
    };

    let question2 = {
        _id:'61caa33ccb6bdd35d41907dc',
        questionCreatedOnDateTime:'2021-12-28T05:40:12.435+00:00',
        markDownContent: markDownContent2,
        pointsAssigned:0,
        pointsReceived:0,
        formType:'report',
        formName:'dailysurvey_706c5df3-54df-4ed9-9f01-0365d5739c5f',
        formUuId:'706c5df3-54df-4ed9-9f01-0365d5739c5f',
        userId:'6165117e729ccf50b9ac7e64',
        questionCreatedBy:'teachuser',
        videoUrl:null,
        xAxisformFieldPosition:100,
        yAxisformFieldPosition:-4,
        columnMinWidth:100,
        columnMinHeight:10,
        columnAlign:'left',
        __v:0
    };

    let formAnswer1 = {
        _id:'61cca60de7001a9316df792f',
        dropDownOptions:[],
        inputType:'dropdown',
        inputValue:'A',
        labelType:'Roman',
        labelValue:'',
        formFieldCreatedOnDateTime:'2021-12-28T05:39:27.018+00:00',
        formFieldSavedOnDateTime:'2021-12-29T18:16:45.835+00:00',
        formFieldCreatedBy:'6165117e729ccf50b9ac7e64',
        markDownContent:null,
        answer:'Test1',
        answerKey:'C',
        points:0,
        xAxisformFieldPosition:0,
        yAxisformFieldPosition:0,
        videoUrl:'',
        questionId:'61caa33ccb6bdd35d41907db',
        userId:'6165117e729ccf50b9ac7e64',
        fieldId:'61caa30fcb6bdd35d419077f',
        formType:'report',
        formName:'dailysurvey_706c5df3-54df-4ed9-9f01-0365d5739c5f'
    };

    let formAnswer2 = {
        _id:'61cca60de7001a9316df792a',
        dropDownOptions:[],
        inputType:'dropdown',
        inputValue:'A',
        labelType:'Roman',
        labelValue:'',
        formFieldCreatedOnDateTime:'2021-12-28T05:39:27.018+00:00',
        formFieldSavedOnDateTime:'2021-12-29T18:16:45.835+00:00',
        formFieldCreatedBy:'6165117e729ccf50b9ac7e64',
        markDownContent:null,
        answer:'Test2',
        answerKey:'C',
        points:0,
        xAxisformFieldPosition:0,
        yAxisformFieldPosition:0,
        videoUrl:'',
        questionId:'61caa33ccb6bdd35d41907dc',
        userId:'6165117e729ccf50b9ac7e64',
        fieldId:'61caa30fcb6bdd35d419077f',
        formType:'report',
        formName:'dailysurvey_706c5df3-54df-4ed9-9f01-0365d5739c5f'
    };

    let formQuestions = [ question1, question2 ];
    let formAnswers = [ formAnswer1, formAnswer2 ];
    let tableData = formToTableConverter( formQuestions, formAnswers );

    it('gets column data.', async () => {
        console.log('column length', tableData?.columns?.length)
        expect(tableData?.columns?.length).toBe(2);
    });

    it('gets column data label.', async () => {
        let columData = tableData?.columns?.map( colm => {
            return colm?.label;
        });
        console.log( JSON.stringify( columData ) );
        expect(columData?.includes("Reports")).toBe(true);
        expect(columData?.includes("Assignments")).toBe(true);
    });

    it('gets row data.', async () => {
        console.log('row length', tableData?.columns?.length)
        expect(tableData?.rows?.length).toBe(1);
    });
  
});