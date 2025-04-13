import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md text-gray-800 py-3" 
          : "bg-transparent text-white py-6"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
        <a 
          href="#" 
          className="text-2xl font-bold tracking-tight flex items-center"
        >
          <motion.span 
            className="text-primary-600"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            H
          </motion.span>
          <span className={isScrolled ? "text-gray-800" : "text-white"}>essam</span>
        </a>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <motion.li 
              key={item.name}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a 
                href={item.href} 
                className={`hover:text-primary-500 transition-colors ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className={`w-5 h-5 ${isScrolled ? "text-gray-800" : "text-white"}`} />
          ) : (
            <Menu className={`w-5 h-5 ${isScrolled ? "text-gray-800" : "text-white"}`} />
          )}
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-4 px-4">
              {menuItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  className="mb-3 last:mb-0"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a 
                    href={item.href} 
                    className="block py-2 px-4 text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
} 