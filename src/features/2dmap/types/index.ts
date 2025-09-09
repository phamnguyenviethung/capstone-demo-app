export type BoothStatus = 'Available' | 'Occupied' | 'Reserved';

export type BoothCategory = 
  | 'Fashion' 
  | 'Electronics' 
  | 'Food & Beverage' 
  | 'Beauty' 
  | 'Sports' 
  | 'Books';

export interface BoothData {
  id: string;
  name: string;
  category: BoothCategory;
  description: string;
  company: string;
  contact: string;
  phone: string;
  status: BoothStatus;
  size: string;
  rent: string;
  rating: string;
  hours: string;
  floor: number;
  features: string[];
}

export interface FloorPlanConfig {
  svgSource: string;
  boothIds: string[];
  title?: string;
  description?: string;
  filteredBoothIds?: string[];
}

export interface FloorData {
  floor: number;
  svgSource: string;
  name: string;
}

export interface FloorPlanData {
  floor: number;
  name: string;
  svgPath: string;
  boothIds: string[];
  booths: Record<string, BoothData>;
}

export interface BoothInteractionHandlers {
  onBoothClick: (boothId: string) => void;
  onBoothHover?: (boothId: string) => void;
  onBoothLeave?: (boothId: string) => void;
}

export interface FloorPlanProps {
  config: FloorPlanConfig;
  boothData: Record<string, BoothData>;
  onBoothClick: (boothId: string) => void;
  className?: string;
  selectedStatuses?: BoothStatus[];
  onStatusToggle?: (status: BoothStatus) => void;
  onClearFilters?: () => void;
  boothCounts?: Record<BoothStatus, number>;
  floors?: FloorData[];
  selectedFloor?: number;
  onFloorChange?: (floor: number) => void;
}

export interface BoothDetailProps {
  booth: BoothData | null;
  onClose: () => void;
  className?: string;
}

export interface MapContainerProps {
  boothData: Record<string, BoothData>;
  boothIds: string[];
  floors?: FloorData[];
  title?: string;
  description?: string;
}