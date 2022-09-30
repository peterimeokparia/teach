export const handleCheckBoxSelection = ( e, props ) => {

    let {
     formFieldElement,
     setInputValue,
     handleSelectorFormFieldAnswers,
     setCheckedButton } = props;

    setCheckedButton( { id: formFieldElement?._id, isChecked: e?.target.checked } );

    setInputValue( e?.target?.value );

    if ( e?.target?.checked && e?.target?.value ) {
        handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value,  e?.target?.value,  e?.target?.checked,  formFieldElement['points'] );
    } else {
        handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value, "", false, formFieldElement['points'] );
    }
};