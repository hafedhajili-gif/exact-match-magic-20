import { Card } from "@/components/ui/card";
import { Zap, Volume2, Utensils, Eye, Cpu, Leaf } from "lucide-react";

const technologies = [
  {
    icon: Eye,
    title: "Écrans LED P1.8 ISEMC",
    description: "80m² de surface d'affichage avec résolution 8K. Technologie fine pitch pour une clarté exceptionnelle même de près.",
    specs: ["7.04m × 3.84m × 2.88m H", "Résolution 8K", "Synchronisation temps réel"],
  },
  {
    icon: Volume2,
    title: "Son 3D Immersif",
    description: "Système audio surround professionnel qui accompagne chaque thème.",
    specs: ["Surround 5.1", "Synchronisation vidéo", "Ambiances adaptées"],
  },
  {
    icon: Cpu,
    title: "Serveur Média Haute Performance",
    description: "Cerveau du système capable de gérer la synchronisation temps réel de contenus 8K. Zéro latence, zéro downtime.",
    specs: ["Synchronisation temps réel", "Redondance complète", "30kW électrique"],
  },
  {
    icon: Utensils,
    title: "Gastronomie Premium",
    description: "Cold Kitchen sans gaz. Sushi halal-certifiés, Matcha lattes artisanaux, pâtisserie japonaise.",
    specs: ["Sushi Bar Halal", "Matcha Premium", "Pâtisserie Japonaise"],
  },
];

const sensoryElements = [
  { title: "Visuel", description: "Écrans LED 8K qui transforment l'espace trois fois par jour" },
  { title: "Auditif", description: "Son 3D immersif synchronisé avec les ambiances visuelles" },
  { title: "Gustatif", description: "Menu premium avec saveurs japonaises authentiques" },
  { title: "Émotionnel", description: "Atmosphère zen et innovante qui crée la connexion" },
];

export default function Concept() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="bg-led-dark py-16 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Chill & Vibes Concept</h1>
          <p className="text-2xl text-primary font-semibold mb-4">The Immersive Digital Experience Hub</p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une infrastructure technologique révolutionnaire combinant murs LED 360°, gastronomie premium et une expérience qui se réinvente chaque jour.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Vision */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Notre Vision</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Chill & Vibes n'est pas un simple café. C'est une <span className="text-primary font-semibold">infrastructure technologique</span> conçue pour résoudre le Experience Gap en Tunisie. Notre modèle est <span className="text-secondary font-semibold">Alcohol-Free Premium Experience</span> - la première en Afrique du Nord.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre vision : devenir le leader nord-africain de l'<span className="text-primary font-semibold">Experience-as-a-Service</span>, utilisant la technologie ISEMC 8K pour créer un lieu qui se réinvente chaque jour.
              </p>
            </div>
            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Avantages Clés</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Innovation Technologique</h4>
                    <p className="text-sm text-muted-foreground">80m² d'écrans LED 8K avec synchronisation temps réel</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Leaf className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Durabilité Opérationnelle</h4>
                    <p className="text-sm text-muted-foreground">Cold Kitchen sans gaz, 30% d'économies d'énergie</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Utensils className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Excellence Gastronomique</h4>
                    <p className="text-sm text-muted-foreground">Sushi halal-certifiés et pâtisserie japonaise premium</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Technologies */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Infrastructure Technologique</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="bg-card border-border p-8 hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold">{tech.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{tech.description}</p>
                  <div className="space-y-2">
                    {tech.specs.map((spec, i) => (
                      <div key={i} className="text-sm text-secondary flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Sensory */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">L'Expérience Sensorielle</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sensoryElements.map((element, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-lg border border-border/50 hover:border-border transition-all">
                <h3 className="text-xl font-bold mb-3">{element.title}</h3>
                <p className="text-sm text-muted-foreground">{element.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Themes */}
        <section>
          <h2 className="text-4xl font-bold mb-12 text-center">Se Réinventer Chaque Jour</h2>
          <div className="bg-card border border-border rounded-lg p-12">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { emoji: "🌃", name: "Tokyo Night", desc: "Cyberpunk futuriste avec néons violets, géométries brillantes et énergie urbaine." },
                { emoji: "🌊", name: "Real Aquarium", desc: "Environnement marin bioluminescent avec créatures abyssales et atmosphère zen." },
                { emoji: "🌿", name: "Jungle", desc: "Forêt luxuriante avec faune et flore tropicales. Sérénité et connexion à la nature." },
              ].map((theme, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-4">{theme.emoji}</div>
                  <h3 className="text-xl font-bold mb-3">{theme.name}</h3>
                  <p className="text-muted-foreground">{theme.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
