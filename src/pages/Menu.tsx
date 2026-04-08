import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, UtensilsCrossed, Cake, QrCode } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
}

const mockMenuItems: MenuItem[] = [
  { id: 1, name: "Matcha Latte Premium", description: "Matcha biologique japonais grade ceremonial avec lait de coco frais", category: "matcha", price: 8500, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/matcha-latte-hero-EJRwPNmfaDE3daFnC9GsBQ.webp" },
  { id: 2, name: "Yuzu Soda", description: "Soda artisanal au yuzu frais", category: "matcha", price: 6000, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/matcha-latte-hero-EJRwPNmfaDE3daFnC9GsBQ.webp" },
  { id: 3, name: "Bubble Tea Matcha", description: "Bubble tea avec perles de tapioca", category: "bubble_tea", price: 7500, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/matcha-latte-hero-EJRwPNmfaDE3daFnC9GsBQ.webp" },
  { id: 4, name: "Plateau Sushi Assortis Halal", description: "12 pièces de sushi premium halal-certifiés avec poisson frais importé", category: "sushi", price: 45000, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/sushi-platter-hero-SW2zvRL9ii6JGzzU6XEZYM.webp" },
  { id: 5, name: "Nigiri Saumon", description: "Saumon frais sur riz vinaigré", category: "sushi", price: 4500, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/sushi-platter-hero-SW2zvRL9ii6JGzzU6XEZYM.webp" },
  { id: 6, name: "Mochi Fraise", description: "Mochi japonais avec cœur fraise", category: "pastry", price: 5000, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/matcha-latte-hero-EJRwPNmfaDE3daFnC9GsBQ.webp" },
  { id: 7, name: "Taiyaki Matcha", description: "Gâteau en forme de poisson avec crème matcha", category: "pastry", price: 6000, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/matcha-latte-hero-EJRwPNmfaDE3daFnC9GsBQ.webp" },
  { id: 8, name: "Taro Bubble Tea", description: "Bubble tea saveur taro avec perles de tapioca", category: "bubble_tea", price: 7000, imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/matcha-latte-hero-EJRwPNmfaDE3daFnC9GsBQ.webp" },
];

const categories = [
  { id: "matcha", label: "Matcha & Mixologie", icon: Leaf },
  { id: "bubble_tea", label: "Bubble Tea", icon: Leaf },
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
          <p className="text-xl text-muted-foreground">
            Découvrez notre sélection premium de sushi halal-certifiés, matcha artisanal et pâtisserie japonaise.
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
                {mockMenuItems
                  .filter((item) => item.category === cat.id)
                  .map((item) => (
                    <Card key={item.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all group">
                      <div className="relative h-48 overflow-hidden">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                        <span className="text-2xl font-bold text-primary">{(item.price / 1000).toFixed(1)} DT</span>
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
