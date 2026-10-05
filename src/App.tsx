/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Storefront } from './components/Storefront';
import { LibraryView } from './components/LibraryView';
import { ExpansionsView } from './components/ExpansionsView';
import { GearView } from './components/GearView';
import { DevlogsView } from './components/DevlogsView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TrailerModal } from './components/TrailerModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const StoreContent: React.FC = () => {
  const { activeTab, selectedGame, setSelectedGame } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-[#e2e8f0]">
      {/* 3-Zone Top Navigation Contract */}
      <Header />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {activeTab === 'store' && <Storefront />}
        {activeTab === 'library' && <LibraryView />}
        {activeTab === 'expansions' && <ExpansionsView />}
        {activeTab === 'gear' && <GearView />}
        {activeTab === 'devlogs' && <DevlogsView />}
      </main>

      {/* Product Detail Modal */}
      {selectedGame && (
        <ProductDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

      {/* Cinematic In-Engine Trailer Modal */}
      <TrailerModal />

      {/* Cart & Checkout Slide-Over */}
      <CartDrawer />

      {/* Real-Time Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
