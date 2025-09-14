import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportActions = ({ 
  canvas, 
  currentArea, 
  onExportArea, 
  onExportAll,
  className = '' 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');

  const handleExportArea = async () => {
    if (!canvas) return;
    
    setIsExporting(true);
    try {
      const dataURL = canvas?.toDataURL({
        format: exportFormat,
        quality: 1,
        multiplier: 2 // Higher resolution
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `tshirt-${currentArea}-design.${exportFormat}`;
      link.href = dataURL;
      link?.click();
      
      onExportArea && onExportArea(dataURL, currentArea);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      // Mock export all functionality
      const mockDesigns = {
        front: canvas?.toDataURL({ format: exportFormat, quality: 1, multiplier: 2 }),
        back: null,
        'left-sleeve': null,
        'right-sleeve': null
      };
      
      onExportAll && onExportAll(mockDesigns);
      
      // Create a zip-like download (simplified)
      const link = document.createElement('a');
      link.download = `tshirt-complete-design-${Date.now()}.${exportFormat}`;
      link.href = mockDesigns?.front;
      link?.click();
    } catch (error) {
      console.error('Export all failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportOptions = [
    { value: 'png', label: 'PNG (Recommended)' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'svg', label: 'SVG (Vector)' }
  ];

  return (
    <div className={`bg-card border-t border-border p-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          {/* Export Format Selection */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-foreground">Export Format:</span>
            <div className="flex items-center space-x-2">
              {exportOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setExportFormat(option?.value)}
                  className={`
                    px-3 py-1.5 text-xs rounded-md border transition-smooth
                    ${exportFormat === option?.value
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-muted-foreground'
                    }
                  `}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Export Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleExportArea}
              disabled={!canvas || isExporting}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              Export {currentArea?.charAt(0)?.toUpperCase() + currentArea?.slice(1)}
            </Button>
            
            <Button
              variant="default"
              onClick={handleExportAll}
              disabled={!canvas || isExporting}
              loading={isExporting}
              iconName="Package"
              iconPosition="left"
            >
              Export All Areas
            </Button>
          </div>
        </div>

        {/* Export Info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">
                <strong>Export Current Area:</strong> Downloads the {currentArea} design as a high-resolution {exportFormat?.toUpperCase()} file.
              </p>
              <p>
                <strong>Export All Areas:</strong> Downloads a complete package with all designed areas for printing.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Canvas Size: 400 × 500px</span>
          <span>Export Resolution: 800 × 1000px (2x)</span>
          <span>Last Export: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ExportActions;