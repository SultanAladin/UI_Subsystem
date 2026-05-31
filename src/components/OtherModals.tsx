import React, { useState } from "react";
import { useTheme } from "../theme.tsx";
import {
  FormFieldRow,
  FormInput,
  FormSelect,
  FormToggle,
  Slider,
} from "./SharedUI.tsx";
import { X, UploadCloud } from "lucide-react";

export function GenericSettingsModal({
  title,
  subtitle,
  children,
  onClose,
  footerBtn,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onClose?: () => void;
  footerBtn: string;
}) {
  const { colors, accentColor, cornerRadius } = useTheme();

  return (
    <div className={`w-full h-full mx-auto flex flex-col relative`}>
      <div className={`shrink-0 p-8 pb-4 flex justify-between items-start`}>
        <div>
          <h2
            className={`text-2xl font-semibold tracking-tight mb-2 ${colors.text}`}
          >
            {title}
          </h2>
          <p className={`text-sm ${colors.textMuted}`}>{subtitle}</p>
        </div>
        <button
          onClick={onClose}
          className={`p-2 rounded-full border transition-colors hover:bg-white/5 ${colors.panelBorder} ${colors.textMuted}`}
        >
          <X size={16} />
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto px-8 lg:px-12 py-8 custom-scrollbar"
        style={{ "--scrollbar-color": accentColor } as React.CSSProperties}
      >
        <div className="max-w-3xl">{children}</div>
      </div>

      <div
        className={`shrink-0 p-6 border-t flex justify-between items-center bg-black/20 ${colors.divider}`}
      >
        <div className={`text-[10px] flex gap-3 ${colors.textMuted}`}>
          <span>Ready to apply changes.</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${colors.textMuted} hover:${colors.text}`}
          >
            Discard Changes
          </button>
          <button
            onClick={onClose}
            className={`px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 active:scale-95 transition-all`}
          >
            {footerBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export function RenderSettingsModal({ onClose }: { onClose?: () => void }) {
  const [samples, setSamples] = useState(512);
  const [bounces, setBounces] = useState(4);
  const [gi, setGi] = useState(true);
  const [denoise, setDenoise] = useState(true);
  const [bloom, setBloom] = useState(15);
  const [motionBlur, setMotionBlur] = useState(false);

  return (
    <GenericSettingsModal
      title="Render Settings"
      subtitle="Configure output rendering quality and passes."
      onClose={onClose}
      footerBtn="Apply Render Settings"
    >
      <FormFieldRow label="Engine">
        <FormSelect
          options={[
            "Raytraced (Path Tracer)",
            "Rasterizer (Fast)",
            "Unlit (Albedo Only)",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="Max Samples">
        <div className="w-full">
          <Slider
            min={1}
            max={4096}
            value={samples}
            onChange={setSamples}
            displayValue={`${samples}`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Ray Bounces">
        <div className="w-full">
          <Slider
            min={1}
            max={32}
            value={bounces}
            onChange={setBounces}
            displayValue={`${bounces}`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Global Illumination">
        <div className="flex justify-end w-full">
          <FormToggle active={gi} onChange={setGi} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Denoise">
        <div className="flex justify-end w-full">
          <FormToggle active={denoise} onChange={setDenoise} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Bloom Intensity">
        <div className="w-full">
          <Slider
            min={0}
            max={100}
            value={bloom}
            onChange={setBloom}
            displayValue={`${bloom}%`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Motion Blur">
        <div className="flex justify-end w-full">
          <FormToggle active={motionBlur} onChange={setMotionBlur} />
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function CameraSettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  const [fov, setFov] = useState(90);
  const [aperture, setAperture] = useState(2.8);
  const [dof, setDof] = useState(true);

  return (
    <GenericSettingsModal
      title="Camera Settings"
      subtitle="Configure viewport optics and properties."
      onClose={onClose}
      footerBtn="Apply Camera Settings"
    >
      <FormFieldRow label="Lens Profile">
        <FormSelect
          options={["Standard (Default)", "Wide Angle", "Telephoto", "Macro"]}
        />
      </FormFieldRow>
      <FormFieldRow label="Focal Length">
        <div className="w-full pr-4 flex items-center gap-4">
          <FormInput value="50" className="max-w-24 text-center" />
          <span className={`text-sm ${colors.textMuted}`}>mm</span>
        </div>
      </FormFieldRow>
      <FormFieldRow label="Field of View">
        <div className="w-full">
          <Slider
            min={15}
            max={160}
            value={fov}
            onChange={setFov}
            displayValue={`${fov}°`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Aperture (f-stop)">
        <div className="w-full">
          <Slider
            min={1.2}
            max={22}
            value={aperture}
            onChange={setAperture}
            displayValue={`f/${aperture.toFixed(1)}`}
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Depth of Field">
        <div className="flex justify-end w-full">
          <FormToggle active={dof} onChange={setDof} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Clipping Planes">
        <div className="flex gap-4 w-full text-sm items-center">
          <span className={colors.textMuted}>Near</span>
          <FormInput value="0.01" className="flex-1" />
          <span className={colors.textMuted}>Far</span>
          <FormInput value="1000" className="flex-1" />
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function ImportSettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  return (
    <GenericSettingsModal
      title="Import Assets"
      subtitle="Import meshes, textures, and scene hierarchies."
      onClose={onClose}
      footerBtn="Start Import"
    >
      <FormFieldRow label="File Selection">
        <button
          className={`flex-1 w-full border border-dashed py-10 px-8 rounded-xl flex flex-col items-center gap-3 transition-colors hover:bg-white/5 ${colors.panelBorder}`}
        >
          <UploadCloud size={32} className={colors.textMuted} />
          <span className={`text-sm mt-2 ${colors.textMuted}`}>
            Drag & drop files here or{" "}
            <span className="text-white hover:underline">browse</span>
          </span>
        </button>
      </FormFieldRow>
      <FormFieldRow label="Mesh Types">
        <FormSelect
          options={[
            "All Supported (.fbx, .obj, .gltf)",
            "Autodesk FBX (.fbx)",
            "Wavefront OBJ (.obj)",
            "GL Transmission Format (.gltf)",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="Import Normals">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Scale Factor">
        <div className="w-full pr-4 flex items-center gap-4">
          <FormInput value="1.0" className="max-w-24 text-center" />
          <span className={`text-sm ${colors.textMuted}`}>x (Multiplier)</span>
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function TelemetrySettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  return (
    <GenericSettingsModal
      title="Telemetry & Notifications"
      subtitle="System resource overlay and alert preferences."
      onClose={onClose}
      footerBtn="Save Preferences"
    >
      <FormFieldRow label="Show FPS Overlay">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Show RAM Usage">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Scene Metadata">
        <div className="flex justify-end w-full">
          <FormToggle active={false} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <h3 className={`mt-8 mb-4 text-sm font-medium ${colors.text}`}>Alerts</h3>
      <FormFieldRow label="Baking Complete">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Render Finished">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Autosave Errors">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function InputSettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  return (
    <GenericSettingsModal
      title="Input & Keybindings"
      subtitle="Keyboard shortcuts, mouse sensitivity, and controls."
      onClose={onClose}
      footerBtn="Apply Control Strategy"
    >
      <FormFieldRow label="Navigation Style">
        <FormSelect options={["Maya / Unity", "Blender", "Unreal Engine"]} />
      </FormFieldRow>
      <FormFieldRow label="Mouse Sensitivity">
        <div className="w-full">
          <Slider
            min={1}
            max={100}
            value={50}
            onChange={() => {}}
            displayValue="50%"
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Invert Y Axis">
        <div className="flex justify-end w-full">
          <FormToggle active={false} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <h3 className={`mt-8 mb-4 text-sm font-medium ${colors.text}`}>
        Keybindings
      </h3>
      <FormFieldRow label="Select Tool">
        <FormInput value="Q" className="max-w-32 text-center uppercase" />
      </FormFieldRow>
      <FormFieldRow label="Translate Tool">
        <FormInput value="W" className="max-w-32 text-center uppercase" />
      </FormFieldRow>
      <FormFieldRow label="Rotate Tool">
        <FormInput value="E" className="max-w-32 text-center uppercase" />
      </FormFieldRow>
      <FormFieldRow label="Scale Tool">
        <FormInput value="R" className="max-w-32 text-center uppercase" />
      </FormFieldRow>
    </GenericSettingsModal>
  );
}

export function WorkspaceSettingsModal({ onClose }: { onClose?: () => void }) {
  const { colors } = useTheme();
  return (
    <GenericSettingsModal
      title="Display & Workspace"
      subtitle="Configure resolution, scaling, and viewport options."
      onClose={onClose}
      footerBtn="Apply Changes"
    >
      <FormFieldRow label="Resolution Scale">
        <FormSelect
          options={[
            "100% (Native)",
            "200% (Retina/HiDPI)",
            "75% (Performance)",
            "50% (Fast)",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="Viewport Framerate">
        <FormSelect
          options={[
            "60 FPS",
            "120 FPS (Smooth)",
            "30 FPS (Power Saving)",
            "Uncapped",
          ]}
        />
      </FormFieldRow>
      <FormFieldRow label="UI Scale">
        <div className="w-full">
          <Slider
            min={50}
            max={150}
            value={100}
            onChange={() => {}}
            displayValue="100%"
          />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Show Grid in Viewport">
        <div className="flex justify-end w-full">
          <FormToggle active={true} onChange={() => {}} />
        </div>
      </FormFieldRow>
      <FormFieldRow label="Anti-Aliasing">
        <FormSelect
          options={["TAA (Temporal)", "FXAA (Fast)", "MSAA 4x", "None"]}
        />
      </FormFieldRow>
    </GenericSettingsModal>
  );
}
