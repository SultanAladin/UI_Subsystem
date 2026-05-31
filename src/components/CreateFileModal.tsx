import React, { useState } from "react";
import { useTheme } from "../theme.tsx";
import { FormFieldRow, FormInput, FormSelect, FormToggle } from "./SharedUI.tsx";
import { Calendar, X } from "lucide-react";

export function CreateFileModal({ onClose, isSidebar }: { onClose?: () => void, isSidebar?: boolean }) {
  const { colors, accentColor, cornerRadius } = useTheme();
  
  return (
    <div className={`w-full h-full mx-auto flex flex-col ${isSidebar ? 'p-6 flex-1 overflow-y-auto custom-scrollbar' : 'p-8 lg:p-12'}`}>
      <div className={`mb-6 flex justify-between items-start shrink-0`}>
         <div>
            <h2 className={`text-xl font-semibold mb-1 ${colors.text}`}>New Workspace </h2>
            <p className={`text-xs ${colors.textMuted}`}>Configure file details and resolution.</p>
         </div>
         <button onClick={onClose} className={`p-1.5 rounded-full border transition-colors hover:bg-white/5 ${colors.panelBorder} ${colors.textMuted}`}>
            <X size={14} />
         </button>
      </div>
      
      <div className="flex flex-col flex-1 gap-4">
        <div>
          <div className="text-xs font-semibold mb-2 text-white/70">Project Title *</div>
          <FormInput value="Untitled Concept" />
        </div>

        <div>
          <div className="text-xs font-semibold mb-2 text-white/70">Resolution *</div>
          <div className="flex gap-2 w-full items-center">
            <FormInput value="1920" />
            <div className={`text-center text-xs ${colors.textMuted}`}>x</div>
            <FormInput value="1080" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-xs font-medium text-white/70">Include basic nodes</div>
          <FormToggle active={true} onChange={() => {}} />
        </div>
        
        <div className="border-t border-white/5 my-2"></div>

        <div>
          <div className="text-xs font-semibold mb-2 text-white/70">Template</div>
          <FormSelect options={["Blank Template", "Web Layout", "Mobile App UI", "Icon Pack"]} />
        </div>

        <div className="flex items-center justify-between mt-2 mb-6">
          <div className="text-xs font-medium text-white/70">Use Grid System</div>
          <FormToggle active={true} onChange={() => {}} />
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-6 shrink-0 border-t border-white/5">
          <button className={`w-full py-2.5 text-sm font-medium text-white rounded-lg transition-transform hover:opacity-90 active:scale-95`} style={{ backgroundColor: accentColor, borderRadius: cornerRadius }}>
            Create workspace
          </button>
          <button onClick={onClose} className={`w-full py-2 text-sm font-medium ${colors.textMuted} hover:${colors.text} transition-colors border border-white/10 rounded-lg hover:bg-white/5`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
