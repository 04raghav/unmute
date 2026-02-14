import React from 'react';
import Nav from '@/components/Nav';
import PublicContent from '@/components/ContentPublic/PublicContent';
import Sidebar from '@/components/Sidebar';

const Public = () => {
  return (
    <div className="bg-gradient-to-b bg-zinc-900  min-h-screen font-sans antialiased text-gray-100">
      
      {/* Navigation - Always visible */}
      <Nav />

      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block w-1/4 fixed top-14 left-0 h-[calc(102vh-4rem)] overflow-y-auto">
          <Sidebar />
        </div>

        {/* Scrollable Public Content Area */}
        <div className="flex-1 lg:ml-1/4 overflow-y-auto px-4 py-6 md:px-8" style={{ marginLeft: '25%' }}>
          <div className="max-w-4xl mx-auto space-y-10">
            <PublicContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Public;
