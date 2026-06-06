export const MOCK_STUDENT_DATA = {
  profile: {
    name: 'Alice Smith',
    role: 'Student',
    batch: 'Batch 2026-A',
    avatarUrl: '',
  },
  attendance: {
    percentage: 85,
    totalClasses: 40,
    attendedClasses: 34,
    recentStatus: ['Present', 'Present', 'Absent', 'Present', 'Present'],
  },
  homework: [
    { id: '1', title: 'React UI Components', subject: 'Frontend', dueDate: '2026-06-08', status: 'Pending' },
    { id: '2', title: 'Database Schema Design', subject: 'Backend', dueDate: '2026-06-10', status: 'Pending' },
    { id: '3', title: 'JavaScript Fundamentals', subject: 'Frontend', dueDate: '2026-06-01', status: 'Submitted' },
    { id: '4', title: 'CSS Grid Layouts', subject: 'Frontend', dueDate: '2026-05-28', status: 'Graded', score: 95 },
  ],
  feedback: [
    { id: 'f1', trainer: 'John Doe', subject: 'React Basics', date: '2026-06-05', comment: 'Great progress! Keep working on understanding hooks better.', rating: 4 },
    { id: 'f2', trainer: 'Jane Smith', subject: 'CSS Layouts', date: '2026-05-30', comment: 'Excellent use of Flexbox in the recent assignment.', rating: 5 },
  ],
  performance: [
    { week: 'Week 1', score: 75 },
    { week: 'Week 2', score: 82 },
    { week: 'Week 3', score: 78 },
    { week: 'Week 4', score: 88 },
    { week: 'Week 5', score: 92 },
  ],
};
