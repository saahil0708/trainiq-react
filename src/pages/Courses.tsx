import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Tabs,
  Tab,
  Button,
  Avatar,
  Chip,
  Drawer,
  IconButton,
  Divider,
  List,
  useTheme,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


// Premium Course Interface
interface Module {
  title: string;
  duration: string;
  completed: boolean;
  isLocked?: boolean;
}

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: {
    name: string;
    avatarUrl?: string;
    role: string;
  };
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  gradient: string;
  accentColor: string;
  description: string;
  modules: Module[];
}

const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced React UI & Design Systems',
    category: 'Frontend',
    instructor: { name: 'John Doe', role: 'Lead Frontend Architect' },
    progress: 72,
    totalLessons: 28,
    completedLessons: 20,
    duration: '14 hrs 30 mins',
    gradient: 'linear-gradient(135deg, #FF5E62 0%, #FF9966 100%)',
    accentColor: '#FF5E62',
    description: 'Master component patterns, styling solutions, design systems at scale, and high-performance React application structures.',
    modules: [
      { title: 'Introduction to React & Rendering Cycle', duration: '45 mins', completed: true },
      { title: 'Component Architecture & Advanced Composition', duration: '1 hr 15 mins', completed: true },
      { title: 'Custom Hooks & Advanced State Management', duration: '2 hrs', completed: true },
      { title: 'Building a custom MUI Design System', duration: '3 hrs', completed: true },
      { title: 'Framer Motion & Micro-animations', duration: '2 hrs 30 mins', completed: false },
      { title: 'Performance Audits & Rendering Profiling', duration: '5 hrs', completed: false, isLocked: true },
    ]
  },
  {
    id: 'course-2',
    title: 'Next.js 15 Full-Stack Architecture',
    category: 'Full-Stack',
    instructor: { name: 'Jane Smith', role: 'Staff Software Engineer' },
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    duration: '18 hrs 15 mins',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    accentColor: '#11998e',
    description: 'Build robust web apps using Next.js App Router, Server Actions, API routes, middleware, and database integrations.',
    modules: [
      { title: 'Routing with App Router & Nested Layouts', duration: '1 hr 30 mins', completed: true },
      { title: 'Server Components vs Client Components', duration: '2 hrs', completed: true },
      { title: 'Data Fetching, Caching & Revalidation', duration: '2 hrs 45 mins', completed: true },
      { title: 'Server Actions & Form Handling', duration: '3 hrs', completed: false },
      { title: 'DB Integration with Prisma & PostgreSQL', duration: '4 hrs 30 mins', completed: false, isLocked: true },
      { title: 'Caching Strategies & CDN Optimizations', duration: '4 hrs', completed: false, isLocked: true },
    ]
  },
  {
    id: 'course-3',
    title: 'High-Performance Node.js & Databases',
    category: 'Backend',
    instructor: { name: 'Alan Turing', role: 'System Architect' },
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    duration: '10 hrs 45 mins',
    gradient: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
    accentColor: '#4e54c8',
    description: 'Deep dive into event loop internals, clustering, load balancing, relational schemas, Redis caching, and index query optimization.',
    modules: [
      { title: 'Node.js Event Loop & Non-Blocking I/O', duration: '1 hr 15 mins', completed: true },
      { title: 'RESTful API Patterns & Express Best Practices', duration: '2 hrs', completed: true },
      { title: 'Relational Database Design & SQL Optimization', duration: '3 hrs 15 mins', completed: true },
      { title: 'Redis Cache Layering & Rate Limiting', duration: '2 hrs', completed: true },
      { title: 'Testing & CI/CD Deployment pipelines', duration: '2 hrs 15 mins', completed: true },
    ]
  },
  {
    id: 'course-4',
    title: 'UI/UX & Figma for Engineers',
    category: 'Design',
    instructor: { name: 'Olga Potapova', role: 'Product Designer' },
    progress: 10,
    totalLessons: 18,
    completedLessons: 2,
    duration: '8 hrs 20 mins',
    gradient: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
    accentColor: '#FC466B',
    description: 'Learn design fundamentals, grids, colors, typography, wireframing, and auto-layouts in Figma specifically tailored for developers.',
    modules: [
      { title: 'Design Principles & Spatial Grids', duration: '1 hr', completed: true },
      { title: 'Figma Basics: Frames, Shapes, Auto Layout', duration: '2 hrs 30 mins', completed: false },
      { title: 'Color Theory & Modern Typography Systems', duration: '1 hr 45 mins', completed: false },
      { title: 'Component States & Interactive Prototypes', duration: '3 hrs 05 mins', completed: false, isLocked: true },
    ]
  }
];

