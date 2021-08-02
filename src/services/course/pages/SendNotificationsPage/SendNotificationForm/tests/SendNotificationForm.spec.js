import React from 'react';
import SendNotificationForm  from 'services/course/pages/SendNotificationsPage/SendNotificationForm';
import renderer from 'react-test-renderer';

describe('SendNotificationForm', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <SendNotificationForm /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




