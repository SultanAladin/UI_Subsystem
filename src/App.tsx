import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./theme.tsx";
import { TopToolbar } from "./components/WorkspaceLayout.tsx";
import { SettingsModal } from "./components/SettingsModal.tsx";
import { CreateFileModal } from "./components/CreateFileModal.tsx";
import { SaveFileModal } from "./components/SaveFileModal.tsx";
import {
  RenderSettingsModal,
  CameraSettingsModal,
  ImportSettingsModal,
  WorkspaceSettingsModal,
  InputSettingsModal,
  TelemetrySettingsModal,
} from "./components/OtherModals.tsx";
import { OutlinerPanel } from "./components/OutlinerPanel.tsx";
import { PropertiesPanel } from "./components/PropertiesPanel.tsx";
import { FONT_CONFIGS } from "./types.ts";
import { motion, AnimatePresence } from "motion/react";
import {
  INITIAL_HIERARCHY,
  updateNodeInTree,
  addFolderToNode,
} from "./sceneState.ts";

import { ArcNotch } from "./components/ArcNotch.tsx";

function AppContent() {
  const { colors, fontFamily, cornerRadius } = useTheme();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>("sky");
  const [sceneItems, setSceneItems] = useState(INITIAL_HIERARCHY);

  const updateNode = (id: string, changes: any) => {
    setSceneItems((prev) => updateNodeInTree(prev, id, changes));
  };

  const handleAddFolder = () => {
    const newFolder = {
      id: `folder_${Date.now()}`,
      name: "New Folder",
      icon: "Folder",
      type: "folder" as const,
      color: "#fb923c",
      isOpen: true,
      children: [],
    };
    setSceneItems((prev) => addFolderToNode(prev, selectedItemId, newFolder));
    setSelectedItemId(newFolder.id);
  };

  return (
    <div
      className={`h-screen w-full flex flex-col relative overflow-hidden transition-colors duration-500 ${colors.mainBg} ${FONT_CONFIGS[fontFamily]}`}
    >
      {/* Background SVG Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <ArcNotch setActiveModal={setActiveModal} />
      <TopToolbar activeModal={activeModal} setActiveModal={setActiveModal} />

      <div className="absolute left-0 top-0 bottom-0 z-10 hidden md:block">
        <OutlinerPanel
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          sceneItems={sceneItems}
          updateNode={updateNode}
          onAddFolder={handleAddFolder}
        />
      </div>

      <div className="absolute right-0 top-0 bottom-0 z-10 hidden md:block">
        <PropertiesPanel
          selectedItemId={selectedItemId}
          sceneItems={sceneItems}
          updateNode={updateNode}
        />
      </div>

      {/* Main Workspace Area with Modals */}
      <main className="flex-1 relative z-30 w-full flex flex-col items-center justify-center min-h-0 px-4 pt-24 pb-4 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          {activeModal && (
            <motion.div
              key={activeModal}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className={`w-full max-w-5xl h-full mx-auto flex flex-col border shadow-2xl overflow-hidden pointer-events-auto ${colors.panelBg} ${colors.panelBorder}`}
              style={{ borderRadius: cornerRadius * 1.5 }}
            >
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeModal === "displaySettings" && (
                  <SettingsModal onClose={() => setActiveModal(null)} />
                )}
                {activeModal === "workspaceSettings" && (
                  <WorkspaceSettingsModal
                    onClose={() => setActiveModal(null)}
                  />
                )}
                {activeModal === "inputSettings" && (
                  <InputSettingsModal onClose={() => setActiveModal(null)} />
                )}
                {activeModal === "telemetrySettings" && (
                  <TelemetrySettingsModal
                    onClose={() => setActiveModal(null)}
                  />
                )}
                {activeModal === "newFile" && (
                  <CreateFileModal onClose={() => setActiveModal(null)} />
                )}
                {activeModal === "saveFile" && (
                  <SaveFileModal onClose={() => setActiveModal(null)} />
                )}
                {activeModal === "renderSettings" && (
                  <RenderSettingsModal onClose={() => setActiveModal(null)} />
                )}
                {activeModal === "cameraSettings" && (
                  <CameraSettingsModal onClose={() => setActiveModal(null)} />
                )}
                {activeModal === "importSettings" && (
                  <ImportSettingsModal onClose={() => setActiveModal(null)} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
