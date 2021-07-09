import {
LOGIN_BEGIN,
LOGIN_SUCCESS,
LOGIN_ERROR  } from 'Services/course/Actions/Users';

import {
loginUser } from 'Services/course/Actions/Users'; 

import {
login } from 'Services/course/Api';

import {
role } from 'Services/course/helpers/PageHelpers';

import {
jabraTutorTestPassword,
testToken } from 'Services/course/Api/__mocks__/token.js';

jest.mock('../../../Api');

describe('LogIn', () => {  

  let user = {
    firstname:"JabraTutor",
    email:"JabraTutor@gmail.com",
    role: role.Tutor,
    password: jabraTutorTestPassword,
    token: testToken,
    loginCount: 1, 
    userIsValidated: false,
    userIsVerified: true,
    operatorId: "OPSfab4846c2a96278c56381c9",
    unHarshedPassword: jabraTutorTestPassword,
    _id: "5fab4846c2a96278c56381c9"
  };

  let userFailsLogin = {
    firstname:"JabraTutor",
    email:"JabraTutor@gmail.com",
    role: role.Tutor,
    password:jabraTutorTestPassword,
    token: testToken,
    loginCount: 1, 
    userIsValidated: false,
    userIsVerified: false,
    operatorId: "OPSfab4846c2a96278c56381c9",
    unHarshedPassword: jabraTutorTestPassword,
    _id: "5fab4846c2a96278c56381c9"
  };

   it('Logs A User In.', async () => {

    const mockDispatch = jest.fn();

    await loginUser( user )(mockDispatch);

    console.log('LOGIN LOGIN LOGIN',  mockDispatch.mock.calls);
    console.log(mockDispatch.mock.calls[1][0]);
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
       type: LOGIN_BEGIN
    });

    expect(mockDispatch.mock.calls[1][0]).toEqual({
        type: LOGIN_SUCCESS,
        payload: {
          ...user,
          loginCount: 2,
          userIsValidated: true
        }
    });
  });
  
  it('Fails Login', async () => {

    const mockDispatch = jest.fn();

    await loginUser( userFailsLogin )(mockDispatch);
    
    expect(mockDispatch.mock.calls.length).toBe(2);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: LOGIN_BEGIN,
    });
    expect(mockDispatch.mock.calls[1][0]).toEqual({
      type: LOGIN_ERROR,
      error: {
        error: 'Bad Request. JabraTutor@gmail.com has not been verified. Kindly check your email address inbox or spam.'
      }
    });
  });
});

