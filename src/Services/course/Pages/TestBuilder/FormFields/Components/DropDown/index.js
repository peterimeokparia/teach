import { useState }from 'react';

// more to flesh out.

const DropDown = ( { 
    previewMode, 
    dropDownValueCallBack, 
    handleRadioButtonChangeCallBack  } ) => {
    const [ input, setInput ] = useState("");
    const [ optionValues,  setOptionValue ] = useState([]);
    const [ dropDownValue,  setDropDownValue ] = useState([]);
  
const addOptionValue = () => {
    setOptionValue( [...optionValues, input] );     
};

const handleDropDownSelection = ( value ) => {
    setDropDownValue( value );
    dropDownValueCallBack( value );
}
return(
    <>
    { ( previewMode ) &&
    <>
        <input  
            type={'text'}
            value={input}
            onChange={e => setInput( e.target.value )}
        />
        <button 
            onClick={addOptionValue}
        >
            {"Add Options"}
        </button>
    </>
    }
    { (optionValues?.length > 0) &&  
        <select 
            name={"select"}
            value={dropDownValue}
            onChange={(e)=> handleDropDownSelection( e.target.value )}
            >
            { optionValues?.map( value  => (
                <option value={value}> { (value) ? value : 'Select'   }</option>
                ))
            }
        </select> 
    }
    </>
    );
}

export default DropDown;