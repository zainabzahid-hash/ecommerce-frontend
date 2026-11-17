import { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material'
import { categoryApi } from '../../api/categoryApi.js'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import CategoryTable from './CategoryTable.jsx'
import CategoryFormDialog from './CategoryFormDialog.jsx'

export default function CategoriesPage() {
    const [rows, setRows] = useState([])
    const [parents, setParents] = useState([]) // up to 100 categories for the dropdown + parent names
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0) // MUI pages start at 0, the API starts at 1
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)

    const [formOpen, setFormOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [toast, setToast] = useState(null)

    const notify = (message, severity = 'success') => setToast({ message, severity })

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const [list, all] = await Promise.all([
                categoryApi.getAll({ page: page + 1, limit }),
                categoryApi.getAll({ page: 1, limit: 100 }),
            ])
            setRows(list.data)
            setTotal(list.meta.total)
            setParents(all.data)
        } catch (err) {
            notify(err.message, 'error')
        } finally {
            setLoading(false)
        }
    }, [page, limit])

    useEffect(() => { load() }, [load])

    function openCreate() { setEditing(null); setFormOpen(true) }
    function openEdit(category) { setEditing(category); setFormOpen(true) }

    // throws on failure so the dialog can show the error
    async function handleSave(values) {
        if (editing) {
            await categoryApi.update(editing.id, { name: values.name })
            notify('Category renamed')
        } else {
            await categoryApi.create(values)
            notify('Category created')
        }
        setFormOpen(false)
        load()
    }

    async function handleDelete() {
        try {
            await categoryApi.remove(deleting.id)
            notify('Category deleted')
            // deleted the last row of a page -> go back one page (this reloads by itself)
            if (rows.length === 1 && page > 0) setPage(page - 1)
            else load()
        } catch (err) {
            notify(err.message, 'error')
        } finally {
            setDeleting(null)
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h5">Categories</Typography>
                    <Typography color="text.secondary">Organise the catalogue into a tree of categories.</Typography>
                </Box>
                <Button variant="contained" onClick={openCreate}>New category</Button>
            </Box>

            <CategoryTable
                rows={rows}
                parents={parents}
                total={total}
                page={page}
                limit={limit}
                loading={loading}
                onPageChange={setPage}
                onLimitChange={(n) => { setLimit(n); setPage(0) }}
                onEdit={openEdit}
                onDelete={setDeleting}
            />

            <CategoryFormDialog
                open={formOpen}
                category={editing}
                parents={parents}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={Boolean(deleting)}
                title="Delete category?"
                message={deleting ? `"${deleting.name}" will be removed. This cannot be undone.` : ''}
                onConfirm={handleDelete}
                onClose={() => setDeleting(null)}
            />

            <Snackbar open={Boolean(toast)} autoHideDuration={3500} onClose={() => setToast(null)}>
                {toast ? <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>{toast.message}</Alert> : undefined}
            </Snackbar>
        </>
    )
}