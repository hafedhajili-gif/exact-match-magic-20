import { useEffect, useRef, useState, type FormEvent } from "react";
import sakuraImg from "@/assets/themes/yume-sakura-coast.jpg";
import tokyoImg from "@/assets/themes/yume-tokyo-neon.jpg";
import zenImg from "@/assets/themes/yume-zen-forest.jpg";
import aquariumImg from "@/assets/themes/yume-aquarium.jpg";
import kyotoImg from "@/assets/themes/kyoto-temple.jpg";
import galaxyImg from "@/assets/themes/galaxy.jpg";

const WA_NUMBER = "21696506693";

type World = { k: string; n: string; d: string; c: string; img: string };
const worlds: World[] = [
  { k: "桜", n: "Sakura Coast", d: "Soft pink light, drifting petals", c: "#F25BB5", img: sakuraImg },
  { k: "夜", n: "Tokyo Neon", d: "Electric rain, glowing signage", c: "#22D3EE", img: tokyoImg },
  { k: "森", n: "Zen Forest", d: "Moss, mist, slow calm", c: "#34D27B", img: zenImg },
  { k: "海", n: "Aquarium", d: "Drifting deep-blue light", c: "#38BDF8", img: aquariumImg },
  { k: "京", n: "Kyoto Dusk", d: "Golden temple evening", c: "#FFC24B", img: kyotoImg },
  { k: "宙", n: "Galaxy", d: "Stardust and violet void", c: "#8B5CF6", img: galaxyImg },
];

type Dish = { c: string; n: string; d: string; p: string; t?: string };
const menu: Dish[] = [
  { c: "Coffee", n: "Yume Velvet Latte", d: "Double espresso, oat milk, vanilla, gold dust", p: "13", t: "Signature" },
  { c: "Coffee", n: "Sakura Cloud Cappuccino", d: "Cherry-blossom syrup, silk microfoam", p: "12" },
  { c: "Matcha & Tea", n: "Ceremonial Matcha Latte", d: "Stone-ground matcha, milk of choice", p: "14", t: "Bestseller" },
  { c: "Matcha & Tea", n: "Yuzu Green Tea Fizz", d: "Sparkling green tea, yuzu, mint", p: "12" },
  { c: "Sweets", n: "Soufflé Pancakes", d: "Triple-stack, jiggly, maple & berries", p: "22", t: "Must-try" },
  { c: "Sweets", n: "Crème Brûlée Crêpe", d: "Torched sugar, vanilla custard", p: "18" },
  { c: "Sushi & Bites", n: "Spicy Tuna Roll", d: "Halal tuna, sriracha mayo, scallion", p: "26", t: "Chef's pick" },
  { c: "Sushi & Bites", n: "Avocado Veggie Roll", d: "Avocado, cucumber, pickled radish", p: "18" },
  { c: "Mocktails", n: "Tokyo Neon Mule", d: "Ginger, lime, yuzu, soda — virgin", p: "16", t: "Glows" },
  { c: "Mocktails", n: "Sakura Glow Spritz", d: "Cherry blossom, citrus, tonic", p: "15" },
];

