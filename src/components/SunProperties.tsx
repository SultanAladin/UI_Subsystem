import React, { useState, useRef } from 'react';
import { RotateCcw, Crosshair } from 'lucide-react';
import { useTheme } from '../theme.tsx';
import { SceneNode } from '../types.ts';

interface SunProps {
    node: SceneNode;
    updateNode: (id: string, changes: Partial<SceneNode>) => void;
}

const S1Slider = ({ label, value, unit, min, max, onChange, step = 1, colors }: any) => {
    const percent = ((value - min) / (max - min)) * 100;
    const trackRef = useRef<HTMLDivElement>(null);

    const handlePointer = (e: React.PointerEvent) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        let p = (e.clientX - rect.left) / rect.width;
        p = Math.max(0, Math.min(1, p));
        onChange(min + p * (max - min));
    };

    return (
        <div className="flex items-center justify-between py-1.5 touch-none gap-2">
            <span className={`text-[13px] font-medium ${colors.textMuted} w-[80px] shrink-0 truncate`}>{label}</span>
            <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border ${colors.panelBorder} w-[84px] shrink-0`}>
                <span className={`text-[13px] font-medium ${colors.text}`}>{typeof value === 'number' ? value.toFixed(step < 1 ? 2 : 0) : value}</span>
                <span className={`text-[11px] font-medium opacity-50 ${colors.textMuted}`}>{unit || 'u'}</span>
            </div>
            <div 
                ref={trackRef}
                className={`relative flex-1 h-7 rounded-lg cursor-pointer bg-black/10 dark:bg-white/10`}
                onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    handlePointer(e);
                }}
                onPointerMove={(e) => {
                    if (e.buttons > 0) handlePointer(e);
                }}
            >
                <div className="absolute top-0 bottom-0 left-0 bg-black/20 dark:bg-white/20 rounded-l-lg" style={{ width: `${percent}%` }} />
                <div className="absolute top-1 bottom-1 w-3.5 bg-white dark:bg-[#e5e5e5] rounded shadow-sm pointer-events-none" style={{ left: `calc(${percent}% - 7px)`, transform: 'translateX(-50%)', marginLeft: '7px' }} />
            </div>
        </div>
    );
};

const HorizontalTapeSlider = ({ value, min, max, onChange, wrap = true, label, colors }: any) => {
    const handleDrag = (e: React.PointerEvent) => {
        const startX = e.clientX;
        const startVal = value;
        const target = e.currentTarget;
        target.setPointerCapture(e.pointerId);
        
        const onMove = (me: React.PointerEvent) => {
            const delta = me.clientX - startX;
            let newVal = startVal - delta * 0.5;
            if (wrap) {
                if (newVal > max) newVal -= (max - min);
                if (newVal < min) newVal += (max - min);
            } else {
                newVal = Math.max(min, Math.min(max, newVal));
            }
            onChange(newVal);
        };
        
        target.onpointermove = (me: any) => onMove(me);
        target.onpointerup = () => {
            target.onpointermove = null;
            target.onpointerup = null;
            target.releasePointerCapture(e.pointerId);
        };
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center select-none touch-none">
            <div 
                className="w-full h-8 bg-black/5 dark:bg-[#1C1C1E] overflow-hidden cursor-grab active:cursor-grabbing relative"
                onPointerDown={handleDrag}
            >
                <div className="absolute inset-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                    <div className="absolute inset-0 flex items-end pb-[4px] justify-center" style={{ transform: `translateX(${(value%10) * -6}px)` }}>
                        {Array.from({length: 81}).map((_, i) => {
                            const isTenth = i % 10 === 0;
                            return (
                                <div key={i} className={`w-[1px] absolute ${isTenth ? 'h-3 bg-black/40 dark:bg-white/40' : 'h-1.5 bg-black/20 dark:bg-white/20'}`} style={{ left: `calc(50% + ${(i - 40) * 6}px)` }} />
                            );
                        })}
                    </div>
                    <div className="absolute top-[4px] bottom-[4px] left-1/2 w-[1.5px] bg-[#f87171] -translate-x-1/2 pointer-events-none z-10" />
                </div>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
                <span className={`font-mono text-[11px] font-bold ${colors.text}`}>{Math.round(value)}°</span>
                <span className={`text-[9px] uppercase tracking-wider font-semibold ${colors.textMuted}`}>{label}</span>
            </div>
        </div>
    );
};

const VerticalTapeSlider = ({ value, min, max, onChange, wrap = true, label, colors }: any) => {
    const handleDrag = (e: React.PointerEvent) => {
        const startY = e.clientY;
        const startVal = value;
        const target = e.currentTarget;
        target.setPointerCapture(e.pointerId);
        
        const onMove = (me: React.PointerEvent) => {
            const delta = me.clientY - startY;
            let newVal = startVal - delta * 0.5; // Dragging up (negative delta) increases value
            if (wrap) {
                if (newVal > max) newVal -= (max - min);
                if (newVal < min) newVal += (max - min);
            } else {
                newVal = Math.max(min, Math.min(max, newVal));
            }
            onChange(newVal);
        };
        
        target.onpointermove = (me: any) => onMove(me);
        target.onpointerup = () => {
            target.onpointermove = null;
            target.onpointerup = null;
            target.releasePointerCapture(e.pointerId);
        };
    };

    return (
        <div className="w-full h-full flex items-center justify-center select-none touch-none">
            <div className="flex flex-col items-center mr-1.5 gap-1.5" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                <span className={`font-mono text-[11px] font-bold ${colors.text}`}>{Math.round(value)}°</span>
                <span className={`text-[9px] uppercase tracking-wider font-semibold ${colors.textMuted}`}>{label}</span>
            </div>
            <div 
                className="w-8 h-full bg-black/5 dark:bg-[#1C1C1E] overflow-hidden cursor-grab active:cursor-grabbing relative"
                onPointerDown={handleDrag}
            >
                <div className="absolute inset-0 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: `translateY(${(value%10) * 6}px)` }}>
                        {Array.from({length: 81}).map((_, i) => {
                            const isTenth = i % 10 === 0;
                            return (
                                <div key={i} className={`h-[1px] absolute ${isTenth ? 'w-3 bg-black/40 dark:bg-white/40' : 'w-1.5 bg-black/20 dark:bg-white/20'} left-1/2 -translate-x-1/2`} style={{ top: `calc(50% - ${(i - 40) * 6}px)` }} />
                            );
                        })}
                    </div>
                    <div className="absolute left-[4px] right-[4px] top-1/2 h-[1.5px] bg-[#f87171] -translate-y-1/2 pointer-events-none z-10" />
                </div>
            </div>
        </div>
    );
};

const SkyDomeViewer = ({ elevation, azimuth, setElevation, setAzimuth, colors }: any) => {
    const domeRef = useRef<HTMLDivElement>(null);
    const cx = 50;
    const cy = 50;
    const maxR = 40; 
    const rad = maxR * (1 - Math.max(0, Math.min(90, elevation)) / 90);
    const azRad = (azimuth - 90) * (Math.PI / 180);
    
    const sunX = cx + rad * Math.cos(azRad);
    const sunY = cy + rad * Math.sin(azRad);

    const handlePointer = (e: React.PointerEvent) => {
        if (!domeRef.current) return;
        const rect = domeRef.current.getBoundingClientRect();
        
        const percentX = ((e.clientX - rect.left) / rect.width) * 100;
        const percentY = ((e.clientY - rect.top) / rect.height) * 100;
        
        const dx = percentX - cx;
        const dy = percentY - cy;
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        const cappedDistance = Math.min(distance, maxR);
        
        const newElevation = 90 * (1 - cappedDistance / maxR);
        setElevation(Math.max(0, Math.min(90, newElevation)));

        if (distance > 0) {
             let newAzimuth = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
             if (newAzimuth < 0) newAzimuth += 360;
             setAzimuth(newAzimuth % 360);
        }
    };

    return (
        <div className="flex justify-center items-center h-full w-full relative" 
             ref={domeRef} 
             onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handlePointer(e); }}
             onPointerMove={(e) => { if (e.buttons > 0) handlePointer(e); }}
             style={{ cursor: 'crosshair', touchAction: 'none' }}>
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center pointer-events-none`}>
                <div className={`w-full h-px absolute ${colors.panelBorder}`} />
                <div className={`h-full w-px absolute ${colors.panelBorder}`} />
                <div className={`absolute inset-2.5 rounded-full border ${colors.panelBorder} opacity-50`} />
                <div className={`absolute inset-6 rounded-full border ${colors.panelBorder} opacity-30`} />
                
                <div 
                    className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_12px_rgba(250,204,21,0.8)] z-10 transition-all duration-75"
                    style={{ left: `${sunX}%`, top: `${sunY}%`, transform: 'translate(-50%, -50%)' }}
                />
                
                <Crosshair size={14} className={`absolute ${colors.text} opacity-30`} />
                
                <span className={`absolute -top-5 text-[10px] font-bold ${colors.textMuted}`}>N</span>
                <span className={`absolute -right-5 text-[10px] font-bold ${colors.textMuted}`}>E</span>
                <span className={`absolute -bottom-5 text-[10px] font-bold ${colors.textMuted}`}>S</span>
                <span className={`absolute -left-5 text-[10px] font-bold ${colors.textMuted}`}>W</span>
            </div>
        </div>
    );
};

