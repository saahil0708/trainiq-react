import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Typography, Stack, Avatar, Paper, Button, Chip, useTheme, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// MUI Date Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// -------------------------------------------------------------
// 1. TODAY'S CLASS SCHEDULE WIDGET
// -------------------------------------------------------------
function ScheduleWidget({ theme }: { theme: any }) {
  const schedule = [
    {
      time: '09:00 AM - 10:30 AM',
      title: 'React UI Components & State Management',
      trainer: 'John Doe',
      room: 'Room 101',
      status: 'Completed',
    },
    {
      time: '11:00 AM - 12:30 PM',
      title: 'Next.js App Router Layouts & Rendering',
      trainer: 'Jane Smith',
      room: 'Zoom Meeting',
      status: 'Live Now',
    },
    {
      time: '02:00 PM - 03:30 PM',
      title: 'Database Schema Design & SQL Queries',
      trainer: 'Alan Turing',
      room: 'Zoom Meeting',
      status: 'Upcoming',
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? schedule.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === schedule.length - 1 ? 0 : prev + 1));
  };

  const item = schedule[activeIndex];
  if (!item) return null;
  const isLive = item.status === 'Live Now';
  const isCompleted = item.status === 'Completed';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: '20px',
        border: '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        backgroundColor: '#ffffff',
        height: '240px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
          Today's Schedule
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '0.78rem', color: '#CA0019', fontWeight: 700, fontFamily: '"GT Flexa Lt", sans-serif', mr: 0.5 }}>
            Showing {activeIndex + 1} / {schedule.length} lectures
          </Typography>
          <IconButton
            size="small"
            onClick={handlePrev}
            sx={{
              color: '#CA0019',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              p: 0.25,
              '&:hover': { backgroundColor: 'rgba(15, 23, 42, 0.04)' }
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleNext}
            sx={{
              color: '#CA0019',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              p: 0.25,
              '&:hover': { backgroundColor: 'rgba(15, 23, 42, 0.04)' }
            }}
          >
            <ChevronRightIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Stack>
      </Box>

      <Box
        sx={{
          width: '100%',
          p: 2,
          borderRadius: '16px',
          border: `1px solid ${isLive ? '#10b981' : 'rgba(15, 23, 42, 0.08)'}`,
          background: isLive
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(16, 185, 129, 0.01) 100%)'
            : isCompleted
              ? 'linear-gradient(135deg, rgba(255, 107, 118, 0.1) 0%, rgba(255, 255, 255, 0.6) 60%, #ffffff 100%)'
              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, rgba(255,255,255,0.5) 100%)`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexGrow: 1,
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        <Box sx={{ flexGrow: 1, pr: { sm: 2 } }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.25 }}>
            <AccessTimeIcon sx={{ fontSize: '0.8rem', color: isLive ? '#10b981' : 'rgba(15, 23, 42, 0.4)' }} />
            <Typography sx={{ fontSize: '0.72rem', color: isLive ? '#10b981' : 'rgba(15, 23, 42, 0.5)', fontWeight: 600, fontFamily: '"GT Flexa Lt", sans-serif' }}>
              {item.time}
            </Typography>
            <Chip
              size="small"
              label={item.status}
              sx={{
                fontSize: '0.62rem',
                height: 18,
                fontWeight: 800,
                ml: 'auto',
                fontFamily: '"GT Flexa Lt", sans-serif',
                backgroundColor: isLive
                  ? '#10b981'
                  : isCompleted
                    ? 'rgba(15, 23, 42, 0.05)'
                    : alpha(theme.palette.primary.main, 0.1),
                color: isLive
                  ? '#ffffff'
                  : isCompleted
                    ? 'rgba(15, 23, 42, 0.5)'
                    : theme.palette.primary.main,
                animation: isLive ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)' },
                  '70%': { boxShadow: '0 0 0 6px rgba(16, 185, 129, 0)' },
                  '100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)' }
                }
              }}
            />
          </Stack>
          <Typography sx={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif', mb: 1.25, lineHeight: 1.3 }}>
            {item.title}
          </Typography>

          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <PersonIcon sx={{ fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignSelf: 'center' }} />
              <Typography sx={{ fontSize: '0.7rem', color: 'rgba(15, 23, 42, 0.5)', fontWeight: 500, fontFamily: '"GT Flexa Lt", sans-serif', lineHeight: 1 }}>
                {item.trainer}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <LocationOnIcon sx={{ fontSize: '0.85rem', color: theme.palette.primary.main, display: 'flex', alignSelf: 'center' }} />
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: theme.palette.primary.main, fontFamily: '"GT Flexa Lt", sans-serif', lineHeight: 1 }}>
                {item.room}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ mt: { xs: 2, sm: 0 }, minWidth: { sm: '120px' }, display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
          {isLive ? (
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: '"GT Flexa Lt", sans-serif',
                borderRadius: '3.5px',
                px: 2.5,
                py: 0.75,
                '&:hover': { backgroundColor: '#059669' },
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)',
              }}
            >
              Join Zoom
            </Button>
          ) : isCompleted ? (
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'rgba(15, 23, 42, 0.15)',
                color: 'rgba(15, 23, 42, 0.6)',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: '"GT Flexa Lt", sans-serif',
                borderRadius: '3.5px',
                px: 2.5,
                py: 0.75,
                '&:hover': {
                  backgroundColor: 'rgba(15, 23, 42, 0.02)',
                  borderColor: 'rgba(15, 23, 42, 0.3)',
                }
              }}
            >
              Watch Recording
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'none',
                fontFamily: '"GT Flexa Lt", sans-serif',
                borderRadius: '3.5px',
                px: 2.5,
                py: 0.75,
                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.04) }
              }}
            >
              Set Reminder
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

// -------------------------------------------------------------
// 2. PROGRESS LINE CHART
// -------------------------------------------------------------
function ProgressChartWidget() {
  const data = [
    { name: 'August', score: 10 },
    { name: 'September', score: 28 },
    { name: 'October', score: 26 },
    { name: 'November', score: 12 },
    { name: 'December', score: 32 },
    { name: 'January', score: 48 },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        height: '280px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
            Progress
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#ff6b76', fontWeight: 700, fontFamily: '"GT Flexa Lt", sans-serif' }}>
            • C++
          </Typography>
        </Stack>
        <Button size="small" variant="text" sx={{ fontSize: '0.75rem', color: 'rgba(15, 23, 42, 0.4)', textTransform: 'none', fontWeight: 600, fontFamily: '"GT Flexa Lt", sans-serif' }}>
          see all
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6b76" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#ff6b76" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 118, 0.08)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(15, 23, 42, 0.4)" fontSize={9} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(15, 23, 42, 0.4)" fontSize={9} tickLine={false} axisLine={false} domain={[0, 50]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontFamily: '"GT Flexa Lt", sans-serif',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
              }}
            />
            <Area type="monotone" dataKey="score" stroke="#ff6b76" strokeWidth={3} fillOpacity={1} fill="url(#chartGradient)" dot={{ stroke: '#ff6b76', strokeWidth: 2, r: 4, fill: '#ffffff' }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

// -------------------------------------------------------------
// 3. RATING WIDGET
// -------------------------------------------------------------
function RatingWidget() {
  const theme = useTheme();
  const data = [
    { score: 5 }, { score: 12 }, { score: 8 }, { score: 20 }, { score: 15 }, { score: 24 },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        height: '180px',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #9a0010 100%)`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        '&:hover': { boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)' }
      }}
    >
      <Box sx={{ zIndex: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', fontFamily: '"GT Flexa Lt", sans-serif' }}>
            Rating
          </Typography>
          <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600, fontFamily: '"GT Flexa Lt", sans-serif' }}>
            last week
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline', mt: 1 }}>
          <Typography sx={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: '"GT Flexa Lt", sans-serif', lineHeight: 1 }}>
            8.5
          </Typography>
          <Stack direction="row" spacing={0.25} sx={{ alignItems: 'center', color: '#4ade80' }}>
            <TrendingUpIcon sx={{ fontSize: '0.85rem' }} />
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: '"GT Flexa Lt", sans-serif' }}>
              +15%
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ position: 'absolute', bottom: -5, left: -10, right: -10, height: 75, zIndex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="score" stroke="#ffffff" strokeWidth={3} fill="url(#ratingGradient)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