const CATS = ["All", ...Array.from(new Set(menu.map((m) => m.c)))];
const MARQUEE = ["夢 YUME", "Six Worlds", "One Café", "Sousse 2026", "Reserve Now", "360° Immersion"];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [cat, setCat] = useState("All");
  const [chosenWorld, setChosenWorld] = useState(worlds[0].n);
  const [confirm, setConfirm] = useState<{ msg: string; err?: boolean } | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderMode, setOrderMode] = useState<"pickup" | "table">("table");
  const reserveRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const addToCart = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
  const removeFromCart = (name: string) =>
    setCart((c) => {
      const q = (c[name] ?? 0) - 1;
      const next = { ...c };
      if (q <= 0) delete next[name];
      else next[name] = q;
      return next;
    });
  const clearCart = () => setCart({});

  const cartItems = Object.entries(cart).map(([n, q]) => {
    const dish = menu.find((m) => m.n === n)!;
    return { name: n, qty: q, price: Number(dish.p), line: Number(dish.p) * q };
  });
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.line, 0);

  const sendOrderOnWhatsApp = () => {
    if (cartCount === 0) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      setConfirm({ msg: "Merci d'ajouter votre nom et téléphone pour valider la commande.", err: true });
      return;
    }
    const ref = "YM" + Date.now().toString().slice(-6);
    const now = new Date();
    const stamp = now.toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
    const lines = cartItems
      .map((i) => `• ${i.qty}× ${i.name} — ${i.line} DT`)
      .join("%0A");
    const modeLbl = orderMode === "pickup" ? "À emporter" : "Sur table (au café)";
    const msg =
      `🧾 *YUME — Reçu de commande*%0A` +
      `Réf: ${ref}%0A` +
      `Date: ${stamp}%0A%0A` +
      `👤 Client: ${customerName.trim()}%0A` +
      `📞 Tél: ${customerPhone.trim()}%0A` +
      `📍 Mode: ${modeLbl}%0A%0A` +
      `*Articles:*%0A${lines}%0A%0A` +
      `*Total: ${cartTotal} DT*%0A%0A` +
      `Merci de confirmer la commande et le délai 🙏`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setConfirm({ msg: `Commande ${ref} envoyée sur WhatsApp. Nous confirmons dans un instant.` });
    clearCart();
    setCartOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cat]);

  const goTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  const pickWorldAndReserve = (n: string) => {
    setChosenWorld(n);
    setTimeout(() => goTo("#reserve"), 30);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = formRef.current!;
    const name = (f.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (f.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const date = (f.elements.namedItem("date") as HTMLInputElement).value;
    const time = (f.elements.namedItem("time") as HTMLInputElement).value;
    const guests = (f.elements.namedItem("guests") as HTMLSelectElement).value;
    const notes = (f.elements.namedItem("notes") as HTMLTextAreaElement).value.trim();
    if (!name || !phone || !date || !time) {
      setConfirm({ msg: "Please add your name, phone, date and time so we can confirm.", err: true });
      return;
    }
    const msg = `Bonjour YUME 👋%0A%0ARéservation:%0A• Nom: ${name}%0A• Téléphone: ${phone}%0A• Date: ${date} à ${time}%0A• Invités: ${guests}%0A• Monde: ${chosenWorld}${notes ? `%0A• Notes: ${notes}` : ""}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    setConfirm({
      msg: `Merci ${name} — votre table ${chosenWorld} pour ${guests} le ${date} à ${time} est demandée. Nous confirmons par WhatsApp.`,
    });
  };

  const todayMin = new Date().toISOString().split("T")[0];

  return (
    <div className="yume-root">
      <style>{CSS}</style>

      <header id="head" className={scrolled ? "on" : ""}>
        <div className="shell navrow">
          <a className="brand" href="#top">
            <span className="m">夢</span>YUME
          </a>
          <nav className="navlinks">
            <a href="#story">Story</a>
            <a href="#worlds">Worlds</a>
            <a href="#menu">Menu</a>
            <a href="#faq">FAQ</a>
          </nav>
          <button className="cta sm" onClick={() => goTo("#reserve")}>Reserve a table</button>
        </div>
      </header>

      <a id="top" />
      <section className="hero">
        <div className="shell">
          <span className="kicker reveal"><span className="d" /> Sousse, Tunisia — opening 2026</span>
          <h1 className="reveal">
            Step into <span className="g">six worlds.</span>
            <br />One café.
          </h1>
          <p className="sub reveal">
            YUME wraps the entire room in 360° light and sound — so a quiet matcha in a Kyoto dusk and a neon Tokyo night
            happen at the same table, an hour apart. Reserve once. Choose the world when you arrive.
          </p>
          <div className="row reveal">
            <button className="cta" onClick={() => goTo("#reserve")}>Reserve a table</button>
            <span className="micro">Open daily, 9:00 → 23:00 · No deposit required</span>
          </div>

          <div className="reveal" style={{ marginTop: "3.6rem" }}>
            <div className="visual">
              <div className="scene">
                {worlds.map((w, i) => (
                  <HeroCell key={w.n} w={w} primary={i === 0} />
                ))}
              </div>
              <div className="frame" />
            </div>
          </div>
        </div>
      </section>

      <div className="mq-wrap reveal" aria-hidden="true">
        <div className="mq">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      <section className="sec" id="story">
        <div className="shell">
          <div className="split reveal">
            <div>
              <span className="eyebrow">The idea</span>
              <h2>Most cafés decorate a wall.<br />We become the room.</h2>
              <p className="lead">
                Floor-to-ceiling 8K LED surrounds every table — the world doesn't sit in front of you, you sit inside it.
                Light, motion, and sound shift together, so the room feels alive rather than decorated.
              </p>
              <ul className="checks">
                <li><span className="ok">✓</span> 360° immersive coverage, not a single screen</li>
                <li><span className="ok">✓</span> Six interchangeable worlds, switched by time of day</li>
                <li><span className="ok">✓</span> A menu styled to match the scene you're in</li>
              </ul>
            </div>
            <div
              className="visual-card"
              style={{ ["--c1" as never]: "#241338", backgroundImage: `url(${sakuraImg})` }}
            >
              <span className="tag"><i className="live-dot" />Live now · Sakura</span>
              <span className="kan">桜</span>
              <div className="mini"><b>Sakura Coast</b><span>Soft pink light, drifting petals</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="shell">
          <div className="split rev reveal">
            <div
              className="visual-card"
              style={{ ["--c1" as never]: "#0e2a24", backgroundImage: `url(${zenImg})` }}
            >
              <span className="tag"><i className="live-dot" />Live now · Zen Forest</span>
              <span className="kan">森</span>
              <div className="mini"><b>Zen Forest</b><span>Moss, mist, slow morning light</span></div>
            </div>
            <div>
              <span className="eyebrow">Phygital, by the hour</span>
              <h2>Book a mood, not just a table.</h2>
              <p className="lead">
                Worlds rotate across the day — calm and green at sunrise, electric and neon by midnight. Pick your moment
                when you reserve, and we'll set the room before you arrive.
              </p>
              <ul className="checks">
                <li><span className="ok">✓</span> Choose your world at booking — no surprises</li>
                <li><span className="ok">✓</span> Private scene available for groups of 7+</li>
                <li><span className="ok">✓</span> Same seat, six completely different evenings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="worlds">
        <div className="shell">
          <div className="worlds-head reveal">
            <span className="eyebrow">All six worlds</span>
            <h2>Pick the one that fits tonight.</h2>
          </div>
          <div className="wgrid">
            {worlds.map((w, i) => (
              <button
                key={w.n}
                type="button"
                className="wcard reveal"
                style={{
                  ["--c" as never]: w.c + "3d",
                  ["--c2" as never]: w.c,
                  backgroundImage: `url(${w.img})`,
                }}
                onClick={() => pickWorldAndReserve(w.n)}
              >
                <span className="no">0{i + 1}</span>
                <span className="kan">{w.k}</span>
                <h3>{w.n}</h3>
                <p>{w.d}</p>
                <span className="cta-mini">Réserver →</span>
              </button>
            ))}
          </div>

          <div className="statsbar reveal">
            <div className="cell"><b>360°</b><span>LED coverage</span></div>
            <div className="cell"><b>6</b><span>Switchable worlds</span></div>
            <div className="cell"><b>2026</b><span>Opening, Sousse</span></div>
            <div className="cell"><b>9–23h</b><span>Open every day</span></div>
          </div>
        </div>
      </section>

      <section className="sec alt" id="menu">
        <div className="shell">
          <div className="worlds-head reveal">
            <span className="eyebrow">The menu</span>
            <h2>Tastes as good as the room looks.</h2>
          </div>
          <div className="menu-top reveal">
            <div className="tabs">
              {CATS.map((c) => (
                <button key={c} className={"tab" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="mgrid">
            {menu.filter((m) => cat === "All" || m.c === cat).map((m) => (
              <div className="dish" key={m.n}>
                <div className="top">
                  <span className="nm">{m.n}</span>
                  <span className="pr">{m.p} DT</span>
                </div>
                <div className="ds">{m.d}</div>
                {m.t && <span className="tg">{m.t}</span>}
                <div className="qty-row">
                  {cart[m.n] ? (
                    <div className="qty-ctrl">
                      <button type="button" onClick={() => removeFromCart(m.n)} aria-label="moins">−</button>
                      <span>{cart[m.n]}</span>
                      <button type="button" onClick={() => addToCart(m.n)} aria-label="plus">+</button>
                    </div>
                  ) : (
                    <button type="button" className="order-btn" onClick={() => addToCart(m.n)}>
                      + Ajouter à la commande
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="menu-foot">Prices in TND, illustrative pre-launch.</p>
          <div className="reveal" style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
            <button type="button" className="cta" onClick={() => setCartOpen(true)} disabled={cartCount === 0}>
              Voir ma commande {cartCount > 0 ? `(${cartCount} · ${cartTotal} DT)` : ""}
            </button>
          </div>
        </div>
      </section>

      <section className="sec" id="faq">
        <div className="shell tight">
          <div className="worlds-head reveal">
            <span className="eyebrow">Before you book</span>
            <h2>Questions, answered.</h2>
          </div>
          <div className="faq reveal">
            {FAQ.map((q, i) => (
              <details className="qa" key={q.q} open={i === 0}>
                <summary>{q.q}<span className="plus">+</span></summary>
                <div className="a">{q.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="reserve" ref={reserveRef as never}>
        <div className="shell">
          <div className="banner reveal">
            <span className="eyebrow eyebrow-center">One page. One goal.</span>
            <h2>Reserve your seat inside the dream.</h2>
            <p>Tell us when, and which world — we'll confirm by WhatsApp. No deposit, no fuss.</p>

            <form className="resv" ref={formRef} onSubmit={onSubmit}>
              <div className="field"><label htmlFor="name">Full name</label><input id="name" name="name" required /></div>
              <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" required /></div>
              <div className="field"><label htmlFor="date">Date</label><input id="date" name="date" type="date" min={todayMin} required /></div>
              <div className="field"><label htmlFor="time">Time</label><input id="time" name="time" type="time" required /></div>
              <div className="field">
                <label htmlFor="guests">Guests</label>
                <select id="guests" name="guests" defaultValue="2">
                  {["1", "2", "3", "4", "5", "6", "7+"].map((g) => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="world">Preferred world</label>
                <select id="world" name="world" value={chosenWorld} onChange={(e) => setChosenWorld(e.target.value)}>
                  {worlds.map((w) => <option key={w.n}>{w.n}</option>)}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="notes">Notes (optional)</label>
                <textarea id="notes" name="notes" rows={2} placeholder="Occasion, private group, dietary…" />
              </div>
              <div className="field full" style={{ marginTop: ".4rem" }}>
                <button className="cta" type="submit" style={{ justifyContent: "center" }}>Request reservation</button>
              </div>
            </form>
            {confirm && (
              <div className={"confirm show" + (confirm.err ? " err" : "")}>{confirm.msg}</div>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">
          <div className="footrow">
            <div style={{ maxWidth: 300 }}>
              <a className="brand" href="#top" style={{ marginBottom: ".8rem" }}><span className="m">夢</span>YUME</a>
              <p style={{ opacity: 0.7, fontSize: ".88rem" }}>An immersive café in Sousse. Step into a world — then taste it.</p>
            </div>
            <div className="foot-col"><h4>Page</h4><a href="#story">Story</a><a href="#worlds">Worlds</a><a href="#menu">Menu</a><a href="#faq">FAQ</a></div>
            <div className="foot-col"><h4>Visit</h4><p>Sousse, Tunisia</p><p>Daily · 9:00–23:00</p><p>+216 96 506 693</p></div>
            <div className="foot-col"><h4>Follow</h4><a href="#">Instagram</a><a href="#">TikTok</a></div>
          </div>
          <div className="copy">© {new Date().getFullYear()} YUME — Sousse, Tunisia.</div>
        </div>
      </footer>

      {cartCount > 0 && !cartOpen && (
        <button type="button" className="cart-fab" onClick={() => setCartOpen(true)} aria-label="Voir la commande">
          🛒 <span>{cartCount}</span> · {cartTotal} DT
        </button>
      )}

      {cartOpen && (
        <div className="cart-scrim" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-head">
              <h3>Ma commande</h3>
              <button type="button" className="cart-close" onClick={() => setCartOpen(false)} aria-label="Fermer">×</button>
            </div>
            {cartItems.length === 0 ? (
              <p className="cart-empty">Votre commande est vide. Ajoutez des articles depuis le menu.</p>
            ) : (
              <>
                <ul className="cart-list">
                  {cartItems.map((i) => (
                    <li key={i.name}>
                      <div className="ci-info">
                        <span className="ci-name">{i.name}</span>
                        <span className="ci-price">{i.price} DT</span>
                      </div>
                      <div className="qty-ctrl">
                        <button type="button" onClick={() => removeFromCart(i.name)}>−</button>
                        <span>{i.qty}</span>
                        <button type="button" onClick={() => addToCart(i.name)}>+</button>
                      </div>
                      <span className="ci-line">{i.line} DT</span>
                    </li>
                  ))}
                </ul>
                <div className="cart-total"><span>Total</span><b>{cartTotal} DT</b></div>
                <div className="cart-form">
                  <div className="field"><label>Nom complet</label><input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Votre nom" /></div>
                  <div className="field"><label>Téléphone</label><input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} type="tel" placeholder="+216 ..." /></div>
                  <div className="field">
                    <label>Mode</label>
                    <div className="mode-pills">
                      <button type="button" className={"pill" + (orderMode === "table" ? " on" : "")} onClick={() => setOrderMode("table")}>Sur table</button>
                      <button type="button" className={"pill" + (orderMode === "pickup" ? " on" : "")} onClick={() => setOrderMode("pickup")}>À emporter</button>
                    </div>
                  </div>
                </div>
                <button type="button" className="cta wa-send" onClick={sendOrderOnWhatsApp}>
                  📲 Envoyer le reçu sur WhatsApp
                </button>
                <button type="button" className="cart-clear" onClick={clearCart}>Vider la commande</button>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function HeroCell({ w, primary }: { w: World; primary: boolean }) {
  const base = primary ? "1.4" : "1";
  return (
    <div
      style={{
        ["--c" as never]: w.c + "55",
        backgroundImage: `url(${w.img})`,
        flex: base,
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.flex = "2")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.flex = base)}
    >
      <span className="k">{w.k}</span>
      <span className="n">{w.n}</span>
    </div>
  );
}

const FAQ = [
  { q: "What exactly is an \"immersive world\"?", a: "Floor-to-ceiling 8K LED panels wrap the room in synchronized visuals, light, and ambient sound — so the environment around your table changes completely, not just a screen on one wall." },
  { q: "Can I choose which world I sit in?", a: "Yes — pick your preferred world when you reserve. We schedule worlds by time of day and confirm yours by WhatsApp before your visit." },
  { q: "Do I need a reservation, or can I walk in?", a: "Walk-ins are welcome, but reserving locks in your preferred world and time slot — popular worlds book out, especially evenings and weekends." },
  { q: "Is YUME suitable for groups or private events?", a: "Yes. Groups of 7 or more can request a private scene — tell us in the notes field when reserving and we'll arrange it." },
];

const CSS = `
.yume-root{--ink:#0A0612;--ink-2:#0F0A1D;--ink-3:#150E29;--paper:#F4EFE9;--muted:#9A8FB0;--line:rgba(255,255,255,.09);--violet:#7C3AED;--pink:#F25BB5;--matcha:#34D27B;--gold:#FFC24B;--cyan:#22D3EE;--r:28px;--font-d:"Syne",system-ui,sans-serif;--font-b:"Manrope",system-ui,sans-serif;background:var(--ink);color:var(--paper);font-family:var(--font-b);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden;min-height:100vh}
.yume-root .kan,.yume-root .brand .m,.yume-root .hero .visual .scene > div .k{font-family:"Noto Sans JP","Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic","Meiryo",sans-serif;font-weight:700}
.yume-root *{box-sizing:border-box}
.yume-root h1,.yume-root h2,.yume-root h3{font-family:var(--font-d);font-weight:800;letter-spacing:-.02em;line-height:1.04;margin:0}
.yume-root p{margin:0}
.yume-root a{color:inherit;text-decoration:none}
.yume-root img{max-width:100%;display:block}
.yume-root ::selection{background:rgba(124,58,237,.4)}
.yume-root .shell{width:min(100% - 2.6rem,1180px);margin-inline:auto}
.yume-root .tight{width:min(100% - 2.6rem,920px);margin-inline:auto}
.yume-root .cta{display:inline-flex;align-items:center;gap:.55rem;border:0;cursor:pointer;font-family:var(--font-b);font-weight:700;padding:1rem 1.7rem;border-radius:999px;font-size:.98rem;background:linear-gradient(135deg,var(--violet),var(--pink));color:#fff;box-shadow:0 14px 38px rgba(124,58,237,.35);transition:transform .25s,box-shadow .25s;position:relative;overflow:hidden;white-space:nowrap}
.yume-root .cta:hover{transform:translateY(-3px);box-shadow:0 20px 50px rgba(124,58,237,.5)}
.yume-root .cta:focus-visible{outline:2px solid #fff;outline-offset:3px}
.yume-root .cta.sm{padding:.65rem 1.15rem;font-size:.86rem}
.yume-root .cta::after{content:"";position:absolute;inset:0;transform:translateX(-120%);background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);transition:transform .6s}
.yume-root .cta:hover::after{transform:translateX(120%)}
.yume-root header{position:sticky;top:0;z-index:50;padding:1.1rem 0;transition:background .3s,border-color .3s}
.yume-root header.on{background:rgba(10,6,18,.78);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.yume-root .navrow{display:flex;align-items:center;justify-content:space-between;gap:1rem}
.yume-root .brand{display:flex;align-items:center;gap:.55rem;font-family:var(--font-d);font-weight:800;font-size:1.15rem}
.yume-root .brand .m{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(135deg,var(--violet),var(--pink));font-size:.95rem}
.yume-root .navlinks{display:flex;gap:1.8rem;font-size:.88rem;color:var(--muted);font-weight:600}
.yume-root .navlinks a:hover{color:var(--paper)}
@media(max-width:760px){.yume-root .navlinks{display:none}}
.yume-root .hero{padding:clamp(4rem,12vw,8rem) 0 clamp(3rem,8vw,5rem);position:relative;overflow:hidden}
.yume-root .hero::before{content:"";position:absolute;inset:-20% -10% auto -10%;height:140%;z-index:-1;background:radial-gradient(48rem 36rem at 18% 0%,rgba(124,58,237,.35),transparent 60%),radial-gradient(40rem 30rem at 88% 18%,rgba(52,210,127,.16),transparent 60%);filter:blur(10px)}
.yume-root .kicker{display:inline-flex;align-items:center;gap:.55rem;font-size:.78rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:1.4rem}
.yume-root .kicker .d{width:7px;height:7px;border-radius:50%;background:var(--matcha);box-shadow:0 0 12px var(--matcha)}
.yume-root .hero h1{font-size:clamp(2.5rem,8.6vw,5.6rem);max-width:16ch}
.yume-root .hero h1 .g{background:linear-gradient(110deg,var(--violet),var(--pink),var(--matcha));-webkit-background-clip:text;background-clip:text;color:transparent}
.yume-root .hero .sub{margin-top:1.4rem;font-size:clamp(1.02rem,2vw,1.25rem);color:var(--muted);max-width:46ch}
.yume-root .hero .row{display:flex;align-items:center;gap:1rem;margin-top:2.1rem;flex-wrap:wrap}
.yume-root .hero .micro{font-size:.84rem;color:var(--muted)}
.yume-root .hero .visual{border-radius:var(--r);border:1px solid var(--line);overflow:hidden;background:linear-gradient(160deg,#160d2c,#0a0614);position:relative;aspect-ratio:16/8;display:flex;align-items:center;justify-content:center}
.yume-root .hero .visual .frame{position:absolute;inset:1.1rem;border:1px dashed rgba(255,255,255,.14);border-radius:18px;pointer-events:none}
.yume-root .hero .visual .scene{display:flex;width:100%;height:100%}
.yume-root .hero .visual .scene > div{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:1.2rem;gap:.35rem;font-family:var(--font-d);color:rgba(255,255,255,.96);position:relative;transition:flex 1.1s cubic-bezier(.2,.7,.2,1);cursor:pointer;min-width:0;background-size:cover;background-position:center;overflow:hidden;text-shadow:0 2px 18px rgba(0,0,0,.55)}
.yume-root .hero .visual .scene > div::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(10,6,18,.85)),var(--c);mix-blend-mode:multiply;transition:opacity .4s}
.yume-root .hero .visual .scene > div:hover::after{opacity:.55}
.yume-root .hero .visual .scene > div .k{position:relative;z-index:1;font-size:2.2rem;line-height:1}
.yume-root .hero .visual .scene > div .n{position:relative;z-index:1;font-size:.78rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700;opacity:.9}
.yume-root .sec{padding:clamp(4.5rem,9vw,7.5rem) 0;position:relative}
.yume-root .sec.alt{background:linear-gradient(180deg,var(--ink-2),var(--ink-3))}
.yume-root .sec.alt::before,.yume-root .sec.alt::after{content:"";position:absolute;left:0;right:0;height:1px;background:var(--line)}
.yume-root .sec.alt::before{top:0}.yume-root .sec.alt::after{bottom:0}
.yume-root .eyebrow{display:inline-flex;align-items:center;gap:.5rem;font-size:.76rem;letter-spacing:.2em;text-transform:uppercase;color:var(--violet);font-weight:800;margin-bottom:1rem}
.yume-root .eyebrow-center{justify-content:center;display:flex}
.yume-root .split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,4.5rem);align-items:center}
.yume-root .split.rev{direction:rtl}
.yume-root .split.rev > *{direction:ltr}
.yume-root .split h2{font-size:clamp(1.9rem,4.4vw,3rem);margin-top:.6rem}
.yume-root .split p.lead{color:var(--muted);font-size:1.05rem;margin-top:1.1rem;max-width:48ch}
.yume-root .checks{margin-top:1.6rem;display:flex;flex-direction:column;gap:.8rem;padding:0}
.yume-root .checks li{list-style:none;display:flex;gap:.7rem;align-items:start;color:var(--paper);font-size:.96rem}
.yume-root .checks .ok{flex:0 0 22px;height:22px;border-radius:50%;background:rgba(52,210,127,.16);color:var(--matcha);display:grid;place-items:center;font-size:.72rem;margin-top:.1rem}
.yume-root .visual-card{border-radius:var(--r);border:1px solid var(--line);overflow:hidden;aspect-ratio:4/5;position:relative;background-color:var(--c1,#1c1136);background-size:cover;background-position:center;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.yume-root .visual-card:hover{transform:scale(1.015)}
.yume-root .visual-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,6,18,.15) 0%,rgba(10,6,18,.25) 45%,rgba(10,6,18,.88) 100%)}
.yume-root .visual-card > *{position:relative;z-index:1}
.yume-root .visual-card .tag{position:absolute;top:1rem;left:1rem;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.18);padding:.45rem .85rem;border-radius:999px;font-size:.76rem;font-weight:700;display:inline-flex;align-items:center;gap:.5rem;z-index:2}
.yume-root .visual-card .kan{position:absolute;right:1.1rem;bottom:1.1rem;font-family:var(--font-d);font-size:5rem;opacity:.22;line-height:1;z-index:2}
.yume-root .live-dot{width:7px;height:7px;border-radius:50%;background:#34D27B;box-shadow:0 0 10px #34D27B;animation:yume-pulse 1.8s ease-in-out infinite}
@keyframes yume-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(1.25)}}
.yume-root .visual-card .mini{position:absolute;left:1.1rem;bottom:1.1rem;right:5.5rem}
.yume-root .visual-card .mini b{display:block;font-size:1.15rem}
.yume-root .visual-card .mini span{color:var(--muted);font-size:.84rem}
.yume-root .worlds-head{max-width:46ch;margin-bottom:2.6rem}
.yume-root .worlds-head h2{font-size:clamp(1.9rem,4.4vw,3rem);margin-top:.6rem}
.yume-root .wgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.yume-root .wcard{border-radius:22px;border:1px solid var(--line);padding:1.5rem;min-height:280px;position:relative;overflow:hidden;background-size:cover;background-position:center;display:flex;flex-direction:column;justify-content:space-between;transition:transform .4s cubic-bezier(.2,.7,.2,1),border-color .3s,box-shadow .3s;text-align:left;color:inherit;font-family:inherit;cursor:pointer}
.yume-root .wcard::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,6,18,.2) 0%,rgba(10,6,18,.55) 55%,rgba(10,6,18,.95) 100%),linear-gradient(165deg,var(--c) 0%,transparent 70%);transition:opacity .35s}
.yume-root .wcard:hover{transform:translateY(-8px);border-color:var(--c2,rgba(255,255,255,.3));box-shadow:0 24px 60px rgba(0,0,0,.55),0 0 30px color-mix(in srgb,var(--c2,#fff) 25%,transparent)}
.yume-root .wcard > *{position:relative;z-index:1}
.yume-root .wcard .kan{font-family:var(--font-d);font-size:2.4rem;text-shadow:0 2px 14px rgba(0,0,0,.5)}
.yume-root .wcard h3{font-size:1.3rem;margin-top:auto;text-shadow:0 2px 12px rgba(0,0,0,.5)}
.yume-root .wcard p{color:rgba(244,239,233,.78);font-size:.88rem;margin-top:.35rem}
.yume-root .wcard .no{position:absolute;top:1.1rem;right:1.2rem;font-size:.74rem;color:rgba(255,255,255,.7);font-weight:700;z-index:2}
.yume-root .wcard .cta-mini{display:inline-flex;align-items:center;margin-top:.9rem;font-size:.78rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--c2,#fff);opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .3s}
.yume-root .wcard:hover .cta-mini{opacity:1;transform:translateX(0)}
.yume-root .statsbar{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;margin-top:2rem}
.yume-root .statsbar .cell{background:var(--ink-2);padding:1.8rem 1.4rem;text-align:center}
.yume-root .statsbar b{display:block;font-family:var(--font-d);font-size:2.4rem;background:linear-gradient(120deg,var(--gold),var(--matcha));-webkit-background-clip:text;background-clip:text;color:transparent}
.yume-root .statsbar span{color:var(--muted);font-size:.84rem}
.yume-root .menu-top{display:flex;justify-content:space-between;align-items:end;gap:1rem;flex-wrap:wrap;margin-bottom:2rem}
.yume-root .tabs{display:flex;gap:.4rem;flex-wrap:wrap}
.yume-root .tab{padding:.5rem .95rem;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:var(--muted);font-weight:700;font-size:.82rem;cursor:pointer;transition:all .2s;font-family:inherit}
.yume-root .tab.active{background:linear-gradient(135deg,var(--violet),var(--pink));color:#fff;border-color:transparent}
.yume-root .mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.yume-root .dish{border:1px solid var(--line);border-radius:18px;padding:1.2rem;background:rgba(255,255,255,.025);transition:transform .25s,border-color .25s}
.yume-root .dish:hover{transform:translateY(-5px);border-color:rgba(255,255,255,.2)}
.yume-root .dish .top{display:flex;justify-content:space-between;gap:.6rem;align-items:start}
.yume-root .dish .nm{font-weight:700;font-size:1rem}
.yume-root .dish .pr{font-family:var(--font-d);color:var(--gold);font-weight:700}
.yume-root .dish .ds{color:var(--muted);font-size:.85rem;margin-top:.4rem}
.yume-root .dish .tg{display:inline-block;margin-top:.7rem;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--violet);font-weight:800}
.yume-root .dish .order-btn{margin-top:1rem;display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1rem;border-radius:999px;border:1px solid rgba(52,210,127,.35);background:rgba(52,210,127,.08);color:var(--matcha);font-family:var(--font-b);font-weight:700;font-size:.8rem;cursor:pointer;transition:background .2s,transform .2s,border-color .2s}
.yume-root .dish .order-btn:hover{background:rgba(52,210,127,.16);border-color:var(--matcha);transform:translateY(-2px)}
.yume-root .dish .qty-row{margin-top:1rem}
.yume-root .qty-ctrl{display:inline-flex;align-items:center;gap:.6rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:.25rem .35rem}
.yume-root .qty-ctrl button{width:28px;height:28px;border-radius:999px;border:0;background:rgba(124,58,237,.25);color:#fff;font-weight:800;cursor:pointer;font-size:1rem;line-height:1;display:grid;place-items:center;transition:background .2s}
.yume-root .qty-ctrl button:hover{background:var(--violet)}
.yume-root .qty-ctrl span{min-width:22px;text-align:center;font-weight:800;font-family:var(--font-d)}
.yume-root .cart-fab{position:fixed;bottom:1.4rem;right:1.4rem;z-index:60;border:0;cursor:pointer;padding:.95rem 1.3rem;border-radius:999px;background:linear-gradient(135deg,var(--matcha),#1d8f52);color:#fff;font-family:var(--font-b);font-weight:800;font-size:.95rem;display:inline-flex;align-items:center;gap:.55rem;box-shadow:0 18px 40px rgba(52,210,127,.4);animation:yume-pulse 2.4s ease-in-out infinite}
.yume-root .cart-fab span{background:rgba(0,0,0,.28);padding:.1rem .55rem;border-radius:999px;font-size:.8rem}
.yume-root .cart-scrim{position:fixed;inset:0;z-index:70;background:rgba(6,3,14,.72);backdrop-filter:blur(6px);display:flex;justify-content:flex-end;animation:fadein .2s ease}
.yume-root .cart-drawer{width:min(420px,100%);height:100%;background:#0e0820;border-left:1px solid var(--line);display:flex;flex-direction:column;padding:1.4rem;overflow-y:auto;animation:slidein .28s cubic-bezier(.2,.7,.2,1)}
.yume-root .cart-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
.yume-root .cart-head h3{font-family:var(--font-d);font-size:1.4rem;margin:0}
.yume-root .cart-close{background:rgba(255,255,255,.06);border:1px solid var(--line);color:#fff;width:36px;height:36px;border-radius:999px;font-size:1.3rem;cursor:pointer;line-height:1}
.yume-root .cart-empty{color:var(--muted);text-align:center;padding:2rem 0}
.yume-root .cart-list{list-style:none;padding:0;margin:0 0 1rem;display:flex;flex-direction:column;gap:.7rem}
.yume-root .cart-list li{display:grid;grid-template-columns:1fr auto auto;gap:.7rem;align-items:center;padding:.75rem;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.03)}
.yume-root .ci-info{display:flex;flex-direction:column;gap:.15rem;min-width:0}
.yume-root .ci-name{font-weight:700;font-size:.92rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.yume-root .ci-price{color:var(--muted);font-size:.75rem}
.yume-root .ci-line{font-family:var(--font-d);color:var(--gold);font-weight:800;min-width:60px;text-align:right}
.yume-root .cart-total{display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-top:1px dashed var(--line);border-bottom:1px dashed var(--line);margin-bottom:1rem}
.yume-root .cart-total b{font-family:var(--font-d);font-size:1.4rem;color:var(--matcha)}
.yume-root .cart-form{display:flex;flex-direction:column;gap:.7rem;margin-bottom:1rem}
.yume-root .cart-form .field label{display:block;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:.35rem;font-weight:700}
.yume-root .cart-form .field input{width:100%;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:.75rem .9rem;color:#fff;font-family:var(--font-b);font-size:.92rem;outline:none;transition:border-color .2s}
.yume-root .cart-form .field input:focus{border-color:var(--violet)}
.yume-root .mode-pills{display:flex;gap:.5rem}
.yume-root .mode-pills .pill{flex:1;padding:.7rem;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.04);color:#fff;font-weight:700;cursor:pointer;font-size:.85rem;transition:all .2s}
.yume-root .mode-pills .pill.on{background:rgba(124,58,237,.2);border-color:var(--violet);color:#fff}
.yume-root .wa-send{width:100%;justify-content:center;background:linear-gradient(135deg,#25D366,#128C7E);box-shadow:0 14px 38px rgba(37,211,102,.35)}
.yume-root .cart-clear{margin-top:.7rem;background:transparent;border:1px solid var(--line);color:var(--muted);padding:.65rem;border-radius:12px;cursor:pointer;font-family:var(--font-b);width:100%}
.yume-root .cart-clear:hover{color:#fff;border-color:rgba(255,255,255,.3)}
@keyframes slidein{from{transform:translateX(100%)}to{transform:translateX(0)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.yume-root .menu-foot{color:var(--muted);font-size:.8rem;margin-top:1.4rem;font-style:italic}
.yume-root .faq{display:flex;flex-direction:column;gap:.7rem}
.yume-root .qa{border:1px solid var(--line);border-radius:16px;overflow:hidden;background:rgba(255,255,255,.02)}
.yume-root .qa summary{list-style:none;padding:1.1rem 1.3rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:.98rem}
.yume-root .qa summary::-webkit-details-marker{display:none}
.yume-root .qa summary .plus{font-size:1.3rem;color:var(--violet);transition:transform .25s;flex:0 0 auto;margin-left:1rem}
.yume-root .qa[open] summary .plus{transform:rotate(45deg)}
.yume-root .qa .a{padding:0 1.3rem 1.2rem;color:var(--muted);font-size:.92rem;max-width:65ch}
.yume-root .banner{border-radius:32px;padding:clamp(2.6rem,7vw,5rem);position:relative;overflow:hidden;text-align:center;background:linear-gradient(155deg,#1c1037,#0a0614);border:1px solid var(--line)}
.yume-root .banner::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 80% at 50% 0%,rgba(124,58,237,.35),transparent 70%);pointer-events:none}
.yume-root .banner h2{font-size:clamp(2rem,5.4vw,3.4rem);position:relative;max-width:18ch;margin:0 auto}
.yume-root .banner p{color:var(--muted);max-width:46ch;margin:1.1rem auto 0;position:relative;font-size:1.02rem}
.yume-root .resv{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;margin-top:2.4rem;text-align:left;position:relative}
.yume-root .field{display:flex;flex-direction:column;gap:.4rem}
.yume-root .field.full{grid-column:1/-1}
.yume-root label{font-size:.78rem;color:var(--muted);font-weight:700}
.yume-root input,.yume-root select,.yume-root textarea{font-family:inherit;background:rgba(255,255,255,.05);border:1px solid var(--line);color:var(--paper);border-radius:12px;padding:.75rem .9rem;font-size:.95rem;outline:none;transition:border-color .2s,box-shadow .2s;color-scheme:dark}
.yume-root input:focus,.yume-root select:focus,.yume-root textarea:focus{border-color:var(--violet);box-shadow:0 0 0 3px rgba(124,58,237,.25)}
.yume-root select option{color:#111}
.yume-root .confirm{margin-top:1rem;padding:.85rem 1rem;border-radius:12px;border:1px solid rgba(52,210,127,.4);background:rgba(52,210,127,.1);color:#c9ffe2;font-size:.9rem;text-align:left;position:relative}
.yume-root .confirm.err{border-color:rgba(242,91,181,.5);background:rgba(242,91,181,.12);color:#ffd0ec}
.yume-root footer{border-top:1px solid var(--line);padding:3rem 0}
.yume-root .footrow{display:flex;justify-content:space-between;gap:2rem;flex-wrap:wrap}
.yume-root .foot-col h4{font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:.7rem}
.yume-root .foot-col a,.yume-root .foot-col p{display:block;color:var(--paper);opacity:.85;font-size:.9rem;padding:.18rem 0;margin:0}
.yume-root .foot-col a:hover{opacity:1;color:var(--violet)}
.yume-root .copy{margin-top:2.4rem;padding-top:1.4rem;border-top:1px solid var(--line);color:var(--muted);font-size:.8rem}
.yume-root .reveal{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}
.yume-root .reveal.in{opacity:1;transform:none}
.yume-root .mq-wrap{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:1rem 0;overflow:hidden}
.yume-root .mq{display:flex;gap:3rem;width:max-content;animation:yume-mq 28s linear infinite;font-family:var(--font-d);color:var(--muted);font-size:.95rem}
.yume-root .mq span{margin-right:3rem}
@keyframes yume-mq{to{transform:translateX(-50%)}}
@media(max-width:920px){.yume-root .split,.yume-root .split.rev{grid-template-columns:1fr;direction:ltr}.yume-root .split .visual-card{order:-1}.yume-root .wgrid{grid-template-columns:repeat(2,1fr)}.yume-root .mgrid{grid-template-columns:1fr 1fr}.yume-root .statsbar{grid-template-columns:repeat(2,1fr)}.yume-root .resv{grid-template-columns:1fr}}
@media(max-width:620px){.yume-root .wgrid{grid-template-columns:1fr}.yume-root .mgrid{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.yume-root *{transition:none!important;animation:none!important;scroll-behavior:auto!important}.yume-root .reveal{opacity:1;transform:none}}
`;