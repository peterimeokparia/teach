import * as React from 'react';
import Stack from '@mui/material/Stack';
 
const options = [
  { title: 'The Shawshank Redemption', collection: [{title: 'a', value: 'a' }, {title: 'b', value: 'b' }, {title: 'c', value: 'c' }] },
  { title: 'The Godfather', collection: [{title: 'd', value: 'd' }, {title: 'e', value: 'e' }, {title: 'f', value: 'f' }] },
  { title: 'The Godfather: Part II', collection: [{title: 'g', value: 'g' }, {title: 'h', value: 'h' }, {title: 'i', value: 'i' }] }
];

export default function RadioButtonComponent({setSelectedItem}) {

      const [ selectedCheckedItem, setSelectedCheckedItem ] = React.useState([]);

      const handleChecked = ( event ) => {
         if ( event?.target?.checked & event?.target?.value !== "" ) {
           setSelectedCheckedItem([ event?.target?.value ])
           setSelectedItem( options?.find( opt => opt?.title === event?.target?.value )?.collection )
         }

         if ( !event?.target?.checked & event?.target?.value !== "" ) {

          let item = selectedCheckedItem?.filter( opt => opt !== event?.target?.value );

          setSelectedCheckedItem( item );

          setSelectedItem( [] );
        }


      };

    return (
      <Stack spacing={2} sx={{ width: 300 }}>
        { options?.map( opt => (
            <> 
              <label>
              {  opt?.title  }
              
              <input
                id="free-solo-demo"
                type={"radio"}
                value={opt?.title}
                onChange={e => handleChecked(e)}
                checked={selectedCheckedItem?.includes( opt?.title )}
              />
              </label>
            </>
          )) 
        }
      </Stack>
    );
  }
