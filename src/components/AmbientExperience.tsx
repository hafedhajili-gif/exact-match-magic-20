import { useEffect } from "react";

export default function AmbientExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const handlePointerMove = (event: PointerEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-orb ambient-orb-a" />
        <div className="ambient-orb ambient-orb-b" />
        <div className="ambient-orb ambient-orb-c" />
        <div className="ambient-grid" />
        <div className="ambient-noise" />
      </div>
      <div className="cursor-spotlight pointer-events-none fixed inset-0 z-[5]" aria-hidden="true" />
    </>
  );
}
