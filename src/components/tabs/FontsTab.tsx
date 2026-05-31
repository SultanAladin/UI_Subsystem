import React, { useState, useRef } from "react";
import { useTheme } from "../../theme.tsx";
import { TogglePillGroup, Slider } from "../SharedUI.tsx";
import { FontFamily } from "../../types.ts";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FONTS = [
  { id: "inter", name: "Inter", desc: "Author" },
  { id: "general", name: "General Sans", desc: "Clean & Modern" },
  { id: "archivo", name: "Archivo", desc: "Technical & Solid" },
  { id: "space", name: "Space Grotesk", desc: "Grotesque Display" },
  { id: "clash", name: "Clash Display", desc: "Bold & Distinct" },
  { id: "montserrat", name: "Montserrat", desc: "Geometric & Wide" },
  { id: "poppins", name: "Poppins", desc: "Friendly & Round" },
  { id: "mono", name: "JetBrains Mono", desc: "Monospaced Code" },
];

const getFontCssVar = (id: string) => {
  if (id === 'inter') return 'var(--font-sans)';
  if (id === 'space') return 'var(--font-display)';
  return `var(--font-${id})`;
};

const WEIGHTS = [
  "Bold",
  "ExtraBold",
  "ExtraLight",
  "Light",
  "Medium",
  "Regular",
  "SemiBold",
];

const SCALES = [
  { id: 'title', label: 'Title', defaultSize: 32, defaultWeight: 'Bold', text: 'Display Title' },
  { id: 'header', label: 'Header', defaultSize: 24, defaultWeight: 'Bold', text: 'Section Header' },
  { id: 'subheader', label: 'Subheader', defaultSize: 18, defaultWeight: 'Medium', text: 'Card Subheader' },
  { id: 'body', label: 'Body', defaultSize: 14, defaultWeight: 'Regular', text: 'The quick brown fox jumps over the lazy dog.' },
  { id: 'label', label: 'Label', defaultSize: 12, defaultWeight: 'Medium', text: 'Form Label' },
  { id: 'caption', label: 'Caption', defaultSize: 10, defaultWeight: 'Regular', text: 'Small caption text' },
];

