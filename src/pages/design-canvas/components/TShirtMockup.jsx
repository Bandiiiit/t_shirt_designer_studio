import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric/fabric-impl';
import Icon from '../../../components/AppIcon';

const TShirtMockup = ({ 
  currentArea, 
  selectedColor, 
  onCanvasReady, 
  onSelectionChange,
  className = '' 
}) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // T-shirt mockup data
  const tshirtAreas = {
    front: {
      name: 'Front',
      mockupUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      canvasArea: { x: 100, y: 150, width: 200, height: 250 }
    },
    back: {
      name: 'Back',
      mockupUrl: 'https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=400&h=500&fit=crop',
      canvasArea: { x: 100, y: 150, width: 200, height: 250 }
    },
    'left-sleeve': {
      name: 'Left Sleeve',
      mockupUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
      canvasArea: { x: 50, y: 100, width: 100, height: 150 }
    },
    'right-sleeve': {
      name: 'Right Sleeve',
      mockupUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
      canvasArea: { x: 250, y: 100, width: 100, height: 150 }
    }
  };

  useEffect(() => {
    if (canvasRef?.current && !fabricCanvasRef?.current) {
      // Initialize Fabric.js canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 400,
        height: 500,
        backgroundColor: 'transparent',
        selection: true,
        preserveObjectStacking: true
      });

      // Set up canvas events
      canvas?.on('selection:created', (e) => {
        onSelectionChange(e?.selected?.[0]);
      });

      canvas?.on('selection:updated', (e) => {
        onSelectionChange(e?.selected?.[0]);
      });

      canvas?.on('selection:cleared', () => {
        onSelectionChange(null);
      });

      fabricCanvasRef.current = canvas;
      setIsCanvasReady(true);
      onCanvasReady(canvas);

      return () => {
        canvas?.dispose();
        fabricCanvasRef.current = null;
      };
    }
  }, [onCanvasReady, onSelectionChange]);

  // Add sample design elements
  const addSampleText = () => {
    if (fabricCanvasRef?.current) {
      const text = new fabric.Text('Sample Text', {
        left: 150,
        top: 200,
        fontFamily: 'Arial',
        fontSize: 24,
        fill: '#000000',
        selectable: true,
        editable: true
      });
      fabricCanvasRef?.current?.add(text);
      fabricCanvasRef?.current?.setActiveObject(text);
    }
  };

  const currentAreaData = tshirtAreas?.[currentArea];

  return (
    <div className={`flex flex-col items-center justify-center bg-muted/30 rounded-lg p-8 ${className}`}>
      {/* Area Title */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-foreground mb-1">
          {currentAreaData?.name} Design
        </h2>
        <p className="text-sm text-muted-foreground">
          Click and drag to position elements
        </p>
      </div>
      {/* T-Shirt Mockup Container */}
      <div className="relative bg-white rounded-lg shadow-elevation-2 p-4">
        {/* T-Shirt Background */}
        <div 
          className="relative rounded-lg overflow-hidden"
          style={{ 
            width: '400px', 
            height: '500px',
            backgroundColor: selectedColor 
          }}
        >
          {/* Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10"
            style={{ 
              width: '400px', 
              height: '500px' 
            }}
          />
          
          {/* Design Area Indicator */}
          <div 
            className="absolute border-2 border-dashed border-primary/30 pointer-events-none"
            style={{
              left: `${currentAreaData?.canvasArea?.x}px`,
              top: `${currentAreaData?.canvasArea?.y}px`,
              width: `${currentAreaData?.canvasArea?.width}px`,
              height: `${currentAreaData?.canvasArea?.height}px`
            }}
          />
        </div>

        {/* Canvas Status */}
        {!isCanvasReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="animate-spin">
                <Icon name="Loader2" size={20} />
              </div>
              <span>Loading canvas...</span>
            </div>
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="mt-4 flex items-center space-x-2">
        <button
          onClick={addSampleText}
          className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
        >
          Add Sample Text
        </button>
        <span className="text-xs text-muted-foreground">
          or use toolbar to add elements
        </span>
      </div>
    </div>
  );
};

export default TShirtMockup;