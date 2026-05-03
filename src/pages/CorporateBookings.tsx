import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Users, Zap, MapPin } from "lucide-react";

const corporatePackages = [
  {
    name: "Product Launch", description: "Lancez votre produit dans un environnement immersif unique", capacity: "50-100 personnes", duration: "3-4 heures", price: "À partir de 2,500 DT",
    features: ["Murs LED 360° personnalisables", "Son 3D immersif", "Catering premium (Sushi, Matcha)", "Espace privé dédié", "Équipe technique dédiée"], icon: Zap,
  },
  {
    name: "Team Building", description: "Renforcez la cohésion d'équipe dans une ambiance innovante", capacity: "20-80 personnes", duration: "2-3 heures", price: "À partir de 1,500 DT",
    features: ["Thème LED personnalisé", "Activités interactives", "Menu team-building", "Espace flexible", "Animations incluses"], icon: Users,
  },
  {
    name: "Corporate Event", description: "Conférences, séminaires et réunions d'affaires", capacity: "100-200 personnes", duration: "Flexible", price: "À partir de 3,000 DT",
    features: ["Système audiovisuel professionnel", "Espace de présentation", "Catering complet", "Support technique", "Parking VIP"], icon: Briefcase,
  },
];

const locations = [
  { city: "Sousse", status: "Actuellement Ouvert", address: "Centre-ville de Sousse", capacity: "360 personnes", features: ["Murs LED 80m²", "Cold Kitchen", "Parking"], icon: "🏢" },
  { city: "Tunis", status: "Expansion 2028", address: "À définir", capacity: "400 personnes", features: ["Même concept", "Localisation premium"], icon: "🌆" },
  { city: "Hammamet", status: "Expansion 2029", address: "À définir", capacity: "350 personnes", features: ["Vue mer", "Ambiance côtière"], icon: "🏖️" },
];

export default function CorporateBookings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="bg-led-dark py-16 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Corporate Bookings</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transformez vos événements d'affaires en expériences inoubliables avec nos murs LED 360°
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Why */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Pourquoi SORA pour vos événements?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🎨", title: "Environnement Unique", description: "Trois ambiances LED différentes pour créer l'impression parfaite" },
              { icon: "🎯", title: "Expérience Mémorable", description: "Vos clients se souviendront de cet événement pour les années à venir" },
              { icon: "🍽️", title: "Gastronomie Premium", description: "Menu sushi halal-certifié et matcha premium pour impressionner" },
            ].map((item, index) => (
              <Card key={index} className="bg-card border-border p-8">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Nos Forfaits Corporatifs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {corporatePackages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <Card key={index} className="bg-card border-border p-8 hover:border-primary transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{pkg.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Capacité:</span><span className="font-semibold">{pkg.capacity}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Durée:</span><span className="font-semibold">{pkg.duration}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Prix:</span><span className="font-semibold text-primary">{pkg.price}</span></div>
                  </div>
                  <div className="mb-6">
                    <p className="text-sm font-semibold mb-3">Inclus:</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary" />{feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => navigate("/reservations")}>
                    Réserver Maintenant
                  </Button>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Locations */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Nos Localisations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Card key={index} className="bg-card border-border p-8">
                <div className="text-5xl mb-4">{location.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{location.city}</h3>
                <p className="text-sm text-primary font-semibold mb-4">{location.status}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-1" /><p className="text-sm text-muted-foreground">{location.address}</p></div>
                  <p className="text-sm text-muted-foreground">Capacité: <span className="font-semibold">{location.capacity}</span></p>
                </div>
                <div className="space-y-2">
                  {location.features.map((feature, i) => (
                    <div key={i} className="text-sm text-muted-foreground flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" />{feature}</div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Nos Chiffres Clés</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "51.2%", description: "IRR - Rentabilité exceptionnelle", icon: "📈" },
              { metric: "30%", description: "Réduction des coûts énergétiques", icon: "⚡" },
              { metric: "40%", description: "CAPEX investi dans les actifs numériques", icon: "🏗️" },
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-primary/20 to-secondary/20 border-border p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-4xl font-bold text-primary mb-2">{item.metric}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre événement?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contactez notre équipe pour discuter de votre événement d'affaires.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6" onClick={() => navigate("/reservations")}>
            Planifier Mon Événement
          </Button>
        </section>
      </div>
    </div>
  );
}
