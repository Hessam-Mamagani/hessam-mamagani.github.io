import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Flutter", level: 75 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: ".NET Core/9", level: 90 },
      { name: "Node.js", level: 80 },
      { name: "SQL", level: 85 },
      { name: "Azure Services", level: 85 },
      { name: "API Design", level: 90 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 80 },
      { name: "Azure DevOps", level: 85 },
      { name: "Jest/Testing", level: 75 },
    ],
  },
];

const stats = [
  { value: 5, label: "Years Experience", icon: "🚀" },
  { value: 30, label: "Projects Completed", icon: "📊" },
  { value: 15, label: "Happy Clients", icon: "🌟" },
  { value: 99, label: "Problem Solving", suffix: "%", icon: "🧩" },
];

const AnimatedCounter = ({ value, label, suffix = "", icon }) => {
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
      <div className="text-4xl mb-2">{icon}</div>
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