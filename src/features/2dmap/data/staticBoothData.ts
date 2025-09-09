import type { BoothData } from '../types';

export interface FloorPlanData {
  floor: number;
  name: string;
  svgPath: string;
  boothIds: string[];
  booths: Record<string, BoothData>;
}

export const FLOOR_PLANS: FloorPlanData[] = [
  {
    floor: 1,
    name: 'Ground Floor',
    svgPath: '/f1.svg',
    boothIds: ['rec-1', 'rec-2', 'rec-3', 'rec-4', 'rec-5'],
    booths: {
      'rec-1': {
        id: 'rec-1',
        name: 'Store 1',
        category: 'Electronics',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for electronics businesses.',
        company: 'RetailCorp 1',
        contact: 'store1@mall.com',
        phone: '+1 (555) 234-5678',
        status: 'Available',
        size: '450 sq ft',
        rent: '$3500/month',
        rating: '4.2',
        hours: '10:00 AM - 9:00 PM',
        floor: 1,
        features: ['Air Conditioning', 'WiFi', 'Security System'],
      },
      'rec-2': {
        id: 'rec-2',
        name: 'Store 2',
        category: 'Fashion',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for fashion businesses.',
        company: 'RetailCorp 2',
        contact: 'store2@mall.com',
        phone: '+1 (555) 345-6789',
        status: 'Occupied',
        size: '380 sq ft',
        rent: '$4200/month',
        rating: '4.7',
        hours: '10:00 AM - 9:00 PM',
        floor: 1,
        features: [
          'Air Conditioning',
          'WiFi',
          'Security System',
          '24/7 Access',
        ],
      },
      'rec-3': {
        id: 'rec-3',
        name: 'Store 3',
        category: 'Food & Beverage',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for food & beverage businesses.',
        company: 'RetailCorp 3',
        contact: 'store3@mall.com',
        phone: '+1 (555) 456-7890',
        status: 'Reserved',
        size: '320 sq ft',
        rent: '$2800/month',
        rating: '3.9',
        hours: '10:00 AM - 9:00 PM',
        floor: 1,
        features: ['Air Conditioning', 'WiFi'],
      },
      'rec-4': {
        id: 'rec-4',
        name: 'Store 4',
        category: 'Electronics',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for electronics businesses.',
        company: 'RetailCorp 4',
        contact: 'store4@mall.com',
        phone: '+1 (555) 567-8901',
        status: 'Available',
        size: '450 sq ft',
        rent: '$3500/month',
        rating: '4.2',
        hours: '10:00 AM - 9:00 PM',
        floor: 1,
        features: ['Air Conditioning', 'WiFi', 'Security System'],
      },
      'rec-5': {
        id: 'rec-5',
        name: 'Store 5',
        category: 'Fashion',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for fashion businesses.',
        company: 'RetailCorp 5',
        contact: 'store5@mall.com',
        phone: '+1 (555) 678-9012',
        status: 'Occupied',
        size: '380 sq ft',
        rent: '$4200/month',
        rating: '4.7',
        hours: '10:00 AM - 9:00 PM',
        floor: 1,
        features: [
          'Air Conditioning',
          'WiFi',
          'Security System',
          '24/7 Access',
        ],
      },
    },
  },
  {
    floor: 2,
    name: 'Second Floor',
    svgPath: '/f2.svg',
    boothIds: ['rec-6', 'rec-7', 'rec-8', 'rec-9', 'rec-10'],
    booths: {
      'rec-6': {
        id: 'rec-6',
        name: 'Store 6',
        category: 'Beauty',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for beauty businesses.',
        company: 'RetailCorp 6',
        contact: 'store6@mall.com',
        phone: '+1 (555) 789-0123',
        status: 'Available',
        size: '350 sq ft',
        rent: '$3000/month',
        rating: '4.1',
        hours: '10:00 AM - 9:00 PM',
        floor: 2,
        features: ['Air Conditioning', 'WiFi', 'Security System'],
      },
      'rec-7': {
        id: 'rec-7',
        name: 'Store 7',
        category: 'Sports',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for sports businesses.',
        company: 'RetailCorp 7',
        contact: 'store7@mall.com',
        phone: '+1 (555) 890-1234',
        status: 'Occupied',
        size: '520 sq ft',
        rent: '$4800/month',
        rating: '4.5',
        hours: '10:00 AM - 9:00 PM',
        floor: 2,
        features: [
          'Air Conditioning',
          'WiFi',
          'Security System',
          '24/7 Access',
          'Storage Room',
        ],
      },
      'rec-8': {
        id: 'rec-8',
        name: 'Store 8',
        category: 'Books',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for bookstore businesses.',
        company: 'RetailCorp 8',
        contact: 'store8@mall.com',
        phone: '+1 (555) 901-2345',
        status: 'Reserved',
        size: '400 sq ft',
        rent: '$3200/month',
        rating: '4.3',
        hours: '10:00 AM - 9:00 PM',
        floor: 2,
        features: ['Air Conditioning', 'WiFi', 'Reading Area'],
      },
      'rec-9': {
        id: 'rec-9',
        name: 'Store 9',
        category: 'Electronics',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for electronics businesses.',
        company: 'RetailCorp 9',
        contact: 'store9@mall.com',
        phone: '+1 (555) 012-3456',
        status: 'Available',
        size: '480 sq ft',
        rent: '$3800/month',
        rating: '4.0',
        hours: '10:00 AM - 9:00 PM',
        floor: 2,
        features: [
          'Air Conditioning',
          'WiFi',
          'Security System',
          'Tech Support Area',
        ],
      },
      'rec-10': {
        id: 'rec-10',
        name: 'Store 10',
        category: 'Food & Beverage',
        description:
          'Premium retail space with modern amenities and high foot traffic. Perfect for food & beverage businesses.',
        company: 'RetailCorp 10',
        contact: 'store10@mall.com',
        phone: '+1 (555) 123-4567',
        status: 'Occupied',
        size: '300 sq ft',
        rent: '$2500/month',
        rating: '4.6',
        hours: '10:00 AM - 9:00 PM',
        floor: 2,
        features: [
          'Air Conditioning',
          'WiFi',
          'Kitchen Equipment',
          'Exhaust System',
        ],
      },
    },
  },
];

// Helper functions to maintain backward compatibility
export const getAllBoothIds = (): string[] => {
  return FLOOR_PLANS.flatMap((floor) => floor.boothIds);
};

export const getAllBoothData = (): Record<string, BoothData> => {
  const allBooths: Record<string, BoothData> = {};
  FLOOR_PLANS.forEach((floor) => {
    Object.assign(allBooths, floor.booths);
  });
  return allBooths;
};

export const getBoothsByFloor = (
  floorNumber: number
): Record<string, BoothData> => {
  const floor = FLOOR_PLANS.find((f) => f.floor === floorNumber);
  return floor ? floor.booths : {};
};

export const getFloorByNumber = (
  floorNumber: number
): FloorPlanData | undefined => {
  return FLOOR_PLANS.find((f) => f.floor === floorNumber);
};

// Backward compatibility exports
export const BOOTH_IDS = getAllBoothIds();
export const STATIC_BOOTH_DATA = getAllBoothData();
