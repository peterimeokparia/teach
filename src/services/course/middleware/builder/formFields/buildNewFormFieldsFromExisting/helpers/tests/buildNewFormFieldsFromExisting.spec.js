import { formatFormieldData } from 'services/course/middleware/builder/formFields/buildNewFormFieldsFromExisting';
import isEqual from 'react-fast-compare';

describe('Build New Form Fields From Existing', () =>  {  

    it('should format form field data before adding', async () => {
    
    let updateData = {
        formId: 'NEWFORMID',
        parentComponentId: 'NEWPARENTCOMPONENTID',
        formFieldGroupId: 'NEWFORMFIELDGROUPID',
        formType: 'NEWFORMTYPE',
        formName: 'NEWFORMNAME',
        formUuId: 'NEWFORMUUID',
        formFieldCreatedBy: 'NEWUSERID',
        questionId: 'NEWQUESTIONID',
        userId: 'NEWUSERID',
        outcomeId: 'NEWOUTCOMEID'
    };

    let existingFormFieldData = {
        formId: 'OLDFORMID',
        parentComponentId: 'OLDPARENTCOMPONENTID',
        formFieldGroupId: 'OLDFORMFIELDGROUPID',
        formType: 'OLDFORMTYPE',
        formName: 'OLDFORMNAME',
        formUuId: 'OLDFORMUUID',
        enableFormFieldGroup: 'STUB0001SAMEOLDDATA',
        selected: 'STUB0001SAMEOLDDATA',
        inputType: 'STUB0001SAMEOLDDATA',
        inputValue: 'STUB0001SAMEOLDDATA',
        dropDownOptions: 'STUB0001SAMEOLDDATA',
        labelType: 'STUB0001SAMEOLDDATA',
        labelValue: 'STUB0001SAMEOLDDATA',
        formFieldCreatedOnDateTime: Date.now(),
        formFieldSavedOnDateTime: Date.now(),
        formFieldCreatedBy: 'OLDUSERID',
        markDownContent: 'STUB0001SAMEOLDDATA',  
        answer: 'STUB0001SAMEOLDDATA',
        answerKey: 'STUB0001SAMEOLDDATA',
        pointsRecived: 'STUB0001SAMEOLDDATA',
        points: 'STUB0001SAMEOLDDATA',
        position: 'STUB0001SAMEOLDDATA',
        xAxisformFieldPosition: 'STUB0001SAMEOLDDATA',
        yAxisformFieldPosition: 'STUB0001SAMEOLDDATA',
        files: [],
        videoUrl: "",
        questionId: 'OLDQUESTIONID',
        userId: 'OLDUSERID'
    };

    let newFormFieldData = {
        formId: 'NEWFORMID',
        parentComponentId: 'NEWPARENTCOMPONENTID',
        formFieldGroupId: 'NEWFORMFIELDGROUPID',
        formType: 'NEWFORMTYPE',
        formName: 'NEWFORMNAME',
        formUuId: 'NEWFORMUUID',
        enableFormFieldGroup: 'STUB0001SAMEOLDDATA',
        selected: 'STUB0001SAMEOLDDATA',
        inputType: 'STUB0001SAMEOLDDATA',
        inputValue: 'STUB0001SAMEOLDDATA',
        dropDownOptions: 'STUB0001SAMEOLDDATA',
        labelType: 'STUB0001SAMEOLDDATA',
        labelValue: 'STUB0001SAMEOLDDATA',
        formFieldCreatedOnDateTime: Date.now(),
        formFieldSavedOnDateTime: Date.now(),
        formFieldCreatedBy: 'NEWUSERID',
        markDownContent: 'STUB0001SAMEOLDDATA',  
        answer: 'STUB0001SAMEOLDDATA',
        answerKey: 'STUB0001SAMEOLDDATA',
        pointsRecived: 'STUB0001SAMEOLDDATA',
        points: 'STUB0001SAMEOLDDATA',
        position: 'STUB0001SAMEOLDDATA',
        xAxisformFieldPosition: 'STUB0001SAMEOLDDATA',
        yAxisformFieldPosition: 'STUB0001SAMEOLDDATA',
        files: [],
        videoUrl: "",
        questionId: 'NEWQUESTIONID',
        userId: 'NEWUSERID',
        outcomeId: 'NEWOUTCOMEID'
    };

    let newFormFieldFromExisting = formatFormieldData(existingFormFieldData, updateData);
    
     console.log('newFormFieldFromExisting');
     console.log(JSON.stringify( newFormFieldFromExisting ));
     
    expect( isEqual( newFormFieldFromExisting, newFormFieldData ) ).toBe( true );
   });
  });
 