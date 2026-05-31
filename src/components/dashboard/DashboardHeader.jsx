'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    Box, Stack, Typography, Avatar,
    Menu, MenuItem, Divider,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from "next/navigation";
import { useLogoutMutation, useMeQuery } from "@/redux/api/authApi";
import toast from "react-hot-toast";

export default function DashboardHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    const { data } = useMeQuery();

    const user = data?.user;
    const [logout] = useLogoutMutation();
    const handleLogout = async () => {
        try {
            await logout().unwrap();

            toast.success("Logged out successfully");

            router.push("/login");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    return (
        <Box sx={{
            position: 'sticky', top: 0, zIndex: 100,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid #1E293B',
            px: { xs: 2, sm: 4 }, py: 1.5,
        }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                {/* Logo */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{
                        width: 36, height: 36, borderRadius: '10px',
                        background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                    }}>
                        <AutoAwesomeIcon sx={{ color: '#fff', fontSize: 18 }} />
                    </Box>
                    <Typography variant="h6" sx={{
                        color: '#F8FAFC', fontFamily: '"Syne", sans-serif',
                        fontWeight: 800, letterSpacing: '-0.3px', display: { xs: 'none', sm: 'block' }
                    }}>
                        TaskFlow
                    </Typography>
                </Stack>

                {/* Right actions */}
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Box
                        onClick={e => setAnchorEl(e.currentTarget)}
                        sx={{
                            display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer',
                            px: 1.5, py: 0.75, borderRadius: '12px',
                            '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                            transition: 'background 0.2s',
                        }}
                    >
                        <Avatar sx={{
                            width: 32, height: 32, fontSize: '0.75rem', fontWeight: 700,
                            background: 'linear-gradient(135deg, #6366F1, #22D3EE)',
                        }}>

                            {user?.name?.charAt(0)?.toUpperCase()}

                        </Avatar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600, lineHeight: 1.2 }}>{user?.name}</Typography>
                            <Typography variant="caption" sx={{ color: '#64748B' }}>{user?.email}</Typography>
                        </Box>
                        <KeyboardArrowDownIcon sx={{ color: '#64748B', fontSize: 16 }} />
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        PaperProps={{ sx: { mt: 1, minWidth: 200 } }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography variant="body2" sx={{ color: '#F8FAFC', fontWeight: 600 }}>{user?.name}</Typography>
                            <Typography variant="caption" sx={{ color: '#64748B' }}>{user?.email}</Typography>
                        </Box>
                        <Divider sx={{ borderColor: '#334155' }} />
                        <MenuItem sx={{ color: '#94A3B8', gap: 1.5, py: 1.25, '&:hover': { color: '#F8FAFC', backgroundColor: 'rgba(99,102,241,0.08)' } }}>
                            <PersonOutlineIcon fontSize="small" /> Profile
                        </MenuItem>
                        <MenuItem sx={{ color: '#94A3B8', gap: 1.5, py: 1.25, '&:hover': { color: '#F8FAFC', backgroundColor: 'rgba(99,102,241,0.08)' } }}>
                            <SettingsOutlinedIcon fontSize="small" /> Settings
                        </MenuItem>
                        <Divider sx={{ borderColor: '#334155' }} />
                        <MenuItem
                            // component={Link} href="/login"
                            // sx={{ color: '#EF4444', gap: 1.5, py: 1.25, '&:hover': { backgroundColor: 'rgba(239,68,68,0.08)' } }}
                            onClick={handleLogout}
                            sx={{
                                color: '#EF4444',
                                gap: 1.5,
                                py: 1.25,
                                '&:hover': {
                                    backgroundColor: 'rgba(239,68,68,0.08)'
                                }
                            }}
                        >
                            <LogoutIcon fontSize="small" /> Sign out
                        </MenuItem>
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    );
}