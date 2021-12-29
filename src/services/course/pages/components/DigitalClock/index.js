import react from 'react';
import './style.css';

const DigitalClock = ({ digits }) => {
return (
    <div className="digital">
        <div className="digital-clock"> { digits } </div>
    </div>
); };

export default  DigitalClock;
