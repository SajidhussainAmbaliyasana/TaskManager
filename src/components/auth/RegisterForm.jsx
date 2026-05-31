'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    Box, Typography, TextField, Button, Divider, Stack, Paper,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/api/authApi";
import toast from "react-hot-toast";

const PERKS = [
    {
        icon: <RocketLaunchIcon sx={{ fontSize: 18 }} />,
        color: '#6366F1',
        bg: 'rgba(99,102,241,0.12)',
        title: 'Up and running in 60 seconds',
        desc: 'No setup, no config — your board is ready the moment you sign up.',
    },
    {
        icon: <PeopleAltOutlinedIcon sx={{ fontSize: 18 }} />,
        color: '#22D3EE',
        bg: 'rgba(34,211,238,0.12)',
        title: 'Invite your whole team free',
        desc: 'Unlimited collaborators on every plan. No per-seat surprises.',
    },
    {
        icon: <ShieldOutlinedIcon sx={{ fontSize: 18 }} />,
        color: '#10B981',
        bg: 'rgba(16,185,129,0.12)',
        title: 'Enterprise-grade security',
        desc: 'SOC 2 Type II certified. Your data is encrypted at rest and in transit.',
    },
];

const TESTIMONIALS = [
    { name: 'Priya M.', role: 'Engineering Lead', text: 'TaskFlow replaced three tools for us. Everything just clicks.' },
    { name: 'James K.', role: 'Founder, Draftbit', text: 'Our sprint velocity jumped 40% in the first month.' },
];

function AvatarStack() {
    const colors = [
        'linear-gradient(135deg,#6366F1,#4F46E5)',
        'linear-gradient(135deg,#22D3EE,#0891B2)',
        'linear-gradient(135deg,#10B981,#059669)',
        'linear-gradient(135deg,#F59E0B,#D97706)',
    ];
    const initials = ['AS', 'RK', 'MJ', 'TD'];
    return (
        <Stack direction="row" alignItems="center" spacing={0}>
            {initials.map((i, idx) => (
                <Box key={i} sx={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: colors[idx],
                    border: '2px solid #0F172A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem', fontWeight: 700, color: '#fff',
                    ml: idx === 0 ? 0 : -1,
                    zIndex: 4 - idx,
                }}>{i}</Box>
            ))}
        </Stack>
    );
}

