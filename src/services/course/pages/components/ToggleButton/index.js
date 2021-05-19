import React from 'react';
import './style.css';


const ToggleButton = ({
  isChecked, 
  isDisabled, 
  value, 
  onChange,
  placeHolder }) => {
  return (
  <div> 
        <label className="switch">
            <input 
                type="checkbox" 
                checked={isChecked}
                disabled={isDisabled} 
                value={value} 
                onChange={onChange}
                placeHolder={placeHolder}
            />
            <span class="slider round"></span>
        </label>
  </div> 
  );
}

export default ToggleButton;