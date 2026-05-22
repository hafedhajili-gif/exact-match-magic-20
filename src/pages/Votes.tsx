import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, CheckCircle2, Crown, Flame, Music, Radio, Sparkles, TrendingUp, Vote } from "lucide-react";
import { toast } from "sonner";

import tokyoNightImg from "@/assets/themes/tokyo-night.jpg";
import aquariumImg from "@/assets/themes/aquarium.jpg";
import sunsetCoastImg from "@/assets/themes/sunset-coast.jpg";

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  emoji: string;
  image: string;
  color: string;
  vibe: string;
}

const themes: ThemeOption[] = [
  { id: "tokyo_night", name: "Tokyo Night", description: "Cyberpunk futuriste avec néons violets, pluie digitale et énergie urbaine.", emoji: "🌃", image: tokyoNightImg, color: "Violet neon", vibe: "High energy" },
  { id: "deep_ocean", name: "Real Aquarium", description: "Océan immersif à 360°, requins, coraux lumineux et ambiance apaisante.", emoji: "🌊", image: aquariumImg, color: "Blue glow", vibe: "Calm" },
  { id: "saharian_sunset", name: "Sunset Coast", description: "Côte paradisiaque au coucher du soleil avec sakura, horizon rose et golden hour.", emoji: "🌅", image: sunsetCoastImg, color: "Sakura gold", vibe: "Chill" },
];

export default function Votes() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<Record<string, number>>({
    tokyo_night: 142,
    deep_ocean: 98,
    saharian_sunset: 67,
  });

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const getPercentage = (id: string) => (totalVotes === 0 ? 0 : Math.round((votes[id] / totalVotes) * 100));
  const topTheme = useMemo(() => themes.reduce((best, theme) => (votes[theme.id] > votes[best.id] ? theme : best), themes[0]), [votes]);

  const handleVote = (themeId: string) => {
    if (hasVoted) {
      toast.info("Vous avez déjà voté pour le thème de demain.");
      return;
    }
    setSelectedTheme(themeId);
    setHasVoted(true);
    setVotes((prev) => ({ ...prev, [themeId]: (prev[themeId] || 0) + 1 }));
    toast.success("Votre vote a été enregistré !");
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <PageHero
        eyebrow={<><Radio className="h-4 w-4" /> Live community vote</>}
        title={<><span className="text-gradient-brand">Votez</span> le prochain thème</>}
        subtitle="La communauté choisit l'ambiance de demain. Sélectionnez le mood que vous voulez vivre au prochain passage chez YUME."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="neo-card rounded-[1.75rem] p-5 text-center">
            <Vote className="mx-auto mb-3 h-7 w-7 text-primary" />
            <p className="text-4xl font-black text-gradient-brand"><AnimatedCounter value={totalVotes} /></p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">votes live</p>
          </Card>
          <Card className="neo-card rounded-[1.75rem] p-5 text-center">
            <Crown className="mx-auto mb-3 h-7 w-7 text-secondary" />
            <p className="text-2xl font-black">{topTheme.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">leader actuel</p>
          </Card>
          <Card className="neo-card rounded-[1.75rem] p-5 text-center">
            <Flame className="mx-auto mb-3 h-7 w-7 text-accent" />
            <p className="text-4xl font-black text-gradient-brand"><AnimatedCounter value={getPercentage(topTheme.id)} suffix="%" /></p>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted-foreground">momentum</p>
          </Card>
        </div>
      </PageHero>

      <section className="section-shell">
        {hasVoted && (
          <Reveal>
            <Card className="mx-auto mb-12 max-w-5xl rounded-[1.5rem] border-secondary/40 bg-secondary/10 p-5">
              <p className="flex items-center gap-3 font-bold text-secondary"><CheckCircle2 className="h-6 w-6" /> Merci pour votre vote ! Revenez demain pour voir le résultat final dans le lounge.</p>
            </Card>
          </Reveal>
        )}

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-7 md:grid-cols-3">
            {themes.map((theme, index) => (
              <Reveal key={theme.id} delay={index * 90}>
                <Card className={`group h-full overflow-hidden rounded-[2rem] border-white/10 bg-card/70 backdrop-blur-xl transition hover:-translate-y-2 hover:border-primary/50 ${selectedTheme === theme.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}>
                  <button className="w-full text-left" type="button" onClick={() => handleVote(theme.id)}>
                    <div className="relative h-72 overflow-hidden">
                      <img src={theme.image} alt={theme.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/25 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-background/65 px-3 py-1 text-sm font-black backdrop-blur-xl">{theme.emoji} {theme.vibe}</div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-3xl font-black">{theme.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-white/80">{theme.description}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <Badge className="rounded-full bg-primary/15 text-primary">{theme.color}</Badge>
                        <span className="text-sm font-bold text-secondary">{getPercentage(theme.id)}%</span>
                      </div>
                      <div className="mb-5 h-3 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-700" style={{ width: `${getPercentage(theme.id)}%` }} />
                      </div>
                      <Button disabled={hasVoted} className={`premium-button w-full ${selectedTheme === theme.id ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                        {selectedTheme === theme.id ? "✓ Voté" : "Voter pour ce thème"}
                      </Button>
                    </div>
                  </button>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal direction="left">
            <aside className="sticky top-28 space-y-6">
              <Card className="holo-border overflow-hidden rounded-[2rem] border-0 p-[1px]">
                <div className="rounded-[2rem] bg-card/95 p-6 backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    <TrendingUp className="h-7 w-7 text-secondary" />
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">Real-time</p>
                      <h2 className="text-2xl font-black">Résultats</h2>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {themes.map((theme) => (
                      <div key={theme.id}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="font-bold">{theme.emoji} {theme.name}</span>
                          <span className="font-black text-primary">{getPercentage(theme.id)}%</span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700" style={{ width: `${getPercentage(theme.id)}%` }} />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{votes[theme.id]} votes</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2rem] border-white/10 bg-card/70 p-6 backdrop-blur-xl">
                <BarChart3 className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-3 text-xl font-black">Comment le vote influence YUME</h3>
                <p className="text-sm leading-7 text-muted-foreground">Les résultats aident l'équipe à choisir les thèmes, préparer les contenus LED, ajuster les playlists et créer des soirées plus proches de la communauté.</p>
              </Card>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-28">
        <Reveal>
          <Card className="mx-auto max-w-7xl rounded-[2rem] border-white/10 bg-card/70 p-8 backdrop-blur-xl md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <span className="section-eyebrow"><Music className="h-4 w-4" /> Tomorrow's mood</span>
                <h2 className="mb-4 text-4xl font-black">Le thème gagnant devient une vraie soirée.</h2>
                <p className="leading-8 text-muted-foreground">YUME peut transformer un simple vote en programmation : visuels LED, ambiance sonore, produits signature et contenus social media.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {["LED visuals", "Playlist", "Menu pairing"].map((item, index) => (
                  <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 text-center">
                    <p className="text-3xl font-black text-gradient-brand">0{index + 1}</p>
                    <p className="mt-2 font-bold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
