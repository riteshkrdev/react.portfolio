import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import RainEffect from "./RainEffect";

/* -----------------------------------------
   HOOKS & UTILS
------------------------------------------ */
function useScrollSpy(sections) {
  const sectionRefs = useRef({});
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      let currentId = sections[0].id;

      sections.forEach(({ id }) => {
        const element = sectionRefs.current[id];
        if (element && element.offsetTop <= scrollPosition) {
          currentId = id;
        }
      });
      setActive(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return { sectionRefs, active };
}

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/* -----------------------------------------
   COMPONENTS
------------------------------------------ */

/* NAVBAR */
function Navbar({ sections, active, onNav }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   // 1. Create references
  const menuRef = useRef(null);   // For the dropdown menu
  const buttonRef = useRef(null); // For the hamburger button

  useEffect(() => {
    // 2. The logic to close menu
    const handleClickOutside = (event) => {
      // If menu is open AND click is NOT inside menu AND click is NOT on button
      if (
        isOpen && 
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    // 3. Listen for clicks everywhere
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); 

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-[#030712]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button  
          ref={buttonRef}      
            onClick={() => onNav("home")} 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          >
            Ritesh Kumar.
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onNav(id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  active === id ? "text-cyan-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`md:hidden absolute w-full bg-[#030712] border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-4 space-y-2">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                onNav(id);
                setIsOpen(false);
              }}
              className={`block w-full text-left py-3 text-sm font-medium ${
                active === id ? "text-cyan-400" : "text-gray-400"
              }`}
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
  <section
    ref={(el) => (refs.current["home"] = el)}
    id="home"
    className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
  >
      <RainEffect />
    {/* Background Glow */}
    <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />

    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="order-2 lg:order-1"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Available for work
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Digital</span> <br />
          Experiences.
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
          I'm Ritesh, a Frontend Engineer specialized in Angular and React. I craft high-performance, accessible web applications with clean architecture.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://linkedin.com/in/riteshkrdev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
          <a
            href="https://github.com/riteshkrdev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Github size={20} /> GitHub
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="order-1 lg:order-2 flex justify-center lg:justify-end"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-2xl rotate-6 opacity-20 blur-lg"></div>
          <img
            src="profile.png" // Ensure this path is correct
            alt="Ritesh Kumar"
            className="relative w-full h-full object-cover rounded-2xl border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ABOUT */
const About = ({ refs }) => (
  <section
    ref={(el) => (refs.current["about"] = el)}
    id="about"
    className="py-24 bg-[#050914]"
  >
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> About Me
        </h2>
        
        <div className="prose prose-invert prose-lg text-gray-400">
          <p className="leading-loose">
            Hi, I’m a results-driven <span className="text-white font-medium">Frontend Engineer</span> with 2+ years of experience designing and developing dynamic, user-centric web applications. 
          </p>
          <p className="leading-loose mt-4">
            My journey involves a deep dive into the JavaScript ecosystem, moving from vanilla JS to complex <span className="text-cyan-400">Angular</span> and <span className="text-red-400">React</span> architectures. I thrive in collaborative environments where performance, scalability, and clean code are priorities. When I'm not coding, I'm exploring new UI trends or optimizing user centric applications.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

/* EXPERIENCE */
const Experience = ({ refs }) => {
  const experiences = [
    {
      role: "Software Developer",
      company: "Reorg360 Inc. / Advanta",
      period: "Apr 2022 – Feb 2024",
      desc: "Spearheaded the migration of legacy codebases to Angular. Improved UI performance by 40% through lazy loading and memory optimization. Collaborated with UX teams to implement accessible design systems."
    },
    {
      role: "Software Developer Intern",
      company: "Reorg360 Inc. / Advanta",
      period: "Jan 2022 – Mar 2022",
      desc: "Assisted in building reusable UI components. Fixed critical bugs in the production environment and optimized API integration logic."
    }
  ];

  return (
    <section
      ref={(el) => (refs.current["experience"] = el)}
      id="experience"
      className="py-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
             <span className="w-8 h-1 bg-purple-500 rounded-full"></span> Experience
          </h2>

          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                  <span className="text-sm font-mono text-cyan-400/80">{exp.period}</span>
                </div>
                
                <h4 className="text-gray-400 mb-4 font-medium">{exp.company}</h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* PROJECTS */
const Projects = ({ refs }) => {
  const projectList = [
    {
      title: "Task Forge",
      desc: "A Jira-inspired task management application featuring drag-and-drop boards, ticket management, and sprint planning.",
      tags: ["React", "Tailwind", "DnD Kit", "Vercel"],
      github: "https://github.com/riteshkrdev/task-forge",
      demo: "https://task-forge-nine.vercel.app/",
      icon: <Terminal size={32} className="text-cyan-400" />
    },
  ];

  return (
    <section
      ref={(el) => (refs.current["projects"] = el)}
      id="projects"
      className="py-24 bg-[#050914]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="mb-6 bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {p.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium text-cyan-200 bg-cyan-900/20 rounded-full border border-cyan-900/30">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <Github size={16} /> Code
                  </a>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors ml-auto">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* SKILLS */
const Skills = ({ refs }) => {
  const categories = [
    { name: "Frontend", items: ["Anuglar", "React", "TypeScript", "Redux"] },
    { name: "Styling", items: ["Tailwind CSS", "SCSS", "Material UI"] },
    { name: "Tools", items: ["Git", "Webpack", "Vite", "Jest", "Figma"] }
  ];

  return (
    <section
      ref={(el) => (refs.current["skills"] = el)}
      id="skills"
      className="py-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
             <span className="w-8 h-1 bg-purple-500 rounded-full"></span> Technical Skills
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                   {cat.name === "Frontend" && <Code2 size={20} className="text-cyan-400" />}
                   {cat.name === "Styling" && <Globe size={20} className="text-purple-400" />}
                   {cat.name === "Tools" && <Cpu size={20} className="text-green-400" />}
                   {cat.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs text-gray-300 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* EDUCATION */
const Education = ({ refs }) => (
  <section
    ref={(el) => (refs.current["education"] = el)}
    id="education"
    className="py-24 bg-[#050914]"
  >
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
         variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
           <span className="w-8 h-1 bg-cyan-500 rounded-full"></span> Education
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-start bg-[#0a0a0f] border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors">
            <div className="min-w-[60px] h-[60px] rounded-full bg-cyan-900/20 flex items-center justify-center text-cyan-400">
               <span className="text-2xl font-bold">B</span>
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Bachelor of Technology</h3>
                <span className="text-sm text-gray-500 font-mono">2017 – 2021</span>
              </div>
              <p className="text-cyan-400 mb-4">MRSPTU, Patiala</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Focused on Computer Science fundamentals including Data Structures, Algorithms, and System Design. Capstone project involved building a distributed inventory system.
              </p>
            </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* CONTACT */
const Contact = ({ refs }) => (
  <section
    ref={(el) => (refs.current["contact"] = el)}
    id="contact"
    className="py-32 relative overflow-hidden"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
    
    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to start a project?
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:ritesh.frontend@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full transition-all hover:scale-105"
          >
            <Mail size={20} /> Say Hello
          </a>
          <a
             href="https://linkedin.com/in/riteshkrdev"
             target="_blank"
             rel="noreferrer"
             className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a1a24] hover:bg-[#23232f] text-white border border-white/10 rounded-full transition-all hover:scale-105"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

/* FOOTER */
const Footer = () => (
  <footer className="py-8 bg-[#030712] border-t border-white/5 text-center">
    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
      Designed & Built by <span className="text-white">Ritesh Kumar</span> 
    </p>
  </footer>
);

/* -----------------------------------------
   MAIN LAYOUT
------------------------------------------ */
export default function Layout() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  const { sectionRefs, active } = useScrollSpy(sections);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <div className="bg-[#030712] text-slate-200 min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar sections={sections} active={active} onNav={scrollTo} />
      
      <main className="flex-1">
        <Hero refs={sectionRefs} />
        <About refs={sectionRefs} />
        <Experience refs={sectionRefs} />
        <Projects refs={sectionRefs} />
        <Skills refs={sectionRefs} />
        <Education refs={sectionRefs} />
        <Contact refs={sectionRefs} />
      </main>

      <Footer />
    </div>
  );
}
