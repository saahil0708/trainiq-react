import { Outlet } from 'react-router-dom';
import FloatingSidebar from '../components/FloatingSidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <FloatingSidebar />
      <main
        style={{
          flexGrow: 1,
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingTop: '32px',
          paddingBottom: '32px',
          minHeight: '100vh',
          backgroundColor: '#F9FAFB', // Matching the theme background color
        }}
      >
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
