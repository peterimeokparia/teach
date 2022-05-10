const SingleInputEmailComponent = ( { type, handleChange, value, placeHolderText } ) => {
    return(
        <label>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeHolderText}
            /> 
        </label>
    )
}

export default SingleInputEmailComponent;