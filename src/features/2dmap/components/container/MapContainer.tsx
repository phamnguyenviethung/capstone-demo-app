import React from 'react';
import type { MapContainerProps } from '../../types';
import { useBoothData, useBoothSelection, useBoothFiltering } from '../../hooks';
import { FloorPlan, BoothDetail } from '../presentation';

export const MapContainer: React.FC<MapContainerProps> = ({
  boothData,
  boothIds,
  svgSource,
  title,
  description,
}) => {
  const { getBoothById, allBooths } = useBoothData({ boothData, boothIds });
  const { selectedBooth, selectBooth, clearSelection } = useBoothSelection();
  const {
    selectedStatuses,
    filteredBoothIds,
    boothCountsByStatus,
    toggleStatus,
    clearFilters,
  } = useBoothFiltering({ allBooths });

  const handleBoothClick = (boothId: string) => {
    const booth = getBoothById(boothId);
    if (booth) {
      selectBooth(booth);
    }
  };

  const floorPlanConfig = {
    svgSource,
    boothIds,
    title,
    description,
    filteredBoothIds,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-3">
      <div className="max-w-7xl mx-auto">
        {/* Compact 2-column layout */}
        <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
          {/* Floor Plan with integrated filter - Takes main area */}
          <div className="lg:col-span-2">
            <FloorPlan
              config={floorPlanConfig}
              boothData={boothData}
              onBoothClick={handleBoothClick}
              selectedStatuses={selectedStatuses}
              onStatusToggle={toggleStatus}
              onClearFilters={clearFilters}
              boothCounts={boothCountsByStatus}
            />
          </div>

          {/* Detail Panel - Right sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-2">
              <BoothDetail booth={selectedBooth} onClose={clearSelection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
