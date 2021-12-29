import {
ADD_FORMFIELDS_BEGIN,
ADD_FORMFIELDS_SUCCESS,
SAVE_FORMFIELDS_BEGIN,
SAVE_FORMFIELDS_SUCCESS,
LOAD_FORMFIELDS_BEGIN, 
LOAD_FORMFIELDS_SUCCESS,
DELETE_FORMFIELDS_BEGIN, 
DELETE_FORMFIELDS_SUCCESS} from 'Services/course/Actions/FormFields';

import {
loadFormFields,
addNewFormField,
saveFormField,
deleteFormField } from 'Services/course/Actions/FormFields';

jest.mock('../../../../Api');

describe.skip('Test Form Builder', () => {  

  let newFormField = {
    questionId: "QUESTION5fab4846c2a96278c56381c9",
    answerId: "ANSWER5fab4846c2a96278c56381c9",
    formFieldGroupId: "QUESTION5fab4846c2a96278c56381c9",
    enableFormFieldGroup: false,
    inputType: "text",
    inputValue: "",
    labelType: "Numeral",
    labelValue: "",
    formFieldCreatedOnDateTime: Date.now(),
    formFieldCreatedBy: "PERSON5fab4846c2a96278c56381c9",
    xAxisformFieldPosition: 0,
    yAxisformFieldPosition: 0
  };

  let formFieldUpdate = {
    questionId: "QUESTION5fab4846c2a96278c56381c9",
    answerId: "ANSWER5fab4846c2a96278c56381c9",
    formFieldGroupId: "QUESTION5fab4846c2a96278c56381c9",
    enableFormFieldGroup: false,
    inputType: "radio",
    inputValue: "",
    labelType: "Roman",
    labelValue: "",
    formFieldCreatedOnDateTime: Date.now(),
    formFieldCreatedBy: "PERSON5fab4846c2a96278c56381c9",
    xAxisformFieldPosition: 200,
    yAxisformFieldPosition: 500,
    _id: "5fab4846c2a96278c56381c9"
  };

  let formFieldToRemove = {
    _id: "5fab4846c2a96278c56381c8"
}

  it('Adds A New Form Field', async () =>  {

    const mockDispatch = jest.fn();

    await addNewFormField( newFormField )(mockDispatch);

    console.log('NEW FORM FIELD',  mockDispatch.mock.calls);
    console.log(mockDispatch.mock.calls[1][0]);
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: ADD_FORMFIELDS_BEGIN
    });
    expect(mockDispatch.mock.calls[1][0].type).toEqual( ADD_FORMFIELDS_SUCCESS );
    expect(mockDispatch.mock.calls[1][0]?.payload?.questionId).toEqual( newFormField?.questionId );
    expect(mockDispatch.mock.calls[1][0]?.payload?.inputType).toEqual( newFormField?.inputType );
    expect(mockDispatch.mock.calls[1][0]?.payload?.inputValue).toEqual( newFormField?.inputValue );
    expect(mockDispatch.mock.calls[1][0]?.payload?.labelType).toEqual( newFormField?.labelType );
    expect(mockDispatch.mock.calls[1][0]?.payload?.xAxisformFieldPosition).toEqual( newFormField?.xAxisformFieldPosition );
    expect(mockDispatch.mock.calls[1][0]?.payload?.yAxisformFieldPosition).toEqual( newFormField?.yAxisformFieldPosition );
  });

  it('Updates An Existing Form Field', async () =>  {

    const mockDispatch = jest.fn();

    await saveFormField( formFieldUpdate )(mockDispatch);

    console.log('SAVE FORM FIELD',  mockDispatch.mock.calls);
    console.log(mockDispatch.mock.calls[1][0]);
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: SAVE_FORMFIELDS_BEGIN
    });
    console.log(mockDispatch.mock.calls[1][0].type)
    expect(mockDispatch.mock.calls[1][0].type).toEqual( SAVE_FORMFIELDS_SUCCESS );
    expect(mockDispatch.mock.calls[1][0].payload['testobject'].labelType).toEqual( formFieldUpdate?.labelType );
  });

  it('Loads Form Fields', async () =>  {

    const mockDispatch = jest.fn();

    await loadFormFields()(mockDispatch);

    console.log('LOAD FORM FIELD',  mockDispatch.mock.calls[1][0].payload.length);
    console.log(mockDispatch.mock.calls[1][0].payload);
    expect(mockDispatch.mock.calls.length).toBe(3);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: LOAD_FORMFIELDS_BEGIN
    });
    console.log(mockDispatch.mock.calls[1][0])
    expect(mockDispatch.mock.calls[1][0].type).toEqual( LOAD_FORMFIELDS_SUCCESS );
    expect(mockDispatch.mock.calls[1][0].payload.length).toEqual(3);
  });

  it('Removes A Form Field', async () =>  {

    const mockDispatch = jest.fn();

    await deleteFormField(formFieldToRemove)(mockDispatch);

    console.log('DELETE FORM FIELD',  mockDispatch.mock.calls);
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: DELETE_FORMFIELDS_BEGIN
    });
    
    console.log(mockDispatch.mock.calls[1][0]?.payload)
    expect(mockDispatch.mock.calls[1][0].type).toEqual(DELETE_FORMFIELDS_SUCCESS);
    expect(mockDispatch.mock.calls[1][0].payload?.data?.length).toEqual(1);

  });

});
