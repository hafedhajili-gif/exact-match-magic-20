import sakuraImg from "@/assets/themes/yume-sakura-sunset.jpg";
import tokyoImg from "@/assets/themes/yume-tokyo-neon.jpg";
import zenImg from "@/assets/themes/yume-zen-forest.jpg";
import aquariumImg from "@/assets/themes/yume-aquarium.jpg";
import kyotoImg from "@/assets/themes/kyoto-temple.jpg";
import galaxyImg from "@/assets/themes/galaxy.jpg";

export type World = {
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  image: string;
  color: string;          // accent hex
  ambience: string[];
  sound: string;
  pairing: string;
};

export const worlds: World[] = [
  {
    slug: "sakura",
    name: "Sakura",
    tag: "Bloom",
    tagline: "Un printemps éternel, suspendu au crépuscule.",
    description:
      "Pétales de cerisier dérivant en 360°, lanternes papier et un ciel rose-pêche. L'univers le plus contemplatif de YUME.",
    image: sakuraImg,
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
    image: tokyoImg,
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
    image: zenImg,
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
    image: aquariumImg,
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
    image: kyotoImg,
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
    image: galaxyImg,
    color: "#A78BFA",
    ambience: ["Champ stellaire", "Nébuleuses lentes", "Apesanteur visuelle"],
    sound: "Drones ambient · synthés Vangelis",
    pairing: "Cosmic violet matcha · Soufflé pancake galaxy",
  },
];

export const getWorld = (slug?: string) => worlds.find((w) => w.slug === slug);