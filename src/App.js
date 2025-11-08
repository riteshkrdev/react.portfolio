import { useEffect, useRef, useState } from "react";


function App() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    // { id: 'projects', label: 'Projects' },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const sectionRefs = useRef({});
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = "home";
      sections.forEach(({ id }) => {
        const el = sectionRefs.current[id];
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) current = id;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const y = el.offsetTop;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="rp-root">
      <nav className="rp-nav">
        <div className="rp-brand">Ritesh</div>
        <div className="rp-nav-links">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              className={`rp-nav-link ${active === id ? "active" : ""}`}
              onClick={() => scrollTo(id)}
              aria-current={active === id ? "page" : undefined}
            >
              {label}
            </button>
          ))}
          {/* <button className="rp-cta" onClick={() => scrollTo('contact')}>Contact</button> */}
        </div>
      </nav>

      <header
        ref={(el) => (sectionRefs.current["home"] = el)}
        id="home"
        className="rp-section rp-hero"
      >
        <div className="rp-hero-grid">
          <div className="rp-hero-content">
            <p className="rp-eyebrow">Hello, I'm</p>
            <h1 className="rp-title">Ritesh Kumar</h1>
            <p className="rp-subtitle">
              Frontend Engineer • React • Expert in Scalable & High-Performance
              Web Applications
            </p>
            <div className="rp-hero-actions">
              {/* <button
                className="rp-btn primary"
                onClick={() => scrollTo("projects")}
              >
                View Projects
              </button> */}
              <a
                className="rp-btn ghost"
                href="https://www.linkedin.com/in/riteshkrdev"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="rp-hero-photo">
            <img src={process.env.PUBLIC_URL + "/profile.png"} alt="Profile" />
          </div>
        </div>
        <div className="rp-dots" aria-hidden="true"></div>
      </header>

      <main>
        <section
          ref={(el) => (sectionRefs.current["about"] = el)}
          id="about"
          className="rp-section"
        >
          <h2>About</h2>
          <p>
            👋 Hi, I’m a passionate Frontend Engineer with 2+ years of
            experience, focused on delivering scalable, high-performance web
            applications.
          </p>
        </section>

        <section
          ref={(el) => (sectionRefs.current["experience"] = el)}
          id="experience"
          className="rp-section"
        >
          <h2>Experience</h2>
          <ol className="rp-timeline">
            <li className="rp-timeline-item">
              <div className="rp-tl-bullet" aria-hidden="true"></div>
              <div className="rp-tl-content rp-card">
                <div className="rp-tl-header">
                  <h3>Software Developer • Reorg360 Inc. / Advanta </h3>
                  <span className="rp-tl-date">April 2022 — February 2024</span>
                </div>
                <p>
                  Developed and maintained web applications using Angular and
                  React, optimizing performance and user experience.
                </p>
              </div>
            </li>
            <li className="rp-timeline-item">
              <div className="rp-tl-bullet" aria-hidden="true"></div>
              <div className="rp-tl-content rp-card">
                <div className="rp-tl-header">
                  <h3>Software Developer Intern • Reorg360 Inc. / Advanta </h3>
                  <span className="rp-tl-date">January 2022 — March 2022</span>
                </div>
                <p>
                  Implemented features, fixed UI bugs, and contributed to
                  component modules and accessibility.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* <section ref={(el) => (sectionRefs.current['projects'] = el)} id="projects" className="rp-section">
          <h2>Projects</h2>
          <div className="rp-grid">
            <article className="rp-card">
              <h3>Portfolio Website</h3>
              <p>Single-page, mobile-first portfolio built with React and custom CSS.</p>
              <a className="rp-link" href="https://github.com/your-handle/portfolio" target="_blank" rel="noreferrer">GitHub</a>
            </article>
            <article className="rp-card">
              <h3>UI Components Library</h3>
              <p>Reusable, accessible React components with a focus on performance.</p>
              <a className="rp-link" href="https://github.com/your-handle/ui-library" target="_blank" rel="noreferrer">GitHub</a>
            </article>
            <article className="rp-card">
              <h3>Analytics Dashboard</h3>
              <p>Responsive dashboard with charts, filters, and dark mode support.</p>
              <a className="rp-link" href="https://github.com/your-handle/analytics-dashboard" target="_blank" rel="noreferrer">GitHub</a>
            </article>
          </div>
        </section> */}

        <section
          ref={(el) => (sectionRefs.current["education"] = el)}
          id="education"
          className="rp-section"
        >
          <h2>Education</h2>
          <div className="rp-card">
            <h3>Bachelor of Technology • MRS PTU University </h3>
            <p className="rp-muted">2017 - 2021</p>
            <p>
              Major in Computer Science and Engineering. Coursework: Data
              Structures, Web Development, Algorithms.
            </p>
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current["skills"] = el)}
          id="skills"
          className="rp-section"
        >
          <h2>Skills</h2>
          <ul className="rp-chips">
            <li>React</li>
            <li>Angular</li>
            <li>JavaScript (ES6+)</li>
            <li>TypeScript</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Tailwind CSS</li>
            <li>Responsive Design</li>
            <li>Performance</li>
            <li>Testing</li>
            <li>Git/GitHub</li>
          </ul>
        </section>

        <section
          ref={(el) => (sectionRefs.current["contact"] = el)}
          id="contact"
          className="rp-section rp-contact"
        >
          <h2>Contact</h2>
          <p>Open to opportunities. The fastest way to reach me is LinkedIn.</p>
          <a
            className="rp-btn primary wide"
            href="https://www.linkedin.com/in/riteshkrdev"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn
          </a>
          <a
            className="rp-btn ghost wide"
            href="mailto:riteshkumar.dev2@gmail.com"
          >
            Email me
          </a>
        </section>
      </main>

      {/* footer nav removed per request */}
    </div>
  );
}

export default App;
