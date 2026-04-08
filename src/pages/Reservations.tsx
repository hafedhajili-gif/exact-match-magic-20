import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const tableTypes = [
  { id: "standard", label: "Table Standard", description: "Vue partielle du mur LED", price: "Gratuit" },
  { id: "premium_led", label: "Table Premium LED", description: "Vue complète du mur LED 80m²", price: "+15 DT/personne" },
  { id: "private_karaoke", label: "Suite Karaoke Privée", description: "Espace privé avec écran LED personnel (Phase 2)", price: "+50 DT/heure", disabled: true },
];

export default function Reservations() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    reservationDate: new Date().toISOString().split("T")[0],
    numberOfGuests: 2,
    tableType: "standard",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName || !formData.guestEmail) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setSubmitted(true);
    toast.success("Réservation confirmée !");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
        <Card className="bg-card border-border p-12 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Réservation Confirmée !</h1>
          <p className="text-muted-foreground mb-6">Un email de confirmation a été envoyé à {formData.guestEmail}.</p>
          <p className="text-lg font-semibold mb-2">
            {new Date(formData.reservationDate).toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-muted-foreground mb-6">{formData.numberOfGuests} personne{formData.numberOfGuests > 1 ? "s" : ""}</p>
          <Button onClick={() => navigate("/")} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Retour à l'accueil</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="bg-led-dark py-16 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Réserver une Table</h1>
          <p className="text-xl text-muted-foreground">Choisissez votre date, votre table et vivez l'expérience Chill & Vibes.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit}>
          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" /> Quand et pour combien ?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="mb-2 block">Date de réservation</Label>
                <Input id="date" type="date" value={formData.reservationDate} onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })} min={new Date().toISOString().split("T")[0]} className="bg-input border-border" required />
              </div>
              <div>
                <Label className="mb-2 block">Nombre de personnes</Label>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={() => setFormData({ ...formData, numberOfGuests: Math.max(1, formData.numberOfGuests - 1) })}>-</Button>
                  <span className="flex-1 text-center text-lg font-semibold">{formData.numberOfGuests}</span>
                  <Button type="button" variant="outline" onClick={() => setFormData({ ...formData, numberOfGuests: Math.min(12, formData.numberOfGuests + 1) })}>+</Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-secondary" /> Choisir votre table
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {tableTypes.map((table) => (
                <button key={table.id} type="button" onClick={() => !table.disabled && setFormData({ ...formData, tableType: table.id })} disabled={table.disabled} className={`p-4 rounded-lg border-2 transition-all text-left ${formData.tableType === table.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"} ${table.disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
                  <h3 className="font-bold mb-1">{table.label}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{table.description}</p>
                  <p className="text-sm font-semibold text-primary">{table.price}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Vos Informations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="mb-2 block">Nom *</Label>
                <Input id="name" value={formData.guestName} onChange={(e) => setFormData({ ...formData, guestName: e.target.value })} className="bg-input border-border" required />
              </div>
              <div>
                <Label htmlFor="email" className="mb-2 block">Email *</Label>
                <Input id="email" type="email" value={formData.guestEmail} onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })} className="bg-input border-border" required />
              </div>
              <div>
                <Label htmlFor="phone" className="mb-2 block">Téléphone</Label>
                <Input id="phone" type="tel" value={formData.guestPhone} onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })} className="bg-input border-border" />
              </div>
              <div>
                <Label htmlFor="requests" className="mb-2 block">Demandes spéciales</Label>
                <Input id="requests" value={formData.specialRequests} onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })} className="bg-input border-border" placeholder="Anniversaire, allergie..." />
              </div>
            </div>
          </Card>

          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6">
            Confirmer la Réservation
          </Button>
        </form>
      </div>
    </div>
  );
}
