import React from 'react';

import { 
Provider, 
useSelector } from "react-redux";

import { 
applyMiddleware } from 'redux'; 

import { 
mockStoreObject } from 'services/course/api';

import SendNotificationsPage  from 'services/course/pages/SendNotificationsPage';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('SendNotificationsPage', () =>  {  

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
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    const tree = renderer.create(
      <Provider store={store}>
        <SendNotificationsPage /> 
      </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




