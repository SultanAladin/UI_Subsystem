import React, { useState } from "react";
import { useTheme } from "../theme.tsx";
import { FormFieldRow, FormInput, FormSelect, FormToggle } from "./SharedUI.tsx";
import { X, Download } from "lucide-react";

export function SaveFileModal({ onClose }: { onClose?: () => void }) {
  const { colors, accentColor, cornerRadius } = useTheme();
  
  return (
    <div className={`w-full h-full mx-auto flex flex-col p-8 lg:p-12`}>
      <div className="mb-10 flex justify-between items-start">
         <div>
            <h2 className={`text-2xl font-semibold mb-2 ${colors.text}`}>Save Settings</h2>
            <p className={`text-sm ${colors.textMuted}`}>Configure how and where your workspace is saved.</p>
         </div>
         <button onClick={onClose} className={`p-2 rounded-full border transition-colors hover:bg-white/5 ${colors.panelBorder} ${colors.textMuted}`}>
            <X size={16} />
         </button>
      </div>
      
      <div className="flex flex-col flex-1 max-w-3xl lg:px-4">
        <FormFieldRow label="File Name *">
          <FormInput value="Untitled Concept_final" />
        </FormFieldRow>

        <FormFieldRow label="Format">
          <FormSelect options={[".Studio Layout (Source)", ".PNG Sequence", ".GLTF (3D Mesh)", ".SVG (Vector)"]} />
        </FormFieldRow>

        <FormFieldRow label="Include Assets">
          <div className="flex justify-end w-full">
            <FormToggle active={true} onChange={() => {}} />
          </div>
        </FormFieldRow>

        <FormFieldRow label="Target Folder">
          <FormInput placeholder="Select output destination" />
        </FormFieldRow>

        <div className="mt-12 flex justify-between items-center pb-8 border-t pt-8 border-white/5">
          <span className={`text-xs ${colors.textMuted}`}>Ready to save configurations.</span>
          <div className="flex gap-4">
            <button onClick={onClose} className={`px-5 py-2.5 text-sm font-medium ${colors.textMuted} hover:${colors.text} transition-colors`}>
              Cancel
            </button>
            <button onClick={onClose} className={`px-6 py-2.5 text-sm font-medium border border-white/10 text-white rounded-lg transition-colors hover:bg-white/5 active:scale-95`} style={{ borderRadius: cornerRadius }}>
              Export Pack <Download size={14} className="inline ml-1 mb-0.5" />
            </button>
            <button onClick={onClose} className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-transform hover:opacity-90 active:scale-95`} style={{ backgroundColor: accentColor, borderRadius: cornerRadius }}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
