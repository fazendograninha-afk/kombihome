export interface KombiConfig {
  roofHeight: number;
  roofLength: number;
  acPosition: number;
  rackLength: number;
  solarPanels: number;
  waterTankCapacity: number;
  showInterior: boolean;
  upperColor: string;
  lowerColor: string;
  bedColor: string;
  kitchenColor: string;
  seatingColor: string;
}

export const DEFAULT_CONFIG: KombiConfig = {
  roofHeight: 0.4,
  roofLength: 2.6,
  acPosition: 0.1,
  rackLength: 1.4,
  solarPanels: 2,
  waterTankCapacity: 60,
  showInterior: false,
  upperColor: '#f8fafc',
  lowerColor: '#3b82f6',
  bedColor: '#4a5568',
  kitchenColor: '#e2e8f0',
  seatingColor: '#2d3748',
};
