import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onBulkSelect,
  selectedCount = 0,
  totalCount = 0,
  onBulkDelete,
  onBulkExport,
  className = '' 
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const sortOptions = [
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'createdAt', label: 'Date Created' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'nameDesc', label: 'Name Z-A' },
    { value: 'status', label: 'Status' }
  ];

  const viewModeOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      <div className="p-4">
        {/* Desktop Toolbar */}
        <div className="hidden md:flex items-center justify-between space-x-4">
          {/* Left side - Search and filters */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={16} className="text-muted-foreground" />
              </div>
            </div>

            {/* Sort */}
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by"
              className="w-48"
            />

            {/* Bulk actions */}
            {selectedCount > 0 && (
              <div className="flex items-center space-x-2 pl-4 border-l border-border">
                <span className="text-sm text-muted-foreground">
                  {selectedCount} of {totalCount} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={onBulkExport}
                >
                  Export
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  onClick={onBulkDelete}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Right side - View mode and bulk select */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="CheckSquare"
              onClick={onBulkSelect}
            >
              Select
            </Button>

            {/* View mode toggle */}
            <div className="flex items-center border border-border rounded-md">
              {viewModeOptions?.map((mode) => (
                <button
                  key={mode?.value}
                  onClick={() => onViewModeChange(mode?.value)}
                  className={`
                    p-2 transition-smooth
                    ${viewMode === mode?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                  title={mode?.label}
                >
                  <Icon name={mode?.icon} size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden">
          {/* Top row - Search and filter toggle */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={16} className="text-muted-foreground" />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
            </Button>
          </div>

          {/* Bulk actions bar */}
          {selectedCount > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md mb-3">
              <span className="text-sm font-medium">
                {selectedCount} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={onBulkExport}
                >
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  onClick={onBulkDelete}
                >
                </Button>
              </div>
            </div>
          )}

          {/* Mobile filters panel */}
          {showMobileFilters && (
            <div className="space-y-3 p-3 bg-muted/30 rounded-md">
              <Select
                label="Sort by"
                options={sortOptions}
                value={sortBy}
                onChange={onSortChange}
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">View Mode</span>
                <div className="flex items-center border border-border rounded-md">
                  {viewModeOptions?.map((mode) => (
                    <button
                      key={mode?.value}
                      onClick={() => onViewModeChange(mode?.value)}
                      className={`
                        p-2 transition-smooth
                        ${viewMode === mode?.value
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }
                      `}
                    >
                      <Icon name={mode?.icon} size={16} />
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                iconName="CheckSquare"
                onClick={onBulkSelect}
                fullWidth
              >
                Toggle Selection Mode
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;