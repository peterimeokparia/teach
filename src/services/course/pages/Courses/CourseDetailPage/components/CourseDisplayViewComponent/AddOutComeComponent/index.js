const AddOutComeComponent = ({ outcomes, buttonText, cardItemProps }) => {
  let { editButton, setEditButton, inputRef, setTitle, title, handleAddNewOutcomeOnSubmit } = cardItemProps;

  return ( editButton ) 
          ? <div> 
              <form onSubmit={e => handleAddNewOutcomeOnSubmit(e)} className={(outcomes?.length === 0) ? "add-new-outcome-form-animate" : "add-new-outcome-form" } onBlur={() => setEditButton( false )}>
                <input
                 ref={ inputRef } 
                  type="text"  
                  onChange={ e => setTitle( e.target.value ) } 
                  value={ title } 
                  onBlur={() => setEditButton( false )}
                />
              </form>
            </div>
          : <div className={(outcomes?.length === 0) ? "add-new-outcome-button-animate" : "add-new-outcome-button" }>
            <button onClick={() => setEditButton( true )} className="add-lesson-button">{ buttonText }</button> 
            </div>;
  };

  export default AddOutComeComponent;