import React from 'react';
import { TrainiqThemeProvider } from './theme';
import FloatingSidebar from './components/FloatingSidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <TrainiqThemeProvider>
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
          }}
        >
          <Header />
          <Dashboard />
        </main>
      </div>
    </TrainiqThemeProvider>
  );
}
