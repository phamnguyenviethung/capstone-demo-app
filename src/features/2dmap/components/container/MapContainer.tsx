import React from 'react';
import type { MapContainerProps } from '../../types';
import { useBoothData, useBoothSelection } from '../../hooks';
import { FloorPlan, BoothDetail } from '../presentation';

export const MapContainer: React.FC<MapContainerProps> = ({
  boothData,
  boothIds,
  svgSource,
  title,
  description,
}) => {
  const { getBoothById } = useBoothData({ boothData, boothIds });
  const { selectedBooth, selectBooth, clearSelection } = useBoothSelection();

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {/* Floor Plan */}
          <div className="xl:col-span-2 lg:col-span-1">
            <FloorPlan
              config={floorPlanConfig}
              boothData={boothData}
              onBoothClick={handleBoothClick}
            />
          </div>

          {/* Detail Panel */}
          <div className="xl:col-span-1 lg:col-span-1">
            <BoothDetail booth={selectedBooth} onClose={clearSelection} />
          </div>
        </div>
      </div>
    </div>
  );
};
