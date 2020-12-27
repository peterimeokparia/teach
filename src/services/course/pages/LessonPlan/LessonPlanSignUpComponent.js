import Swal from 'sweetalert2';

const LessonPlanSignUpComponent = async ( setUserCredentials ) => { 
  
  const { value: email } = await Swal.fire({
    title: 'Enter your email address.',
    input: 'text',
    inputPlaceholder: 'Enter your email address.'
  })
  
  if (email) {

    const { value: password } = await Swal.fire({
      title: 'Enter your password',
      input: 'text',
      inputPlaceholder: 'Enter your first name.'
    })
    
    if ( email && password ) {
      // Swal.fire(`Entered first name: ${text}`)
      setUserCredentials({ email, password })      
    }
  }


}

export default LessonPlanSignUpComponent;