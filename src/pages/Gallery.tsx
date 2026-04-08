import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

import aquariumImg from "@/assets/themes/aquarium.png";
import kyotoImg from "@/assets/themes/kyoto-temple.png";
import sakuraFujiImg from "@/assets/themes/sakura-fuji.png";
import sunsetCoastImg from "@/assets/themes/sunset-coast.png";
import toriiImg from "@/assets/themes/torii-gates.png";
import tokyoNightImg from "@/assets/themes/tokyo-night.jpg";
import jungleImg from "@/assets/themes/jungle.jpg";
import galaxyImg from "@/assets/themes/galaxy.jpg";

const themes = [
  {
    name: "Real Aquarium",
    description: "Plongez dans un océan immersif à 360°",
    details: "Requins, poissons tropicaux et coraux projetés sur les 4 murs LED en 8K. Lumière bleue apaisante et sons sous-marins synchronisés.",
    image: aquariumImg,
    category: "Nature",
  },
  {
    name: "Tokyo Night",
    description: "Néons cyberpunk et énergie urbaine de Tokyo",
    details: "Rues de Shinjuku et Shibuya projetées en 360°. Ambiance néon violet et bleu avec tables LED luminescentes.",
    image: tokyoNightImg,
    category: "Urbain",
  },
  {
    name: "Sakura & Mont Fuji",
    description: "Cerisiers en fleurs avec vue sur le Mont Fuji",
    details: "Paysage japonais iconique avec lac, cerisiers roses et Mont Fuji au coucher du soleil. Atmosphère romantique et zen.",
    image: sakuraFujiImg,
    category: "Zen",
  },
  {
    name: "Kyoto Temple",
    description: "Temples traditionnels au coucher du soleil",
    details: "Portes Torii, pagodes et lanternes japonaises projetées au crépuscule. Ambiance culturelle authentique.",
    image: kyotoImg,
    category: "Culture",
  },
  {
    name: "Sunset Coast",
    description: "Côte paradisiaque au coucher du soleil",
    details: "Falaises, océan et cerisiers en fleurs sous un ciel violet-rose. Expérience immersive de sérénité totale.",
    image: sunsetCoastImg,
    category: "Nature",
  },
  {
    name: "Torii Gates",
    description: "Forêt de portes Torii du sanctuaire Fushimi Inari",
    details: "Tunnel infini de portes Torii rouges avec ambiance mystique. Atmosphère intime et contemplative.",
    image: toriiImg,
    category: "Culture",
  },
  {
    name: "Jungle Tropicale",
    description: "Forêt luxuriante avec faune exotique",
    details: "Végétation dense, perroquets colorés et lumière verte naturelle. Sons de la nature et ambiance tropicale.",
    image: jungleImg,
    category: "Nature",
  },
  {
    name: "Galaxy",
    description: "Voyage interstellaire dans l'espace profond",
    details: "Nébuleuses, planètes et étoiles projetées en 8K. Ambiance cosmique avec tables LED violettes et bleues.",
    image: galaxyImg,
    category: "Sci-Fi",
  },
];

export default function Gallery() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const theme = themes[currentTheme];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Galerie des Thèmes LED</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez les ambiances immersives 360° qui transforment Chill & Vibes chaque jour — propulsées par la technologie ISEMC P1.8 en résolution 8K.
          </p>
        </div>

        {/* Featured Theme */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <Card className="bg-card border-border overflow-hidden">
              <div className="relative aspect-video bg-black">
                <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
              </div>
            </Card>
          </div>
          <div className="flex flex-col justify-between">
            <Card className="bg-card border-border p-6 flex-1">
              <Badge className="mb-4 bg-primary text-primary-foreground">{theme.category}</Badge>
              <h2 className="text-3xl font-bold mb-4">{theme.name}</h2>
              <p className="text-lg text-muted-foreground mb-6">{theme.description}</p>
              <p className="text-base text-muted-foreground leading-relaxed">{theme.details}</p>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-8 mb-16">
          <button onClick={() => setCurrentTheme((p) => (p - 1 + themes.length) % themes.length)} className="p-3 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            {themes.map((_, index) => (
              <button key={index} onClick={() => setCurrentTheme(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentTheme ? "bg-primary w-8" : "bg-muted-foreground hover:bg-muted-foreground/70"}`} />
            ))}
          </div>
          <button onClick={() => setCurrentTheme((p) => (p + 1) % themes.length)} className="p-3 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground transition-colors">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((t, index) => (
            <Card key={index} className={`bg-card border-border overflow-hidden cursor-pointer transition-all hover:border-primary ${index === currentTheme ? "border-primary ring-2 ring-primary" : ""}`} onClick={() => setCurrentTheme(index)}>
              <div className="aspect-video bg-black overflow-hidden">
                <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <Badge className="mb-2 bg-primary/20 text-primary">{t.category}</Badge>
                <h3 className="font-bold">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Specs */}
        <Card className="bg-card border-border p-8 mt-16">
          <h3 className="text-2xl font-bold mb-6 text-primary">Spécifications Techniques ISEMC P1.8</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Caractéristiques</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Pixel Pitch:</strong> 1.86mm (P1.8) Fine-Pitch</li>
                <li>• <strong>Taille écran:</strong> 7.04m × 3.84m × 2.88m H</li>
                <li>• <strong>Substrat:</strong> Gold Standard LED (durée 10-12 ans)</li>
                <li>• <strong>Cabinets:</strong> 640mm × 480mm, front-serviceable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Performance</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Luminosité:</strong> 1,000 - 4,000 nits</li>
                <li>• <strong>Fréquence:</strong> 3840Hz</li>
                <li>• <strong>Calibration:</strong> Optimisé pour caméras smartphone</li>
                <li>• <strong>Durée de vie:</strong> 75,000 - 100,000h</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
