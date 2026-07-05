// Static, import-safe data used by MCP tools. No env reads, no I/O, no throws.

export type World = {
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  color: string;
  ambience: string[];
  sound: string;
  pairing: string;
};

export const WORLDS: World[] = [
  {
    slug: "sakura",
    name: "Sakura",
    tag: "Bloom",
    tagline: "Un printemps éternel, suspendu au crépuscule.",
    description:
      "Pétales de cerisier dérivant en 360°, lanternes papier et un ciel rose-pêche. L'univers le plus contemplatif de YUME.",
    color: "#F25BB5",
    ambience: ["Pétales en suspension", "Lanternes ambrées", "Brise tiède"],
    sound: "Koto · field-recording de Kyoto au printemps",
    pairing: "Matcha latte sakura · Soufflé pancake fleur de cerisier",
  },
  {
    slug: "tokyo-neon",
    name: "Tokyo Neon",
    tag: "Pulse",
    tagline: "Shibuya sous la pluie, à 3 heures du matin.",
    description:
      "Néons saturés, katakana en mouvement, reflets mouillés sur l'asphalte. L'énergie d'une nuit qui ne dort pas.",
    color: "#7C3AED",
    ambience: ["Pluie néon", "Enseignes pulsantes", "Foules lointaines"],
    sound: "City-pop · synthwave japonais 80s",
    pairing: "Yuzu electric tonic · Maki signature du chef",
  },
  {
    slug: "zen-forest",
    name: "Zen Forest",
    tag: "Breath",
    tagline: "La forêt de bambous, juste après l'orage.",
    description:
      "Brume, mousse, troncs verticaux à perte de vue. Un sas de décélération pour respirer plus lentement.",
    color: "#34D27B",
    ambience: ["Brume rasante", "Bambous oscillants", "Eau qui coule"],
    sound: "Shakuhachi · pluie sur feuillage",
    pairing: "Matcha cérémonie · Mochi yuzu-thé vert",
  },
  {
    slug: "aquarium",
    name: "Aquarium",
    tag: "Drift",
    tagline: "Immergé parmi les méduses bioluminescentes.",
    description:
      "Le sol disparaît, les murs deviennent océan. Une dérive lente entre coraux et créatures de lumière.",
    color: "#4DD0E1",
    ambience: ["Bioluminescence", "Courants 360°", "Reflets aquatiques"],
    sound: "Drones sous-marins · chants de baleines lointains",
    pairing: "Blue ocean lemonade · Crêpe brûlée vanille-yuzu",
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    tag: "Heritage",
    tagline: "Une cérémonie du thé dans un temple oublié.",
    description:
      "Bois patiné, dorures discrètes, fusuma peints à la main. L'âme du Japon traditionnel, recomposée en pixels.",
    color: "#FFC24B",
    ambience: ["Lanternes de papier", "Bois sombre", "Jardin sec"],
    sound: "Cordes de shamisen · gong de temple",
    pairing: "Hojicha latte · Wagashi du jour",
  },
  {
    slug: "galaxy",
    name: "Galaxy",
    tag: "Infinity",
    tagline: "Un voyage immobile au cœur d'une nébuleuse.",
    description:
      "Étoiles à 360°, nuages cosmiques, station orbitale. Le plus cinématographique des six mondes.",
    color: "#A78BFA",
    ambience: ["Champ stellaire", "Nébuleuses lentes", "Apesanteur visuelle"],
    sound: "Drones ambient · synthés Vangelis",
    pairing: "Cosmic violet matcha · Soufflé pancake galaxy",
  },
];

export type MenuItem = { slug: string; name: string; category: string; description: string; price_dt: number };

