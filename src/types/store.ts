export type Platform = 'PC (Windows)' | 'PlayStation 5' | 'Xbox Series X|S' | 'macOS' | 'Nintendo Switch 2';

export interface GameEdition {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  perks: string[];
  badge?: string;
}

export interface SystemRequirement {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
  directX?: string;
}

export interface ReviewSnippet {
  outlet: string;
  score: string;
  quote: string;
  author: string;
}

export interface DLCItem {
  id: string;
  title: string;
  type: 'Expansion' | 'Soundtrack' | 'Skin Pack' | 'Season Pass';
  price: number;
  coverImage?: string;
  description: string;
}

export interface GameItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  genre: string;
  category: 'action-rpg' | 'sci-fi' | 'dark-fantasy' | 'racing' | 'merchandise';
  releaseDate: string;
  status: 'Available Now' | 'Pre-Order' | 'Early Access';
  rating: string;
  ratingPercentage: number;
  bannerImage: string;
  thumbnailImage: string;
  screenshots: string[];
  platforms: Platform[];
  editions: GameEdition[];
  dlcs?: DLCItem[];
  developer: string;
  publisher: string;
  features: string[];
  systemRequirements?: {
    minimum: SystemRequirement;
    recommended: SystemRequirement;
  };
  reviews: ReviewSnippet[];
  trailerUrl?: string;
  isFeatured?: boolean;
}

export interface MerchandiseItem {
  id: string;
  title: string;
  category: 'hardware' | 'apparel' | 'artbook' | 'vinyl';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specs: string[];
  stockStatus: 'In Stock' | 'Limited Stock' | 'Pre-Order';
  editionLimit?: string;
  variants?: string[];
}

export interface CartItem {
  cartId: string;
  productId: string;
  title: string;
  type: 'game' | 'edition' | 'dlc' | 'merch';
  editionName?: string;
  platform?: Platform;
  selectedVariant?: string;
  price: number;
  quantity: number;
  image: string;
}

export interface LibraryGame {
  gameId: string;
  title: string;
  editionName: string;
  platform: Platform;
  purchaseDate: string;
  activationKey: string;
  bannerImage: string;
  thumbnailImage: string;
  hoursPlayed: number;
  lastPlayed: string;
  installSize: string;
  achievements: { completed: number; total: number };
  cloudSynced: boolean;
}

export interface DevlogArticle {
  id: string;
  title: string;
  date: string;
  category: 'Engineering' | 'Patch Notes' | 'Art Direction' | 'Community';
  readTime: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  coverImage?: string;
}
