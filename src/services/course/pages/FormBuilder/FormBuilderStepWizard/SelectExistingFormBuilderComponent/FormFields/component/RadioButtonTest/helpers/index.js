export const handleRadioButtonSelection = ( e, props ) => {

    let {
      formFieldElement,
      radioButtonAnsGroup,
      setCheckedRadioButton,
      radioButtonGroup,
      handleSelectorFormFieldAnswers,
      formFields,
      currentUser,
      setInputValue,
      setStudentsAnswers,
      saveFormField
    } = props;

     let subtractPrevCorrectAnsPoints = subtractPointsForPreviouslyCorrectAnswer(radioButtonGroup, radioButtonAnsGroup);

      setCheckedRadioButton( { id: formFieldElement?._id, isChecked: e?.target.checked } );

     if ( !currentUser?._id ) return;

      const selectedRadioButton = e?.target?.checked;

      const input = e?.target?.value;

       setInputValue( e?.target?.value );

       if ( radioButtonGroup?.length > 0 ) {

          radioButtonGroup?.forEach(element => {

            let points = ( !element?.answerKey ) ? 0 : element?.points;// might need to change this

            if ( element?._id === formFieldElement?._id && selectedRadioButton && input && input !== "") {

                setStudentsAnswers({...formFieldElement, selected: selectedRadioButton });

                handleSelectorFormFieldAnswers( element, element?.inputValue, input, selectedRadioButton, (subtractPrevCorrectAnsPoints > 0 ) ? subtractPrevCorrectAnsPoints : points );  

            } else {
                     
                let selected = false, answerKey = null, currentField = formFields?.find( field => field?._id === element?._id );

                handleSelectorFormFieldAnswers( { ...element, answerKey, points: 0 }, element?.inputValue, "", selected, points );

            }

          });
       }
   };

   function subtractPointsForPreviouslyCorrectAnswer(radioButtonGroup, radioButtonAnsGroup){
     const currentPoints = radioButtonGroup?.find(rb => rb?.points > 0 )?.points;
     return radioButtonAnsGroup?.find( rd => rd['selected'] === true && rd?.answer === rd?.answerKey ) === undefined ? 0 : currentPoints;
   }