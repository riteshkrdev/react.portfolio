import React, { useEffect, useRef, useState } from "react";

/* -----------------------------------------
   useScrollSpy
------------------------------------------ */
function useScrollSpy(sections) {
  const sectionRefs = useRef({});
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0].id;

      sections.forEach(({ id }) => {
        const el = sectionRefs.current[id];
        if (el && pos >= el.offsetTop) current = id;
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { sectionRefs, active };
}

/* -----------------------------------------
   COMPONENTS
------------------------------------------ */

/* NAVBAR */
/* ---------- Navbar (drop-in) ---------- */
function Navbar({ sections, active, onNav }) {
  const [open, setOpen] = React.useState(false);

  // Close mobile menu when active changes (useful after clicking a link)
  React.useEffect(() => setOpen(false), [active]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-[#0b0d10]/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNav("home")}
              className="text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded"
              aria-label="Go to home"
            >
              Ritesh Kumar
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onNav(id)}
                aria-current={active === id ? "page" : undefined}
                className={
                  "text-sm px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 " +
                  (active === id
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-gray-200")
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="p-2 rounded-md inline-flex items-center justify-center text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden bg-[#0b0d10] border-t border-gray-800 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              aria-current={active === id ? "page" : undefined}
              className={
                "w-full text-left px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 " +
                (active === id ? "text-white font-medium bg-gray-900" : "text-gray-400 hover:text-gray-200 hover:bg-gray-900")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}


/* HERO */
const Hero = ({ refs }) => (
  <header
    ref={(el) => (refs.current["home"] = el)}
    id="home"
    className="min-h-screen flex items-center justify-center bg-[#0a0a0f] pt-20"
  >
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
  
  {/* IMAGE FIRST ON MOBILE */}
  <div className="order-1 md:order-2 flex justify-center">
    <div className="relative">
      <img
        src="profile.png"
        alt="Profile"
        className="
          relative 
          w-full
          max-w-xs
          sm:max-w-sm
          md:w-72 md:h-72
          lg:w-80 lg:h-80
          h-72
          rounded-xl
          object-cover
          border border-white/10
          shadow-lg
        "
      />
    </div>
  </div>

  {/* TEXT SECOND ON MOBILE */}
  <div className="order-2 md:order-1">
    <p className="text-gray-400 mb-1 tracking-wide">Hello, I’m</p>

    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
      Ritesh Kumar
    </h1>

    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
      Frontend Engineer specialized in React, Angular & built high-performance web applications over 2yrs.
    </p>

    <a
      href="https://linkedin.com/in/riteshkrdev"
      target="_blank"
      rel="noreferrer"
      className="px-6 py-3 border border-cyan-500 text-cyan-400 rounded-md hover:bg-cyan-500 hover:text-black transition-colors duration-200"
    >
      LinkedIn
    </a>
    <a
      href="https://github.com/riteshkrdev"
      target="_blank"
      rel="noreferrer"
      className="ms-2 px-6 py-3 border border-cyan-500 text-cyan-400 rounded-md hover:bg-cyan-500 hover:text-black transition-colors duration-200"
    >
      Github
    </a>
  </div>

</div>

  </header>
);


/* ABOUT */
const About = ({ refs }) => (
  <section
    ref={(el) => (refs.current["about"] = el)}
    id="about"
    className="min-h-screen flex items-center bg-[#0a0a0f] py-20"
  >
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-semibold text-white mb-6">
        About Me
      </h2>

      <p className="text-gray-300 text-lg leading-relaxed">
        Hi, I’m a results-driven Frontend Engineer with 2+ years of experience designing and developing dynamic, user-centric web applications. I thrive in fast-paced, collaborative environments where performance, scalability, and clean architecture truly matter.
      </p>
    </div>
  </section>
);


/* EXPERIENCE */
const Experience = ({ refs }) => (
  <section
    ref={(el) => (refs.current["experience"] = el)}
    id="experience"
    className="min-h-screen flex items-center bg-[#0a0a0f] py-20"
  >
    <div className="max-w-6xl mx-auto px-6 w-full">
      <h2 className="text-3xl font-semibold text-white mb-12">
        Experience
      </h2>

      {/* DESKTOP TIMELINE */}
      <div className="relative hidden md:block">
        {/* center line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-700/50"></div>

        <div className="space-y-16">

          {/* ITEM 1 */}
          <div className="flex items-start gap-10 relative">

            {/* LEFT SIDE */}
            <div className="w-1/2 text-right">
              <h3 className="text-xl font-medium text-white">
                Software Developer
              </h3>
              <p className="text-gray-400">Reorg360 Inc. / Advanta</p>
            </div>

            {/* Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/2">
              <span className="text-sm text-gray-500">Apr 2022 – Feb 2024</span>
              <p className="text-gray-400 mt-2">
                Built enterprise apps using Angular & React. Improved UI performance & accessibility.
              </p>
            </div>

          </div>

          {/* ITEM 2 */}
          <div className="flex items-start gap-10 relative">

            {/* LEFT SIDE */}
            <div className="w-1/2 text-right">
              <h3 className="text-xl font-medium text-white">
                Software Developer Intern
              </h3>
              <p className="text-gray-400">Reorg360 Inc. / Advanta</p>
            </div>

            {/* Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/2">
              <span className="text-sm text-gray-500">Jan 2022 – Mar 2022</span>
              <p className="text-gray-400 mt-2">
                Built UI components, fixed bugs, and improved module architecture.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE CARDS ONLY */}
      <div className="md:hidden mt-12 space-y-6">

        {/* Card 1 */}
        <div className="p-5 bg-[#111118] rounded-lg border border-gray-800">
          <h3 className="text-white text-lg font-medium">Software Developer</h3>
          <p className="text-gray-400 text-sm">Reorg360 Inc. / Advanta</p>
          <p className="text-gray-400 mt-2 text-sm">
            Built enterprise apps using Angular & React. Improved performance and accessibility.
          </p>
          <span className="text-xs text-gray-500 block mt-3">
            Apr 2022 – Feb 2024
          </span>
        </div>

        {/* Card 2 */}
        <div className="p-5 bg-[#111118] rounded-lg border border-gray-800">
          <h3 className="text-white text-lg font-medium">Software Developer Intern</h3>
          <p className="text-gray-400 text-sm">Reorg360 Inc. / Advanta</p>
          <p className="text-gray-400 mt-2 text-sm">
            Built UI components, fixed bugs, improved architecture.
          </p>
          <span className="text-xs text-gray-500 block mt-3">
            Jan 2022 – Mar 2022
          </span>
        </div>

      </div>

    </div>
  </section>
);


/* EDUCATION */
const Education = ({ refs }) => (
  <section
    ref={(el) => (refs.current["education"] = el)}
    id="education"
    className="min-h-screen flex items-center bg-[#0d0d14] py-20"
  >
    <div className="max-w-6xl mx-auto px-6 w-full">
      <h2 className="text-3xl font-semibold text-white mb-12">
        Education
      </h2>

      {/* DESKTOP TIMELINE */}
      <div className="relative hidden md:block">
        {/* center line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-700/40"></div>

        <div className="space-y-16">

          {/* ITEM 1 */}
          <div className="flex items-start gap-10 relative">

            {/* LEFT SIDE */}
            <div className="w-1/2 text-right">
              <h3 className="text-xl font-medium text-white">
                Bachelor of Technology
              </h3>
              <p className="text-gray-400">MRSPTU, Patiala</p>
            </div>

            {/* Dot */}
            <div className="absolute left-1/2 -translate-x-1/2 mt-2">
              <div className="w-4 h-4 rounded-full bg-[#c45cf2] shadow-[0_0_10px_#c45cf2]"></div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-1/2">
              <span className="text-sm text-gray-500">2017 – 2021</span>
              <p className="text-gray-400 mt-2">
                Focused on Computer Science fundamentals. Learned algorithms, web development and system design.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden mt-12 space-y-6">

        {/* Card */}
        <div className="p-5 bg-[#111118] rounded-lg border border-gray-800">
          <h3 className="text-white text-lg font-medium">Bachelor of Technology</h3>
          <p className="text-gray-400 text-sm">MRSPTU, Patiala</p>

          <p className="text-gray-400 mt-2 text-sm">
            Focused on algorithms, web development, and system design fundamentals.
          </p>

          <span className="text-xs text-gray-500 block mt-3">
            2017 – 2021
          </span>
        </div>

      </div>

    </div>
  </section>
);



/* SKILLS */
const Skills = ({ refs }) => {
  const skills = [
    "React", "React Hooks", "React Router", "Redux", "Context API",
    "Angular", "RxJS", "NgRx", "Angular Universal",
    "JavaScript", "TypeScript",
    "HTML", "CSS", "Tailwind", "SCSS", "Responsive UI",
    "Performance Optimization", "Testing", "API Integration",
    "Git / GitHub"
  ];

  return (
    <section
      ref={(el) => (refs.current["skills"] = el)}
      id="skills"
      className="py-24 bg-[#0a0a0f] min-h-screen flex items-start"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        <h2 className="text-3xl font-semibold text-white mb-10">
          Skills
        </h2>

        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="
                px-4 py-2 text-sm text-gray-300
                bg-[#12121a] border border-gray-700 rounded-full
                transition-transform duration-200 ease-out
                hover:bg-[#1f1f2b] hover:text-white
                hover:border-gray-500 hover:scale-[1.07]
                cursor-pointer
              "
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};



/* CONTACT */
const Contact = ({ refs }) => (
  <section
    ref={(el) => (refs.current["contact"] = el)}
    id="contact"
    className="py-24 bg-[#0d0d14] min-h-screen flex items-center"
  >
    <div className="max-w-3xl mx-auto px-6 w-full text-center">
      <h2 className="text-3xl font-semibold text-white mb-6">
        Contact
      </h2>

      <p className="text-gray-400 mb-10 text-lg">
        Open to opportunities. You’ll reach me fastest on LinkedIn.
      </p>

      <div className="space-y-5 max-w-xs mx-auto">

        {/* LinkedIn */}
        <a
          className="
            block px-6 py-3 rounded-md font-medium
            bg-[#1a1a24] text-gray-300 border border-gray-700
            hover:bg-[#23232f] hover:text-white
            transition-all duration-200
            hover:scale-[1.03]
          "
          href="https://linkedin.com/in/riteshkrdev"
          target="_blank"
          rel="noreferrer"
        >
          Connect on LinkedIn
        </a>

        {/* Email */}
        <a
          className="
            block px-6 py-3 rounded-md font-medium
            border border-gray-700 text-gray-300
            hover:bg-[#23232f] hover:text-white
            transition-all duration-200
            hover:scale-[1.03]
          "
          href="mailto:riteshkumar.dev2@gmail.com"
        >
          Email Me
        </a>

      </div>
    </div>
  </section>
);


const Projects = ({ refs }) => {
  const projectList = [
    {
      title: "Task Forge",
      desc: "Task management application, similar to jira.",
      github: "https://github.com/riteshkrdev/task-forge",
      demo: "https://task-forge-nine.vercel.app/",
    },
    // {
    //   title: "Project Two",
    //   desc: "Another project with clean UI and proper frontend engineering.",
    //   github: "#",
    //   demo: "#",
    // },
    // {
    //   title: "Project Three",
    //   desc: "You can add more details later. This card layout scales perfectly.",
    //   github: "#",
    //   demo: "#",
    // },
  ];

  return (
    <section
      ref={(el) => (refs.current["projects"] = el)}
      id="projects"
      className="py-24 bg-[#0a0a0f] min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-white mb-10">
          Projects
        </h2>

        {/* GRID - Desktop / Single Column - Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((p, i) => (
            <div
              key={i}
              className="
                bg-[#12121a] border border-gray-800 rounded-xl p-6
                transition-all duration-200
                hover:bg-[#1a1a24] hover:border-gray-600 hover:scale-[1.03]
              "
            >
              <h3 className="text-white text-lg font-medium mb-2">
                {p.title}
              </h3>

              <p className="text-gray-400 text-sm mb-5">
                {p.desc}
              </p>

              <div className="flex gap-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex-1 text-center px-4 py-2 rounded-md text-sm
                    border border-gray-700 text-gray-300
                    hover:bg-[#23232f] hover:text-white
                    transition-all duration-200
                  "
                >
                  GitHub
                </a>

                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex-1 text-center px-4 py-2 rounded-md text-sm
                    bg-[#1a1a24] text-gray-300 border border-gray-700
                    hover:bg-[#2a2a35] hover:text-white
                    transition-all duration-200
                  "
                >
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* -----------------------------------------
   APP (FINAL)
------------------------------------------ */
export default function Layout() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Work" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const { sectionRefs, active } = useScrollSpy(sections);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };

  return (
    <div className="bg-[#0a0a0f] text-gray-200 min-h-screen flex flex-col">

  <Navbar sections={sections} active={active} onNav={scrollTo} />

  {/* Main content takes full remaining height */}
  <main className="flex-1 pt-16">
    <Hero refs={sectionRefs} />
    <About refs={sectionRefs} />
    <Experience refs={sectionRefs} />
    <Education refs={sectionRefs} />
    <Projects refs={sectionRefs} />
    <Skills refs={sectionRefs} />
    <Contact refs={sectionRefs} />
  </main>

  {/* Footer always at bottom */}
  <Footer />

</div>
  );
}


const Footer = () => (
  <footer className="w-full bg-[#0a0a0f] border-t border-white/10 py-6 mt-16">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <p className="text-gray-400 text-sm">
        Created by Ritesh • Built with React • 2025
      </p>
    </div>
  </footer>
);
