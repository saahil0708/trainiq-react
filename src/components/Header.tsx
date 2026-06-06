import React from 'react';
import { Box, Typography, Stack, Avatar, InputBase, useTheme, Badge, IconButton, Divider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { MOCK_STUDENT_DATA } from '../lib/mockData';

export default function Header() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: '24px',
        borderBottom: `1px solid rgba(15, 23, 42, 0.08)`,
        marginBottom: '32px',
      }}
    >
      {/* Greeting section */}
      <Stack spacing={0.5}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: '1.6rem',
            color: '#0f172a',
            fontFamily: '"GT Flexa Lt", sans-serif',
            textTransform: 'none',
          }}
        >
          Hello, {MOCK_STUDENT_DATA.profile.name.split(' ')[0]} 👋
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: 'rgba(15, 23, 42, 0.5)',
              fontWeight: 500,
              fontFamily: '"GT Flexa Lt", sans-serif',
              textTransform: 'none',
            }}
          >
            Have a Good Day
          </Typography>
        </Stack>
      </Stack>

      {/* Search Bar section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          border: `1px solid rgba(15, 23, 42, 0.08)`,
          borderRadius: '100px',
          px: 2,
          py: 0.75,
          width: '100%',
          maxWidth: '360px',
          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.02)}`,
          transition: 'all 0.2s ease-in-out',
          '&:focus-within': {
            border: `1px solid rgba(15, 23, 42, 0.08)`,
            boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.08)}`,
          }
        }}
      >
        <SearchIcon sx={{ color: 'rgba(15, 23, 42, 0.4)', mr: 1, fontSize: '1.2rem' }} />
        <InputBase
          placeholder="Search courses, schedules..."
          sx={{
            flex: 1,
            fontSize: '0.85rem',
            color: '#0f172a',
            fontFamily: '"GT Flexa Lt", sans-serif',
            '& input::placeholder': {
              color: 'rgba(15, 23, 42, 0.4)',
              opacity: 1,
            }
          }}
        />
      </Box>

      {/* Quick Actions & Profile Area */}
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <IconButton
          sx={{
            color: 'rgba(15, 23, 42, 0.65)',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              color: theme.palette.primary.main,
            },
          }}
        >
          <Badge
            badgeContent={2}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: theme.palette.primary.main,
                color: '#ffffff',
                fontSize: '0.7rem',
                height: 18,
                minWidth: 18,
              }
            }}
          >
            <NotificationsNoneIcon sx={{ fontSize: '1.4rem' }} />
          </Badge>
        </IconButton>

        <Divider orientation="vertical" flexItem sx={{ mx: 1.5, borderColor: 'rgba(15, 23, 42, 0.08)', height: '24px', alignSelf: 'center' }} />

        {/* Profile area section */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Avatar
            src={MOCK_STUDENT_DATA.profile.avatarUrl}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              width: 42,
              height: 42,
              fontWeight: 600,
              fontSize: '0.95rem',
              fontFamily: '"GT Flexa Lt", sans-serif',
            }}
          >
            {MOCK_STUDENT_DATA.profile.name.charAt(0)}
          </Avatar>
          <Stack spacing={0.25}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#0f172a',
                fontFamily: '"GT Flexa Lt", sans-serif',
                textTransform: 'none',
              }}
            >
              {MOCK_STUDENT_DATA.profile.name}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: 'rgba(15, 23, 42, 0.5)',
                fontWeight: 500,
                fontFamily: '"GT Flexa Lt", sans-serif',
                textTransform: 'none',
              }}
            >
              {MOCK_STUDENT_DATA.profile.batch}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
