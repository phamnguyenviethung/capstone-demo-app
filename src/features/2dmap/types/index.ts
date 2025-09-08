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
}

export interface BoothDetailProps {
  booth: BoothData | null;
  onClose: () => void;
  className?: string;
}

export interface MapContainerProps {
  boothData: Record<string, BoothData>;
  boothIds: string[];
  svgSource: string;
  title?: string;
  description?: string;
}