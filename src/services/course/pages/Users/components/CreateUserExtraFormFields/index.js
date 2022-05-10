import Swal from 'sweetalert2';

const CreateUserExtraFormFields = async ( userRoleToSet, firstNameToSet ) => { 

  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'Tutor': 'Tutor',
        'Student': 'Student'
      })
    }, 1000)
  })
  
  const { value: role } = await Swal.fire({
    title: 'Select a role',
    input: 'radio',
    confirmButtonColor: '#673ab7',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to choose something!'
      }
    }
  })
  
  if (role) {

    const { value: text } = await Swal.fire({
      title: 'Enter your first name.',
      input: 'text',
      inputPlaceholder: 'Enter your first name.',
      confirmButtonColor: '#673ab7'
    })
    
    if (text) {
       firstNameToSet(text)
       userRoleToSet(role); 
    }
  }
}

export default CreateUserExtraFormFields;