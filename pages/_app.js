import { ThemeProvider, createTheme } from '@mui/material';
import '../styles/globals.css'

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: '100%',
          margin: 0
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});

function MyApp({ Component, pageProps }) {
  return(
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )

}

export default MyApp
