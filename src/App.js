import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Pages from './pages/Pages';

const myTheme = createTheme({
  palette: {
    primary: {
      main: blue[400]
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <BrowserRouter>
          <Pages />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
