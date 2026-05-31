'use client';
import {
  Dialog, DialogContent, DialogActions,
  Typography, Button, Box, CircularProgress,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useState } from 'react';

export default function DeleteConfirmDialog({ open, task, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);
  if (!task) return null;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(task._id);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
      PaperProps={{ sx: { backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '20px', backgroundImage: 'none' } }}>
      <DialogContent sx={{ pt: 4, pb: 2, px: 3, textAlign: 'center' }}>
        <Box sx={{ width: 52, height: 52, borderRadius: '16px', mx: 'auto', mb: 2.5, backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <WarningAmberRoundedIcon sx={{ color: '#EF4444', fontSize: 26 }} />
        </Box>
        <Typography variant="h6" sx={{ color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 700, mb: 1, letterSpacing: '-0.3px' }}>
          Delete task?
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
          <Box component="span" sx={{ color: '#94A3B8', fontWeight: 600 }}>"{task.title}"</Box>{' '}
          will be permanently removed. This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button fullWidth onClick={onClose} disabled={loading}
          sx={{ color: '#94A3B8', border: '1px solid #334155', borderRadius: '12px', py: 1.2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: '#475569' } }}>
          Cancel
        </Button>
        <Button fullWidth onClick={handleConfirm} disabled={loading}
          sx={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', py: 1.2, fontWeight: 700,
            '&:hover': { backgroundColor: 'rgba(239,68,68,0.25)', borderColor: '#EF4444', boxShadow: '0 4px 20px rgba(239,68,68,0.2)' }, transition: 'all 0.15s' }}>
          {loading ? <CircularProgress size={18} sx={{ color: '#EF4444' }} /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}