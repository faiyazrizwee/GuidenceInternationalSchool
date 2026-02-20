
"use client";

import Link from "next/link";
import { useState } from "react";
import { API_URL } from "@/config";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    student_name: "",
    date_of_birth: "",
    grade_applying_for: "",
    parent_name: "",
    contact_number: "",
    email: "",
    address: "",
    previous_school: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(`${API_URL}/forms/admission`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
      return (
        <main>
           <section className="section">
               <div className="container text-center">
                   <h2 className="text-primary">Application Submitted Successfully!</h2>
                   <p>Thank you for applying to Guidance International School. Our admissions team will contact you shortly.</p>
                   <Link href="/" className="btn btn-primary">Return Home</Link>
               </div>
           </section>
        </main>
      );
  }

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Staff training/WhatsApp Image 2024-12-12 at 9.43.36 AM.jpeg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">Admission Form</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>Admissions</li>
              </ul>
          </div>
      </section>

      {/* Form Section */}
      <section className="section py-12 bg-gray-50">
          <div className="container max-w-4xl mx-auto">
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                  <div className="bg-primary text-white p-6 text-center">
                    <h2 className="text-2xl font-bold">Student Registration Form</h2>
                    <p className="opacity-90">Academic Year 2025 - 2026</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-8 space-y-8">
                      
                      {/* Student Details Section */}
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                          <h4 className="text-xl font-semibold text-primary mb-6 border-b border-blue-200 pb-2">Student Details</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <label htmlFor="student_name" className="block text-sm font-medium text-gray-700 mb-1">Name of the student *</label>
                                  <input 
                                    type="text" 
                                    name="student_name" 
                                    value={formData.student_name} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  />
                              </div>
                              <div>
                                  <label htmlFor="grade_applying_for" className="block text-sm font-medium text-gray-700 mb-1">Seeking Admission for *</label>
                                  <select 
                                    name="grade_applying_for" 
                                    value={formData.grade_applying_for} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  >
                                      <option value="">Select Grade</option>
                                      <option value="Nursery">Nursery</option>
                                      <option value="LKG">LKG</option>
                                      <option value="UKG">UKG</option>
                                      <option value="1">Class 1</option>
                                      <option value="2">Class 2</option>
                                      <option value="3">Class 3</option>
                                      <option value="4">Class 4</option>
                                      <option value="5">Class 5</option>
                                      <option value="6">Class 6</option>
                                      <option value="7">Class 7</option>
                                      <option value="8">Class 8</option>
                                      <option value="9">Class 9</option>
                                      <option value="10">Class 10</option>
                                  </select>
                              </div>
                              <div className="md:col-span-2">
                                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                                  <input 
                                    type="date" 
                                    name="date_of_birth" 
                                    value={formData.date_of_birth} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  />
                              </div>
                          </div>
                      </div>

                      {/* Parent Details Section */}
                      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                          <h4 className="text-xl font-semibold text-primary mb-6 border-b border-blue-200 pb-2">Parent / Guardian Details</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                  <label htmlFor="parent_name" className="block text-sm font-medium text-gray-700 mb-1">Father/Guardian Name *</label>
                                  <input 
                                    type="text" 
                                    name="parent_name" 
                                    value={formData.parent_name} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  />
                              </div>
                              <div>
                                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Father/Guardian Email Address *</label>
                                  <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  />
                              </div>
                              <div>
                                  <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 mb-1">Father/Guardian Contact Number *</label>
                                  <input 
                                    type="tel" 
                                    name="contact_number" 
                                    value={formData.contact_number} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  />
                              </div>
                              <div>
                                  <label htmlFor="previous_school" className="block text-sm font-medium text-gray-700 mb-1">Previous School (if any)</label>
                                  <input 
                                    type="text" 
                                    name="previous_school" 
                                    value={formData.previous_school} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  />
                              </div>
                              <div className="md:col-span-2">
                                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Residential Address *</label>
                                  <textarea 
                                    name="address" 
                                    rows={3} 
                                    value={formData.address} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                  ></textarea>
                              </div>
                          </div>
                      </div>
                      
                      <div className="flex items-start">
                        <input type="checkbox" required className="mt-1 mr-2" />
                        <label className="text-sm text-gray-600">I confirm that all the above details mentioned in this form are correct. *</label>
                      </div>

                      <div className="pt-4">
                          <button type="submit" className="w-full bg-accent hover:bg-white hover:text-[#B31919] text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md border-2 border-solid border-[#B31919]" disabled={status === "submitting"}>
                              {status === "submitting" ? "Submitting Application..." : "Submit Application"}
                          </button>
                      </div>
                      
                      {status === "error" && <p className="text-red-600 text-center mt-4">Failed to submit application. Please try again.</p>}
                  </form>
              </div>
          </div>
      </section>
    </main>
  );
}
