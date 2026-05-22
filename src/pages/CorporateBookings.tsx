import { Link, useNavigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Briefcase, Building2, CalendarCheck, CheckCircle2, Clock3, MapPin, Presentation, Sparkles, Target, Users, Zap } from "lucide-react";

const corporatePackages = [
  {
    name: "Product Launch",
    description: "Lancez votre produit dans une scène 8K qui transforme la présentation en moment viral.",
    capacity: "27 assis / 40 debout",
    duration: "3–4 heures",
    price: "À partir de 2,500 DT",
    features: ["Mur LED ISEMC 8K", "Son immersif 3D", "Catering sushi & matcha", "Scène de prise de parole", "Équipe technique dédiée"],
    icon: Zap,
    tag: "Launch",
  },
  {
    name: "Team Building",
    description: "Créez une cohésion d'équipe grâce à une ambiance sur-mesure, des activités interactives et une scénographie fun.",
    capacity: "Jusqu'à 25 personnes",
    duration: "2–3 heures",
    price: "À partir de 1,500 DT",
    features: ["Thème LED personnalisé", "Activités interactives", "Menu team-building", "Vote live", "Animateur optionnel"],
    icon: Users,
    tag: "Team",
  },
  {
    name: "Privatisation Complète",
    description: "Conférence, séminaire ou soirée VIP avec contrôle complet du lieu, des contenus et du service.",
    capacity: "Jusqu'à 52 personnes",
    duration: "Flexible",
    price: "À partir de 4,500 DT",
    features: ["Hub 55 m² privatisé", "AV professionnel", "Catering complet", "Support CCMS", "Parking VIP"],
    icon: Briefcase,
    tag: "Premium",
  },
];

const locations = [
  { city: "Sousse", status: "Ouverture Juillet 2026", address: "Centre-ville de Sousse, Hub 55 m²", capacity: "52 personnes", features: ["Mur LED ISEMC", "Matcha Lab Cold Kitchen", "Parking"], icon: Building2, progress: 82 },
  { city: "Tunis", status: "Expansion 2028", address: "Berges du Lac, Global Hub prévu", capacity: "À définir", features: ["Localisation premium", "Hub corporate mensuel", "Concept scalable"], icon: MapPin, progress: 38 },
  { city: "Hammamet", status: "Franchise 2029+", address: "Destination côtière à définir", capacity: "À définir", features: ["Vue mer", "Tourisme premium", "Ambiance resort"], icon: Sparkles, progress: 18 },
];

const whyCards = [
  { icon: Presentation, title: "Scénographie 8K", description: "Votre présentation devient un décor complet, pas seulement un PowerPoint." },
  { icon: Target, title: "Mémorisation élevée", description: "Un événement corporate devient une expérience sensorielle que les invités retiennent." },
  { icon: CheckCircle2, title: "Service maîtrisé", description: "Catering, technique, timing et accueil réunis dans un seul parcours premium." },
];

const eventFlow = [
  { time: "J-14", title: "Brief", text: "Objectifs, audience, budget, thème et contraintes techniques." },
  { time: "J-7", title: "Moodboard", text: "Choix des visuels LED, déroulé, menu et plan de salle." },
  { time: "J-1", title: "Test", text: "Validation contenu, son, affichage et timing avec l'équipe technique." },
  { time: "Jour J", title: "Show", text: "Accueil, production live, service, photos et reporting post-event." },
];

