import React from "react";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          Get In Touch
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h3 className="text-xl font-semibold mb-6" variants={fadeIn}>
              Contact Information
            </motion.h3>
            <div className="space-y-4">
              {[
                { icon: <Mail className="w-5 h-5 mr-3 text-blue-600" />, content: "hessam.mamagani@gmail.com", href: "mailto:hessam.mamagani@gmail.com" },
                { icon: <Phone className="w-5 h-5 mr-3 text-blue-600" />, content: "+90 539 229 4251", href: "tel:+905392294251" },
                { icon: <MapPin className="w-5 h-5 mr-3 text-blue-600" />, content: "Istanbul, Turkey" },
                { icon: <Github className="w-5 h-5 mr-3 text-blue-600" />, content: "github.com/hessam-mamagani", href: "https://github.com/hessam-mamagani" },
                { icon: <Linkedin className="w-5 h-5 mr-3 text-blue-600" />, content: "linkedin.com/in/hessam-mamagani", href: "https://linkedin.com/in/hessam-mamagani" }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.4 
                      } 
                    }
                  }}
                  whileHover={{ x: 5 }}
                >
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="hover:text-blue-600" target={item.href.startsWith('http') ? "_blank" : undefined} rel={item.href.startsWith('http') ? "noreferrer" : undefined}>
                      {item.content}
                    </a>
                  ) : (
                    <span>{item.content}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h3 className="text-xl font-semibold mb-6" variants={fadeIn}>
              Send Me a Message
            </motion.h3>
            <motion.form className="space-y-4" variants={staggerContainer}>
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "message", label: "Message", type: "textarea", rows: 4 }
              ].map((field, index) => (
                <motion.div 
                  key={field.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.15,
                        duration: 0.5 
                      } 
                    }
                  }}
                >
                  <label htmlFor={field.id} className="block mb-2 text-sm font-medium">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.id}
                      rows={field.rows}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  )}
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.45,
                      duration: 0.5 
                    } 
                  }
                }}
              >
                <motion.button 
                  type="submit" 
                  className="w-full px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Message
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 