import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesignCard = ({ 
  design, 
  onEdit, 
  onDuplicate, 
  onDelete, 
  isSelected = false, 
  onSelect,
  showCheckbox = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'exported': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCompletionPercentage = (areas) => {
    const totalAreas = 4; // front, back, left sleeve, right sleeve
    const completedAreas = Object.values(areas)?.filter(area => area?.hasContent)?.length;
    return Math.round((completedAreas / totalAreas) * 100);
  };

  return (
    <div 
      className={`
        bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 transition-smooth
        hover:shadow-elevation-2 hover:border-primary/20
        ${isSelected ? 'ring-2 ring-primary border-primary' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox for bulk selection */}
      {showCheckbox && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(design?.id, e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>
      )}
      {/* Design Preview */}
      <div className="relative aspect-square bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* T-shirt mockup with design preview */}
          <div className="relative w-32 h-32">
            {/* T-shirt base */}
            <div 
              className="w-full h-full rounded-lg shadow-sm"
              style={{ backgroundColor: design?.tshirtColor }}
            >
              {/* Front design preview */}
              {design?.areas?.front?.hasContent && (
                <div className="absolute inset-2 flex items-center justify-center">
                  <Image
                    src={design?.areas?.front?.preview}
                    alt="Front design"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Hover overlay showing other areas */}
            {isHovered && (
              <div className="absolute -top-2 -right-2 flex flex-col space-y-1">
                {design?.areas?.back?.hasContent && (
                  <div className="w-6 h-6 bg-background border border-border rounded shadow-sm flex items-center justify-center">
                    <Icon name="SquareStack" size={12} className="text-muted-foreground" />
                  </div>
                )}
                {(design?.areas?.leftSleeve?.hasContent || design?.areas?.rightSleeve?.hasContent) && (
                  <div className="w-6 h-6 bg-background border border-border rounded shadow-sm flex items-center justify-center">
                    <Icon name="RectangleHorizontal" size={12} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(design?.status)}`}>
            {design?.status}
          </span>
        </div>

        {/* Completion indicator */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Complete</span>
              <span className="font-medium text-foreground">{getCompletionPercentage(design?.areas)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1 mt-1">
              <div 
                className="bg-primary h-1 rounded-full transition-smooth" 
                style={{ width: `${getCompletionPercentage(design?.areas)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Design Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-foreground truncate">{design?.name}</h3>
            <p className="text-sm text-muted-foreground">
              Created {formatDate(design?.createdAt)}
            </p>
          </div>
          {design?.isExportReady && (
            <Icon name="Download" size={16} className="text-success flex-shrink-0 ml-2" />
          )}
        </div>

        {/* Last modified */}
        <p className="text-xs text-muted-foreground mb-3">
          Modified {formatDate(design?.lastModified)}
        </p>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(design?.id)}
            className="flex-1"
          >
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            onClick={() => onDuplicate(design?.id)}
          >
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(design?.id)}
          >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;