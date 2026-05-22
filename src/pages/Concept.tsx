import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BadgeCheck,
  Cpu,
  Eye,
  Layers3,
  Leaf,
  Map,
  Music2,
  ScanLine,
  Shield,
  Sparkles,
  Utensils,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const technologies = [
  {
    icon: Eye,
    title: "Écrans LED P1.8 ISEMC",
    description: "Une enveloppe visuelle 8K fine-pitch pensée pour être nette même de très près, avec une luminosité calibrée pour smartphone.",
    specs: ["7.04m × 3.84m × 2.88m", "Pixel pitch 1.86mm", "Calibration camera-ready"],
  },
  {
    icon: Music2,
    title: "Son 3D immersif",
    description: "Des ambiances audio synchronisées avec les scènes pour transformer chaque thème en vraie expérience sensorielle.",
    specs: ["Surround 5.1", "Soundscapes adaptatifs", "Transitions live"],
  },
  {
    icon: Cpu,
    title: "Serveur média synchrone",
    description: "Le cerveau de YUME orchestre les contenus, les lumières et le rythme de la salle comme un système programmable.",
    specs: ["Temps réel", "Library de thèmes", "Architecture scalable"],
  },
  {
    icon: Utensils,
    title: "Cold Kitchen Lean & Luxury",
    description: "Cuisine froide sans gaz : moins de complexité, plus d'hygiène, plus de vitesse et une expérience premium cohérente.",
    specs: ["100% halal", "Sans alcool", "Process HACCP"],
  },
];

const serviceFlow = [
  { step: "01", title: "Pré-visite", desc: "Le client découvre les thèmes, réserve son créneau et prépare son mood avant d'arriver." },
  { step: "02", title: "Check-in", desc: "Accueil rapide par QR code, attribution de table et première scène LED personnalisée." },
  { step: "03", title: "Commande", desc: "Menu digital, choix rapides, préparation cold kitchen fluide et suivi clair." },
  { step: "04", title: "Immersion", desc: "Ambiance 360°, son 3D, photos, live vote et changements de scène progressifs." },
  { step: "05", title: "Retour", desc: "Paiement simple, feedback, collecte de data et invitation à revenir pour le prochain thème." },
];

const zones = [
  { name: "Espace Café", capacity: "35", label: "places", desc: "Social, study, dates, photos", phase: "Phase 1" },
  { name: "Salle Immersive", capacity: "30", label: "places", desc: "LED show, events, themed nights", phase: "Phase 1" },
  { name: "Suites Karaoké", capacity: "14", label: "places", desc: "Expérience privée premium", phase: "Phase 2" },
  { name: "Workshop Room", capacity: "12", label: "places", desc: "Culture, creator sessions, VIP", phase: "Phase 2" },
];

const pillars = [
  { icon: Zap, title: "Ambiance programmable", text: "Le décor ne dépend plus de travaux physiques : il change par contenu digital." },
  { icon: Leaf, title: "Opérations légères", text: "Cold kitchen, parcours digital et process standardisés pour garder le modèle rapide." },
  { icon: Shield, title: "Premium inclusif", text: "Halal, sans alcool, familial et adapté à une clientèle jeune, corporate et touristique." },
  { icon: Users, title: "Social by design", text: "Chaque angle est pensé pour le partage TikTok, Instagram, UGC et viralité organique." },
];

const controlRoom = [
  "Choix du thème du jour",
  "Synchronisation audio-visuelle",
  "Monitoring fréquentation",
  "Vote client en direct",
  "Feedback post-visite",
  "Reporting événementiel",
];

export default function Concept() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <PageHero
        eyebrow={<><Sparkles className="h-4 w-4" /> Experience-as-a-Service</>}
        title={<><span className="text-gradient-brand">Le Concept</span> YUME</>}
        subtitle="Un lounge immersif phygital où les murs, le son, le menu et le parcours client travaillent ensemble pour créer une expérience qui se réinvente chaque jour."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { value: 8, suffix: "K", label: "résolution immersive" },
            { value: 360, suffix: "°", label: "ambiance enveloppante" },
            { value: 100, suffix: "%", label: "halal & sans alcool" },
          ].map((stat) => (
            <Card key={stat.label} className="neo-card rounded-[1.75rem] p-5 text-center">
              <p className="text-4xl font-black text-gradient-brand"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </PageHero>

      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <span className="section-eyebrow"><Layers3 className="h-4 w-4" /> Vision</span>
            <h2 className="mb-6 text-4xl font-black md:text-6xl">Un espace physique, mais une expérience infinie.</h2>
            <div className="space-y-5 text-lg leading-8 text-muted-foreground">
              <p>
                YUME répond à l'« Experience Gap » du marché loisir tunisien : beaucoup de cafés existent, mais très peu d'endroits offrent un vrai changement d'univers, une narration et une dimension technologique mémorable.
              </p>
              <p>
                Le concept transforme un café en média programmable : un jour Tokyo Neon Rain, le lendemain Aquarium, puis Sakura Sunset. La valeur ne vient pas uniquement du menu, mais de l'émotion, du contenu et de la répétition de visite.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="premium-button bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/gallery">Voir les thèmes <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/10 bg-white/5">
                <Link to="/menu">Explorer le menu</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal direction="left">
            <Card className="holo-border rounded-[2rem] border-0 p-[1px]">
              <div className="rounded-[2rem] bg-card/90 p-7 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">System map</p>
                    <h3 className="mt-2 text-2xl font-black">Pourquoi c'est défendable</h3>
                  </div>
                  <ScanLine className="h-10 w-10 text-primary animate-pulse-glow rounded-full" />
                </div>
                <div className="grid gap-4">
                  {pillars.map((pillar, index) => {
                    const Icon = pillar.icon;
                    return (
                      <div key={pillar.title} className="group rounded-3xl border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-primary/40">
                        <div className="flex gap-4">
                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="rounded-full border-secondary/25 text-secondary">0{index + 1}</Badge>
                              <h4 className="font-black">{pillar.title}</h4>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="section-heading">
          <span className="section-eyebrow"><Cpu className="h-4 w-4" /> Infrastructure</span>
          <h2 className="mb-4 text-4xl font-black md:text-6xl">Le moteur technologique</h2>
          <p className="text-lg leading-8 text-muted-foreground">Chaque composant est pensé comme une brique d'expérience : visuel, son, contenu, opérations et data.</p>
        </Reveal>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Reveal key={tech.title} delay={index * 80}>
                <Card className="magnetic-card group h-full overflow-hidden rounded-[2rem] border-white/10 bg-card/70 p-7 backdrop-blur-xl">
                  <div className="mb-5 flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary shadow-lg shadow-primary/10 transition group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black">{tech.title}</h3>
                      <p className="mt-2 leading-7 text-muted-foreground">{tech.description}</p>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {tech.specs.map((spec) => (
                      <div key={spec} className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-2 text-sm font-semibold text-secondary">
                        {spec}
                      </div>
                    ))}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="section-heading">
          <span className="section-eyebrow"><Map className="h-4 w-4" /> Parcours client</span>
          <h2 className="mb-4 text-4xl font-black md:text-6xl">Une expérience fluide du QR code au souvenir.</h2>
        </Reveal>
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-5">
          {serviceFlow.map((item, index) => (
            <Reveal key={item.step} delay={index * 80}>
              <div className="relative h-full rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:-translate-y-2 hover:border-primary/50">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-4xl font-black text-gradient-brand">{item.step}</span>
                  {index < serviceFlow.length - 1 && <ArrowRight className="hidden h-5 w-5 text-muted-foreground md:block" />}
                </div>
                <h3 className="mb-3 text-xl font-black">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="section-eyebrow"><BadgeCheck className="h-4 w-4" /> Operations</span>
            <h2 className="mb-5 text-4xl font-black md:text-6xl">Control room d'un lounge nouvelle génération.</h2>
            <p className="text-lg leading-8 text-muted-foreground">
              L'équipe ne pilote pas seulement des tables. Elle pilote une ambiance, un contenu, une cadence et des données clients qui rendent chaque soirée plus intelligente.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {controlRoom.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold text-foreground">
                  <BadgeCheck className="mr-2 inline h-4 w-4 text-secondary" /> {item}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="grid gap-5 sm:grid-cols-2">
              {zones.map((zone, index) => (
                <Card key={zone.name} className="magnetic-card rounded-[2rem] border-white/10 bg-card/70 p-6 backdrop-blur-xl">
                  <Badge className="mb-5 rounded-full bg-secondary/15 text-secondary">{zone.phase}</Badge>
                  <h3 className="text-2xl font-black">{zone.name}</h3>
                  <p className="my-4 text-6xl font-black text-gradient-brand">
                    <AnimatedCounter value={Number(zone.capacity)} />
                    <span className="ml-2 text-base text-muted-foreground">{zone.label}</span>
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">{zone.desc}</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${Math.min(Number(zone.capacity) * 2, 100)}%` }} />
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-28">
        <Reveal>
          <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-card/70 p-8 text-center backdrop-blur-xl md:p-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.25),transparent_40%)]" />
            <span className="section-eyebrow"><Sparkles className="h-4 w-4" /> Theme library</span>
            <h2 className="mb-5 text-4xl font-black md:text-6xl">Le décor devient un produit vivant.</h2>
            <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-muted-foreground">
              YUME peut lancer de nouveaux thèmes, créer des soirées spéciales, tester les préférences des clients et augmenter la revisite sans reconstruire l'espace.
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { emoji: "🌃", name: "Tokyo Night", desc: "Urban cyberpunk, néons violets, pluie digitale." },
                { emoji: "🌊", name: "Real Aquarium", desc: "Océan bioluminescent, récifs, mouvement doux." },
                { emoji: "🌿", name: "Zen Forest", desc: "Forêt de bambous, lanternes, silence premium." },
              ].map((theme) => (
                <div key={theme.name} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-2 hover:border-secondary/50">
                  <div className="mb-4 text-5xl animate-float-medium">{theme.emoji}</div>
                  <h3 className="text-xl font-black">{theme.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{theme.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
