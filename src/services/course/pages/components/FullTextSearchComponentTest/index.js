import {
useEffect,
useState } from 'react';

import {
connect } from 'react-redux';

import { 
loadFullTextSearchContent,
loadPagedFullTextSearchContent } from 'services/course/actions/fulltextsearches';

import FuzzySearch from 'react-fuzzy';
import './style.css';

const FullTextSearchComponentTest = ({ 
    searchContent,
    operatorBusinessName,
    currentUser,
    loadFullTextSearchContent,
    loadPagedFullTextSearchContent, 
    handleSearch,
    searchKeysPropArray,
    searchKeys }) => {    
        
    useEffect(() => {

        loadFullTextSearchContent();

    }, [])
    
return (   
<div className="search">
    <div>    
    {<FuzzySearch
        list={searchContent}
        keys={searchKeysPropArray}
        width={430}
        onSelect={(newSelectedItem) => {
            handleSearch(newSelectedItem)
        }}
        resultsTemplate={(props, state, styles, clickHandler) => {
            return state.results.map((val, i) => {
                const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
                return (
                <div
                    key={i}
                    style={style}
                    onClick={() => clickHandler(i)}
                >
                    { 
                        searchKeys.map(item => (
                            <div> 
                                {
                                    val[ item ]
                                }
                            </div> 
                        ))
                    }
                </div>
                );
            });
            }}
    />
    }
  
    </div>
</div>
    );
};

const mapState = (state, ownProps)   => {
    return {
        currentUser: state.users.user,
    };
};

export default connect(mapState, { loadPagedFullTextSearchContent, loadFullTextSearchContent } )(FullTextSearchComponentTest);