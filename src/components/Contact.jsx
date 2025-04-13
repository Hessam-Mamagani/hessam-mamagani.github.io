import React from "react";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-600" />
                <a href="mailto:hessam.mamagani@gmail.com" className="hover:text-blue-600">
                  hessam.mamagani@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-600" />
                <a href="tel:+905392294251" className="hover:text-blue-600">
                  +90 539 229 4251
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center">
                <Github className="w-5 h-5 mr-3 text-blue-600" />
                <a href="https://github.com/hessam-mamagani" className="hover:text-blue-600" target="_blank" rel="noreferrer">
                  github.com/hessam-mamagani
                </a>
              </div>
              <div className="flex items-center">
                <Linkedin className="w-5 h-5 mr-3 text-blue-600" />
                <a href="https://linkedin.com/in/hessam-mamagani" className="hover:text-blue-600" target="_blank" rel="noreferrer">
                  linkedin.com/in/hessam-mamagani
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 