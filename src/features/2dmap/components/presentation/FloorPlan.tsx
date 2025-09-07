import React from 'react';
import { ReactSVG } from 'react-svg';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import type { FloorPlanProps } from '../../types';
import { getBoothColor } from '../../data/utils';

export const FloorPlan: React.FC<FloorPlanProps> = ({
  config,
  boothData,
  onBoothClick,
  className = '',
}) => {
  const handleSVGInjection = (svg: SVGSVGElement) => {
    svg.style.width = '100%';
    svg.style.height = 'auto';
    svg.style.display = 'block';
    svg.style.maxWidth = '100%';
    svg.style.margin = '0 auto';

    config.boothIds.forEach((boothId) => {
      const booth = svg.getElementById(boothId);
      if (booth) {
        const boothInfo = boothData[boothId];
        if (!boothInfo) return;

        // Set up booth element styles
        (booth as SVGElement).style.cursor = 'pointer';
        (booth as SVGElement).style.transition = 'all 0.3s ease';
        (booth as SVGElement).style.pointerEvents = 'all';
        (booth as SVGElement).style.filter =
          'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))';

        // Set initial color based on status
        const initialColor = getBoothColor(boothInfo);
        booth.setAttribute('fill', initialColor);

        // Add hover effects
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
      }
    });
  };

  return (
    <Card className={`h-fit ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MapPin className="h-5 w-5 text-blue-600" />
          {config.title || 'Floor Plan'}
        </CardTitle>
        <CardDescription className="text-sm">
          {config.description ||
            'Interactive floor plan - hover to highlight, click to view store details'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="relative bg-gray-50 rounded-lg p-2 sm:p-4 border-2 border-dashed border-gray-200">
          <ReactSVG
            src={config.svgSource}
            className="w-full"
            beforeInjection={handleSVGInjection}
          />
        </div>
      </CardContent>
    </Card>
  );
};
