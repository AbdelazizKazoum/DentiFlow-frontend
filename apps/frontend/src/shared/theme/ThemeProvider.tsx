"use client";

import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EmotionRegistry from "./EmotionRegistry";

export function AppThemeProvider({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: "rtl" | "ltr";
}) {
  const themeOptions: ThemeOptions = {
    direction,
    typography: {
      fontFamily:
        direction === "rtl"
          ? "Cairo, Arial, sans-serif"
          : "Inter, Arial, sans-serif",
    },
    // We can add components and palette tokens here (E1-DT2)
  };

  const theme = createTheme(themeOptions);

  return (
    <EmotionRegistry direction={direction}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </EmotionRegistry>
  );
}
