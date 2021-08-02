import React from 'teach/src/services/course/pages/SignUp/RegistrationForm/tests/node_modules/react';
import RegistrationForm  from 'teach/src/services/course/pages/SignUp/RegistrationForm';
import renderer from 'teach/src/services/course/pages/SignUp/RegistrationForm/tests/node_modules/react-test-renderer';

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




