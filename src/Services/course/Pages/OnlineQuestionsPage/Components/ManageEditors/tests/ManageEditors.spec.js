import React from 'react';

import { 
Provider, 
useSelector } from "react-redux";

import { 
applyMiddleware } from 'redux'; 

import { 
mockStoreObject } from 'services/course/api';

import ManageEditors  from 'services/course/pages/OnlineQuestionsPage/components/ManageEditors';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import configureStore from 'redux-mock-store';

  const mockStore = configureStore([]);
  
describe('ManageEditors', () =>  {  

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
        <ManageEditors /> 
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});

