import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Portfolio() {
  // Handle direct hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for the page to load and then scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  // Handle errors gracefully for images and resources
  useEffect(() => {
    // Add error handler for images
    const handleImageErrors = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        img.onerror = () => {
          // Fixed SVG data URL
          img.src =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EImage%3C/text%3E%3C/svg%3E';
          img.alt = "Placeholder image";
        };
      });
    };

    // Run after DOM is fully loaded
    handleImageErrors();
    document.addEventListener("DOMContentLoaded", handleImageErrors);

    return () =>
      document.removeEventListener("DOMContentLoaded", handleImageErrors);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Section animations with intersection observer
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
              Full-Stack Developer | AI & Cloud Solutions
            </p>
            <p className="text-lg mb-8 text-primary-100 max-w-2xl leading-relaxed">
              I craft modern, scalable applications with cutting-edge
              technologies, focusing on exceptional user experiences and robust
              backend systems.
            </p>
            <div className="flex gap-6 mb-8">
              <a
                href="https://github.com/hessam-mamagani"
                target="_blank"
                rel="noreferrer"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/hessam-mamagani"
                target="_blank"
                rel="noreferrer"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:hessam.mamagani@gmail.com"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all hover:scale-110"
                aria-label="Email Contact"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="./cv/Hessam_Mamagani_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all hover:scale-110"
                aria-label="Download CV"
              >
                <FileText className="w-6 h-6" />
              </a>
            </div>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition shadow-lg hover:shadow-xl"
            >
              View My Work
            </motion.a>
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
                  display: 'block',
                  minWidth: '100%',
                  minHeight: '100%',
                }}
                loading="eager"
                onError={(e) => {
                  console.log('First image failed to load, trying alternate path');
                  e.target.onerror = null;
                  e.target.src = '/images/profile.jpg';
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <About />

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
              A showcase of my recent work, demonstrating my expertise in
              full-stack development, AI integration, and cloud solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-8px] transition-all duration-300 hover:shadow-xl border border-gray-100"
            >
              <div className="h-52 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-6xl">🚀</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  InsightfulAI
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  AI-powered workflow assistant built with .NET 9, React, and
                  Azure. Streamlines business processes with intelligent
                  automation.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", ".NET", "Azure", "AI"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href="https://github.com/hessammamagani/insightful-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" /> View Code
                  </a>
                  <a
                    href="#"
                    className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-8px] transition-all duration-300 hover:shadow-xl border border-gray-100"
            >
              <div className="h-52 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <span className="text-6xl">🛠️</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  Pilz Services Automation
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  Automated inquiry and response platform with secure access
                  control. Handles complex service workflows efficiently.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[".NET", "Azure", "SQL", "API"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center">
                    <Github className="w-4 h-4 mr-2" /> Private Code
                  </span>
                  <span className="text-gray-400">Private Demo</span>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={
                projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:translate-y-[-8px] transition-all duration-300 hover:shadow-xl border border-gray-100"
            >
              <div className="h-52 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-6xl">📱</span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  Safety Expert App
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  Offline-first mobile app for safety engineering with
                  multilingual support. Used by professionals worldwide.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Flutter", ".NET", "SQL", "Offline-First"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 flex items-center">
                    <Github className="w-4 h-4 mr-2" /> Private Code
                  </span>
                  <a
                    href="#"
                    className="text-purple-600 font-medium hover:text-purple-800 transition-colors"
                  >
                    App Store
                  </a>
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
                Full-Stack Developer | AI & Cloud Solutions
              </p>
            </div>
            <div className="flex gap-6">
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
    </div>
  );
}
