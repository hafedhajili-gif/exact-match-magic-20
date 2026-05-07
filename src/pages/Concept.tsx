import { Card } from "@/components/ui/card";
import { Zap, Volume2, Utensils, Eye, Cpu, Leaf, Users, Shield } from "lucide-react";

const technologies = [
  {
    icon: Eye,
    title: "Écrans LED P1.8 ISEMC",
    description: "Technologie Fine-Pitch à substrat Gold pour une clarté 8K exceptionnelle même de près. Pas de « wash-out » comme les projecteurs traditionnels.",
    specs: ["7.04m × 3.84m × 2.88m H", "Résolution 8K", "Durée de vie 10-12 ans"],
  },
  {
    icon: Volume2,
    title: "Son 3D Immersif",
    description: "Système audio surround professionnel synchronisé en temps réel avec les visuels pour une immersion totale.",
    specs: ["Surround 5.1", "Synchronisation vidéo", "Ambiances adaptatives"],
  },
  {
    icon: Cpu,
    title: "Serveur Média Synchrone",
    description: "Cerveau du système capable de gérer la synchronisation temps réel de contenus 8K sur toutes les surfaces. Architecture cloud pour scalabilité multi-sites.",
    specs: ["Synchronisation temps réel", "Architecture cloud", "Infrastructure 30kW"],
  },
  {
    icon: Utensils,
    title: "Cold Kitchen « Lean & Luxury »",
    description: "Cuisine froide 100% sans gaz. Sushi halal-certifiés, Matcha Lab, pâtisserie japonaise. Hygiène maximale avec protocoles HACCP.",
    specs: ["Zéro gaz", "100% Halal", "Normes HACCP"],
  },
];

const serviceFlow = [
  { step: "1", title: "Pré-visite", desc: "Découvrez les thèmes du jour sur l'app et réservez votre ambiance préférée." },
  { step: "2", title: "Arrivée", desc: "Check-in par QR code. L'écran LED vous accueille avec un visuel personnalisé." },
  { step: "3", title: "Commande", desc: "Menu digital interactif. Commande envoyée à la Cold Kitchen — préparation en 8 minutes." },
  { step: "4", title: "Immersion", desc: "Vivez l'expérience 360° avec son 3D synchronisé. Votez pour le prochain thème en direct." },
  { step: "5", title: "Paiement", desc: "Checkout digital intégré. Rapide, traçable et sans friction." },
];

const zones = [
  { name: "Espace Café", capacity: "35 places", desc: "Étude, repas décontracté, socialisation", phase: "Phase 1" },
  { name: "Salle Immersive", capacity: "30 places", desc: "Événements thématiques & contenu social", phase: "Phase 1" },
  { name: "Suites Karaoké", capacity: "14 places", desc: "Réservations premium privées", phase: "Phase 2" },
  { name: "Salle Workshop", capacity: "12 places", desc: "Éducation culturelle & événements VIP", phase: "Phase 2" },
];

export default function Concept() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="bg-led-dark py-16 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Le Concept</h1>
          <p className="text-2xl text-primary font-semibold mb-4">Experience-as-a-Service (EaaS)</p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chez YUME, vous ne payez pas simplement un produit — vous accédez à un sanctuaire digital qui se réinvente chaque jour grâce à la technologie Software-Defined Ambiance.
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
                YUME est un projet d'<span className="text-primary font-semibold">Infrastructure Technologique</span> conçu pour résoudre le « Experience Gap » du marché loisir tunisien. Tandis que Sousse a une forte densité de cafés traditionnels, il y a une absence totale d'espaces <span className="text-secondary font-semibold">Phygitaux</span> (Physical + Digital).
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre ambition : devenir le leader nord-africain de l'<span className="text-primary font-semibold">Experience-as-a-Service</span>, utilisant la technologie ISEMC 8K pour créer un lieu qui se réinvente quotidiennement — sans coûts de rénovation physique.
              </p>
            </div>
            <Card className="bg-card border-border p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">Avantages Clés</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Software-Defined Ambiance</h4>
                    <p className="text-sm text-muted-foreground">L'espace entier se transforme quotidiennement : Tokyo, Anime, Zen Forest, Underwater…</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Leaf className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Modèle « Lean & Luxury »</h4>
                    <p className="text-sm text-muted-foreground">Cold Kitchen sans gaz — coûts réduits, hygiène maximale, complexité opérationnelle minimale</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">100% Halal & Sans Alcool</h4>
                    <p className="text-sm text-muted-foreground">Expérience premium, familiale et inclusive. Le premier lounge de ce type en Afrique du Nord.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Users className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Contenu Social Optimisé</h4>
                    <p className="text-sm text-muted-foreground">Murs LED calibrés pour les caméras smartphone — le spot TikTok/Instagram parfait</p>
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

        {/* Service Flow */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Parcours Client Digital</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {serviceFlow.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-lg border border-border/50 hover:border-border transition-all text-center">
                <div className="text-3xl font-bold text-primary mb-3">{item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zones & Capacity */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Espaces & Capacité</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {zones.map((zone, index) => (
              <Card key={index} className="bg-card border-border p-6 hover:border-primary/50 transition-all">
                <span className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded-full">{zone.phase}</span>
                <h3 className="text-xl font-bold mt-3 mb-1">{zone.name}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{zone.capacity}</p>
                <p className="text-sm text-muted-foreground">{zone.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Daily Themes */}
        <section>
          <h2 className="text-4xl font-bold mb-12 text-center">Se Réinventer Chaque Jour</h2>
          <div className="bg-card border border-border rounded-lg p-12">
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Notre « Theme Library » est notre propriété intellectuelle — un catalogue d'assets digitaux qui transforme un espace physique en médium programmable.
            </p>
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
