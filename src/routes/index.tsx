import { createFileRoute } from '@tanstack/react-router';
import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, MapPin, Phone, Mail, Clock, Users, Star } from 'lucide-react';
import svg from '@/assets/demo.svg';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const boothIDList = ['rec-1', 'rec-2', 'rec-3', 'rec-4', 'rec-5'];

const staticBoothData = {
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
    features: ['Air Conditioning', 'WiFi', 'Security System', '24/7 Access'],
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
    features: ['Air Conditioning', 'WiFi', 'Security System', '24/7 Access'],
  },
} as const;

function getBoothData(boothID: string) {
  return staticBoothData[boothID as keyof typeof staticBoothData];
}

function RouteComponent() {
  const [selectedBooth, setSelectedBooth] = useState<ReturnType<
    typeof getBoothData
  > | null>(null);

  const handleBoothClick = (boothID: string) => {
    const data = getBoothData(boothID);

    setSelectedBooth(data);
  };

  const getStatusColor = (status: string) => {
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

  const getBoothColor = (
    boothID: string,
    isHover = false,
    isSelected = false
  ) => {
    if (isSelected) return '#8B5CF6'; // Purple for selected
    if (isHover) return '#3B82F6'; // Blue for hover

    // Get booth data to determine status color
    const data = getBoothData(boothID);
    return getStatusColor(data.status);
  };

  const getCategoryIcon = (category: string) => {
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
          {/* Floor Plan */}
          <div className="xl:col-span-2 lg:col-span-1">
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Ground Floor Layout
                </CardTitle>
                <CardDescription className="text-sm">
                  Interactive floor plan - hover to highlight, click to view
                  store details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="relative bg-gray-50 rounded-lg p-2 sm:p-4 border-2 border-dashed border-gray-200">
                  <ReactSVG
                    src={svg}
                    className="w-full"
                    beforeInjection={(svg) => {
                      svg.style.width = '100%';
                      svg.style.height = 'auto';
                      svg.style.display = 'block';
                      svg.style.maxWidth = '100%';
                      svg.style.margin = '0 auto';


                      boothIDList.forEach((boothID) => {
                        const booth = svg.getElementById(boothID);
                        if (booth) {
                          (booth as SVGElement).style.cursor = 'pointer';
                          (booth as SVGElement).style.transition = 'all 0.3s ease';
                          (booth as SVGElement).style.pointerEvents = 'all';
                          (booth as SVGElement).style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))';

                          // Set initial color
                          const initialColor = getBoothColor(boothID);
                          booth.setAttribute('fill', initialColor);

                          booth.addEventListener('mouseenter', () => {
                            (booth as SVGElement).style.stroke = '#3B82F6';
                            (booth as SVGElement).style.strokeWidth = '2';
                          });

                          booth.addEventListener('mouseleave', () => {
                            (booth as SVGElement).style.stroke = 'none';
                            (booth as SVGElement).style.strokeWidth = '0';
                          });

                          booth.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleBoothClick(boothID);
                          });
                        }
                      });
                    }}
                  />
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Detail Panel */}
          <div className="xl:col-span-1 lg:col-span-1">
            {selectedBooth ? (
              <Card className="sticky top-6 lg:max-h-[calc(100vh-2rem)] overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="text-xl sm:text-2xl flex-shrink-0">
                        {getCategoryIcon(selectedBooth.category)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base sm:text-lg truncate">
                          {selectedBooth.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {selectedBooth.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: getStatusColor(
                                  selectedBooth.status
                                ),
                              }}
                            ></div>
                            <span className="text-xs">
                              {selectedBooth.status}
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedBooth(null)}
                      className="h-8 w-8 p-0 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 p-3 sm:p-6">
                  <ScrollArea className="h-[60vh] sm:h-96">
                    <div className="space-y-4 pr-2 sm:pr-4">
                      <div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {selectedBooth.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">Size</div>
                          <div className="text-gray-600">
                            {selectedBooth.size}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">Floor</div>
                          <div className="text-gray-600">
                            Level {selectedBooth.floor}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {selectedBooth.contact}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {selectedBooth.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {selectedBooth.hours}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-gray-600">
                            {selectedBooth.rating} rating
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="font-medium text-gray-900 text-sm mb-2">
                          Features
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {selectedBooth.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="text-lg font-bold text-green-600">
                          {selectedBooth.rent}
                        </div>
                        <div className="text-xs text-gray-500">
                          Monthly rent
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
                    <Button className="flex-1" size="sm">
                      Contact Store
                    </Button>
                    <Button variant="outline" size="sm" className="sm:w-auto">
                      <Users className="h-4 w-4" />
                      <span className="ml-2 sm:hidden">Visit</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-6">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Store
                    </h3>
                    <p className="text-sm text-gray-500">
                      Click on any store in the floor plan to view detailed
                      information
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
