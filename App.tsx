import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Scene3D from './components/Scene3D';
import Overlay from './components/Overlay';
import { PlanetData, AppState, AppSettings } from './types';
import { SOLAR_SYSTEM_DATA } from './constants';

const App = () => {
  const [appState, setAppState] = useState<AppState>('loading');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isTourMode, setIsTourMode] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  
  const [settings, setSettings] = useState<AppSettings>({
    showOrbits: true,
    showLabels: true,
    showDistanceLines: false,
    ambientLightIntensity: 0.5,
    autoRotate: true,
  });

  const handleLoadingComplete = () => {
    setAppState('landing');
  };

  const startSimulation = () => {
    setAppState('simulation');
  };

  const handlePlanetSelect = (planet: PlanetData | null) => {
    setSelectedPlanet(planet);
    if (planet) {
      // Logic to move camera would happen here via a context or ref
    }
  };

  const handleNavigateTour = (direction: 'next' | 'prev') => {
    let newIndex = direction === 'next' ? tourIndex + 1 : tourIndex - 1;
    if (newIndex >= SOLAR_SYSTEM_DATA.length) newIndex = 0;
    if (newIndex < 0) newIndex = SOLAR_SYSTEM_DATA.length - 1;
    
    setTourIndex(newIndex);
    setSelectedPlanet(SOLAR_SYSTEM_DATA[newIndex]);
  };

  const toggleTourMode = () => {
    if (!isTourMode) {
       setIsTourMode(true);
       setTourIndex(0);
       setSelectedPlanet(SOLAR_SYSTEM_DATA[0]);
    } else {
       setIsTourMode(false);
       setSelectedPlanet(null);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0f] overflow-hidden">
      
      {/* 1. Loading State */}
      <AnimatePresence>
        {appState === 'loading' && (
          <motion.div key="loader" exit={{ opacity: 0 }} className="relative z-50">
             <LoadingScreen onComplete={handleLoadingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Landing Page */}
      <AnimatePresence>
        {appState === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-40 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative z-10 max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300 mb-6 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                SOLAR SYSTEM EXPLORER
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 tracking-wide">
                Learn, Explore, and Understand Our Cosmic Neighborhood
              </p>
              
              <button 
                onClick={startSimulation}
                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/20 text-white font-medium hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
              >
                <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                <span className="relative flex items-center gap-3 text-lg tracking-wider">
                   ENTER SIMULATION 
                </span>
              </button>

              <div className="mt-16 flex justify-center gap-8 text-sm text-gray-500 uppercase tracking-widest">
                 <span className="hover:text-white cursor-pointer transition-colors">About Project</span>
                 <span className="hover:text-white cursor-pointer transition-colors">Credits</span>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 text-xs text-gray-600">
               Prototype v1.0 • React + Three.js
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Simulation & UI */}
      {appState === 'simulation' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="w-full h-full relative"
        >
          {/* The 3D Canvas */}
          <Scene3D 
            onPlanetSelect={handlePlanetSelect} 
            selectedPlanet={selectedPlanet} 
            settings={settings}
          />
          
          {/* The UI Layer */}
          <Overlay 
            selectedPlanet={selectedPlanet} 
            onClosePanel={() => setSelectedPlanet(null)}
            settings={settings}
            onUpdateSettings={setSettings}
            isTourMode={isTourMode}
            onToggleTour={toggleTourMode}
            onNavigateTour={handleNavigateTour}
          />
        </motion.div>
      )}
    </div>
  );
};

export default App;