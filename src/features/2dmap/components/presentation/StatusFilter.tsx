import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';
import type { BoothStatus } from '../../types';
import { getStatusColor } from '../../data/utils';

interface StatusFilterProps {
  selectedStatuses: BoothStatus[];
  onStatusToggle: (status: BoothStatus) => void;
  onClearFilters: () => void;
  boothCounts: Record<BoothStatus, number>;
  className?: string;
}

const statusOptions: BoothStatus[] = ['Available', 'Occupied', 'Reserved'];

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatuses,
  onStatusToggle,
  onClearFilters,
  boothCounts,
  className = '',
}) => {
  const hasActiveFilters = selectedStatuses.length > 0;
  const isAllSelected = selectedStatuses.length === statusOptions.length;

  return (
    <Card className={`h-fit ${className}`}>
      <CardHeader className="pb-3 px-3 sm:px-6">
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="hidden sm:inline">Filter by Status</span>
            <span className="sm:hidden">Filters</span>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-2 text-sm hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Clear</span>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pt-0 pb-3 sm:pb-6">
        {/* Mobile: Horizontal scrolling buttons */}
        <div className="lg:hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {statusOptions.map((status) => {
              const isSelected = selectedStatuses.includes(status);
              const count = boothCounts[status] || 0;
              const statusColor = getStatusColor(status);
              
              return (
                <Button
                  key={status}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => onStatusToggle(status)}
                  className={`flex items-center gap-2 whitespace-nowrap h-9 ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: statusColor }}
                  />
                  <span className="text-sm">{status}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
          
          {/* Mobile: Clear button */}
          {hasActiveFilters && (
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="w-full text-sm hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Desktop: Vertical list */}
        <div className="hidden lg:block space-y-2">
          {statusOptions.map((status) => {
            const isSelected = selectedStatuses.includes(status);
            const count = boothCounts[status] || 0;
            const statusColor = getStatusColor(status);
            
            return (
              <Button
                key={status}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusToggle(status)}
                className={`w-full justify-start gap-3 h-10 ${
                  isSelected 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full border border-white/50 flex-shrink-0"
                  style={{ backgroundColor: statusColor }}
                />
                <span className="flex-1 text-left">{status}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </Button>
            );
          })}
          
          {/* Desktop: Legend and Quick Actions */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Legend</div>
            <div className="grid grid-cols-1 gap-1 text-xs">
              {statusOptions.map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStatusColor(status) }}
                  />
                  <span className="text-gray-600">{status}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (isAllSelected || selectedStatuses.length === 0) {
                  onClearFilters();
                } else {
                  statusOptions.forEach(status => {
                    if (!selectedStatuses.includes(status)) {
                      onStatusToggle(status);
                    }
                  });
                }
              }}
              className="flex-1 text-xs"
            >
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};