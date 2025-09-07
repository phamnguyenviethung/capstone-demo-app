import { useMemo } from 'react';
import type { BoothData } from '../types';

interface UseBoothDataProps {
  boothData: Record<string, BoothData>;
  boothIds: string[];
}

export const useBoothData = ({ boothData, boothIds }: UseBoothDataProps) => {
  const getBoothById = useMemo(() => {
    return (boothId: string): BoothData | undefined => {
      return boothData[boothId];
    };
  }, [boothData]);

  const allBooths = useMemo(() => {
    return boothIds.map((id) => boothData[id]).filter(Boolean);
  }, [boothData, boothIds]);

  const boothsByStatus = useMemo(() => {
    return allBooths.reduce((acc, booth) => {
      if (!acc[booth.status]) {
        acc[booth.status] = [];
      }
      acc[booth.status].push(booth);
      return acc;
    }, {} as Record<string, BoothData[]>);
  }, [allBooths]);

  return {
    getBoothById,
    allBooths,
    boothsByStatus,
  };
};
