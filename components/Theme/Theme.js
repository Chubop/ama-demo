import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          margin: 0
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'red'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          textTransform: 'capitalize'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    }
  }
});