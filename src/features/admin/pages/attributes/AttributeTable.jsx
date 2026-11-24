import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Button, Typography, LinearProgress, Box, Chip
} from '@mui/material'

export default function AttributeTable({
    rows, total, page, limit, loading,
    onPageChange, onLimitChange, onValues, onEdit, onDelete,
}) {
    return (
        <Paper variant="outlined">
            {loading && <LinearProgress />}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Values</TableCell>
                            <TableCell align="right" width={240}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* ---------- one row per attribute ---------- */}
                        {rows.map((a) => (
                            <TableRow key={a.id} hover>
                                <TableCell sx={{ fontWeight: 600 }}>{a.name}</TableCell>
                                <TableCell>
                                    {a.options.length === 0
                                        ? <Typography variant="body2" color="text.secondary">No values yet</Typography>
                                        : a.options.map((o) => (
                                            <Chip key={o.id} size="small" label={o.value} sx={{ mr: 0.5 }} />
                                        ))}
                                </TableCell>
                                <TableCell align="right">
                                    <Button size="small" onClick={() => onValues(a)}>Values</Button>
                                    <Button size="small" onClick={() => onEdit(a)}>Edit</Button>
                                    <Button size="small" color="error" onClick={() => onDelete(a)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* ---------- empty state (no `a` here, so no row data) ---------- */}
                        {!loading && rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Box sx={{ py: 4, textAlign: 'center' }}>
                                        <Typography color="text.secondary">
                                            No attributes yet. Add one like Color or Size.
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