import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft } from "lucide-react";
import { useTheme } from "../theme.tsx";
import { ThemeTab } from "./tabs/ThemeTab.tsx";
import { FontsTab } from "./tabs/FontsTab.tsx";
import { DisplayTab } from "./tabs/DisplayTab.tsx";
import { ApplicationPopup } from "./SharedUI.tsx";

type TabId = "display" | "fonts" | "theme";

export function SettingsModal({
  onClose,
  isArc,
  isSidebar,
}: {
  onClose?: () => void;
  isArc?: boolean;
  isSidebar?: boolean;
}) {
  const { colors, cornerRadius, fontFamily, accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>("fonts");

  const [popupConfig, setPopupConfig] = useState<{
    type: "warning" | "error" | "info";
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const tabs: { id: TabId; label: string }[] = [
    { id: "display", label: "Display" },
    { id: "fonts", label: "Fonts" },
    { id: "theme", label: "Theme" },
  ];

  const handleApplyClick = () => {
    setPopupConfig({
      type: "info",
      title: "Settings Changed",
      message: "Are you sure you want to apply these display settings?",
      onConfirm: () => {
        setPopupConfig(null);
        // Do not call onClose() here! Just apply the settings.
      },
    });
  };

  const handleResetClick = () => {
    setPopupConfig({
      type: "warning",
      title: "Reset to Defaults?",
      message: "Are you sure you want to reset display settings back to defaults?\nThis action cannot be undone.",
      onConfirm: () => {
        setPopupConfig(null);
        // Do not call onClose() here! Just apply the settings.
      },
    });
  };

  const handleClose = () => {
    // You could pass setActiveModal from App down, or let App dictate styling
    // But since SettingsModal is wrapped by App, let's just make it do nothing if not passed, or better, pass an onClose prop to all modals.
  };

  return (
    <div className={`relative w-full h-full flex flex-col overflow-hidden`}>
      <AnimatePresence>
        {popupConfig && (
          <ApplicationPopup
            type={popupConfig.type}
            title={popupConfig.title}
            message={popupConfig.message}
            onConfirm={popupConfig.onConfirm}
            onCancel={() => setPopupConfig(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`shrink-0 ${isArc || isSidebar ? 'p-6 pb-2' : 'p-8 pb-4'} flex flex-col items-start gap-4`}>
        {isArc || isSidebar ? (
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full border transition-colors hover:bg-white/5 ${colors.panelBorder} ${colors.textMuted}`}
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <h2 className={`text-lg font-semibold tracking-tight ${colors.text}`}>
                Display Settings
              </h2>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start w-full">
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
        )}
        {(isArc || isSidebar) && <p className={`text-xs ${colors.textMuted}`}>Appearance & typography</p>}
      </div>

      {/* Tabs */}
      <div className={`px-6 flex gap-6 overflow-x-auto custom-scrollbar border-b ${colors.divider}`}>
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
        className={`flex-1 overflow-y-auto ${isArc ? 'p-6' : 'p-8'} relative custom-scrollbar`}
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
        className={`shrink-0 p-6 border-t flex ${isSidebar ? 'flex-col gap-4' : 'justify-between items-center'} bg-black/20 ${colors.divider}`}
      >
        {!isSidebar && (
          <div className={`text-[10px] flex gap-3 ${colors.textMuted}`}>
            <span>Inter — Medium — 11px — MSAA 1x</span>
          </div>
        )}
        <div className={`flex ${isSidebar ? 'flex-col min-w-full' : ''} gap-3`}>
          <button
            onClick={handleResetClick}
            className={`${isSidebar ? 'w-full py-2.5' : 'px-6 py-2'} text-sm font-medium rounded-full transition-colors ${colors.textMuted} hover:${colors.text} border border-white/10 hover:bg-white/5`}
          >
            Reset
          </button>
          <button 
            onClick={handleApplyClick}
            className={`${isSidebar ? 'w-full py-2.5' : 'px-6 py-2'} text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 active:scale-95 transition-all`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
