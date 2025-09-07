import type { BoothStatus, BoothCategory, BoothData } from '../types';

export const getStatusColor = (status: BoothStatus): string => {
  switch (status) {
    case 'Available':
      return '#10B981'; // Green
    case 'Occupied':
      return '#EF4444'; // Red
    case 'Reserved':
      return '#F59E0B'; // Amber
    default:
      return '#6B7280'; // Gray
  }
};

export const getCategoryIcon = (category: BoothCategory): string => {
  switch (category) {
    case 'Fashion':
      return '👗';
    case 'Electronics':
      return '📱';
    case 'Food & Beverage':
      return '🍕';
    case 'Beauty':
      return '💄';
    case 'Sports':
      return '⚽';
    case 'Books':
      return '📚';
    default:
      return '🏪';
  }
};

export const getBoothColor = (boothData: BoothData): string => {
  return getStatusColor(boothData.status);
};
