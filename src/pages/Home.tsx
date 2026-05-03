import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Sparkles, Zap, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import tokyoNightImg from "@/assets/themes/tokyo-night.jpg";
import aquariumImg from "@/assets/themes/aquarium.png";
import jungleImg from "@/assets/themes/jungle.jpg";
import sakuraFujiImg from "@/assets/themes/sakura-fuji.png";
import galaxyImg from "@/assets/themes/galaxy.jpg";

const themes = [
  {
    name: "Tokyo Night",
    image: tokyoNightImg,
    description: "Cyberpunk futuriste avec néons violets et géométries brillantes",
  },
  {
    name: "Real Aquarium",
    image: aquariumImg,
    description: "Environnement marin immersif avec requins et coraux tropicaux",
  },
  {
    name: "Sakura & Mont Fuji",
    image: sakuraFujiImg,
    description: "Cerisiers en fleurs avec vue panoramique sur le Mont Fuji",
  },
  {
    name: "Jungle Tropicale",
    image: jungleImg,
    description: "Forêt luxuriante avec faune et flore tropicales",
  },
  {
    name: "Galaxy",
    image: galaxyImg,
    description: "Voyage interstellaire dans l'espace profond",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % themes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-led-dark text-foreground">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {themes.map((theme, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === activeTheme ? "opacity-100" : "opacity-0"}`}
            >
              <img src={theme.image} alt={theme.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="text-5xl md:text-7xl font-bold text-gradient-brand mb-6 tracking-widest">
            SORA
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Le Sanctuaire Digital Immersif
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Le premier espace « Phygital » de Sousse — où la technologie LED 8K fusionne avec la gastronomie japonaise premium dans un environnement qui se réinvente chaque jour.
          </p>

          <div className="mb-8 inline-block px-6 py-3 bg-primary-foreground/10 backdrop-blur-md rounded-full border border-primary-foreground/20">
            <p className="text-lg text-primary-foreground font-semibold">
              Thème du jour : <span className="text-primary">{themes[activeTheme].name}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              onClick={() => navigate("/reservations")}
            >
              Réserver ma table
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 font-bold text-lg px-8 py-6"
              onClick={() => navigate("/votes")}
            >
              Voter pour le thème
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-3">
            {themes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTheme(index)}
                className={`transition-all rounded-full ${index === activeTheme ? "bg-primary w-8 h-3" : "bg-primary-foreground/50 hover:bg-primary-foreground/75 w-3 h-3"}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary-foreground" />
        </div>
      </section>

      {/* The Problem vs Solution */}
      <section className="py-20 px-4 bg-led-dark border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Pourquoi SORA ?</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Nous résolvons le « Experience Gap » du marché loisir tunisien
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Environnements Infinis",
                problem: "Les cafés traditionnels sont statiques — les clients s'ennuient après 3 visites.",
                solution: "Murs LED 360° ISEMC qui changent le thème quotidiennement. Tokyo, Aquarium, Jungle — jamais la même expérience.",
                icon: "✨",
                accent: "primary",
              },
              {
                title: "Cold Kitchen Premium",
                problem: "Les cuisines chaudes nécessitent gaz, extraction et main-d'œuvre coûteuse.",
                solution: "Sushi halal-certifiés, matcha cérémonial, pâtisserie japonaise. Zéro gaz, hygiène maximale.",
                icon: "🍣",
                accent: "secondary",
              },
              {
                title: "Luxe Inclusif Sans Alcool",
                problem: "Les lieux « premium » du soir à Sousse dépendent de l'alcool.",
                solution: "Un lounge premium, familial et sans alcool. Le premier de ce type en Afrique du Nord.",
                icon: "👥",
                accent: "primary",
              },
            ].map((feature, index) => (
              <Card key={index} className={`bg-card border-2 ${feature.accent === "primary" ? "border-primary" : "border-secondary"} p-8 hover:shadow-lg hover:shadow-primary/10 transition-all`}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground/70 mb-3 italic">« {feature.problem} »</p>
                <p className="text-muted-foreground leading-relaxed">{feature.solution}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Pour Qui ?</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Trois communautés, une destination
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "📱",
                title: "Les Digital Natives",
                age: "18–28 ans",
                desc: "Étudiants et créateurs de contenu cherchant le spot le plus « Instagrammable » de Tunisie. Des fonds 360° parfaits pour TikTok et Instagram.",
              },
              {
                emoji: "💼",
                title: "Le Tier Corporate",
                age: "Entreprises",
                desc: "Réservations B2B haut de gamme pour lancements de produits et présentations « Phygitales » dans un cadre technologique unique.",
              },
              {
                emoji: "🌍",
                title: "L'Expérience Touriste",
                age: "Visiteurs internationaux",
                desc: "Un lounge japonais aux standards internationaux dans le Sahel tunisien. Fusion du Zen japonais et de l'hospitalité tunisienne.",
              },
            ].map((persona, i) => (
              <Card key={i} className="bg-card border-border p-8 hover:border-primary/50 transition-all">
                <div className="text-4xl mb-4">{persona.emoji}</div>
                <h3 className="text-2xl font-bold mb-1">{persona.title}</h3>
                <p className="text-sm text-primary font-semibold mb-4">{persona.age}</p>
                <p className="text-muted-foreground leading-relaxed">{persona.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-4 bg-led-dark border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Roadmap Stratégique</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Une croissance planifiée et durable
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { phase: "Phase 1 — Année 1", title: "Lancement Sousse", description: "360° Lounge immersif + Cold Kitchen (Sushi, Matcha, Pâtisserie Japonaise). Création du buzz et domination locale.", target: "Juillet 2026", icon: "🎯" },
              { phase: "Phase 2 — Année 2", title: "Diversification", description: "Suites Karaoké privées et ateliers culturels japonais. Augmentation du panier moyen.", target: "2027", icon: "🎤" },
              { phase: "Phase 3 — Années 3-4", title: "Expansion « World Edition »", description: "Flagship Tunis (Berges du Lac) avec thèmes culturels rotatifs internationaux.", target: "2028-2029", icon: "🌍" },
              { phase: "Phase 4 — Année 5+", title: "Franchise & Scaling", description: "Playbook franchise pour Hammamet, Monastir et au-delà. Technologie VR et IA intégrées.", target: "2029+", icon: "🚀" },
            ].map((item, index) => (
              <Card key={index} className="bg-card border-border p-8 hover:border-primary transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <p className="text-sm text-primary font-semibold mb-2">{item.phase}</p>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <p className="text-sm font-semibold text-secondary">{item.target}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/20 to-secondary/20 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Prêt pour une Expérience Immersive ?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Rejoignez le premier sanctuaire digital de Sousse. Réservez votre table, explorez le menu ou découvrez nos thèmes LED.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6" onClick={() => navigate("/menu")}>
              Découvrir le Menu <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg px-8 py-6" onClick={() => navigate("/concept")}>
              En Savoir Plus <Zap className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" className="bg-primary/80 hover:bg-primary/70 text-primary-foreground font-bold text-lg px-8 py-6" onClick={() => navigate("/gallery")}>
              Voir les Thèmes LED <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
