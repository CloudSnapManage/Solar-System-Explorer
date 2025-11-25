export interface PlanetData {
  id: string;
  name: string;
  type: 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant';
  description: string;
  color: string;
  radius: number; // Relative size for visualization
  distance: number; // Relative distance from sun
  speed: number; // Orbit speed
  details: {
    radius: string;
    mass: string;
    gravity: string;
    dayLength: string;
    orbitalPeriod: string;
    temperature: string;
    moons: number;
    atmosphere: string;
  };
}

export type AppState = 'loading' | 'landing' | 'simulation';

export interface AppSettings {
  showOrbits: boolean;
  showLabels: boolean;
  showDistanceLines: boolean;
  ambientLightIntensity: number;
  autoRotate: boolean;
}