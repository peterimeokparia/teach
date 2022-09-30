import Swal from 'sweetalert2/dist/sweetalert2.js';
import { v4 as uuidv4 } from 'uuid';  

export async function setLinkedItem( concept, type, addLink, addConcept, lessonConcepts, title ){
    if ( !concept ) {
        Swal.fire({
            title: `Enter key lesson concept`,
            confirmButtonText: 'OK',
            confirmButtonColor: '#c244d8'
        });
    }

    if ( title ) {
        if ( !lessonConcepts?.find( concept => concept?.concept === title ) ) {
            addConcept( title ); 
        }

        const { value: linkTitle } = await Swal.fire({
            input: 'text',
            inputLabel: 'Link Title',
            inputPlaceholder: 'Enter Link Title',
            confirmButtonColor: '#c244d8'
          });
          
          if ( linkTitle  ) {
           Swal.fire({
                title: `Entered link title: ${linkTitle}`,
                confirmButtonText: 'OK',
                confirmButtonColor: '#c244d8'
            });
            const { value: link } = await Swal.fire({
                input: 'url',
                inputLabel: 'URL address',
                inputPlaceholder: 'Enter the URL',
                confirmButtonColor: '#c244d8'
              });  

              if ( link ) {
                Swal.fire({
                    title: `Entered link URL: ${link}`,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#c244d8'
                });

                if ( link ) {
                    const uniqueId = uuidv4();
                    addLink( linkTitle, link, concept, type, uniqueId );
                } 
              }
          }
    }
}