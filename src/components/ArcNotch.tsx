import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";
import {
  Box,
  Lightbulb,
  Camera,
  Paintbrush,
  Play,
  Video,
  Eye,
  Layers,
  Wifi,
  Settings,
  ChevronLeft,
  Volume2,
  HardDrive,
  Cpu,
  Cloud,
  Palette,
  Monitor,
  Shield,
  Bell,
  ChevronRight,
} from "lucide-react";
import { SettingsModal } from "./SettingsModal.tsx";
import {
  WorkspaceSettingsModal,
  InputSettingsModal,
  TelemetrySettingsModal,
} from "./OtherModals.tsx";

export function ArcNotch({
  setActiveModal,
}: {
  setActiveModal?: (m: string | null) => void;
}) {
  const y = useMotionValue(0);
  const [screenHeight, setScreenHeight] = useState(800);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSubPanel, setActiveSubPanel] = useState<string | null>(null);

  useEffect(() => {
    setScreenHeight(window.innerHeight);
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backdropOpacity = useTransform(y, [0, screenHeight], [0, 0.4]);
  const panelOpacity = useTransform(y, [100, screenHeight * 0.5], [0, 1]);

  const handleDragEnd = (e: any, info: any) => {
    const currentY = y.get();
    if (currentY > screenHeight / 2) {
      if (info.velocity.y < -20 || info.offset.y < -50) {
        animate(y, 0, { type: "spring", bounce: 0.2, duration: 0.6 });
        setTimeout(() => {
          setShowSettings(false);
          setActiveSubPanel(null);
        }, 300);
      } else {
        animate(y, screenHeight, {
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
        });
      }
    } else {
      if (info.velocity.y > 20 || info.offset.y > 50) {
        animate(y, screenHeight, {
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
        });
      } else {
        animate(y, 0, { type: "spring", bounce: 0.2, duration: 0.6 });
      }
    }
  };

  const closePanel = () => {
    animate(y, 0, { type: "spring", bounce: 0.2, duration: 0.6 });
    setTimeout(() => {
      setShowSettings(false);
      setActiveSubPanel(null);
    }, 300);
  };

  const renderSubPanel = () => {
    switch (activeSubPanel) {
      case "displaySettings":
        return <SettingsModal onClose={() => setActiveSubPanel(null)} isArc />;
      case "workspaceSettings":
        return <WorkspaceSettingsModal onClose={() => setActiveSubPanel(null)} isArc />;
      case "inputSettings":
        return <InputSettingsModal onClose={() => setActiveSubPanel(null)} isArc />;
      case "telemetrySettings":
        return <TelemetrySettingsModal onClose={() => setActiveSubPanel(null)} isArc />;
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
        style={{
          opacity: backdropOpacity,
          pointerEvents: useTransform(y, (v) =>
            typeof v === "number" && v > 50 ? "auto" : "none",
          ),
        }}
        onClick={closePanel}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center cursor-grab active:cursor-grabbing"
        style={{ y }}
        drag="y"
        dragConstraints={{ top: 0, bottom: screenHeight }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {/* Pulldown Shade Content */}
        <div className="absolute bottom-[35px] left-0 right-0 h-[2000px] bg-[#0A0A0B]">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[100vh] flex flex-col items-center justify-center pb-[35px]"
            style={{
              opacity: panelOpacity,
              pointerEvents: useTransform(y, (v) =>
                typeof v === "number" && v > 100 ? "auto" : "none",
              ),
            }}
          >
            <motion.div
              animate={{
                width: "calc(100vw - 64px)",
                maxWidth: "1200px",
                height: "calc(100vh - 100px)",
              }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              className="relative overflow-hidden bg-[#0A0A0B] rounded-[24px]"
            >
              <AnimatePresence mode="wait">
                {activeSubPanel ? (
                  <motion.div
                    key="subpanel"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col bg-[#141415]"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    {renderSubPanel()}
                  </motion.div>
                ) : !showSettings ? (
                  <motion.div
                    key="control-center"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-[#141415]"
                  >
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-white/50 text-sm font-medium">
                      <span>Control Center</span>
                      <div className="flex items-center gap-6">
                        <Wifi size={20} className="text-white/50" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSettings(true);
                          }}
                          className="hover:text-white transition-colors"
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          <Settings size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="w-full max-w-3xl flex flex-col gap-16">
                      {/* Quick Settings Grid */}
                      <div className="grid grid-cols-4 gap-y-16 gap-x-8">
                        {[
                          { icon: Box, label: "Geometry", active: true },
                          { icon: Lightbulb, label: "Lighting", active: true },
                          { icon: Camera, label: "Cameras", active: false },
                          { icon: Paintbrush, label: "Materials", active: false },
                          { icon: Play, label: "Simulate", active: true },
                          { icon: Video, label: "Render", active: false },
                          { icon: Eye, label: "Show Grid", active: true },
                          { icon: Layers, label: "Outliner", active: false },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-4"
                          >
                            <button
                              className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors shadow-sm ${item.active ? "bg-blue-500 text-white hover:bg-blue-400" : "bg-[#1C1C1E] text-white/70 hover:bg-[#2C2C2E]"}`}
                              onPointerDown={(e) => e.stopPropagation()}
                            >
                              <item.icon
                                size={32}
                                className={item.active ? "fill-current" : ""}
                                strokeWidth={item.active ? 2 : 1.5}
                              />
                            </button>
                            <span className="text-white/70 text-sm font-medium tracking-wide text-center leading-tight">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Render Scale Slider Mock */}
                      <div
                        className="flex items-center gap-6 bg-[#1C1C1E] rounded-full p-4 w-full"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                          <Video size={24} className="text-white/50" />
                        </div>
                        <div className="flex-1 h-3 bg-black/50 rounded-full overflow-hidden relative cursor-pointer">
                          <div className="absolute top-0 left-0 bottom-0 w-[80%] bg-indigo-500/90 rounded-full pointer-events-none" />
                        </div>
                        <div className="w-16 shrink-0 flex items-center justify-center text-white/50 font-mono text-sm font-bold">
                          80%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center p-12 bg-[#141415]"
                  >
                    <div className="w-full max-w-4xl flex flex-col gap-8">
                      <div className="relative flex items-center text-3xl font-bold px-2 py-2 mb-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowSettings(false);
                          }}
                          className="hover:text-white text-white/70 transition-colors flex items-center pr-4"
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          <ChevronLeft size={32} />
                        </button>
                        <span className="text-white">System Settings</span>
                      </div>

                      <div className="flex flex-col bg-[#0A0A0B] rounded-[32px] overflow-hidden border border-white/5">
                        {[
                          {
                            icon: Palette,
                            label: "Appearance",
                            desc: "Theme, fonts, and system colors",
                            action: "displaySettings",
                          },
                          {
                            icon: Monitor,
                            label: "Display & Workspace",
                            desc: "Resolution, scaling, multiple displays",
                            action: "workspaceSettings",
                          },
                          {
                            icon: Shield,
                            label: "Input & Keybindings",
                            desc: "Shortcuts, mouse sensitivity, controllers",
                            action: "inputSettings",
                          },
                          {
                            icon: Bell,
                            label: "Telemetry & Notifications",
                            desc: "RAM usage, FPS, baking complete alerts",
                            action: "telemetrySettings",
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              if (item.action) {
                                setActiveSubPanel(item.action);
                              }
                            }}
                          >
                            <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#1A1A1C] text-white/70">
                                <item.icon size={26} strokeWidth={2} />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-white font-medium text-lg">
                                  {item.label}
                                </span>
                                <span className="text-white/50 text-sm">
                                  {item.desc}
                                </span>
                              </div>
                            </div>
                            <ChevronRight
                              size={24}
                              className="text-white/20 mr-4"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative w-[400px] h-[36px] flex items-center justify-center shrink-0">
          <svg
            className="absolute inset-0 w-full h-full text-[#0A0A0B] drop-shadow-sm pointer-events-none"
            viewBox="0 0 400 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 C 15 0, 20 6, 25 15 L 35 28 C 40 34, 45 36, 52 36 L 348 36 C 355 36, 360 34, 365 28 L 375 15 C 380 6, 385 0, 400 0 Z"
              fill="currentColor"
            />
          </svg>
          <div className="relative z-10 flex items-center gap-2 pb-1">
            <span className="text-white font-[500] tracking-wide text-[15px] ml-1">
              Untitled Workspace
            </span>
            <div className="w-2 h-2 bg-[#22C55E] rounded-full ml-1" />
          </div>
        </div>
      </motion.div>
    </>
  );
}
