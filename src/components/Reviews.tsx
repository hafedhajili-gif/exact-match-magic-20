import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  visit_date: string | null;
  created_at: string;
};

export default function Reviews() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [msg, setMsg] = useState<{ text: string; err?: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, rating, comment, visit_date, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    if (!error && data) setItems(data as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const c = comment.trim();
    if (!n) return setMsg({ text: "Please add your name.", err: true });
    if (!rating || rating < 1 || rating > 5) return setMsg({ text: "Please pick a rating.", err: true });
    if (!c) return setMsg({ text: "Please write a short comment.", err: true });
    if (c.length > 300) return setMsg({ text: "Comment must be 300 characters or fewer.", err: true });

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: n.slice(0, 80),
      rating,
      comment: c,
      visit_date: visitDate || null,
    });
    setSubmitting(false);
    if (error) {
      setMsg({ text: "Sorry, your feedback could not be saved. Please try again.", err: true });
      return;
    }
    setMsg({ text: "Thank you — your feedback is now live on YUME." });
    setName("");
    setComment("");
    setVisitDate("");
    setRating(5);
    load();
  };

  const active = hover || rating;

  return (
    <section className="sec alt" id="reviews">
      <style>{CSS}</style>
      <div className="shell">
        <div className="rv-head reveal">
          <span className="eyebrow eyebrow-center">Guest voices</span>
          <h2>Customer feedback.</h2>
          <p className="rv-lead">
            Tell us how your visit felt — the warm and the honest. Every review helps YUME grow.
          </p>
        </div>

        <div className="rv-grid">
          <form className="rv-form reveal" onSubmit={onSubmit}>
            <div className="rv-field">
              <label htmlFor="rv-name">Name</label>
              <input id="rv-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} required />
            </div>
            <div className="rv-field">
              <label>Rating</label>
              <div className="rv-stars" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    role="radio"
                    aria-checked={rating === s}
                    className={"rv-star" + (s <= active ? " on" : "")}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(s)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="rv-field">
              <label htmlFor="rv-date">Visit date (optional)</label>
              <input id="rv-date" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
            </div>
            <div className="rv-field">
              <label htmlFor="rv-comment">
                Comment <span className="rv-count">{comment.length}/300</span>
              </label>
              <textarea
                id="rv-comment"
                rows={4}
                maxLength={300}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button className="cta rv-send" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Share your feedback"}
            </button>
            {msg && <div className={"rv-msg" + (msg.err ? " err" : "")}>{msg.text}</div>}
          </form>

          <div className="rv-list reveal">
            {loading && <div className="rv-empty">Loading reviews…</div>}
            {!loading && items.length === 0 && (
              <div className="rv-empty">Be the first to share your YUME moment.</div>
            )}
            {!loading &&
              items.map((r) => (
                <article key={r.id} className="rv-card">
                  <header>
                    <div className="rv-who">
                      <span className="rv-avatar" aria-hidden>
                        {r.name.slice(0, 1).toUpperCase()}
                      </span>
                      <div>
                        <b>{r.name}</b>
                        <span className="rv-meta">
                          {new Date(r.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          {r.visit_date &&
                            ` · visited ${new Date(r.visit_date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}`}
                        </span>
                      </div>
                    </div>
                    <div className="rv-rate" aria-label={`${r.rating} out of 5`}>
                      {"★".repeat(r.rating)}
                      <span className="rv-off">{"★".repeat(5 - r.rating)}</span>
                    </div>
                  </header>
                  <p>{r.comment}</p>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
#reviews .rv-head{text-align:center;max-width:680px;margin:0 auto 2.6rem}
#reviews .rv-head h2{font-size:clamp(1.9rem,4.4vw,3rem);margin-top:.4rem}
#reviews .rv-lead{color:var(--muted);margin-top:.9rem}
#reviews .rv-grid{display:grid;grid-template-columns:minmax(0,380px) 1fr;gap:2.4rem;align-items:start}
@media(max-width:900px){#reviews .rv-grid{grid-template-columns:1fr}}
#reviews .rv-form{background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.015));border:1px solid var(--line);border-radius:22px;padding:1.6rem;display:flex;flex-direction:column;gap:1rem;position:sticky;top:6rem}
@media(max-width:900px){#reviews .rv-form{position:static}}
#reviews .rv-field{display:flex;flex-direction:column;gap:.4rem}
#reviews .rv-field label{font-size:.78rem;text-transform:uppercase;letter-spacing:.16em;color:var(--muted);font-weight:700;display:flex;justify-content:space-between;align-items:center}
#reviews .rv-count{font-size:.7rem;letter-spacing:.08em;color:var(--muted);opacity:.7}
#reviews .rv-field input,#reviews .rv-field textarea{background:rgba(0,0,0,.25);border:1px solid var(--line);border-radius:12px;color:var(--paper);padding:.75rem .9rem;font-family:inherit;font-size:.95rem;transition:border-color .2s,background .2s;resize:vertical}
#reviews .rv-field input:focus,#reviews .rv-field textarea:focus{outline:none;border-color:var(--violet);background:rgba(124,58,237,.08)}
#reviews .rv-stars{display:flex;gap:.3rem}
#reviews .rv-star{background:none;border:0;cursor:pointer;font-size:1.8rem;line-height:1;color:rgba(255,255,255,.18);transition:color .18s,transform .18s;padding:.1rem}
#reviews .rv-star:hover{transform:scale(1.15)}
#reviews .rv-star.on{color:var(--gold);text-shadow:0 0 12px rgba(255,194,75,.55)}
#reviews .rv-send{justify-content:center;margin-top:.3rem}
#reviews .rv-send:disabled{opacity:.6;cursor:not-allowed}
#reviews .rv-msg{font-size:.9rem;padding:.7rem .9rem;border-radius:10px;background:rgba(52,210,127,.12);color:var(--matcha);border:1px solid rgba(52,210,127,.3)}
#reviews .rv-msg.err{background:rgba(242,91,181,.12);color:var(--pink);border-color:rgba(242,91,181,.3)}
#reviews .rv-list{display:flex;flex-direction:column;gap:1rem;max-height:none}
#reviews .rv-empty{color:var(--muted);text-align:center;padding:2rem;border:1px dashed var(--line);border-radius:16px}
#reviews .rv-card{background:linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.015));border:1px solid var(--line);border-radius:20px;padding:1.3rem 1.4rem;display:flex;flex-direction:column;gap:.7rem;transition:transform .25s,border-color .25s}
#reviews .rv-card:hover{transform:translateY(-2px);border-color:rgba(255,194,75,.35)}
#reviews .rv-card header{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem}
#reviews .rv-who{display:flex;gap:.75rem;align-items:center}
#reviews .rv-avatar{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:800;background:linear-gradient(135deg,var(--violet),var(--pink));color:#fff;font-size:.95rem}
#reviews .rv-who b{display:block;font-size:.98rem}
#reviews .rv-meta{font-size:.76rem;color:var(--muted)}
#reviews .rv-rate{color:var(--gold);letter-spacing:.1em;font-size:.95rem;white-space:nowrap}
#reviews .rv-rate .rv-off{color:rgba(255,255,255,.15)}
#reviews .rv-card p{color:var(--paper);opacity:.92;font-size:.98rem;line-height:1.55}
`;