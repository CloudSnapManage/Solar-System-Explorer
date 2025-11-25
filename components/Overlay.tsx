import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Settings, Info, Search, User, 
  ChevronRight, Layers, Eye, Play, Pause, 
  Maximize, RefreshCw, Compass
} from 'lucide-react';
import { PlanetData, AppSettings } from '../types';
import { SOLAR_SYSTEM_DATA } from '../constants';

interface OverlayProps {
  selectedPlanet: PlanetData | null;
  onClosePanel: () => void;
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  isTourMode: boolean;
  onToggleTour: () => void;
  onNavigateTour: (direction: 'next' | 'prev') => void;
}

const Overlay: React.FC<OverlayProps> = ({ 
  selectedPlanet, 
  onClosePanel, 
  settings, 
  onUpdateSettings,
  isTourMode,
  onToggleTour,
  onNavigateTour
}) => {
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Components ---

  const NavButton = ({ icon: Icon, label, onClick, active }: any) => (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl backdrop-blur-md transition-all duration-200 group relative flex items-center justify-center
        ${active ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 hover:border-white/20'}`}
    >
      <Icon size={20} strokeWidth={1.5} />
      <span className="absolute left-14 bg-black/80 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
        {label}
      </span>
    </button>
  );

  const ToggleSwitch = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-gray-300">{label}</span>
      <button 
        onClick={onChange}
        className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${checked ? 'bg-blue-600' : 'bg-gray-700'}`}
      >
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  // --- Render ---

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
      
      {/* Top Navigation Bar */}
      <div className="pointer-events-auto w-full h-16 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <h1 className="font-display font-bold text-lg tracking-wider">SOLAR<span className="text-blue-500">EXPLORER</span></h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button className="hover:text-white transition-colors">Home</button>
          <button className="hover:text-white transition-colors text-white">Simulation</button>
          <button className="hover:text-white transition-colors">Planets</button>
          <button className="hover:text-white transition-colors">Encyclopedia</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex px-3 py-1.5 bg-white/5 rounded-full border border-white/10 items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>v1.0.4 Prototype</span>
          </div>
          <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden pointer-events-auto bg-[#0a0a0f] border-b border-white/10 overflow-hidden z-30"
          >
             <div className="flex flex-col p-4 gap-4 text-gray-300">
                <button className="text-left py-2 border-b border-white/5">Home</button>
                <button className="text-left py-2 border-b border-white/5">Simulation</button>
                <button className="text-left py-2 border-b border-white/5">Settings</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area (Layout) */}
      <div className="flex-1 flex relative overflow-hidden">
        
        {/* Left Toolbar */}
        <div className="pointer-events-auto hidden md:flex flex-col gap-4 p-4 z-10 w-20 items-center h-full justify-center">
           <NavButton 
             icon={Layers} 
             label="Visual Layers" 
             onClick={() => setIsLayersOpen(!isLayersOpen)} 
             active={isLayersOpen} 
           />
           <NavButton 
             icon={Compass} 
             label="Start Tour" 
             onClick={onToggleTour} 
             active={isTourMode}
           />
           <NavButton 
             icon={Settings} 
             label="Settings" 
             onClick={() => setIsSettingsOpen(true)} 
           />
           <div className="h-px w-8 bg-white/10 my-2" />
           <NavButton icon={RefreshCw} label="Reset Camera" onClick={() => {}} />
        </div>

        {/* Layers Pop-out Menu */}
        <AnimatePresence>
          {isLayersOpen && (
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="pointer-events-auto absolute left-24 top-1/2 -translate-y-1/2 w-64 bg-[#0F1014]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-20"
             >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm font-bold text-blue-400 uppercase tracking-widest">View Options</h3>
                  <button onClick={() => setIsLayersOpen(false)} className="text-gray-500 hover:text-white"><X size={14} /></button>
                </div>
                <div className="space-y-1">
                   <ToggleSwitch 
                      label="Show Orbits" 
                      checked={settings.showOrbits} 
                      onChange={() => onUpdateSettings({ ...settings, showOrbits: !settings.showOrbits })} 
                   />
                   <ToggleSwitch 
                      label="Show Labels" 
                      checked={settings.showLabels} 
                      onChange={() => onUpdateSettings({ ...settings, showLabels: !settings.showLabels })} 
                   />
                   <ToggleSwitch 
                      label="Distance Lines" 
                      checked={settings.showDistanceLines} 
                      onChange={() => onUpdateSettings({ ...settings, showDistanceLines: !settings.showDistanceLines })} 
                   />
                   <ToggleSwitch 
                      label="Auto-Rotate" 
                      checked={settings.autoRotate} 
                      onChange={() => onUpdateSettings({ ...settings, autoRotate: !settings.autoRotate })} 
                   />
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Planet Info Panel (Right Side) */}
        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="pointer-events-auto absolute right-0 top-0 bottom-0 w-full md:w-[480px] bg-[#0a0a0f]/95 backdrop-blur-xl border-l border-white/10 overflow-y-auto z-30 shadow-2xl"
            >
              {/* Panel Header */}
              <div className="relative h-48 bg-gradient-to-b from-gray-900 to-black p-6 flex items-end">
                <button 
                  onClick={onClosePanel}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                
                <div className="relative z-10 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-1 block">{selectedPlanet.type}</span>
                      <h2 className="text-4xl font-display font-bold text-white">{selectedPlanet.name}</h2>
                    </div>
                    <div className="text-4xl opacity-20 font-display font-bold select-none absolute right-0 -bottom-8">
                       {selectedPlanet.id.toUpperCase().substring(0,3)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-6 space-y-8">
                
                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-sm font-light">
                  {selectedPlanet.description}
                </p>

                {/* Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedPlanet.details).map(([key, value]) => (
                    <div key={key} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-white font-mono text-sm">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Visualization (Mock) */}
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-white/5">
                   <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                     <Layers size={14} className="text-blue-400" /> Internal Structure
                   </h3>
                   <div className="h-32 flex items-center justify-center relative">
                      {/* CSS circles to represent layers */}
                      <div className="w-24 h-24 rounded-full border-2 border-blue-500/30 flex items-center justify-center">
                         <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                         </div>
                      </div>
                      <div className="absolute bottom-0 text-[10px] text-gray-500 text-center w-full">Structure simulation unavailable in prototype</div>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <Eye size={16} /> Focus View
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                    <Compass size={16} /> Surface Tour
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tour Mode Overlay */}
        <AnimatePresence>
          {isTourMode && (
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] bg-[#0F1014]/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
             >
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">Guided Tour</span>
                      <h3 className="text-xl font-display font-bold text-white">
                         {selectedPlanet ? `Exploring ${selectedPlanet.name}` : 'Solar System Overview'}
                      </h3>
                   </div>
                   <button onClick={onToggleTour} className="text-gray-500 hover:text-white"><X size={18} /></button>
                </div>
                <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden mb-4">
                   <div 
                      className="h-full bg-blue-500 transition-all duration-500" 
                      style={{ width: selectedPlanet ? `${(SOLAR_SYSTEM_DATA.findIndex(p => p.id === selectedPlanet.id) / (SOLAR_SYSTEM_DATA.length - 1)) * 100}%` : '0%'}} 
                   />
                </div>
                <div className="flex justify-between items-center">
                   <button onClick={() => onNavigateTour('prev')} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white border border-white/5">Previous</button>
                   <p className="text-xs text-gray-400 italic">"Did you know? {selectedPlanet?.description.substring(0, 30)}..."</p>
                   <button onClick={() => onNavigateTour('next')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white flex items-center gap-2">
                      Next Planet <ChevronRight size={14} />
                   </button>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 pointer-events-auto">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-[#121218] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
             >
               <div className="p-5 border-b border-white/10 flex justify-between items-center">
                 <h2 className="font-display font-bold text-white">Settings</h2>
                 <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
               </div>
               <div className="p-6 space-y-6">
                 <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Graphics & Visuals</h4>
                    <div className="space-y-3">
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Texture Quality</span>
                          <select className="bg-black border border-white/20 text-white text-xs rounded px-2 py-1">
                             <option>High (4K)</option>
                             <option>Medium (2K)</option>
                             <option>Low (1K)</option>
                          </select>
                       </div>
                       <ToggleSwitch 
                         label="Ambient Occlusion" 
                         checked={true} 
                         onChange={() => {}} 
                       />
                       <ToggleSwitch 
                         label="Bloom Effect" 
                         checked={true} 
                         onChange={() => {}} 
                       />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Interface</h4>
                    <div className="space-y-3">
                       <ToggleSwitch 
                         label="Show Labels" 
                         checked={settings.showLabels} 
                         onChange={() => onUpdateSettings({ ...settings, showLabels: !settings.showLabels })} 
                       />
                       <ToggleSwitch 
                         label="Show UI Overlay" 
                         checked={true} 
                         onChange={() => {}} 
                       />
                    </div>
                 </div>
               </div>
               <div className="p-5 bg-white/5 border-t border-white/10 flex justify-end gap-3">
                 <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-sm text-gray-300 hover:text-white">Cancel</button>
                 <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm text-white rounded-lg">Save Changes</button>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Overlay;