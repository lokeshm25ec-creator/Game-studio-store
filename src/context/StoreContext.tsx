import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameItem, CartItem, LibraryGame, Platform, GameEdition, DLCItem, MerchandiseItem } from '../types/store';
import { GAMES_CATALOG, INITIAL_USER_LIBRARY } from '../data/mockData';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'cart';
}

interface StoreContextType {
  activeTab: 'store' | 'library' | 'expansions' | 'gear' | 'devlogs';
  setActiveTab: (tab: 'store' | 'library' | 'expansions' | 'gear' | 'devlogs') => void;
  selectedGame: GameItem | null;
  setSelectedGame: (game: GameItem | null) => void;
  activeTrailerUrl: string | null;
  setActiveTrailerUrl: (url: string | null) => void;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  wishlist: string[]; // game IDs
  toggleWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  library: LibraryGame[];
  redeemKey: (key: string) => { success: boolean; message: string; gameTitle?: string };
  launchGame: (gameId: string) => void;
  runningGameId: string | null;
  stopGame: () => void;
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  checkoutOrder: (email: string, paymentMethod: string) => { orderId: string; activationKeys: string[] };
  quickBuyGame: (game: GameItem, edition: GameEdition, platform: Platform) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'store' | 'library' | 'expansions' | 'gear' | 'devlogs'>('store');
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [activeTrailerUrl, setActiveTrailerUrl] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [runningGameId, setRunningGameId] = useState<string | null>(null);

