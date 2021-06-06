
export const handleAddPushNotificationSubscriptionToEntity  = ( subscribers, currentUser, saveAction, entitySubscriptionName ) => {
  let entityObject = {};

  if ( !subscribers?.includes( currentUser?._id ) ) {
    let entityPushNotificationSubscribers = [ ...subscribers, currentUser?._id ];

    entityObject[ entitySubscriptionName ] = entityPushNotificationSubscribers;
    saveAction( entityObject );
  } else {
    let entityPushNotificationSubscribers = subscribers.filter( id => currentUser?._id !== id ); 

    entityObject[ entitySubscriptionName ] = entityPushNotificationSubscribers;
    saveAction( entityObject );
  }
};

export const handleEmailNotificationSubscriptionToEntity  = ( subscribers, currentUser, saveAction, entitySubscriptionName ) => {
  let entityObject = {};

  if ( !subscribers?.includes( currentUser?._id ) ) {
    let entityEmailNotificationSubscribers = [ ...subscribers, currentUser?._id ];

    entityObject[ entitySubscriptionName ] = entityEmailNotificationSubscribers;
    saveAction( entityObject );
  } else {
    let entityEmailNotificationSubscribers = subscribers.filter( id => currentUser?._id !== id );

    entityObject[ entitySubscriptionName ] = entityEmailNotificationSubscribers;
    saveAction( entityObject );
  }
};

export const handleSavingEntityAction  = ( subscribers, currentUser, saveAction, entitySubscriptionName ) => {
  let entityObject = {};

  if ( !subscribers?.includes( currentUser?._id ) ) {
    let savedEntity = [ ...subscribers, currentUser?._id ];
    
    entitySubscriptionName.forEach( entityObjectPropertyName => {
      if ( !entityObject[ entityObjectPropertyName ]?.includes( currentUser?._id )) {
        entityObject[ entityObjectPropertyName ] = savedEntity;
      }
    });
    saveAction( entityObject );
  } else {
    entitySubscriptionName.forEach( entityObjectPropertyName => {
      if ( entityObject[ entityObjectPropertyName ]?.includes( currentUser?._id )) {
        entityObject[ entityObjectPropertyName ] = entityObject[ entityObjectPropertyName ]?.filter( id => currentUser?._id !== id );
      }
    });
    saveAction( entityObject );
  }
};