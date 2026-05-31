'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box, Grid, Typography, TextField, Button, Checkbox,
  FormControlLabel, Divider, Stack, Paper,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/authApi";
import toast from "react-hot-toast";

const FEATURES = [
  { icon: <TrendingUpIcon />, title: 'Visual Kanban boards', desc: 'Track progress across every stage at a glance' },
  { icon: <GroupsIcon />, title: 'Team collaboration', desc: 'Assign tasks and sync with your entire org' },
  { icon: <FlashOnIcon />, title: 'Lightning fast', desc: 'Built for speed — zero loading, instant updates' },
];

function FloatingCard({ sx, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'rgba(30, 41, 59, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '16px',
        p: 2,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

export default function LoginForm() {
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    //event.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Email and password are required");
      return;
    }
    try {
      const response = await login({
        email: form.email,
        password: form.password,
      }).unwrap();

      if (response.success) {
        toast.success("Login successful");

        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', backgroundColor: '#0F172A', overflow: 'hidden' }}>
      {/* Left Branding Panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 30% 50%, rgba(99, 102, 241, 0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 50%), #0F172A',
        }}
      >
        {/* Grid pattern */}
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          zIndex: 0,
        }} />

        {/* Glow orbs */}
        <Box sx={{ position: 'absolute', top: '20%', left: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: '25%', right: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

        {/* Logo */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{
              width: 40, height: 40, borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
            }}>
              <AutoAwesomeIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 800, letterSpacing: '-0.5px' }}>
              TaskFlow
            </Typography>
          </Stack>
        </Box>

        {/* Center Hero Text */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{
            color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 800,
            fontSize: { md: '2.8rem', lg: '3.5rem' }, lineHeight: 1.15,
            mb: 3, letterSpacing: '-1px',
          }}>
            Ship faster.<br />
            <Box component="span" sx={{
              background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Stay aligned.
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: 400, mb: 5, lineHeight: 1.7 }}>
            TaskFlow gives your team the clarity and velocity to build what matters — together.
          </Typography>

          {/* Feature list */}
          <Stack spacing={3}>
            {FEATURES.map((f, i) => (
              <Stack key={i} direction="row" alignItems="flex-start" spacing={2}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#818CF8',
                }}>
                  {f.icon}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 0.3 }}>{f.title}</Typography>
                  <Typography variant="caption" sx={{ color: '#64748B', lineHeight: 1.5 }}>{f.desc}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Floating stat cards */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" spacing={2}>
            <FloatingCard>
              <Typography variant="h5" sx={{ color: '#6366F1', fontWeight: 800, fontFamily: '"Syne", sans-serif' }}>24k+</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>Active teams</Typography>
            </FloatingCard>
            <FloatingCard>
              <Typography variant="h5" sx={{ color: '#22D3EE', fontWeight: 800, fontFamily: '"Syne", sans-serif' }}>1.2M</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>Tasks shipped</Typography>
            </FloatingCard>
            <FloatingCard>
              <Typography variant="h5" sx={{ color: '#10B981', fontWeight: 800, fontFamily: '"Syne", sans-serif' }}>99.9%</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>Uptime SLA</Typography>
            </FloatingCard>
          </Stack>
        </Box>
      </Box>

      {/* Right Auth Panel */}
      <Box sx={{
        width: { xs: '100%', md: '480px' },
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        p: { xs: 3, sm: 5 },
        position: 'relative',
        borderLeft: { md: '1px solid #1E293B' },
        background: 'radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.08) 0%, transparent 50%), #0F172A',
      }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          {/* Mobile logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 5 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AutoAwesomeIcon sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 800 }}>TaskFlow</Typography>
          </Box>

          <Typography variant="h4" sx={{ color: '#F8FAFC', fontWeight: 800, mb: 1, fontFamily: '"Syne", sans-serif', letterSpacing: '-0.5px' }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 4 }}>
            Sign in to your workspace to continue
          </Typography>

          <Stack spacing={2.5}>
            <TextField
              label="Email address"
              type="email"
              fullWidth
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              InputLabelProps={{ sx: { color: '#64748B' } }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              InputLabelProps={{ sx: { color: '#64748B' } }}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={e => setRemember(e.target.checked)}
                    icon={<CheckBoxOutlineBlankIcon sx={{ color: '#334155' }} />}
                    checkedIcon={<CheckBoxIcon sx={{ color: '#6366F1' }} />}
                    size="small"
                  />
                }
                label={<Typography variant="body2" sx={{ color: '#94A3B8' }}>Remember me</Typography>}
              />
              <Typography
                component={Link} href="#"
                variant="body2"
                sx={{ color: '#6366F1', textDecoration: 'none', fontWeight: 600, '&:hover': { color: '#818CF8' } }}
              >
                Forgot password?
              </Typography>
            </Stack>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleLogin}
              disabled={isLoading}
              sx={{ py: 1.5, fontSize: "1rem" }}
            >
              {isLoading
                ? "Signing In..."
                : "Sign in to TaskFlow"}
            </Button>

            <Divider sx={{ '&::before, &::after': { borderColor: '#1E293B' } }}>
              <Typography variant="caption" sx={{ color: '#475569', px: 1 }}>New to TaskFlow?</Typography>
            </Divider>

            <Button
              variant="outlined"
              fullWidth
              component={Link}
              href="/register"
              sx={{
                borderColor: '#334155', color: '#94A3B8', py: 1.5,
                '&:hover': { borderColor: '#6366F1', color: '#6366F1', backgroundColor: 'rgba(99,102,241,0.06)' },
              }}
            >
              Create a free account
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
