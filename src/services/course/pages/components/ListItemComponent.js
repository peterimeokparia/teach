import React from 'react';

import { 
Match } from '@reach/router';

// import './CourseDetailPage.css';


const ListItemComponent = ({
id, 
altLinkPath,
collection, 
onMatchListItem, 
path,
children 
}) => {

  
const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?._id }`  : `${ altLinkPath }/${ id }`} 

return (

        <div>

        { collection?.length > 0 && ( 

            <ul className="lessons">

              { collection.map(item => 
                (
                 <Match 
                    key={item._id}
                    path={ getPath( item )}
                    // path={`${path}/${item._id}`}
                  > 

                  {({ match } ) => {  
                               
                    onMatchListItem( match, item );


            return <li className="lesson-item" >

                    { children( item ) }

                    </li>
                    }}
                 </Match>
                ))}
                    
             </ul>
        )}   

</div>
)}




export default ListItemComponent;