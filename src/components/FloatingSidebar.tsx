import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Stack, Typography, Divider } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'My Courses', icon: <MenuBookIcon /> },
  { label: 'Schedule', icon: <CalendarMonthIcon /> },
  { label: 'Profile', icon: <PersonIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

export default function FloatingSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        background: '#ffffff',
        height: '100vh',
        width: isExpanded ? 210 : 80,
        justifyContent: 'space-between',
        borderRadius: 0,
        padding: '32px 0',
        borderRight: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.02)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            color: 'rgba(15, 23, 42, 0.75)',
            alignSelf: isExpanded ? 'flex-end' : 'center',
            mr: isExpanded ? '16px' : 0,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
            },
            transition: 'all 0.2s ease-in-out',
            width: 48,
            height: 48,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)', my: 1, width: '100%' }} />

        <Stack spacing={1} sx={{ mt: 2, width: '100%' }}>
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <Tooltip key={item.label} title={!isExpanded ? item.label : ''} placement="right" arrow>
                <Box
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isActive ? '#ca0019' : 'rgba(15, 23, 42, 0.65)',
                    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                    borderRadius: '0 24px 24px 0',
                    cursor: 'pointer',
                    pl: '28px',
                    pr: '16px',
                    py: '12px',
                    ml: 0,
                    mr: '12px',
                    width: 'calc(100% - 12px)',
                    height: 48,
                    justifyContent: 'flex-start',
                    '&:hover': {
                      backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.22) : alpha(theme.palette.primary.main, 0.08),
                      color: isActive ? '#ca0019' : theme.palette.primary.main,
                    },
                    transition: 'all 0.25s ease-in-out',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </Box>
                  {isExpanded && (
                    <Typography sx={{ ml: 2, fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: '"GT Flexa Lt", sans-serif' }}>
                      {item.label}
                    </Typography>
                  )}
                </Box>
              </Tooltip>
            );
          })}
        </Stack>
      </Stack>

      <Stack spacing={2} sx={{ alignItems: 'stretch', width: '100%' }}>
        <Divider sx={{ borderColor: 'rgba(15, 23, 42, 0.08)', mb: 2, width: '100%' }} />

        <Tooltip title={!isExpanded ? "Logout" : ""} placement="right" arrow>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'rgba(15, 23, 42, 0.65)',
              borderRadius: '0 24px 24px 0',
              pl: '28px',
              pr: '16px',
              py: '12px',
              ml: 0,
              mr: '12px',
              width: 'calc(100% - 12px)',
              height: 48,
              cursor: 'pointer',
              justifyContent: 'flex-start',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
              },
              transition: 'all 0.25s ease-in-out',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogoutIcon />
            </Box>
            {isExpanded && (
              <Typography sx={{ ml: 2, fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: '"GT Flexa Lt", sans-serif' }}>
                Logout
              </Typography>
            )}
          </Box>
        </Tooltip>
      </Stack>
    </Box>
  );
}
