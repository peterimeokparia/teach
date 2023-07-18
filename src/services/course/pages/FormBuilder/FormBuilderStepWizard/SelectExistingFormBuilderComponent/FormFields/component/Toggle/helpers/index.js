export const handleToggleChange = ( e, handleToggleButtonSelectionProps ) => {  
    let { formFieldElement, setCheckedRadioButton,  handleSelectorFormFieldAnswers,
        setStudentsAnswers } = handleToggleButtonSelectionProps;

    setCheckedRadioButton( { id: formFieldElement?._id, isChecked: e?.target.checked } );

    setStudentsAnswers({...formFieldElement, selected: e?.target.checked });
    
    if (  e?.target?.checked && e?.target?.value ) {
        handleSelectorFormFieldAnswers( formFieldElement, `${ e?.target?.checked }`, `${ e?.target?.checked }`,  e?.target?.checked,  formFieldElement['points'] );
    } else {
        // const currentField = formFields?.find( field => field?._id === formFieldElement?._id );

        handleSelectorFormFieldAnswers( formFieldElement, `${ e?.target?.checked }`, "", false, formFieldElement['points'] );
    }
 };