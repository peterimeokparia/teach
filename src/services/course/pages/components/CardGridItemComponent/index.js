import { Match } from '@reach/router';

const CardGridItemComponent = ({ 
    id, 
    altLinkPath,
    collection, 
    onMatchGridListItem,
    path,
    children
}) => {
    const getPath = ( item ) => { return ( path ) ? `${ path }/${ item?.id ?? item?._id }`  : `${ altLinkPath }/${ id }`; };
    return (
        <div className="container">
            { collection?.length === 0 && (
               <div> <h1>{'No items to display.'}</h1> </div>
            )}
            <div className="row justify-content-start">
            {collection?.map(( item, index ) => 
                (
                    <Match key={item?.id ?? item?._id} path={ getPath( item )}> 
                    {({ match } ) => {             
                        onMatchGridListItem( match, item ); 
                            return <div className="col-sm-6 col-md-4 col-lg-3 offset-md-0" style={{width: '50vw', marginBottom:'10pt', zIndex: 9000}}>
                            {
                                children( item, index )
                            }
                            </div>
                        }}
                    </Match>
                ))}
            </div>
        </div>
    );
}

export default CardGridItemComponent;
