import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Alert, Stack } from '@mui/material'

// product = null  -> create mode, product = {...} -> edit mode
export default function ProductFormDialog({ open, product, categories, onClose, onSave }) {
    const isEdit = Boolean(product)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (open) {
            setName(product?.name ?? '')
            setDescription(product?.description ?? '')
            setCategoryId(product?.category_id ?? '')
            setError('')
        }
    }, [open, product])

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return setError('Enter a product name.')
        if (categoryId === '') return setError('Choose a category.')

        setSaving(true)
        try {
            await onSave({ name: name.trim(), description: description.trim(), category_id: categoryId })
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{isEdit ? 'Edit product' : 'New product'}</DialogTitle>
            <DialogContent>
                <form id="product-form" onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            minRows={3}
                        />
                        <TextField select label="Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            {categories.map((c) => (
                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="product-form" variant="contained" disabled={saving}>
                    {isEdit ? 'Save changes' : 'Create product'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}