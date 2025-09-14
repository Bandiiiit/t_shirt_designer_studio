import React from 'react';
import DesignCard from './DesignCard';

const DesignGrid = ({ 
  designs, 
  viewMode = 'grid', 
  onEdit, 
  onDuplicate, 
  onDelete,
  selectedDesigns = [],
  onSelectDesign,
  showCheckboxes = false,
  className = '' 
}) => {
  const isSelected = (designId) => selectedDesigns?.includes(designId);

  if (designs?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No designs yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Start creating your first t-shirt design to see it appear here. Your designs will be automatically saved as you work.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {designs?.map((design) => (
            <DesignCard
              key={design?.id}
              design={design}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              isSelected={isSelected(design?.id)}
              onSelect={onSelectDesign}
              showCheckbox={showCheckboxes}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {designs?.map((design) => (
            <div key={design?.id} className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
              <div className="flex items-center space-x-4">
                {showCheckboxes && (
                  <input
                    type="checkbox"
                    checked={isSelected(design?.id)}
                    onChange={(e) => onSelectDesign(design?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                )}
                
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-muted/30 rounded-md flex items-center justify-center flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded shadow-sm"
                    style={{ backgroundColor: design?.tshirtColor }}
                  >
                    {design?.areas?.front?.hasContent && (
                      <div className="w-full h-full flex items-center justify-center p-1">
                        <img
                          src={design?.areas?.front?.preview}
                          alt="Design preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Design info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{design?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Created {new Date(design.createdAt)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      design?.status === 'completed' ? 'text-success bg-success/10' :
                      design?.status === 'draft' ? 'text-warning bg-warning/10' :
                      design?.status === 'exported'? 'text-primary bg-primary/10' : 'text-muted-foreground bg-muted'
                    }`}>
                      {design?.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((Object.values(design?.areas)?.filter(area => area?.hasContent)?.length / 4) * 100)}% complete
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => onEdit(design?.id)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
                    title="Edit design"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDuplicate(design?.id)}
                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-smooth"
                    title="Duplicate design"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(design?.id)}
                    className="p-2 text-muted-foreground hover:text-error hover:bg-error/10 rounded-md transition-smooth"
                    title="Delete design"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignGrid;