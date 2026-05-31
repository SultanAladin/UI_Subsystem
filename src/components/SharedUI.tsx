import { motion } from "motion/react";
import React from "react";
import { useTheme } from "../theme.tsx";

interface TooltipButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function TooltipButton({ icon, active, onClick }: TooltipButtonProps) {
  const { colors, accentColor, cornerRadius } = useTheme();
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative p-2 w-9 h-9 flex items-center justify-center transition-colors ${
        active ? 'text-white' : colors.textMuted
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeTool"
          className="absolute inset-0 bg-white/5 border"
          style={{ borderColor: accentColor, borderRadius: 9999 }}
          transition={{ duration: 0.2 }}
        />
      )}
      <span className="relative z-10 flex">{icon}</span>
    </motion.button>
  );
}

export function Slider({
  value,
  min,
  max,
  onChange,
  label,
  displayValue,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  label?: string;
  displayValue?: string;
}) {
  const { colors, accentColor } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      {(label || displayValue) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className={colors.textMuted}>{label}</span>}
          {displayValue && <span className={colors.text}>{displayValue}</span>}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="custom-slider"
        style={{
          '--thumb-color': accentColor,
          background: `linear-gradient(to right, ${accentColor} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)`,
        } as React.CSSProperties}
      />
    </div>
  );
}

export function TogglePillGroup({
  options,
  active,
  onChange,
}: {
  options: string[];
  active: string;
  onChange: (val: string) => void;
}) {
  const { colors, cornerRadius, accentColor } = useTheme();

  return (
    <div
      className={`flex items-center gap-1 p-1 rounded-full border ${colors.panelBorder} ${colors.inputBg}`}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 text-xs font-medium relative transition-colors ${active === opt ? colors.text : colors.textMuted}`}
          style={{ borderRadius: cornerRadius * 0.5 }}
        >
          {active === opt && (
            <motion.div
              layoutId={`pill-${options.join("-")}`}
              className={`absolute inset-0 bg-white/10`}
              style={{
                borderRadius: cornerRadius * 0.5,
                borderBottom: `2px solid ${accentColor}`,
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{opt}</span>
        </button>
      ))}
    </div>
  );
}

// Form UI Components
export function FormFieldRow({ label, children }: { label: React.ReactNode, children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <div className={`grid grid-cols-[160px_1fr] items-center py-4 border-b last:border-b-0 ${colors.divider}`}>
      <div className={`text-sm tracking-tight ${colors.text}`}>{label}</div>
      <div className="flex items-center w-full gap-4">{children}</div>
    </div>
  );
}

export function FormInput({ placeholder, value, icon, className = '' }: { placeholder?: string, value?: string, icon?: React.ReactNode, className?: string }) {
  const { colors, cornerRadius } = useTheme();
  return (
    <div className={`flex-1 flex items-center px-4 py-3 border ${colors.panelBorder} ${colors.inputBg} ${className}`} style={{ borderRadius: cornerRadius * 0.6 }}>
      {icon && <span className={`mr-2 ${colors.textMuted}`}>{icon}</span>}
      <input type="text" placeholder={placeholder} defaultValue={value} className={`w-full bg-transparent outline-none text-sm ${colors.text} placeholder:${colors.textMuted}`} />
    </div>
  );
}

export function FormSelect({ value, options }: { value?: string, options: string[] }) {
  const { colors, cornerRadius } = useTheme();
  return (
    <select defaultValue={value} className={`flex-1 w-full px-4 py-3 border text-sm outline-none appearance-none cursor-pointer ${colors.panelBorder} ${colors.inputBg} ${colors.text}`} style={{ borderRadius: cornerRadius * 0.6 }}>
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  );
}

export function FormToggle({ active, onChange }: { active: boolean, onChange: (v: boolean) => void }) {
  const { accentColor } = useTheme();
  return (
    <button 
      onClick={() => onChange(!active)} 
      className={`w-12 h-6 rounded-full relative transition-colors ${active ? '' : 'bg-white/10'}`}
      style={{ backgroundColor: active ? accentColor : undefined }}
    >
      <motion.div 
        className="w-5 h-5 bg-white rounded-full absolute top-0.5"
        animate={{ x: active ? 26 : 2 }}
        transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
      />
    </button>
  );
}
