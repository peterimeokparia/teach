import { 
useState, 
useEffect } from "react";

import { 
getPreviouslySelectedDropDownAnswer } from "services/course/pages/FormBuilder/FormFields/component/DropDown/helpers";

import Latex from "react-latex";

function useDropDownSelectorHook( props ) {

  let {
    userId,
    formUuId,
    dropDownValues,
    handleFormFieldAnswers,
    studentAnswerByQuestionId,
    saveFormField,
    loadFormFieldAnswers,
    saveFormFieldAnswer,
    formFieldElement,
    formFieldAnswers,
    currentUser,
    previewMode
  } = props;

  const [ input, setInput ] = useState("");
  const [ dropDownOptions,  setDropDownOptions ] = useState([...formFieldElement?.dropDownOptions]);
  const [ inputValue,  setInputValue ] = useState( null );
  const [ mathModalOpen, setMathModalOpen ] = useState(false);

  useEffect(() => {

  if ( previewMode ) {

    setInput( formFieldElement?.inputValue );

  }

  }, [ mathModalOpen ]);

 
  useEffect(() => {

    loadFormFieldAnswers();

    if ( studentAnswerByQuestionId && roleTypeCollection?.length > 0 ) {

      if ( roleTypeCollection?.find( val => val.item === studentAnswerByQuestionId?.answer)?.item ) {

          setInputValue(   { value: studentAnswerByQuestionId?.answer, item: studentAnswerByQuestionId?.answer, label: <Latex>{`$${studentAnswerByQuestionId?.answer}$`}</Latex> } ) ;
      }
        
    }

  }, []);

  useEffect(() => {

    if ( dropDownOptions?.length === dropDownValues?.length ) {

        return;     

    } else if ( dropDownValues?.length > dropDownOptions?.length ) {

      saveFormField({ ...formFieldElement, dropDownOptions: dropDownValues });

    } else {

      saveFormField({ ...formFieldElement, dropDownOptions });

    }

  }, [ dropDownOptions?.length > dropDownValues?.length ]);


  const addOptionValue = () => {
          
    if ( input !== "" ) {

      let dropDownValues = [ ...dropDownOptions, input ];

      setDropDownOptions( dropDownValues );  

      saveFormField({ ...formFieldElement, dropDownOptions: dropDownValues });

    } 
  };

  const deleteOptionValue = () => {
    
    if ( input !== "" ) {

      let dropDownValues = dropDownOptions?.filter( option => option?.id !== inputValue?.id );

      saveFormField({ ...formFieldElement, dropDownOptions: dropDownValues });
    } 
  };

  const handleDropDownSelection = ( value ) => {

    const prevPoints = getPreviouslySelectedDropDownAnswer( studentAnswerByQuestionId, formFieldElement?.questionId, formFieldElement?._id ); 

    if ( !currentUser?._id ) return;

      let points = ( !formFieldElement?.answerKey || value?.value !== formFieldElement?.answerKey ) ? 0 : formFieldElement['points'];

      setInputValue( value  );

      points = prevPoints > 0 ? prevPoints : points;


      handleFormFieldAnswers( formFieldElement, value?.value, points );


    };

let roleTypeCollection = dropDownValues.map(item =>  { return  { value: item, item, label: <Latex>{`$${item}$`}</Latex> } } );
    
return {
  input, 
  inputValue,  
  mathModalOpen, 
  setMathModalOpen,
  setInputValue,
  setInput,
  handleDropDownSelection,
  addOptionValue,
  deleteOptionValue,
  roleTypeCollection
  
}; };

export default useDropDownSelectorHook;