import React from 'react';
import Icon from '../AppIcon';

const BreadcrumbContext = ({ 
  currentArea = 'front', 
  onAreaChange = () => {}, 
  className = '' 
}) => {
  const designAreas = [
    { id: 'front', label: 'Front', icon: 'Square' },
    { id: 'back', label: 'Back', icon: 'SquareStack' },
    { id: 'left-sleeve', label: 'Left Sleeve', icon: 'RectangleHorizontal' },
    { id: 'right-sleeve', label: 'Right Sleeve', icon: 'RectangleHorizontal' }
  ];

  const currentAreaData = designAreas?.find(area => area?.id === currentArea);

  return (
    <div className={`bg-muted/50 border-b border-border px-4 py-3 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Path */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Design Canvas</span>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <Icon name={currentAreaData?.icon} size={16} className="text-foreground" />
              <span className="font-medium text-foreground">{currentAreaData?.label}</span>
            </div>
          </div>

          {/* Area Switcher - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {designAreas?.map((area) => (
              <button
                key={area?.id}
                onClick={() => onAreaChange(area?.id)}
                className={`
                  flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-smooth
                  ${currentArea === area?.id
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background'
                  }
                `}
                title={`Switch to ${area?.label}`}
              >
                <Icon name={area?.icon} size={14} />
                <span>{area?.label}</span>
              </button>
            ))}
          </div>

          {/* Area Switcher - Mobile Dropdown */}
          <div className="md:hidden relative">
            <select
              value={currentArea}
              onChange={(e) => onAreaChange(e?.target?.value)}
              className="appearance-none bg-background border border-border rounded-md px-3 py-1.5 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {designAreas?.map((area) => (
                <option key={area?.id} value={area?.id}>
                  {area?.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbContext;