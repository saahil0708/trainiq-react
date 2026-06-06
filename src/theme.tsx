import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import * as React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a78bfa",       // violet-400
      light: "#ddd6fe",      // violet-200
      dark: "#8b5cf6",       // violet-500
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6d28d9",       // violet-700
    },
  },
});

export function TrainiqThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
