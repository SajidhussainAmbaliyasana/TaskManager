'use client';
import {
  Drawer, Box, Stack, Typography, IconButton, Avatar,
  Chip, Divider, Button, Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { STAGE_CONFIG, PRIORITY_CONFIG, TAG_COLORS } from '@/lib/data';

const STAGE_ORDER = ['todo', 'inprogress', 'done'];

const STAGE_ICONS = {
  todo: <RadioButtonUncheckedIcon sx={{ fontSize: 16 }} />,
  inprogress: <AutorenewIcon sx={{ fontSize: 16 }} />,
  done: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />,
};

function StageButton({ stageKey, current, onClick }) {
  const cfg = STAGE_CONFIG[stageKey];
  const isActive = stageKey === current;

  return (
    <Box
      onClick={() => !isActive && onClick(stageKey)}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.75,
        py: 1.5,
        px: 1,
        borderRadius: '12px',
        border: isActive
          ? `1.5px solid ${cfg.color}60`
          : '1.5px solid transparent',
        backgroundColor: isActive ? cfg.bg : 'rgba(255,255,255,0.03)',
        cursor: isActive ? 'default' : 'pointer',
        transition: 'all 0.18s ease',
        '&:hover': !isActive ? {
          backgroundColor: cfg.bg,
          border: `1.5px solid ${cfg.color}40`,
          transform: 'translateY(-1px)',
        } : {},
      }}
    >
      <Box sx={{ color: isActive ? cfg.color : '#475569', transition: 'color 0.18s' }}>
        {STAGE_ICONS[stageKey]}
      </Box>
      <Typography variant="caption" sx={{
        color: isActive ? cfg.color : '#475569',
        fontWeight: isActive ? 700 : 500,
        fontSize: '0.7rem',
        transition: 'color 0.18s',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {cfg.label}
      </Typography>
      {isActive && (
        <Box sx={{
          width: 4, height: 4, borderRadius: '50%',
          backgroundColor: cfg.color,
          boxShadow: `0 0 6px ${cfg.color}`,
        }} />
      )}
    </Box>
  );
}

export default function TaskDrawer({ task, open, onClose, onStageChange, onEdit, onDelete }) {
  if (!task) return null;

  const stage = STAGE_CONFIG[task.stage];
  const priority = PRIORITY_CONFIG[task.priority];

  const currentIdx = STAGE_ORDER.indexOf(task.stage);
  const nextStage = STAGE_ORDER[currentIdx + 1];
  const nextCfg = nextStage ? STAGE_CONFIG[nextStage] : null;

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: 420 },
          backgroundColor: '#0F172A',
          borderLeft: '1px solid #1E293B',
          backgroundImage: 'none',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <Box sx={{
        px: 3, py: 2.5,
        borderBottom: '1px solid #1E293B',
        backgroundColor: 'rgba(30,41,59,0.5)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 1,
      }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {/* Stage badge */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.75,
              px: 1.5, py: 0.5,
              backgroundColor: stage.bg,
              border: `1px solid ${stage.color}30`,
              borderRadius: '8px',
            }}>
              <Box sx={{ color: stage.color, display: 'flex', alignItems: 'center' }}>
                {STAGE_ICONS[task.stage]}
              </Box>
              <Typography variant="caption" sx={{ color: stage.color, fontWeight: 700, fontSize: '0.7rem' }}>
                {stage.label}
              </Typography>
            </Box>

            {/* Priority badge */}
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: priority.color,
              boxShadow: `0 0 8px ${priority.color}80`,
            }} />
            <Typography variant="caption" sx={{ color: priority.color, fontWeight: 600, fontSize: '0.7rem', textTransform: 'capitalize' }}>
              {task.priority}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Edit task">
              <IconButton
                size="small"
                onClick={() => { onEdit(task); onClose(); }}
                sx={{
                  color: '#475569', borderRadius: '10px',
                  '&:hover': { color: '#6366F1', backgroundColor: 'rgba(99,102,241,0.1)' },
                }}
              >
                <EditOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete task">
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{
                  color: '#475569', borderRadius: '10px',
                  '&:hover': { color: '#EF4444', backgroundColor: 'rgba(239,68,68,0.1)' },
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton
                size="small"
                onClick={onClose}
                sx={{
                  color: '#475569', borderRadius: '10px', ml: 0.5,
                  '&:hover': { color: '#94A3B8', backgroundColor: 'rgba(255,255,255,0.06)' },
                }}
              >
                <CloseIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>

      {/* Scrollable body */}
      <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#1E293B', borderRadius: '4px' } }}>

        {/* Title */}
        <Typography variant="h5" sx={{
          color: '#F8FAFC', fontFamily: '"Syne", sans-serif',
          fontWeight: 700, lineHeight: 1.35, mb: 2, letterSpacing: '-0.3px',
        }}>
          {task.title}
        </Typography>

        {/* Meta row */}
        <Stack direction="row" spacing={2.5} sx={{ mb: 3 }} flexWrap="wrap">
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <Avatar sx={{
              width: 22, height: 22, fontSize: '0.55rem', fontWeight: 700,
              background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
            }}>
              {task.assignee}
            </Avatar>
            <Typography variant="caption" sx={{ color: '#64748B' }}>{task.assignee}</Typography>
          </Stack>

          {task.dueDate && (
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <CalendarTodayOutlinedIcon sx={{ fontSize: 13, color: '#475569' }} />
              <Typography variant="caption" sx={{ color: '#64748B' }}>Due {task.dueDate}</Typography>
            </Stack>
          )}
        </Stack>

        {/* Description */}
        <Box sx={{
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          borderRadius: '14px',
          p: 2.5, mb: 3,
        }}>
          <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.65rem', display: 'block', mb: 1 }}>
            Description
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.75, fontSize: '0.875rem' }}>
            {task.description || 'No description provided.'}
          </Typography>
        </Box>

        {/* Tags */}
        {task.tags?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.65rem', display: 'block', mb: 1.5 }}>
              Tags
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.75}>
              {task.tags.map(tag => {
                const tc = TAG_COLORS[tag] || { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)' };
                return (
                  <Chip key={tag} label={tag} size="small" sx={{
                    backgroundColor: tc.bg, color: tc.color,
                    border: `1px solid ${tc.color}30`,
                    fontSize: '0.68rem', height: 24, fontWeight: 600,
                  }} />
                );
              })}
            </Stack>
          </Box>
        )}

        <Divider sx={{ borderColor: '#1E293B', mb: 3 }} />

        {/* Stage selector */}
        <Box>
          <Typography variant="caption" sx={{
            color: '#475569', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.06em', fontSize: '0.65rem', display: 'block', mb: 1.5,
          }}>
            Move to stage
          </Typography>

          <Stack direction="row" spacing={1}>
            {STAGE_ORDER.map(s => (
              <StageButton
                key={s}
                stageKey={s}
                current={task.stage}
                onClick={onStageChange}
              />
            ))}
          </Stack>

          {/* Quick-advance button */}
          {nextStage && (
            <Button
              fullWidth
              variant="outlined"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              onClick={() => onStageChange(nextStage)}
              sx={{
                mt: 2,
                borderColor: `${nextCfg.color}40`,
                color: nextCfg.color,
                borderRadius: '12px',
                py: 1.25,
                fontWeight: 600,
                fontSize: '0.82rem',
                backgroundColor: nextCfg.bg,
                '&:hover': {
                  backgroundColor: nextCfg.bg,
                  borderColor: nextCfg.color,
                  boxShadow: `0 4px 20px ${nextCfg.color}25`,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.18s ease',
              }}
            >
              Move to {nextCfg.label}
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
