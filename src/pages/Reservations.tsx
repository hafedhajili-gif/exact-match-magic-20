import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCircle, Clock3, Mail, MapPin, Minus, PartyPopper, Plus, Sparkles, Ticket, UserRound } from "lucide-react";
import { toast } from "sonner";

const today = new Date().toISOString().split("T")[0];

const tableTypes = [
  { id: "standard", label: "Table Standard", description: "Vue partielle du mur LED, parfaite pour découvrir YUME.", price: 0, priceLabel: "Inclus", mood: "Discovery" },
  { id: "premium_led", label: "Table Premium LED", description: "Meilleure immersion face au mur LED 8K et angles photo premium.", price: 15, priceLabel: "+15 DT / personne", mood: "Best view" },
  { id: "private_karaoke", label: "Suite Karaoké Privée", description: "Espace privé avec écran personnel. Disponible en phase 2.", price: 50, priceLabel: "+50 DT / heure", mood: "Phase 2", disabled: true },
];

const timeSlots = ["11:30", "13:00", "15:30", "18:00", "20:30", "22:00"];
const themeMoods = ["Tokyo Neon", "Sakura Sunset", "Real Aquarium", "Zen Forest", "Surprise me"];

export default function Reservations() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    reservationDate: today,
    reservationTime: "20:30",
    numberOfGuests: 2,
    tableType: "standard",
    themeMood: "Tokyo Neon",
    specialRequests: "",
  });

  const selectedTable = tableTypes.find((table) => table.id === formData.tableType) ?? tableTypes[0];
  const estimatedPremium = selectedTable.id === "premium_led" ? selectedTable.price * formData.numberOfGuests : selectedTable.price;

  const bookingScore = useMemo(() => {
    let score = 40;
    if (formData.guestName) score += 15;
    if (formData.guestEmail) score += 15;
    if (formData.guestPhone) score += 10;
    if (formData.tableType === "premium_led") score += 10;
    if (formData.specialRequests) score += 10;
    return Math.min(score, 100);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName || !formData.guestEmail) {
      toast.error("Veuillez remplir le nom et l'email pour confirmer la réservation.");
      return;
    }
    setSubmitted(true);
    toast.success("Réservation confirmée !");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background px-4 pt-32">
        <Reveal className="mx-auto max-w-2xl">
          <Card className="holo-border rounded-[2rem] border-0 p-[1px]">
            <div className="rounded-[2rem] bg-card/95 p-8 text-center backdrop-blur-xl md:p-12">
              <div className="mx-auto mb-7 grid h-24 w-24 place-items-center rounded-full bg-secondary/15 text-secondary shadow-2xl shadow-secondary/10">
                <CheckCircle className="h-14 w-14 animate-pulse-glow rounded-full" />
              </div>
              <Badge className="mb-4 rounded-full bg-secondary text-secondary-foreground">Booking locked</Badge>
              <h1 className="mb-4 text-4xl font-black md:text-5xl">Réservation confirmée !</h1>
              <p className="mb-8 text-muted-foreground">Un email de confirmation a été envoyé à {formData.guestEmail}.</p>

              <div className="mb-8 grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 text-left sm:grid-cols-2">
                <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</p><p className="font-black">{new Date(formData.reservationDate).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p></div>
                <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Heure</p><p className="font-black">{formData.reservationTime}</p></div>
                <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Invités</p><p className="font-black">{formData.numberOfGuests} personne{formData.numberOfGuests > 1 ? "s" : ""}</p></div>
                <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Mood</p><p className="font-black">{formData.themeMood}</p></div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => navigate("/")} className="premium-button flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Retour à l'accueil</Button>
                <Button asChild variant="outline" className="flex-1 rounded-full border-white/10 bg-white/5">
                  <Link to="/votes">Voter pour demain</Link>
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <PageHero
        eyebrow={<><Calendar className="h-4 w-4" /> Smart reservation</>}
        title={<><span className="text-gradient-brand">Réserver</span> votre moment</>}
        subtitle="Choisissez votre date, votre table, votre mood LED et laissez YUME préparer l'expérience avant même votre arrivée."
        align="left"
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: Clock3, title: "Créneaux fluides", text: "Lunch, afternoon, night mood." },
            { icon: Ticket, title: "Table premium", text: "Vue LED complète disponible." },
            { icon: Sparkles, title: "Mood choisi", text: "Tokyo, Sakura, Aquarium..." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="neo-card rounded-[1.5rem] p-5">
                <Icon className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-black">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </Card>
            );
          })}
        </div>
      </PageHero>

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_380px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Reveal>
            <Card className="neo-card rounded-[2rem] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary"><Calendar className="h-6 w-6" /></div>
                <div>
                  <Badge variant="outline" className="rounded-full border-primary/25 text-primary">Step 01</Badge>
                  <h2 className="mt-1 text-2xl font-black">Date, heure & invités</h2>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="date" className="mb-2 block">Date de réservation</Label>
                  <Input id="date" type="date" value={formData.reservationDate} onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })} min={today} className="h-12 rounded-2xl border-white/10 bg-white/5" required />
                </div>
                <div>
                  <Label className="mb-2 block">Heure</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button key={slot} type="button" onClick={() => setFormData({ ...formData, reservationTime: slot })} className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${formData.reservationTime === slot ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-white/10 bg-white/5 text-muted-foreground hover:border-primary/40"}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2 block">Nombre de personnes</Label>
                  <div className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-3">
                    <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => setFormData({ ...formData, numberOfGuests: Math.max(1, formData.numberOfGuests - 1) })}><Minus className="h-4 w-4" /></Button>
                    <div className="flex-1 text-center">
                      <p className="text-4xl font-black text-gradient-brand"><AnimatedCounter value={formData.numberOfGuests} /></p>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">guests</p>
                    </div>
                    <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => setFormData({ ...formData, numberOfGuests: Math.min(12, formData.numberOfGuests + 1) })}><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="neo-card rounded-[2rem] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary/15 text-secondary"><MapPin className="h-6 w-6" /></div>
                <div>
                  <Badge variant="outline" className="rounded-full border-secondary/25 text-secondary">Step 02</Badge>
                  <h2 className="mt-1 text-2xl font-black">Table & mood LED</h2>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {tableTypes.map((table) => (
                  <button key={table.id} type="button" onClick={() => !table.disabled && setFormData({ ...formData, tableType: table.id })} disabled={table.disabled} className={`group rounded-[1.5rem] border p-5 text-left transition ${formData.tableType === table.id ? "border-primary bg-primary/10 shadow-xl shadow-primary/10" : "border-white/10 bg-white/[0.045] hover:-translate-y-1 hover:border-primary/40"} ${table.disabled ? "cursor-not-allowed opacity-45" : ""}`}>
                    <Badge className="mb-4 rounded-full bg-white/10 text-foreground">{table.mood}</Badge>
                    <h3 className="text-lg font-black">{table.label}</h3>
                    <p className="my-3 min-h-[66px] text-sm leading-6 text-muted-foreground">{table.description}</p>
                    <p className="font-black text-primary">{table.priceLabel}</p>
                  </button>
                ))}
              </div>

              <div className="mt-7">
                <Label className="mb-2 block">Mood préféré</Label>
                <div className="flex flex-wrap gap-2">
                  {themeMoods.map((mood) => (
                    <button key={mood} type="button" onClick={() => setFormData({ ...formData, themeMood: mood })} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${formData.themeMood === mood ? "border-secondary bg-secondary text-secondary-foreground" : "border-white/10 bg-white/5 text-muted-foreground hover:border-secondary/40"}`}>
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="neo-card rounded-[2rem] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent"><UserRound className="h-6 w-6" /></div>
                <div>
                  <Badge variant="outline" className="rounded-full border-accent/25 text-accent">Step 03</Badge>
                  <h2 className="mt-1 text-2xl font-black">Vos informations</h2>
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="mb-2 block">Nom *</Label>
                  <Input id="name" value={formData.guestName} onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="Votre nom" required />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2 block">Email *</Label>
                  <Input id="email" type="email" value={formData.guestEmail} onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })} className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="name@email.com" required />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block">Téléphone</Label>
                  <Input id="phone" type="tel" value={formData.guestPhone} onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })} className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="+216 ..." />
                </div>
                <div>
                  <Label htmlFor="requests" className="mb-2 block">Demandes spéciales</Label>
                  <Textarea id="requests" value={formData.specialRequests} onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })} className="min-h-12 rounded-2xl border-white/10 bg-white/5" placeholder="Anniversaire, allergie, surprise..." />
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Button type="submit" size="lg" className="premium-button w-full bg-primary py-7 text-lg font-black text-primary-foreground hover:bg-primary/90">
              Confirmer la réservation <PartyPopper className="ml-2 h-5 w-5" />
            </Button>
          </Reveal>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal direction="left">
            <Card className="holo-border rounded-[2rem] border-0 p-[1px]">
              <div className="rounded-[2rem] bg-card/95 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-secondary">Live summary</p>
                    <h3 className="text-2xl font-black">Votre expérience</h3>
                  </div>
                  <Mail className="h-8 w-8 text-primary" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Date</p><p className="font-black">{formData.reservationDate} · {formData.reservationTime}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Table</p><p className="font-black">{selectedTable.label}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Mood</p><p className="font-black">{formData.themeMood}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Premium estimate</p><p className="text-2xl font-black text-gradient-brand">{estimatedPremium === 0 ? "Inclus" : `${estimatedPremium} DT`}</p></div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm"><span className="text-muted-foreground">Booking readiness</span><span className="font-black text-secondary">{bookingScore}%</span></div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-700" style={{ width: `${bookingScore}%` }} />
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </aside>
      </main>
    </div>
  );
}
