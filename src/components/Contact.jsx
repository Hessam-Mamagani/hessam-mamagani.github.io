import React, { useState, useRef } from "react";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const formRef = useRef();
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: "Please fill out all fields"
      });
      return;
    }
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });

    try {
      // Create the email content
      const mailtoUrl = `mailto:hessam.mamagani@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      // Open the default mail client
      window.open(mailtoUrl, '_blank');
      
      // Reset the form
      e.target.reset();
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({...prev, isSubmitted: false}));
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: "Failed to send message. Please try again or contact me directly via email."
      });
    }
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
            <motion.form 
              className="space-y-4" 
              variants={staggerContainer}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              {[
                { id: "name", label: "Name", type: "text", name: "name" },
                { id: "email", label: "Email", type: "email", name: "email" },
                { id: "message", label: "Message", type: "textarea", rows: 4, name: "message" }
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
                      name={field.name}
                      rows={field.rows}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  )}
                </motion.div>
              ))}
              
              {formStatus.error && (
                <motion.div 
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {formStatus.error}
                </motion.div>
              )}
              
              {formStatus.isSubmitted && (
                <motion.div 
                  className="text-green-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              
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
                  className="w-full px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={formStatus.isSubmitting}
                >
                  {formStatus.isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 