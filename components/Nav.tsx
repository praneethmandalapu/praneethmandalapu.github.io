"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Theme = "onyx" | "ivory";

// The <html> data attributes are the single source of truth for theme and
// motion — the pre-paint init script sets them, the switches mutate them,
// and SilkBackground observes them. Nav re-renders through this store.
function subscribeToRoot(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-motion"],
  });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "ivory" ? "ivory" : "onyx";
const getMotion = (): boolean =>
  document.documentElement.dataset.motion !== "off";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const theme = useSyncExternalStore(subscribeToRoot, getTheme, () => "onyx");
  const motion = useSyncExternalStore(subscribeToRoot, getMotion, () => true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  const applyTheme = (next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private browsing */
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "onyx" ? "#121110" : "#f6f2eb");
  };

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Read from the DOM, not the render closure — rapid toggles stay correct.
    const next: Theme = getTheme() === "onyx" ? "ivory" : "onyx";
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || reduced || document.hidden) {
      applyTheme(next);
      return;
    }

    // The signature moment: a slow radial veil sweeping from the control.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const root = document.documentElement;
    root.style.setProperty("--veil-x", `${x}px`);
    root.style.setProperty("--veil-y", `${y}px`);
    root.style.setProperty("--veil-r", `${r}px`);
    const transition = document.startViewTransition(() => applyTheme(next));
    // The transition can be skipped (tab hidden, rapid toggles) — the theme
    // is already applied, so a skipped veil is fine.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  const toggleMotion = () => {
    const next = getMotion() ? "off" : "on";
    document.documentElement.dataset.motion = next;
    try {
      localStorage.setItem("motion", next);
    } catch {
      /* private browsing */
    }
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden style={{ height: 1 }} />
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container-lux nav-inner">
          <a href="#main" className="wordmark">
            <span className="full">Praneeth Reddy Mandalapu</span>
            <span className="initials">P.&thinsp;R.&thinsp;M.</span>
          </a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#experience">Experience</a>
            <a href="#work">Work</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-controls">
            <button
              type="button"
              className="theme-switch"
              onClick={toggleMotion}
              aria-pressed={motion}
              aria-label={`Turn background motion ${motion ? "off" : "on"}`}
            >
              <span className="opt" data-active={motion}>
                Motion
              </span>
              <span className="sep" aria-hidden>
                /
              </span>
              <span className="opt" data-active={!motion}>
                Still
              </span>
            </button>
            <button
              type="button"
              className="theme-switch"
              onClick={toggleTheme}
              aria-pressed={theme === "ivory"}
              aria-label={`Switch to ${theme === "onyx" ? "Ivory" : "Onyx"} theme`}
            >
              <span className="opt" data-active={theme === "onyx"}>
                Onyx
              </span>
              <span className="sep" aria-hidden>
                /
              </span>
              <span className="opt" data-active={theme === "ivory"}>
                Ivory
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
