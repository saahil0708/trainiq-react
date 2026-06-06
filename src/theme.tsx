import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import * as React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#CA0019",       // Crimson base theme
      light: "#ffd6da",      // Light crimson
      dark: "#9a0010",       // Dark crimson
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#80000b",       // Deep crimson
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
