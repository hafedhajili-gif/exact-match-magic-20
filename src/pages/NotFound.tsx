import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Compass, Home, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background px-4 pt-32">
      <Reveal className="mx-auto max-w-3xl">
        <Card className="holo-border rounded-[2rem] border-0 p-[1px]">
          <div className="relative overflow-hidden rounded-[2rem] bg-card/95 p-8 text-center backdrop-blur-xl md:p-14">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.22),transparent_45%)]" />
            <div className="mx-auto mb-7 grid h-24 w-24 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary shadow-2xl shadow-primary/10">
              <Compass className="h-12 w-12 animate-float-medium" />
            </div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-secondary">
              <Sparkles className="h-4 w-4" /> Lost in the LED dream
            </p>
            <h1 className="hero-title mb-4 text-7xl font-black text-gradient-brand md:text-9xl">404</h1>
            <p className="mx-auto mb-8 max-w-xl text-xl leading-8 text-muted-foreground">
              Cette page n'existe pas encore dans l'univers YUME. Revenez à l'accueil pour retrouver le lounge immersif.
            </p>
            <Button asChild size="lg" className="premium-button bg-primary px-8 py-6 text-lg font-black text-primary-foreground hover:bg-primary/90">
              <Link to="/"><Home className="mr-2 h-5 w-5" /> Retour à l'accueil</Link>
            </Button>
          </div>
        </Card>
      </Reveal>
    </div>
  );
};

export default NotFound;
