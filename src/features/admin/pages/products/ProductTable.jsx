import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Button, Chip, Typography, LinearProgress, Box,
} from '@mui/material'

export default function ProductTable({
    rows, categories, emptyText, total, page, limit, loading,
    onPageChange, onLimitChange, onEdit, onDelete,
}) {
    const nameById = Object.fromEntries(categories.map((c) => [c.id, c.name]))

    return (
        <Paper variant="outlined">
            {loading && <LinearProgress />}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={80}>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right" width={160}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((p) => (
                            <TableRow key={p.id} hover>
                                <TableCell sx={{ color: 'text.secondary' }}>{p.id}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell>
                                <TableCell>
                                    {p.category_id
                                        ? <Chip size="small" label={nameById[p.category_id] ?? `#${p.category_id}`} sx={{ bgcolor: 'primary.light', color: 'primary.main' }} />
                                        : <Typography variant="body2" color="text.secondary">None</Typography>}
                                </TableCell>
                                <TableCell sx={{ color: 'text.secondary', maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {p.description || '-'}
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => onEdit(p)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => onDelete(p)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Box sx={{ py: 4, textAlign: 'center' }}>
                                        <Typography color="text.secondary">
                                            {emptyText ?? 'No products yet. Add the first one to fill the shop.'}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={total}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
                onPageChange={(_, p) => onPageChange(p)}
                onRowsPerPageChange={(e) => onLimitChange(Number(e.target.value))}
            />
        </Paper>
    )
}