import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
    <div className={`flex items-center justify-between py-4 border-b last:border-b-0 ${colors.divider} gap-8`}>
      <div className={`text-sm tracking-tight ${colors.text} shrink-0`}>{label}</div>
      <div className="flex items-center justify-end flex-1 max-w-[60%] gap-4">{children}</div>
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

export function ApplicationPopup({
  type,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText = "Cancel",
}: {
  type: "warning" | "error" | "info";
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}) {
  const { accentColor, colors, cornerRadius } = useTheme();

  const isWarning = type === "warning";
  const isError = type === "error";
  const isInfo = type === "info";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        className={`w-[360px] ${colors.panelBg} border ${colors.panelBorder} overflow-hidden flex flex-col pointer-events-auto`}
        style={{ borderRadius: cornerRadius }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`h-24 flex items-center justify-center relative ${
            isWarning
              ? "bg-[#E6A23C]"
              : isError
              ? "bg-[#F56C6C]"
              : "bg-[#409EFF]"
          }`}
        >
          {isWarning && (
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {isError && (
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {isInfo && (
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-center flex flex-col items-center">
          <h3 className={`text-xl font-bold mb-2 ${colors.text}`}>{title}</h3>
          <p className={`text-sm mb-6 whitespace-pre-line ${colors.textMuted}`}>
            {message}
          </p>

          <div className="flex gap-4 mb-2">
            <button
              onClick={onCancel}
              className={`px-6 py-2 rounded-full font-medium text-sm border transition-colors ${colors.panelBorder} ${colors.textMuted} hover:${colors.text}`}
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-6 py-2 rounded-full font-medium text-sm text-black transition-colors shadow-sm`}
              style={{
                backgroundColor: isWarning
                  ? "#E6A23C"
                  : isError
                  ? "#F56C6C"
                  : accentColor,
              }}
            >
              {confirmText ||
                (isWarning ? "Proceed" : isError ? "Got it" : "Apply")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
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
