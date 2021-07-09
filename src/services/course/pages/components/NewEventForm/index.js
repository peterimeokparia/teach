import { useState } from 'react';

const NewEventForm = ({ 
  getNewCalendarEventFormInputValue }) => {

  const [inputValueText, setInputValueText] = useState('')
  const onFormSubmit = (event) => {
        event.preventDefault();
        getNewCalendarEventFormInputValue(inputValueText);
  }
  return(
        <div>
            <div>Add Event</div>
          <form onSubmit={onFormSubmit}>
            <input
                 name={"newevent"} 
                 type={"text"}
                 onChange={setInputValueText}
                 value={inputValueText}
                 placeholder={"Add a new event."}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
    )
}

export default NewEventForm;