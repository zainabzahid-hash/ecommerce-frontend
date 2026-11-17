import { createTheme } from '@mui/material/styles'

// colours + fonts taken from Shop_prototype.html
export const theme = createTheme({
  palette: {
    primary: { main: '#1f6f5c', light: '#e4f1ec', contrastText: '#ffffff' },
    error: { main: '#a8322d', light: '#f8e1df' },
    warning: { main: '#b4531a', light: '#fbeadd' },
    background: { default: '#f5f6f4', paper: '#ffffff' },
    text: { primary: '#1c2420', secondary: '#66726b' },
    divider: '#dde2de',
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Trebuchet MS","Segoe UI",system-ui,sans-serif',
    fontSize: 14,
    h4: { fontFamily: 'Georgia, serif', fontWeight: 700 },
    h5: { fontFamily: 'Georgia, serif', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
    MuiPaper: { styleOverrides: { outlined: { borderColor: '#dde2de', borderRadius: 12 } } },
    MuiTableCell: {
      styleOverrides: {
        head: { color: '#66726b', fontWeight: 600, fontSize: 13 },
      },
    },
  },
})