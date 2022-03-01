import {
React} from 'react';

import { 
connect } from 'react-redux';

const Legend = ({ data, selectedItems, onChange  }) => {
return   (    
    <div className="legendContainer">
    {data?.map((d) => (
      <div style={{ color: d?.color }} key={d?.name}>
        <label>
          {d?.name !== "Portfolio" && (
            <input
              type="checkbox"
              checked={selectedItems.includes(d?.name)}
              onChange={() => onChange(d?.name)}
            />
          )}
          {d.name}
        </label>
      </div>
    ))}
  </div>
); };

const mapState = ( state )   => {
    return {
        currentUser: state.users.user
    };
};

export default connect(mapState)(Legend);