import {
dispatch,
useEffect,
useState } from 'react';

import {
connect } from 'react-redux';

import './style.css';
            
const Pagination = ({ 
    currentUser,
    page,
    setButtonFilterCount,
    pagingLimit,
    filterBy,
    loadPagedSessionData  }) => {

    const totalButtonFilterCount=setButtonFilterCount, limit=pagingLimit, firstPage=1, lastPage=page?.pages, totalPageCount=page?.pages;
    const [ pageNumber, setPageNumber ] = useState( firstPage );
    const [ userLoginSessions, setUserLoginSessions ] = useState([]);
    const [ totalPagesButtonSet, setTotalPagesButtonSet ] = useState( totalButtonFilterCount );
    const [ pageSet, setPageSet ] = useState( undefined );

 
    useEffect(() => {

        if ( filterBy ) {
            loadPagedSessionData( filterBy, pageNumber, limit );
        }

        if ( page && page?.results !== undefined ){
            setUserLoginSessions( Object.values( page?.results ) );
        }

        if ( !pageSet ){
            setPageSet( Math.ceil( totalPageCount / totalButtonFilterCount)  )
        }

    }, [ ( userLoginSessions?.length === 0 ), pageNumber ]);

    const handleButtonSetCurrentValue = ( currentValue, currentIndex ) => {
        setPageNumber( currentValue );
        loadPagedSessionData( filterBy, currentValue, limit );
    };

    const handleMagicElipsisIncrement = () =>{
        setTotalPagesButtonSet( ((totalPagesButtonSet + totalButtonFilterCount))  );
    };

    const handleMagicElipsisDecrement = () =>{
        setTotalPagesButtonSet( totalPagesButtonSet - totalButtonFilterCount );
    };

    const handleFirstPage = () => {
        setPageNumber( firstPage );
        setTotalPagesButtonSet( totalButtonFilterCount ); 
    };

    const handleLastPage = () => {
        const pageSetTest = Math.ceil( totalPageCount / totalButtonFilterCount)
        setPageNumber( lastPage );
        setTotalPagesButtonSet( totalButtonFilterCount * (pageSetTest) ); 
    };

    const handlePageNumberSet = () => {
        const totalPageSet =  [ ...Array( totalPageCount).keys() ].slice(( totalPagesButtonSet - totalButtonFilterCount ), totalPagesButtonSet );
        return totalPageSet.map((val, idx) => {
        return <span> <button className="page"  onClick={() => handleButtonSetCurrentValue( (val + 1) , idx )}> {( val + 1 )} </button></span> 
        })
    };

    const handlePagination = () => {
        if(totalPagesButtonSet <= totalButtonFilterCount)
            return <span> {handlePageNumberSet()} 
            <button className="elipsis" onClick={() => handleMagicElipsisIncrement()}>{'...'}</button> 
            <button className="page" onClick={() => handleLastPage()}> { lastPage } </button> 
            </span>
        else if (totalPagesButtonSet >= totalButtonFilterCount && totalPagesButtonSet < lastPage )
            return <span> <button className="page" onClick={() => handleFirstPage()}>{ firstPage }</button>
            <span>&nbsp;</span>
            <button className="elipsis"  onClick={() => handleMagicElipsisDecrement() }> { '...'}</button> 
            {handlePageNumberSet()} 
            <button className="elipsis" onClick={() => handleMagicElipsisIncrement()}>{'...'}</button> 
            <button className="page" onClick={() => handleLastPage()}> { lastPage }  </button></span> 
        else if (totalPagesButtonSet >= lastPage )
            return <span> <button className="page" onClick={() => handleFirstPage()}>{ firstPage }</button>
            <span>&nbsp;</span>
            <button className="elipsis"  onClick={() => handleMagicElipsisDecrement() }> { '...'}</button> 
            {handlePageNumberSet()}  </span> 
        else if ( lastPage === pageNumber  )
            return <span> <button className="page" onClick={() => handleFirstPage()}>{ firstPage }</button>
            <span>&nbsp;</span>
            <button className="elipsis"  onClick={() => handleMagicElipsisDecrement() }> { '...'}</button> 
            {handlePageNumberSet()}  </span> 
    };
        
return (   
<div className='pagination'> 
    { page?.pages &&  <span> { handlePagination() }  </span>  }
</div>
    );
};

const mapState = (state, ownProps)   => {
    return {
    currentUser: state.users.user
    };
};

export default connect(mapState, null)(Pagination);
