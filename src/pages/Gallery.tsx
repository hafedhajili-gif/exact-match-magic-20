import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const themes = [
  {
    name: "Café View",
    description: "Vue extérieure et intérieure du concept Chill & Vibes",
    details: "Ambiance chaleureuse avec plafond LED affichant des fleurs de cerisier roses, bar doré, lampes japonaises, et affichage du menu LED.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/annex_image-004_ecbd7254.png",
    category: "Concept",
  },
  {
    name: "Sakura Theme",
    description: "Salle immersive avec fleurs de cerisier roses",
    details: "Expérience complète d'immersion avec murs LED affichant des fleurs de cerisier en 3D, table interactive avec écran tactile, lumière bleue étoilée.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/annex_image-005_1b4f3c99.png",
    category: "Tokyo Night",
  },
  {
    name: "Snow Mountain Theme",
    description: "Ambiance hivernale avec Mont Fuji enneigé",
    details: "Paysage hivernal immersif avec murs LED affichant le Mont Fuji, forêts enneigées, tables longues confortables, atmosphère zen.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/annex_image-006_888febb9.png",
    category: "Real Aquarium",
  },
  {
    name: "Torii Gates Theme",
    description: "Portes Torii rouges du Japon",
    details: "Forêt de portes Torii rouges avec atmosphère mystique, murs LED immersifs, tables de groupe, éclairage rouge/orange authentique.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/annex_image-010_3eec6a39.png",
    category: "Jungle",
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
          <p className="text-xl text-muted-foreground">
            Découvrez les 4 ambiances immersives qui transforment Chill & Vibes chaque jour
          </p>
        </div>

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

        <div className="grid md:grid-cols-2 gap-6">
          {themes.map((t, index) => (
            <Card key={index} className={`bg-card border-border overflow-hidden cursor-pointer transition-all hover:border-primary ${index === currentTheme ? "border-primary ring-2 ring-primary" : ""}`} onClick={() => setCurrentTheme(index)}>
              <div className="aspect-video bg-black overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <Badge className="mb-2 bg-primary/20 text-primary">{t.category}</Badge>
                <h3 className="font-bold">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{t.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border p-8 mt-16">
          <h3 className="text-2xl font-bold mb-6 text-primary">Spécifications Techniques ISEMC P1.8</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Caractéristiques</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Pixel Pitch:</strong> 1.86mm (P1.8)</li>
                <li>• <strong>Taille écran:</strong> 7.04m x 2.88m x 2</li>
                <li>• <strong>Résolution:</strong> 3784" x 1548"</li>
                <li>• <strong>Cabinets:</strong> 22 total (11 x 2)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Performance</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Fréquence:</strong> 3840Hz</li>
                <li>• <strong>Luminosité:</strong> 500cd/㎡</li>
                <li>• <strong>Distance de vision:</strong> 1.8m - 5m</li>
                <li>• <strong>Durée de vie:</strong> 75,000 - 100,000h</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
