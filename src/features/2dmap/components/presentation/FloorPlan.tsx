import React, { useState, useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { X, Building2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [showFloors, setShowFloors] = useState(false);
  const floorDropdownRef = useRef<HTMLDivElement>(null);

  // Floor navigation functions
  const currentFloorIndex = floors.findIndex(f => f.floor === selectedFloor);
  const canGoPrevious = currentFloorIndex > 0;
  const canGoNext = currentFloorIndex < floors.length - 1;

  const handlePreviousFloor = () => {
    if (canGoPrevious && onFloorChange) {
      onFloorChange(floors[currentFloorIndex - 1].floor);
    }
  };

  const handleNextFloor = () => {
    if (canGoNext && onFloorChange) {
      onFloorChange(floors[currentFloorIndex + 1].floor);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (floorDropdownRef.current && !floorDropdownRef.current.contains(event.target as Node)) {
        setShowFloors(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`bg-background rounded-lg shadow-sm ${className}`}>
      {/* Compact Header */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
          <h2 className="text-base font-semibold text-foreground">
            {config.title || 'Floor Plan'}
          </h2>
        </div>
        {config.description && (
          <p className="text-xs text-muted-foreground mt-1 leading-tight">
            {config.description}
          </p>
        )}
      </div>
      
      {/* Ultra Compact Controls */}
      {(floors.length > 1 || onStatusToggle) && (
        <div className="px-3 py-2 border-b border-border/50">
          <div className="flex items-center justify-between gap-3">
            {/* Floor Selection with Navigation */}
            {floors.length > 1 && onFloorChange && selectedFloor !== undefined && (
              <div className="flex items-center gap-1">
                {/* Previous Floor Button */}
                <button
                  onClick={handlePreviousFloor}
                  disabled={!canGoPrevious}
                  className={`p-1.5 rounded-md transition-all ${
                    canGoPrevious 
                      ? 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground' 
                      : 'bg-secondary/20 text-muted-foreground/40 cursor-not-allowed'
                  }`}
                  title="Previous floor"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                {/* Floor Selector Dropdown */}
                <div className="relative" ref={floorDropdownRef}>
                  <button
                    onClick={() => setShowFloors(!showFloors)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary/50 hover:bg-secondary rounded-md transition-all text-sm"
                  >
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">
                      {floors.find(f => f.floor === selectedFloor)?.name || `Floor ${selectedFloor}`}
                    </span>
                    <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${
                      showFloors ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {showFloors && (
                    <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10 min-w-[130px]">
                      {floors.map((floor) => (
                        <button
                          key={floor.floor}
                          onClick={() => {
                            onFloorChange(floor.floor);
                            setShowFloors(false);
                          }}
                          className={`flex items-center gap-2 w-full px-2.5 py-1.5 text-left hover:bg-secondary/50 first:rounded-t-md last:rounded-b-md text-sm ${
                            selectedFloor === floor.floor ? 'bg-primary/10 text-primary' : ''
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            selectedFloor === floor.floor ? 'bg-primary' : 'bg-muted-foreground/40'
                          }`} />
                          <span>{floor.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next Floor Button */}
                <button
                  onClick={handleNextFloor}
                  disabled={!canGoNext}
                  className={`p-1.5 rounded-md transition-all ${
                    canGoNext 
                      ? 'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground' 
                      : 'bg-secondary/20 text-muted-foreground/40 cursor-not-allowed'
                  }`}
                  title="Next floor"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Status Filters - Horizontal List */}
            {onStatusToggle && (
              <div className="flex items-center gap-2">
                {/* Status Filter Buttons - Always Visible */}
                <div className="flex items-center gap-1">
                  {statusOptions.map((status) => {
                    const isSelected = selectedStatuses.includes(status);
                    const count = boothCounts[status] || 0;
                    const statusColor = getStatusColor(status);
                    
                    return (
                      <button
                        key={status}
                        onClick={() => onStatusToggle(status)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'bg-secondary/50 hover:bg-secondary text-secondary-foreground'
                        }`}
                        title={`${status} (${count})`}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: statusColor }}
                        />
                        <span className="hidden sm:inline">{status}</span>
                        <span className={`px-1 py-0.5 rounded text-xs font-bold ${
                          isSelected 
                            ? 'bg-primary-foreground/20 text-primary-foreground' 
                            : 'bg-muted/70 text-muted-foreground'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && onClearFilters && (
                  <button
                    onClick={onClearFilters}
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                    title="Clear filters"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SVG Floor Plan */}
      <div className="px-3 pb-3">
        <div className="relative bg-secondary/20 rounded-md overflow-hidden max-h-[65vh] lg:max-h-[75vh] p-3">
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
