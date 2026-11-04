import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUp,
  ExternalLink,
  Cpu,
  Terminal,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Portfolio() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle direct hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle errors gracefully for images and resources
  useEffect(() => {
    const handleImageErrors = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        img.onerror = () => {
          img.src =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage%3C/text%3E%3C/svg%3E';
          img.alt = "Placeholder image";
        };
      });
    };

    handleImageErrors();
    document.addEventListener("DOMContentLoaded", handleImageErrors);

    return () =>
      document.removeEventListener("DOMContentLoaded", handleImageErrors);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
      >
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-2/3 mb-10 md:mb-0 md:pr-10"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Hessam Mamagani
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Senior Software Engineer | Full-Stack & AI Solutions Architect
            </p>
            <p className="text-lg mb-8 text-primary-100 max-w-2xl leading-relaxed">
              Lead architect & developer of 5 enterprise platforms at Pilz Türkiye.
              I design and deliver production systems end-to-end with .NET 10, React 19,
              Next.js 16, Agentic AI & RAG (OpenAI + Claude), and Azure — across
              1,190+ API endpoints serving 2,525+ visitors & corporate users at scale.
            </p>
            <div className="flex gap-5 mb-8 items-center">
              <a
                href="https://github.com/hessam-mamagani"
                target="_blank"
                rel="noreferrer"
                className="bg-white bg-opacity-20 p-2.5 rounded-full hover:bg-opacity-30 transition-all hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/hessam-mamagani"
                target="_blank"
                rel="noreferrer"
                className="bg-white bg-opacity-20 p-2.5 rounded-full hover:bg-opacity-30 transition-all hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:hessam.mamagani@gmail.com"
                className="bg-white bg-opacity-20 p-2.5 rounded-full hover:bg-opacity-30 transition-all hover:scale-110"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-lg hover:shadow-xl"
              >
                View My Work
              </motion.a>
              <motion.a
                href="/cv/Hessam_Mamagani_CV_EN.pdf"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-sm text-white px-5 py-3 rounded-lg font-medium hover:bg-white/25 transition shadow-md"
              >
                <FileText className="w-4 h-4" />
                Download CV (EN)
              </motion.a>
              <motion.a
                href="/cv/Hessam_Mamagani_CV_TR.pdf"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-sm text-white px-5 py-3 rounded-lg font-medium hover:bg-white/25 transition shadow-md"
              >
                <FileText className="w-4 h-4" />
                CV İndir (TR)
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
            }}
            className="md:w-1/3 flex justify-center"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-white bg-opacity-20 shadow-2xl">
              <img
                src="/profile.jpg"
                alt="Hessam Mamagani"
                className="w-full h-full object-cover"
                style={{
                  display: "block",
                  minWidth: "100%",
                  minHeight: "100%",
                }}
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/profile.jpg";
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <About />
      <Experience />

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white" ref={projectsRef}>
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enterprise platforms & open-source tools I architected and built
              end-to-end — serving real operations in production with Agentic AI,
              cloud infrastructure, and automated ERP/CRM workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 - PilzPortal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-6px] transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative group">
                <img
                  src="/images/portal.webp"
                  alt="PilzPortal Dashboard"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <a
                  href="https://www.pilztr.online/portal"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Visit Site
                  </span>
                </a>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  PilzPortal (CRM + ERP)
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">
                  Enterprise operations platform (804 API endpoints, 62 controllers, 120 DB tables)
                  uniting Consulting, Training, Engineering & Product lifecycles, 9 Agentic AI
                  tools, OCR onboarding, Sovos e-Invoicing & fleet cost automation (Arvento GPS, OPET, HGS).
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {[".NET 10", "React 19", "SQL Server", "SignalR", "Agentic AI", "Azure"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Github className="w-4 h-4 mr-1.5" /> Enterprise Private
                  </span>
                  <a
                    href="https://www.pilztr.online/portal"
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 font-semibold hover:text-green-800 transition-colors flex items-center gap-1"
                  >
                    Live Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 2 - EvenTracer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-6px] transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative group">
                <img
                  src="/images/eventracer.png"
                  alt="EvenTracer Platform Dashboard"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <a
                  href="https://www.eventracer.com/en"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Visit Site
                  </span>
                </a>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  EvenTracer (Event & BI SaaS)
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">
                  Multi-tenant exhibition & C-Suite BI SaaS powering 11 industrial symposiums,
                  2,525+ visitors, 1,301 check-ins, 9,045 CRM accounts, 3,108 Phygital VIP
                  QR/ElevenLabs AI voice letters (4.9x B2B conversion), YoY comparative analytics
                  & 18-slide PPTX/PDF executive report decks.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["Next.js 16", "TypeScript", ".NET 10", "CQRS", "ElevenLabs AI", "Redis"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Github className="w-4 h-4 mr-1.5" /> Enterprise SaaS
                  </span>
                  <a
                    href="https://www.eventracer.com/en"
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 font-semibold hover:text-purple-800 transition-colors flex items-center gap-1"
                  >
                    Live Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 3 - InsightfulAI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-6px] transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative bg-gray-50 group">
                <img
                  src="/images/insightful_ai.png"
                  alt="InsightfulAI Platform"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <a
                  href="https://www.insightfulai.online/"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Visit Site
                  </span>
                </a>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  InsightfulAI (LLM & RAG)
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">
                  Multi-provider AI orchestration platform (150 API endpoints, 20 controllers)
                  integrating OpenAI GPT & Anthropic Claude with RAG vector search, Machinery
                  Safety AI Wizard, document Q&A, FIDO2/WebAuthn biometric passkeys & QR login,
                  reducing inquiry response time by 80%.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["OpenAI", "Claude", "RAG", ".NET 10", "React 19", "WebAuthn"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Github className="w-4 h-4 mr-1.5" /> Enterprise Private
                  </span>
                  <a
                    href="https://www.insightfulai.online/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors flex items-center gap-1"
                  >
                    Live Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 4 - WebRunner (SAP GUI & Playwright RPA Engine) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-6px] transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="h-48 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-5 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono">
                    SAP GUI + Playwright RPA
                  </span>
                  <Cpu className="w-5 h-5 text-blue-400" />
                </div>
                <div className="font-mono text-xs text-slate-300 space-y-1 bg-black/30 p-3 rounded-lg border border-white/10">
                  <div className="text-emerald-400">✓ SapHelper x86 COM Bridge Ready</div>
                  <div>→ VA01 SalesOrder | VF01 Billing | XD01</div>
                  <div className="text-blue-300">→ Sovos GİB e-Invoice WS 2.3 Synced</div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  WebRunner (SAP & e-Invoice RPA)
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">
                  Hybrid enterprise RPA engine combining a .NET 8 Worker (31 RPA commands),
                  a 32-bit/64-bit .NET 4.8 COM Interop bridge (SapHelper) for native SAP GUI
                  scripting (VA01, VF01, XD01, ZSD20), Playwright CRM bots, WPF scheduler,
                  SignalR live telemetry & AI self-healing diagnostics — cutting processing time by 80%.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {[".NET 8", "SAP GUI COM", "Playwright", "WPF", "SignalR", "Sovos SOAP"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Github className="w-4 h-4 mr-1.5" /> Enterprise Core Engine
                  </span>
                  <span className="text-blue-600 font-semibold">
                    Pilz Production
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Project 5 - Smart Commit Generator AI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-6px] transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="h-48 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 p-5 flex flex-col justify-between text-white relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-mono">
                    VS Marketplace & Open VSX
                  </span>
                  <Terminal className="w-5 h-5 text-amber-400" />
                </div>
                <div className="font-mono text-xs text-slate-300 space-y-1 bg-black/30 p-3 rounded-lg border border-white/10">
                  <div className="text-amber-300">★ Smart Commit Generator AI v1.4.7</div>
                  <div>→ OpenAI · Gemini · DeepSeek · Groq · Grok · Ollama</div>
                  <div className="text-emerald-400">✓ git merge-tree dry-run & secret scan</div>
                </div>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=Hessam-Mamagani.smart-commit-generator-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> View on Marketplace
                  </span>
                </a>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Smart Commit Generator AI
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">
                  Zero-dependency VS Code, Cursor & Antigravity IDE extension (4,200+ LOC)
                  supporting 6 LLM providers, 14 Git/PR automation commands, custom Activity
                  Bar Webview, in-memory conflict dry-runs (git merge-tree), and pre-commit
                  DevSecOps secret & debug scanners.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["VS Code API", "Node.js", "6 LLM Providers", "Git SCM", "DevSecOps", "OIDC CI/CD"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
                  <a
                    href="https://github.com/Hessam-Mamagani/smart-commit-generator"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-gray-900 font-medium flex items-center"
                  >
                    <Github className="w-4 h-4 mr-1.5" /> Open Source
                  </a>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=Hessam-Mamagani.smart-commit-generator-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-600 font-semibold hover:text-amber-800 transition-colors flex items-center gap-1"
                  >
                    Marketplace <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 6 - n8n Enterprise AI Workflows & SafetyExpertAI */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-6px] transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative group">
                <img
                  src="/images/safety_expert_ai.png"
                  alt="n8n AI Agents & SafetyExpertAI"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  n8n AI Agents & SafetyExpertAI
                </h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed flex-1">
                  Dockerized n8n + PostgreSQL 16 stack on Azure Container Apps hosting a
                  5-skill Natural-Language-to-SQL (NL-to-SQL) Database AI Agent for live
                  executive reporting (revenue, SAP backlog, engineering hours, fleet & HR)
                  plus an automated ISO/IEC/EN machinery safety standards monitor.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {["n8n", "NL-to-SQL Agent", "Azure Container Apps", "PostgreSQL", "Docker", "T-SQL"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-teal-100 text-teal-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Database className="w-4 h-4 mr-1.5" /> Enterprise AI
                  </span>
                  <span className="text-teal-600 font-semibold">
                    Pilz Production
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Skills />
      <Contact />

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Hessam Mamagani</h3>
              <p className="text-gray-400">
                Senior Software Engineer | Full-Stack & AI Solutions Architect
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="/cv/Hessam_Mamagani_CV_EN.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors border border-gray-700 px-3 py-1.5 rounded-lg"
              >
                CV (EN)
              </a>
              <a
                href="/cv/Hessam_Mamagani_CV_TR.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors border border-gray-700 px-3 py-1.5 rounded-lg"
              >
                CV (TR)
              </a>
              <a
                href="https://github.com/hessam-mamagani"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/hessam-mamagani"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:hessam.mamagani@gmail.com"
                className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Hessam Mamagani. All rights reserved.
            </p>
            <p className="text-sm mt-2">
              Built with React, Tailwind CSS, and deployed on GitHub Pages
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed right-6 bottom-6 p-3 rounded-full bg-primary-600 text-white shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
