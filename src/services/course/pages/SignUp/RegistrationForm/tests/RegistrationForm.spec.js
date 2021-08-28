import React from 'react';
import RegistrationForm  from 'services/course/pages/SignUp/RegistrationForm';
import renderer from 'react-test-renderer';

describe('RegistrationForm', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <RegistrationForm /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




