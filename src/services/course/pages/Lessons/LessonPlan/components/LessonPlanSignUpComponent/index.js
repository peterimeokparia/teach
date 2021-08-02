import { 
role } from 'services/course/helpers/PageHelpers';

import Swal from 'sweetalert2';

const LessonPlanSignUpComponent = async ( setUserCredentials ) => { 
  const roleInputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "Tutor" : role.Tutor,
       "Student" : role.Student
      });
    }, 1000);
  });
  
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
       'Yes': 'Yes',
       'No': 'No'
      });
    }, 1000);
  });

  const { value: existingUser } = await Swal.fire({
    title: 'Do you have an account?',
    icon: 'question',
    input: 'radio',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'Do you have an account?';
      }
    }
  });

  if ( existingUser && existingUser === "Yes" ) {
  const { value: email } = await Swal.fire({
    title: 'Enter your email address.',
    input: 'text',
    inputPlaceholder: 'Enter your email address.'
  });
  
    if (email) {
      const { value: password } = await Swal.fire({
        title: 'Enter your password',
        input: 'text',
        inputPlaceholder: 'Enter your password.'
      });
      
      if ( email && password && existingUser ) {
         setUserCredentials({ email, password, existingUser });   
      }
    };
 };

 if ( existingUser && existingUser === "No" ) {
  Swal.fire({
    title: 'Please create an account', 
    icon: 'info', 
    text: `Press Ok to continue` 
  }).then(async response => {
      if ( response?.value ) {
        const { value: userRole } = await Swal.fire({
          title: 'Select your role.',
          input: 'radio',
          inputOptions: roleInputOptions,
          inputValidator: (value) => {
            if (!value) {
              return 'You have not made a selection.';
            }
          }
        });
        
          if (userRole) {
            const { value: email } = await Swal.fire({
              title: 'Enter your email address.',
              input: 'text',
              inputPlaceholder: 'Enter your email address.'
            });
          
            if (email) {
              const { value: password } = await Swal.fire({
                title: 'Enter your password.',
                input: 'text',
                inputPlaceholder: 'Enter your first name.'
              });
      
              if (password){
                const { value: firstName } = await Swal.fire({
                  title: 'Enter your first name.',
                  input: 'text',
                  inputPlaceholder: 'Enter your first name.'
                });
      
                if ( email && password && existingUser && firstName && userRole ) {
                  setUserCredentials({ email, password, existingUser, firstName, userRole  });     
                }
              }      
          }
        }    
      }
  }); }
};

export default LessonPlanSignUpComponent;