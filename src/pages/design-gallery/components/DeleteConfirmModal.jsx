import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  designName = '', 
  isMultiple = false, 
  count = 0 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-error" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              {isMultiple ? 'Delete Designs' : 'Delete Design'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground mb-4">
            {isMultiple ? (
              <>
                Are you sure you want to delete <span className="font-medium text-foreground">{count} designs</span>? 
                This action cannot be undone and all design data will be permanently removed.
              </>
            ) : (
              <>
                Are you sure you want to delete <span className="font-medium text-foreground">"{designName}"</span>? 
                This action cannot be undone and all design data will be permanently removed.
              </>
            )}
          </p>

          <div className="bg-error/5 border border-error/20 rounded-md p-3 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-error mb-1">This will permanently:</p>
                <ul className="text-error/80 space-y-1">
                  <li>• Remove all design elements and layers</li>
                  <li>• Delete exported files and previews</li>
                  <li>• Clear design history and versions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={onConfirm}
          >
            {isMultiple ? `Delete ${count} Designs` : 'Delete Design'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;