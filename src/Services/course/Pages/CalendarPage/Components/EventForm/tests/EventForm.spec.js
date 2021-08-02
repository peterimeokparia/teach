import React from 'react';
import EventForm  from 'services/course/pages/CalendarPage/components/EventForm';
import renderer from 'react-test-renderer';

describe('EventForm', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <EventForm /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




