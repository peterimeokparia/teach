import { useState, useEffect } from 'react';


const MultiInputComponent = ( { inputFieldOptions, animateInvitationButton } ) => {
   
  const [ inputValue, setInputValue ] = useState( "" );
  const [ inputName, setInputName ] = useState( "" );
  const [ testObj,  setTestObj ] = useState({})
  const [ inputFields, setInputFields ] = useState(
   [
     { id:0,  name: inputFieldOptions?.name,  type: inputFieldOptions?.type,  placeHolderText: inputFieldOptions?.placeHolder, value: ""  }
   ]);

 useEffect(() => {}, [] )  
 const addNewInputField = () => {
    setInputFields(
     [
        ...inputFields,

        {   
          id: inputFields?.length + 1 ,  name:`input${ (inputFields?.length + 1).toString()}`,  
          type: inputFieldOptions?.type,  placeHolderText: inputFieldOptions?.placeHolder,
          value:""
        }   
    ]);
 } 




 const removeInputField = () => {

    if ( inputFields?.length === 1 ) {

        return;
    } 

    let lastInputField = inputFields[(inputFields?.length - 1)];

    let decrementedFieldSet = inputFields?.filter( input => input?.name !== lastInputField?.name );

    setInputFields(
    [
        ...decrementedFieldSet
    ]);

 }

  const handleChange = ( event ) => {

    setInputName( event.target.name );

    setInputValue( event.target.value );

    let inputFieldObject = inputFields.find(obj => obj?.name === event?.target?.name)[ 'value' ] = event.target.value;

    if ( ! testObj[event.target.name] ) {

        testObj[event.target.name] = "set";

        setTestObj({...testObj})

    }
   
  }





  const  handleSubmit = () => {


    inputFields.forEach(element => (

        sendEmail( options?.from, element.value, options?.subject, options?.messageBody, options?.userId )
    ));


  };


    return(
        <>
        <form
           onSubmit={handleSubmit}
        >
          {
            inputFields?.map((element) => (
                <label>
                    <input
                        key={element?.id}
                        name={element?.name}
                        type={element?.type}
                        value={ ( element?.name === inputName ) ? inputValue : inputFields?.find( obj => obj.name === element?.name)[ 'value' ] }
                        // value={ inputFields?.find( obj => obj.name === element?.name)[ 'value' ]}
                        onChange={handleChange}
                        placeholder={element?.placeHolderText}
                    /> 
                 </label>

             ))  
          }
          <input className="invite-btn" type="button" onClick={addNewInputField} value="+" />
          <input className="invite-btn" type="button" onClick={removeInputField} value="-" />
            
            <div>

            <input className={(animateInvitationButton ? 'invite-btn-animation' : 'invite-btn')} type="submit" value="invite" />  

            </div>
        </form>  
        <div>                         
    </div>  
            

        </>

    )
}


export default MultiInputComponent;