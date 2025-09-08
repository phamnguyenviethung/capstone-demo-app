import React from 'react';
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
      <div className={`bg-background rounded-xl shadow-sm ${className}`}>
        <div className="px-4 py-8 text-center">
          <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-xl">🗺️</div>
          </div>
          <h3 className="text-base font-semibold text-foreground mb-2">
            Select a Booth
          </h3>
          <p className="text-sm text-muted-foreground">
            Click on any booth to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-background rounded-xl shadow-sm lg:sticky lg:top-2 lg:max-h-[calc(100vh-1rem)] overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/30 rounded-lg flex items-center justify-center text-lg">
              {getCategoryIcon(booth.category)}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {booth.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                  {booth.category}
                </span>
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getStatusColor(booth.status) }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {booth.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <div className="space-y-4 lg:max-h-80 lg:overflow-y-auto lg:pr-2">
          {/* Description */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {booth.description}
            </p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/20 rounded-lg p-3">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Size
              </div>
              <div className="text-sm font-semibold text-foreground">
                {booth.size}
              </div>
            </div>
            <div className="bg-secondary/20 rounded-lg p-3">
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Floor
              </div>
              <div className="text-sm font-semibold text-foreground">
                Level {booth.floor}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground truncate">
                {booth.contact}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{booth.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground">{booth.hours}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
              <span className="text-sm text-foreground">
                {booth.rating} rating
              </span>
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="text-sm font-medium text-foreground mb-3">
              Features
            </div>
            <div className="flex flex-wrap gap-2">
              {booth.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary/30 text-secondary-foreground text-xs font-medium rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Rent */}
          <div className="bg-primary/5 rounded-lg p-3">
            <div className="text-lg font-bold text-primary">{booth.rent}</div>
            <div className="text-xs text-muted-foreground">Monthly rent</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 px-4 pt-4 pb-4">
        <button className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <Mail className="h-4 w-4" />
          Contact
        </button>
        <button className="bg-secondary/50 text-secondary-foreground px-4 py-2 rounded-lg font-medium text-sm hover:bg-secondary transition-colors flex items-center justify-center">
          <Users className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
