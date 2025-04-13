import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="rounded-lg shadow-lg max-w-full mx-auto overflow-hidden bg-gray-200 aspect-square flex items-center justify-center">
              <span className="text-6xl">👨‍💻</span>
              {/* Uncomment when you have a profile image */}
              {/* <img 
                src="./profile.jpg" 
                alt="Hessam Mamagani" 
                className="w-full h-full object-cover"
              /> */}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Full-Stack Developer</h3>
            <p className="mb-4">
              I specialize in building modern, responsive, and scalable web applications 
              using cutting-edge technologies. With experience in both frontend and backend 
              development, I bring ideas to life with clean, maintainable code.
            </p>
            <p className="mb-4">
              My focus areas include React, .NET, cloud architecture, and AI integration. 
              I'm passionate about creating intuitive user experiences and efficient, 
              reliable systems.
            </p>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Key Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", ".NET", "Cloud Architecture", "Azure", "SQL", "NoSQL", "AI Integration"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
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