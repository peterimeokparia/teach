import React from 'react';
import OperatorRegistrationForm  from 'services/course/pages/OperatorSignupPage/OperatorRegistrationForm';
import renderer from 'react-test-renderer';

describe('OperatorRegistrationForm', () =>  {  
  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <OperatorRegistrationForm /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