// -------------------------------------------------------------
// 4. HOMEWORK PROGRESS WIDGET
// -------------------------------------------------------------
function HomeworkWidget() {
  const hw = { title: 'C++ Programming', done: 30, total: 55, color: '#64748b', subtitle: 'Algorithms & OOP' };
  const ratio = Math.min((hw.done / hw.total) * 100, 100);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        height: '180px',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
          Homework Progress
        </Typography>
        <Button size="small" variant="text" sx={{ fontSize: '0.75rem', color: 'rgba(15, 23, 42, 0.4)', textTransform: 'none', fontWeight: 600, fontFamily: '"GT Flexa Lt", sans-serif' }}>
          see all
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper elevation={0} sx={{ p: 1.75, borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.01)', border: '1px solid rgba(15, 23, 42, 0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif', mb: 0.5 }}>
              {hw.title}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: 'rgba(15, 23, 42, 0.4)', fontWeight: 500, fontFamily: '"GT Flexa Lt", sans-serif', mb: 1.25 }}>
              {hw.subtitle}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#ca0019', fontFamily: '"GT Flexa Lt", sans-serif' }}>
              {hw.total - hw.done} tasks left
            </Typography>
          </Box>

          {/* Circular Progress Ring */}
          <Box sx={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
            <svg width="60" height="60" viewBox="0 0 36 36">
              {/* Background circle */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(15, 23, 42, 0.04)"
                strokeWidth="3.2"
              />
              {/* Progress circle */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ca0019"
                strokeWidth="3.2"
                strokeDasharray={`${ratio}, 100`}
                strokeLinecap="round"
              />
              {/* Fraction inside */}
              <text x="18" y="20.5" fontFamily='"GT Flexa Lt", sans-serif' fontSize="6.5" fontWeight="800" textAnchor="middle" fill="#ca0019">
                {hw.done}/{hw.total}
              </text>
            </svg>
          </Box>
        </Paper>
      </Box>
    </Paper>
  );
}

// -------------------------------------------------------------
// 4b. WEEKLY ATTENDANCE WIDGET
// -------------------------------------------------------------
function AttendanceWidget() {
  const attendance = [
    { day: 'Mon', pct: 100 },
    { day: 'Tue', pct: 100 },
    { day: 'Wed', pct: 80  },
    { day: 'Thu', pct: 100 },
    { day: 'Fri', pct: 60  },
  ];
  const weekAvg = Math.round(attendance.reduce((s, d) => s + d.pct, 0) / attendance.length);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        background: 'linear-gradient(145deg, rgba(255, 107, 118, 0.18) 0%, rgba(255, 214, 218, 0.08) 40%, rgba(255, 255, 255, 0.85) 100%)',
        height: '180px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
            Attendance
          </Typography>
          <Typography sx={{ fontSize: '0.7rem', color: 'rgba(15, 23, 42, 0.4)', fontWeight: 500, fontFamily: '"GT Flexa Lt", sans-serif' }}>
            This week
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.25 }}>
          <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: '#CA0019', fontFamily: '"GT Flexa Lt", sans-serif', lineHeight: 1 }}>
            {weekAvg}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff6b76', fontFamily: '"GT Flexa Lt", sans-serif' }}>
            %
          </Typography>
        </Box>
      </Box>

      {/* Day pill bars — filled from bottom */}
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexGrow: 1 }}>
        {attendance.map((d, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '5px',
              height: '100%',
              justifyContent: 'flex-end',
              position: 'relative',
              '&:hover .att-tooltip': { opacity: 1, transform: 'translateY(0)' },
            }}
          >
            {/* Hover tooltip */}
            <Box
              className="att-tooltip"
              sx={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%) translateY(4px)',
                backgroundColor: '#CA0019',
                color: '#fff',
                fontSize: '0.58rem',
                fontWeight: 800,
                fontFamily: '"GT Flexa Lt", sans-serif',
                px: 0.75,
                py: 0.25,
                borderRadius: '5px',
                whiteSpace: 'nowrap',
                opacity: 0,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                zIndex: 10,
                pointerEvents: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderWidth: '4px',
                  borderStyle: 'solid',
                  borderColor: '#CA0019 transparent transparent transparent',
                },
              }}
            >
              {d.pct}%
            </Box>

            {/* Fixed-height container (grey pill) */}
            <Box
              sx={{
                width: '85%',
                height: '80px',
                borderRadius: '9999px',
                background: 'linear-gradient(180deg, rgba(255,214,218,0.18) 0%, rgba(255,107,118,0.1) 100%)',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {/* Filled portion from bottom */}
              {d.pct > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${d.pct}%`,
                    background: d.pct === 100
                      ? 'linear-gradient(180deg, #ff6b76 0%, #CA0019 100%)'
                      : `linear-gradient(180deg, rgba(255, 107, 118, 0.75) 0%, rgba(202, 0, 25, 0.75) 100%)`,
                    borderRadius: '9999px',
                    transition: 'height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: '0 -2px 8px rgba(202,0,25,0.2)',
                  }}
                />
              )}
            </Box>

            <Typography sx={{ fontSize: '0.58rem', fontWeight: 700, color: d.pct === 0 ? 'rgba(15,23,42,0.25)' : '#CA0019', fontFamily: '"GT Flexa Lt", sans-serif', lineHeight: 1 }}>
              {d.day}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// -------------------------------------------------------------
// 5. CALENDAR WIDGET
// -------------------------------------------------------------
function CalendarWidget() {
  const theme = useTheme();
  const [value, setValue] = useState<Dayjs | null>(dayjs());

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: '20px',
        border: 'none',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #CA0019 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        fontFamily: '"GT Flexa Lt", sans-serif',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          views={['day']}
          slotProps={{
            day: {
              sx: {
                color: '#fff',
                fontFamily: '"GT Flexa Lt", sans-serif',
                '&.MuiPickersDay-today': {
                  backgroundColor: '#ffffff !important',
                  color: `${theme.palette.primary.main} !important`,
                  border: 'none !important',
                  fontWeight: 700,
                },
                '&.Mui-selected': {
                  backgroundColor: '#ffffff !important',
                  color: `${theme.palette.primary.main} !important`,
                  fontWeight: 700,
                  '&:hover': { backgroundColor: '#f5f5f5 !important' },
                },
                '&.Mui-selected.MuiPickersDay-today': {
                  backgroundColor: '#ffffff !important',
                  color: `${theme.palette.primary.main} !important`,
                  border: 'none !important',
                },
              },
            },
          }}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: 'none',
            '& .MuiPickersCalendarHeader-root': {
              paddingLeft: '12px',
              paddingRight: '12px',
              marginTop: '4px',
              marginBottom: '12px',
            },
            '& .MuiPickersCalendarHeader-label': {
              color: '#fff',
              fontWeight: 700,
              fontFamily: '"GT Flexa Lt", sans-serif',
              fontSize: '0.9rem',
            },
            '& .MuiPickersCalendarHeader-switchViewButton': { color: '#fff' },
            '& .MuiPickersArrowSwitcher-button': { color: '#fff' },
            '& .MuiDayCalendar-weekDayLabel': {
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              fontFamily: '"GT Flexa Lt", sans-serif',
            },
            '& .MuiDayCalendar-header': {
              marginTop: '16px',
              marginBottom: '12px',
            },
            '& .MuiPickersSlideTransition-root': {
              minHeight: '220px',
              marginTop: '8px',
            },
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}

// -------------------------------------------------------------
// 6. TEACHERS LIST WIDGET
// -------------------------------------------------------------
function TeachersWidget() {
  const teachers = [
    { name: 'Olga Potapova', subject: 'C++', initials: 'OP' },
    { name: 'Roman Kim', subject: 'Robotech', initials: 'RK' },
    { name: 'John Dorosh', subject: 'Physics', initials: 'JD' },
    { name: 'Irina Voloka', subject: 'C++', initials: 'IV' },
    { name: 'Alex Malash', subject: 'It', initials: 'AM' },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        border: '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        background: 'linear-gradient(225deg, rgba(255, 107, 118, 0.1) 0%, rgba(255, 255, 255, 0.6) 60%, #ffffff 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
          Trainers
        </Typography>
        <Button size="small" variant="text" sx={{ fontSize: '0.75rem', color: 'rgba(15, 23, 42, 0.4)', textTransform: 'none', fontWeight: 600, fontFamily: '"GT Flexa Lt", sans-serif' }}>
          see all
        </Button>
      </Box>

      <Stack spacing={1.5} sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {teachers.map((t, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: 'rgba(255, 107, 118, 0.1)',
                  color: '#CA0019',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  width: 34,
                  height: 34,
                  fontFamily: '"GT Flexa Lt", sans-serif',
                }}
              >
                {t.initials}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
                  {t.name}
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: 'rgba(15, 23, 42, 0.4)', fontWeight: 500, fontFamily: '"GT Flexa Lt", sans-serif' }}>
                  {t.subject}
                </Typography>
              </Box>
            </Stack>
            <IconButton size="small" sx={{ color: 'rgba(255, 107, 118, 0.65)' }}>
              <EmailIcon sx={{ fontSize: '1.1rem' }} />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

// -------------------------------------------------------------
// MAIN DASHBOARD
// -------------------------------------------------------------
export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      <Grid container spacing={3}>

        {/* LEFT SECTION */}
        <Grid size={{ xs: 12, md: 8.75 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 12 }}>
              <ScheduleWidget theme={theme} />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <ProgressChartWidget />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <RatingWidget />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <HomeworkWidget />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AttendanceWidget />
            </Grid>
          </Grid>
        </Grid>

        {/* RIGHT SECTION */}
        <Grid size={{ xs: 12, md: 3.25 }}>
          <Stack spacing={3}>
            <CalendarWidget />
            <TeachersWidget />
          </Stack>
        </Grid>

      </Grid>
    </Box>
  );
}
