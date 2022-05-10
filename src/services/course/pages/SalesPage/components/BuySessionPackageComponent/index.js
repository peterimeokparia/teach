import Swal from 'sweetalert2';

const BuySessionPackageComponent = async ( setOptionToSelect ) => {   
  const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'Session': 'Per Session',
        'Package': 'Package'
      });
    }, 1000);
  });
  
  const { value: sessionType } = await Swal.fire({
    title: 'Select a session type',
    input: 'radio',
    confirmButtonColor: '#673ab7',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#673ab7',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to choose session type!';
      };
    }
  });
  
  if ( sessionType ) {
     setOptionToSelect( sessionType ); 
  } 
};

export default BuySessionPackageComponent;