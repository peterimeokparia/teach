const ToggleUsersRadioButtons = ({
    inputRef,
    setOption }) => {
return  <span className="LoginPageRadioButton">
    <span className="left">
        <label className="label"> 
            Existing User
            <input
                ref={ inputRef }
                name="userrole"
                type="radio"
                value={'Existing'}
                onChange={ e => setOption( e.target.value ) }
                placeholder="userrole"
            >
            </input>
        </label>
    </span>
    <span className="right">
        <label className="label"> 
            New User
            <input
                ref={ inputRef }
                name="userrole"
                type="radio"
                value={'New'}
                onChange={ e => setOption( e.target.value ) }
                placeholder="userrole"
            >
            </input> 
        </label>  
    </span>
    </span> 
}

export default ToggleUsersRadioButtons;