  // Cart with localStorage sync
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aeon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist with localStorage sync
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aeon_wishlist');
      return saved ? JSON.parse(saved) : ['game-cybershift-2088'];
    } catch {
      return ['game-cybershift-2088'];
    }
  });

  // Library with localStorage sync
  const [library, setLibrary] = useState<LibraryGame[]>(() => {
    try {
      const saved = localStorage.getItem('aeon_library');
      return saved ? JSON.parse(saved) : INITIAL_USER_LIBRARY;
    } catch {
      return INITIAL_USER_LIBRARY;
    }
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('aeon_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aeon_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('aeon_library', JSON.stringify(library));
    } catch {}
  }, [library]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'cart' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    const existingIndex = cart.findIndex(c => 
      c.productId === item.productId &&
      c.editionName === item.editionName &&
      c.platform === item.platform &&
      c.selectedVariant === item.selectedVariant
    );

    if (existingIndex > -1) {
      setCart(prev => prev.map((c, idx) => 
        idx === existingIndex ? { ...c, quantity: c.quantity + (item.quantity || 1) } : c
      ));
    } else {
      const cartId = `c_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      setCart(prev => [...prev, { ...item, cartId, quantity: item.quantity || 1 }]);
    }

    addToast('Added to Cart', `${item.title}${item.editionName ? ` (${item.editionName})` : ''}`, 'cart');
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (gameId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(gameId);
      const game = GAMES_CATALOG.find(g => g.id === gameId);
      if (exists) {
        addToast('Removed from Wishlist', game ? game.title : 'Item removed');
        return prev.filter(id => id !== gameId);
      } else {
        addToast('Added to Wishlist', game ? game.title : 'Item added', 'success');
        return [...prev, gameId];
      }
    });
  };

  const isInWishlist = (gameId: string) => wishlist.includes(gameId);

  const quickBuyGame = (game: GameItem, edition: GameEdition, platform: Platform) => {
    addToCart({
      productId: game.id,
      title: game.title,
      type: 'edition',
      editionName: edition.name,
      platform,
      price: edition.price,
      quantity: 1,
      image: game.thumbnailImage
    });
    setIsCartOpen(true);
  };

  const checkoutOrder = (email: string, paymentMethod: string): { orderId: string; activationKeys: string[] } => {
    const orderId = `AF-${Math.floor(100000 + Math.random() * 900000)}`;
    const activationKeys: string[] = [];

    // Add purchased digital games to library
    const newLibraryEntries: LibraryGame[] = [];

    cart.forEach(item => {
      if (item.type === 'game' || item.type === 'edition') {
        const key = `AEON-${item.title.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        activationKeys.push(key);

        const catalogGame = GAMES_CATALOG.find(g => g.id === item.productId);
        const alreadyInLibrary = library.some(l => l.gameId === item.productId);

        if (!alreadyInLibrary && catalogGame) {
          newLibraryEntries.push({
            gameId: catalogGame.id,
            title: catalogGame.title,
            editionName: item.editionName || 'Standard Edition',
            platform: item.platform || 'PC (Windows)',
            purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            activationKey: key,
            bannerImage: catalogGame.bannerImage,
            thumbnailImage: catalogGame.thumbnailImage,
            hoursPlayed: 0,
            lastPlayed: 'Not yet launched',
            installSize: '65.0 GB',
            achievements: { completed: 0, total: 35 },
            cloudSynced: true
          });
        }
      }
    });

    if (newLibraryEntries.length > 0) {
      setLibrary(prev => [...newLibraryEntries, ...prev]);
    }

    clearCart();
    addToast('Order Confirmed', `Order #${orderId} processed via ${paymentMethod}. Games unlocked in Vault.`, 'success');
    return { orderId, activationKeys };
  };

  const redeemKey = (rawKey: string): { success: boolean; message: string; gameTitle?: string } => {
    const cleanKey = rawKey.trim().toUpperCase();
    if (!cleanKey || cleanKey.length < 8) {
      return { success: false, message: 'Invalid activation key format. Keys follow AEON-XXXX-XXXX-XXXX format.' };
    }

    // Check if already registered
    const existing = library.find(l => l.activationKey === cleanKey);
    if (existing) {
      return { success: false, message: `Key already redeemed for ${existing.title}.` };
    }

    // Match or dynamically assign a game from catalog
    let matchedGame = GAMES_CATALOG.find(g => cleanKey.includes(g.title.substring(0, 3).toUpperCase()));
    if (!matchedGame) {
      // Find one not yet owned
      matchedGame = GAMES_CATALOG.find(g => !library.some(l => l.gameId === g.id)) || GAMES_CATALOG[0];
    }

    const newGame: LibraryGame = {
      gameId: matchedGame.id,
      title: matchedGame.title,
      editionName: 'Founder Digital Vault Edition',
      platform: 'PC (Windows)',
      purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      activationKey: cleanKey,
      bannerImage: matchedGame.bannerImage,
      thumbnailImage: matchedGame.thumbnailImage,
      hoursPlayed: 0,
      lastPlayed: 'Just redeemed',
      installSize: '65.2 GB',
      achievements: { completed: 0, total: 40 },
      cloudSynced: true
    };

    setLibrary(prev => [newGame, ...prev]);
    addToast('Key Activated', `${matchedGame.title} is now in your Vault.`, 'success');
    return { success: true, message: `Successfully registered ${matchedGame.title} to your account!`, gameTitle: matchedGame.title };
  };

  const launchGame = (gameId: string) => {
    const game = library.find(l => l.gameId === gameId) || GAMES_CATALOG.find(g => g.id === gameId);
    setRunningGameId(gameId);
    addToast('Launching Game Client', `Booting ${game?.title || 'Game'} in DirectStorage mode...`, 'info');
  };

  const stopGame = () => {
    if (runningGameId) {
      const game = library.find(l => l.gameId === runningGameId);
      addToast('Session Ended', `Cloud save synced for ${game?.title || 'Game'}.`, 'info');
      setRunningGameId(null);
    }
  };

  return (
    <StoreContext.Provider value={{
      activeTab,
      setActiveTab,
      selectedGame,
      setSelectedGame,
      activeTrailerUrl,
      setActiveTrailerUrl,
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartSubtotal,
      cartCount,
      wishlist,
      toggleWishlist,
      isInWishlist,
      library,
      redeemKey,
      launchGame,
      runningGameId,
      stopGame,
      toasts,
      dismissToast,
      checkoutOrder,
      quickBuyGame
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
