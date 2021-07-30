import React from 'Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/react';

import { 
Provider, 
useSelector } from "Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/react-redux";

import { 
applyMiddleware } from 'Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/redux'; 

import { 
mockStoreObject } from 'Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/Services/course/Api';

import UpdateCart  from 'Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/Services/course/Pages/SalesPage/Cart/UpdateCart';
import renderer from 'Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/react-test-renderer';
import thunk from "Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/redux-thunk"; 
import * as reactRedux from 'Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/react-redux';
import configureStore from 'Services/course/Pages/SalesPage/Cart/UpdateCart/tests/node_modules/redux-mock-store';

  const mockStore = configureStore([]);
  
describe('Updates a shopping cart.', () =>  {  

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
        <UpdateCart /> 
    </Provider>
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});

