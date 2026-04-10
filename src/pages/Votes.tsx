import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, TrendingUp } from "lucide-react";
import { toast } from "sonner";

import tokyoNightImg from "@/assets/themes/tokyo-night.jpg";
import aquariumImg from "@/assets/themes/aquarium.png";
import sunsetCoastImg from "@/assets/themes/sunset-coast.png";

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  emoji: string;
  image: string;
}

const themes: ThemeOption[] = [
  { id: "tokyo_night", name: "Tokyo Night", description: "Cyberpunk futuriste avec néons violets et énergie urbaine", emoji: "🌃", image: tokyoNightImg },
  { id: "deep_ocean", name: "Real Aquarium", description: "Plongez dans un océan immersif à 360° avec requins et coraux", emoji: "🌊", image: aquariumImg },
  { id: "saharian_sunset", name: "Sunset Coast", description: "Côte paradisiaque au coucher du soleil avec cerisiers en fleurs", emoji: "🏜️", image: sunsetCoastImg },
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
  const getPercentage = (id: string) => totalVotes === 0 ? 0 : Math.round((votes[id] / totalVotes) * 100);

  const handleVote = (themeId: string) => {
    if (hasVoted) return;
    setSelectedTheme(themeId);
    setHasVoted(true);
    setVotes((prev) => ({ ...prev, [themeId]: (prev[themeId] || 0) + 1 }));
    toast.success("Votre vote a été enregistré !");
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="bg-led-dark py-16 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <Music className="w-10 h-10 text-primary" /> Votez pour le Thème
          </h1>
          <p className="text-xl text-muted-foreground">
            Choisissez l'ambiance que vous voulez voir demain au Chill & Vibes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {hasVoted && (
          <Card className="bg-secondary/10 border border-secondary/50 p-6 mb-12">
            <p className="text-secondary font-semibold flex items-center gap-2">
              <span className="text-2xl">✓</span> Merci pour votre vote ! Revenez demain pour voir le résultat.
            </p>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {themes.map((theme) => (
            <div key={theme.id} className="group">
              <Card className={`bg-card border-border overflow-hidden mb-4 cursor-pointer transition-all hover:border-primary/50 ${selectedTheme === theme.id ? "ring-2 ring-primary" : ""}`} onClick={() => handleVote(theme.id)}>
                <div className="relative h-64 overflow-hidden">
                  <img src={theme.image} alt={theme.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                  <div className="absolute top-4 right-4 text-5xl">{theme.emoji}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{theme.name}</h3>
                  <p className="text-muted-foreground mb-6">{theme.description}</p>
                  <Button disabled={hasVoted} className={`w-full ${selectedTheme === theme.id ? "bg-primary hover:bg-primary/90" : "bg-card border border-border hover:border-primary/50"}`}>
                    {selectedTheme === theme.id ? "✓ Voté" : "Voter"}
                  </Button>
                </div>
              </Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{votes[theme.id]}</div>
                <div className="w-full bg-border rounded-full h-2 mb-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${getPercentage(theme.id)}%` }} />
                </div>
                <div className="text-sm text-muted-foreground">{getPercentage(theme.id)}%</div>
              </div>
            </div>
          ))}
        </div>

        <Card className="bg-card border-border p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-secondary" /> Résultats en Temps Réel
          </h2>
          <div className="space-y-6">
            {themes.map((theme) => (
              <div key={theme.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{theme.name}</span>
                  <span className="text-primary font-bold">{getPercentage(theme.id)}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500" style={{ width: `${getPercentage(theme.id)}%` }} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{votes[theme.id]} votes</div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-background rounded-lg border border-border">
            <p className="text-center text-muted-foreground">
              <span className="font-semibold text-foreground">{totalVotes}</span> votes au total
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
