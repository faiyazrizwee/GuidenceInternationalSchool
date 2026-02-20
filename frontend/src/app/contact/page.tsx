
"use client";

import Link from "next/link";
import { useState } from "react";
import { API_URL } from "@/config";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(`${API_URL}/forms/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Annual day/432048664_927263309404859_4755735664839880409_n.jpg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">Contact Us</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>Contact</li>
              </ul>
          </div>
      </section>

      {/* Contact Section */}
      <section className="section py-12 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
              
              <div className="text-center mb-12">
                  <h4 className="text-accent font-semibold uppercase tracking-wider mb-2">Get in Touch</h4>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary">We'd Love to Hear From You</h2>
                  <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Have a question or want to know more about our school? Feel free to reach out to us through any of the following channels.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {/* Contact Info */}
                  <div className="space-y-6">
                      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary flex items-start space-x-4">
                          <div className="p-3 bg-blue-50 rounded-full text-primary">
                             <i className="fas fa-map-marker-alt text-xl"></i>
                          </div>
                          <div>
                              <h5 className="font-bold text-lg text-primary mb-1">Address</h5>
                              <p className="text-gray-600">Village Wajidpur, Post Koyla, Near Toll Plaza,<br/>Tehsil Sadar, Rampur, Uttar Pradesh</p>
                          </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary flex items-start space-x-4">
                          <div className="p-3 bg-blue-50 rounded-full text-primary">
                             <i className="fas fa-phone-alt text-xl"></i>
                          </div>
                          <div>
                              <h5 className="font-bold text-lg text-primary mb-1">Phone</h5>
                              <p className="text-gray-600"><a href="tel:+918865091309" className="hover:text-accent transition">+91 8865 091 309</a></p>
                          </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary flex items-start space-x-4">
                          <div className="p-3 bg-blue-50 rounded-full text-primary">
                             <i className="fas fa-envelope text-xl"></i>
                          </div>
                          <div>
                              <h5 className="font-bold text-lg text-primary mb-1">Email</h5>
                              <p className="text-gray-600"><a href="mailto:info@guidanceinternationalschool.com" className="hover:text-accent transition">info@guidanceinternationalschool.com</a></p>
                          </div>
                      </div>
                  </div>

                  {/* Contact Form */}
                  <div className="bg-white shadow-lg rounded-xl overflow-hidden p-8 border border-gray-100">
                      <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                          <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                              <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white" 
                              />
                          </div>
                          <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                              <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white" 
                              />
                          </div>
                          <div>
                              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                              <input 
                                type="text" 
                                id="subject" 
                                name="subject" 
                                value={formData.subject} 
                                onChange={handleChange} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white" 
                              />
                          </div>
                          <div>
                              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                              <textarea 
                                id="message" 
                                name="message" 
                                rows={5} 
                                value={formData.message} 
                                onChange={handleChange} 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white" 
                              ></textarea>
                          </div>
                          <button 
                            type="submit" 
                            className="w-full bg-accent hover:bg-white hover:text-[#B31919] text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md border-2 border-solid border-[#B31919] transform hover:-translate-y-1" 
                            disabled={status === "submitting"}
                          >
                            {status === "submitting" ? "Sending..." : "Send Message"}
                          </button>
                          {status === "success" && <p className="text-green-600 text-center font-medium">Message sent successfully!</p>}
                          {status === "error" && <p className="text-red-600 text-center font-medium">Failed to send message. Please try again.</p>}
                      </form>
                  </div>
              </div>

              {/* Map Section */}
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <iframe 
                    src="https://maps.google.com/maps?q=Village%20Wajidpur%2C%20Post%20Koyla%2C%20Near%20Toll%20Plaza%2C%20Tehsil%20Sadar%2C%20Rampur%2C%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="450" 
                    style={{border:0, borderRadius: "0.5rem"}} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
          </div>
      </section>
    </main>
  );
}
