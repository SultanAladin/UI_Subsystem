import React, { createContext, useContext, useState } from "react";
import {
  AppState,
  ThemeMode,
  FontFamily,
  THEME_CONFIGS,
  ThemeColors,
} from "./types.ts";

interface ThemeContextType extends AppState {
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  setWarningColor: (color: string) => void;
  setSuccessColor: (color: string) => void;
  setInfoColor: (color: string) => void;
  setFontFamily: (font: FontFamily) => void;
  setCornerRadius: (radius: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("oled");
  const [accentColor, setAccentColor] = useState<string>("#8b5cf6"); // Default purple
  const [warningColor, setWarningColor] = useState<string>("#f59e0b"); // Default amber
  const [successColor, setSuccessColor] = useState<string>("#10b981"); // Default emerald
  const [infoColor, setInfoColor] = useState<string>("#3b82f6"); // Default blue
  const [fontFamily, setFontFamily] = useState<FontFamily>("inter");
  const [cornerRadius, setCornerRadius] = useState<number>(16);

  const colors = THEME_CONFIGS[themeMode];

  const value = {
    themeMode,
    accentColor,
    warningColor,
    successColor,
    infoColor,
    fontFamily,
    cornerRadius,
    colors,
    setThemeMode,
    setAccentColor,
    setWarningColor,
    setSuccessColor,
    setInfoColor,
    setFontFamily,
    setCornerRadius,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
