'use client';
import { useState } from 'react';
import {
  Box, Container, Stack, Typography, Button,
  InputAdornment, TextField, Chip, CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import TaskColumn from '../tasks/TaskColumn';
import CreateTaskDialog from '../tasks/CreateTaskDialog';
import EditTaskDialog from '../tasks/EditTaskDialog';
import DeleteConfirmDialog from '../tasks/DeleteConfirmDialog';
import { PRIORITY_CONFIG } from '@/lib/data';
import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStageMutation,
  useDeleteTaskMutation,
} from '@/redux/api/taskApi';
import toast from 'react-hot-toast';

const STAGES = ['Todo', 'In Progress', 'Done'];
const PRIORITIES = ['all', 'High', 'Medium', 'Low'];

export default function DashboardLayout() {
  const { data, isLoading } = useGetTasksQuery();
  const tasks = data?.tasks || [];

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [updateTaskStage] = useUpdateTaskStageMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [createStage, setCreateStage] = useState('Todo');
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskState, setDeleteTaskState] = useState(null);

  const handleAddTask = (stage) => { setCreateStage(stage); setCreateOpen(true); };

  const handleCreateSave = async (formData) => {
    try {
      await createTask(formData).unwrap();
      toast.success('Task created!');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create task');
    }
  };

  const handleEditSave = async (formData) => {
    try {
      await updateTask({ id: formData._id, ...formData }).unwrap();
      toast.success('Task updated!');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id).unwrap();
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleStageChange = async (taskId, newStage) => {
    try {
      await updateTaskStage({ id: taskId, stage: newStage }).unwrap();
    } catch (err) {
      toast.error('Failed to update stage');
    }
  };

  const filtered = tasks.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getByStage = (stage) => filtered.filter(t => t.stage === stage);

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#6366F1' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0F172A' }}>
      <DashboardHeader />

      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Page header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography variant="h4" sx={{
              color: '#F8FAFC', fontFamily: '"Syne", sans-serif',
              fontWeight: 800, letterSpacing: '-0.5px', mb: 0.5,
            }}>
              My workspace
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              {tasks.length} tasks · {tasks.filter(t => t.stage === 'In Progress').length} in progress · {tasks.filter(t => t.stage === 'Done').length} completed
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleAddTask('Todo')}
            sx={{ whiteSpace: 'nowrap' }}
          >
            New Task
          </Button>
        </Stack>

        {/* Stats */}
        <DashboardStats tasks={tasks} />

        {/* Search + filter bar */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{ mb: 3 }}
        >
          <TextField
            placeholder="Search tasks..."
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{
              maxWidth: { sm: 320 }, flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                '& fieldset': { borderColor: '#334155' },
                '&:hover fieldset': { borderColor: '#475569' },
                '&.Mui-focused fieldset': { borderColor: '#6366F1' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#475569', fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {PRIORITIES.map(p => {
              const isActive = priorityFilter === p;
              const cfg = p !== 'all' ? PRIORITY_CONFIG[p] : null;
              return (
                <Chip
                  key={p}
                  icon={p === 'all' ? <FilterListIcon sx={{ fontSize: '14px !important', color: isActive ? '#818CF8 !important' : '#64748B !important' }} /> : undefined}
                  label={p === 'all' ? 'All tasks' : p}
                  size="small"
                  onClick={() => setPriorityFilter(p)}
                  sx={{
                    cursor: 'pointer', fontWeight: 600,
                    transition: 'all 0.15s ease',
                    backgroundColor: isActive ? (p === 'all' ? 'rgba(99,102,241,0.15)' : cfg.bg) : 'rgba(255,255,255,0.04)',
                    color: isActive ? (p === 'all' ? '#818CF8' : cfg.color) : '#64748B',
                    border: '1px solid',
                    borderColor: isActive ? (p === 'all' ? 'rgba(99,102,241,0.35)' : `${cfg.color}50`) : '#1E293B',
                    '&:hover': {
                      backgroundColor: p === 'all' ? 'rgba(99,102,241,0.12)' : cfg?.bg,
                      borderColor: p === 'all' ? 'rgba(99,102,241,0.3)' : `${cfg?.color}40`,
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Stack>

        {/* Kanban board */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2.5}
          alignItems="flex-start"
          sx={{ pb: 4 }}
        >
          {STAGES.map(stage => (
            <TaskColumn
              key={stage}
              stage={stage}
              tasks={getByStage(stage)}
              onAddTask={handleAddTask}
              onEditTask={(task) => setEditTask(task)}
              onDeleteTask={(task) => setDeleteTaskState(task)}
              onStageChange={handleStageChange}
            />
          ))}
        </Stack>
      </Container>

      <DeleteConfirmDialog
        open={Boolean(deleteTaskState)}
        task={deleteTaskState}
        onClose={() => setDeleteTaskState(null)}
        onConfirm={handleDelete}
      />

      <CreateTaskDialog
        open={createOpen}
        defaultStage={createStage}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreateSave}
      />

      <EditTaskDialog
        open={Boolean(editTask)}
        task={editTask}
        onClose={() => setEditTask(null)}
        onSave={handleEditSave}
      />
    </Box>
  );
}