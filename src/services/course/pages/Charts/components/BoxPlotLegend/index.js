import {
React} from 'react';

import { 
connect } from 'react-redux';
import './style.css';

const BoxPlotLegend = ({ data }) => {

  if ( ! data) {
    return<div></div>;
  }

return   (    
    <div className="container">
        {data.map((d) => (
          <div  className="row"> 
           <span style={{ color: d?.color }} key={d?.name} className="col-2 bg-light p-3 border">
            {d?.name}
          </span>
          <span style={{ color: d?.color }} key={d?.name} className="col-2  p-3 border">
            <label className="value">
            {d?.value}
            </label>
          </span>
          </div>
    ))}
 
  </div>
); };

const mapState = ( state )   => {
    return {
        currentUser: state.users.user
    };
};

export default connect(mapState)(BoxPlotLegend);