export function FontsTab() {
  const { colors, cornerRadius, fontFamily, setFontFamily, accentColor } =
    useTheme();
  
  const [sizes, setSizes] = useState<Record<string, number>>(
    Object.fromEntries(SCALES.map(s => [s.id, s.defaultSize]))
  );
  
  const [weights, setWeights] = useState<Record<string, string>>(
    Object.fromEntries(SCALES.map(s => [s.id, s.defaultWeight]))
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const slideFonts = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const getWeightValue = (w: string) => {
    switch (w) {
      case 'ExtraLight': return 200;
      case 'Light': return 300;
      case 'Regular': return 400;
      case 'Medium': return 500;
      case 'SemiBold': return 600;
      case 'Bold': return 700;
      case 'ExtraBold': return 800;
      default: return 400;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Font Family Selection */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <h3 className={`text-sm font-medium ${colors.text}`}>Typography</h3>
            <p className={`text-xs ${colors.textMuted}`}>
              Typeface, type scale, and font weights
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => slideFonts('left')} 
              className={`w-8 h-8 rounded-full border flex items-center justify-center ${colors.panelBorder} hover:bg-black/5 dark:hover:bg-white/5 ${colors.text} transition-colors focus:outline-none`}
            >
               <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => slideFonts('right')} 
              className={`w-8 h-8 rounded-full border flex items-center justify-center ${colors.panelBorder} hover:bg-black/5 dark:hover:bg-white/5 ${colors.text} transition-colors focus:outline-none`}
            >
               <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {FONTS.map((f) => {
            const isActive = fontFamily === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFontFamily(f.id as FontFamily)}
                className={`flex-shrink-0 w-48 p-5 text-left border rounded-xl transition-all relative ${
                  isActive
                    ? ""
                    : `hover:${colors.activeBg} ${colors.panelBorder}`
                }`}
                style={{
                  borderRadius: cornerRadius,
                  borderColor: isActive ? accentColor : undefined,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="fontActiveBg"
                    className="absolute inset-0 bg-white/5 rounded-xl pointer-events-none"
                  />
                )}
                <div
                  className={`text-2xl mb-4 ${colors.text}`}
                  style={{ fontFamily: getFontCssVar(f.id) }}
                >
                  Aa
                </div>
                <div className={`text-sm font-medium mb-1 ${colors.text}`}>
                  {f.name}
                </div>
                <div className={`text-xs truncate ${colors.textMuted}`}>
                  The quick brown fox jumps
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Style Playground */}
      <section
        className={`p-6 border ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <h3
          className={`text-sm font-bold tracking-tight mb-6 ${colors.text}`}
        >
          Typeface & Colors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8">
          <div className={`flex flex-col justify-center h-full p-10 border ${colors.activeBg} ${colors.panelBorder}`} style={{ borderRadius: cornerRadius * 0.8 }}>
            <div
              className={`text-7xl tracking-tight leading-none mb-4 font-bold ${colors.text}`}
              style={{
                fontFamily: getFontCssVar(fontFamily)
              }}
            >
              {FONTS.find((f) => f.id === fontFamily)?.name}
            </div>
            <div className={`text-sm ${colors.textMuted}`}>(72px bold)</div>
          </div>

          <div className="flex flex-col justify-center gap-8 min-w-[280px]">
            <div
              className={`text-[11px] leading-relaxed flex flex-col gap-1 ${colors.textMuted} font-mono`}
            >
              <span>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
              <span>abcdefghijklmnopqrstuvwxyz</span>
              <span>0123456789 !@#$%^&*()</span>
            </div>
            <div className="text-xs break-words" style={{ color: accentColor }}>
              <span className="font-semibold">Accent</span> — The quick brown fox jumps over...
              <div className="mt-1 opacity-70 mb-4">(rendered in {accentColor.toUpperCase()})</div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full border border-white/5" style={{ backgroundColor: accentColor }} />
                <div className="text-[10px] flex flex-col mt-1 gap-0.5">
                   <span className={`font-semibold ${colors.text}`}>{accentColor.toUpperCase()}</span>
                   <span className={colors.textMuted}>Accent</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full border border-white/5 bg-white" />
                <div className="text-[10px] flex flex-col mt-1 gap-0.5">
                   <span className={`font-semibold ${colors.text}`}>#FFFFFF</span>
                   <span className={colors.textMuted}>Primary</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 rounded-full border border-white/5 bg-black" />
                <div className="text-[10px] flex flex-col mt-1 gap-0.5">
                   <span className={`font-semibold ${colors.text}`}>#000000</span>
                   <span className={colors.textMuted}>Background</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adjustments */}
      <section>
        <h3
          className={`text-xs font-semibold tracking-wider mb-6 uppercase ${colors.textMuted}`}
        >
          Type Scale - Desktop
        </h3>

        <div className="space-y-8 pt-4">
           {SCALES.map((scale) => (
             <div 
               key={scale.id}
               className={`p-6 border ${colors.inputBg} ${colors.panelBorder} grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-center`}
               style={{ borderRadius: cornerRadius }}
             >
                <div>
                  <div className="flex justify-between items-center mb-6">
                     <span className={`text-sm font-medium ${colors.text}`}>{scale.label}</span>
                     <span className={`text-xs ${colors.textMuted}`}>{sizes[scale.id]}px</span>
                  </div>
                  <Slider 
                    min={8} 
                    max={72} 
                    value={sizes[scale.id]} 
                    onChange={(val) => setSizes(s => ({ ...s, [scale.id]: val }))} 
                  />
                  <div className="mt-8 flex flex-wrap gap-3">
                    {WEIGHTS.map(w => (
                       <button
                         key={w}
                         onClick={() => setWeights(s => ({ ...s, [scale.id]: w }))}
                         className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                           weights[scale.id] === w ? 'bg-white text-black' : `${colors.textMuted} hover:text-white`
                         }`}
                       >
                         {w}
                       </button>
                    ))}
                  </div>
                </div>
                <div 
                  className={`p-6 rounded border ${colors.activeBg} ${colors.panelBorder} overflow-hidden flex items-center h-full min-h-[100px]`}
                  style={{ borderRadius: cornerRadius * 0.7 }}
                >
                   <div 
                     className={`truncate ${colors.text} w-full`} 
                     style={{ 
                       fontSize: sizes[scale.id], 
                       fontWeight: getWeightValue(weights[scale.id]),
                       fontFamily: getFontCssVar(fontFamily)
                     }}
                   >
                      {scale.text}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Font Rendering */}
      <section
        className={`p-6 border ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <h3
          className={`text-sm font-bold tracking-tight mb-6 ${colors.text}`}
        >
          Font Rendering
        </h3>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm font-medium ${colors.text}`}>Antialiasing</div>
              <div className={`text-xs mt-1 ${colors.textMuted}`}>Enable subpixel antialiasing</div>
            </div>
            <button className={`w-10 h-5 rounded-full relative transition-colors ${true ? 'bg-white/20' : 'bg-white/5'}`}>
              <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform translate-x-5" style={{ backgroundColor: accentColor }} />
            </button>
          </div>
          <div className={`h-px w-full ${colors.divider}`} />
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-sm font-medium ${colors.text}`}>Ligatures</div>
              <div className={`text-xs mt-1 ${colors.textMuted}`}>Enable special character combinations</div>
            </div>
            <button className={`w-10 h-5 rounded-full relative transition-colors ${true ? 'bg-white/20' : 'bg-white/5'}`}>
              <div className="w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform translate-x-5" style={{ backgroundColor: accentColor }} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
