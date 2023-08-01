import { useState, useRef, useEffect } from 'react';
import { Validations } from 'services/course/helpers/Validations';
import './style.css';

const NewItemComponent = ({
    resetItemError, 
    saveItemInProgress, 
    item,
    items,
    error,
    className,
    onSubmit,
    deleteItemAction,
    setField,
    fieldValue,
    placeholder,
    initialValue,
    inputType,
    editItem,
    forms,
    children 
}) => {
    const [ editing, setEditing ] = useState(editItem);
    const inputRef = useRef();

    const reset = () => {
        setField(initialValue);
        setEditing(false);
        resetItemError();
    };

    const commitEdit = (e) => {
        e.preventDefault();

        if ( Validations.duplicateCheck( fieldValue,  items, "item fieldValue", "fieldValue" ) ) { // check
            return;
        }

        onSubmit( fieldValue )
        .then(reset)
        .catch( error => {
            setEditing(false);
            setEditing(true);
        });
    };

    const setFieldValue = () => {
        setField(initialValue);
    };

    const beginEditing = () => {
        setFieldValue();
        setEditing(true);
    };

    const performDelete = () => {
        deleteItemAction(item);
    };

    useEffect (() => {
        if ( editing ) {
            inputRef.current.focus();
        }
    }, [ editing ]); 

    if ( saveItemInProgress ){
        return <div>Save in progress, please wait.</div>;
    };

return editing 
        ? (
            <>
                <form
                    className= {`${className || ''} editing ${ error ? 'error' : '' }`}
                    onSubmit={e => commitEdit( e )}            
                >    
                    <input 
                        ref={ inputRef }
                        type={ inputType }
                        value={ fieldValue }
                        onChange={ e => setField( e.target.value) }
                        onBlur={ reset }
                        placeholder={ placeholder }
                    />
                </form>
                {error && <div>{error.message}</div>}
             </>
            ) 
        : ( 
                children( beginEditing, performDelete, forms )
        );                
};


export default NewItemComponent;