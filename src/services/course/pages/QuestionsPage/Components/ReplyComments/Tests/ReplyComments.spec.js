import React from 'services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/react';

import { 
Provider, 
useSelector } from "services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/react-redux";

import { 
applyMiddleware } from 'services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/redux'; 

import { 
mockStoreObject } from 'services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/Services/course/Api';

import ReplyComments  from 'services/course/pages/QuestionsPage/components/ReplyComments';
import renderer from 'services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/react-test-renderer';
import thunk from "services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/redux-thunk"; 
import * as reactRedux from 'services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/react-redux';
import configureStore from 'services/course/pages/QuestionsPage/components/ReplyComments/Tests/node_modules/redux-mock-store';


  const mockStore = configureStore([]);
  
describe('ReplyComments', () =>  {  

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
        <ReplyComments /> 
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});

