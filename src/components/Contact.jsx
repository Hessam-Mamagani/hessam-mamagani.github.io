import React from "react";
import { Mail, Github, Linkedin, MapPin, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Contact() {
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

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hessam.mamagani@gmail.com",
      href: "mailto:hessam.mamagani@gmail.com",
      color: "bg-red-50 text-red-600 hover:bg-red-100",
      description: "Best for formal inquiries",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+90 539 229 4251",
      href: "https://wa.me/905392294251?text=Hi%20Hessam%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
      description: "Quick response guaranteed",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "hessam-mamagani",
      href: "https://linkedin.com/in/hessam-mamagani",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      description: "Let's connect professionally",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "hessam-mamagani",
      href: "https://github.com/hessam-mamagani",
      color: "bg-gray-50 text-gray-700 hover:bg-gray-100",
      description: "Check out my repositories",
    },
  ];

  const infoItems = [
    { icon: MapPin, text: "Istanbul, Turkey" },
    { icon: Phone, text: "+90 539 229 4251" },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl" ref={ref}>
        <motion.h2
          className="text-3xl font-bold text-center mb-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          Open to remote opportunities, relocation, and visa sponsorship in US/Canada/Europe.
          Reach out through any channel below.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                className={`flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 group`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center transition-colors flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{method.label}</h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          className="flex justify-center gap-6 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <span key={index} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {item.text}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}