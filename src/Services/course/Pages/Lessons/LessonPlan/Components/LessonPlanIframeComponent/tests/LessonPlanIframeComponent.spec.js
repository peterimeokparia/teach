import React from 'react';
import LessonPlanIframeComponent  from 'teach/src/services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponent';
import renderer from 'react-test-renderer';

describe('LessonPlanIframeComponent', () =>  {  
 
  it('renders as expected', async () => {

    const tree = renderer.create(
        <LessonPlanIframeComponent 
            name="embed_readwrite" 
            source={"test"}
            width={"1536px"}
            height="900px"
            allow="camera;microphone"
            scrolling="yes"
            frameBorder="0" 
      /> 
    );

      expect(tree.toJSON()).toMatchSnapshot();
  })
});




