import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Button, Chip, Typography, LinearProgress, Box,
} from '@mui/material'

// how deep a category sits, from its ltree path ("1.4.9" -> 2)
const depthOf = (c) => (c.path ? String(c.path).split('.').length - 1 : 0)

export default function CategoryTable({
    rows, parents, total, page, limit, loading,
    onPageChange, onLimitChange, onEdit, onDelete,
}) {
    const nameById = Object.fromEntries(parents.map((p) => [p.id, p.name]))

    return (
        <Paper variant="outlined">
            {loading && <LinearProgress />}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={80}>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Parent</TableCell>
                            <TableCell align="right" width={160}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((c) => (
                            <TableRow key={c.id} hover>
                                <TableCell sx={{ color: 'text.secondary' }}>{c.id}</TableCell>
                                <TableCell sx={{ pl: 2 + depthOf(c) * 3, fontWeight: depthOf(c) ? 400 : 600 }}>
                                    {c.name}
                                </TableCell>
                                <TableCell>
                                    {c.parent_id
                                        ? <Chip size="small" label={nameById[c.parent_id] ?? `#${c.parent_id}`} color="primary" sx={{ bgcolor: 'primary.light', color: 'primary.main' }} />
                                        : <Typography variant="body2" color="text.secondary">Top level</Typography>}
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => onEdit(c)}>Rename</Button>
                                    <Button size="small" color="error" onClick={() => onDelete(c)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!loading && rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Box sx={{ py: 4, textAlign: 'center' }}>
                                        <Typography color="text.secondary">
                                            No categories yet. Create the first one to start building the catalogue.
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