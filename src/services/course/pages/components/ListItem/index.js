import { 
Match } from '@reach/router';

const ListItem = ({
id, 
altLinkPath,
collection, 
onMatchListItem,
main = 'listItem',
ul = 'lessons', 
li = 'lesson-item',
path,
children,
}) => {
const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?._id }`  : `${ altLinkPath }/${ id }`; };

return (
      <div className={main}>
        { collection?.length === 0 && (
          <div> <h1>{'No items to display.'}</h1> </div>
        )}
        { collection?.length > 0 && ( 
            <ul className={ul}> 
              { collection.map((item, index) => 
                (
                 <Match 
                    key={item.id}
                    path={ getPath( item )}
                  > 
                  {({ match } ) => {             
                    onMatchListItem( match, item ); 
                    return <li className={li} >
                    { children( item, index ) }
                    </li>;
                    }}
                 </Match>
                ))}
             </ul>
        )}   
</div>
); };

export default ListItem;






