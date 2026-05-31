'use client';
import {
  Box, Typography, Stack, Chip, IconButton, Avatar, Tooltip,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { STAGE_CONFIG, STAGE_ORDER, PRIORITY_CONFIG, TAG_COLORS } from '@/lib/data';

export default function TaskCard({ task, onEdit, onDelete, onStageChange }) {
  const stage = STAGE_CONFIG[task.stage] || STAGE_CONFIG['Todo'];
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG['Medium'];
  const currentIdx = STAGE_ORDER.indexOf(task.stage);
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < STAGE_ORDER.length - 1;

  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };

  return (
    <Box sx={{
      backgroundColor: '#0F172A',
      border: '1px solid #1E293B',
      borderRadius: '16px',
      p: 2.5,
      position: 'relative',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: '#334155',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        '&::before': { opacity: 1 },
      },
      '&::before': {
        content: '""', position: 'absolute',
        left: 0, top: 0, bottom: 0, width: '3px',
        backgroundColor: stage.color, opacity: 0.6,
        borderRadius: '3px 0 0 3px', transition: 'opacity 0.2s',
      },
    }}>
      {/* Priority dot */}
      <Box sx={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', backgroundColor: priority.color, boxShadow: `0 0 8px ${priority.color}80` }} />

      {/* Title */}
      <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 1, lineHeight: 1.5, pr: 4, fontSize: '0.875rem' }}>
        {task.title}
      </Typography>

      {/* Description */}
      <Typography variant="caption" sx={{ color: '#64748B', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 2, fontSize: '0.775rem' }}>
        {task.description}
      </Typography>

      {/* Tags */}
      {task.tags?.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mb: 2.5 }}>
          {task.tags.map(tag => {
            const tc = TAG_COLORS[tag] || { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)' };
            return (
              <Chip key={tag} label={tag} size="small" sx={{ backgroundColor: tc.bg, color: tc.color, border: `1px solid ${tc.color}30`, fontSize: '0.65rem', height: 22, fontWeight: 600 }} />
            );
          })}
        </Stack>
      )}

      {/* Action bar — always visible */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2, pt: 1.75, borderTop: '1px solid #1E293B' }}>
        {/* Stage navigation */}
        <Stack direction="row" spacing={0.5}>
          <Tooltip title={hasPrev ? `Move to ${STAGE_ORDER[currentIdx - 1]}` : 'Already at first stage'}>
            <span>
              <IconButton size="small" disabled={!hasPrev}
                onClick={stop(() => onStageChange(task._id, STAGE_ORDER[currentIdx - 1]))}
                sx={{ p: 0.75, borderRadius: '8px', border: '1px solid', borderColor: hasPrev ? '#334155' : '#1E293B', color: hasPrev ? '#94A3B8' : '#2D3748',
                  '&:hover': hasPrev ? { borderColor: '#6366F1', color: '#818CF8', backgroundColor: 'rgba(99,102,241,0.1)' } : {},
                  transition: 'all 0.15s' }}>
                <ArrowBackIosNewIcon sx={{ fontSize: 11 }} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={hasNext ? `Move to ${STAGE_ORDER[currentIdx + 1]}` : 'Already at final stage'}>
            <span>
              <IconButton size="small" disabled={!hasNext}
                onClick={stop(() => onStageChange(task._id, STAGE_ORDER[currentIdx + 1]))}
                sx={{ p: 0.75, borderRadius: '8px', border: '1px solid', borderColor: hasNext ? '#334155' : '#1E293B', color: hasNext ? '#94A3B8' : '#2D3748',
                  '&:hover': hasNext ? { borderColor: '#10B981', color: '#10B981', backgroundColor: 'rgba(16,185,129,0.1)' } : {},
                  transition: 'all 0.15s' }}>
                <ArrowForwardIosIcon sx={{ fontSize: 11 }} />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        {/* Edit + Delete */}
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit task">
            <IconButton size="small" onClick={stop(() => onEdit(task))}
              sx={{ p: 0.75, borderRadius: '8px', border: '1px solid #334155', color: '#94A3B8',
                '&:hover': { borderColor: '#6366F1', color: '#818CF8', backgroundColor: 'rgba(99,102,241,0.1)' }, transition: 'all 0.15s' }}>
              <EditOutlinedIcon sx={{ fontSize: 13 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete task">
            <IconButton size="small" onClick={stop(() => onDelete(task))}
              sx={{ p: 0.75, borderRadius: '8px', border: '1px solid #334155', color: '#94A3B8',
                '&:hover': { borderColor: '#EF4444', color: '#EF4444', backgroundColor: 'rgba(239,68,68,0.1)' }, transition: 'all 0.15s' }}>
              <DeleteOutlineIcon sx={{ fontSize: 13 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
}