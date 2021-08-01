import React from 'react';
import SessionScheduling  from 'services/course/pages/CalendarPage/components/TimeLines/SessionScheduling';
import renderer from 'react-test-renderer';

describe('SessionScheduling', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <SessionScheduling /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




