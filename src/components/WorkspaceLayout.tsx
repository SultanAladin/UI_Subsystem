import {
  MousePointer2,
  Box,
  Droplets,
  Paintbrush,
  Wand2,
  Copy,
  RotateCcw,
  Shield,
  Layers,
  FilePlus,
  Save,
  Undo,
  Redo,
  Monitor,
  Video,
  Camera,
  Settings2,
  Plus,
  Eye,
  MonitorPlay,
  Download,
  ListTree,
  SlidersHorizontal,
} from "lucide-react";
import { useTheme } from "../theme.tsx";
import { TooltipButton } from "./SharedUI.tsx";

export function LeftSidebar() {
  const { colors, cornerRadius } = useTheme();

  return (
    <div
      className={`fixed left-4 top-1/2 -translate-y-1/2 w-12 flex flex-col items-center py-4 gap-2 border shadow-2xl z-10 ${colors.panelBg} ${colors.panelBorder}`}
      style={{ borderRadius: cornerRadius }}
    >
      <TooltipButton icon={<MousePointer2 size={18} />} active />
      <TooltipButton icon={<Droplets size={18} />} />
      <TooltipButton icon={<Paintbrush size={18} />} />
      <div className={`w-6 h-px my-1 ${colors.divider}`} />
      <TooltipButton icon={<Wand2 size={18} />} />
      <TooltipButton icon={<Copy size={18} />} />
      <TooltipButton icon={<RotateCcw size={18} />} />
      <TooltipButton icon={<Shield size={18} />} />
    </div>
  );
}

export function TopToolbar({
  activeModal,
  setActiveModal,
  showOutliner,
  setShowOutliner,
  showProperties,
  setShowProperties,
}: {
  activeModal: string | null;
  setActiveModal: (m: string | null) => void;
  showOutliner?: boolean;
  setShowOutliner?: (show: boolean) => void;
  showProperties?: boolean;
  setShowProperties?: (show: boolean) => void;
}) {
  const { colors } = useTheme();

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-50">
      <div
        className={`flex items-center px-1.5 py-1.5 border shadow-2xl ${colors.panelBg} ${colors.panelBorder}`}
        style={{ borderRadius: 9999 }}
      >
        <TooltipButton
          icon={<ListTree size={16} />}
          onClick={() => setShowOutliner?.(!showOutliner)}
          active={showOutliner}
        />
        <div className={`w-px h-4 mx-2 ${colors.divider}`} />
        <TooltipButton
          icon={<FilePlus size={16} />}
          onClick={() => setActiveModal("newFile")}
          active={activeModal === "newFile"}
        />
        <TooltipButton
          icon={<Save size={16} />}
          onClick={() => setActiveModal("saveFile")}
          active={activeModal === "saveFile"}
        />
        <TooltipButton
          icon={<Download size={16} />}
          onClick={() => setActiveModal("importSettings")}
          active={activeModal === "importSettings"}
        />
        <div className={`w-px h-4 mx-2 ${colors.divider}`} />
        <TooltipButton
          icon={<MonitorPlay size={16} />}
          onClick={() => setActiveModal("renderSettings")}
          active={activeModal === "renderSettings"}
        />
        <TooltipButton
          icon={<Camera size={16} />}
          onClick={() => setActiveModal("cameraSettings")}
          active={activeModal === "cameraSettings"}
        />
        <div className={`w-px h-4 mx-2 ${colors.divider}`} />
        <TooltipButton
          icon={<SlidersHorizontal size={16} />}
          onClick={() => setShowProperties?.(!showProperties)}
          active={showProperties}
        />
      </div>
    </div>
  );
}

export function RightSidebar() {
  const { colors, cornerRadius, accentColor } = useTheme();

  return (
    <div
      className={`fixed right-4 top-4 bottom-24 w-64 flex flex-col border shadow-2xl z-10 overflow-hidden ${colors.panelBg} ${colors.panelBorder}`}
      style={{ borderRadius: cornerRadius }}
    >
      <div
        className={`p-4 flex items-center justify-between border-b ${colors.divider}`}
      >
        <span
          className={`text-xs font-semibold tracking-wider ${colors.textMuted}`}
        >
          LAYERS
        </span>
        <button className="p-1 hover:bg-white/5 rounded">
          <Plus size={14} />
        </button>
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        <div
          className={`flex items-center justify-between p-2 rounded cursor-pointer ${colors.activeBg}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded bg-[#222] border border-white/10`}
            />
            <span className={`text-sm ${colors.text}`}>Base</span>
          </div>
          <Eye size={14} className={colors.textMuted} />
        </div>
      </div>

      <div className={`p-4 border-t ${colors.divider}`}>
        <button
          className={`w-full py-2.5 px-4 rounded text-sm transition-opacity hover:opacity-90 font-medium`}
          style={{
            backgroundColor: colors.inputBg,
            color: colors.text,
            borderRadius: cornerRadius * 0.5,
          }}
        >
          Export Pack -&gt;
        </button>
      </div>
    </div>
  );
}

export function BottomStatus() {
  const { colors, cornerRadius, accentColor } = useTheme();

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center h-10 px-4 gap-4 border shadow-xl z-20 text-[11px] ${colors.panelBg} ${colors.panelBorder}`}
      style={{ borderRadius: cornerRadius }}
    >
      <div className="flex items-center gap-2">
        <span className={colors.textMuted}>Albedo</span>
        <div className="w-3.5 h-3.5 rounded bg-[#fcd34d]" />
      </div>

      <div className={`w-px h-4 ${colors.divider}`} />

      <div className="flex items-center gap-3">
        <span className={colors.textMuted}>Size</span>
        <div
          className={`w-24 h-1.5 rounded-full overflow-hidden ${colors.inputBg}`}
        >
          <div className="h-full bg-white transition-all w-1/4" />
        </div>
        <span className={colors.textMuted}>24</span>
      </div>

      <div className="flex items-center gap-3">
        <span className={colors.textMuted}>Opacity</span>
        <div
          className={`w-24 h-1.5 rounded-full overflow-hidden ${colors.inputBg}`}
        >
          <div className="h-full bg-white transition-all w-[85%]" />
        </div>
        <span className={colors.textMuted}>85%</span>
      </div>

      <div className={`w-px h-4 ${colors.divider}`} />

      <div className="flex items-center gap-2">
        <span className={colors.textMuted}>Normal</span>
        <div className="flex gap-1 ml-2">
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full border ${colors.divider} ${colors.textMuted}`}
          >
            X
          </span>
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full border ${colors.divider} ${colors.textMuted}`}
          >
            Y
          </span>
          <span
            className={`w-5 h-5 flex items-center justify-center rounded-full border ${colors.divider} ${colors.textMuted}`}
          >
            R
          </span>
        </div>
      </div>
    </div>
  );
}
