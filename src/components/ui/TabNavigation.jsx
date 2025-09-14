import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationTabs = [
    {
      label: 'Design',
      path: '/design-canvas',
      icon: 'Palette',
      tooltip: 'Create and edit t-shirt designs'
    },
    {
      label: 'Gallery',
      path: '/design-gallery',
      icon: 'Images',
      tooltip: 'Browse and manage your designs'
    },
    {
      label: 'Export',
      path: '/export-center',
      icon: 'Download',
      tooltip: 'Export designs for printing'
    }
  ];

  const isActiveTab = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className={`bg-card border-b border-border shadow-elevation-1 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/design-canvas" className="flex items-center space-x-2 transition-hover hover:opacity-80">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Shirt" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">T-Shirt Designer Studio</span>
            </Link>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationTabs?.map((tab) => (
              <Link
                key={tab?.path}
                to={tab?.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth
                  ${isActiveTab(tab?.path)
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={tab?.tooltip}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-hover">
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Tab Navigation - Bottom Fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elevation-2 z-50">
        <div className="flex items-center justify-around py-2">
          {navigationTabs?.map((tab) => (
            <Link
              key={tab?.path}
              to={tab?.path}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-smooth min-w-0 flex-1
                ${isActiveTab(tab?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }
              `}
              title={tab?.tooltip}
            >
              <Icon name={tab?.icon} size={20} />
              <span className="text-xs font-medium truncate">{tab?.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;