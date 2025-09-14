import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PropertyPanel = ({ 
  selectedElement, 
  onElementUpdate, 
  onElementDelete,
  className = '' 
}) => {
  const [properties, setProperties] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (selectedElement) {
      setProperties({
        text: selectedElement?.text || '',
        fontSize: selectedElement?.fontSize || 24,
        fontFamily: selectedElement?.fontFamily || 'Arial',
        fill: selectedElement?.fill || '#000000',
        fontWeight: selectedElement?.fontWeight || 'normal',
        fontStyle: selectedElement?.fontStyle || 'normal',
        textAlign: selectedElement?.textAlign || 'left',
        left: Math.round(selectedElement?.left || 0),
        top: Math.round(selectedElement?.top || 0),
        angle: Math.round(selectedElement?.angle || 0),
        scaleX: selectedElement?.scaleX || 1,
        scaleY: selectedElement?.scaleY || 1
      });
    }
  }, [selectedElement]);

  const fontFamilyOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Impact', label: 'Impact' },
    { value: 'Comic Sans MS', label: 'Comic Sans MS' }
  ];

  const fontSizeOptions = [
    { value: 12, label: '12px' },
    { value: 14, label: '14px' },
    { value: 16, label: '16px' },
    { value: 18, label: '18px' },
    { value: 24, label: '24px' },
    { value: 32, label: '32px' },
    { value: 48, label: '48px' },
    { value: 64, label: '64px' }
  ];

  const textAlignOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ];

  const handlePropertyChange = (property, value) => {
    const newProperties = { ...properties, [property]: value };
    setProperties(newProperties);
    onElementUpdate(newProperties);
  };

  const handleTextFormatting = (format) => {
    let newValue;
    switch (format) {
      case 'bold':
        newValue = properties?.fontWeight === 'bold' ? 'normal' : 'bold';
        handlePropertyChange('fontWeight', newValue);
        break;
      case 'italic':
        newValue = properties?.fontStyle === 'italic' ? 'normal' : 'italic';
        handlePropertyChange('fontStyle', newValue);
        break;
      default:
        break;
    }
  };

  if (!selectedElement) {
    return (
      <div className={`bg-card border-l border-border shadow-elevation-1 ${className}`}>
        <div className="p-4 text-center">
          <Icon name="MousePointer2" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-medium text-foreground mb-2">No Element Selected</h3>
          <p className="text-sm text-muted-foreground">
            Select an element on the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border-l border-border shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Properties</h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? 'ChevronLeft' : 'ChevronRight'} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onElementDelete}
              className="h-8 w-8 text-error hover:text-error"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Text Properties */}
          {selectedElement?.type === 'text' && (
            <>
              <div>
                <Input
                  label="Text Content"
                  type="text"
                  value={properties?.text}
                  onChange={(e) => handlePropertyChange('text', e?.target?.value)}
                  placeholder="Enter text"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Font Family"
                  options={fontFamilyOptions}
                  value={properties?.fontFamily}
                  onChange={(value) => handlePropertyChange('fontFamily', value)}
                />
                <Select
                  label="Font Size"
                  options={fontSizeOptions}
                  value={properties?.fontSize}
                  onChange={(value) => handlePropertyChange('fontSize', value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Text Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={properties?.fill}
                    onChange={(e) => handlePropertyChange('fill', e?.target?.value)}
                    className="w-12 h-8 rounded border border-border cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={properties?.fill}
                    onChange={(e) => handlePropertyChange('fill', e?.target?.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Text Formatting
                </label>
                <div className="flex items-center space-x-1">
                  <Button
                    variant={properties?.fontWeight === 'bold' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => handleTextFormatting('bold')}
                    className="h-8 w-8"
                  >
                    <Icon name="Bold" size={14} />
                  </Button>
                  <Button
                    variant={properties?.fontStyle === 'italic' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => handleTextFormatting('italic')}
                    className="h-8 w-8"
                  >
                    <Icon name="Italic" size={14} />
                  </Button>
                </div>
              </div>

              <div>
                <Select
                  label="Text Alignment"
                  options={textAlignOptions}
                  value={properties?.textAlign}
                  onChange={(value) => handlePropertyChange('textAlign', value)}
                />
              </div>
            </>
          )}

          {/* Position & Transform */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Position & Transform</h4>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="X Position"
                type="number"
                value={properties?.left}
                onChange={(e) => handlePropertyChange('left', parseInt(e?.target?.value))}
              />
              <Input
                label="Y Position"
                type="number"
                value={properties?.top}
                onChange={(e) => handlePropertyChange('top', parseInt(e?.target?.value))}
              />
              <Input
                label="Rotation"
                type="number"
                value={properties?.angle}
                onChange={(e) => handlePropertyChange('angle', parseInt(e?.target?.value))}
                description="Degrees"
              />
              <Input
                label="Scale"
                type="number"
                step="0.1"
                min="0.1"
                max="5"
                value={properties?.scaleX}
                onChange={(e) => handlePropertyChange('scaleX', parseFloat(e?.target?.value))}
              />
            </div>
          </div>

          {/* Layer Controls */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Layer Order</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" iconName="ArrowUp" iconPosition="left">
                Bring Forward
              </Button>
              <Button variant="outline" size="sm" iconName="ArrowDown" iconPosition="left">
                Send Backward
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPanel;