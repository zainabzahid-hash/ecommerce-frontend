import { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Button, Snackbar, Alert, TextField, MenuItem } from '@mui/material'
import { productApi } from '../../api/productApi.js'
import { categoryApi } from '../../api/categoryApi.js'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import ProductTable from './ProductTable.jsx'
import ProductFormDialog from './ProductFormDialog.jsx'

export default function ProductsPage() {
    const [rows, setRows] = useState([])
    const [categories, setCategories] = useState([]) // for the dropdown + category names
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [categoryId, setCategoryId] = useState('') // '' = all categories
    const [loading, setLoading] = useState(false)

    const [formOpen, setFormOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [toast, setToast] = useState(null)

    const notify = (message, severity = 'success') => setToast({ message, severity })

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const [list, cats] = await Promise.all([
                productApi.getAll({ page: page + 1, limit, ...(categoryId && { category_id: categoryId }) }),
                categoryApi.getAll({ page: 1, limit: 100 }),
            ])
            setRows(list.data)
            setTotal(list.meta.total)
            setCategories(cats.data)
        } catch (err) {
            notify(err.message, 'error')
        } finally {
            setLoading(false)
        }
    }, [page, limit, categoryId])

    useEffect(() => { load() }, [load])

    function openCreate() { setEditing(null); setFormOpen(true) }
    function openEdit(product) { setEditing(product); setFormOpen(true) }

    async function handleSave(values) {
        if (editing) {
            await productApi.update(editing.id, values)
            notify('Product updated')
        } else {
            await productApi.create(values)
            notify('Product created')
        }
        setFormOpen(false)
        load()
    }

    async function handleDelete() {
        try {
            await productApi.remove(deleting.id)
            notify('Product deleted')
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
                    <Typography variant="h5">Products</Typography>
                    <Typography color="text.secondary">Add and manage what the shop sells.</Typography>
                </Box>
                <Button variant="contained" onClick={openCreate}>New product</Button>
            </Box>

            <Box sx={{ mb: 2, maxWidth: 320 }}>
                <TextField
                    select
                    label="Filter by category"
                    value={categoryId}
                    onChange={(e) => { setCategoryId(e.target.value); setPage(0) }}
                    helperText={categoryId ? 'Includes products of its sub-categories.' : undefined}
                >
                    <MenuItem value="">All categories</MenuItem>
                    {categories.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                            {'\u00A0\u00A0'.repeat(c.path ? String(c.path).split('.').length - 1 : 0)}{c.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <ProductTable
                emptyText={categoryId ? 'No products in this category.' : undefined}
                rows={rows}
                categories={categories}
                total={total}
                page={page}
                limit={limit}
                loading={loading}
                onPageChange={setPage}
                onLimitChange={(n) => { setLimit(n); setPage(0) }}
                onEdit={openEdit}
                onDelete={setDeleting}
            />

            <ProductFormDialog
                open={formOpen}
                product={editing}
                categories={categories}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
            />

            <ConfirmDialog
                open={Boolean(deleting)}
                title="Delete product?"
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