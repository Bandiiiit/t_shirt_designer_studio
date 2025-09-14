import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DesignPreview = ({ designs, selectedAreas, onAreaToggle, className = '' }) => {
  const [activeTab, setActiveTab] = useState('front');

  const designAreas = [
    { 
      id: 'front', 
      label: 'Front', 
      icon: 'Square',
      resolution: '3000x3000px',
      fileSize: '2.4 MB',
      hasDesign: true
    },
    { 
      id: 'back', 
      label: 'Back', 
      icon: 'SquareStack',
      resolution: '3000x3000px', 
      fileSize: '1.8 MB',
      hasDesign: true
    },
    { 
      id: 'left-sleeve', 
      label: 'Left Sleeve', 
      icon: 'RectangleHorizontal',
      resolution: '1500x1500px',
      fileSize: '0.9 MB',
      hasDesign: false
    },
    { 
      id: 'right-sleeve', 
      label: 'Right Sleeve', 
      icon: 'RectangleHorizontal',
      resolution: '1500x1500px',
      fileSize: '1.1 MB',
      hasDesign: true
    }
  ];

  const activeArea = designAreas?.find(area => area?.id === activeTab);

  return (
    <div className={`bg-card rounded-lg border border-border shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Design Preview</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Review your design across all t-shirt areas
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Eye" size={16} />
            <span>Live Preview</span>
          </div>
        </div>
      </div>
      {/* Desktop Tab Navigation */}
      <div className="hidden md:flex border-b border-border">
        {designAreas?.map((area) => (
          <button
            key={area?.id}
            onClick={() => setActiveTab(area?.id)}
            className={`
              flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth
              ${activeTab === area?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }
            `}
          >
            <Icon name={area?.icon} size={16} />
            <span>{area?.label}</span>
            {area?.hasDesign && (
              <div className="w-2 h-2 bg-success rounded-full" />
            )}
          </button>
        ))}
      </div>
      {/* Mobile Area Selector */}
      <div className="md:hidden p-4 border-b border-border">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e?.target?.value)}
          className="w-full appearance-none bg-background border border-border rounded-md px-3 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {designAreas?.map((area) => (
            <option key={area?.id} value={area?.id}>
              {area?.label} {area?.hasDesign ? '●' : '○'}
            </option>
          ))}
        </select>
      </div>
      {/* Preview Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* T-Shirt Mockup */}
          <div className="flex-1">
            <div className="relative bg-muted/30 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              {activeArea?.hasDesign ? (
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
                    alt={`${activeArea?.label} design preview`}
                    className="w-80 h-80 object-contain rounded-lg shadow-elevation-2"
                  />
                  <div className="absolute -top-2 -right-2 bg-success text-success-foreground rounded-full p-1">
                    <Icon name="Check" size={16} />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-80 h-80 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="ImageOff" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">No design for {activeArea?.label}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Area Details */}
          <div className="lg:w-80">
            <div className="bg-muted/30 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">{activeArea?.label} Details</h3>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAreas?.includes(activeTab)}
                    onChange={() => onAreaToggle(activeTab)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-muted-foreground">Include in export</span>
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Resolution:</span>
                  <span className="font-medium text-foreground">{activeArea?.resolution}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="font-medium text-foreground">{activeArea?.fileSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <div className="flex items-center space-x-1">
                    {activeArea?.hasDesign ? (
                      <>
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span className="text-success font-medium">Ready</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                        <span className="text-muted-foreground">Empty</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {activeArea?.hasDesign && (
                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Print-ready quality (300 DPI)</p>
                    <p>• CMYK color profile compatible</p>
                    <p>• Transparent background supported</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="px-6 py-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedAreas?.length} of {designAreas?.filter(a => a?.hasDesign)?.length} areas selected
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const allAreas = designAreas?.filter(a => a?.hasDesign)?.map(a => a?.id);
                allAreas?.forEach(area => {
                  if (!selectedAreas?.includes(area)) {
                    onAreaToggle(area);
                  }
                });
              }}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-hover"
            >
              Select All
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => {
                selectedAreas?.forEach(area => onAreaToggle(area));
              }}
              className="text-sm text-muted-foreground hover:text-foreground font-medium transition-hover"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPreview;