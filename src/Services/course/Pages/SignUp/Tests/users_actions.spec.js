import {
jabraTutorTestPassword,
testToken } from 'services/course/api/__mocks__/token.js';

import {
role } from 'services/course/helpers/PageHelpers';

import {
SIGN_UP_BEGINS,  
SIGN_UP_SUCCESSS,
SAVE_USER_BEGIN,
SAVE_USER_SUCCESS } from 'Services/course/actions/users';

import {
createUser,
saveUser } from 'services/course/actions/users'; 

jest.mock('../../../api');

describe('Adds A New User', () => {  
  let user = {
    firstname:"JabraTutorNewSignupACTION",
    email:"JabraTutorNewSignupACTION@gmail.com",
    role: role.Tutor,
    password:jabraTutorTestPassword
 };

   it('Adds A New User.', async () => {

    const mockDispatch = jest.fn();

    await createUser( user )(mockDispatch)

    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
       type: SIGN_UP_BEGINS
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: SIGN_UP_SUCCESSS,
        payload: {
          firstname:"JabraTutorNewSignupACTION",
          email:"JabraTutorNewSignupACTION@gmail.com",
          role: role.Tutor,
          password:jabraTutorTestPassword,
        }
    });
  });

  it('Updates An Existing User.', async () => {

    let updatedUser = {
      firstname:"JabraTutorUpdateMeNot",
      email:"JabraTutorUpdateMeNot@gmail.com",
      role: role.Tutor,
      password:jabraTutorTestPassword,
      token: testToken,
      _id: "5fab4846c2a96278c56381c7"
   };

    const mockDispatch = jest.fn();

    await saveUser( updatedUser )(mockDispatch)

    expect(mockDispatch.mock.calls.length).toBe(3);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: SAVE_USER_BEGIN
    });
    expect(mockDispatch.mock.calls[1][0].type).toEqual( SAVE_USER_SUCCESS );
    expect(mockDispatch.mock.calls[1][0].payload['testobject'].firstname ).toEqual( updatedUser?.firstname );
});

});

