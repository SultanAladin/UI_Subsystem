import React, { useState } from "react";
import { useTheme } from "../theme.tsx";
import { FormFieldRow, FormInput, FormSelect, FormToggle } from "./SharedUI.tsx";
import { Calendar, X } from "lucide-react";

export function CreateFileModal({ onClose }: { onClose?: () => void }) {
  const { colors, accentColor, cornerRadius } = useTheme();
  
  return (
    <div className={`w-full h-full mx-auto flex flex-col p-8 lg:p-12`}>
      <div className="mb-10 flex justify-between items-start">
         <div>
            <h2 className={`text-2xl font-semibold mb-2 ${colors.text}`}>New Workspace </h2>
            <p className={`text-sm ${colors.textMuted}`}>Configure file details and resolution setup.</p>
         </div>
         <button onClick={onClose} className={`p-2 rounded-full border transition-colors hover:bg-white/5 ${colors.panelBorder} ${colors.textMuted}`}>
            <X size={16} />
         </button>
      </div>
      
      <div className="flex flex-col flex-1 max-w-3xl lg:px-4">
        <FormFieldRow label="Project Title *">
          <FormInput value="Untitled Concept" />
        </FormFieldRow>

        <FormFieldRow label="Resolution *">
          <div className="flex gap-4 w-full">
            <FormInput value="1920" />
            <div className={`text-center py-3 text-sm ${colors.textMuted}`}>x</div>
            <FormInput value="1080" />
          </div>
        </FormFieldRow>

        <FormFieldRow label="Include basic nodes">
          <div className="flex justify-end w-full">
            <FormToggle active={true} onChange={() => {}} />
          </div>
        </FormFieldRow>

        <FormFieldRow label="Template">
          <FormSelect options={["Blank Template", "Web Layout", "Mobile App UI", "Icon Pack"]} />
        </FormFieldRow>

        <FormFieldRow label="Use Grid System">
          <div className="flex justify-end w-full">
            <FormToggle active={true} onChange={() => {}} />
          </div>
        </FormFieldRow>

        <div className="mt-12 flex justify-between items-center pb-8">
          <span className={`text-xs ${colors.textMuted}`}>Draft auto-saves automatically</span>
          <div className="flex gap-4">
            <button onClick={onClose} className={`px-5 py-2.5 text-sm font-medium ${colors.textMuted} hover:${colors.text} transition-colors`}>
              Discard Changes
            </button>
            <button className={`px-6 py-2.5 text-sm font-medium text-white rounded-lg transition-transform hover:opacity-90 active:scale-95`} style={{ backgroundColor: accentColor, borderRadius: cornerRadius }}>
              Create workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
