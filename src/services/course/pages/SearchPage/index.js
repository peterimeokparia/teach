import {
connect } from 'react-redux';

import FullTextSearchComponentTest from '../components/FullTextSearchComponentTest';

import './style.css';

const SearchPage = ({ operatorBusinessName, searchKeysProps, searchKeys  }) => {    
    
return (   
    <div>
        <FullTextSearchComponentTest 
            operatorBusinessName={operatorBusinessName}
            searchKeysPropArray={searchKeysProps}
            searchKeys={searchKeys}
        />
    </div>
    );
};

export default connect(null, null )(SearchPage);