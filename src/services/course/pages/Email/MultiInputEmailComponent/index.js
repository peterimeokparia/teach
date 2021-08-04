import { 
useState, 
useEffect } from 'react';

import { 
sendEmail } from 'services/course/api';

import Swal from 'sweetalert2';

const MultiInputEmailComponent = ( { 
setLesson, 
inputFieldOptions, 
messageOptions } ) => {  
const [ inputValue, setInputValue ] = useState( "" );
const [ inputName, setInputName ] = useState( "" );
const [ testObj,  setTestObj ] = useState({});
const [ inputFields, setInputFields ] = useState(
[
  { id:0,  name: inputFieldOptions?.name,  type: inputFieldOptions?.type,  placeHolderText: inputFieldOptions?.placeHolder, value: ""  }
]);

useEffect(() => {}, [] );  

 const addNewEmailInputField = () => {
    setInputFields(
     [
        ...inputFields,
        {   
          id: inputFields?.length + 1 ,  name:`input${ (inputFields?.length + 1).toString()}`,  
          type: inputFieldOptions?.type,  placeHolderText: inputFieldOptions?.placeHolder,
          value:""
        }   
    ]);
 };

 const removeEmailInputField = () => {
    if ( inputFields?.length === 1 ) {
        return;
    } 

    let lastInputField = inputFields[(inputFields?.length - 1)];
    let decrementedFieldSet = inputFields?.filter( input => input?.name !== lastInputField?.name );

    setInputFields(
    [
        ...decrementedFieldSet
    ]);
 };

  const handleChange = ( event ) => {
    setInputName( event.target.name );
    setInputValue( event.target.value );

    inputFields.find(obj => obj?.name === event?.target?.name)[ 'value' ] = event.target.value;
    if ( ! testObj[event.target.name] ) {
        testObj[event.target.name] = "set";
        setTestObj({...testObj});
    };
  };

  const  handleSubmit = () => {
    let options = {
      from: messageOptions?.from,
      subject: messageOptions?.subject,
      messageBody: messageOptions?.messageBody,
      userId: messageOptions?.userId
    };

    inputFields?.forEach(element => (
      sendEmail( options?.from, element.value, options?.subject, options?.messageBody, options?.userId )
    ));

    Swal.fire(
    { 
      title: 'Message sent',  
      confirmButtonColor: '#673ab7'   
    });
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
                    onChange={handleChange}
                    placeholder={element?.placeHolderText}
                  /> 
              </label> 
            ))  
          }
          <input className="invite-btn" type="button" onClick={addNewEmailInputField} value="+" />
          <input className="invite-btn" type="button" onClick={removeEmailInputField} value="-" />         
          <div>
          <input className="invite-btn" type="submit" value="invite" />  
            {/* <input className={(animateInvitationButton ? 'invite-btn-animation' : 'invite-btn')} type="submit" value="invite" />   */}
          </div>
        </form>  
        <div>                         
    </div>  
    </>
  );
};

export default MultiInputEmailComponent;