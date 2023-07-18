
import { useState, useEffect } from 'react';
import { role } from 'services/course/helpers/PageHelpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';

const useFormTypeSelectorHook = ( outcomeInsights, currentUser ) => {

    if ( outcomeInsights?.length === 0 ) return {};

    if (isEmptyObject(outcomeInsights)) return {}; 

    const formTypeCollection = [ formTypes?.quizzwithpoints, formTypes?.homework, formTypes?.lessoninsights ];
    const formTypeObjectCollection = [ 
      { type: formTypes?.quizzwithpoints, color: '#ccff00'}, 
      { type: formTypes?.homework, color: '#DF00FF'}, 
      { type: formTypes?.lessoninsights, color: '#1F51FF'} 
    ];
    const multiSelectFormTypeCollection = formTypeObjectCollection.map(item => ({ value: item?.type, label: item?.type, color: item?.color }));
    const [ selectedFormType, setSelectedFormType ] = useState(null);
    // const [ selectedMultiSelectFormTypeOptions, setSelectedMultiSelectFormTypeOptions ] = useState( null );
    // const [ selectedFormType, setSelectedFormType ] = useState(formTypes?.lessoninsights);
    const [ selectedMultiSelectFormTypeOptions, setSelectedMultiSelectFormTypeOptions ] = useState( [{ value: formTypes?.lessoninsights,  label: formTypes?.lessoninsights, color: '#1F51FF' }] );
   
    useEffect(() => {}, [ selectedFormType, selectedMultiSelectFormTypeOptions ]);
 
    let copyOutcomeInsights;

    if (currentUser?.role === role.Tutor && selectedFormType ) {
      copyOutcomeInsights = [ ...outcomeInsights?.filter(item => item?.formType === selectedFormType ) ];
    } else {
      copyOutcomeInsights = [ ...outcomeInsights ];
    }
  
    if (currentUser?.role === role.Student && selectedFormType) {
      copyOutcomeInsights = [ ...outcomeInsights?.filter(item => item?.userId === currentUser?._id && item?.formType === selectedFormType )];
    } else {
      copyOutcomeInsights = [ ...outcomeInsights ];
    }

    if ( ( copyOutcomeInsights?.length === 0 )) return {};

    function handleSelectedFormType( evt ) {
      setSelectedFormType( evt?.target?.value );
    }

    function handleMultiSelectFormTypeSelection( options ) {
      if ( options ) {
        setSelectedMultiSelectFormTypeOptions( options );
      }
      
    }

  return {
    formTypeSelectorProp: { handleSelectedFormType, selectedFormType, formTypeCollection, multiSelectFormTypeCollection,
      selectedOutcomeInsights: copyOutcomeInsights, handleMultiSelectFormTypeSelection, selectedMultiSelectFormTypeOptions  } 
  };
};

export default useFormTypeSelectorHook;