import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageAnimation = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: 15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 100 
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageAnimation}
          >
            <div className="rounded-lg shadow-lg max-w-full mx-auto overflow-hidden bg-white aspect-square">
              <img
                src="/images/workspace.png"
                alt="Modern Development Workspace"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                style={{
                  objectPosition: "50% 50%",
                  filter: "contrast(1.02) brightness(1.02)",
                }}
                onError={(e) => {
                  e.target.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f8f9fa"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EDevelopment Workspace%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h3 className="text-2xl font-semibold mb-4" variants={fadeIn}>
              Senior Full-Stack Developer & AI Solutions Engineer
            </motion.h3>
            <motion.p className="mb-4" variants={fadeIn}>
              I architect and deliver enterprise-grade platforms end-to-end. As the
              sole developer of three production systems at Pilz Turkey — a CRM/ERP
              portal, an AI knowledge platform, and an exhibition management SaaS —
              I handle everything from database design to cloud deployment.
            </motion.p>
            <motion.p className="mb-4" variants={fadeIn}>
              My work spans AI integration (OpenAI GPT, Anthropic Claude, RAG
              pipelines), complex business workflow automation (RPA, SAP CRM sync),
              and real-time systems — all built on .NET 10, React, and Azure.
            </motion.p>
            <div className="mt-6">
              <motion.h4 className="text-xl font-semibold mb-2" variants={fadeIn}>
                Core Expertise:
              </motion.h4>
              <motion.div className="flex flex-wrap gap-2 mb-6" variants={staggerContainer}>
                {[
                  ".NET 10",
                  "OpenAI + Claude",
                  "React / Next.js",
                  "Clean Architecture",
                  "Microsoft Azure",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium shadow-sm"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: index * 0.1,
                          duration: 0.5
                        } 
                      }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" 
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
              <motion.h4 className="text-xl font-semibold mb-2" variants={fadeIn}>
                Additional Skills:
              </motion.h4>
              <motion.div className="flex flex-wrap gap-2" variants={staggerContainer}>
                {[
                  "TypeScript",
                  "CQRS / MediatR",
                  "SQL Server",
                  "SignalR",
                  "WebAuthn",
                  "SAP RPA",
                  "Docker",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1 + 0.5,
                          duration: 0.4 
                        } 
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
