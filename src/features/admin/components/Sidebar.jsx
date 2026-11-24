import { Box, List, ListItemButton, ListItemText } from '@mui/material'

// add a line here for every new admin screen
const items = [
    { label: 'Categories', href: '/admin' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Attributes', href: '/admin/attributes' },
]

export default function Sidebar() {
    const current = window.location.pathname.replace(/\/$/, '') || '/'

    return (
        <Box
            component="nav"
            aria-label="Admin"
            sx={{
                width: 220,
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
                bgcolor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
                p: 1.5,
            }}
        >
            <List disablePadding>
                {items.map((item) => (
                    <ListItemButton
                        key={item.href}
                        component="a"
                        href={item.href}
                        selected={current === item.href}
                        sx={{ borderRadius: 2, '&.Mui-selected': { bgcolor: 'primary.light', color: 'primary.main' } }}
                    >
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}