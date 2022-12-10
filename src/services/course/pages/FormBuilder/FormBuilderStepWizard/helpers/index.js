import { role } from 'services/course/helpers/PageHelpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import Swal from 'sweetalert2';
import './style.css';

export function handleFormBuilder( formType, formBuilder, formBuilderProps ) {

  if ( isEmptyObject( formBuilder ) ) return;

  if ( isEmptyObject( formBuilderProps ) ) return;
  
  let { addNewFormBuilder, saveFormBuilder, handleExistingFormBuilder, currentUser, existingFormBuilder } = formBuilderProps;

  Swal.fire({
      title: `Existing ${formType} found`,
      icon: 'question',
      iconColor: "#ff5722",
      showConfirmButton: true,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: '#20c997',
      denyButtonColor: '#008000',
      cancelButtonColor: '#FF0000',
      confirmButtonText: `Continue with existing ${formType}`, 
      cancelButtonText: `Delete existing ${formType}`, 
      denyButtonText: `Begin new ${formType}`,
  }).then((result) => {

    if (result.isConfirmed) {
        saveFormBuilder( { ...existingFormBuilder, status: elementMeta.status.InProgress, state: elementMeta.state.Taking } );
      return;
    } else if (result.isDenied) {
        addNewFormBuilder( formBuilder );
      return;
    } else {
        confirmDelete( handleExistingFormBuilder, saveFormBuilder, existingFormBuilder, formType, currentUser );
      return;
    }
  });
}

function confirmDelete( handleDeleteFunc, saveFormBuilderFunc, formBuilder, formType, currentUser ) {
  Swal.fire({
      title: `This action cannot be undone.`, 
      icon: 'info',
      iconColor: "#ff5722",
      showCancelButton: true,
      confirmButtonText: `Delete ${formType}`,
      confirmButtonColor: '#FF0000',
      cancelButtonText: `Cancel`,
      cancelButtonColor: `#d3d3d3`
    }).then( (response) => {
      if ( response?.value && formBuilder ) {    
        if ( currentUser?.role === role.Student ) {
          handleDeleteFunc( formBuilder );
        } 
        return;
      } else {
        return;
      }
    });
}

  