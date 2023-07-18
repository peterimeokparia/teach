import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadFullTextSearchContent } from 'services/course/actions/fulltextsearches';
import FuzzySearch from 'react-fuzzy';
import './style.css';

const FullTextSearchComponentTest = ({ 
    searchContent,
    loadFullTextSearchContent,
    handleSearch,
    searchKeysPropArray,
    searchKeys,
    width = 430 }) => {    
    useEffect(() => {
        loadFullTextSearchContent();
    }, [ loadFullTextSearchContent ]);
    
return (   
<div className="search">
    <div>    
    {<FuzzySearch
        list={searchContent}
        keys={searchKeysPropArray}
        width={width}
        onSelect={(newSelectedItem) => {
            handleSearch( newSelectedItem );
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

export default connect(null, { loadFullTextSearchContent } )(FullTextSearchComponentTest);