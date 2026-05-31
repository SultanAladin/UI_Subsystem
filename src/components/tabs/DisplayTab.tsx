import React, { useState } from "react";
import { useTheme } from "../../theme.tsx";
import { TogglePillGroup, Slider } from "../SharedUI.tsx";
import {
  Search,
  Settings,
  Eye,
  Copy,
  Folder,
  Layers,
  Monitor,
  Check,
} from "lucide-react";

export function DisplayTab() {
  const { colors, cornerRadius, accentColor } = useTheme();
  const [iconFont, setIconFont] = useState("Lucide");

  const getIconProps = () => {
    switch (iconFont) {
      case "Phosphor":
        return { strokeWidth: 1.5, absoluteStrokeWidth: true };
      case "Tabler":
        return { strokeWidth: 1.25, absoluteStrokeWidth: true };
      case "Heroicons":
        return { strokeWidth: 2, absoluteStrokeWidth: true };
      case "Material Soft":
        return { strokeWidth: 2.5, absoluteStrokeWidth: true };
      default: // Lucide
        return { strokeWidth: 2 };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section
        className={`p-6 border ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <h3
          className={`text-xs ml-1 font-semibold tracking-wider mb-4 uppercase ${colors.textMuted}`}
        >
          Icon Font
        </h3>

        <select
          className={`w-full p-3 rounded-lg text-sm border outline-none appearance-none mb-6 cursor-pointer ${colors.inputBg} ${colors.panelBorder} ${colors.text} custom-hover-ring`}
          style={{ borderRadius: cornerRadius * 0.7 }}
          value={iconFont}
          onChange={(e) => setIconFont(e.target.value)}
        >
          <option value="Lucide">Lucide</option>
          <option value="Phosphor">Phosphor</option>
          <option value="Tabler">Tabler</option>
          <option value="Heroicons">Heroicons</option>
          <option value="Material Soft">Material Soft</option>
        </select>

        <div
          className={`p-6 border rounded-lg flex justify-between items-center ${colors.activeBg} ${colors.panelBorder} transition-all duration-300`}
          style={{ borderRadius: cornerRadius * 0.7 }}
        >
          <Search size={20} className={colors.text} {...getIconProps()} />
          <Settings size={20} className={colors.text} {...getIconProps()} />
          <Eye size={20} className={colors.text} {...getIconProps()} />
          <Copy size={20} className={colors.text} {...getIconProps()} />
          <Folder size={20} className={colors.text} {...getIconProps()} />
          <Layers size={20} className={colors.text} {...getIconProps()} />
          <Monitor size={20} className={colors.text} {...getIconProps()} />
          <Check size={20} className={colors.text} {...getIconProps()} />
        </div>
      </section>

      <section
        className={`p-6 border flex flex-col gap-6 ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <h3
          className={`text-xs ml-1 font-semibold tracking-wider uppercase ${colors.textMuted}`}
        >
          Anti-Aliasing
        </h3>

        <div className="flex gap-2">
          {["1x", "2x", "4x", "8x"].map((aa, idx) => (
            <button
              key={aa}
              className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-colors ${idx === 0 ? "border-white text-white" : `${colors.panelBorder} ${colors.textMuted} hover:${colors.activeBg}`}`}
            >
              {idx === 0 && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white mr-2" />
              )}
              {aa}
            </button>
          ))}
        </div>

        <div
          className={`p-5 mt-2 rounded border ${colors.inputBg} ${colors.panelBorder}`}
          style={{ borderRadius: cornerRadius * 0.7 }}
        >
          <div className={`text-xs font-medium mb-1 ${colors.textMuted}`}>
            Renderer Sampling
          </div>
          <div className={`text-sm ${colors.textMuted}`}>
            1x / 2x / 4x / 8x recreate render targets live
          </div>
        </div>
      </section>

      <section
        className={`p-6 border flex flex-col gap-6 ${colors.inputBg} ${colors.panelBorder}`}
        style={{ borderRadius: cornerRadius }}
      >
        <h3
          className={`text-xs ml-1 font-semibold tracking-wider uppercase ${colors.textMuted}`}
        >
          Safe Area Padding
        </h3>
        <Slider
          min={0}
          max={128}
          value={32}
          onChange={() => {}}
          displayValue="32px"
        />
      </section>
    </div>
  );
}