export default function Courses() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  // Tab count indicators
  const totalAll = MOCK_COURSES.length;
  const totalInProgress = MOCK_COURSES.filter(c => c.progress > 0 && c.progress < 100).length;
  const totalCompleted = MOCK_COURSES.filter(c => c.progress === 100).length;

  // Filter Logic
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 0) return matchesSearch; // All
    if (activeTab === 1) return matchesSearch && course.progress > 0 && course.progress < 100; // In Progress
    if (activeTab === 2) return matchesSearch && course.progress === 100; // Completed
    return matchesSearch;
  });

  // Handle page out of bounds dynamically during filtering
  const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);
  const currentPage = page > totalPages ? Math.max(1, totalPages) : page;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      {/* Page Header with Vertical Bar */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 4 }}>
        <Box sx={{ width: 4, height: 28, backgroundColor: theme.palette.primary.main, borderRadius: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
          My Courses
        </Typography>
      </Stack>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          mb: 4
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, val) => {
            setActiveTab(val);
            setPage(1); // Reset page on tab change
          }}
          sx={{
            minHeight: '44px',
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: '3px',
              borderRadius: '3px',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'rgba(15, 23, 42, 0.5)',
              minHeight: '44px',
              paddingX: '20px',
              fontFamily: '"GT Flexa Lt", sans-serif',
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              }
            }
          }}
        >
          <Tab 
            label={
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <span>All Courses</span>
                <Chip 
                  label={totalAll} 
                  size="small" 
                  sx={{ 
                    height: 18, 
                    fontSize: '0.62rem', 
                    fontWeight: 800,
                    backgroundColor: activeTab === 0 ? alpha(theme.palette.primary.main, 0.1) : 'rgba(15, 23, 42, 0.05)',
                    color: activeTab === 0 ? theme.palette.primary.main : 'rgba(15, 23, 42, 0.45)',
                    transition: 'all 0.2s ease',
                  }} 
                />
              </Stack>
            } 
          />
          <Tab 
            label={
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <span>In Progress</span>
                <Chip 
                  label={totalInProgress} 
                  size="small" 
                  sx={{ 
                    height: 18, 
                    fontSize: '0.62rem', 
                    fontWeight: 800,
                    backgroundColor: activeTab === 1 ? alpha(theme.palette.primary.main, 0.1) : 'rgba(15, 23, 42, 0.05)',
                    color: activeTab === 1 ? theme.palette.primary.main : 'rgba(15, 23, 42, 0.45)',
                    transition: 'all 0.2s ease',
                  }} 
                />
              </Stack>
            } 
          />
          <Tab 
            label={
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <span>Completed</span>
                <Chip 
                  label={totalCompleted} 
                  size="small" 
                  sx={{ 
                    height: 18, 
                    fontSize: '0.62rem', 
                    fontWeight: 800,
                    backgroundColor: activeTab === 2 ? alpha(theme.palette.primary.main, 0.1) : 'rgba(15, 23, 42, 0.05)',
                    color: activeTab === 2 ? theme.palette.primary.main : 'rgba(15, 23, 42, 0.45)',
                    transition: 'all 0.2s ease',
                  }} 
                />
              </Stack>
            } 
          />
        </Tabs>

        <OutlinedInput
          size="small"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1); // Reset page on search
          }}
          placeholder="Search courses..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'rgba(15, 23, 42, 0.35)', fontSize: '1.1rem' }} />
            </InputAdornment>
          }
          sx={{
            width: { xs: '100%', md: 260 },
            height: '40px',
            borderRadius: '9999px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            fontSize: '0.82rem',
            fontFamily: '"GT Flexa Lt", sans-serif',
            fontWeight: 600,
            color: '#0f172a',
            transition: 'all 0.2s ease',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover': {
              border: '1px solid rgba(15, 23, 42, 0.15)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            },
            '&.Mui-focused': {
              border: `1px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
            }
          }}
        />
      </Stack>

      {/* 3. COURSE TABLE */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: '24px',
          border: '1px solid rgba(15, 23, 42, 0.06)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.02)',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ borderBottom: '1px solid rgba(15, 23, 42, 0.08)', backgroundColor: 'rgba(15, 23, 42, 0.015)' }}>
              <TableCell sx={{ py: 2.5, px: 3, fontWeight: 800, fontSize: '0.72rem', color: 'rgba(15, 23, 42, 0.45)', fontFamily: '"GT Flexa Lt", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Course
              </TableCell>
              <TableCell sx={{ py: 2.5, px: 3, fontWeight: 800, fontSize: '0.72rem', color: 'rgba(15, 23, 42, 0.45)', fontFamily: '"GT Flexa Lt", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Category
              </TableCell>
              <TableCell sx={{ py: 2.5, px: 3, fontWeight: 800, fontSize: '0.72rem', color: 'rgba(15, 23, 42, 0.45)', fontFamily: '"GT Flexa Lt", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Trainer
              </TableCell>
              <TableCell align="right" sx={{ py: 2.5, px: 3, fontWeight: 800, fontSize: '0.72rem', color: 'rgba(15, 23, 42, 0.45)', fontFamily: '"GT Flexa Lt", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <Typography sx={{ fontSize: '0.85rem', color: 'rgba(15, 23, 42, 0.4)', fontWeight: 700, fontFamily: '"GT Flexa Lt", sans-serif' }}>
                    No courses found matching your query
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCourses.map((course) => {
                const isFinished = course.progress === 100;
                return (
                  <TableRow
                    key={course.id}
                    hover
                    onClick={() => setSelectedCourse(course)}
                    sx={{
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(202, 0, 25, 0.015) !important',
                      },
                      '&:last-child td, &:last-child th': { border: 0 },
                      borderBottom: '1px solid rgba(15, 23, 42, 0.05)',
                    }}
                  >
                    {/* Course Column */}
                    <TableCell sx={{ py: 2.5, px: 3 }}>
                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            background: course.gradient,
                            borderRadius: '9999px',
                            boxShadow: `0 2px 8px ${alpha(course.accentColor, 0.15)}`,
                            flexShrink: 0,
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            }
                          }}
                        />
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.9rem',
                            color: '#0f172a',
                            fontFamily: '"GT Flexa Lt", sans-serif',
                            lineHeight: 1.3,
                          }}
                        >
                          {course.title}
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* Category Column */}
                    <TableCell sx={{ py: 2.5, px: 3 }}>
                      <Typography
                        sx={{
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: 'rgba(15, 23, 42, 0.55)',
                          fontFamily: '"GT Flexa Lt", sans-serif',
                        }}
                      >
                        {course.category}
                      </Typography>
                    </TableCell>

                    {/* Trainer Column */}
                    <TableCell sx={{ py: 2.5, px: 3 }}>
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: alpha(course.accentColor, 0.15), color: course.accentColor, fontSize: '0.75rem', fontWeight: 700, border: `1px solid ${alpha(course.accentColor, 0.15)}` }}>
                          {course.instructor.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              color: '#0f172a',
                              fontFamily: '"GT Flexa Lt", sans-serif',
                              lineHeight: 1.1,
                            }}
                          >
                            {course.instructor.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '0.65rem',
                              color: 'rgba(15, 23, 42, 0.4)',
                              fontWeight: 500,
                              fontFamily: '"GT Flexa Lt", sans-serif',
                            }}
                          >
                            {course.instructor.role}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* Status Column */}
                    <TableCell align="right" sx={{ py: 2.5, px: 3 }}>
                      <Chip
                        size="small"
                        label={isFinished ? 'Completed' : 'In Progress'}
                        sx={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          height: 24,
                          fontFamily: '"GT Flexa Lt", sans-serif',
                          backgroundColor: isFinished ? 'rgba(16, 185, 129, 0.08)' : 'rgba(59, 130, 246, 0.08)',
                          color: isFinished ? '#10b981' : '#3b82f6',
                          border: 'none',
                          px: 0.5,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      {filteredCourses.length > 0 && (
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 3, px: 1 }}>
          <Typography sx={{ fontSize: '0.78rem', color: 'rgba(15, 23, 42, 0.45)', fontWeight: 600, fontFamily: '"GT Flexa Lt", sans-serif' }}>
            Showing {startIndex + 1}–{Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} courses
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <IconButton
              size="small"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              sx={{
                border: '1px solid rgba(15, 23, 42, 0.06)',
                borderRadius: '9999px',
                color: '#0f172a',
                '&.Mui-disabled': { color: 'rgba(15, 23, 42, 0.2)' }
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pNum = idx + 1;
              const isActive = currentPage === pNum;
              return (
                <IconButton
                  key={pNum}
                  size="small"
                  onClick={() => setPage(pNum)}
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 800 : 600,
                    fontFamily: '"GT Flexa Lt", sans-serif',
                    backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(15, 23, 42, 0.6)',
                    border: isActive ? 'none' : '1px solid rgba(15, 23, 42, 0.06)',
                    borderRadius: '9999px',
                    '&:hover': {
                      backgroundColor: isActive ? theme.palette.primary.main : 'rgba(15, 23, 42, 0.04)',
                    }
                  }}
                >
                  {pNum}
                </IconButton>
              );
            })}

            <IconButton
              size="small"
              disabled={endIndex >= filteredCourses.length}
              onClick={() => setPage(currentPage + 1)}
              sx={{
                border: '1px solid rgba(15, 23, 42, 0.06)',
                borderRadius: '9999px',
                color: '#0f172a',
                '&.Mui-disabled': { color: 'rgba(15, 23, 42, 0.2)' }
              }}
            >
              <ChevronRightIcon sx={{ fontSize: '1.2rem' }} />
            </IconButton>
          </Stack>
        </Stack>
      )}

      {/* 4. DETAIL SYLLABUS DRAWER */}
      <Drawer
        anchor="right"
        open={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '100%', sm: 480 },
              borderTopLeftRadius: '28px',
              borderBottomLeftRadius: '28px',
              boxShadow: '-12px 0 40px rgba(0,0,0,0.06)',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
            }
          }
        }}
      >
        {selectedCourse && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Chip
                label={selectedCourse.category}
                size="small"
                sx={{
                  backgroundColor: alpha(selectedCourse.accentColor, 0.1),
                  color: selectedCourse.accentColor,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  fontFamily: '"GT Flexa Lt", sans-serif',
                }}
              />
              <IconButton onClick={() => setSelectedCourse(null)} sx={{ p: 0.5, border: '1px solid rgba(15,23,42,0.08)' }}>
                <CloseIcon sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Stack>

            <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif', mb: 2, lineHeight: 1.25 }}>
              {selectedCourse.title}
            </Typography>

            <Typography sx={{ fontSize: '0.8rem', color: 'rgba(15,23,42,0.5)', fontFamily: '"GT Flexa Lt", sans-serif', mb: 4, lineHeight: 1.6 }}>
              {selectedCourse.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Stats Inside Drawer */}
            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
              <Box>
                <Typography sx={{ fontSize: '0.62rem', color: 'rgba(15, 23, 42, 0.4)', fontWeight: 700, fontFamily: '"GT Flexa Lt", sans-serif', textTransform: 'uppercase', mb: 0.5 }}>
                  Lectures
                </Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
                  {selectedCourse.completedLessons} / {selectedCourse.totalLessons} completed
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.62rem', color: 'rgba(15, 23, 42, 0.4)', fontWeight: 700, fontFamily: '"GT Flexa Lt", sans-serif', textTransform: 'uppercase', mb: 0.5 }}>
                  Duration
                </Typography>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif' }}>
                  {selectedCourse.duration}
                </Typography>
              </Box>
            </Stack>

            <Typography sx={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif', mb: 2 }}>
              Course Syllabus
            </Typography>

            {/* Modules List */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
              <List disablePadding>
                {selectedCourse.modules.map((mod, idx) => {
                  return (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: '16px',
                        border: '1px solid rgba(15, 23, 42, 0.05)',
                        mb: 1.5,
                        backgroundColor: mod.completed
                          ? 'rgba(16, 185, 129, 0.02)'
                          : mod.isLocked
                            ? 'rgba(15, 23, 42, 0.02)'
                            : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexGrow: 1, pr: 2 }}>
                        {mod.completed ? (
                          <CheckCircleIcon sx={{ color: '#10b981', fontSize: '1.2rem' }} />
                        ) : mod.isLocked ? (
                          <LockOutlinedIcon sx={{ color: 'rgba(15, 23, 42, 0.3)', fontSize: '1.1rem' }} />
                        ) : (
                          <PlayCircleOutlineIcon sx={{ color: selectedCourse.accentColor, fontSize: '1.2rem' }} />
                        )}
                        <Box>
                          <Typography
                            sx={{
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              color: mod.isLocked ? 'rgba(15, 23, 42, 0.45)' : '#0f172a',
                              fontFamily: '"GT Flexa Lt", sans-serif',
                              lineHeight: 1.3
                            }}
                          >
                            {mod.title}
                          </Typography>
                          <Typography sx={{ fontSize: '0.68rem', color: 'rgba(15, 23, 42, 0.4)', fontWeight: 500, fontFamily: '"GT Flexa Lt", sans-serif' }}>
                            Duration: {mod.duration}
                          </Typography>
                        </Box>
                      </Stack>

                      {!mod.isLocked && !mod.completed && (
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            backgroundColor: selectedCourse.accentColor,
                            color: '#ffffff',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            fontFamily: '"GT Flexa Lt", sans-serif',
                            borderRadius: '6px',
                            minWidth: '60px',
                            px: 1.5,
                            py: 0.5,
                            boxShadow: 'none',
                            '&:hover': {
                              backgroundColor: alpha(selectedCourse.accentColor, 0.9),
                              boxShadow: 'none',
                            }
                          }}
                        >
                          Start
                        </Button>
                      )}
                    </Paper>
                  );
                })}
              </List>
            </Box>

            {/* Bottom CTA */}
            <Box sx={{ mt: 'auto', pt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: selectedCourse.progress === 100 ? '#10b981' : selectedCourse.accentColor,
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'none',
                  fontFamily: '"GT Flexa Lt", sans-serif',
                  py: 1.5,
                  borderRadius: '14px',
                  boxShadow: `0 4px 14px ${alpha(selectedCourse.accentColor, 0.3)}`,
                  '&:hover': {
                    backgroundColor: selectedCourse.progress === 100 ? '#059669' : alpha(selectedCourse.accentColor, 0.9),
                    boxShadow: `0 6px 18px ${alpha(selectedCourse.accentColor, 0.4)}`,
                  }
                }}
              >
                {selectedCourse.progress === 100 ? 'Restart Course' : 'Resume Learning'}
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}
