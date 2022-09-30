import React from 'react';
import DraggableListItemComponent from 'services/course/pages/components/DraggableListItemComponent';
import renderer from 'react-test-renderer';

describe('DraggableListItemComponent', () =>  {  

  let draggableListItemProps = {
    itemCollection: [ {_id: '001'}, {_id: '002'}, {_id: '003'} ],
    saveAction:()=>{}
  };

  it('renders as expected', async () => {
    const tree = renderer.create(
        <DraggableListItemComponent 
          draggableListItemProps={draggableListItemProps}
        >
          { ( element ) => {
                return <div>{ element?._id }</div>
              }
          }
        </DraggableListItemComponent > 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




