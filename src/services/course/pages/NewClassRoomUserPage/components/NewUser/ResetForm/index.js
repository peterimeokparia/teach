const ResetForm = ({
    inputRef,    
    cancelEdit,
    className,
    error }) => {
return <form
        className= {`${className || ''} editing ${error ? 'error' : ''}`} 
        >     
        <input
            ref={ inputRef }
                name="reset"
                type="submit"
                value={'Reset'}
                onChange={ cancelEdit }
            >
        </input> 
    </form>
};

export default ResetForm;

