import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useTheme } from "../theme.tsx";
import { ThemeTab } from "./tabs/ThemeTab.tsx";
import { FontsTab } from "./tabs/FontsTab.tsx";
import { DisplayTab } from "./tabs/DisplayTab.tsx";

type TabId = "display" | "fonts" | "theme";

export function SettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors, cornerRadius, fontFamily, accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>("fonts");

  const tabs: { id: TabId; label: string }[] = [
    { id: "display", label: "Display" },
    { id: "fonts", label: "Fonts" },
    { id: "theme", label: "Theme" },
  ];

  const handleClose = () => {
    // You could pass setActiveModal from App down, or let App dictate styling
    // But since SettingsModal is wrapped by App, let's just make it do nothing if not passed, or better, pass an onClose prop to all modals.
  };

  return (
    <div className={`relative w-full h-full flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className={`shrink-0 p-8 pb-4 flex justify-between items-start`}>
        <div>
          <h2
            className={`text-2xl font-semibold tracking-tight mb-2 ${colors.text}`}
          >
            Display Settings
          </h2>
          <p className={`text-sm ${colors.textMuted}`}>
            Appearance & typography
          </p>
        </div>
        <button
          onClick={onClose}
          className={`p-2 rounded-full border transition-colors hover:bg-white/5 ${colors.panelBorder} ${colors.textMuted}`}
        >
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className={`px-8 flex gap-6 border-b ${colors.divider}`}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium relative transition-colors ${
                isActive
                  ? colors.text
                  : `${colors.textMuted} hover:${colors.text}`
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="modalActiveTabIndicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-y-auto p-8 relative custom-scrollbar"
        style={{ '--scrollbar-color': accentColor } as React.CSSProperties}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "theme" && <ThemeTab />}
            {activeTab === "fonts" && <FontsTab />}
            {activeTab === "display" && <DisplayTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div
        className={`shrink-0 p-6 border-t flex justify-between items-center bg-black/20 ${colors.divider}`}
      >
        <div className={`text-[10px] flex gap-3 ${colors.textMuted}`}>
          <span>Inter — Medium — 11px — MSAA 1x</span>
        </div>
        <div className="flex gap-3">
          <button
            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${colors.textMuted} hover:${colors.text}`}
          >
            Reset
          </button>
          <button className="px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 active:scale-95 transition-all">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
