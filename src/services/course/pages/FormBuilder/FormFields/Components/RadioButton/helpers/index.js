let timerHandle = null; let autoSaveValue = 1000;
export const handleChangedValue = ( inputValue, setInputValue, element, saveFormField  ) => {

    if ( timerHandle ) {
        clearTimeout( timerHandle );
    }

    setInputValue( inputValue );

    timerHandle = setTimeout(saveFormField, autoSaveValue, element );
    
};