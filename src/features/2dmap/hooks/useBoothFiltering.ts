import { useState, useMemo } from 'react';
import type { BoothStatus, BoothData } from '../types';

interface UseBoothFilteringProps {
  allBooths: BoothData[];
}

export const useBoothFiltering = ({ allBooths }: UseBoothFilteringProps) => {
  const [selectedStatuses, setSelectedStatuses] = useState<BoothStatus[]>([]);

  const filteredBooths = useMemo(() => {
    if (selectedStatuses.length === 0) {
      return allBooths;
    }
    return allBooths.filter(booth => selectedStatuses.includes(booth.status));
  }, [allBooths, selectedStatuses]);

  const filteredBoothIds = useMemo(() => {
    return filteredBooths.map(booth => booth.id);
  }, [filteredBooths]);

  const boothCountsByStatus = useMemo(() => {
    return allBooths.reduce((acc, booth) => {
      acc[booth.status] = (acc[booth.status] || 0) + 1;
      return acc;
    }, {} as Record<BoothStatus, number>);
  }, [allBooths]);

  const toggleStatus = (status: BoothStatus) => {
    setSelectedStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
  };

  const selectAllStatuses = () => {
    const allStatuses: BoothStatus[] = ['Available', 'Occupied', 'Reserved'];
    setSelectedStatuses(allStatuses);
  };

  return {
    selectedStatuses,
    filteredBooths,
    filteredBoothIds,
    boothCountsByStatus,
    toggleStatus,
    clearFilters,
    selectAllStatuses,
    hasActiveFilters: selectedStatuses.length > 0,
  };
};