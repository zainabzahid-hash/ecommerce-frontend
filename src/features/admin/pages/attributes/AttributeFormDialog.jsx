import { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert, Stack } from '@mui/material'

// attribute = null -> create mode, attribute = {...} -> edit mode
export default function AttributeFormDialog({ open, attribute, onClose, onSave }) {
    const isEdit = Boolean(attribute)
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (open) {
            setName(attribute?.name ?? '')
            setError('')
        }
    }, [open, attribute])

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return setError('Enter an attribute name.')

        setSaving(true)
        try {
            await onSave({ name: name.trim() })
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{isEdit ? 'Edit attribute' : 'New attribute'}</DialogTitle>
            <DialogContent>
                <form id="attribute-form" onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" form="attribute-form" variant="contained" disabled={saving}>
                    {isEdit ? 'Save changes' : 'Create attribute'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}