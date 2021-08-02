import { 
Match } from '@reach/router';

const EventListItems = ({
id, 
altLinkPath,
collection, 
onMatchListItem, 
path,
children,
ulClassName,
getClassName,
}) => { 
const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?._id }`  : `${ altLinkPath }/${ id }`; }; 

return (
        <div className="listItem">
        { collection?.length > 0 && (  
            <ul className={ulClassName}>
              { collection.map(item => 
                (
                 <Match 
                    key={item?._id}
                    path={ getPath( item )}
                  > 
                  {({ match } ) => {             
                    onMatchListItem( match, item ); 
                     return <li className={getClassName( item )} >
                    { children( item ) }
                    </li>;
                    }}
                 </Match>
                ))}
             </ul>
        )}   
</div>
); };

export default EventListItems;