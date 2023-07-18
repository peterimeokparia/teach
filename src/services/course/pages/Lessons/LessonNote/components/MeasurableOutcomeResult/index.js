import * as React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

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

export default function MeasurableOutcomeResult({ header, rate, title, passFailRate, minWidth=250, width=250, iconColor, avatarText}) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: minWidth,
          width: width
        }}
      >
        <Stack direction="row" spacing={2}> <Avatar sx={{ bgcolor: iconColor }}>{avatarText}</Avatar> </Stack>
        <Box sx={{ color: 'text.secondary' }}>{ header }</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
          {`${rate} ${title}`}
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
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
