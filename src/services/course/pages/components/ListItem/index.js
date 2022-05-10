import { 
Match } from '@reach/router';

const ListItem = ({
id, 
altLinkPath,
collection, 
onMatchListItem, 
path,
children,
}) => {
const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?._id }`  : `${ altLinkPath }/${ id }`; };

return (
      <div className="listItem">
        { collection?.length === 0 && (
          <div> <h1>{'No items to display.'}</h1> </div>
        )}
        { collection?.length > 0 && ( 
            <ul className={'lessons'}>
              { collection.map(item => 
                (
                 <Match 
                    key={item.id}
                    path={ getPath( item )}
                  > 
                  {({ match } ) => {             
                    onMatchListItem( match, item ); 
                    return <li className={"lesson-item"} >
                    { children( item ) }
                    </li>;
                    }}
                 </Match>
                ))}
             </ul>
        )}   
</div>
); };

export default ListItem;