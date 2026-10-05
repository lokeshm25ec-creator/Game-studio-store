import { GameItem, MerchandiseItem, DevlogArticle, LibraryGame } from '../types/store';
import heroCybershift from '../assets/images/hero_cybershift_game_1791194143755.jpg';
import gameSolaris from '../assets/images/game_solaris_descent_1791194158162.jpg';
import gameHollow from '../assets/images/game_hollow_ashes_1791194172124.jpg';
import gameVelocity from '../assets/images/game_velocity_zero_1791194183507.jpg';

export const GAMES_CATALOG: GameItem[] = [
  {
    id: 'game-cybershift-2088',
    slug: 'cybershift-2088',
    title: 'CYBERSHIFT: 2088',
    tagline: 'Defy the grid. Rewrite your neural destiny.',
    description: 'In the neon-drenched metropolis of Neo-Veridia, corporate syndicates control human consciousness through synthetic neural implants. Step into the trenchcoat of Kieran Cross, a rogue cyber-operative possessing forbidden neural overclocking tech. Navigate dense multi-tier districts, orchestrate tactical breaches, and make choices that reshape the dystopian balance of power.',
    genre: 'Cyberpunk Action RPG',
    category: 'action-rpg',
    releaseDate: 'October 24, 2026',
    status: 'Pre-Order',
    rating: 'Overwhelmingly Positive',
    ratingPercentage: 97,
    bannerImage: heroCybershift,
    thumbnailImage: heroCybershift,
    screenshots: [
      heroCybershift,
      gameVelocity,
      gameSolaris,
    ],
    platforms: ['PC (Windows)', 'PlayStation 5', 'Xbox Series X|S'],
    features: [
      'Unreal Engine 5.5 Lumen & Nanite ray-traced lighting',
      'Non-linear mission design with 6 distinct district factions',
      'Dynamic neural cyberware skill tree with 80+ active augments',
      'Full adaptive dual-trigger haptics on supported controllers',
      'Original darksynth soundtrack by master electronic composers'
    ],
    editions: [
      {
        id: 'cyber-std',
        name: 'Standard Edition',
        price: 59.99,
        originalPrice: 69.99,
        perks: [
          'Full base game digital license',
          'Day-one digital wall art package',
          'Official game manual PDF'
        ]
      },
      {
        id: 'cyber-dlx',
        name: 'Deluxe Cyber-Operative Edition',
        price: 79.99,
        badge: 'Most Popular',
        perks: [
          'Full base game digital license',
          '72-Hour Early Access to campaign',
          'Exclusive "Obsidian Ronin" cyberware skin & katana',
          'Lossless 42-track Original Soundtrack (FLAC/MP3)',
          'High-res 160-page digital concept artbook'
        ]
      },
      {
        id: 'cyber-vault',
        name: 'Founder\'s Vault Edition',
        price: 119.99,
        perks: [
          'All Deluxe Edition content included',
          'Season Pass: Access to 2 Major Story Expansions',
          'Developer Commentary audio track option',
          'Physical Certificate of Authenticity (shipped separately)',
          'Exclusive Discord Founder role & credits recognition'
        ]
      }
    ],
    dlcs: [
      {
        id: 'dlc-cyber-season',
        title: 'Veridia Expansion Pass',
        type: 'Season Pass',
        price: 29.99,
        description: 'Grants access to "District 0: The Undercity" and "Synthetic Dawn" expansions when released.'
      },
      {
        id: 'dlc-cyber-ost',
        title: 'Official Darksynth Soundtrack',
        type: 'Soundtrack',
        price: 9.99,
        description: 'Complete 42-track studio master album mixed in 24-bit 96kHz lossless audio.'
      },
      {
        id: 'dlc-cyber-ronin',
        title: 'Neo-Ronin Weapon & Armor Cache',
        type: 'Skin Pack',
        price: 4.99,
        description: 'Tactical trenchcoat cosmetics, custom HUD colors, and custom laser bayonet models.'
      }
    ],
    developer: 'AEON FORGE Core Team',
    publisher: 'AEON FORGE Publishing',
    systemRequirements: {
      minimum: {
        os: 'Windows 11 64-bit (build 22H2 or later)',
        processor: 'AMD Ryzen 5 5600X / Intel Core i5-12400',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce RTX 3060 12GB / AMD Radeon RX 6700 XT',
        storage: '85 GB SSD space required',
        directX: 'Version 12 Ultimate'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'AMD Ryzen 7 7800X3D / Intel Core i7-14700K',
        memory: '32 GB high-speed DDR5',
        graphics: 'NVIDIA GeForce RTX 4080 16GB / AMD Radeon RX 7900 XTX',
        storage: '85 GB NVMe PCIe 4.0 SSD',
        directX: 'Version 12 Ultimate'
      }
    },
    reviews: [
      {
        outlet: 'PC Gamer',
        score: '94 / 100',
        quote: 'A staggering technological marvel. Neo-Veridia feels alive, hostile, and utterly breathtaking.',
        author: 'Morgan Vance'
      },
      {
        outlet: 'IGN',
        score: '9.5 / 10',
        quote: 'Sets a new benchmark for cyberpunk worldbuilding and tactical real-time combat.',
        author: 'Elena Rostova'
      },
      {
        outlet: 'Eurogamer',
        score: 'Essential',
        quote: 'Rich, melancholic, and mechanically sublime from opening shot to final credits.',
        author: 'Julian Thorne'
      }
    ],
    trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isFeatured: true
  },
  {
    id: 'game-solaris-descent',
    slug: 'solaris-descent',
    title: 'SOLARIS DESCENT',
    tagline: 'Survive in the shadow of a silent gas giant.',
    description: 'Stationed alone aboard the decaying orbital research station Aethelgard, you must survive catastrophic thruster failure while piecing together the mysterious signal emanating from the golden core of the gas giant below. Physics-driven spacewalks, modular life-support engineering, and chilling atmospheric tension.',
    genre: 'Orbital Sci-Fi Survival',
    category: 'sci-fi',
    releaseDate: 'Available Now',
    status: 'Available Now',
    rating: 'Very Positive',
    ratingPercentage: 92,
    bannerImage: gameSolaris,
    thumbnailImage: gameSolaris,
    screenshots: [
      gameSolaris,
      heroCybershift,
    ],
    platforms: ['PC (Windows)', 'PlayStation 5', 'Xbox Series X|S', 'macOS'],
    features: [
      'Zero-G orbital mechanics and realistic Newton laws simulation',
      'Modular station maintenance: reroute power grids and thermal coolant',
      'Full dielectric audio propagation with realistic vacuum physics',
      'Dynamic orbital day/night cycles with ring shadows and solar radiation'
    ],
    editions: [
      {
        id: 'solaris-std',
        name: 'Standard Mission Edition',
        price: 39.99,
        perks: [
          'Full digital game access',
          'Station schematics blueprint PDF'
        ]
      },
      {
        id: 'solaris-cmd',
        name: 'Commander Edition',
        price: 54.99,
        badge: 'Recommended',
        perks: [
          'Full digital game access',
          'Solaris Soundscape 2-disc master album',
          'EVA prototype suit cosmetic skin',
          'Mission Log digital lore archive'
        ]
      }
    ],
    dlcs: [
      {
        id: 'dlc-solaris-mission',
        title: 'Deep Core Expedition DLC',
        type: 'Expansion',
        price: 14.99,
        description: 'New submarine probe mechanics to explore the high-pressure metallic hydrogen clouds.'
      }
    ],
    developer: 'AEON FORGE Orbital Team',
    publisher: 'AEON FORGE Publishing',
    systemRequirements: {
      minimum: {
        os: 'Windows 10/11 64-bit',
        processor: 'Intel Core i5-8400 / AMD Ryzen 5 2600',
        memory: '12 GB RAM',
        graphics: 'NVIDIA GTX 1070 / AMD Radeon RX 5600 XT',
        storage: '45 GB SSD space',
        directX: 'Version 12'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-12700 / AMD Ryzen 7 5800X',
        memory: '16 GB RAM',
        graphics: 'NVIDIA RTX 3070 / AMD Radeon RX 6800',
        storage: '45 GB NVMe SSD',
        directX: 'Version 12'
      }
    },
    reviews: [
      {
        outlet: 'Rock Paper Shotgun',
        score: 'Best of Sci-Fi',
        quote: 'The tension of being suspended over a colossal gas giant is unmatched in modern gaming.',
        author: 'Clara Hayes'
      },
      {
        outlet: 'Game Informer',
        score: '9 / 10',
        quote: 'Hard sci-fi done with obsessive scientific fidelity and exquisite emotional punch.',
        author: 'David Bradley'
      }
    ],
    isFeatured: false
  },
  {
    id: 'game-hollow-ashes',
    slug: 'hollow-ashes',
    title: 'HOLLOW ASHES: REALM OF RUNIC MIST',
    tagline: 'Kindle the dying embers of forgotten gods.',
    description: 'An unforgiving dark fantasy action RPG set in the cursed kingdom of Oakhaven. After the Celestial Forge shattered, ash rained across the continent, twisting ancient monarchs into crystalline abominations. Master deliberate blade combat, parry timing, and runic witchcraft to cleanse the desolate sanctums.',
    genre: 'Dark Fantasy Action RPG',
    category: 'dark-fantasy',
    releaseDate: 'Available Now',
    status: 'Available Now',
    rating: 'Overwhelmingly Positive',
    ratingPercentage: 96,
    bannerImage: gameHollow,
    thumbnailImage: gameHollow,
    screenshots: [
      gameHollow,
      heroCybershift,
    ],
    platforms: ['PC (Windows)', 'PlayStation 5', 'Xbox Series X|S'],
    features: [
      'Precision weight-based melee combat with 14 unique weapon classes',
      'Seamless gothic open world with subterranean catacombs and sky shrines',
      'Over 40 handcrafted multi-phase boss encounters',
      'Asynchronous player bloodstains and summonable spirit echoes'
    ],
    editions: [
      {
        id: 'hollow-std',
        name: 'Ashen Edition',
        price: 49.99,
        perks: [
          'Full game digital license',
          'Runic lore compendium'
        ]
      },
      {
        id: 'hollow-mythic',
        name: 'Lord of Embers Deluxe',
        price: 69.99,
        badge: 'Award Winner',
        perks: [
          'Full game digital license',
          'Ash-Infused Greatsword starting weapon variant',
          'Gothic orchestral choral soundtrack (WAV/MP3)',
          'Dark Grimoire artbook with developer annotations'
        ]
      }
    ],
    dlcs: [
      {
        id: 'dlc-hollow-cathedral',
        title: 'The Sunken Cathedral Expansion',
        type: 'Expansion',
        price: 19.99,
        description: 'Venture below the black waters into the forgotten mausoleum of the First Cinder.'
      }
    ],
    developer: 'AEON FORGE Dark Fantasy Guild',
    publisher: 'AEON FORGE Publishing',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i5-9600K / AMD Ryzen 5 3600',
        memory: '16 GB RAM',
        graphics: 'NVIDIA GeForce GTX 1660 Ti / AMD Radeon RX 5600',
        storage: '60 GB SSD',
        directX: 'Version 12'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i7-13700 / AMD Ryzen 7 7700X',
        memory: '32 GB RAM',
        graphics: 'NVIDIA GeForce RTX 4070 / AMD Radeon RX 7800 XT',
        storage: '60 GB NVMe SSD',
        directX: 'Version 12'
      }
    },
    reviews: [
      {
        outlet: 'Edge Magazine',
        score: '9 / 10',
        quote: 'A masterclass in level design and melancholic gothic atmosphere.',
        author: 'Marcus Vance'
      },
      {
        outlet: 'Destructoid',
        score: '9.5 / 10',
        quote: 'The finest souls-like combat mechanics since the genre inception.',
        author: 'Sora Tanaka'
      }
    ],
    isFeatured: false
  },
  {
    id: 'game-velocity-zero',
    slug: 'velocity-zero',
    title: 'VELOCITY ZERO: HYPERDRIFT',
    tagline: 'Pure kinetic exhilaration at Mach 3.',
    description: 'Strap into the cockpit of magnetic levitation racers on supersonic tracks suspended over volcanic canyons and orbital rings. Zero friction, dynamic anti-gravity banking, and split-second energy shield routing at speeds exceeding 1,200 km/h.',
    genre: 'Anti-Gravity Racing',
    category: 'racing',
    releaseDate: 'Available Now',
    status: 'Available Now',
    rating: 'Very Positive',
    ratingPercentage: 91,
    bannerImage: gameVelocity,
    thumbnailImage: gameVelocity,
    screenshots: [
      gameVelocity,
      heroCybershift,
    ],
    platforms: ['PC (Windows)', 'PlayStation 5', 'Xbox Series X|S', 'Nintendo Switch 2'],
    features: [
      'Uncapped 120 FPS high-refresh rate physics engine',
      '32 adrenaline-pumping tracks across 8 planetary sectors',
      'Cross-platform 16-player ranked multiplayer lobbies',
      'Electronic breakbeat & synthwave soundtrack with dynamic tempo shifting'
    ],
    editions: [
      {
        id: 'vel-std',
        name: 'Grid Edition',
        price: 34.99,
        perks: [
          'Full game digital license',
          'Standard 8 vehicle chassis collection'
        ]
      },
      {
        id: 'vel-pro',
        name: 'Apex Grand Prix Edition',
        price: 49.99,
        badge: 'Best Value',
        perks: [
          'Full game digital license',
          '4 Prototype Mach-X craft with customizable neon trail emitters',
          'Season 1 Championship Pass',
          'Full 30-track breakbeat album'
        ]
      }
    ],
    developer: 'AEON FORGE Speed Lab',
    publisher: 'AEON FORGE Publishing',
    systemRequirements: {
      minimum: {
        os: 'Windows 10 64-bit',
        processor: 'Intel Core i3-10100 / AMD Ryzen 3 3300X',
        memory: '8 GB RAM',
        graphics: 'NVIDIA GTX 1060 6GB / AMD Radeon RX 580',
        storage: '30 GB SSD',
        directX: 'Version 12'
      },
      recommended: {
        os: 'Windows 11 64-bit',
        processor: 'Intel Core i5-13600K / AMD Ryzen 5 7600X',
        memory: '16 GB RAM',
        graphics: 'NVIDIA RTX 3060 Ti / AMD Radeon RX 6700 XT',
        storage: '30 GB NVMe SSD',
        directX: 'Version 12'
      }
    },
    reviews: [
      {
        outlet: 'Kotaku',
        score: 'Editor\'s Choice',
        quote: 'The true spiritual successor to arcade anti-gravity racing. Blistering and responsive.',
        author: 'Jaxson Reed'
      }
    ],
    isFeatured: false
  }
];

