import {
  ADD_TO_SALES_CART,
  BUY_COURSE_BEGIN,
  BUY_COURSE_SUCCESS,
  BUY_COURSE_ERROR } from 'services/course/actions/users';
  
  import {
  loginUser,
  addToSalesCart,
  buyCourse } from 'services/course/actions/users';
  
  import {
  jabraTutorTestPassword,
  testToken } from 'services/course/api/__mocks__/token.js';
  
  jest.mock('../../../api');
  
  describe('SalesPages', () =>  {  
  
     let currentUser = {
      firstname:"JabraTutor",
      email:"JabraTutor@gmail.com",
      role: "Tutor",
      password: jabraTutorTestPassword,
      token: testToken,
      loginCount: 1, 
      userIsValidated: false,
      userIsVerified: true,
      cart: [],
      courses: [],
      operatorId: "OPSfab4846c2a96278c56381c9",
      unHarshedPassword: jabraTutorTestPassword,
      _id: "5fab4846c2a96278c56381c9"
    };
  
     let course = {
        name: "Solar System" ,
        price: 5.00,
        description: "Solar System", 
        createdBy: "5fab4846c2a96278c56381c9",
        user: {_id: "0001", firstname: "testUser"},
        operator: "teach",
        coursePushNotificationSubscribers: [],
        courseEmailNotificationSubscribers: [] 
      }; 
  
      let cartItem =  {
          course: {
            name: 'Solar System',
            price: 5,
            description: 'Solar System',
            createdBy: '5fab4846c2a96278c56381c9',
            user: {...currentUser, userIsValidated: true, loginCount: 2 },
            operator: 'teach',
            coursePushNotificationSubscribers: ['0001'],
            courseEmailNotificationSubscribers: ['0001'],
            _id: "COURSE5fab4846c2a96278c56381c9"
          },
          sessionType: 'Session',
          numberOfSessions: 0,
          totalNumberOfSessions: 1,
          userId: '5fab4846c2a96278c56381c9',
          tutor: { _id: '0001', firstname: 'testUser' },
          startDate: "05/19/2021",
          endDate: "05/19/2021",
          status: true,
          autoRenew: false,
          autoRenewDates: "05/19/2021"
        }
  
      beforeEach(() => {
        jest.spyOn(Date.prototype, 'toLocaleTimeString')
          .mockImplementation(() => '12:00:00');
        jest.spyOn(Date.prototype, 'toLocaleDateString')
          .mockImplementation(() => 'AM 1/01/2021');
      });
  
     it('should add a new item to cart', async () => {
     
      const mockDispatch = jest.fn();
  
      let successfulLogin = await loginUser( currentUser )(mockDispatch)
  
      if ( successfulLogin ) {
  
        let course = {
          name: "Solar System" ,
          price: 5.00,
          description: "Solar System", 
          createdBy: "5fab4846c2a96278c56381c9",
          user: successfulLogin,
          operator: "teach",
          coursePushNotificationSubscribers: [ "0001"],
          courseEmailNotificationSubscribers: [ "0001" ] 
        }; 
    
       let cartConfig = {
          course, 
          sessionType: "Session", 
          numberOfSessions: 0, 
          totalNumberOfSessions: 1, 
          userId: currentUser?._id, 
          tutor: { _id: "0001", firstname: "testUser" },
          startDate: "05/19/2021",
          endDate: "05/19/2021",
          status: true, 
          autoRenew: false,
          autoRenewDates: "05/19/2021"
        };
  
        await addToSalesCart(cartConfig)(mockDispatch);
        expect( mockDispatch.mock.calls.length ).toEqual( 3 );
        
        let result =  {
          type: ADD_TO_SALES_CART,
          payload: {
            course: {
              name: 'Solar System',
              price: 5,
              description: 'Solar System',
              createdBy: '5fab4846c2a96278c56381c9',
              user: {...currentUser, userIsValidated: true, loginCount: 2 },
              operator: 'teach',
              coursePushNotificationSubscribers: ['0001'],
              courseEmailNotificationSubscribers: ['0001']
            },
            sessionType: 'Session',
            numberOfSessions: 0,
            totalNumberOfSessions: 1,
            userId: '5fab4846c2a96278c56381c9',
            tutor: { _id: '0001', firstname: 'testUser' },
            startDate: "05/19/2021",
            endDate: "05/19/2021",
            status: true,
            autoRenew: false,
            autoRenewDates: "05/19/2021"
          }
        };
  
        expect(mockDispatch.mock.calls[2][0]).toEqual( result );
      };
   });
  
   it('should purchase a new item', async () => {
     
      const mockDispatch = jest.fn();
  
      let currentUser = {
        firstname:"JabraTutor",
        email:"JabraTutor@gmail.com",
        role: "Tutor",
        password: jabraTutorTestPassword,
        token: testToken,
        loginCount: 1, 
        userIsValidated: false,
        userIsVerified: true,
        cart: [ cartItem ],
        paymentStatus:"",
        courses: [],
        operatorId: "OPSfab4846c2a96278c56381c9",
        unHarshedPassword: jabraTutorTestPassword,
        _id: "5fab4846c2a96278c56381c9"
      };
  
      await buyCourse( currentUser )(mockDispatch);
      console.log("PURCHASE")
      console.log(mockDispatch.mock.calls)
      expect( mockDispatch.mock.calls.length ).toEqual( 2 );
      expect(mockDispatch.mock.calls[1][0]).toEqual({
          type: BUY_COURSE_SUCCESS,
          payload: {
            firstname: 'JabraTutor',
            email: 'JabraTutor@gmail.com',
            role: 'Tutor',
            password: 'JabraTutor@gmail.com',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiSmFicmFUdXRvckBnbWFpbC5jb20ifSwiaWF0IjoxNjA3NTkyMDU0fQ.mhO7Ihj9t8nyRWnJxq08DDN9DuDlKuQbYLY9Iz1tRAg',
            loginCount: 1,
            userIsValidated: false,
            userIsVerified: true,
            cart: [],
            paymentStatus: 'Approved',
            courses: [ 'COURSE5fab4846c2a96278c56381c9' ],
            operatorId: 'OPSfab4846c2a96278c56381c9',
            unHarshedPassword: 'JabraTutor@gmail.com',
            _id: '5fab4846c2a96278c56381c9',
            sessions: undefined
          }
        });
    });
  });
  
  
  
  
  