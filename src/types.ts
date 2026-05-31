export type ThemeMode = "oled" | "dark" | "dim" | "light" | "sepia" | "dracula" | "nord" | "github";
export type FontFamily = "inter" | "space" | "mono" | "clash" | "archivo" | "montserrat" | "poppins" | "general";

export type SceneNodeType = 'scene' | 'folder' | 'light' | 'volume' | 'mesh';

export interface SceneNode {
  id: string;
  name: string;
  icon: string;
  type: SceneNodeType;
  color?: string;
  isOpen?: boolean;
  isHidden?: boolean;
  isLocked?: boolean;
  children?: SceneNode[];
}

export interface ThemeColors {
  mainBg: string;
  panelBg: string;
  panelBorder: string;
  text: string;
  textMuted: string;
  inputBg: string;
  divider: string;
  activeBg: string;
}

export interface AppState {
  themeMode: ThemeMode;
  accentColor: string;
  warningColor: string;
  successColor: string;
  infoColor: string;
  fontFamily: FontFamily;
  cornerRadius: number;
}

export const THEME_CONFIGS: Record<ThemeMode, ThemeColors> = {
  oled: {
    mainBg: "bg-black",
    panelBg: "bg-[#0A0A0A]",
    panelBorder: "border-white/[0.04]",
    text: "text-white/95",
    textMuted: "text-white/40",
    inputBg: "bg-white/5",
    divider: "border-white/[0.04]",
    activeBg: "bg-white/[0.08]",
  },
  dark: {
    mainBg: "bg-[#111111]",
    panelBg: "bg-[#1a1a1a]",
    panelBorder: "border-white/[0.06]",
    text: "text-white/90",
    textMuted: "text-white/50",
    inputBg: "bg-white/5",
    divider: "border-white/[0.06]",
    activeBg: "bg-white/[0.1]",
  },
  dim: {
    mainBg: "bg-slate-900",
    panelBg: "bg-slate-800",
    panelBorder: "border-slate-700/50",
    text: "text-slate-100",
    textMuted: "text-slate-400",
    inputBg: "bg-slate-950/50",
    divider: "border-slate-700/50",
    activeBg: "bg-slate-700",
  },
  light: {
    mainBg: "bg-slate-100",
    panelBg: "bg-white",
    panelBorder: "border-slate-200",
    text: "text-slate-900",
    textMuted: "text-slate-500",
    inputBg: "bg-slate-50",
    divider: "border-slate-200",
    activeBg: "bg-slate-100",
  },
  sepia: {
    mainBg: "bg-[#eaddcf]",
    panelBg: "bg-[#f4ebe1]",
    panelBorder: "border-[#d8c3b0]",
    text: "text-[#5c4b3a]",
    textMuted: "text-[#8c7a6b]",
    inputBg: "bg-[#f9f4ef]",
    divider: "border-[#d8c3b0]",
    activeBg: "bg-[#eaddcf]",
  },
  dracula: {
    mainBg: "bg-[#282a36]",
    panelBg: "bg-[#44475a]",
    panelBorder: "border-[#6272a4]/30",
    text: "text-[#f8f8f2]",
    textMuted: "text-[#6272a4]",
    inputBg: "bg-[#282a36]",
    divider: "border-[#6272a4]/30",
    activeBg: "bg-[#6272a4]/20",
  },
  nord: {
    mainBg: "bg-[#2e3440]",
    panelBg: "bg-[#3b4252]",
    panelBorder: "border-[#4c566a]",
    text: "text-[#eceff4]",
    textMuted: "text-[#d8dee9]",
    inputBg: "bg-[#2e3440]",
    divider: "border-[#4c566a]",
    activeBg: "bg-[#434c5e]",
  },
  github: {
    mainBg: "bg-[#0d1117]",
    panelBg: "bg-[#161b22]",
    panelBorder: "border-[#30363d]",
    text: "text-[#c9d1d9]",
    textMuted: "text-[#8b949e]",
    inputBg: "bg-[#0d1117]",
    divider: "border-[#30363d]",
    activeBg: "bg-[#21262d]",
  },
};

export const ACCENT_COLORS = [
  "#FFFFFF", // White
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#84cc16", // Lime
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
  "#d946ef", // Fuchsia
  "#f43f5e", // Rose
];

export const FONT_CONFIGS: Record<FontFamily, string> = {
  inter: "font-sans",
  space: "font-display",
  mono: "font-mono",
  clash: "font-clash",
  archivo: "font-archivo",
  montserrat: "font-montserrat",
  poppins: "font-poppins",
  general: "font-general",
};