export function SunProperties({ node, updateNode }: SunProps) {
    const { colors } = useTheme();

    const [elevation, setElevation] = useState(45);
    const [azimuth, setAzimuth] = useState(180);
    const [intensity, setIntensity] = useState(1.5);
    const [ambient, setAmbient] = useState(0.5);
    const [enableIbl, setEnableIbl] = useState(true);
    const [iblIntensity, setIblIntensity] = useState(1.0);

    const [activeTab, setActiveTab] = useState<'sun' | 'ibl'>('sun');

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
             <div className="flex items-center gap-5 border-b border-black/10 dark:border-white/10">
                 <button 
                    className={`pb-3 text-[13px] font-semibold transition-colors relative ${activeTab === 'sun' ? colors.text : colors.textMuted}`}
                    onClick={() => setActiveTab('sun')}
                 >
                     Sun Parameters
                     {activeTab === 'sun' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white rounded-t-full" />}
                 </button>
                 <button 
                    className={`pb-3 text-[13px] font-semibold transition-colors relative ${activeTab === 'ibl' ? colors.text : colors.textMuted}`}
                    onClick={() => setActiveTab('ibl')}
                 >
                     IBL Parameters
                     {activeTab === 'ibl' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white rounded-t-full" />}
                 </button>
             </div>

             {activeTab === 'sun' ? (
                 <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                     <div className="bg-black/5 dark:bg-[#141415] border border-black/10 dark:border-white/5 rounded-2xl p-4 flex flex-col shadow-sm">
                         <span className={`text-[12px] font-medium ${colors.text} mb-2`}>Directional</span>
                         <div className={`w-full h-px border-t border-black/10 dark:border-white/5 mb-2`} />
                         <span className={`text-[11px] ${colors.textMuted} mb-2`}>Control the sun's position and angle in the sky.</span>
                         <div className={`w-full h-px border-t border-black/10 dark:border-white/5 mb-4`} />
                         <div className="grid grid-cols-[1fr_64px] grid-rows-[1fr_48px] gap-2 h-48">
                             <div className="row-start-1 col-start-1 flex items-center justify-center relative">
                                 <SkyDomeViewer elevation={elevation} azimuth={azimuth} setElevation={setElevation} setAzimuth={setAzimuth} colors={colors} />
                             </div>
                             <div className="row-start-1 col-start-2 relative">
                                 <VerticalTapeSlider value={elevation} min={0} max={90} onChange={(v: number) => setElevation(Math.max(0, Math.min(90, v)))} wrap={false} label="Elevation" colors={colors} />
                             </div>
                             <div className="row-start-2 col-start-1 relative">
                                 <HorizontalTapeSlider value={azimuth} min={0} max={360} onChange={setAzimuth} wrap={true} label="Azimuth" colors={colors} />
                             </div>
                         </div>
                     </div>

                     <div className="bg-black/5 dark:bg-[#141415] border border-black/10 dark:border-white/5 rounded-2xl p-4 flex flex-col shadow-sm">
                         <span className={`text-[12px] font-medium ${colors.text} mb-2`}>Sun Parameters</span>
                         <div className={`w-full h-px border-t border-black/10 dark:border-white/5 mb-2`} />
                         <span className={`text-[11px] ${colors.textMuted} mb-2`}>Adjust the direct light intensity and ambient level.</span>
                         <div className={`w-full h-px border-t border-black/10 dark:border-white/5 mb-4`} />
                         <div className="flex flex-col gap-2">
                             <S1Slider label="Intensity" value={intensity} unit="u" min={0} max={4.0} step={0.1} onChange={setIntensity} colors={colors} />
                             <S1Slider label="Ambient" value={ambient} unit="u" min={0} max={1.0} step={0.01} onChange={setAmbient} colors={colors} />
                         </div>
                     </div>
                 </div>
             ) : (
                 <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                     <div className="bg-black/5 dark:bg-[#141415] border border-black/10 dark:border-white/5 rounded-2xl p-4 flex flex-col shadow-sm">
                         <span className={`text-[12px] font-medium ${colors.text} mb-2`}>Image Based Lighting</span>
                         <div className={`w-full h-px border-t border-black/10 dark:border-white/5 mb-2`} />
                         <span className={`text-[11px] ${colors.textMuted} mb-2`}>Environment lighting from a captured skybox or HDRi.</span>
                         <div className={`w-full h-px border-t border-black/10 dark:border-white/5 mb-4`} />
                         <div className="flex flex-col gap-2">
                             <div className="flex items-center justify-between py-1.5 touch-none gap-2">
                                <span className={`text-[13px] font-medium ${colors.textMuted} w-[80px]`}>Enable IBL</span>
                                <button 
                                    className={`w-11 h-6 rounded-full relative transition-colors ${enableIbl ? 'bg-black/20 dark:bg-white/20' : 'bg-black/10 dark:bg-white/10'}`}
                                    onClick={() => setEnableIbl(!enableIbl)}
                                >
                                    <div className={`absolute top-[2px] bottom-[2px] w-[20px] rounded-full transition-all shadow-sm ${enableIbl ? 'left-[22px] bg-white dark:bg-[#e5e5e5]' : 'left-[2px] bg-white/80 dark:bg-white/50'}`} />
                                </button>
                                <div className="flex-1" />
                             </div>
        
                             <S1Slider label="Intensity" value={iblIntensity} unit="u" min={0} max={4.0} step={0.1} onChange={setIblIntensity} colors={colors} />
                         </div>
                     </div>
                 </div>
             )}
        </div>
    );
}

