import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CanvasToolbar = ({ 
  onImageUpload, 
  onAddText, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  className = '' 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file && (file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/svg+xml')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e?.target?.result, file?.name);
      };
      reader?.readAsDataURL(file);
    }
  };

  const toolbarItems = [
    {
      id: 'upload',
      label: 'Upload Image',
      icon: 'Upload',
      action: () => document.getElementById('image-upload')?.click(),
      tooltip: 'Upload PNG, JPG, or SVG files'
    },
    {
      id: 'text',
      label: 'Add Text',
      icon: 'Type',
      action: onAddText,
      tooltip: 'Add text element to design'
    },
    {
      id: 'undo',
      label: 'Undo',
      icon: 'Undo2',
      action: onUndo,
      disabled: !canUndo,
      tooltip: 'Undo last action'
    },
    {
      id: 'redo',
      label: 'Redo',
      icon: 'Redo2',
      action: onRedo,
      disabled: !canRedo,
      tooltip: 'Redo last action'
    }
  ];

  return (
    <>
      {/* Desktop Toolbar */}
      <div className={`hidden lg:flex flex-col bg-card border-r border-border shadow-elevation-1 ${className}`}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Tools</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          </div>
        </div>

        <div className={`flex-1 p-4 space-y-3 ${isCollapsed ? 'hidden' : ''}`}>
          {toolbarItems?.map((item) => (
            <Button
              key={item?.id}
              variant="outline"
              fullWidth
              disabled={item?.disabled}
              onClick={item?.action}
              iconName={item?.icon}
              iconPosition="left"
              className="justify-start"
              title={item?.tooltip}
            >
              {item?.label}
            </Button>
          ))}

          {/* Layer Management */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Layers</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                <div className="flex items-center space-x-2">
                  <Icon name="Image" size={14} />
                  <span className="text-sm">Background</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Icon name="Eye" size={12} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed State */}
        {isCollapsed && (
          <div className="p-2 space-y-2">
            {toolbarItems?.map((item) => (
              <Button
                key={item?.id}
                variant="ghost"
                size="icon"
                disabled={item?.disabled}
                onClick={item?.action}
                title={item?.tooltip}
                className="w-full h-10"
              >
                <Icon name={item?.icon} size={18} />
              </Button>
            ))}
          </div>
        )}
      </div>
      {/* Mobile Toolbar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border shadow-elevation-2 z-40">
        <div className="flex items-center justify-around p-2">
          {toolbarItems?.map((item) => (
            <Button
              key={item?.id}
              variant="ghost"
              size="icon"
              disabled={item?.disabled}
              onClick={item?.action}
              title={item?.tooltip}
              className="flex-1 h-12"
            >
              <Icon name={item?.icon} size={20} />
            </Button>
          ))}
        </div>
      </div>
      {/* Hidden File Input */}
      <input
        id="image-upload"
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
};

export default CanvasToolbar;