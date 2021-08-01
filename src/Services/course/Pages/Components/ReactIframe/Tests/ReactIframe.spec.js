import React from 'react';
import ReactIframe  from 'services/course/pages/components/ReactIframe';
import renderer from 'react-test-renderer';

describe('ReactIframe', () =>  {  

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
    jest.spyOn(Date.prototype, 'toLocaleDateString')
      .mockImplementation(() => 'AM 1/01/2021');
  });

  it('renders as expected', async () => {
    const tree = renderer.create(
        <ReactIframe /> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




