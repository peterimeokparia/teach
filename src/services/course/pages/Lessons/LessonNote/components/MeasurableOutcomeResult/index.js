import * as React from 'react';
import { Box, ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

// const theme = createTheme({
//   palette: {
//     background: {
//       paper: '#fff',
//     },
//     text: {
//       primary: '#173A5E',
//       secondary: '#46505A',
//     },
//     action: {
//       active: '#001E3C',
//     },
//     success: {
//       dark: '#009688',
//     },
//   },
// });


export const shades = {
  primary: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
  },

  secondary: {
    100: "#f7ccd2",
    200: "#ef99a4",
    300: "#e66677",
    400: "#de3349",
    500: "#d6001c",
    600: "#ab0016",
    700: "#800011",
    800: "#56000b",
    900: "#2b0006",
  },
  neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#a6a4a4",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main:shades.primary[500],
    },
    secondary: {
      main: shades.secondary[500],
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  }
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
