import React from "react";

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

const SkillBar = ({ name, level }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full">
        <div
          className="h-2.5 bg-blue-600 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-white p-6 rounded-lg shadow">
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