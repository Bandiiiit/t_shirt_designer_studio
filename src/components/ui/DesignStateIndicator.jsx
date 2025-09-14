import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const DesignStateIndicator = ({ 
  hasUnsavedChanges = false, 
  isAutoSaving = false, 
  lastSaved = null,
  className = '' 
}) => {
  const [showSaveStatus, setShowSaveStatus] = useState(false);

  useEffect(() => {
    if (isAutoSaving || hasUnsavedChanges) {
      setShowSaveStatus(true);
    } else {
      const timer = setTimeout(() => setShowSaveStatus(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAutoSaving, hasUnsavedChanges]);

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const saved = new Date(timestamp);
    const diffInMinutes = Math.floor((now - saved) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return saved?.toLocaleDateString();
  };

  if (!showSaveStatus && !hasUnsavedChanges) return null;

  return (
    <div className={`flex items-center space-x-2 text-sm ${className}`}>
      {isAutoSaving && (
        <div className="flex items-center space-x-1 text-muted-foreground">
          <div className="animate-spin">
            <Icon name="Loader2" size={14} />
          </div>
          <span>Saving...</span>
        </div>
      )}
      
      {!isAutoSaving && hasUnsavedChanges && (
        <div className="flex items-center space-x-1 text-warning">
          <Icon name="AlertCircle" size={14} />
          <span>Unsaved changes</span>
        </div>
      )}
      
      {!isAutoSaving && !hasUnsavedChanges && lastSaved && (
        <div className="flex items-center space-x-1 text-success">
          <Icon name="Check" size={14} />
          <span>Saved {formatLastSaved(lastSaved)}</span>
        </div>
      )}
    </div>
  );
};

export default DesignStateIndicator;