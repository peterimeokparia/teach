import React from 'react';
import LessonPlanIframeComponent  from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanIframeComponent';
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




