import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, UtensilsCrossed, Cake, QrCode, Coffee } from "lucide-react";

import matchaLatteImg from "@/assets/menu/matcha-latte.jpg";
import sushiPlatterImg from "@/assets/menu/sushi-platter.jpg";
import mochiImg from "@/assets/menu/mochi.jpg";
import taiyakiImg from "@/assets/menu/taiyaki.jpg";
import bubbleTeaImg from "@/assets/menu/bubble-tea.jpg";
import yuzuSodaImg from "@/assets/menu/yuzu-soda.jpg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  portion?: string;
  image?: string;
}

const menuItems: MenuItem[] = [
  // Beverages
  { id: 1, name: "Matcha Latte", description: "Matcha cérémonial de qualité supérieure avec lait onctueux", category: "matcha", price: 11.0, image: matchaLatteImg },
  { id: 2, name: "Hojicha Latte", description: "Thé vert torréfié avec lait crémeux, saveur douce et boisée", category: "matcha", price: 10.0, image: matchaLatteImg },
  { id: 3, name: "Matcha Espresso Fusion", description: "Alliance unique du matcha et d'un shot espresso avec lait", category: "matcha", price: 12.0, image: matchaLatteImg },
  { id: 4, name: "Yuzu Sparkling Soda", description: "Soda pétillant artisanal au jus de yuzu frais", category: "matcha", price: 9.5, image: yuzuSodaImg },
  { id: 5, name: "Sakura Lemonade", description: "Limonade délicate au sirop de fleur de cerisier", category: "matcha", price: 9.5, image: yuzuSodaImg },
  { id: 6, name: "Café de Spécialité", description: "Café premium préparé avec soin", category: "matcha", price: 6.5 },

  // Bubble Tea
  { id: 7, name: "Strawberry Milk Tea", description: "Thé noir au lait avec sirop fraise et perles de tapioca", category: "bubble_tea", price: 11.5, image: bubbleTeaImg },
  { id: 8, name: "Brown Sugar Boba", description: "Lait au sucre brun caramélisé avec perles de tapioca", category: "bubble_tea", price: 11.0, image: bubbleTeaImg },
  { id: 9, name: "Taro Bubble Tea", description: "Pâte de taro crémeuse avec lait et perles de tapioca", category: "bubble_tea", price: 11.5, image: bubbleTeaImg },

  // Sushi
  { id: 10, name: "Plateau Sushi Assortis", description: "12 pièces de sushi premium halal-certifiés avec poisson frais", category: "sushi", price: 45.0, portion: "12 pièces", image: sushiPlatterImg },
  { id: 11, name: "Nigiri Saumon", description: "Saumon frais sur riz vinaigré japonais", category: "sushi", price: 18.0, portion: "4 pièces", image: sushiPlatterImg },
  { id: 12, name: "California Roll", description: "Rouleau classique avocat, surimi et concombre", category: "sushi", price: 15.0, portion: "6 pièces", image: sushiPlatterImg },
  { id: 13, name: "Dragon Roll", description: "Rouleau premium garni d'anguille et avocat", category: "sushi", price: 22.0, portion: "8 pièces", image: sushiPlatterImg },
  { id: 14, name: "Sashimi Mix", description: "Assortiment de tranches de poisson frais halal-certifié", category: "sushi", price: 28.0, portion: "8 pièces", image: sushiPlatterImg },

  // Pastry
  { id: 15, name: "Mochi", description: "Douceur japonaise en pâte de riz, garniture sucrée", category: "pastry", price: 9.0, portion: "3 pièces", image: mochiImg },
  { id: 16, name: "Dorayaki", description: "Pancake japonais fourré à la pâte de haricots rouges sucrée", category: "pastry", price: 10.0, portion: "2 pièces", image: mochiImg },
  { id: 17, name: "Matcha Cheesecake", description: "Cheesecake onctueux infusé au matcha", category: "pastry", price: 11.5, portion: "1 part" },
  { id: 18, name: "Taiyaki", description: "Gâteau en forme de poisson garni de pâte de haricots sucrée", category: "pastry", price: 10.0, portion: "1 pièce", image: taiyakiImg },
  { id: 19, name: "Lava Cake", description: "Fondant au chocolat avec cœur coulant", category: "pastry", price: 14.0, portion: "1 pièce" },
  { id: 20, name: "Soufflé Pancake", description: "Pancake japonais ultra-moelleux et aérien", category: "pastry", price: 13.0, portion: "1 pièce" },
  { id: 21, name: "Fukuta Brûlé Crêpe", description: "Crêpe caramélisée garnie de crème pâtissière", category: "pastry", price: 12.0, portion: "1 pièce" },
  { id: 22, name: "Mochi Gelato", description: "Glace artisanale enrobée de pâte de riz", category: "pastry", price: 10.0, portion: "1 portion", image: mochiImg },
];

const categories = [
  { id: "matcha", label: "Matcha & Boissons", icon: Leaf },
  { id: "bubble_tea", label: "Bubble Tea", icon: Coffee },
  { id: "sushi", label: "Sushi Bar Halal", icon: UtensilsCrossed },
  { id: "pastry", label: "Pâtisserie Japonaise", icon: Cake },
];

export default function MenuPage() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="bg-led-dark py-16 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Menu Digital</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Notre cuisine froide « Lean & Luxury » : sushi halal-certifiés, matcha cérémonial, bubble tea artisanal et pâtisserie japonaise. 100% sans alcool, 100% premium.
          </p>
          <Button onClick={() => setShowQR(true)} variant="outline" className="mt-6 border-secondary text-secondary hover:bg-secondary/10">
            <QrCode className="w-4 h-4 mr-2" /> Générer QR Code
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs defaultValue="matcha">
          <TabsList className="grid w-full grid-cols-4 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{cat.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems
                  .filter((item) => item.category === cat.id)
                  .map((item) => (
                    <Card key={item.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all group">
                      {item.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            width={768}
                            height={512}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          {item.portion && (
                            <span className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                              {item.portion}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <span className="text-2xl font-bold text-primary">{item.price.toFixed(1)} DT</span>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowQR(false)}>
          <Card className="bg-card border-border p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6 text-center">QR Code du Menu</h2>
            <div className="flex justify-center mb-6">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`} alt="QR Code" className="w-64 h-64" />
            </div>
            <p className="text-center text-muted-foreground mb-6">Scannez ce code pour accéder au menu numérique.</p>
            <Button onClick={() => setShowQR(false)} variant="outline" className="w-full">Fermer</Button>
          </Card>
        </div>
      )}
    </div>
  );
}
