import { useEffect, useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Film, GalleryHorizontal, Maximize2, Play, ScanLine, Sparkles } from "lucide-react";

import aquariumImg from "@/assets/themes/aquarium.jpg";
import kyotoImg from "@/assets/themes/kyoto-temple.jpg";
import sakuraFujiImg from "@/assets/themes/sakura-fuji.jpg";
import sunsetCoastImg from "@/assets/themes/sunset-coast.jpg";
import toriiImg from "@/assets/themes/torii-gates.jpg";
import tokyoNightImg from "@/assets/themes/tokyo-night.jpg";
import jungleImg from "@/assets/themes/jungle.jpg";
import galaxyImg from "@/assets/themes/galaxy.jpg";
import yumeAquariumImg from "@/assets/themes/yume-aquarium.jpg";
import yumeZenForestImg from "@/assets/themes/yume-zen-forest.jpg";
import yumeSeoulKpopImg from "@/assets/themes/yume-seoul-kpop.jpg";
import yumeSakuraSunsetImg from "@/assets/themes/yume-sakura-sunset.jpg";
import yumeTokyoNeonImg from "@/assets/themes/yume-tokyo-neon.jpg";
import yumeSakuraCoastImg from "@/assets/themes/yume-sakura-coast.jpg";

const themes = [
  { name: "YUME Aquarium", description: "Méduses bioluminescentes et récifs coralliens en 360°", details: "Plongée immersive dans un océan profond avec méduses translucides, coraux fluorescents et lumière sous-marine.", image: yumeAquariumImg, category: "Nature", intensity: 72 },
  { name: "Zen Forest Sanctuary", description: "Forêt de bambous mystique sous un ciel étoilé", details: "Bambous géants, lanternes japonaises, koïs lumineux et brume nocturne. Une retraite méditative premium.", image: yumeZenForestImg, category: "Zen", intensity: 58 },
  { name: "Seoul K-Pop Night", description: "Néons de Séoul, hangul et énergie K-pop", details: "Murs LED saturés de violet et magenta, panneaux coréens, karaoké numérique et ambiance Gen Z.", image: yumeSeoulKpopImg, category: "Urbain", intensity: 93 },
  { name: "Sakura Sunset Lounge", description: "Cerisiers en fleurs au coucher de soleil sur l'océan", details: "Pétales roses, lanternes suspendues et horizon orangé. Un thème social-first et doux.", image: yumeSakuraSunsetImg, category: "Zen", intensity: 76 },
  { name: "Tokyo Neon Rain", description: "Tokyo cyberpunk sous la pluie, néons et katakana", details: "Reflets mouillés, enseignes カラオケ et gratte-ciels saturés de néons rouges et bleus.", image: yumeTokyoNeonImg, category: "Urbain", intensity: 96 },
  { name: "Sakura Coast Paradise", description: "Côte japonaise, sakura et coucher de soleil panoramique", details: "Falaises dorées, cerisiers en floraison et océan calme. L'invitation à entrer dans un autre monde.", image: yumeSakuraCoastImg, category: "Nature", intensity: 70 },
  { name: "Real Aquarium", description: "Plongez dans un océan immersif à 360°", details: "Requins, poissons tropicaux et coraux projetés sur les 4 murs LED en 8K.", image: aquariumImg, category: "Nature", intensity: 66 },
  { name: "Tokyo Night", description: "Néons cyberpunk et énergie urbaine de Tokyo", details: "Rues de Shinjuku et Shibuya projetées en 360°, tables LED lumineuses et ambiance nocturne.", image: tokyoNightImg, category: "Urbain", intensity: 90 },
  { name: "Sakura & Mont Fuji", description: "Cerisiers en fleurs avec vue sur le Mont Fuji", details: "Paysage japonais iconique avec lac, cerisiers roses et atmosphère romantique.", image: sakuraFujiImg, category: "Zen", intensity: 62 },
  { name: "Kyoto Temple", description: "Temples traditionnels au coucher du soleil", details: "Portes Torii, pagodes et lanternes au crépuscule. Ambiance culturelle authentique.", image: kyotoImg, category: "Culture", intensity: 54 },
  { name: "Sunset Coast", description: "Côte paradisiaque au coucher du soleil", details: "Falaises, océan et ciel violet-rose. Expérience immersive de sérénité totale.", image: sunsetCoastImg, category: "Nature", intensity: 64 },
  { name: "Torii Gates", description: "Forêt de portes Torii du sanctuaire Fushimi Inari", details: "Tunnel infini de portes rouges avec ambiance mystique et contemplative.", image: toriiImg, category: "Culture", intensity: 57 },
  { name: "Jungle Tropicale", description: "Forêt luxuriante avec faune exotique", details: "Végétation dense, perroquets colorés et lumière verte naturelle avec sons de nature.", image: jungleImg, category: "Nature", intensity: 74 },
  { name: "Galaxy", description: "Voyage interstellaire dans l'espace profond", details: "Nébuleuses, planètes et étoiles projetées en 8K avec ambiance cosmique.", image: galaxyImg, category: "Sci-Fi", intensity: 88 },
];