export const MERCHANDISE_CATALOG: MerchandiseItem[] = [
  {
    id: 'merch-obsidian-controller',
    title: 'AEON Pro Wireless Controller - Obsidian Matrix Edition',
    category: 'hardware',
    price: 149.99,
    originalPrice: 179.99,
    image: heroCybershift,
    description: 'Hall-effect magnetic thumbsticks with zero drift guarantee, mechanical microswitch tactile buttons, interchangeable rear paddle triggers, and CNC-milled aluminum faceplate with custom laser-etched circuitry.',
    specs: [
      'Hall Effect electromagnetic sensors',
      '1,000 Hz polling rate wired / 2.4 GHz wireless',
      '40-hour rechargeable lithium-ion battery',
      'Compatible with PC, PS5, Xbox, Switch & Steam Deck'
    ],
    stockStatus: 'In Stock',
    editionLimit: 'First Production Batch: 2,500 Units',
    variants: ['Obsidian Matte Black', 'Ghost Titanium Gray']
  },
  {
    id: 'merch-art-solaris',
    title: 'The Art & Engineering of Solaris Descent (Hardcover Grimoire)',
    category: 'artbook',
    price: 65.00,
    image: gameSolaris,
    description: 'A luxurious 320-page clothbound artbook featuring full-color concept art, orbital station engineering blueprints, matte paintings, and developer essays on constructing a scientifically credible zero-g thriller.',
    specs: [
      '320 pages heavyweight 180gsm art paper',
      'Gold foil-stamped buckram hardcover with slipcase',
      'Includes foldout 1:500 scale station schematic poster'
    ],
    stockStatus: 'Limited Stock',
    editionLimit: 'Numbered Limited Edition: 1,000 Copies'
  },
  {
    id: 'merch-cybershift-vinyl',
    title: 'CYBERSHIFT: 2088 Original Soundtrack (4xLP Boxset)',
    category: 'vinyl',
    price: 89.99,
    image: heroCybershift,
    description: 'Quadruple 180-gram audiophile heavyweight vinyl pressed on translucent amber and cobalt splatter wax. Housed in a rigid foil-embossed slipcase with exclusive liner notes and turntable slipmat.',
    specs: [
      '4x 180g Heavyweight colored vinyl',
      'Mastered specifically for analog vinyl cutting',
      'High-gloss gatefold jackets with concept art'
    ],
    stockStatus: 'Pre-Order',
    editionLimit: 'Pre-order closes Nov 15'
  }
];

