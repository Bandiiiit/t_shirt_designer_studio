import React, { useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbContext from '../../components/ui/BreadcrumbContext';
import DesignStateIndicator from '../../components/ui/DesignStateIndicator';
import CanvasToolbar from './components/CanvasToolbar';
import TShirtMockup from './components/TShirtMockup';
import PropertyPanel from './components/PropertyPanel';
import ColorPalette from './components/ColorPalette';
import ExportActions from './components/ExportActions';
import { fabric } from 'fabric';

const DesignCanvas = () => {
  const [currentArea, setCurrentArea] = useState('front');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectedElement, setSelectedElement] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  
  const canvasRef = useRef(null);

  // Canvas event handlers
  const handleCanvasReady = useCallback((canvas) => {
    canvasRef.current = canvas;
    
    // Set up canvas change detection
    canvas?.on('object:added', () => {
      setHasUnsavedChanges(true);
      // Auto-save simulation
      setTimeout(() => {
        setIsAutoSaving(true);
        setTimeout(() => {
          setIsAutoSaving(false);
          setHasUnsavedChanges(false);
          setLastSaved(new Date());
        }, 1000);
      }, 500);
    });

    canvas?.on('object:modified', () => {
      setHasUnsavedChanges(true);
    });
  }, []);

  const handleSelectionChange = useCallback((element) => {
    setSelectedElement(element);
  }, []);

  // Toolbar actions
  const handleImageUpload = useCallback((imageData, fileName) => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef?.current;
    const img = new Image();
    img.onload = () => {
      const fabricImg = new fabric.Image(img, {
        left: 150,
        top: 200,
        scaleX: 0.5,
        scaleY: 0.5,
        selectable: true
      });
      canvas?.add(fabricImg);
      canvas?.setActiveObject(fabricImg);
      canvas?.renderAll();
    };
    img.src = imageData;
  }, []);

  const handleAddText = useCallback(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef?.current;
    const text = new fabric.Text('New Text', {
      left: 150,
      top: 200,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#000000',
      selectable: true,
      editable: true
    });
    canvas?.add(text);
    canvas?.setActiveObject(text);
    canvas?.renderAll();
  }, []);

  const handleUndo = useCallback(() => {
    // Mock undo functionality
    console.log('Undo action');
  }, []);

  const handleRedo = useCallback(() => {
    // Mock redo functionality
    console.log('Redo action');
  }, []);

  // Property panel actions
  const handleElementUpdate = useCallback((properties) => {
    if (!selectedElement || !canvasRef?.current) return;

    const canvas = canvasRef?.current;
    
    // Update element properties
    Object.keys(properties)?.forEach(key => {
      if (selectedElement?.[key] !== undefined) {
        selectedElement?.set(key, properties?.[key]);
      }
    });

    canvas?.renderAll();
    setHasUnsavedChanges(true);
  }, [selectedElement]);

  const handleElementDelete = useCallback(() => {
    if (!selectedElement || !canvasRef?.current) return;

    const canvas = canvasRef?.current;
    canvas?.remove(selectedElement);
    canvas?.renderAll();
    setSelectedElement(null);
    setHasUnsavedChanges(true);
  }, [selectedElement]);

  // Export actions
  const handleExportArea = useCallback((dataURL, area) => {
    console.log(`Exported ${area} area:`, dataURL);
  }, []);

  const handleExportAll = useCallback((designs) => {
    console.log('Exported all designs:', designs);
  }, []);

  // Area switching
  const handleAreaChange = useCallback((newArea) => {
    setCurrentArea(newArea);
    setSelectedElement(null);
  }, []);

  return (
    <>
      <Helmet>
        <title>Design Canvas - T-Shirt Designer Studio</title>
        <meta name="description" content="Create custom t-shirt designs with our interactive canvas editor. Upload images, add text, and design across different t-shirt areas." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <TabNavigation />

        {/* Breadcrumb Context */}
        <BreadcrumbContext 
          currentArea={currentArea}
          onAreaChange={handleAreaChange}
        />

        {/* Main Content */}
        <div className="flex flex-1 h-[calc(100vh-128px)]">
          {/* Left Toolbar */}
          <CanvasToolbar
            onImageUpload={handleImageUpload}
            onAddText={handleAddText}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={undoStack?.length > 0}
            canRedo={redoStack?.length > 0}
            className="w-64 flex-shrink-0"
          />

          {/* Center Canvas Area */}
          <div className="flex-1 flex flex-col">
            {/* Design State Indicator */}
            <div className="px-6 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <DesignStateIndicator
                  hasUnsavedChanges={hasUnsavedChanges}
                  isAutoSaving={isAutoSaving}
                  lastSaved={lastSaved}
                />
                <div className="text-sm text-muted-foreground">
                  Canvas: {currentArea?.charAt(0)?.toUpperCase() + currentArea?.slice(1)}
                </div>
              </div>
            </div>

            {/* T-Shirt Mockup */}
            <div className="flex-1 p-6 overflow-auto">
              <TShirtMockup
                currentArea={currentArea}
                selectedColor={selectedColor}
                onCanvasReady={handleCanvasReady}
                onSelectionChange={handleSelectionChange}
                className="h-full"
              />
            </div>

            {/* Color Palette */}
            <ColorPalette
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

            {/* Export Actions */}
            <ExportActions
              canvas={canvasRef?.current}
              currentArea={currentArea}
              onExportArea={handleExportArea}
              onExportAll={handleExportAll}
            />
          </div>

          {/* Right Property Panel */}
          <PropertyPanel
            selectedElement={selectedElement}
            onElementUpdate={handleElementUpdate}
            onElementDelete={handleElementDelete}
            className="w-80 flex-shrink-0"
          />
        </div>

        {/* Mobile Bottom Padding */}
        <div className="lg:hidden h-16" />
      </div>
    </>
  );
};

export default DesignCanvas;