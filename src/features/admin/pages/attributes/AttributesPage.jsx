import { useCallback, useEffect, useState } from 'react'
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material'
import { attributeApi } from '../../api/attributeApi.js'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import AttributeTable from './AttributeTable.jsx'
import AttributeFormDialog from './AttributeFormDialog.jsx'
import AttributeValuesDialog from './AttributeValuesDialog.jsx'

export default function AttributesPage() {
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(false)

    const [formOpen, setFormOpen] = useState(false)
    const [editing, setEditing] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [toast, setToast] = useState(null)

    const [valuesId, setValuesId] = useState(null)
    const valuesAttribute = rows.find((r) => r.id === valuesId) ?? null

    const notify = (message, severity = 'success') => setToast({ message, severity })

    // ---------- load ----------
    const load = useCallback(async () => {
        setLoading(true)
        try {
            const list = await attributeApi.getAll({ page: page + 1, limit })
            setRows(list.data)
            setTotal(list.meta.total)
        } catch (err) {
            notify(err.message, 'error')
        } finally {
            setLoading(false)
        }
    }, [page, limit])

    useEffect(() => { load() }, [load])

    // ---------- open dialogs ----------
    function openCreate() { setEditing(null); setFormOpen(true) }
    function openEdit(attribute) { setEditing(attribute); setFormOpen(true) }

    // ---------- save (create or update) ----------
    async function handleSave(values) {
        if (editing) {
            await attributeApi.update(editing.id, values)
            notify('Attribute updated')
        } else {
            await attributeApi.create(values)
            notify('Attribute created')
        }
        setFormOpen(false)
        load()
    }

    // ---------- delete (soft delete) ----------
    async function handleDelete() {
        try {
            await attributeApi.remove(deleting.id)
            notify('Attribute deleted')
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
                    <Typography variant="h5">Attributes</Typography>
                    <Typography color="text.secondary">Things that make variants different, like Colour or Size.</Typography>
                </Box>
                <Button variant="contained" onClick={openCreate}>New attribute</Button>
            </Box>

            <AttributeTable
                rows={rows}
                total={total}
                page={page}
                limit={limit}
                loading={loading}
                onPageChange={setPage}
                onLimitChange={(n) => { setLimit(n); setPage(0) }}
                onValues={(a) => setValuesId(a.id)}
                onEdit={openEdit}
                onDelete={setDeleting}
            />

            <AttributeFormDialog
                open={formOpen}
                attribute={editing}
                onClose={() => setFormOpen(false)}
                onSave={handleSave}
            />
            <AttributeValuesDialog
                open={Boolean(valuesAttribute)}
                attribute={valuesAttribute}
                onClose={() => setValuesId(null)}
                onChanged={load}
            />

            <ConfirmDialog
                open={Boolean(deleting)}
                title="Delete attribute?"
                message={deleting ? `"${deleting.name}" will be hidden from the list.` : ''}
                onConfirm={handleDelete}
                onClose={() => setDeleting(null)}
            />

            <Snackbar open={Boolean(toast)} autoHideDuration={3500} onClose={() => setToast(null)}>
                {toast ? <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>{toast.message}</Alert> : undefined}
            </Snackbar>
        </>
    )
}