import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  CircuitBoard,
  Clock,
  Crown,
  Headphones,
  Instagram,
  Layers3,
  MonitorPlay,
  Sparkles,
  Star,
  Users,
  Vote,
  Zap,
} from "lucide-react";

import tokyoNightImg from "@/assets/themes/yume-tokyo-neon.jpg";
import aquariumImg from "@/assets/themes/yume-aquarium.jpg";
import sakuraSunsetImg from "@/assets/themes/yume-sakura-sunset.jpg";
import seoulKpopImg from "@/assets/themes/yume-seoul-kpop.jpg";
import zenForestImg from "@/assets/themes/yume-zen-forest.jpg";
import sakuraCoastImg from "@/assets/themes/yume-sakura-coast.jpg";
import yumeLogo from "@/assets/yume-logo.png";

const themes = [
  {
    name: "Tokyo Neon Rain",
    image: tokyoNightImg,
    mood: "Cyber lounge",
    description: "Pluie néon, katakana, reflets urbains et énergie Shibuya.",
  },
  {
    name: "YUME Aquarium",
    image: aquariumImg,
    mood: "Deep blue zen",
    description: "Méduses bioluminescentes, coraux et sons sous-marins en 360°.",
  },
  {
    name: "Sakura Sunset",
    image: sakuraSunsetImg,
    mood: "Sakura glow",
    description: "Cerisiers, lanternes et coucher de soleil rose-orange.",
  },
  {
    name: "Seoul K-Pop Night",
    image: seoulKpopImg,
    mood: "Social energy",
    description: "Hangul, néons magenta et ambiance karaoké premium.",
  },
  {
    name: "Zen Forest",
    image: zenForestImg,
    mood: "Slow luxury",
    description: "Bambous, koïs lumineux et silence immersif japonais.",
  },
];

const pillars = [
  {
    icon: MonitorPlay,
    title: "LED 8K 360°",
    tag: "Software-defined ambiance",
    problem: "Les cafés classiques restent les mêmes après chaque visite.",
    solution: "YUME change d'univers comme un film vivant : Tokyo, Aquarium, Sakura, Zen Forest, Galaxy…",
  },
  {
    icon: Sparkles,
    title: "Matcha Lab & Sushi Halal",
    tag: "Lean & luxury",
    problem: "La cuisine chaude augmente les coûts et la complexité.",
    solution: "Cold Kitchen premium : matcha cérémonial, sushi halal, bubble tea et pâtisserie japonaise.",
  },
  {
    icon: Users,
    title: "Social-first Lounge",
    tag: "Built for Gen Z",
    problem: "Les lieux premium sont souvent fermés, chers ou peu shareable.",
    solution: "Un espace inclusif, sans alcool, familial, photogénique et prêt pour TikTok/Instagram.",
  },
];

const journey = [
  { step: "01", icon: Vote, title: "Vote du thème", text: "La communauté choisit l'ambiance du lendemain en temps réel." },
  { step: "02", icon: CalendarCheck, title: "Réservation fluide", text: "Table standard, premium LED ou expérience corporate en quelques clics." },
  { step: "03", icon: CircuitBoard, title: "Check-in phygital", text: "Accueil digital, menu QR, parcours clair et expérience sans friction." },
  { step: "04", icon: Headphones, title: "Immersion synchronisée", text: "Visuels 8K, son 3D, lumière et storytelling dans la même atmosphère." },
];

const audience = [
  { emoji: "📱", title: "Digital Natives", text: "Étudiants, créateurs et groupes d'amis qui cherchent le spot le plus instagrammable du Sahel." },
  { emoji: "💼", title: "Corporate", text: "Lancements de produits, team buildings, présentations immersives et réunions qui marquent les esprits." },
  { emoji: "🌍", title: "Touristes", text: "Un lounge japonais premium avec hospitalité tunisienne et standards internationaux." },
];

const roadmap = [
  { phase: "Phase 01", title: "Flagship Sousse", detail: "Hub immersif 55 m², Matcha Lab, menu digital et vote communautaire." },
  { phase: "Phase 02", title: "Private Suites", detail: "Suites karaoké, events VIP, packs anniversaires et expériences privées." },
  { phase: "Phase 03", title: "Multi-site Scale", detail: "Déploiement Tunis/Sfax avec bibliothèque de thèmes centralisée." },
];

const marqueeItems = [
  ...themes.map((theme) => theme.name),
  "Matcha Lab",
  "Sushi Halal",
  "Corporate Events",
  "Live Voting",
];

