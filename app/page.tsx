import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import SilkBackground from "@/components/SilkBackground";
import {
  capabilities,
  contact,
  experience,
  honors,
  projects,
} from "@/lib/resume";

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M2 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* Hero — centered statement over the ambient silk field */}
        <section className="hero">
          <SilkBackground />
          <div className="hero-inner">
            <p className="eyebrow fade-item d1">
              Machine learning · Data · Automation
            </p>
            <h1 className="hero-title">
              <span className="hero-line">
                <span>Praneeth Reddy</span>
              </span>
              <span className="hero-line">
                <span>
                  Mandalapu<span className="gold-stop">.</span>
                </span>
              </span>
            </h1>
            <p className="hero-copy fade-item d2">
              Computer science undergraduate at UC Santa Cruz building reliable,
              data-driven systems — from LLM evaluation and benchmark design to
              telemetry models for electric racecars.
            </p>
            <div className="hero-ctas fade-item d3">
              <a href="#work" className="btn-primary">
                View selected work
                <span className="disc">
                  <ArrowRight />
                </span>
              </a>
              <a href={contact.resume} className="link-underline" download>
                Download résumé
              </a>
            </div>
            <p className="status fade-item d4">
              <span className="status-dot" aria-hidden />
              Currently — Automation intern, California DMV
            </p>
          </div>
        </section>

        {/* Experience — left label, right editorial list */}
        <section id="experience" className="section">
          <div className="container-lux split">
            <Reveal className="split-label">
              <p className="eyebrow">Experience</p>
              <h2 className="display-section" style={{ marginTop: "1.5rem" }}>
                Where I&rsquo;ve worked
              </h2>
            </Reveal>
            <div>
              {experience.map((xp, i) => (
                <Reveal key={xp.org} delay={i * 80}>
                  <article className="xp-row">
                    <p className="xp-dates">{xp.dates}</p>
                    <div>
                      <h3 className="heading-item">{xp.role}</h3>
                      <p className="xp-org">
                        {xp.org} — {xp.place}
                      </p>
                      <p className="xp-sum">{xp.summary}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Selected work — dominant + supporting Doppelrand pair */}
        <section id="work" className="section" style={{ paddingTop: 0 }}>
          <div className="container-lux">
            <Reveal>
              <p className="eyebrow">Selected work</p>
              <h2 className="display-section" style={{ marginTop: "1.5rem" }}>
                Things I&rsquo;ve built
              </h2>
            </Reveal>
            <div className="work-grid" style={{ marginTop: "4rem" }}>
              {projects.map((project, i) => (
                <Reveal
                  key={project.title}
                  className={i === 0 ? "work-lead" : ""}
                  delay={i * 120}
                >
                  <article className="card-shell">
                    <div className="card-core">
                      <p className="card-meta">
                        <span className="award">{project.award}</span>
                        <br />
                        {project.meta}
                      </p>
                      <h3 className="card-title">{project.title}</h3>
                      <p className="card-body">{project.body}</p>
                      {project.link && (
                        <a
                          href={project.link.href}
                          className="card-link link-underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link.label}
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities — diptych on the tonal band */}
        <section id="capabilities" className="band section">
          <div className="container-lux split">
            <Reveal className="split-label">
              <p className="eyebrow">Capabilities</p>
              <h2 className="display-section" style={{ marginTop: "1.5rem" }}>
                What I work with
              </h2>
            </Reveal>
            <div>
              {capabilities.map((group, i) => (
                <Reveal key={group.label} delay={i * 80}>
                  <div className="cap-group">
                    <p className="cap-label">{group.label}</p>
                    <p className="cap-items">
                      {group.items.map((item, j) => (
                        <span key={item}>
                          {item}
                          {j < group.items.length - 1 && (
                            <span className="dot" aria-hidden>
                              ·
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Education & honors — the archival register, small on purpose */}
        <section id="education" className="section-tight">
          <div className="container-lux">
            <Reveal className="edu">
              <p className="eyebrow">Education & honors</p>
              <h2 className="display-section" style={{ marginTop: "1.5rem" }}>
                University of California, Santa&nbsp;Cruz
              </h2>
              <p
                className="mono text-secondary"
                style={{ marginTop: "1.25rem", fontSize: "0.8125rem" }}
              >
                B.S. Computer Science · 2025 — 2029
              </p>
              <p
                className="text-secondary measure"
                style={{ margin: "1.5rem auto 0", fontSize: "0.9375rem" }}
              >
                Coursework in Python, C, assembly, discrete mathematics, vector
                calculus, and data structures &amp; algorithms.
              </p>
              <div style={{ marginTop: "3rem" }}>
                {honors.map((honor) => (
                  <div key={honor.text} className="honor-row">
                    <span>{honor.text}</span>
                    <span className="honor-year">{honor.year}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact — banner email, bottom-right meta cluster */}
        <section id="contact" className="section">
          <div className="container-lux">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2
                className="display-section measure"
                style={{ marginTop: "1.5rem", marginBottom: "3.5rem" }}
              >
                Have a role or a project in mind?
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <a href={`mailto:${contact.email}`} className="email-banner">
                {contact.email}
              </a>
              <div className="contact-meta">
                <a href={contact.phoneHref}>{contact.phone}</a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <span>{contact.location}</span>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="container-lux">
          <footer className="footer">
            <span>Praneeth Reddy Mandalapu — © 2026</span>
            <span>Onyx &amp; Ivory · Set in Bodoni Moda</span>
          </footer>
        </div>
      </main>
    </>
  );
}