export default function RegisterForm() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const router = useRouter();

    const [register, { isLoading }] = useRegisterMutation();
    const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
    const passwordMismatch = form.confirm.length > 0 && form.password !== form.confirm;

    const handleRegister = async () => {
        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.password.trim() ||
            !form.confirm.trim()
        ) {
            toast.error("All fields are required");
            return;
        }

        if (form.password !== form.confirm) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await register({
                name: form.name,
                email: form.email,
                password: form.password,
            }).unwrap();

            if (response.success) {
                toast.success("Account created successfully");

                router.push("/dashboard");
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: '#0F172A',
            overflow: 'hidden',
        }}>
            {/* ── Left: Form Panel ── */}
            <Box sx={{
                width: { xs: '100%', md: '500px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 3, sm: 5 },
                position: 'relative',
                borderRight: { md: '1px solid #1E293B' },
                background: 'radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.1) 0%, transparent 55%), #0F172A',
                flexShrink: 0,
            }}>
                {/* Subtle grid */}
                <Box sx={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    pointerEvents: 'none',
                }} />

                <Box sx={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
                    {/* Logo */}
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 5 }}>
                        <Box sx={{
                            width: 40, height: 40, borderRadius: '12px',
                            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(99,102,241,0.45)',
                        }}>
                            <AutoAwesomeIcon sx={{ color: '#fff', fontSize: 20 }} />
                        </Box>
                        <Typography variant="h5" sx={{ color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 800, letterSpacing: '-0.3px' }}>
                            TaskFlow
                        </Typography>
                    </Stack>

                    <Typography variant="h4" sx={{
                        color: '#F8FAFC', fontWeight: 800, mb: 1,
                        fontFamily: '"Syne", sans-serif', letterSpacing: '-0.5px',
                    }}>
                        Create your account
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', mb: 4, lineHeight: 1.6 }}>
                        Join 24,000+ teams already shipping faster with TaskFlow.
                    </Typography>

                    <Stack spacing={2.5}>
                        <TextField
                            label="Full name"
                            fullWidth
                            value={form.name}
                            onChange={set('name')}
                            placeholder="Aryan Sharma"
                            InputLabelProps={{ sx: { color: '#64748B' } }}
                        />
                        <TextField
                            label="Work email"
                            type="email"
                            fullWidth
                            value={form.email}
                            onChange={set('email')}
                            placeholder="aryan@company.io"
                            InputLabelProps={{ sx: { color: '#64748B' } }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={form.password}
                            onChange={set('password')}
                            InputLabelProps={{ sx: { color: '#64748B' } }}
                        />
                        <TextField
                            label="Confirm password"
                            type="password"
                            fullWidth
                            value={form.confirm}
                            onChange={set('confirm')}
                            InputLabelProps={{ sx: { color: '#64748B' } }}
                            error={passwordMismatch}
                            helperText={passwordMismatch ? "Passwords don't match" : ''}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleRegister}
                            disabled={isLoading}
                            sx={{ py: 1.5, fontSize: '1rem', mt: 0.5 }}
                        >
                            {isLoading
                                ? "Creating Account..."
                                : "Get started for free"}
                        </Button>
                    </Stack>

                    <Typography variant="caption" sx={{
                        color: '#475569', display: 'block',
                        textAlign: 'center', mt: 2.5, lineHeight: 1.7,
                    }}>
                        By signing up you agree to our{' '}
                        <Box component="span" sx={{ color: '#6366F1', cursor: 'pointer', '&:hover': { color: '#818CF8' } }}>Terms</Box>
                        {' '}and{' '}
                        <Box component="span" sx={{ color: '#6366F1', cursor: 'pointer', '&:hover': { color: '#818CF8' } }}>Privacy Policy</Box>
                    </Typography>

                    <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#1E293B' } }}>
                        <Typography variant="caption" sx={{ color: '#334155', px: 1 }}>Have an account?</Typography>
                    </Divider>

                    <Button
                        variant="outlined"
                        fullWidth
                        component={Link}
                        href="/login"
                        sx={{
                            borderColor: '#334155', color: '#94A3B8', py: 1.25,
                            '&:hover': { borderColor: '#6366F1', color: '#818CF8', backgroundColor: 'rgba(99,102,241,0.06)' },
                        }}
                    >
                        Sign in instead
                    </Button>
                </Box>
            </Box>

            {/* ── Right: Branding Panel ── */}
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 6,
                position: 'relative',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse at 70% 40%, rgba(99,102,241,0.16) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(34,211,238,0.1) 0%, transparent 50%), #0F172A',
            }}>
                {/* Grid */}
                <Box sx={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    zIndex: 0,
                }} />

                {/* Glow orbs */}
                <Box sx={{ position: 'absolute', top: '15%', right: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0 }} />
                <Box sx={{ position: 'absolute', bottom: '20%', left: '5%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

                {/* Top — headline */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 1,
                        px: 2, py: 0.75, borderRadius: '20px',
                        backgroundColor: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.2)',
                        mb: 3,
                    }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                        <Typography variant="caption" sx={{ color: '#818CF8', fontWeight: 600, letterSpacing: '0.05em' }}>
                            FREE FOREVER ON PERSONAL PLAN
                        </Typography>
                    </Box>

                    <Typography variant="h2" sx={{
                        color: '#F8FAFC', fontFamily: '"Syne", sans-serif', fontWeight: 800,
                        fontSize: { md: '2.6rem', lg: '3.2rem' }, lineHeight: 1.15,
                        letterSpacing: '-1px', mb: 3,
                    }}>
                        Everything your<br />
                        team needs to{' '}
                        <Box component="span" sx={{
                            background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            ship.
                        </Box>
                    </Typography>

                    {/* Perks list */}
                    <Stack spacing={2.5}>
                        {PERKS.map((p, i) => (
                            <Stack key={i} direction="row" alignItems="flex-start" spacing={2}>
                                <Box sx={{
                                    width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                                    backgroundColor: p.bg,
                                    border: `1px solid ${p.color}25`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: p.color,
                                }}>
                                    {p.icon}
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, mb: 0.3 }}>
                                        {p.title}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                                        {p.desc}
                                    </Typography>
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </Box>

                {/* Middle — testimonials */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Stack spacing={2}>
                        {TESTIMONIALS.map((t, i) => (
                            <Paper key={i} elevation={0} sx={{
                                backgroundColor: 'rgba(30,41,59,0.7)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(99,102,241,0.15)',
                                borderRadius: '16px',
                                p: 2.5,
                            }}>
                                {/* Stars */}
                                <Stack direction="row" spacing={0.3} sx={{ mb: 1.5 }}>
                                    {[...Array(5)].map((_, s) => (
                                        <Box key={s} component="span" sx={{ color: '#F59E0B', fontSize: '0.75rem' }}>★</Box>
                                    ))}
                                </Stack>
                                {/* <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.65, mb: 2, fontStyle: 'italic', fontSize: '0.825rem' }}>
                                    "{t.text}"
                                </Typography> */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#94A3B8',
                                        lineHeight: 1.65,
                                        mb: 2,
                                        fontStyle: 'italic',
                                        fontSize: '0.825rem'
                                    }}
                                >
                                    &ldquo;{t.text}&rdquo;
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <Box sx={{
                                        width: 30, height: 30, borderRadius: '50%',
                                        background: i === 0
                                            ? 'linear-gradient(135deg,#6366F1,#22D3EE)'
                                            : 'linear-gradient(135deg,#10B981,#059669)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.6rem', fontWeight: 700, color: '#fff',
                                    }}>
                                        {t.name.split(' ').map(n => n[0]).join('')}
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ color: '#F8FAFC', fontWeight: 700, display: 'block', lineHeight: 1.2 }}>{t.name}</Typography>
                                        <Typography variant="caption" sx={{ color: '#475569', fontSize: '0.68rem' }}>{t.role}</Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Box>

                {/* Bottom — social proof */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <AvatarStack />
                        <Box>
                            <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, lineHeight: 1.3 }}>
                                Join 24,000+ teams
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.75}>
                                <CheckCircleOutlineIcon sx={{ fontSize: 13, color: '#10B981' }} />
                                <Typography variant="caption" sx={{ color: '#64748B' }}>
                                    No credit card required
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}