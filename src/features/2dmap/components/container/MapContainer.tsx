import React, { useState, useMemo } from 'react';
import type { MapContainerProps } from '../../types';
import {
  useBoothData,
  useBoothSelection,
  useBoothFiltering,
} from '../../hooks';
import { FloorPlan, BoothDetail } from '../presentation';

const DEFAULT_FLOORS = [
  { floor: 1, svgSource: '/f1.svg', name: 'Floor 1' },
  { floor: 2, svgSource: '/f2.svg', name: 'Floor 2' },
];

export const MapContainer: React.FC<MapContainerProps> = ({
  boothData,
  boothIds,
  floors = DEFAULT_FLOORS,
  title,
  description,
}) => {
  const [selectedFloor, setSelectedFloor] = useState<number>(
    floors[0]?.floor || 1
  );

  const currentFloorData = useMemo(
    () => floors.find((floor) => floor.floor === selectedFloor) || floors[0],
    [floors, selectedFloor]
  );

  const currentFloorBooths = useMemo(
    () =>
      Object.values(boothData).filter((booth) => booth.floor === selectedFloor),
    [boothData, selectedFloor]
  );

  const currentFloorBoothIds = useMemo(
    () => boothIds.filter((id) => boothData[id]?.floor === selectedFloor),
    [boothIds, boothData, selectedFloor]
  );

  const { getBoothById } = useBoothData({
    boothData,
    boothIds: currentFloorBoothIds,
  });
  const { selectedBooth, selectBooth, clearSelection } = useBoothSelection();
  const {
    selectedStatuses,
    filteredBoothIds,
    boothCountsByStatus,
    toggleStatus,
    clearFilters,
  } = useBoothFiltering({ allBooths: currentFloorBooths });

  const handleBoothClick = (boothId: string) => {
    const booth = getBoothById(boothId);
    if (booth) {
      selectBooth(booth);
    }
  };

  const floorPlanConfig = {
    svgSource: currentFloorData.svgSource,
    boothIds: currentFloorBoothIds,
    title,
    description,
    filteredBoothIds,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-3">
      <div className="max-w-7xl mx-auto">
        {/* Responsive layout */}
        <div className="flex flex-col xl:grid xl:grid-cols-4 gap-4">
          {/* Floor Plan with integrated controls - Main area */}
          <div className="xl:col-span-3">
            <FloorPlan
              config={floorPlanConfig}
              boothData={boothData}
              onBoothClick={handleBoothClick}
              selectedStatuses={selectedStatuses}
              onStatusToggle={toggleStatus}
              onClearFilters={clearFilters}
              boothCounts={boothCountsByStatus}
              floors={floors}
              selectedFloor={selectedFloor}
              onFloorChange={setSelectedFloor}
            />
          </div>

          {/* Detail Panel - Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-4">
              <BoothDetail booth={selectedBooth} onClose={clearSelection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
