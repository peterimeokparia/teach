export const handleAddPushNotificationSubscriptionToEntity  = ( element, subscribers, currentUser, saveAction, entityType ) => {
  let entityObject = { ...element };

  if ( !subscribers.includes( currentUser?._id ) ) {
    entityObject[ entityType ] = [ ...subscribers, currentUser?._id ];
  } else {
    entityObject[ entityType ] = subscribers.filter( id => currentUser?._id !== id ); 
  }
  saveAction( entityObject );
};

export const handleEmailNotificationSubscriptionToEntity  = ( element, subscribers, currentUser, saveAction, entityType ) => {
  let entityObject = { ...element };

  if ( !subscribers.includes( currentUser?._id ) ) {
    entityObject[ entityType ] = [ ...subscribers, currentUser?._id ];
  } else {
    entityObject[ entityType ] = subscribers.filter( id => currentUser?._id !== id );
  }
  saveAction( entityObject );
};

export const handleSavingEntityAction  = ( element, subscribers, currentUser, saveAction, entityType ) => {
  let entityObject = { ...element };
   
  if ( !subscribers.includes( currentUser?._id ) ) {
    entityObject[ entityType ] = [ ...subscribers, currentUser?._id ];
  } else {
    entityObject[ entityType ] = subscribers.filter( id => currentUser?._id !== id );
  }
  saveAction( entityObject );
};