import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PlaceholderProps {
  title: string;
}

export default function Placeholder({ title }: PlaceholderProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: '24px',
          border: '1px solid rgba(15, 23, 42, 0.06)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          maxWidth: 480,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', fontFamily: '"GT Flexa Lt", sans-serif', mb: 2 }}>
          {title} Page
        </Typography>
        <Typography sx={{ color: 'rgba(15, 23, 42, 0.5)', fontFamily: '"GT Flexa Lt", sans-serif', mb: 4, fontSize: '0.9rem', lineHeight: 1.6 }}>
          We are currently designing and building this section. It will contain premium, interactive features shortly!
        </Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#CA0019',
            color: '#ffffff',
            textTransform: 'none',
            fontFamily: '"GT Flexa Lt", sans-serif',
            borderRadius: '12px',
            px: 4,
            py: 1.25,
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(202, 0, 25, 0.15)',
            '&:hover': {
              backgroundColor: '#9a0010',
              boxShadow: '0 6px 18px rgba(202, 0, 25, 0.25)',
            }
          }}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}
