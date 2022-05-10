import React from 'react';
import Scheduling  from 'services/course/pages/CalendarPage/components/Scheduling';
import renderer from 'react-test-renderer';

const slotInfo = { start:"", end:"", startStr:"", endStr:"", allDay:"", view:"" };
const handleSubmit = ( e ) => { e.preventDefault(); };

describe('Scheduling', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <Scheduling 
          handleSubmit={handleSubmit}
          schedulingData={{}} 
          slotInfo={{slotInfo}}
          submitEventButtonText={"Submit"}
          children  
      /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




