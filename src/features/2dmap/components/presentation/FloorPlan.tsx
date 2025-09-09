import React from 'react';
import { ReactSVG } from 'react-svg';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { FloorPlanProps, BoothStatus } from '../../types';
import { getBoothColor, getStatusColor } from '../../data/utils';

export const FloorPlan: React.FC<FloorPlanProps> = ({
  config,
  boothData,
  onBoothClick,
  className = '',
  selectedStatuses = [],
  onStatusToggle,
  onClearFilters,
  boothCounts = { Available: 0, Occupied: 0, Reserved: 0 },
  floors = [],
  selectedFloor,
  onFloorChange,
}) => {
  const handleSVGInjection = (svg: SVGSVGElement) => {
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.display = 'block';
    svg.style.maxWidth = '100%';
    svg.style.maxHeight = '100%';
    svg.style.objectFit = 'contain';
    svg.style.margin = '0 auto';

    config.boothIds.forEach((boothId) => {
      const booth = svg.getElementById(boothId);
      if (booth) {
        const boothInfo = boothData[boothId];
        if (!boothInfo) return;

        const isVisible = !config.filteredBoothIds || config.filteredBoothIds.includes(boothId);

        // Set up booth element styles
        (booth as SVGElement).style.cursor = isVisible ? 'pointer' : 'default';
        (booth as SVGElement).style.transition = 'all 0.3s ease';
        (booth as SVGElement).style.pointerEvents = isVisible ? 'all' : 'none';
        (booth as SVGElement).style.filter = isVisible
          ? 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
          : 'none';
        (booth as SVGElement).style.opacity = isVisible ? '1' : '0.2';

        // Set initial color based on status
        const initialColor = getBoothColor(boothInfo);
        booth.setAttribute('fill', isVisible ? initialColor : '#E5E7EB');

        if (isVisible) {
          // Add hover effects only for visible booths
          booth.addEventListener('mouseenter', () => {
            (booth as SVGElement).style.stroke = '#3B82F6';
            (booth as SVGElement).style.strokeWidth = '2';
          });

          booth.addEventListener('mouseleave', () => {
            (booth as SVGElement).style.stroke = 'none';
            (booth as SVGElement).style.strokeWidth = '0';
          });

          // Add click handler
          booth.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            onBoothClick(boothId);
          });
        } else {
          // Remove event listeners for filtered out booths
          booth.replaceWith(booth.cloneNode(true));
        }
      }
    });
  };

  const statusOptions: BoothStatus[] = ['Available', 'Occupied', 'Reserved'];
  const hasActiveFilters = selectedStatuses.length > 0;

  return (
    <div className={`bg-background rounded-xl shadow-sm ${className}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h2 className="text-lg font-semibold text-foreground">
            {config.title || 'Floor Plan'}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {config.description || 'Interactive floor plan - click to select booths'}
        </p>
      </div>
      
      {/* Controls Section */}
      {(floors.length > 1 || onStatusToggle) && (
        <div className="px-4 pb-3 border-b border-border/50">
          {/* Floor Selection */}
          {floors.length > 1 && onFloorChange && selectedFloor !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Floor Selection</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {floors.map((floor) => (
                  <button
                    key={floor.floor}
                    onClick={() => onFloorChange(floor.floor)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      selectedFloor === floor.floor
                        ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20'
                        : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      selectedFloor === floor.floor ? 'bg-white/80' : 'bg-primary/60'
                    }`} />
                    <span>{floor.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Status Filters */}
          {onStatusToggle && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-foreground">Status Filters</span>
                {hasActiveFilters && onClearFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => {
                  const isSelected = selectedStatuses.includes(status);
                  const count = boothCounts[status] || 0;
                  const statusColor = getStatusColor(status);
                  
                  return (
                    <button
                      key={status}
                      onClick={() => onStatusToggle(status)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                      }`}
                    >
                      <div 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: statusColor }}
                      />
                      <span>{status}</span>
                      <span className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${
                        isSelected 
                          ? 'bg-primary-foreground/20 text-primary-foreground' 
                          : 'bg-background text-muted-foreground'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SVG Floor Plan */}
      <div className="px-4 pb-4">
        <div className="relative bg-secondary/20 rounded-lg overflow-hidden max-h-[60vh] lg:max-h-[70vh] p-4">
          <ReactSVG
            src={config.svgSource}
            className="w-full h-full"
            beforeInjection={handleSVGInjection}
          />
        </div>
      </div>
    </div>
  );
};
