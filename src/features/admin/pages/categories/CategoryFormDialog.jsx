import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Alert, Stack } from '@mui/material'

// category = null  -> create mode
// category = {...} -> edit mode (only the name can change, the path depends on the parent)
export default function CategoryFormDialog({ open, category, parents, onClose, onSave }) {
    const isEdit = Boolean(category)
    const [name, setName] = useState('')
    const [parentId, setParentId] = useState('')
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    // reset the form every time the dialog opens
    useEffect(() => {
        if (open) {
            setName(category?.name ?? '')
            setParentId(category?.parent_id ?? '')
            setError('')
        }
    }, [open, category])

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) {
            setError('Enter a category name.')
            return
        }
        setSaving(true)
        try {
            await onSave({ name: name.trim(), parent_id: parentId === '' ? null : parentId })
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{isEdit ? 'Rename category' : 'New category'}</DialogTitle>
            <DialogContent>
                <form id="category-form" onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            select
                            label="Parent category"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                            disabled={isEdit}
                            helperText={isEdit ? 'The parent cannot be changed here.' : 'Leave empty to create a top-level category.'}
                        >
                            <MenuItem value="">None (top level)</MenuItem>
                            {parents.map((p) => (
                                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="category-form" variant="contained" disabled={saving}>
                    {isEdit ? 'Save changes' : 'Create category'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}