import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Filter, Plus, X, Search, ListTree, List, LayoutGrid, Eye, EyeOff, Lock, Unlock, ChevronDown, ChevronRight, Check } from 'lucide-react';
import { useTheme } from '../theme.tsx';
import { SceneNode, flattenItems } from '../sceneState.ts';

interface OutlinerPanelProps {
  selectedItemId: string;
  setSelectedItemId: (id: string) => void;
  sceneItems: SceneNode[];
  updateNode: (id: string, changes: Partial<SceneNode>) => void;
  onAddFolder: () => void;
}

const getIcon = (name: string) => {
  return (Icons as any)[name] || Icons.HelpCircle;
};

export function OutlinerPanel({ selectedItemId, setSelectedItemId, sceneItems, updateNode, onAddFolder }: OutlinerPanelProps) {
  const { colors, cornerRadius, accentColor } = useTheme();
  
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'scene': true,
    'geometry': true,
    'car': true,
    'env': false,
  });

  const [viewMode, setViewMode] = useState<'tree' | 'list' | 'grid'>('tree');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Meshes' | 'Lights' | 'Folders'>('All');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const typeFilterRef = useRef<HTMLDivElement>(null);
  
  const [availableFilters, setAvailableFilters] = useState(['Lights', 'Meshes', 'Cameras', 'Hidden']);
  const [activeFilters, setActiveFilters] = useState(['Environment', 'Visible']);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target as Node)) {
        setShowTypeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFolder = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Use the global state for openness instead of local state
    const node = flattenItems(sceneItems, true).find(n => n.id === id);
    if (node) updateNode(id, { isOpen: !node.isOpen });
  };

  const addFilter = (filter: string) => {
    setActiveFilters([...activeFilters, filter]);
    setAvailableFilters(availableFilters.filter(f => f !== filter));
    setShowFilterDropdown(false);
  };

  const removeFilter = (filter: string) => {
    setAvailableFilters([...availableFilters, filter]);
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const matchesTypeFilter = (item: SceneNode) => {
    if (typeFilter === 'All') return true;
    if (typeFilter === 'Meshes' && item.type === 'mesh') return true;
    if (typeFilter === 'Lights' && item.type === 'light') return true;
    if (typeFilter === 'Folders' && item.type === 'folder') return true;
    return item.type === 'scene'; // Scene always visible to hold structure
  };

  const renderTree = (items: SceneNode[], depth: number = 0) => {
    return items.map(item => {
      const isFolder = item.type === 'folder' || item.type === 'scene';
      const isExpanded = item.isOpen !== false;
      const isActive = selectedItemId === item.id;
      const IconComp = getIcon(item.icon);
      
      const searchMatch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const typeMatch = matchesTypeFilter(item);
      const isVisible = searchMatch && typeMatch;

      // For folders, we still want to show them if they contain a match
      let hasVisibleChild = false;
      if (item.children) {
        const flatChildren = flattenItems(item.children, true);
        hasVisibleChild = flatChildren.some(child => 
           (!searchQuery || child.name.toLowerCase().includes(searchQuery.toLowerCase())) && matchesTypeFilter(child)
        );
      }

      if (!isVisible && !hasVisibleChild) {
        return null; // hide entirely if no children match either
      }

      return (
        <div key={item.id}>
          {isVisible && (
          <div 
             className={`group flex items-center justify-between py-1.5 px-2 cursor-pointer transition-colors ${isActive ? colors.activeBg : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
             style={{ borderRadius: cornerRadius * 0.5, marginLeft: depth * 16 }}
             onClick={() => {
               setSelectedItemId(item.id);
               if (isFolder) toggleFolder(item.id);
             }}
          >
             <div className="flex items-center gap-1.5">
                {isFolder ? (
                  <button className={`p-0.5 rounded-sm hover:bg-black/10 dark:hover:bg-white/10 ${colors.textMuted}`} onClick={(e) => toggleFolder(item.id, e)}>
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                ) : (
                  <div className="w-[18px]"></div>
                )}
                <IconComp size={15} color={item.color || 'currentColor'} className={!item.color ? (item.type === 'scene' ? 'text-blue-500' : colors.textMuted) : ''} />
                <span className={`text-[13px] font-medium ${isActive ? colors.text : colors.textMuted} ${item.isHidden ? 'opacity-50' : ''}`}>{item.name}</span>
             </div>
             {item.type !== 'scene' && (
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={(e) => { e.stopPropagation(); updateNode(item.id, { isLocked: !item.isLocked }); }}
                     className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-all outline-none`}
                   >
                     {item.isLocked ? <Lock size={13} className={colors.textMuted} /> : <Unlock size={13} className={colors.textMuted} />}
                   </button>
                   <button 
                     onClick={(e) => { e.stopPropagation(); updateNode(item.id, { isHidden: !item.isHidden }); }}
                     className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-all outline-none`}
                   >
                     {item.isHidden ? <EyeOff size={13} className={colors.textMuted} /> : <Eye size={13} className={isActive ? colors.text : colors.textMuted} />}
                   </button>
                </div>
             )}
          </div>
          )}
          {isFolder && isExpanded && item.children && (
             <div className="mb-0.5 relative">
               <div className={`absolute left-[7px] top-0 bottom-0 w-px ${colors.divider} border-l`} style={{ opacity: 0.5 }}></div>
               {renderTree(item.children, isVisible ? depth + 1 : depth)}
             </div>
          )}
        </div>
      );
    });
  };

  const renderFlatList = () => {
    const items = flattenItems(sceneItems, false).filter(item => {
       const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
       return searchMatch && matchesTypeFilter(item);
    });
    
    return items.map(item => {
      const isActive = selectedItemId === item.id;
      const IconComp = getIcon(item.icon);
      return (
        <div 
           key={item.id}
           className={`group flex items-center justify-between py-2 px-3 cursor-pointer mb-1 transition-colors ${isActive ? colors.activeBg : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
           style={{ borderRadius: cornerRadius * 0.5 }}
           onClick={() => setSelectedItemId(item.id)}
        >
           <div className="flex items-center gap-3">
              <IconComp size={16} color={item.color || 'currentColor'} className={!item.color ? colors.textMuted : ''} />
              <span className={`text-sm font-medium ${isActive ? colors.text : colors.textMuted} ${item.isHidden ? 'opacity-50' : ''}`}>{item.name}</span>
           </div>
           <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 onClick={(e) => { e.stopPropagation(); updateNode(item.id, { isLocked: !item.isLocked }); }}
                 className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-all outline-none`}
               >
                 {item.isLocked ? <Lock size={14} className={colors.textMuted} /> : <Unlock size={14} className={colors.textMuted} />}
               </button>
               <button 
                 onClick={(e) => { e.stopPropagation(); updateNode(item.id, { isHidden: !item.isHidden }); }}
                 className={`p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-all outline-none`}
               >
                 {item.isHidden ? <EyeOff size={14} className={colors.textMuted} /> : <Eye size={14} className={isActive ? colors.text : colors.textMuted} />}
               </button>
           </div>
        </div>
      );
    });
  };

  const renderGrid = () => {
    const items = flattenItems(sceneItems, false).filter(item => {
       const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
       return searchMatch && matchesTypeFilter(item);
    });
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {items.map(item => {
          const isActive = selectedItemId === item.id;
          const IconComp = getIcon(item.icon);
          return (
            <div 
               key={item.id}
               className={`group flex flex-col items-center justify-center p-3 cursor-pointer transition-colors border ${isActive ? `${colors.activeBg} ${colors.panelBorder}` : `border-transparent hover:bg-black/5 dark:hover:bg-white/5`} ${item.isHidden ? 'opacity-50' : ''}`}
               style={{ borderRadius: cornerRadius * 0.7 }}
               onClick={() => setSelectedItemId(item.id)}
            >
               <IconComp size={24} color={item.color || 'currentColor'} className={`mb-2 ${!item.color ? colors.textMuted : ''}`} />
               <span className={`text-[11px] font-medium text-center truncate w-full ${isActive ? colors.text : colors.textMuted}`}>{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const totalObjects = flattenItems(sceneItems, false).length;

  return (
    <div 
      className={`w-[360px] h-full flex flex-col border-r shadow-xl z-20 ${colors.panelBg} ${colors.panelBorder}`}
    >
      <div className={`p-4 border-b ${colors.divider} flex flex-col gap-4 shrink-0`}>
         
         <div className="flex items-center gap-2">
            <button className={`flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium rounded-full ${colors.inputBg} ${colors.text} border ${colors.panelBorder}`}>
               <Filter size={12} className={colors.textMuted} /> Scene
            </button>
         </div>

         <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
               <button 
                 onClick={onAddFolder}
                 className={`w-8 h-8 rounded-full border ${colors.panelBorder} flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 ${colors.text} transition-colors`}
               >
                  <Plus size={16} />
               </button>
               <button 
                 onClick={() => {}}
                 className={`w-8 h-8 rounded-full border ${colors.panelBorder} flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 ${colors.text} transition-colors`}
               >
                  <Filter size={14} />
               </button>
            </div>
            
            <div className={`p-1 rounded-full border flex ${colors.panelBorder} ${colors.inputBg}`}>
               <button 
                 onPointerDown={() => setViewMode('tree')} 
                 className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${viewMode === 'tree' ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white' : `${colors.textMuted} hover:text-black dark:hover:text-white`}`}
               >
                  <ListTree size={14} />
               </button>
               <button 
                 onPointerDown={() => setViewMode('list')} 
                 className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white' : `${colors.textMuted} hover:text-black dark:hover:text-white`}`}
               >
                  <List size={14} />
               </button>
               <button 
                 onPointerDown={() => setViewMode('grid')} 
                 className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white' : `${colors.textMuted} hover:text-black dark:hover:text-white`}`}
               >
                  <LayoutGrid size={14} />
               </button>
            </div>
         </div>

         <div className="flex items-center gap-2 mt-1">
            <div className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors.panelBorder} ${colors.inputBg}`}>
               <Search size={14} className={colors.textMuted} />
               <input 
                 type="text" 
                 placeholder="Filter scene..." 
                 className={`bg-transparent outline-none text-[13px] w-full ${colors.text} placeholder:opacity-50`}
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            
            <div className="relative" ref={typeFilterRef}>
               <button 
                 onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                 className={`px-4 py-1.5 text-[13px] font-medium rounded-full border ${colors.panelBorder} ${colors.inputBg} ${colors.text} flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
               >
                 {typeFilter === 'All' ? 'Objects' : typeFilter} <ChevronDown size={14} className={colors.textMuted} />
               </button>
               {showTypeDropdown && (
                 <div className={`absolute top-full right-0 mt-1 py-1 w-32 border shadow-lg z-50 ${colors.panelBg} ${colors.panelBorder}`} style={{ borderRadius: cornerRadius * 0.5 }}>
                   {['All', 'Meshes', 'Lights', 'Folders'].map(opt => (
                     <button
                       key={opt}
                       className={`w-full text-left px-3 py-1.5 text-[13px] font-medium flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 ${colors.text}`}
                       onClick={() => { setTypeFilter(opt as any); setShowTypeDropdown(false); }}
                     >
                       {opt}
                       {typeFilter === opt && <Check size={14} />}
                     </button>
                   ))}
                 </div>
               )}
            </div>
         </div>

         {/* Active Filters as requested - displaying with 'x' and dropdown for adding */}
         <div className="flex items-center gap-2 flex-wrap">
            <div className="relative" ref={filterRef}>
               <button 
                 onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                 className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${colors.panelBorder} hover:bg-black/5 dark:hover:bg-white/5 ${colors.text} transition-colors`}
               >
                  <Plus size={12} /> Add Filter
               </button>
               {showFilterDropdown && availableFilters.length > 0 && (
                 <div className={`absolute top-full left-0 mt-1 py-1 w-32 border shadow-lg z-50 ${colors.panelBg} ${colors.panelBorder}`} style={{ borderRadius: cornerRadius * 0.5 }}>
                   {availableFilters.map(filter => (
                     <button
                       key={filter}
                       className={`w-full text-left px-3 py-1.5 text-[13px] font-medium hover:bg-black/5 dark:hover:bg-white/5 ${colors.text}`}
                       onClick={() => addFilter(filter)}
                     >
                       {filter}
                     </button>
                   ))}
                 </div>
               )}
            </div>
            
            {activeFilters.map(filter => (
               <div key={filter} className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-black/10 dark:bg-white/10 ${colors.text}`}>
                  {filter} 
                  <button onClick={() => removeFilter(filter)} className="hover:text-red-500 opacity-70 hover:opacity-100 transition-colors">
                     <X size={12} />
                  </button>
               </div>
            ))}
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
        {viewMode === 'tree' && renderTree(sceneItems)}
        {viewMode === 'list' && renderFlatList()}
        {viewMode === 'grid' && renderGrid()}
      </div>

      <div className={`p-3 border-t ${colors.divider} flex items-center justify-between shrink-0`}>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className={`text-xs font-medium ${colors.textMuted}`}>Live</span>
         </div>
         <span className={`text-xs font-medium ${colors.textMuted}`}>{totalObjects} objects</span>
      </div>
    </div>
  );
}

