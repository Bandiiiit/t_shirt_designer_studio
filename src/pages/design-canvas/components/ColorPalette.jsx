import React from 'react';
import Icon from '../../../components/AppIcon';

const ColorPalette = ({ 
  selectedColor, 
  onColorChange, 
  className = '' 
}) => {
  const predefinedColors = [
    { name: 'White', value: '#FFFFFF', textColor: '#000000' },
    { name: 'Black', value: '#000000', textColor: '#FFFFFF' },
    { name: 'Navy', value: '#1E3A8A', textColor: '#FFFFFF' },
    { name: 'Red', value: '#DC2626', textColor: '#FFFFFF' },
    { name: 'Green', value: '#16A34A', textColor: '#FFFFFF' },
    { name: 'Purple', value: '#9333EA', textColor: '#FFFFFF' },
    { name: 'Orange', value: '#EA580C', textColor: '#FFFFFF' },
    { name: 'Pink', value: '#EC4899', textColor: '#FFFFFF' },
    { name: 'Yellow', value: '#EAB308', textColor: '#000000' },
    { name: 'Gray', value: '#6B7280', textColor: '#FFFFFF' },
    { name: 'Teal', value: '#0D9488', textColor: '#FFFFFF' },
    { name: 'Indigo', value: '#4F46E5', textColor: '#FFFFFF' }
  ];

  return (
    <div className={`bg-card border-t border-border p-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">T-Shirt Base Color</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Custom:</span>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => onColorChange(e?.target?.value)}
              className="w-8 h-8 rounded border border-border cursor-pointer"
              title="Choose custom color"
            />
          </div>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
          {predefinedColors?.map((color) => (
            <button
              key={color?.value}
              onClick={() => onColorChange(color?.value)}
              className={`
                relative w-12 h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105
                ${selectedColor === color?.value 
                  ? 'border-primary shadow-elevation-2' 
                  : 'border-border hover:border-muted-foreground'
                }
              `}
              style={{ backgroundColor: color?.value }}
              title={color?.name}
            >
              {selectedColor === color?.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon 
                    name="Check" 
                    size={16} 
                    color={color?.textColor}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Selected Color Info */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Selected: {selectedColor}</span>
          <span>
            {predefinedColors?.find(c => c?.value === selectedColor)?.name || 'Custom Color'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;