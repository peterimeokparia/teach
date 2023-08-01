import { useDispatch } from 'react-redux';
import { useState,useEffect, useRef } from 'react';
import { getItemColor } from 'services/course/helpers/PageHelpers';

function useCardItemComponentHook( cardItemCollection, loadItemAction, saveItemAction, setSelectedItemAction  ) {
  const [ title, setTitle ] = useState('');
  const [ itemTitle, setItemTitle ] = useState('');
  const [ editButton, setEditButton ] = useState( false );
  const [ editingItem, setEditingItem ] = useState( false );
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    if ( editButton ) {
      inputRef?.current?.focus();
    }

    if ( editingItem ) {
      inputRef?.current?.focus();
    }
  },[ editButton, editingItem ]);

function handleClickedCardItem( selectedItem ){
  setSelectedItemAction( selectedItem );
}

function handleCardItemOnBlur( itemProps ){
  handleEditActions( itemProps );
}

function editItemTitle( selectedItem ){
  setItemTitle( selectedItem?.title );
  setSelectedItemAction( selectedItem );
  setEditingItem( true );
}

function handleEditingItemTitleOnSubmit( e, itemProps ) {
  e.preventDefault();
  handleEditActions( itemProps );
}

function handleEditActions( itemProps ){

  let copy = { ...itemProps, title: itemTitle };

  if ( !copy?.color ){
    copy = { ...itemProps, color: getItemColor(cardItemCollection)  };
  }
  dispatch( saveItemAction(copy) );
  setItemTitle('');
  setEditingItem( false );
  dispatch( loadItemAction() );
}

return { 
  editCardTitleProps: { 
    editItemTitle, setEditButton, handleCardItemOnBlur, handleClickedCardItem,
    handleEditingItemTitleOnSubmit, setItemTitle, setTitle, editButton, 
    title, inputRef, editingItem
  }
 }; 
}

export default useCardItemComponentHook;