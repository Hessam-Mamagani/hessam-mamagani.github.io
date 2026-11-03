import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Layers, Users, Plug, GraduationCap } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React 19", level: 92 },
      { name: "Next.js 16", level: 88 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "MUI / Shadcn", level: 88 },
    ],
  },
  {
    title: "Backend & AI",
    skills: [
      { name: ".NET 10 / ASP.NET", level: 95 },
      { name: "OpenAI / Claude", level: 90 },
      { name: "SQL Server", level: 88 },
      { name: "Entity Framework", level: 90 },
      { name: "SignalR / WebSockets", level: 85 },
    ],
  },
  {
    title: "Architecture & Cloud",
    skills: [
      { name: "Azure Services", level: 88 },
      { name: "Clean Arch / CQRS", level: 90 },
      { name: "CI/CD Pipelines", level: 82 },
      { name: "Docker", level: 78 },
      { name: "REST API Design", level: 95 },
    ],
  },

];

const stats = [
  { value: 5, label: "Enterprise Platforms", icon: Layers },
  { value: 2525, label: "Visitors & Users Served", suffix: "+", icon: Users },
  { value: 1190, label: "API Endpoints", suffix: "+", icon: Plug },
  { value: 640, label: "Teaching Hours", suffix: "+", icon: GraduationCap },
];

const AnimatedCounter = ({ value, label, suffix = "", icon: Icon }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const countingFinished = useRef(false);

  useEffect(() => {
    let start = 0;
    if (inView && !countingFinished.current) {
      const duration = 2000; // 2 seconds
      const step = Math.floor(duration / value);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
          countingFinished.current = true;
        }
      }, step);
      
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-10 h-10 mb-3 rounded-full bg-primary-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>
      <h3 className="text-4xl font-bold mb-2 text-primary-600 flex items-center">
        {count}
        <span>{suffix}</span>
      </h3>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
};

const SkillBar = ({ name, level }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      setWidth(level);
    }
  }, [inView, level]);

  return (
    <div className="mb-4" ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2.5 bg-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
        
        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" ref={ref}>
          {stats.map((stat, index) => (
            <AnimatedCounter 
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix || ""}
              icon={stat.icon}
            />
          ))}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
              <div>
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 