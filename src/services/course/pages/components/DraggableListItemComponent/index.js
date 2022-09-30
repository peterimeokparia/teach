import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getSortedRecordsByPosition } from 'services/course/selectors';
import './style.css';

const DraggableListItemComponent = ({ 
  draggableListItemProps,
  children }) => {
  let {
    itemCollection,
    handleDraggableOnElementMove,
  } = draggableListItemProps;

    const [ updateContent, setUpdateContent ] = useState( false );

    useEffect(() => {
      if ( updateContent ) {
        setUpdateContent( false );
      }
    }, [ updateContent ] );

    let temp = [];

  function handleOnDragEnd(result) {
    if ( itemCollection?.length === 0 || undefined ) return;
    if (!result.destination) return;
    const items = Array.from(itemCollection);
    const [ reorderedItem ] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);
      items.forEach( ( element, index ) => { 
        let repositionedItem = { ...element, position: ( index + 1 ) };

        handleDraggableOnElementMove( repositionedItem );
        temp.push( repositionedItem );
        setUpdateContent( true );
      }); 
  }

  return( 
    <div>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="updatedOrderedQuestions">
        {(provided) => (
          <div className="listItem">
            <ul className="lessons" { ...provided.droppableProps } ref={ provided.innerRef }>
            {  getSortedRecordsByPosition( itemCollection )?.map((element, index) => { return( <Draggable key={element?._id} draggableId={element?._id} index={index}>
              {(provided) => (
                <li className={'lesson-item2'} id={element?._id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  {
                    children( element )            
                  }  
                  </li>
                )}
                </Draggable> 
              );
             } 
            )} 
            {provided.placeholder}
        </ul>
        </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  );
};

export default DraggableListItemComponent;
  
      