import React from 'react';
import { Sliders, MoreHorizontal, LayoutGrid, BoxIcon, Cloud, Settings2, Scaling, ArrowRightLeft, Folder, ToggleLeft, ToggleRight } from 'lucide-react';
import { useTheme } from '../theme.tsx';
import { Slider } from './SharedUI.tsx';
import { SceneNode, findNode } from '../sceneState.ts';
import { SunProperties } from './SunProperties.tsx';

interface PropertiesPanelProps {
  selectedItemId: string;
  sceneItems: SceneNode[];
  updateNode: (id: string, changes: Partial<SceneNode>) => void;
}

const COMMON_ICONS = ['Box', 'Folder', 'Cloud', 'Sun', 'Moon', 'Droplets', 'Trees', 'Mountain', 'Circle', 'Triangle', 'Star'];

export function PropertiesPanel({ selectedItemId, sceneItems, updateNode }: PropertiesPanelProps) {
  const { colors, cornerRadius, accentColor } = useTheme();

  const node = findNode(sceneItems, selectedItemId);

  const getPropertiesData = () => {
    if (!node) return <div className={`p-4 text-center text-sm ${colors.textMuted}`}>Item not found</div>;

    // Use specialized sun properties panel
    if (node.id === 'sun') {
      return (
        <div className="mb-8">
           {/* Common header */}
           <div className="flex items-center justify-between mb-6">
              <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>Sun Setup</span>
              <Cloud size={14} className={colors.textMuted} />
           </div>
           
           <div className="space-y-3 mb-6">
               <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${colors.text}`}>Name</span>
               </div>
               <input 
                 type="text" 
                 value={node.name}
                 onChange={(e) => updateNode(node.id, { name: e.target.value })}
                 className={`w-full p-2 text-sm border outline-none ${colors.inputBg} ${colors.panelBorder} ${colors.text}`}
                 style={{ borderRadius: cornerRadius * 0.6 }}
               />
           </div>
           <div className={`w-full h-px ${colors.divider} mb-6`} />

           <SunProperties node={node} updateNode={updateNode} />
        </div>
      );
    }

    const isEnv = ['light', 'volume'].includes(node.type);
    const isFolder = node.type === 'folder' || node.type === 'scene';

    return (
      <div className="space-y-8 animate-in fade-in duration-200">
         <div className="space-y-4">
             <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>
                   {node.type === 'scene' ? 'Scene Settings' : node.type === 'folder' ? 'Folder Properties' : isEnv ? 'Environment Settings' : 'Object Properties'}
                </span>
                {isFolder ? <Folder size={14} className={colors.textMuted} /> : isEnv ? <LayoutGrid size={14} className={colors.textMuted} /> : <BoxIcon size={14} className={colors.textMuted} />}
             </div>
             
             <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${colors.text}`}>Name</span>
                 </div>
                 <input 
                   type="text" 
                   value={node.name}
                   onChange={(e) => updateNode(node.id, { name: e.target.value })}
                   className={`w-full p-2 text-sm border outline-none ${colors.inputBg} ${colors.panelBorder} ${colors.text}`}
                   style={{ borderRadius: cornerRadius * 0.6 }}
                 />
             </div>

             <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${colors.text}`}>Icon</span>
                 </div>
                 <div className="flex gap-2 flex-wrap">
                    {COMMON_ICONS.map(i => (
                       <button
                         key={i}
                         onClick={() => updateNode(node.id, { icon: i })}
                         className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${node.icon === i ? `${colors.activeBg} ${colors.panelBorder} ${colors.text}` : `border-transparent ${colors.textMuted} hover:bg-black/5 dark:hover:bg-white/5`}`}
                       >
                         {i}
                       </button>
                    ))}
                 </div>
             </div>
             
             {node.type !== 'scene' && (
             <div className="space-y-3 pt-2 flex items-center justify-between">
                 <span className={`text-sm font-medium ${colors.text}`}>Visibility</span>
                 <button 
                   onClick={() => updateNode(node.id, { isHidden: !node.isHidden })}
                   className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${!node.isHidden ? 'bg-green-500/10 text-green-500' : 'bg-black/10 dark:bg-white/10 text-gray-500'}`}
                 >
                   {!node.isHidden ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                   {!node.isHidden ? 'Visible' : 'Hidden'}
                 </button>
             </div>
             )}

             {node.type !== 'scene' && (
             <div className="space-y-3 pt-2 flex items-center justify-between">
                 <span className={`text-sm font-medium ${colors.text}`}>Editing</span>
                 <button 
                   onClick={() => updateNode(node.id, { isLocked: !node.isLocked })}
                   className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${node.isLocked ? 'bg-red-500/10 text-red-500' : 'bg-black/10 dark:bg-white/10 text-gray-500'}`}
                 >
                   {node.isLocked ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                   {node.isLocked ? 'Locked' : 'Unlocked'}
                 </button>
             </div>
             )}
         </div>

         {isEnv && (
           <>
             <div className={`w-full h-px ${colors.divider}`} />
             <div className="space-y-4">
                 <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${colors.text}`}>Color Base</span>
                     </div>
                     <div className="flex gap-2">
                        <input 
                          type="color"
                          value={node.color || '#ffffff'}
                          onChange={(e) => updateNode(node.id, { color: e.target.value })}
                          className={`w-10 h-10 p-0 border shadow-sm outline-none cursor-pointer ${colors.panelBorder}`} 
                          style={{ borderRadius: cornerRadius * 0.5 }} 
                        />
                        <div 
                          className={`flex-1 flex items-center px-3 border border-transparent shadow-sm text-xs font-mono uppercase ${colors.text} ${colors.inputBg}`} 
                          style={{ borderRadius: cornerRadius * 0.5 }}
                        >
                           {node.color || '#FFFFFF'}
                        </div>
                     </div>
                 </div>

                 <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${colors.text}`}>Intensity</span>
                        <span className={`text-xs ${colors.textMuted}`}>1.5x</span>
                     </div>
                     <Slider min={0} max={5} value={1.5} onChange={() => {}} />
                 </div>
             </div>
           </>
         )}

         {node.type === 'mesh' && (
           <>
             <div className={`w-full h-px ${colors.divider}`} />
             <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${colors.textMuted}`}>Transform</span>
                 </div>

                 <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-red-500">
                          <span>X Pos</span>
                        </div>
                        <span className={`text-xs ${colors.textMuted}`}>0.0 m</span>
                     </div>
                     <Slider min={-10} max={10} value={0} onChange={() => {}} />
                 </div>

                 <div className="space-y-3 pt-2">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-green-500">
                          <span>Y Pos</span>
                        </div>
                        <span className={`text-xs ${colors.textMuted}`}>0.0 m</span>
                     </div>
                     <Slider min={-10} max={10} value={0} onChange={() => {}} />
                 </div>

                 <div className="space-y-3 pt-2">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-blue-500">
                          <span>Z Pos</span>
                        </div>
                        <span className={`text-xs ${colors.textMuted}`}>0.0 m</span>
                     </div>
                     <Slider min={-10} max={10} value={0} onChange={() => {}} />
                 </div>
             </div>
           </>
         )}
      </div>
    );
  };

  return (
    <div 
      className={`w-[360px] h-full flex flex-col border-l shadow-xl z-20 ${colors.panelBg} ${colors.panelBorder}`}
    >
      <div className={`p-4 border-b ${colors.divider} flex items-center justify-between shrink-0`}>
         <div className="flex items-center gap-2">
            <Sliders size={16} className={colors.text} />
            <h2 className={`text-sm font-semibold tracking-tight ${colors.text}`}>Properties</h2>
         </div>
         <button className={`p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors ${colors.textMuted}`}>
            <MoreHorizontal size={14} />
         </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
         {getPropertiesData()}
      </div>
    </div>
  );
}
