import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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

export default function BoxPlotCardLegend({header, rate, title, passFailRate, minWidth=50, width=50, iconColor, avatarText}) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: '#dcdcdc',
          // bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 1,
          minWidth: minWidth,
          width: width
        
        }}
      >
        <Stack direction="row" spacing={2}> <Avatar sx={{ bgcolor: iconColor }}>{avatarText}</Avatar> </Stack>
        <Box sx={{ color: 'text.secondary' }}>{ header }</Box>
        <Box sx={{ color: 'text.primary', fontSize: 24, fontWeight: 'medium' }}>
          {`${title}`}
          {/* <link>{ 'generate list of students'}</link> */}
        </Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          {/* 98.3 K */}
          {`${Math.round(rate)}`}
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
          {/* >historical average */}
          {/* <link>{'histogram'}</link> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
