import React from 'react';
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
import { X, Phone, Mail, Clock, Users, Star } from 'lucide-react';
import type { BoothDetailProps } from '../../types';
import { getStatusColor, getCategoryIcon } from '../../data/utils';

export const BoothDetail: React.FC<BoothDetailProps> = ({
  booth,
  onClose,
  className = '',
}) => {
  if (!booth) {
    return (
      <Card className={`sticky top-6 ${className}`}>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <div className="h-12 w-12 text-gray-300 mx-auto mb-4">🗺️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Select a Store
            </h3>
            <p className="text-sm text-gray-500">
              Click on any store in the floor plan to view detailed information
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`sticky top-6 lg:max-h-[calc(100vh-2rem)] overflow-hidden ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="text-xl sm:text-2xl flex-shrink-0">
              {getCategoryIcon(booth.category)}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg truncate">
                {booth.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {booth.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: getStatusColor(booth.status),
                    }}
                  />
                  <span className="text-xs">{booth.status}</span>
                </div>
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
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
                {booth.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <div className="font-medium text-gray-900">Size</div>
                <div className="text-gray-600">{booth.size}</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium text-gray-900">Floor</div>
                <div className="text-gray-600">Level {booth.floor}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{booth.contact}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{booth.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{booth.hours}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-600">{booth.rating} rating</span>
              </div>
            </div>

            <div>
              <div className="font-medium text-gray-900 text-sm mb-2">
                Features
              </div>
              <div className="flex flex-wrap gap-1">
                {booth.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t">
              <div className="text-lg font-bold text-green-600">
                {booth.rent}
              </div>
              <div className="text-xs text-gray-500">Monthly rent</div>
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
  );
};
