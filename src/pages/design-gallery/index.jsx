import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TabNavigation from '../../components/ui/TabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterToolbar from './components/FilterToolbar';
import DesignGrid from './components/DesignGrid';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const DesignGallery = () => {
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('lastModified');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, design: null, isMultiple: false });

  // Mock design data
  const mockDesigns = [
    {
      id: 'design-001',
      name: 'Summer Vibes Collection',
      createdAt: '2024-09-10T10:30:00Z',
      lastModified: '2024-09-14T15:45:00Z',
      status: 'completed',
      tshirtColor: '#ffffff',
      isExportReady: true,
      areas: {
        front: { 
          hasContent: true, 
          preview: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop&crop=center' 
        },
        back: { 
          hasContent: true, 
          preview: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop&crop=center' 
        },
        leftSleeve: { hasContent: false, preview: null },
        rightSleeve: { hasContent: true, preview: null }
      }
    },
    {
      id: 'design-002',
      name: 'Corporate Logo Design',
      createdAt: '2024-09-12T14:20:00Z',
      lastModified: '2024-09-13T09:15:00Z',
      status: 'draft',
      tshirtColor: '#000000',
      isExportReady: false,
      areas: {
        front: { 
          hasContent: true, 
          preview: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?w=200&h=200&fit=crop&crop=center' 
        },
        back: { hasContent: false, preview: null },
        leftSleeve: { hasContent: false, preview: null },
        rightSleeve: { hasContent: false, preview: null }
      }
    },
    {
      id: 'design-003',
      name: 'Vintage Band Tee',
      createdAt: '2024-09-08T16:45:00Z',
      lastModified: '2024-09-14T11:30:00Z',
      status: 'exported',
      tshirtColor: '#1f2937',
      isExportReady: true,
      areas: {
        front: { 
          hasContent: true, 
          preview: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg?w=200&h=200&fit=crop&crop=center' 
        },
        back: { 
          hasContent: true, 
          preview: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg?w=200&h=200&fit=crop&crop=center' 
        },
        leftSleeve: { hasContent: true, preview: null },
        rightSleeve: { hasContent: true, preview: null }
      }
    },
    {
      id: 'design-004',
      name: 'Minimalist Typography',
      createdAt: '2024-09-11T08:15:00Z',
      lastModified: '2024-09-12T13:20:00Z',
      status: 'completed',
      tshirtColor: '#ef4444',
      isExportReady: true,
      areas: {
        front: { 
          hasContent: true, 
          preview: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&crop=center' 
        },
        back: { hasContent: false, preview: null },
        leftSleeve: { hasContent: false, preview: null },
        rightSleeve: { hasContent: false, preview: null }
      }
    },
    {
      id: 'design-005',
      name: 'Abstract Art Print',
      createdAt: '2024-09-09T12:00:00Z',
      lastModified: '2024-09-14T16:45:00Z',
      status: 'draft',
      tshirtColor: '#10b981',
      isExportReady: false,
      areas: {
        front: { 
          hasContent: true, 
          preview: 'https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?w=200&h=200&fit=crop&crop=center' 
        },
        back: { 
          hasContent: true, 
          preview: 'https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?w=200&h=200&fit=crop&crop=center' 
        },
        leftSleeve: { hasContent: false, preview: null },
        rightSleeve: { hasContent: false, preview: null }
      }
    },
    {
      id: 'design-006',
      name: 'Sports Team Jersey',
      createdAt: '2024-09-07T19:30:00Z',
      lastModified: '2024-09-14T08:10:00Z',
      status: 'completed',
      tshirtColor: '#3b82f6',
      isExportReady: true,
      areas: {
        front: { 
          hasContent: true, 
          preview: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=200&h=200&fit=crop&crop=center' 
        },
        back: { 
          hasContent: true, 
          preview: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg?w=200&h=200&fit=crop&crop=center' 
        },
        leftSleeve: { hasContent: true, preview: null },
        rightSleeve: { hasContent: true, preview: null }
      }
    }
  ];

  // Filter and sort designs
  const filteredAndSortedDesigns = useMemo(() => {
    let filtered = mockDesigns;

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(design =>
        design?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'nameDesc':
          return b?.name?.localeCompare(a?.name);
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'lastModified':
        default:
          return new Date(b.lastModified) - new Date(a.lastModified);
      }
    });

    return filtered;
  }, [searchQuery, sortBy]);

  // Handle design actions
  const handleEditDesign = (designId) => {
    navigate(`/design-canvas?design=${designId}`);
  };

  const handleDuplicateDesign = (designId) => {
    const originalDesign = mockDesigns?.find(d => d?.id === designId);
    if (originalDesign) {
      // In a real app, this would create a new design with copied data
      console.log('Duplicating design:', originalDesign?.name);
      // Navigate to canvas with duplicated design
      navigate(`/design-canvas?duplicate=${designId}`);
    }
  };

  const handleDeleteDesign = (designId) => {
    const design = mockDesigns?.find(d => d?.id === designId);
    setDeleteModal({
      isOpen: true,
      design,
      isMultiple: false
    });
  };

  const handleBulkDelete = () => {
    setDeleteModal({
      isOpen: true,
      design: null,
      isMultiple: true
    });
  };

  const confirmDelete = () => {
    if (deleteModal?.isMultiple) {
      console.log('Deleting designs:', selectedDesigns);
      setSelectedDesigns([]);
    } else {
      console.log('Deleting design:', deleteModal?.design?.id);
    }
    setDeleteModal({ isOpen: false, design: null, isMultiple: false });
  };

  const handleSelectDesign = (designId, isSelected) => {
    if (isSelected) {
      setSelectedDesigns(prev => [...prev, designId]);
    } else {
      setSelectedDesigns(prev => prev?.filter(id => id !== designId));
    }
  };

  const handleBulkSelect = () => {
    setShowCheckboxes(!showCheckboxes);
    if (showCheckboxes) {
      setSelectedDesigns([]);
    }
  };

  const handleBulkExport = () => {
    console.log('Exporting designs:', selectedDesigns);
    // In a real app, this would trigger export process
  };

  return (
    <div className="min-h-screen bg-background">
      <TabNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Design Gallery</h1>
            <p className="text-muted-foreground mt-2">
              Browse and manage your t-shirt designs
            </p>
          </div>
          
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => navigate('/design-canvas')}
            className="hidden sm:flex"
          >
            New Design
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Palette" size={20} className="text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{mockDesigns?.length}</p>
                <p className="text-sm text-muted-foreground">Total Designs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockDesigns?.filter(d => d?.status === 'completed')?.length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-warning" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockDesigns?.filter(d => d?.status === 'draft')?.length}
                </p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={20} className="text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockDesigns?.filter(d => d?.isExportReady)?.length}
                </p>
                <p className="text-sm text-muted-foreground">Export Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <FilterToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onBulkSelect={handleBulkSelect}
          selectedCount={selectedDesigns?.length}
          totalCount={filteredAndSortedDesigns?.length}
          onBulkDelete={handleBulkDelete}
          onBulkExport={handleBulkExport}
          className="mb-6"
        />

        {/* Design Grid */}
        <DesignGrid
          designs={filteredAndSortedDesigns}
          viewMode={viewMode}
          onEdit={handleEditDesign}
          onDuplicate={handleDuplicateDesign}
          onDelete={handleDeleteDesign}
          selectedDesigns={selectedDesigns}
          onSelectDesign={handleSelectDesign}
          showCheckboxes={showCheckboxes}
          className="mb-8"
        />

        {/* Mobile New Design FAB */}
        <div className="sm:hidden fixed bottom-20 right-4 z-40">
          <Button
            variant="default"
            size="icon"
            iconName="Plus"
            onClick={() => navigate('/design-canvas')}
            className="w-14 h-14 rounded-full shadow-elevation-3"
          >
          </Button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal?.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, design: null, isMultiple: false })}
        onConfirm={confirmDelete}
        designName={deleteModal?.design?.name}
        isMultiple={deleteModal?.isMultiple}
        count={selectedDesigns?.length}
      />
    </div>
  );
};

export default DesignGallery;