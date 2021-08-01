import React from 'react';
import ConsultationForm  from 'services/course/pages/CalendarPage/components/ConsultationForm';
import renderer from 'react-test-renderer';

describe('ConsultationForm', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <ConsultationForm /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