export default function Home() {
  const navigate = useNavigate();
  const [activeTheme, setActiveTheme] = useState(0);
  const active = themes[activeTheme];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % themes.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-[760px] items-center overflow-hidden px-4 pt-24 md:h-screen">
        <div className="absolute inset-0 scanlines">
          {themes.map((theme, index) => (
            <div key={theme.name} className={`absolute inset-0 transition-all duration-1000 ${index === activeTheme ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}>
              <img src={theme.image} alt={theme.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.58)_72%)]" />
            </div>
          ))}
        </div>

        <div className="absolute left-6 top-28 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 backdrop-blur-xl md:flex">
          <span className="mr-2 h-2 w-2 rounded-full bg-secondary animate-pulse" /> Live immersive preview
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal direction="right">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold text-primary backdrop-blur-xl">
                <Sparkles className="h-4 w-4" /> First immersive phygital café in Tunisia
              </div>
            </Reveal>

            <Reveal delay={80} direction="right">
              <div className="mb-5 flex items-center gap-4">
                <img src={yumeLogo} alt="YUME logo" className="h-16 w-16 rounded-3xl border border-white/15 object-cover shadow-2xl shadow-primary/20" />
                <p className="text-sm font-black uppercase tracking-[0.55em] text-muted-foreground">Dream. Taste. Enter.</p>
              </div>
            </Reveal>

            <Reveal delay={140} direction="right">
              <h1 className="hero-title max-w-5xl text-6xl font-black leading-[0.92] tracking-tight md:text-8xl lg:text-9xl">
                YUME <span className="block text-gradient-brand">is not a café.</span>
              </h1>
            </Reveal>

            <Reveal delay={220} direction="right">
              <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/78 md:text-xl">
                C'est un hub d'expérience digitale immersive : murs LED 8K, son 3D, thème qui change chaque jour, cuisine japonaise halal et ambiance pensée pour être vécue, filmée et partagée.
              </p>
            </Reveal>

            <Reveal delay={300} direction="right">
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="premium-button bg-primary px-8 py-7 text-lg text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/reservations")}>
                  Réserver l'expérience <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-secondary/40 bg-secondary/10 px-8 py-7 text-lg font-bold text-secondary hover:bg-secondary/15" onClick={() => navigate("/gallery")}>
                  Voir les mondes 360° <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={380} direction="right">
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {[
                  { value: 8, suffix: "K", label: "LED visuals" },
                  { value: 360, suffix: "°", label: "Immersion" },
                  { value: 32, suffix: "+", label: "Daily guests target" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-panel rounded-3xl p-4 text-center">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-2xl font-black text-gradient-brand md:text-3xl" />
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} direction="left" className="perspective-1000">
            <div className="relative mx-auto w-full max-w-xl">
              <div className="holo-border rounded-[2rem] p-[1px] animate-float-slow">
                <Card className="relative overflow-hidden rounded-[2rem] border-0 bg-background/70 p-4 backdrop-blur-2xl">
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <img src={active.image} alt={active.name} className="h-[430px] w-full object-cover transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur-xl">Thème du jour</div>
                      <h2 className="text-4xl font-black text-white">{active.name}</h2>
                      <p className="mt-2 text-white/75">{active.description}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="absolute -left-4 top-12 hidden w-44 rounded-3xl border border-white/10 bg-background/75 p-4 shadow-2xl shadow-primary/20 backdrop-blur-xl md:block animate-float-medium">
                <div className="mb-2 flex items-center gap-2 text-secondary"><Clock className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-widest">Now playing</span></div>
                <p className="font-bold">{active.mood}</p>
              </div>

              <div className="absolute -bottom-7 right-3 w-64 rounded-3xl border border-white/10 bg-background/80 p-4 shadow-2xl shadow-secondary/10 backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">Community vote</span>
                  <span className="text-sm font-black text-secondary">LIVE</span>
                </div>
                <div className="space-y-2">
                  {themes.slice(0, 3).map((theme, index) => (
                    <button key={theme.name} onClick={() => setActiveTheme(index)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-white/5">
                      <img src={theme.image} alt="" className="h-10 w-10 rounded-xl object-cover" />
                      <span className="flex-1 text-sm font-semibold">{theme.name}</span>
                      <span className={`h-2.5 w-2.5 rounded-full ${index === activeTheme ? "bg-secondary" : "bg-muted"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-white/[0.035] py-4 backdrop-blur-xl">
        <div className="flex w-max animate-marquee gap-8 text-sm font-black uppercase tracking-[0.32em] text-muted-foreground">
          {[...Array(2)].map((_, loop) => (
            <div key={loop} className="flex gap-8">
              {marqueeItems.map((item) => (
                <span key={`${loop}-${item}`} className="flex items-center gap-8">
                  <Star className="h-4 w-4 text-primary" /> {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl">
          <Reveal className="section-heading">
            <span className="section-eyebrow"><Zap className="h-4 w-4" /> The upgrade</span>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Pourquoi YUME gagne ?</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              L'avantage n'est pas seulement l'idée. C'est le système : technologie, menu, communauté, storytelling et répétabilité.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 120}>
                  <Card className="magnetic-card neo-card h-full rounded-[2rem] p-7">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-lg shadow-primary/10">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-secondary">{feature.tag}</p>
                    <h3 className="mb-4 text-2xl font-black">{feature.title}</h3>
                    <p className="mb-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm italic text-muted-foreground">“{feature.problem}”</p>
                    <p className="leading-7 text-foreground/75">{feature.solution}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="mx-auto max-w-7xl">
          <Reveal className="section-heading">
            <span className="section-eyebrow"><Layers3 className="h-4 w-4" /> Experience flow</span>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Un parcours client vivant</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">Chaque étape doit donner au client l'impression d'entrer dans un autre monde.</p>
          </Reveal>

          <div className="relative grid gap-5 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent md:block" />
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.step} delay={index * 100}>
                  <Card className="relative rounded-[2rem] border-white/10 bg-background/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-secondary/40">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-4xl font-black text-primary/50">{item.step}</span>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/15 text-secondary"><Icon className="h-6 w-6" /></span>
                    </div>
                    <h3 className="mb-3 text-xl font-black">{item.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl">
          <Reveal className="section-heading">
            <span className="section-eyebrow"><Instagram className="h-4 w-4" /> Theme library</span>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Des mondes qui bougent</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">La bibliothèque visuelle devient l'actif stratégique de YUME : chaque ambiance crée une nouvelle raison de revenir.</p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {themes.map((theme, index) => (
              <Reveal key={theme.name} delay={index * 80}>
                <button onClick={() => setActiveTheme(index)} className={`group relative h-80 w-full overflow-hidden rounded-[2rem] border text-left transition-all duration-500 ${activeTheme === index ? "border-primary shadow-2xl shadow-primary/25" : "border-white/10 hover:border-primary/50"}`}>
                  <img src={theme.image} alt={theme.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-secondary">{theme.mood}</p>
                    <h3 className="text-xl font-black text-white">{theme.name}</h3>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal direction="right">
            <span className="section-eyebrow"><Crown className="h-4 w-4" /> Target market</span>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Trois publics, une destination.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              YUME parle à la Gen Z, aux entreprises et aux visiteurs qui veulent une expérience premium sans dépendre de l'alcool ni des formats classiques.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Card className="neo-card rounded-3xl p-6">
                <AnimatedCounter value={77} suffix="%" className="text-4xl font-black text-gradient-brand" />
                <p className="mt-2 text-sm text-muted-foreground">Marge brute opérationnelle visée</p>
              </Card>
              <Card className="neo-card rounded-3xl p-6">
                <AnimatedCounter value={526} suffix=" DT" className="text-4xl font-black text-gradient-brand" />
                <p className="mt-2 text-sm text-muted-foreground">Revenu journalier stable estimé</p>
              </Card>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {audience.map((item, index) => (
              <Reveal key={item.title} delay={index * 120} direction="left">
                <Card className="magnetic-card neo-card h-full rounded-[2rem] p-7">
                  <div className="mb-5 text-5xl">{item.emoji}</div>
                  <h3 className="mb-3 text-2xl font-black">{item.title}</h3>
                  <p className="leading-7 text-muted-foreground">{item.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-7xl">
          <Reveal className="section-heading">
            <span className="section-eyebrow"><ArrowRight className="h-4 w-4" /> Strategic roadmap</span>
            <h2 className="text-4xl font-black tracking-tight md:text-6xl">Built to launch, learn and scale</h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {roadmap.map((item, index) => (
              <Reveal key={item.phase} delay={index * 120}>
                <Card className="h-full rounded-[2rem] border-white/10 bg-gradient-to-br from-primary/15 via-card/80 to-secondary/10 p-8 backdrop-blur-xl">
                  <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-secondary">{item.phase}</p>
                  <h3 className="mb-4 text-2xl font-black">{item.title}</h3>
                  <p className="leading-7 text-muted-foreground">{item.detail}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Card className="mt-16 overflow-hidden rounded-[2.25rem] border-white/10 bg-card/60 p-8 text-center backdrop-blur-xl md:p-12">
              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-3xl bg-primary/20 text-primary animate-pulse-glow">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black md:text-5xl">Ready to enter YUME?</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Réservez une table, votez pour le prochain thème ou explorez le menu digital. L'expérience commence avant même d'arriver.</p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="premium-button bg-primary px-8 py-7 text-lg text-primary-foreground" onClick={() => navigate("/reservations")}>Réserver maintenant</Button>
                <Button size="lg" variant="outline" className="rounded-full border-secondary/40 bg-secondary/10 px-8 py-7 text-lg font-bold text-secondary hover:bg-secondary/15" onClick={() => navigate("/votes")}>Voter pour demain</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
