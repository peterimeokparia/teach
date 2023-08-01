import { Match } from '@reach/router';

const ListItem = ({
  id, 
  altLinkPath,
  collection, 
  onMatchListItem,
  main,
  ul, 
  li,
  path,
  children
}) => {
const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?._id }`  : `${ altLinkPath }/${ id }`; };

return (
      <div className={main ?? 'listItem'}>
        { collection?.length === 0 && (
          <div> <h1>{'No items to display.'}</h1> </div>
        )}
        { collection?.length > 0 && ( 
            <ul className={ul ?? 'lessons'}> 
              { collection.map((item, index) => 
                (
                 <Match key={item?.id ?? item?._id} path={ getPath( item )}> 
                  {({ match } ) => {             
                    onMatchListItem( match, item ); 
                    return <div className={`course_detail_list_body-border`}>
                    <li key={item?.id ?? item?._id} className={li ?? 'lesson-item'} >
                       { children( item, index ) }
                     </li>
                    </div>;
                    }}
                 </Match>
                ))}
             </ul>
        )}   
</div>
); };

export default ListItem;






