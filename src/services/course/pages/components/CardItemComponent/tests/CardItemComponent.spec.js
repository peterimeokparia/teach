import React from 'react';
import CardItemComponent  from 'services/course/pages/components/CardItemComponent';
import renderer from 'react-test-renderer';

describe('CardItemComponent', () =>  {  
    let collection = [ {title: 'testOO1'}, {title: 'test002'}];
    const handleClickedCarditem = jest.fn();
    const handleCardItemOnBlur = jest.fn();
    const cardItemProps = {};

  it('renders as expected', async () => {
    const tree = renderer.create(
        <CardItemComponent
          cardItemCollection={collection}
          handleClickedCardItem={handleClickedCarditem}
          handleCardItemOnBlur={handleCardItemOnBlur}
          cardItemProps={cardItemProps}
        >
            {( cardItem, index, cardItemProps ) => ( <div> { cardItem?.title } </div>)

            }
        </CardItemComponent> 
    );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




