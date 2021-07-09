import 
react, { 
useState } from 'react';

const RadioButton = ( { previewMode, radioButtonValueCallBack, handleRadioButtonChangeCallBack  } ) => {
    
    const [ radioButtonValue, setRadioButtonValue ] = useState('');
// more to flesh out.
return(
    <>
     <label>   { radioButtonValue } </label>
      
        { ( previewMode ) &&
            <input
             type={"text"}
             value={radioButtonValue}
             onChange={setRadioButtonValue}
             placeholder={radioButtonValue} 
            />
        }
        <input
            type={"radio"}
            value={radioButtonValueCallBack}
            onChange={handleRadioButtonChangeCallBack}
            placeholder={radioButtonValue}
        /> 
    </>
    )
};

export default RadioButton;