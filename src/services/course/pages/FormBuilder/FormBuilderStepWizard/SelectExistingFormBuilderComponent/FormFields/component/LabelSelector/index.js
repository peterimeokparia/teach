import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { labelValue, labelEnum, getLabelType } from 'services/course/pages/QuestionsPage/helpers';
import Select from 'react-select';
import './style.css';

const LabelSelector = ( { 
    setLabelValue } ) => {
    const [ labelType, setLabelType ] = useState('');
    const [ selectValue, setSelectValue ] = useState('');

    useEffect(() => {
        if ( labelType && selectValue ) {
           setLabelValue(  labelValue( labelType, selectValue?.value ) );
        }
    }, [ labelType, selectValue ]);
    
    function handleLabelTypeSelection(e){
        let checked = e.target.checked;
        let value = e.target.value;

        if ( checked && value ) {
            setLabelType( value );
        }
    }

    function handleLabelValueSelection(value){
        setSelectValue( value );
    }

return(
    <div className={'labelSelector'}>  
    {[ labelEnum.Alphabet, labelEnum.Numbers, labelEnum.Roman ].map(( value ) => (
        <span>
            {
             <>
              <span className={'labelText'}>{ value }</span>
      
                <input
                    type={ "radio" }
                    value={ value }
                    onChange={ handleLabelTypeSelection }
                    name={ value }
                    checked={ ( labelType === value ) }
                /> 
             </>
            }
        </span>         
     ))     
    }
    {
        <span>
        {
            <Select
                value={selectValue}
                onChange={handleLabelValueSelection}
                options={getLabelType( labelType ).map((item, index) => ( { value: index,  label: item } )  )} 
            />
        }
        </span>
    }
    </div>
    );
};
    
export default connect( null, null )( LabelSelector );