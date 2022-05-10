import { 
Match } from '@reach/router';

const ListItemComponent = ({
id, 
altLinkPath,
collection, 
onMatchListItem, 
path,
ulClassName,
liClassName,
children 
}) => {
const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?._id }`  : `${ altLinkPath }/${ id }`; };

return (
      <div>
        { collection?.length === 0 && (
          <div> <h2>{'No items to display.'}</h2> </div>
        )}
        { collection?.length > 0 && ( 
            <ul className={ulClassName}>
              { collection.map(item => 
                (
                 <Match 
                    key={item?._id}
                    path={ getPath( item )}
                    // path={`${path}/${item._id}`}
                  > 
                  {({ match } ) => {                                 
                    onMatchListItem( match, item );
            return <li key={item?._id} 
                      className={liClassName}
                      >
                    { children( item ) }
                    </li>;
                    } }
                 </Match>
                ))}                  
             </ul>
        )}   
  </div>
); };

export default ListItemComponent;