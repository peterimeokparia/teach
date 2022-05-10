import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  DELETE_USER_SUCCESS  } from 'services/course/actions/users';
  
  import {
  loginUser,
  deleteUser } from 'services/course/actions/users'; 
  
  import {
  role } from 'services/course/helpers/PageHelpers';
  
  import {
  jabraTutorTestPassword,
  testToken } from 'services/course/api/__mocks__/token.js';
  
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
  
    let userToDelete = {
      firstname:"UserToDelete",
      email:"UserToDelete@gmail.com",
      _id: "DELETE5fab4846c2a96278c56381c9"
    }
  
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
  
    it('Fails login', async () => {
  
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
  
  
    it('Deletes an existing user', async () => {
  
      const mockDispatch = jest.fn();
  
      await deleteUser( userToDelete )(mockDispatch);
      
      console.log('IN DELETE USER')
      console.log( mockDispatch.mock.calls[0][0] );
  
      expect(mockDispatch.mock.calls.length).toBe(1);
      expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: DELETE_USER_SUCCESS,
        payload: { ...userToDelete }
      });
    });
  
  
  });
  
  