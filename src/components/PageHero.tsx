import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export default function PageHero({ eyebrow, title, subtitle, children, className, align = "center" }: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className={cn("relative overflow-hidden border-b border-white/10 px-4 py-20 pt-32", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,hsl(var(--primary)/0.28),transparent_30%),radial-gradient(circle_at_84%_8%,hsl(var(--secondary)/0.18),transparent_26%),linear-gradient(180deg,hsl(var(--led-dark)/0.65),transparent)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className={cn("mx-auto max-w-7xl", centered && "text-center")}>
        <Reveal className={cn(centered && "mx-auto max-w-4xl")}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h1 className="hero-title mb-5 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">{title}</h1>
          <p className={cn("text-xl leading-8 text-muted-foreground md:text-2xl", centered ? "mx-auto max-w-3xl" : "max-w-3xl")}>{subtitle}</p>
        </Reveal>
        {children && <Reveal delay={130}>{children}</Reveal>}
      </div>
    </section>
  );
}
