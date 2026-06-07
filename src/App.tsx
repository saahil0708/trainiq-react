import { RouterProvider } from 'react-router-dom';
import { TrainiqThemeProvider } from './theme';
import { router } from './routes/routes';

export default function App() {
  return (
    <TrainiqThemeProvider>
      <RouterProvider router={router} />
    </TrainiqThemeProvider>
  );
}
