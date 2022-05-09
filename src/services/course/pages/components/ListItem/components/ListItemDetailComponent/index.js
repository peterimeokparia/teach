import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
Validations } from 'services/course/helpers/Validations';

import './style.css';

const ListItemDetailComponent = ({
    saveItemInProgress, 
    item,
    items,
    error,
    className,
    onSubmit,
    user,
    operatorBusinessName,
    itemName,
    resetItem,
    deleteItem,
    children}) => {
    let initialValue = item ? item?.title : '';
    const [ editing, setEditing ] = useState(false);
    const [ itemTitle, setItemTitle ] = useState(initialValue);
    const inputRef = useRef();

    const reset = () => {
        setItemTitle(initialValue);
        setEditing(false);
        resetItem();
    };

    const commitEdit = (e) => {
        e.preventDefault();

        if ( Validations.duplicateCheck( itemTitle,  items, `${itemName} Title`, "Title" ) ) {
            return;
        }
        onSubmit( itemTitle )
        .then(reset)
        .catch( error => {
            setEditing(false);
            setEditing(true);
        });
    };

    const setInnerTitle = () => {
        setItemTitle(initialValue);
    };

    const beginEditing = () => {
        setInnerTitle();
        setEditing(true);
    };

    const performDelete = () => {
        deleteItem(item);
    };

    useEffect (() => {
        if ( editing ) {
            inputRef.current.focus();
        }
    }, [ editing ]); 

    if ( saveItemInProgress ){
        return <div>Save in progress, please wait.</div>;
    };

return editing ? (
           <>
            <form
                className= {`${className || ''} editing ${ error ? 'error' : '' }`}
                onSubmit={commitEdit}            
            >    
            <input 
                ref={ inputRef }
                value={ itemTitle }
                onChange={ e => setItemTitle( e.target.value ) }
                onBlur={ reset }
                placeholder={`add your new ${itemName}`}
            />
            </form>
             {error && <div>{error.message}</div>}
           </>
            ) : ( 
                children( beginEditing, performDelete )
            );                
};

export default ListItemDetailComponent;