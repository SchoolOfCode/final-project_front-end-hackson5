import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#EDEEC9',
    },
    secondary: {
      main: '#C1D7C6 ',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
   
    fontFamily: [
      'Inter',
  
      'sans-serif',
         ].join(','),
  },
 
});


export default theme;