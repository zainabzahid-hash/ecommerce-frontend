import { useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Alert, Stack, Chip, Typography,
} from '@mui/material'
import { attributeValueApi } from '../../api/attributeApi.js'

// shows the values of ONE attribute, lets you add and remove them
export default function AttributeValuesDialog({ open, attribute, onClose, onChanged }) {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)

    if (!attribute) return null

    // ---------- add ----------
    async function handleAdd(e) {
        e.preventDefault()
        if (!value.trim()) return setError('Enter a value.')

        setBusy(true)
        try {
            await attributeValueApi.create({ attribute_id: attribute.id, value: value.trim() })
            setValue('')
            setError('')
            await onChanged() // reload the table
        } catch (err) {
            setError(err.message)
        } finally {
            setBusy(false)
        }
    }

    // ---------- remove ----------
    async function handleDelete(id) {
        setBusy(true)
        try {
            await attributeValueApi.remove(id)
            setError('')
            await onChanged()
        } catch (err) {
            setError(err.message)
        } finally {
            setBusy(false)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{attribute.name} values</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    {error && <Alert severity="error">{error}</Alert>}

                    {/* ---------- current values ---------- */}
                    {attribute.options.length === 0
                        ? <Typography color="text.secondary">No values yet.</Typography>
                        : (
                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                {attribute.options.map((o) => (
                                    <Chip key={o.id} label={o.value} onDelete={() => handleDelete(o.id)} disabled={busy} />
                                ))}
                            </Stack>
                        )}

                    {/* ---------- add new value ---------- */}
                    <form onSubmit={handleAdd}>
                        <Stack direction="row" spacing={1}>
                            <TextField size="small" fullWidth label="New value" value={value} onChange={(e) => setValue(e.target.value)} />
                            <Button type="submit" variant="contained" disabled={busy}>Add</Button>
                        </Stack>
                    </form>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose}>Done</Button>
            </DialogActions>
        </Dialog>
    )
}