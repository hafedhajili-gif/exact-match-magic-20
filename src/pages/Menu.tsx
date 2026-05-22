import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Leaf, UtensilsCrossed, Cake, QrCode, Coffee, Wine, Search, Sparkles, Star } from "lucide-react";

import matchaLatteImg from "@/assets/menu/matcha-latte.jpg";
import hojichaLatteImg from "@/assets/menu/hojicha-latte.jpg";
import matchaEspressoImg from "@/assets/menu/matcha-espresso.jpg";
import yuzuSodaImg from "@/assets/menu/yuzu-soda.jpg";
import sakuraLemonadeImg from "@/assets/menu/sakura-lemonade.jpg";
import specialtyCoffeeImg from "@/assets/menu/specialty-coffee.jpg";
import neonSakuraglowImg from "@/assets/menu/neon-sakuraglow.jpg";
import lycheeYuzuSparklerImg from "@/assets/menu/lychee-yuzu-sparkler.jpg";
import matchaMojitoImg from "@/assets/menu/matcha-mojito.jpg";
import virginTokyoMuleImg from "@/assets/menu/virgin-tokyo-mule.jpg";

import strawberryMilkTeaImg from "@/assets/menu/strawberry-milk-tea.jpg";
import brownSugarBobaImg from "@/assets/menu/brown-sugar-boba.jpg";
import taroBubbleTeaImg from "@/assets/menu/taro-bubble-tea.jpg";

import californiaRollImg from "@/assets/menu/california-roll.jpg";
import spicyTunaRollImg from "@/assets/menu/spicy-tuna-roll.jpg";
import nigiriSalmonImg from "@/assets/menu/nigiri-salmon.jpg";
import ebiTempuraRollImg from "@/assets/menu/ebi-tempura-roll.jpg";
import dragonRollImg from "@/assets/menu/dragon-roll.jpg";
import vegetarianRollImg from "@/assets/menu/vegetarian-roll.jpg";

import mochiImg from "@/assets/menu/mochi.jpg";
import dorayakiImg from "@/assets/menu/dorayaki.jpg";
import matchaCheesecakeImg from "@/assets/menu/matcha-cheesecake.jpg";
import taiyakiImg from "@/assets/menu/taiyaki.jpg";
import lavaCakeImg from "@/assets/menu/lava-cake.jpg";
import soufflePancakeImg from "@/assets/menu/souffle-pancake.jpg";
import bruleCrepeImg from "@/assets/menu/brule-crepe.jpg";
import mochiGelatoImg from "@/assets/menu/mochi-gelato.jpg";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  portion?: string;
  image: string;
}