export const INITIAL_USER_LIBRARY: LibraryGame[] = [
  {
    gameId: 'game-velocity-zero',
    title: 'VELOCITY ZERO: HYPERDRIFT',
    editionName: 'Grid Edition',
    platform: 'PC (Windows)',
    purchaseDate: 'Sep 18, 2026',
    activationKey: 'AEON-VELZ-8924-PX11',
    bannerImage: gameVelocity,
    thumbnailImage: gameVelocity,
    hoursPlayed: 38.4,
    lastPlayed: 'Yesterday at 9:15 PM',
    installSize: '28.4 GB',
    achievements: { completed: 21, total: 32 },
    cloudSynced: true
  }
];

export const DEVLOGS: DevlogArticle[] = [
  {
    id: 'devlog-01',
    title: 'Volumetric Neural Lighting & Global Illumination in CYBERSHIFT: 2088',
    date: 'Sep 28, 2026',
    category: 'Engineering',
    readTime: '6 min read',
    excerpt: 'How our engine team achieved 60 FPS path tracing across dense urban verticality using custom hardware-accelerated BVH structures.',
    author: {
      name: 'Dr. Henrik Lindqvist',
      role: 'Principal Graphics Architect'
    },
    coverImage: heroCybershift,
    content: `When designing the multi-tiered districts of Neo-Veridia, one of our fundamental visual pillars was that light should not merely illuminate geometry—it should communicate the suffocating density of the city.

In typical deferred renderers, thousands of dynamic emissive neon signs, volumetric steam vents, and rain-slicked reflective puddles overwhelm compute caches. For Cybershift: 2088, we authored a specialized spatial spatio-temporal reservoir resampling (ReSTIR) pipeline integrated directly into Unreal Engine 5.5.

By caching secondary bounce radiance in compact octree textures updated asynchronously across frames, we reduced high-end raytracing overhead by 42% while actually sharpening reflection accuracy under heavy rain conditions.`
  },
  {
    id: 'devlog-02',
    title: 'Sound Design in the Vacuum: Acoustic Physics of Solaris Descent',
    date: 'Sep 12, 2026',
    category: 'Art Direction',
    readTime: '5 min read',
    excerpt: 'Crafting the bone-conducted acoustic profile of zero-gravity spacewalks and gas giant gravitational rumbles.',
    author: {
      name: 'Maya Chen',
      role: 'Audio Director'
    },
    coverImage: gameSolaris,
    content: `In space, no one can hear you scream—unless the vibrations travel through the carbon-composite fibers of your EVA pressure suit and resonate into your inner ear.

We built our entire audio engine on bone conduction and contact acoustics. When Kieran grabs a frozen hatch handle outside the Aethelgard station, you don't hear a synthesized whoosh; you hear the metallic groan transmitted directly through your gauntlet, filtered through low-pass bone resonance modeling.`
  },
  {
    id: 'devlog-03',
    title: 'Hollow Ashes Patch 1.4.2: Combat Poise Rebalance & New Game Plus Tuning',
    date: 'Aug 24, 2026',
    category: 'Patch Notes',
    readTime: '4 min read',
    excerpt: 'Detailed breakdown of weapon stamina consumption, hyperarmor frames on heavy collaterals, and cathedral boss hitboxes.',
    author: {
      name: 'Torvald Eklund',
      role: 'Lead Combat Designer'
    },
    coverImage: gameHollow,
    content: `Community feedback from the Sunken Cathedral trials has been instrumental. In Patch 1.4.2, we have overhauled greatsword hyperarmor windows, reducing initial startup vulnerability by 4 frames while scaling boss poise regeneration dynamically according to player weapon weight.`
  }
];
