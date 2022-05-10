import React from 'react';
import ClassRoomComponent  from 'Services/course/Pages/ClassRoomPage/Components/ClassRoomComponent';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import { Provider, useSelector } from "react-redux";
import { applyMiddleware } from 'redux'; 
import configureStore from 'redux-mock-store';

jest.mock('../../../Api');

const mockStore = configureStore([]);
  
let operatorBusinessName= "boomingllc";
let selectedUserId= "PERSON010010100000047";

describe('ClassRoomComponent', () =>  {  

 let  store = mockStore({
      operators: { operators: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
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
  });

  it('renders as expected', async () => {

    const dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch)

    const tree = renderer.create(
      <Provider store={store}>
        <ClassRoomComponent 
          selectedUserId={selectedUserId}
          operatorBusinessName={operatorBusinessName } 
      /> 
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});