const menuItems: MenuItem[] = [
  // Beverages — Matcha Lab
  { id: 1, name: "Matcha Latte", description: "Matcha cérémonial de qualité supérieure avec lait onctueux", category: "matcha", price: 11.0, image: matchaLatteImg },
  { id: 2, name: "Hojicha Latte", description: "Thé vert torréfié avec lait crémeux, saveur douce et boisée", category: "matcha", price: 10.0, image: hojichaLatteImg },
  { id: 3, name: "Matcha Espresso Fusion", description: "Alliance unique du matcha et d'un shot espresso avec lait", category: "matcha", price: 12.0, image: matchaEspressoImg },
  { id: 4, name: "Yuzu Sparkling Soda", description: "Soda pétillant artisanal au jus de yuzu frais", category: "matcha", price: 9.5, image: yuzuSodaImg },
  { id: 5, name: "Sakura Lemonade", description: "Limonade délicate au sirop de fleur de cerisier", category: "matcha", price: 9.5, image: sakuraLemonadeImg },
  { id: 6, name: "Café de Spécialité", description: "Café premium single origin préparé avec soin", category: "matcha", price: 6.5, image: specialtyCoffeeImg },

  // Bubble Tea
  { id: 7, name: "Strawberry Milk Tea", description: "Thé noir au lait avec sirop fraise et perles de tapioca", category: "bubble_tea", price: 11.5, image: strawberryMilkTeaImg },
  { id: 8, name: "Brown Sugar Boba", description: "Lait au sucre brun caramélisé avec perles de tapioca", category: "bubble_tea", price: 11.0, image: brownSugarBobaImg },
  { id: 9, name: "Taro Bubble Tea", description: "Pâte de taro crémeuse avec lait et perles de tapioca", category: "bubble_tea", price: 11.5, image: taroBubbleTeaImg },

  // Mocktails Premium
  { id: 10, name: "Neon SakuraGlow", description: "Mocktail hibiscus, litchi et eau de rose pétillante — visuel néon", category: "mocktail", price: 13.0, image: neonSakuraglowImg },
  { id: 11, name: "Lychee Yuzu Sparkler", description: "Pétillant rafraîchissant au litchi et yuzu", category: "mocktail", price: 12.5, image: lycheeYuzuSparklerImg },
  { id: 12, name: "Matcha Mojito", description: "Mojito sans alcool au matcha, citron vert et menthe fraîche", category: "mocktail", price: 12.0, image: matchaMojitoImg },
  { id: 13, name: "Virgin Tokyo Mule", description: "Ginger beer, yuzu et concombre — twist sans alcool du Moscou", category: "mocktail", price: 12.0, image: virginTokyoMuleImg },

  // Sushi — Halal Certified
  { id: 14, name: "California Roll", description: "Rouleau classique riz, nori, avocat et surimi halal", category: "sushi", price: 18.0, portion: "6 pièces", image: californiaRollImg },
  { id: 15, name: "Spicy Tuna Roll", description: "Rouleau au thon halal et mayo épicée maison", category: "sushi", price: 19.5, portion: "6 pièces", image: spicyTunaRollImg },
  { id: 16, name: "Salmon Nigiri", description: "Saumon halal frais posé sur riz vinaigré, wasabi", category: "sushi", price: 17.0, portion: "2 pièces", image: nigiriSalmonImg },
  { id: 17, name: "Ebi Tempura Roll", description: "Crevette halal en tempura croustillante, avocat et nori", category: "sushi", price: 20.0, portion: "6 pièces", image: ebiTempuraRollImg },
  { id: 18, name: "Dragon Roll", description: "Rouleau avec avocat, concombre, sauce anguille et graines de sésame", category: "sushi", price: 21.0, portion: "6 pièces", image: dragonRollImg },
  { id: 19, name: "Vegetarian Roll", description: "Rouleau frais concombre, avocat, carotte et daikon", category: "sushi", price: 14.0, portion: "6 pièces", image: vegetarianRollImg },

  // Patisserie Japonaise
  { id: 20, name: "Mochi", description: "Douceur japonaise en pâte de riz, garniture sucrée", category: "pastry", price: 9.0, portion: "3 pièces", image: mochiImg },
  { id: 21, name: "Dorayaki", description: "Pancake japonais fourré à la pâte de haricots rouges sucrée", category: "pastry", price: 10.0, portion: "2 pièces", image: dorayakiImg },
  { id: 22, name: "Matcha Cheesecake", description: "Cheesecake onctueux infusé au matcha", category: "pastry", price: 11.5, portion: "1 part", image: matchaCheesecakeImg },
  { id: 23, name: "Taiyaki", description: "Gâteau en forme de poisson garni de pâte de haricots sucrée", category: "pastry", price: 10.0, portion: "1 pièce", image: taiyakiImg },
  { id: 24, name: "Lava Cake", description: "Fondant au chocolat avec cœur coulant", category: "pastry", price: 14.0, portion: "1 pièce", image: lavaCakeImg },
  { id: 25, name: "Soufflé Pancake", description: "Pancake japonais ultra-moelleux et aérien", category: "pastry", price: 13.0, portion: "1 pièce", image: soufflePancakeImg },
  { id: 26, name: "Fukuta Brûlé Crêpe", description: "Crêpe caramélisée garnie de crème pâtissière", category: "pastry", price: 12.0, portion: "1 pièce", image: bruleCrepeImg },
  { id: 27, name: "Mochi Gelato", description: "Glace artisanale enrobée de pâte de riz", category: "pastry", price: 10.0, portion: "1 portion", image: mochiGelatoImg },
];

const categories = [
  { id: "matcha", label: "Matcha & Boissons", icon: Leaf },
  { id: "bubble_tea", label: "Bubble Tea", icon: Coffee },
  { id: "mocktail", label: "Mocktails Premium", icon: Wine },
  { id: "sushi", label: "Sushi Bar Halal", icon: UtensilsCrossed },
  { id: "pastry", label: "Pâtisserie Japonaise", icon: Cake },
];

