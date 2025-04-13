import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="rounded-lg shadow-lg max-w-full mx-auto overflow-hidden bg-white aspect-square">
              <img
                src="/assets/workspace.png"
                alt="Modern Development Workspace"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                style={{
                  objectPosition: '50% 50%',
                  filter: 'contrast(1.02) brightness(1.02)',
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f8f9fa"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EDevelopment Workspace%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Full-Stack Developer
            </h3>
            <p className="mb-4">
              I specialize in building modern, responsive, and scalable web
              applications using cutting-edge technologies. With experience in
              both frontend and backend development, I bring ideas to life with
              clean, maintainable code.
            </p>
            <p className="mb-4">
              My focus areas include React, .NET, cloud architecture, and AI
              integration. I'm passionate about creating intuitive user
              experiences and efficient, reliable systems.
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Key Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "TypeScript",
                  ".NET",
                  "Cloud Architecture",
                  "Azure",
                  "SQL",
                  "NoSQL",
                  "AI Integration",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