const categories = ["All", "Nature", "Zen", "Urbain", "Culture", "Sci-Fi"];

export default function Gallery() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [category, setCategory] = useState("All");
  const [autoplay, setAutoplay] = useState(true);

  const filteredThemes = useMemo(() => (category === "All" ? themes : themes.filter((theme) => theme.category === category)), [category]);
  const theme = filteredThemes[currentTheme] ?? filteredThemes[0] ?? themes[0];

  useEffect(() => {
    setCurrentTheme(0);
  }, [category]);

  useEffect(() => {
    if (!autoplay || filteredThemes.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % filteredThemes.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [autoplay, filteredThemes.length]);

  const goPrevious = () => setCurrentTheme((p) => (p - 1 + filteredThemes.length) % filteredThemes.length);
  const goNext = () => setCurrentTheme((p) => (p + 1) % filteredThemes.length);

  return (
    <div className="min-h-screen bg-background pt-16">
      <PageHero
        eyebrow={<><GalleryHorizontal className="h-4 w-4" /> LED theme library</>}
        title={<><span className="text-gradient-brand">Galerie</span> immersive</>}
        subtitle="Explorez les univers LED qui transforment YUME chaque jour : nature, Tokyo neon, culture japonaise, K-pop, galaxy et sanctuary moods."
      >
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((item) => (
            <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${category === item ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
              {item}
            </button>
          ))}
        </div>
      </PageHero>

      <main className="mx-auto max-w-7xl px-4 py-14">
        <Reveal>
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.55fr_0.9fr]">
            <Card className="holo-border overflow-hidden rounded-[2rem] border-0 p-[1px]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-black scanlines">
                <img src={theme.image} alt={theme.name} className="h-full w-full object-cover transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-transparent" />
                <div className="absolute left-5 top-5 flex gap-2">
                  <Badge className="rounded-full bg-background/70 text-foreground backdrop-blur-xl"><Maximize2 className="mr-2 h-4 w-4 text-secondary" /> 360° preview</Badge>
                  <Badge className="rounded-full bg-primary/80 text-primary-foreground">{theme.category}</Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-4xl font-black md:text-6xl">{theme.name}</h2>
                  <p className="mt-3 max-w-2xl text-lg leading-8 text-white/80">{theme.description}</p>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="neo-card flex-1 rounded-[2rem] p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="section-eyebrow mb-0"><Film className="h-4 w-4" /> Director mode</span>
                  <button onClick={() => setAutoplay(!autoplay)} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-muted-foreground transition hover:text-foreground">
                    {autoplay ? "Pause" : "Play"}
                  </button>
                </div>
                <h3 className="mb-4 text-3xl font-black">{theme.name}</h3>
                <p className="mb-6 leading-8 text-muted-foreground">{theme.details}</p>
                <div>
                  <div className="mb-2 flex justify-between text-sm"><span className="text-muted-foreground">Visual intensity</span><span className="font-black text-secondary">{theme.intensity}%</span></div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-700" style={{ width: `${theme.intensity}%` }} /></div>
                </div>
              </Card>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={goPrevious} variant="outline" className="h-14 rounded-full border-white/10 bg-white/5"><ChevronLeft className="mr-2 h-5 w-5" /> Previous</Button>
                <Button onClick={goNext} className="premium-button h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">Next <ChevronRight className="ml-2 h-5 w-5" /></Button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mb-16 flex items-center justify-center gap-3">
          {filteredThemes.map((_, index) => (
            <button key={index} onClick={() => setCurrentTheme(index)} className={`h-3 rounded-full transition-all ${index === currentTheme ? "w-10 bg-primary" : "w-3 bg-white/20 hover:bg-white/40"}`} aria-label={`Select theme ${index + 1}`} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredThemes.map((t, index) => (
            <Reveal key={t.name} delay={index * 40}>
              <Card className={`magnetic-card h-full cursor-pointer overflow-hidden rounded-[1.75rem] border-white/10 bg-card/70 backdrop-blur-xl transition-all hover:border-primary ${index === currentTheme ? "border-primary ring-2 ring-primary/70" : ""}`} onClick={() => setCurrentTheme(index)}>
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img src={t.image} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Play className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-primary p-2 text-primary-foreground" />
                </div>
                <div className="p-4">
                  <Badge className="mb-2 rounded-full bg-primary/20 text-primary">{t.category}</Badge>
                  <h3 className="font-black">{t.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{t.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Card className="neo-card mt-16 rounded-[2rem] p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <span className="section-eyebrow"><ScanLine className="h-4 w-4" /> ISEMC Specs</span>
                <h3 className="mb-4 text-3xl font-black md:text-5xl">Designed for camera-ready immersion.</h3>
                <p className="leading-8 text-muted-foreground">Fine pitch, high refresh, LED surfaces and content design make each table a potential creator angle.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Pixel Pitch 1.86mm", "7.04m × 3.84m", "3840Hz refresh", "75k–100k hours"].map((spec) => (
                  <div key={spec} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 font-bold text-secondary">{spec}</div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </main>
    </div>
  );
}
