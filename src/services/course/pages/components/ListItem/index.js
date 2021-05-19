import React from 'react';

import { 
Match } from '@reach/router';

const ListItem = ({
id, 
altLinkPath,
collection, 
onMatchListItem, 
path,
children,
ulClassName,
liClassName,
liClassNameEditView,
selectedItemId,
isEditMode,
isRecurringEvent,
liClassNameRecurringTest
}) => {

const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?._id }`  : `${ altLinkPath }/${ id }`} 
return (
        <div className="listItem">
        { collection?.length > 0 && (  
          // lessons
          //lesson-item
          //ComponentCourseListItem
          // component-seconday-list-body
            <ul className={'lessons'}>
              { collection.map(item => 
                (
                 <Match 
                    key={item.id}
                    path={ getPath( item )}
                    // path={`${path}/${item._id}`}
                  > 
                  {({ match } ) => {             
                    onMatchListItem( match, item ); 
                    return <li className={"lesson-item"} >
                    { children( item ) }
                    </li>
                    }}
                 </Match>
                ))}
             </ul>
        )}   
</div>
)}

export default ListItem;