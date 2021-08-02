import React from 'react';
import OnlineTutoringRequestForm  from 'services/course/pages/CalendarPage/components/OnlineTutoringRequestForm';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import { Provider, useSelector } from "react-redux";
import { applyMiddleware } from 'redux'; 
import configureStore from 'redux-mock-store';

// jest.mock('../../../Api');
const operatorBusinessName = "teach";
const mockStore = configureStore([]);

describe('OnlineTutoringRequestForm', () =>  {  

 let  store = mockStore({
      saveInProgress: { courses: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
      onSaveError: { courses: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} }, 
      tutors: { users: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
      user: { users: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
      operators: { operators: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
      operator: { operators: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
      calendarEvents: { calendar: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} }, 
      notifications: { pushNotificationSubscribers : {_id:"5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" } },
      users: { users: {_id: "PERSON5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
      courses: { courses: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
      grades: { grades: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
      classrooms: { classrooms: {displaySideBarDropDown: false }},
      sessions: { sessions: {_id: "SESSIONS5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true } },
      lessons: { lessons: { selectedLessonFromLessonPlanDropDown: "Test Lesson" } },
      courses: { courses: { selectedCourseFromLessonPlanCourseDropDown: "Test Course" }  },
      meetings: { meetings: {_id: "MEETING5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true }  },
  }, applyMiddleware(thunk));

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
 
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
      .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {

    const dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch)

    const tree = renderer.create(
      <Provider store={store}>
        <OnlineTutoringRequestForm 
      /> 
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});






