import { useState, useCallback } from 'react';
import type { BoothData } from '../types';

export const useBoothSelection = () => {
  const [selectedBooth, setSelectedBooth] = useState<BoothData | null>(null);

  const selectBooth = useCallback((booth: BoothData | null) => {
    setSelectedBooth(booth);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedBooth(null);
  }, []);

  const toggleBooth = useCallback((booth: BoothData) => {
    setSelectedBooth((prev) => (prev?.id === booth.id ? null : booth));
  }, []);

  return {
    selectedBooth,
    selectBooth,
    clearSelection,
    toggleBooth,
    isSelected: (boothId: string) => selectedBooth?.id === boothId,
  };
};
