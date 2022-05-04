import {
useEffect,
useState } from 'react';

import {
connect } from 'react-redux';

import { 
loadFullTextSearchContent,
loadPagedFullTextSearchContent } from './node_modules/services/course/actions/fulltextsearches';

import { 
navigate } from '@reach/router';

import Pagination from './node_modules/services/course/pages/components/Pagination';
import FuzzySearch from 'react-fuzzy';

//https://www.npmjs.com/package/react-fuzzy

import './style.css';

const FullTextSearchComponent = ({ 
    searchContent,
    operatorBusinessName,
    currentUser,
    loadFullTextSearchContent,
    loadPagedFullTextSearchContent }) => {    
        
    const [ searchInput, setSearchInput ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState(undefined);

    useEffect(() => {

        loadFullTextSearchContent();

        if ( searchContent ){
            //  alert('searchContent')
            //  alert(JSON.stringify( searchContent ));
    
            if ( selectedItem ) {
            // alert('selectedItem')
            // alert(JSON.stringify( selectedItem ));
            }
        }

    }, [])

    // useEffect(() => {

    //     if ( searchInput !== '' ) {
    //         alert( searchInput )
    //         loadPagedFullTextSearchContent( searchInput, searchContent?.page ? searchContent.page : 1, 10 );
    //     }

    // }, [ searchContent?.results?.length === 0 || searchContent?.results?.length === undefined ] );
    
    function handleSearch(selectedResult) {

        alert('selectedResult handleSearch')
        alert(JSON.stringify(selectedResult))
        setSelectedItem(selectedResult )

        alert( selectedResult?.route )

        navigate(selectedResult?.route)
  
        //setSearchInput(event?.target?.value )
        // loadPagedFullTextSearchContent( event?.target?.value, searchContent?.page ? searchContent.page : 1, 10 );
    }

    // return (  <input 
    //         type='text' 
    //         value={searchInput} 
    //         onChange={handleSearch} 
    //     />)
    //  if ( searchContent ){
    //      alert('searchContent')
    //      alert(JSON.stringify( searchContent ));

    //      if ( selectedItem ) {
    //         alert('selectedItem')
    //         alert(JSON.stringify( selectedItem ));
    //      }
    //  }


return (   
<div  className="logins" >
<div className="content" >
<div className="">
<div className='header'> 
    {/* <span>{ 'Date' }</span> <span>{ 'Login' }</span> <span>{ 'Logout' }</span> */}
</div>
    <div>    
    <div>
        {/* <input 
            type='text' 
            value={searchInput} 
            onChange={handleSearch} 
        /> */}
    </div> 
        {<FuzzySearch
            list={searchContent}
            keys={['fullTextSearchExplanationMarkDownContent', 'fullTextSearchContent', 'fullTextSearchMarkDownContent', 'fullTextSearchExplanationMarkDownContent']}
            width={430}
            onSelect={(newSelectedItem) => {
                // Local state setter defined elsewhere
                handleSearch(newSelectedItem)
            }}
            resultsTemplate={(props, state, styles, clickHandler) => {
                return state.results.map((val, i) => {
                    // if ( val ) {
                    //     alert('getting results')
                    //     alert(JSON.stringify(val))
                    // }
                  const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                  return (
                    <div
                      key={i}
                      style={style}
                      onClick={() => clickHandler(i)}
                    >
                      {/* {val.title} */}
                        { val?.fullTextSearchContent }
                        { val?.fullTextSearchMarkDownContent }
                        { val?.fullTextSearchExplanationMarkDownContent }
                      {/* <span style={{ float: 'right', opacity: 0.5 }}>by {val.author}</span> */}
                    </div>
                  );
                });
              }}
        />
        }
   
        {/* { searchContent?.results?.map(( search ) => (
                <div> 
                    <span className="">
                        {
                            `${ new Date( login?.logInTime )?.toLocaleDateString('en-US') }`
                        }
                    </span>
                    <span className="loginTime">
                        {
                            `${ new Date( login?.logInTime )?.toLocaleTimeString('en-US') }`
                        }
                    </span>
                    <span className="logoutTime">
                        {
                            `${ new Date( login?.logOutTime )?.toLocaleTimeString('en-US') }`
                        }
                    </span>
                    <div><br></br></div>
                </div>
            ))
        } */}
        </div>
        {/* { <Pagination page={searchContent} setButtonFilterCount={5} pagingLimit={10} loadPagedSessionData={loadPagedFullTextSearchContent} filterBy={ currentUser?._id } />  } */}
     </div> 
    </div>
</div>
    );
};

const mapState = (state, ownProps)   => {
    return {
    currentUser: state.users.user,
    searchContent: Object.values( state?.fullTextSearches?.fullTextSearches )
    };
};

export default connect(mapState, { loadPagedFullTextSearchContent, loadFullTextSearchContent } )(FullTextSearchComponent);