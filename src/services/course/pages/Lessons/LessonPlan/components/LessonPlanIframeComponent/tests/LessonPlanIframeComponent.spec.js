import React from 'react';
import LessonPlanIframeComponent  from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponentent/tests/node_modules/services/course/pages/Lessons/LessonPlan_test/components/LessonPlanIframeComponent';
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




