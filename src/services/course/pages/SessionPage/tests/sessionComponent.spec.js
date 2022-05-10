import React from 'react';

import { 
Provider } from "react-redux";

import { 
applyMiddleware } from 'redux'; 

import { 
mockStoreObject } from 'services/course/api';

import SessionPage from 'services/course/pages/SessionPage';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';

import {
INCREMENT_SESSION_COUNT,
DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS} from 'services/course/actions/sessions';

import {
incrementSessionCount,
decrementSessionCountForPackageOptions } from 'services/course/actions/sessions';

  const mockStore = configureStore([]);

jest.mock('../../../api');

describe('incrementSession',  () => {

  const sessionId = "SESSION5fab4846c2a96278c56381c9";
  const userId = "USER5fab4846c2a96278c56381c9";

  let user = {
      _id: userId
  };

  let sessions = {
      numberOfSessions: 1,
      _id: sessionId
  }; 
  
  it('should increment the number of sessions', async () => {

  const mockDispatch = jest.fn();

  await incrementSessionCount(
    sessions
  )(mockDispatch)

  console.log('new lesson', mockDispatch.mock.calls)
  expect(sessions.numberOfSessions).toBe(2);
});

it('should call 1 action', async () => {

    const mockDispatch = jest.fn();
  
    await incrementSessionCount(
      sessions
    )(mockDispatch)
  
    console.log('new session', mockDispatch.mock.calls[0][0])
    expect(mockDispatch.mock.calls.length).toBe(1);
    expect(mockDispatch.mock.calls[0][0]).toEqual({
        type: INCREMENT_SESSION_COUNT,
        payload: {
          _id: sessionId,
          numberOfSessions: 3
        }
    });   
  });
  
});

describe('decrementSessionCountForPackageOptions',  () => {

  const sessionId = "SESSION5fab4846c2a96278c56381c9";
  const userId = "USER5fab4846c2a96278c56381c9";

  let user = {
  _id: userId
  };

  let sessions = {
  numberOfSessions: 5,
  _id: sessionId
  };

it('should decrement the number of sessions', async () => {

  const mockDispatch = jest.fn();

  await decrementSessionCountForPackageOptions(
    sessions
  )(mockDispatch)

  console.log('new lesson', mockDispatch.mock.calls)
  expect(sessions.numberOfSessions).toBe(4);
});

it('should call 1 action', async () => {

  const mockDispatch = jest.fn();
  
  await decrementSessionCountForPackageOptions(
    sessions
  )(mockDispatch)

  console.log('new session', mockDispatch.mock.calls[0][0])
  expect(mockDispatch.mock.calls.length).toBe(1);
  expect(mockDispatch.mock.calls[0][0]).toEqual({
      type: DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS,
      payload: {
        _id: sessionId,
        numberOfSessions: 3
      }
    });   
   });
});


describe('SessionPage', () =>  {  

  let  store = mockStore(mockStoreObject, applyMiddleware(thunk));

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
        <SessionPage />
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  });
});
  



