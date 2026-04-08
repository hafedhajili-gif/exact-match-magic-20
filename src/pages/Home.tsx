import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Sparkles, Zap, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const themes = [
  {
    name: "Tokyo Night",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/led-cyberpunk-ambiance-Pmjk2Vv2XEBYxSjRsnzP2T.webp",
    description: "Cyberpunk futuriste avec néons violets et géométries brillantes",
  },
  {
    name: "Real Aquarium",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/led-nature-ambiance-8DApUHzhkmZmMUzJVqCJy3.webp",
    description: "Environnement marin bioluminescent avec créatures abyssales",
  },
  {
    name: "Jungle",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663505164248/8LpKNL7fKkZakyQhaA8Fdw/led-zen-ambiance-R25oCnv3uAycdAysQhbiLD.webp",
    description: "Forêt luxuriante avec faune et flore tropicales",
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
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="text-5xl md:text-7xl font-bold text-gradient-brand mb-6">
            Chill & Vibes
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            The Immersive Digital Experience Hub
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Fusing 8K Visual Technology with Next-Generation Hospitality
          </p>

          <div className="mb-8 inline-block px-6 py-3 bg-primary-foreground/10 backdrop-blur-md rounded-full border border-primary-foreground/20">
            <p className="text-lg text-primary-foreground font-semibold">
              Today's Theme: <span className="text-primary">{themes[activeTheme].name}</span>
            </p>
          </div>

          <p className="text-base text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            Découvrez le premier lounge immersif de Sousse avec murs LED 360° qui se transforment quotidiennement. Sushi premium, Matcha, et une expérience sans alcool.
          </p>

          <div className="inline-block px-6 py-3 bg-secondary/20 backdrop-blur-md rounded-full border border-secondary/50 mb-10">
            <p className="text-lg text-secondary font-semibold">🌟 Alcohol-Free Premium Experience</p>
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

      {/* Features */}
      <section className="py-20 px-4 bg-led-dark border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Pourquoi Chill & Vibes?</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Une expérience unique en Afrique du Nord combinant technologie 8K et hospitalité premium
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Infinite Environments", description: "Murs LED 360° (ISEMC P1.8) qui changent quotidiennement. Tokyo, Aquarium, Jungle. Jamais la même expérience deux fois.", icon: "✨", accent: "primary" },
              { title: "Lean Cold Kitchen", description: "Sushi premium, Tapas, Matcha. Pas de gaz, assurance réduite, 30% moins de coûts énergétiques. Halal-certified.", icon: "🍣", accent: "secondary" },
              { title: "Inclusive Luxury", description: "Expérience premium, family-friendly, sans alcool. Le premier lounge de ce type en Afrique du Nord.", icon: "👥", accent: "primary" },
            ].map((feature, index) => (
              <Card key={index} className={`bg-card border-2 ${feature.accent === "primary" ? "border-primary" : "border-secondary"} p-8 hover:shadow-lg hover:shadow-primary/10 transition-all`}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Fondateur & Vision</h2>
          <Card className="bg-card border-border p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-primary">Hafedh AJILI</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fondateur de Chill & Vibes avec un profil unique combinant innovation, gouvernance financière et expertise opérationnelle.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "🚀", label: "Innovation Authority", desc: "Master's en Entrepreneurship - modèle d'affaires lean et agile", color: "text-primary" },
                  { icon: "💰", label: "Financial Governance", desc: "Auditeur Management - contrôles internes stricts et transparence fiscale", color: "text-secondary" },
                  { icon: "⚙️", label: "Operational Mastery", desc: "Ex-Economat El Mouradi Palace - supply chain optimisée et rentable", color: "text-primary" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-led-dark rounded-lg border border-border">
                    <p className={`font-bold ${item.color} mb-2`}>{item.icon} {item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 px-4 bg-led-dark border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Roadmap Stratégique</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Une croissance planifiée et durable jusqu'à 2029
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { phase: "Phase 1 (2026)", title: "Lancement Sousse", description: "360° Lounge experience avec Cold Kitchen (Sushi, Matcha)", target: "Juillet 2026", icon: "🎯" },
              { phase: "Phase 2 (2027)", title: "Karaoke Suites", description: "Expansion avec suites karaoké privées et bars à ramen", target: "Juillet 2027", icon: "🎤" },
              { phase: "Phase 3 (2028-2029)", title: "Expansion Régionale", description: "Deux branches satellites à Tunis et Hammamet", target: "2028-2029", icon: "🌍" },
              { phase: "Objectif Financier", title: "51.2% IRR", description: "Retour sur investissement à travers F&B premium et location d'espaces", target: "Années 1-5", icon: "📈" },
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
          <h2 className="text-4xl font-bold mb-8">Prêt pour une Expérience Immersive?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Rejoignez le lounge le plus innovant de Sousse. Réservez votre table ou explorez notre menu.
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
