import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function LinearProgressWithLabel() {
  return ( <Box sx={{ width: '100%' } }>
            <LinearProgress />
          </Box>
  );
}

export default function LinearProgressBar( { showBar } ) {
  return ( showBar ) ?  <LinearProgressWithLabel /> : <div></div>;
}

