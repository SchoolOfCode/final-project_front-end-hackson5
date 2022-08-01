import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#EDEEC9',
    },
    secondary: {
      main: '#DCF1B3 ',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;