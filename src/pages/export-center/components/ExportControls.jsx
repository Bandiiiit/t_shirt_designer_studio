import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportControls = ({ 
  exportSettings, 
  onSettingsChange, 
  onExport, 
  isExporting = false,
  className = '' 
}) => {
  const formatOptions = [
    { value: 'png', label: 'PNG (Recommended)', description: 'Best for printing with transparency' },
    { value: 'pdf', label: 'PDF', description: 'Vector format for professional printing' },
    { value: 'svg', label: 'SVG', description: 'Scalable vector graphics' },
    { value: 'jpg', label: 'JPG', description: 'Compressed format for web use' }
  ];

  const resolutionOptions = [
    { value: '72', label: '72 DPI (Web)', description: 'For digital use and previews' },
    { value: '150', label: '150 DPI (Standard)', description: 'Good quality for most printing' },
    { value: '300', label: '300 DPI (Print)', description: 'High quality for professional printing' },
    { value: '600', label: '600 DPI (Premium)', description: 'Maximum quality for fine details' }
  ];

  const backgroundOptions = [
    { value: 'transparent', label: 'Transparent', description: 'No background (PNG only)' },
    { value: 'white', label: 'White', description: 'Solid white background' },
    { value: 'black', label: 'Black', description: 'Solid black background' },
    { value: 'custom', label: 'Custom Color', description: 'Choose your own color' }
  ];

  const sizingOptions = [
    { value: 'original', label: 'Original Size', description: 'Keep design dimensions' },
    { value: 'small', label: 'Small (8" x 10")', description: 'Compact print size' },
    { value: 'medium', label: 'Medium (11" x 14")', description: 'Standard print size' },
    { value: 'large', label: 'Large (16" x 20")', description: 'Large format printing' },
    { value: 'custom', label: 'Custom Dimensions', description: 'Specify exact size' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...exportSettings, [key]: value });
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Export Settings</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your export preferences for optimal results
        </p>
      </div>

      {/* Settings Form */}
      <div className="p-6 space-y-6">
        {/* Format Selection */}
        <div>
          <Select
            label="Export Format"
            description="Choose the file format for your design"
            options={formatOptions}
            value={exportSettings.format}
            onChange={(value) => handleSettingChange('format', value)}
          />
        </div>

        {/* Resolution Selection */}
        <div>
          <Select
            label="Resolution (DPI)"
            description="Higher DPI provides better print quality"
            options={resolutionOptions}
            value={exportSettings.resolution}
            onChange={(value) => handleSettingChange('resolution', value)}
          />
        </div>

        {/* Background Options */}
        <div>
          <Select
            label="Background"
            description="Set the background for your exported design"
            options={backgroundOptions}
            value={exportSettings.background}
            onChange={(value) => handleSettingChange('background', value)}
          />
          
          {exportSettings.background === 'custom' && (
            <div className="mt-3">
              <label className="block text-sm font-medium text-foreground mb-2">
                Custom Background Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={exportSettings.customColor || '#ffffff'}
                  onChange={(e) => handleSettingChange('customColor', e.target.value)}
                  className="w-12 h-10 border border-border rounded-md cursor-pointer"
                />
                <input
                  type="text"
                  value={exportSettings.customColor || '#ffffff'}
                  onChange={(e) => handleSettingChange('customColor', e.target.value)}
                  placeholder="#ffffff"
                  className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sizing Options */}
        <div>
          <Select
            label="Print Size"
            description="Choose the output dimensions"
            options={sizingOptions}
            value={exportSettings.sizing}
            onChange={(value) => handleSettingChange('sizing', value)}
          />
          
          {exportSettings.sizing === 'custom' && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Width (inches)
                </label>
                <input
                  type="number"
                  value={exportSettings.customWidth || ''}
                  onChange={(e) => handleSettingChange('customWidth', e.target.value)}
                  placeholder="12"
                  min="1"
                  max="48"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Height (inches)
                </label>
                <input
                  type="number"
                  value={exportSettings.customHeight || ''}
                  onChange={(e) => handleSettingChange('customHeight', e.target.value)}
                  placeholder="16"
                  min="1"
                  max="48"
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Advanced Options</h3>
          
          <Checkbox
            label="Include bleed area"
            description="Add 0.125&quot; bleed for professional printing"
            checked={exportSettings.includeBleed}
            onChange={(e) => handleSettingChange('includeBleed', e.target.checked)}
          />
          
          <Checkbox
            label="Embed color profile"
            description="Include ICC color profile for accurate printing"
            checked={exportSettings.embedColorProfile}
            onChange={(e) => handleSettingChange('embedColorProfile', e.target.checked)}
          />
          
          <Checkbox
            label="Compress file size"
            description="Optimize file size while maintaining quality"
            checked={exportSettings.compress}
            onChange={(e) => handleSettingChange('compress', e.target.checked)}
          />
        </div>

        {/* File Naming */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            File Name Prefix
          </label>
          <input
            type="text"
            value={exportSettings.filePrefix || ''}
            onChange={(e) => handleSettingChange('filePrefix', e.target.value)}
            placeholder="my-tshirt-design"
            className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Files will be named: {exportSettings.filePrefix || 'design'}-front.{exportSettings.format}
          </p>
        </div>
      </div>

      {/* Export Actions */}
      <div className="p-6 border-t border-border bg-muted/20">
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            onClick={() => onExport('selected')}
            disabled={!exportSettings.selectedAreas?.length}
          >
            {isExporting ? 'Exporting...' : 'Export Selected Areas'}
          </Button>
          
          <Button
            variant="outline"
            size="default"
            fullWidth
            iconName="Package"
            iconPosition="left"
            onClick={() => onExport('all')}
            disabled={isExporting}
          >
            Download Complete Package
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Estimated file size: {exportSettings.estimatedSize || '2.4 MB'}
        </div>
      </div>
    </div>
  );
};

export default ExportControls;