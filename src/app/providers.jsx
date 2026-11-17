import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../theme/theme.js'

export function Providers({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
