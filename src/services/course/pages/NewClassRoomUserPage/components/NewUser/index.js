const NewUser = ({
    className,
    error,
    inputRef,
    email,
    setEmail,
    saveInProgress,
    firstName,
    setFirstName,
    setRole,
    commitEdit    
}) => {
    
return <form
            className= {`${className || ''} editing ${error ? 'error' : ''}`}
            onSubmit={commitEdit}           
        >
            <label>
                <b> Email </b>
            <input 
                ref={ inputRef }
                value={ email }
                type="email"
                onChange={ e => setEmail( e.target.value) }
                disabled={saveInProgress}
            />
            </label>
            <label>
            <b>First Name </b>
            <input 
                ref={ inputRef }
                value={ firstName }
                type="text"
                onChange={ e => setFirstName( e.target.value) }
                disabled={saveInProgress}
            />
            </label>
            <span className="LoginPageRadioButton">
            <span className="left">
            <label> 
            Tutor
            <input
                ref={ inputRef }
                name="userrole"
                type="radio"
                value={'Tutor'}
                onChange={ e => setRole( e.target.value ) }
                placeholder="userrole"
            >
            </input>
            </label>
            </span>
            <span className="right">
            <label>
                Student
                <input
                    ref={ inputRef }
                    name="userrole"
                    type="radio"
                    value={'Student'}
                    onChange={ e => setRole( e.target.value ) }
                    placeholder="userrole"
                >
                </input> 
                </label>  
            </span>
            </span> 
            <input
                ref={ inputRef }
                name="submit"
                type="submit"
                value={'Submit'}
                onChange={ commitEdit }
                >
            </input> 
    </form>    
};

export default NewUser;