export default function MenuPage() {
  const [showQR, setShowQR] = useState(false);
  const [activeCategory, setActiveCategory] = useState("matcha");
  const [search, setSearch] = useState("");

  const activeItems = menuItems.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const signatureItems = menuItems.filter((item) => [1, 10, 14, 22].includes(item.id));

  return (
    <div className="min-h-screen bg-background pt-16">
      <PageHero
        eyebrow={<><Sparkles className="h-4 w-4" /> Cold kitchen experience</>}
        title={<><span className="text-gradient-brand">Menu</span> Digital</>}
        subtitle="Une carte conçue comme une extension de l'expérience : matcha cérémonial, bubble tea, sushi halal, mocktails premium et pâtisserie japonaise."
        align="left"
      >
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Chercher matcha, sushi, mochi..." className="h-14 rounded-full border-white/10 bg-white/5 pl-12 text-base backdrop-blur-xl" />
          </div>
          <Button onClick={() => setShowQR(true)} variant="outline" className="h-14 rounded-full border-secondary/35 bg-secondary/10 px-6 font-bold text-secondary hover:bg-secondary/15">
            <QrCode className="mr-2 h-4 w-4" /> Générer QR Code
          </Button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <Reveal>
          <div className="mb-12 grid gap-5 md:grid-cols-4">
            {signatureItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden rounded-[1.75rem] border-white/10 bg-card/70 backdrop-blur-xl transition hover:-translate-y-2 hover:border-primary/50">
                <div className="relative h-40 overflow-hidden">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-black text-primary-foreground"><Star className="mr-1 inline h-3 w-3" /> Signature</div>
                </div>
                <div className="p-4">
                  <h3 className="font-black">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.price.toFixed(1)} DT</p>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-12 grid h-auto w-full grid-cols-2 gap-2 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-2 backdrop-blur-xl md:grid-cols-5">
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
              {activeItems.length === 0 ? (
                <Card className="rounded-[2rem] border-white/10 bg-card/60 p-10 text-center backdrop-blur-xl">
                  <p className="text-lg font-bold">Aucun produit trouvé.</p>
                  <p className="mt-2 text-muted-foreground">Essayez un autre mot-clé ou changez de catégorie.</p>
                </Card>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {activeItems.map((item, index) => (
                    <Reveal key={item.id} delay={index * 55}>
                      <Card className="magnetic-card group h-full overflow-hidden rounded-[2rem] border-white/10 bg-card/70 backdrop-blur-xl">
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            width={768}
                            height={512}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent" />
                          <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-background/70 px-3 py-1 text-xs font-black text-secondary backdrop-blur-xl">
                            {categories.find((category) => category.id === item.category)?.label}
                          </span>
                        </div>
                        <div className="p-6">
                          <div className="mb-3 flex items-start justify-between gap-4">
                            <h3 className="text-xl font-black">{item.name}</h3>
                            {item.portion && (
                              <span className="whitespace-nowrap rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                                {item.portion}
                              </span>
                            )}
                          </div>
                          <p className="mb-5 min-h-[44px] text-sm leading-6 text-muted-foreground">{item.description}</p>
                          <div className="flex items-end justify-between">
                            <span className="text-3xl font-black text-gradient-brand">{item.price.toFixed(1)} DT</span>
                            <Button size="sm" variant="outline" className="rounded-full border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">Ajouter</Button>
                          </div>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-card/70 p-8 backdrop-blur-xl md:p-10">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_0%,hsl(var(--primary)/0.18),transparent_35%),radial-gradient(circle_at_90%_35%,hsl(var(--secondary)/0.12),transparent_32%)]" />
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <span className="section-eyebrow"><UtensilsCrossed className="h-4 w-4" /> Menu engine</span>
                <h2 className="mb-4 text-4xl font-black">Le goût suit le thème.</h2>
                <p className="leading-8 text-muted-foreground">Chaque catégorie peut être associée à un mood LED : mocktail néon pour Tokyo, matcha doux pour Zen Forest, dessert sakura pour Sunset Lounge.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Scan QR", "Choose mood", "Enjoy 8K"].map((step, index) => (
                  <div key={step} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 text-center">
                    <p className="text-3xl font-black text-gradient-brand">0{index + 1}</p>
                    <p className="mt-2 font-bold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>
      </Reveal>

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
