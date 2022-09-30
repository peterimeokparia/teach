import { useEffect, useState } from 'react';

function useDraggableEditorComponent( loadFormFields, formFields, formFieldElement ){
  const [ formField, setFormField ] = useState(formFieldElement);

  useEffect(() => { loadFormFields() }, [ !formField  ]);

  if ( !formField  ) {

    let field = formFields.find( field => field?._id === formFieldElement?._id );

    if ( field && field?.markDownContent ) {
      setFormField( field );
    }
  }
  return {
    formField
  }
};

export default useDraggableEditorComponent;