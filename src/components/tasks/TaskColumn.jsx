'use client';
import { Box, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from './TaskCard';
import { STAGE_CONFIG } from '@/lib/data';

export default function TaskColumn({ stage, tasks, onAddTask, onEditTask, onDeleteTask, onStageChange }) {
  const config = STAGE_CONFIG[stage];

  return (
    <Box sx={{
      flex: 1,
      minWidth: { xs: '100%', sm: 280, md: 0 },
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      borderRadius: '20px',
      overflow: 'hidden',
    }}>
      {/* Column header */}
      <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid #334155', background: 'rgba(255,255,255,0.01)' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: config.dotColor,
              boxShadow: `0 0 10px ${config.dotColor}80`,
            }} />
            <Typography variant="body2" sx={{
              color: '#F8FAFC', fontWeight: 700,
              fontFamily: '"Syne", sans-serif', fontSize: '0.875rem',
            }}>
              {config.label}
            </Typography>
            <Box sx={{
              minWidth: 22, height: 22, borderRadius: '6px',
              backgroundColor: config.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center', px: 0.75,
            }}>
              <Typography variant="caption" sx={{ color: config.color, fontWeight: 700, fontSize: '0.7rem' }}>
                {tasks.length}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title={`Add to ${config.label}`}>
            <IconButton
              size="small"
              onClick={() => onAddTask(stage)}
              sx={{
                color: '#475569', p: 0.5,
                border: '1px solid #334155', borderRadius: '8px',
                '&:hover': { color: config.color, borderColor: config.color, backgroundColor: config.bg },
                transition: 'all 0.2s',
              }}
            >
              <AddIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Task list */}
      <Box sx={{
        flex: 1, p: 2,
        display: 'flex', flexDirection: 'column', gap: 2,
        overflowY: 'auto',
        minHeight: 200,
        maxHeight: { md: 'calc(100vh - 320px)' },
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: '#334155', borderRadius: '4px' },
      }}>
        {tasks.length === 0 ? (
          <Box sx={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            py: 4, textAlign: 'center',
          }}>
            <Box sx={{
              width: 40, height: 40, borderRadius: '12px',
              backgroundColor: config.bg, border: `1px dashed ${config.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2,
            }}>
              <AddIcon sx={{ color: config.color, fontSize: 20, opacity: 0.6 }} />
            </Box>
            <Typography variant="caption" sx={{ color: '#475569' }}>No tasks yet</Typography>
          </Box>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onStageChange={onStageChange}
            />
          ))
        )}
      </Box>
    </Box>
  );
}