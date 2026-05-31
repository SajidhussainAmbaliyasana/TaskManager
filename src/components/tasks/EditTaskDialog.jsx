'use client';
import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack, Typography, Box,
  FormControl, InputLabel, Select, MenuItem, Chip, CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { STAGE_CONFIG, STAGE_ORDER } from '@/lib/data';

const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];

export default function EditTaskDialog({ open, task, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', description: '', stage: 'Todo', priority: 'Medium', tags: [] });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) setForm({ title: task.title, description: task.description, stage: task.stage, priority: task.priority, tags: task.tags || [] });
  }, [task]);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t) && form.tags.length < 4) setForm(p => ({ ...p, tags: [...p.tags, t] }));
    setTagInput('');
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setLoading(true);
    await onSave({ ...task, ...form });
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 700 }}>Edit task</Typography>
        <Typography variant="caption" sx={{ color: '#64748B' }}>Update task details below</Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2.5}>
          <TextField label="Task title" fullWidth value={form.title} onChange={set('title')} InputLabelProps={{ sx: { color: '#64748B' } }} autoFocus />
          <TextField label="Description" fullWidth multiline rows={3} value={form.description} onChange={set('description')} InputLabelProps={{ sx: { color: '#64748B' } }} />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#64748B' }}>Stage</InputLabel>
              <Select value={form.stage} onChange={set('stage')} label="Stage"
                sx={{ borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.04)', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' } }}>
                {STAGE_ORDER.map(val => (
                  <MenuItem key={val} value={val}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: STAGE_CONFIG[val].dotColor }} />
                      <span>{STAGE_CONFIG[val].label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: '#64748B' }}>Priority</InputLabel>
              <Select value={form.priority} onChange={set('priority')} label="Priority"
                sx={{ borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.04)', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' } }}>
                {PRIORITY_OPTIONS.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>

          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <TextField label="Add tag (max 4)" size="small" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTag()} sx={{ flex: 1 }} InputLabelProps={{ sx: { color: '#64748B' } }} />
              <Button variant="outlined" onClick={handleAddTag} sx={{ borderColor: '#334155', color: '#94A3B8', minWidth: 'auto', px: 2, borderRadius: '12px' }}>
                <AddIcon fontSize="small" />
              </Button>
            </Stack>
            {form.tags.length > 0 && (
              <Stack direction="row" flexWrap="wrap" gap={0.75}>
                {form.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" onDelete={() => setForm(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))}
                    sx={{ backgroundColor: 'rgba(99,102,241,0.12)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.2)' }} />
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#64748B', '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!form.title.trim() || loading}>
          {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Save changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}