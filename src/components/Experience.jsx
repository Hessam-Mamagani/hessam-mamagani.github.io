import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, Code } from "lucide-react";

const experiences = [
  {
    title: "Project Development Engineer",
    subtitle: "Senior Full-Stack & AI Solutions Architect",
    company: "Pilz Türkiye (Pilz GmbH & Co. KG)",
    location: "Istanbul, Türkiye",
    period: "Aug 2024 – Present",
    icon: Code,
    color: "bg-blue-600",
    highlights: [
      "Architected, built end-to-end & led development of 5 enterprise platforms: PilzPortal, WebRunner, InsightfulAI, EvenTracer, n8n AI",
      "1,190+ RESTful API endpoints across 102 controllers & 215+ EF Core tables with JWT/WebAuthn biometric auth",
      "Agentic AI & RAG orchestration (OpenAI GPT + Anthropic Claude) with autonomous tool-calling & NL-to-SQL agents",
      "SAP GUI (COM Interop) & Playwright CRM RPA, Sovos/ISIS GİB e-Invoicing, and real-time SignalR hubs",
    ],
  },
  {
    title: "Full-Stack Software Engineering Instructor",
    company: "Üçüncü Binyıl Akademi",
    location: "Istanbul, Türkiye",
    period: "Aug 2023 – Aug 2024",
    icon: GraduationCap,
    color: "bg-emerald-600",
    highlights: [
      "Delivered 640+ hours of live coding instruction to 150+ students and corporate groups",
      "Taught C#, .NET Core, React, Next.js, SQL Server, REST APIs, and AI-assisted software engineering",
      "Guided end-to-end capstone full-stack and e-commerce platform projects",
    ],
  },
  {
    title: "Chairman & Project Manager | Bid Manager | Senior Supervisor",
    company: "Earlier Engineering & Management Career",
    location: "Urmia",
    period: "Sep 2008 – Jul 2023",
    icon: Briefcase,
    color: "bg-gray-600",
    highlights: [
      "Directed multi-disciplinary engineering projects, executive operations, budgeting, and contract negotiations",
      "Managed IT infrastructure, digital workflow automation, and technical instruction (ICDL/MCSE) alongside project leadership",
      "Led technical bidding, cost estimation, and quality supervision across large-scale projects",
    ],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl" ref={ref}>
        <motion.h2
          className="text-3xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h2>
        <motion.p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From engineering management to full-stack development and AI solutions
        </motion.p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={index}
                className="relative flex gap-6 mb-10 last:mb-0"
                initial={{ opacity: 0, x: -30 }}
                animate={
                  inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-shrink-0 w-16 items-start justify-center pt-2">
                  <div
                    className={`w-10 h-10 rounded-full ${exp.color} flex items-center justify-center shadow-lg z-10`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      {exp.subtitle && (
                        <p className="text-sm text-blue-600 font-medium">
                          {exp.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {exp.company} &middot; {exp.location}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-500 mt-1 sm:mt-0 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span className="text-blue-500 mr-2 mt-1 flex-shrink-0">
                          &#x25B8;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
