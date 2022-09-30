import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default function MeasurableOutcomeResult({header, rate, passFailRate}) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>{ header }</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          {/* 98.3 K */}
          {`${rate} Students`}
          {/* <link>{ 'generate list of students'}</link> */}
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          {`historical average ${passFailRate}`} 
          {/* +18.77% */}
          {/* >historical average */}
          {/* <link>{'histogram'}</link> */}
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          {/* vs. last week */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
