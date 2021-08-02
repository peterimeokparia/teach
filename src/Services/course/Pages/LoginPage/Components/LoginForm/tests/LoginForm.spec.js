import React from 'react';
import LoginForm  from 'services/course/pages/LoginPage/components/LoginForm';
import renderer from 'react-test-renderer';

describe('LoginForm', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <LoginForm /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




