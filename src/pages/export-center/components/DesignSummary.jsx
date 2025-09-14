import React from 'react';
import Icon from '../../../components/AppIcon';

const DesignSummary = ({ designData, className = '' }) => {
  const summaryData = {
    totalAreas: 4,
    designedAreas: 3,
    totalElements: 12,
    textElements: 4,
    imageElements: 8,
    totalColors: 6,
    printColors: 4,
    estimatedCost: '$24.99',
    complexity: 'Medium',
    printRecommendations: [
      'Use high-quality cotton blend for best results',
      'Consider screen printing for bulk orders',
      'DTG printing recommended for detailed designs',
      'Test print recommended before bulk production'
    ],
    technicalSpecs: {
      maxDimensions: '12" x 16"',
      minDPI: '300 DPI',
      colorMode: 'CMYK + Spot Colors',
      fileFormats: 'PNG, PDF, SVG',
      bleedArea: '0.125" all sides'
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity?.toLowerCase()) {
      case 'low':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'high':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Design Summary</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Technical specifications and printing recommendations
        </p>
      </div>
      {/* Design Overview */}
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Design Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Areas Designed</span>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-semibold text-foreground">
                    {summaryData?.designedAreas}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {summaryData?.totalAreas}
                  </span>
                </div>
              </div>
              <div className="mt-2 w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(summaryData?.designedAreas / summaryData?.totalAreas) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Elements</span>
                <span className="text-lg font-semibold text-foreground">
                  {summaryData?.totalElements}
                </span>
              </div>
              <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{summaryData?.textElements} Text</span>
                <span>{summaryData?.imageElements} Images</span>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Colors Used</span>
                <span className="text-lg font-semibold text-foreground">
                  {summaryData?.totalColors}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {summaryData?.printColors} print colors
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Complexity</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(summaryData?.complexity)}`}>
                  {summaryData?.complexity}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Est. cost: {summaryData?.estimatedCost}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Technical Specifications</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            {Object.entries(summaryData?.technicalSpecs)?.map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                </span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Print Recommendations */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Printing Recommendations</h3>
          <div className="space-y-3">
            {summaryData?.printRecommendations?.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                </div>
                <p className="text-sm text-muted-foreground">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Checklist */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Quality Checklist</h3>
          <div className="space-y-3">
            {[
              { item: 'All designs are high resolution (300+ DPI)', status: 'passed' },
              { item: 'Colors are print-ready (CMYK compatible)', status: 'passed' },
              { item: 'Text is readable at print size', status: 'passed' },
              { item: 'Designs fit within printable area', status: 'warning' },
              { item: 'No copyright issues detected', status: 'passed' }
            ]?.map((check, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {check?.status === 'passed' ? (
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  ) : check?.status === 'warning' ? (
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                  ) : (
                    <Icon name="XCircle" size={16} className="text-error" />
                  )}
                </div>
                <span className={`text-sm ${
                  check?.status === 'passed' ? 'text-foreground' :
                  check?.status === 'warning'? 'text-warning' : 'text-error'
                }`}>
                  {check?.item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Export History */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Recent Exports</h3>
          <div className="space-y-2">
            {[
              { date: '2025-01-14 18:45', format: 'PNG', areas: 'Front, Back', size: '4.2 MB' },
              { date: '2025-01-14 17:30', format: 'PDF', areas: 'All Areas', size: '8.7 MB' },
              { date: '2025-01-14 16:15', format: 'SVG', areas: 'Front Only', size: '1.3 MB' }
            ]?.map((export_item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Download" size={14} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {export_item?.format} Export
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {export_item?.areas} • {export_item?.size}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(export_item.date)?.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSummary;