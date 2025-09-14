import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/Button';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbContext from '../../components/ui/BreadcrumbContext';
import DesignStateIndicator from '../../components/ui/DesignStateIndicator';
import DesignPreview from './components/DesignPreview';
import ExportControls from './components/ExportControls';
import ExportQueue from './components/ExportQueue';
import DesignSummary from './components/DesignSummary';

const ExportCenter = () => {
  const [selectedAreas, setSelectedAreas] = useState(['front', 'back']);
  const [isExporting, setIsExporting] = useState(false);
  const [exportQueue, setExportQueue] = useState([
    {
      id: 1,
      fileName: 'tshirt-design-front.png',
      format: 'png',
      fileSize: '2.4 MB',
      status: 'processing',
      progress: 65,
      timeRemaining: 45
    },
    {
      id: 2,
      fileName: 'tshirt-design-back.png',
      format: 'png',
      fileSize: '1.8 MB',
      status: 'completed',
      progress: 100
    },
    {
      id: 3,
      fileName: 'tshirt-design-sleeve.pdf',
      format: 'pdf',
      fileSize: '3.2 MB',
      status: 'pending',
      progress: 0
    }
  ]);

  const [exportSettings, setExportSettings] = useState({
    format: 'png',
    resolution: '300',
    background: 'transparent',
    sizing: 'original',
    includeBleed: true,
    embedColorProfile: true,
    compress: false,
    filePrefix: 'tshirt-design',
    selectedAreas: selectedAreas,
    estimatedSize: '4.2 MB'
  });

  // Mock design data
  const designData = {
    areas: {
      front: { hasDesign: true, elements: 6 },
      back: { hasDesign: true, elements: 4 },
      'left-sleeve': { hasDesign: false, elements: 0 },
      'right-sleeve': { hasDesign: true, elements: 2 }
    }
  };

  // Update selected areas in export settings
  useEffect(() => {
    setExportSettings(prev => ({
      ...prev,
      selectedAreas: selectedAreas,
      estimatedSize: calculateEstimatedSize(selectedAreas, prev?.format, prev?.resolution)
    }));
  }, [selectedAreas]);

  const calculateEstimatedSize = (areas, format, resolution) => {
    const baseSize = areas?.length * 1.2; // MB per area
    const formatMultiplier = format === 'png' ? 1.2 : format === 'pdf' ? 1.8 : format === 'svg' ? 0.3 : 1.0;
    const resolutionMultiplier = resolution === '300' ? 1.5 : resolution === '600' ? 2.5 : 1.0;
    const totalSize = baseSize * formatMultiplier * resolutionMultiplier;
    return `${totalSize?.toFixed(1)} MB`;
  };

  const handleAreaToggle = (areaId) => {
    setSelectedAreas(prev => 
      prev?.includes(areaId) 
        ? prev?.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleExport = async (type) => {
    setIsExporting(true);
    
    // Simulate export process
    const newExports = selectedAreas?.map((area, index) => ({
      id: Date.now() + index,
      fileName: `${exportSettings?.filePrefix}-${area}.${exportSettings?.format}`,
      format: exportSettings?.format,
      fileSize: calculateEstimatedSize([area], exportSettings?.format, exportSettings?.resolution),
      status: 'processing',
      progress: 0,
      timeRemaining: 30 + (index * 15)
    }));

    setExportQueue(prev => [...prev, ...newExports]);

    // Simulate processing
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  const handleRemoveQueueItem = (itemId) => {
    setExportQueue(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleClearQueue = () => {
    setExportQueue([]);
  };

  const handleSettingsChange = (newSettings) => {
    setExportSettings(newSettings);
  };

  // Simulate queue processing
  useEffect(() => {
    const interval = setInterval(() => {
      setExportQueue(prev => prev?.map(item => {
        if (item?.status === 'processing' && item?.progress < 100) {
          const newProgress = Math.min(item?.progress + Math.random() * 15, 100);
          const newTimeRemaining = Math.max(item?.timeRemaining - 5, 0);
          
          return {
            ...item,
            progress: newProgress,
            timeRemaining: newTimeRemaining,
            status: newProgress >= 100 ? 'completed' : 'processing'
          };
        }
        return item;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <TabNavigation />
      {/* Breadcrumb Context */}
      <BreadcrumbContext 
        currentArea="export"
        className="border-b-0"
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Export Center</h1>
              <p className="text-muted-foreground mt-2">
                Download and prepare your t-shirt designs for printing with professional quality options
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DesignStateIndicator 
                hasUnsavedChanges={false}
                lastSaved={new Date(Date.now() - 300000)}
              />
              
              <div className="flex items-center space-x-2">
                <Link to="/design-canvas">
                  <Button variant="outline" iconName="ArrowLeft" iconPosition="left">
                    Back to Canvas
                  </Button>
                </Link>
                <Link to="/design-gallery">
                  <Button variant="ghost" iconName="Images" iconPosition="left">
                    Gallery
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Export Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Design Preview */}
          <div className="xl:col-span-2 space-y-6">
            <DesignPreview
              designs={designData}
              selectedAreas={selectedAreas}
              onAreaToggle={handleAreaToggle}
            />
            
            {/* Mobile Export Controls */}
            <div className="xl:hidden">
              <ExportControls
                exportSettings={exportSettings}
                onSettingsChange={handleSettingsChange}
                onExport={handleExport}
                isExporting={isExporting}
              />
            </div>
          </div>

          {/* Right Column - Controls and Queue */}
          <div className="space-y-6">
            {/* Desktop Export Controls */}
            <div className="hidden xl:block">
              <ExportControls
                exportSettings={exportSettings}
                onSettingsChange={handleSettingsChange}
                onExport={handleExport}
                isExporting={isExporting}
              />
            </div>

            <ExportQueue
              queue={exportQueue}
              onRemoveItem={handleRemoveQueueItem}
              onClearQueue={handleClearQueue}
            />
          </div>
        </div>

        {/* Bottom Section - Design Summary */}
        <div className="mt-8">
          <DesignSummary designData={designData} />
        </div>

        {/* Quick Actions Bar - Mobile */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevation-2 p-4 z-40">
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              size="sm"
              fullWidth
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              onClick={() => handleExport('selected')}
              disabled={selectedAreas?.length === 0}
            >
              Export ({selectedAreas?.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Package"
              onClick={() => handleExport('all')}
              disabled={isExporting}
            >
              All
            </Button>
          </div>
        </div>

        {/* Mobile Bottom Padding */}
        <div className="xl:hidden h-20" />
      </div>
    </div>
  );
};

export default ExportCenter;