export default function CorporateBookings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-16">
      <PageHero
        eyebrow={<><Briefcase className="h-4 w-4" /> Corporate experiences</>}
        title={<><span className="text-gradient-brand">Événements</span> Corporate</>}
        subtitle="Transformez vos lancements, séminaires et team buildings en expériences immersives 8K avec une scénographie qui impressionne clients, équipes et partenaires."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { value: 52, suffix: "", label: "personnes phase 1" },
            { value: 55, suffix: "m²", label: "hub immersif" },
            { value: 8, suffix: "K", label: "impact visuel" },
          ].map((stat) => (
            <Card key={stat.label} className="neo-card rounded-[1.75rem] p-5 text-center">
              <p className="text-4xl font-black text-gradient-brand"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>
      </PageHero>

      <section className="section-shell">
        <Reveal className="section-heading">
          <span className="section-eyebrow"><Sparkles className="h-4 w-4" /> Why YUME</span>
          <h2 className="mb-4 text-4xl font-black md:text-6xl">Un événement qui ne ressemble pas aux autres.</h2>
          <p className="text-lg leading-8 text-muted-foreground">YUME combine lieu, technologie, contenu, service et restauration dans une seule solution corporate.</p>
        </Reveal>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {whyCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 90}>
                <Card className="magnetic-card h-full rounded-[2rem] border-white/10 bg-card/70 p-7 backdrop-blur-xl">
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary"><Icon className="h-7 w-7" /></div>
                  <h3 className="mb-3 text-2xl font-black">{item.title}</h3>
                  <p className="leading-7 text-muted-foreground">{item.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="section-heading">
          <span className="section-eyebrow"><CalendarCheck className="h-4 w-4" /> Offers</span>
          <h2 className="mb-4 text-4xl font-black md:text-6xl">Forfaits corporatifs</h2>
        </Reveal>
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-3">
          {corporatePackages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Reveal key={pkg.name} delay={index * 90}>
                <Card className="group relative h-full overflow-hidden rounded-[2rem] border-white/10 bg-card/70 p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-secondary/15" />
                  <div className="mb-6 flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary"><Icon className="h-7 w-7" /></div>
                    <Badge className="rounded-full bg-secondary/15 text-secondary">{pkg.tag}</Badge>
                  </div>
                  <h3 className="mb-3 text-3xl font-black">{pkg.name}</h3>
                  <p className="mb-6 min-h-[84px] leading-7 text-muted-foreground">{pkg.description}</p>

                  <div className="mb-6 space-y-3 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
                    <div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Capacité</span><span className="text-right font-black">{pkg.capacity}</span></div>
                    <div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Durée</span><span className="font-black">{pkg.duration}</span></div>
                    <div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Budget</span><span className="text-right font-black text-primary">{pkg.price}</span></div>
                  </div>

                  <ul className="mb-7 space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />{feature}</li>
                    ))}
                  </ul>

                  <Button className="premium-button w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/reservations")}>Réserver ce forfait</Button>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <span className="section-eyebrow"><Clock3 className="h-4 w-4" /> Production flow</span>
            <h2 className="mb-5 text-4xl font-black md:text-6xl">De l'idée au show.</h2>
            <p className="mb-8 text-lg leading-8 text-muted-foreground">La méthode corporate YUME sécurise le contenu, l'accueil, la technique et le rendu final pour que le client ait une expérience claire et professionnelle.</p>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/10 bg-white/5">
              <Link to="/gallery">Explorer les décors LED <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </Reveal>
          <div className="grid gap-4">
            {eventFlow.map((step, index) => (
              <Reveal key={step.time} delay={index * 80} direction="left">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition hover:-translate-x-1 hover:border-primary/40">
                  <div className="flex gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-lg font-black text-primary">{step.time}</div>
                    <div>
                      <h3 className="text-xl font-black">{step.title}</h3>
                      <p className="mt-1 leading-7 text-muted-foreground">{step.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="section-heading">
          <span className="section-eyebrow"><MapPin className="h-4 w-4" /> Expansion map</span>
          <h2 className="mb-4 text-4xl font-black md:text-6xl">Localisations & développement</h2>
        </Reveal>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {locations.map((location, index) => {
            const Icon = location.icon;
            return (
              <Reveal key={location.city} delay={index * 80}>
                <Card className="h-full rounded-[2rem] border-white/10 bg-card/70 p-7 backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="h-9 w-9 text-primary" />
                    <Badge variant="outline" className="rounded-full border-secondary/25 text-secondary">{location.status}</Badge>
                  </div>
                  <h3 className="text-3xl font-black">{location.city}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{location.address}</p>
                  <p className="mt-3 font-black text-primary">Capacité : {location.capacity}</p>
                  <div className="my-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${location.progress}%` }} /></div>
                  <div className="space-y-2">
                    {location.features.map((feature) => <p key={feature} className="text-sm text-muted-foreground"><CheckCircle2 className="mr-2 inline h-4 w-4 text-secondary" />{feature}</p>)}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell pb-28">
        <Reveal>
          <Card className="relative overflow-hidden rounded-[2rem] border-white/10 bg-card/75 p-8 text-center backdrop-blur-xl md:p-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--secondary)/0.18),transparent_45%)]" />
            <span className="section-eyebrow"><Sparkles className="h-4 w-4" /> Ready to impress</span>
            <h2 className="mb-5 text-4xl font-black md:text-6xl">Prêt à transformer votre événement ?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-muted-foreground">Réservez un créneau, choisissez une ambiance et laissez YUME créer une expérience corporate impossible à oublier.</p>
            <Button size="lg" className="premium-button bg-primary px-8 py-6 text-lg font-black text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/reservations")}>Planifier mon événement</Button>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
