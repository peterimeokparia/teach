import React from 'react';

import { 
Provider, 
useSelector } from "react-redux";

import { 
applyMiddleware } from 'redux'; 

import { 
mockStoreObject } from 'services/course/api';

import EditCalendarEvents  from 'services/course/pages/CalendarPage/components/EditCalendarEvents';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';

  const mockStore = configureStore([]);

describe('EditCalendarEvents', () =>  {  

  let  store = mockStore(mockStoreObject, applyMiddleware(thunk));

  let setSelectedItemId = jest.fn();
  let  setIsEditMode = jest.fn(true)

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  let children = jest.fn(({ children }) => (
    <div>{children}</div> ));

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
        <EditCalendarEvents 
            setSelectedItemId={() =>  setSelectedItemId("001")}
            setIsEditMode={setIsEditMode}
        >
          {
             ( beginEditing, performDelete, performDeleteAll ) => {
                beginEditing() 
             } 
           }
        </EditCalendarEvents>
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })

  it('renders children as expected', async () => {
    const tree = renderer.create(
      <Provider store={store}>
        <EditCalendarEvents>
          {
             ( beginEditing, performDelete, performDeleteAll ) => {
                   return(<div>
                    <form>
                      <input />
                    </form>
                  </div>)
             } 
           }
        </EditCalendarEvents>
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});


//https://dev.to/d_ir/verifying-children-passed-to-react-mock-components-2mf9


