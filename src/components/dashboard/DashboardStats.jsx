'use client';
import { Box, Grid, Typography, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import GridViewIcon from '@mui/icons-material/GridView';

const STAT_META = [
  { label: 'Total Tasks',  key: 'total',      icon: <GridViewIcon />,             color: '#6366F1', bg: 'rgba(99, 102, 241, 0.1)',   border: 'rgba(99, 102, 241, 0.2)',  trend: (v, t) => `${t} tasks total` },
  { label: 'Todo',         key: 'todo',        icon: <RadioButtonUncheckedIcon />, color: '#94A3B8', bg: 'rgba(148, 163, 184, 0.08)', border: 'rgba(148, 163, 184, 0.15)', trend: (v) => `${v} pending` },
  { label: 'In Progress',  key: 'inProgress',  icon: <AutorenewIcon />,            color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)',   border: 'rgba(245, 158, 11, 0.2)',  trend: () => 'Active now' },
  { label: 'Done',         key: 'done',        icon: <CheckCircleOutlineIcon />,   color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)',   border: 'rgba(16, 185, 129, 0.2)',  trend: (v, t) => t > 0 ? `${Math.round((v / t) * 100)}% completion` : '0% completion' },
];

export default function DashboardStats({ tasks }) {
  const total = tasks.length;
  const counts = {
    total,
    todo:       tasks.filter(t => t.stage === 'Todo').length,
    inProgress: tasks.filter(t => t.stage === 'In Progress').length,
    done:       tasks.filter(t => t.stage === 'Done').length,
  };

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {STAT_META.map((stat) => {
        const value = counts[stat.key];
        return (
          <Grid item xs={6} sm={3} key={stat.label}>
            <Box sx={{
              backgroundColor: '#1E293B',
              border: `1px solid ${stat.border}`,
              borderRadius: '20px',
              p: { xs: 2.5, sm: 3 },
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 8px 32px ${stat.bg}` },
            }}>
              <Box sx={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `radial-gradient(circle, ${stat.color}30 0%, transparent 70%)` }} />
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem' }, lineHeight: 1.1, mt: 0.5 }}>
                    {value}
                  </Typography>
                </Box>
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', backgroundColor: stat.bg, border: `1px solid ${stat.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, flexShrink: 0 }}>
                  {stat.icon}
                </Box>
              </Stack>
              <Typography variant="caption" sx={{ color: stat.color, fontWeight: 500, mt: 1.5, display: 'block' }}>
                {stat.trend(value, total)}
              </Typography>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}