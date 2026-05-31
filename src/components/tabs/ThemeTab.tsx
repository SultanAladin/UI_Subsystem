import React from "react";
import { useTheme } from "../../theme.tsx";
import { Slider } from "../SharedUI.tsx";
import { ACCENT_COLORS, ThemeMode } from "../../types.ts";
import { motion } from "motion/react";

export function ThemeTab() {
  const {
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
    warningColor,
    setWarningColor,
    successColor,
    setSuccessColor,
    infoColor,
    setInfoColor,
    cornerRadius,
    setCornerRadius,
    colors,
  } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Theme Selection */}
      <section
        className={`p-6 border ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <div className="mb-6">
          <h3 className={`text-sm font-bold tracking-tight mb-1 ${colors.text}`}>Color Scheme</h3>
          <p className={`text-xs ${colors.textMuted}`}>
            Choose the overall interface darkness
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
          {[
            {
              id: "oled",
              name: "OLED",
              bg: "bg-black",
              sidebar: "bg-[#0A0A0A]",
              panel: "bg-[#141414]",
              lines: "bg-white",
            },
            {
              id: "dark",
              name: "Dark",
              bg: "bg-[#18181a]",
              sidebar: "bg-[#222224]",
              panel: "bg-[#2c2c2e]",
              lines: "bg-white",
            },
            {
              id: "light",
              name: "Light",
              bg: "bg-[#e5e5e5]",
              sidebar: "bg-[#f4f4f5]",
              panel: "bg-white outline outline-1 outline-black/5",
              lines: "bg-black",
            },
            {
              id: "sepia",
              name: "Sepia",
              bg: "bg-[#dca85b]",
              sidebar: "bg-[#e6c697]",
              panel: "bg-[#f1dab0]",
              lines: "bg-[#825619]",
            },
            {
              id: "dracula",
              name: "Dracula",
              bg: "bg-[#282a36]",
              sidebar: "bg-[#44475a]",
              panel: "bg-[#6272a4]",
              lines: "bg-[#f8f8f2]",
            },
            {
              id: "nord",
              name: "Nord",
              bg: "bg-[#2e3440]",
              sidebar: "bg-[#3b4252]",
              panel: "bg-[#4c566a]",
              lines: "bg-[#eceff4]",
            },
            {
              id: "github",
              name: "GitHub",
              bg: "bg-[#0d1117]",
              sidebar: "bg-[#161b22]",
              panel: "bg-[#21262d]",
              lines: "bg-[#c9d1d9]",
            },
          ].map((theme) => {
            const isActive = themeMode === theme.id;

            return (
              <div
                key={theme.id}
                className="flex flex-col items-center gap-3"
              >
                <button
                  onClick={() => setThemeMode(theme.id as ThemeMode)}
                  className={`relative w-full aspect-[4/3] rounded-[1.25rem] transition-all overflow-hidden ${theme.bg} ${!isActive ? 'ring-1 ring-black/10 dark:ring-white/10 hover:ring-black/20 dark:hover:ring-white/20 shadow-sm' : ''}`}
                  style={{
                    outline: isActive ? `2px solid ${accentColor}` : 'none',
                    outlineOffset: '4px',
                  }}
                >
                  <div 
                    className={`absolute top-6 bottom-0 left-6 right-0 flex shadow-sm ${theme.sidebar}`}
                    style={{ borderTopLeftRadius: cornerRadius }}
                  >
                     {/* Sidebar Context */}
                     <div className="w-[30%] flex flex-col p-3 gap-1.5 border-r border-black/5 relative z-10">
                        <div className="flex gap-1 mb-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${theme.lines} opacity-40`} />
                          <div className={`w-1.5 h-1.5 rounded-full ${theme.lines} opacity-40`} />
                          <div className={`w-1.5 h-1.5 rounded-full ${theme.lines} opacity-40`} />
                        </div>
                        <div className={`w-full h-1.5 rounded-full ${theme.lines} opacity-20`} style={{ borderRadius: cornerRadius / 4 }} />
                        <div className={`w-2/3 h-1.5 rounded-full ${theme.lines} opacity-20`} style={{ borderRadius: cornerRadius / 4 }} />
                        <div className={`w-1/2 h-1.5 rounded-full ${theme.lines} opacity-20`} style={{ borderRadius: cornerRadius / 4 }} />
                        <div className="mt-auto flex items-center gap-1.5">
                           <div className={`w-2.5 h-2.5 rounded-full ${theme.lines} opacity-40`} />
                           <div className={`w-4 h-1.5 rounded-full ${theme.lines} opacity-20`} style={{ borderRadius: cornerRadius / 4 }} />
                        </div>
                     </div>
                     {/* Panel Context */}
                     <div 
                       className={`flex-1 p-4 flex flex-col gap-1.5 relative z-10 shadow-sm ${theme.panel}`}
                       style={{ borderTopLeftRadius: cornerRadius }}
                     >
                        <div className={`w-1/4 h-1.5 rounded-full mb-1 ${theme.lines} opacity-30`} style={{ borderRadius: cornerRadius / 4 }} />
                        <div className={`w-1/3 h-1.5 rounded-full ${theme.lines} opacity-20`} style={{ borderRadius: cornerRadius / 4 }} />
                        <div className="flex gap-2 mb-1 mt-1">
                           <div className={`flex-1 aspect-square ${theme.lines} opacity-10`} style={{ borderRadius: cornerRadius / 2 }} />
                           <div className={`flex-1 aspect-square ${theme.lines} opacity-10`} style={{ borderRadius: cornerRadius / 2 }} />
                           <div className={`flex-1 aspect-square ${theme.lines} opacity-10`} style={{ borderRadius: cornerRadius / 2 }} />
                        </div>
                        <div className={`mt-auto w-1/5 h-1.5 rounded-full ${theme.lines} opacity-20`} style={{ borderRadius: cornerRadius / 4 }} />
                     </div>
                  </div>
                </button>
                <div className={`text-xs font-medium ${isActive ? colors.text : colors.textMuted}`}>{theme.name}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shapes */}
      <section
        className={`p-6 border ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h3 className={`text-sm font-bold tracking-tight mb-1 ${colors.text}`}>
              Corner Radius
            </h3>
            <p className={`text-xs ${colors.textMuted}`}>
              Adjust the roundness of UI elements
            </p>
          </div>
          <span className={`text-xs ${colors.textMuted}`}>
            {cornerRadius}px
          </span>
        </div>
        <Slider
          min={0}
          max={32}
          value={cornerRadius}
          onChange={setCornerRadius}
        />
      </section>

      {/* Accent Color */}
      <section
        className={`p-6 border ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <div className="mb-6">
          <h3 className={`text-sm font-bold tracking-tight mb-1 ${colors.text}`}>Accent Color</h3>
          <p className={`text-xs ${colors.textMuted}`}>
            Main interactive elements
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => setAccentColor(color)}
              className="relative w-8 h-8 rounded-full outline-none flex items-center justify-center transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            >
              {accentColor === color && (
                <motion.div
                  layoutId="accentOutline"
                  className="absolute inset-[-4px] rounded-full border-2"
                  style={{ borderColor: color }}
                />
              )}
              {accentColor === color && color === "#FFFFFF" ? (
                <div className="w-2 h-2 bg-black rounded-full" />
              ) : null}
            </button>
          ))}
          <button
            className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center ${colors.textMuted} ${colors.panelBorder} hover:text-white transition-colors`}
          >
            +
          </button>
        </div>
      </section>

      {/* Semantic Colors */}
      <section
        className={`p-6 border ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <div className="mb-6">
          <h3 className={`text-sm font-bold tracking-tight mb-1 ${colors.text}`}>Semantic Colors</h3>
          <p className={`text-xs ${colors.textMuted}`}>
            Used for states and notifications
          </p>
        </div>
        
        <div className="space-y-8">
          <div className={`grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center border-b pb-8 last:border-0 last:pb-0 ${colors.divider}`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className={`text-sm font-medium ${colors.text}`}>Warning</span>
              </div>
              <div className="flex gap-3">
                {['#f59e0b', '#eab308', '#fbbf24', '#f97316'].map(color => (
                  <button
                    key={color}
                    onClick={() => setWarningColor(color)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${warningColor === color ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className={`p-6 rounded border ${colors.activeBg} ${colors.panelBorder} overflow-hidden flex items-center h-full min-h-[100px]`} style={{ borderRadius: cornerRadius * 0.7 }}>
              <div className="font-semibold text-lg flex items-center gap-2" style={{ color: warningColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                Action cannot be undone
              </div>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center border-b pb-8 last:border-0 last:pb-0 ${colors.divider}`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className={`text-sm font-medium ${colors.text}`}>Success</span>
              </div>
              <div className="flex gap-3">
                {['#10b981', '#22c55e', '#34d399', '#059669'].map(color => (
                  <button
                    key={color}
                    onClick={() => setSuccessColor(color)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${successColor === color ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className={`p-6 rounded border ${colors.activeBg} ${colors.panelBorder} overflow-hidden flex items-center h-full min-h-[100px]`} style={{ borderRadius: cornerRadius * 0.7 }}>
              <div className="font-semibold text-lg flex items-center gap-2" style={{ color: successColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                Changes saved successfully
              </div>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center border-b pb-8 last:border-0 last:pb-0 ${colors.divider}`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className={`text-sm font-medium ${colors.text}`}>Info</span>
              </div>
              <div className="flex gap-3">
                {['#3b82f6', '#0ea5e9', '#60a5fa', '#2563eb'].map(color => (
                  <button
                    key={color}
                    onClick={() => setInfoColor(color)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${infoColor === color ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className={`p-6 rounded border ${colors.activeBg} ${colors.panelBorder} overflow-hidden flex items-center h-full min-h-[100px]`} style={{ borderRadius: cornerRadius * 0.7 }}>
              <div className="font-semibold text-lg flex items-center gap-2" style={{ color: infoColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                New update available
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
