import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportQueue = ({ queue, onRemoveItem, onClearQueue, className = '' }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Icon name="Clock" size={16} className="text-muted-foreground" />;
      case 'processing':
        return <div className="animate-spin"><Icon name="Loader2" size={16} className="text-primary" /></div>;
      case 'completed':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'failed':
        return <Icon name="XCircle" size={16} className="text-error" />;
      default:
        return <Icon name="File" size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-primary';
      case 'completed':
        return 'bg-success';
      case 'failed':
        return 'bg-error';
      default:
        return 'bg-muted-foreground';
    }
  };

  const formatTimeRemaining = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const completedItems = queue?.filter(item => item?.status === 'completed');
  const processingItems = queue?.filter(item => item?.status === 'processing');
  const pendingItems = queue?.filter(item => item?.status === 'pending');
  const failedItems = queue?.filter(item => item?.status === 'failed');

  if (queue?.length === 0) {
    return (
      <div className={`bg-card rounded-lg border border-border shadow-elevation-1 ${className}`}>
        <div className="p-8 text-center">
          <Icon name="Download" size={48} className="text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No exports in queue</h3>
          <p className="text-muted-foreground">
            Your export queue is empty. Start by selecting areas to export from the preview panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card rounded-lg border border-border shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Export Queue</h2>
            <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
              {queue?.length}
            </div>
          </div>
          {queue?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={onClearQueue}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      {/* Queue Stats */}
      <div className="p-4 border-b border-border bg-muted/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{processingItems?.length}</div>
            <div className="text-xs text-muted-foreground">Processing</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">{pendingItems?.length}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">{completedItems?.length}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-error">{failedItems?.length}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
        </div>
      </div>
      {/* Queue Items */}
      <div className="max-h-96 overflow-y-auto">
        {queue?.map((item) => (
          <div key={item?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {getStatusIcon(item?.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {item?.fileName}
                    </h4>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${item?.status === 'completed' ? 'bg-success/10 text-success' :
                        item?.status === 'processing' ? 'bg-primary/10 text-primary' :
                        item?.status === 'failed'? 'bg-error/10 text-error' : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {getStatusText(item?.status)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {item?.format?.toUpperCase()} • {item?.fileSize}
                    </span>
                    {item?.status === 'processing' && item?.timeRemaining && (
                      <span className="text-xs text-muted-foreground">
                        {formatTimeRemaining(item?.timeRemaining)} remaining
                      </span>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  {item?.status === 'processing' && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(item?.status)}`}
                          style={{ width: `${item?.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {item?.status === 'completed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={() => {
                      // Simulate download
                      const link = document.createElement('a');
                      link.href = '#';
                      link.download = item?.fileName;
                      link?.click();
                    }}
                  />
                )}
                
                {item?.status === 'failed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => {
                      // Retry logic would go here
                      console.log('Retrying export for:', item?.fileName);
                    }}
                  />
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => onRemoveItem(item?.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Download All Completed */}
      {completedItems?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Package"
            iconPosition="left"
            onClick={() => {
              // Download all completed files as ZIP
              console.log('Downloading all completed files');
            }}
          >
            Download All Completed ({completedItems?.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExportQueue;