import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DesignCanvas from './pages/design-canvas';
import ExportCenter from './pages/export-center';
import DesignGallery from './pages/design-gallery';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DesignCanvas />} />
        <Route path="/design-canvas" element={<DesignCanvas />} />
        <Route path="/export-center" element={<ExportCenter />} />
        <Route path="/design-gallery" element={<DesignGallery />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
