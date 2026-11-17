import { AppBar, Toolbar, Typography, Chip, Box } from '@mui/material'
import Sidebar from './Sidebar.jsx'

// header + sidebar + content area, shared by every admin screen
export default function AdminLayout({ children }) {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Toolbar sx={{ gap: 1.5 }}>
                    <Typography sx={{ font: '700 20px Georgia, serif', color: 'primary.main' }}>Shop</Typography>
                    <Chip size="small" label="Admin" />
                </Toolbar>
            </AppBar>

            <Box sx={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                <Box component="main" sx={{ flex: 1, minWidth: 0, p: { xs: 2, md: 4 } }}>
                    <Box sx={{ maxWidth: 1100, mx: 'auto' }}>{children}</Box>
                </Box>
            </Box>
        </Box>
    )
}