export const MENU: MenuItem[] = [
  { slug: "matcha-latte", name: "Matcha Latte", category: "Boissons chaudes", description: "Matcha cérémonie fouetté, lait micro-mousse.", price_dt: 14 },
  { slug: "hojicha-latte", name: "Hojicha Latte", category: "Boissons chaudes", description: "Thé vert torréfié, notes caramel-noisette.", price_dt: 14 },
  { slug: "matcha-espresso", name: "Matcha Espresso Fusion", category: "Boissons chaudes", description: "Double shot + matcha, énergie signature.", price_dt: 16 },
  { slug: "specialty-coffee", name: "Specialty Coffee", category: "Boissons chaudes", description: "Grains single-origin, extraction lente.", price_dt: 10 },
  { slug: "brown-sugar-boba", name: "Brown Sugar Boba", category: "Bubble tea", description: "Perles tapioca caramélisées, lait entier.", price_dt: 16 },
  { slug: "taro-bubble-tea", name: "Taro Bubble Tea", category: "Bubble tea", description: "Taro violet crémeux, perles noires.", price_dt: 16 },
  { slug: "strawberry-milk-tea", name: "Strawberry Milk Tea", category: "Bubble tea", description: "Fraises fraîches, thé noir, lait.", price_dt: 16 },
  { slug: "sakura-lemonade", name: "Sakura Lemonade", category: "Mocktails", description: "Fleur de cerisier, citron, tonic.", price_dt: 15 },
  { slug: "yuzu-soda", name: "Yuzu Soda", category: "Mocktails", description: "Agrume japonais, eau pétillante.", price_dt: 13 },
  { slug: "matcha-mojito", name: "Matcha Mojito", category: "Mocktails", description: "Matcha, menthe, citron vert, sucre de canne.", price_dt: 17 },
  { slug: "lychee-yuzu-sparkler", name: "Lychee Yuzu Sparkler", category: "Mocktails", description: "Litchi, yuzu, bulles fines.", price_dt: 17 },
  { slug: "virgin-tokyo-mule", name: "Virgin Tokyo Mule", category: "Mocktails", description: "Gingembre, citron vert, ginger beer.", price_dt: 17 },
  { slug: "neon-sakuraglow", name: "Neon Sakura Glow", category: "Mocktails", description: "Signature — sirop sakura, tonic bleu, luminescence.", price_dt: 19 },
  { slug: "nigiri-salmon", name: "Nigiri Saumon", category: "Sushi & Maki", description: "Riz vinaigré, saumon frais tranché.", price_dt: 12 },
  { slug: "california-roll", name: "California Roll", category: "Sushi & Maki", description: "Crabe, avocat, concombre, sésame.", price_dt: 22 },
  { slug: "spicy-tuna-roll", name: "Spicy Tuna Roll", category: "Sushi & Maki", description: "Thon, sauce épicée signature.", price_dt: 24 },
  { slug: "dragon-roll", name: "Dragon Roll", category: "Sushi & Maki", description: "Anguille, avocat, sauce teriyaki.", price_dt: 28 },
  { slug: "ebi-tempura-roll", name: "Ebi Tempura Roll", category: "Sushi & Maki", description: "Crevette tempura croustillante.", price_dt: 24 },
  { slug: "vegetarian-roll", name: "Vegetarian Roll", category: "Sushi & Maki", description: "Avocat, concombre, mangue, radis.", price_dt: 18 },
  { slug: "souffle-pancake", name: "Soufflé Pancake", category: "Desserts", description: "Pancakes japonais nuageux, fruits de saison.", price_dt: 22 },
  { slug: "mochi", name: "Mochi Assortis", category: "Desserts", description: "Trio de mochis artisanaux.", price_dt: 15 },
  { slug: "mochi-gelato", name: "Mochi Gelato", category: "Desserts", description: "Glace enrobée de pâte de riz.", price_dt: 16 },
  { slug: "dorayaki", name: "Dorayaki", category: "Desserts", description: "Pancake fourré à la pâte d'azuki.", price_dt: 12 },
  { slug: "taiyaki", name: "Taiyaki", category: "Desserts", description: "Gaufre poisson, garniture matcha ou chocolat.", price_dt: 14 },
  { slug: "matcha-cheesecake", name: "Matcha Cheesecake", category: "Desserts", description: "Cheesecake japonais matcha cérémonie.", price_dt: 18 },
  { slug: "brule-crepe", name: "Brûlée Crêpe", category: "Desserts", description: "Crêpe vanille caramélisée au chalumeau.", price_dt: 17 },
  { slug: "lava-cake", name: "Lava Cake", category: "Desserts", description: "Fondant chocolat noir, cœur coulant.", price_dt: 18 },
];

export const VENUE = {
  name: "YUME Café · Lounge",
  meaning: "夢 — « rêve » en japonais",
  city: "Sousse, Tunisia",
  concept:
    "Café-lounge immersif alcohol-free. 6 mondes LED thématiques (Sakura, Tokyo Neon, Zen Forest, Aquarium, Kyoto, Galaxy). Cuisine japonaise moderne, matcha cérémonie, mocktails signature.",
  language: "Français",
  hours: "12:00 – 00:00 tous les jours",
  reservation_url: "https://yume-tn.lovable.app/#reservation",
};