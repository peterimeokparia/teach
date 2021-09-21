import {
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Validations } from  'services/course/helpers/Validations';
import './style.css';

const CheckBox = ({
    mainLabel,
    description,
    itemValueKey, 
    itemCollection, 
    handleSubmit }) => {
    const [ checkBoxItems, setUpdatedCheckBoxItems] = useState( [] );

    if ( itemCollection?.length > 0 ) {
        itemCollection = Object.values( itemCollection );
    }

    const onChangeHandler = ( event ) => {

        let isChecked = event?.target?.checked;
        let value = event?.target?.value;

        if ( isChecked && value && itemCollection?.length > 0 ) {
            let updatedItems = Object.values(itemCollection)?.filter(item => item[itemValueKey] === value) 
            setUpdatedCheckBoxItems([ ...checkBoxItems, ...updatedItems ]);
        }

        if ( !isChecked && value ) {
            let updatedItems = checkBoxItems?.filter(item => item[itemValueKey] !== value) 
            setUpdatedCheckBoxItems( [ ...updatedItems ] );
        }
    };

    const onHandleSubmit = ( submitEvent ) => {
        submitEvent?.preventDefault();
        handleSubmit( checkBoxItems );
    };
return (
    <div class="Users"> 
        <div className="">
        <div class="row"> 
        <div class="col-md-5"/>
        <div class="col-md-6">
        {(itemCollection?.length > 0 ) && <form onSubmit={ onHandleSubmit }>       
               { itemCollection?.map( item => (
                <div class="row"> 
                    <div class=""> 
                    <label>
                       { item[description]}
                       </label> 
                       <input type="checkbox" name={item[description]}   value={item[ itemValueKey ]} onChange={onChangeHandler} /> 
                    </div>
                </div>
                   ))
                  }
               <br />

            <div class="row"> 
                <div class="col-md-1">
                    <input type="submit" />
                </div>

            </div> 
         </form>     
        }
        </div>
        {Validations.setErrorMessageContainer() }
        </div>
        </div>
    </div>
); };

export default connect()( CheckBox );
