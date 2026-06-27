import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const hours = [
  { day: "Lundi – Jeudi", time: "10:00 – 00:00" },
  { day: "Vendredi – Samedi", time: "10:00 – 02:00" },
  { day: "Dimanche", time: "11:00 – 00:00" },
];

export default function Visit() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-24 text-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Nous trouver</div>
        <h1 className="mt-3 font-display text-5xl font-black leading-tight sm:text-6xl">
          Sousse, Tunisie. <span className="text-gradient-brand">Bienvenue chez YUME.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Notre flagship ouvre en juillet 2026 au cœur de Sousse. Voici tout ce qu'il faut pour préparer votre visite.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <iframe
              title="YUME Sousse — carte"
              src="https://www.google.com/maps?q=Sousse,+Tunisie&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <MapPin className="h-5 w-5" /> Adresse
              </div>
              <p className="mt-3 text-white/85">YUME Café & Lounge<br/>Sousse, Tunisie</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <Clock className="h-5 w-5" /> Horaires
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/85">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span className="text-white/70">{h.day}</span>
                    <span className="font-semibold">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3 text-sm font-bold text-primary">
                <Phone className="h-5 w-5" /> Contact
              </div>
              <a href="tel:+21696506693" className="mt-3 block text-white/90 hover:text-primary">+216 96 506 693</a>
              <a href="mailto:hello@yume.tn" className="mt-1 flex items-center gap-2 text-white/90 hover:text-primary">
                <Mail className="h-4 w-4" /> hello@yume.tn
              </a>
            </div>
            <Link to="/reservations" className="block rounded-3xl bg-primary px-6 py-4 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
              Réserver ma table
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}