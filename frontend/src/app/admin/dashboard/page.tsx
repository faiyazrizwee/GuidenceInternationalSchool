"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdmissionTable from "@/components/Admin/AdmissionTable";
import ContactTable from "@/components/Admin/ContactTable";
import GalleryManager from "@/components/Admin/GalleryManager";
import FeeManager from "@/components/Admin/FeeManager";
import StaffManager from "@/components/Admin/StaffManager";
import AcademicsManager from "@/components/Admin/AcademicsManager";
import AnnouncementsManager from "@/components/Admin/AnnouncementsManager";
import SubscriberManager from "@/components/Admin/SubscriberManager";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("admissions");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <h1 className="text-xl font-bold">Admin Dashboard</h1>
             <span className="bg-blue-800 text-xs px-2 py-1 rounded">Guidance International School</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("admissions")}
            className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${
              activeTab === "admissions"
                ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Admissions
          </button>
          <button
            onClick={() => setActiveTab("queries")}
            className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${
              activeTab === "queries"
                ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Contact Queries
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${
              activeTab === "announcements"
                ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Announcements & Events
          </button>
          <button onClick={() => setActiveTab("fees")} className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${activeTab === "fees" ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]" : "text-gray-600 hover:bg-gray-200"}`}>Fees</button>
          <button onClick={() => setActiveTab("academics")} className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${activeTab === "academics" ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]" : "text-gray-600 hover:bg-gray-200"}`}>Academics</button>
          <button onClick={() => setActiveTab("staff")} className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${activeTab === "staff" ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]" : "text-gray-600 hover:bg-gray-200"}`}>Staff</button>
          <button onClick={() => setActiveTab("gallery")} className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${activeTab === "gallery" ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]" : "text-gray-600 hover:bg-gray-200"}`}>Gallery</button>
          <button onClick={() => setActiveTab("subscribers")} className={`px-6 py-3 font-medium text-sm transition-colors rounded-t-lg ${activeTab === "subscribers" ? "bg-white text-primary border-t border-l border-r border-gray-300 relative top-[1px]" : "text-gray-600 hover:bg-gray-200"}`}>Subscribers</button>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-200 min-h-[500px]">
           {activeTab === "admissions" && <AdmissionTable />}
           {activeTab === "queries" && <ContactTable />}
           {activeTab === "announcements" && <AnnouncementsManager />}
           {activeTab === "fees" && <FeeManager />}
           {activeTab === "academics" && <AcademicsManager />}
           {activeTab === "staff" && <StaffManager />}
           {activeTab === "gallery" && <GalleryManager />}
           {activeTab === "subscribers" && <SubscriberManager />}
        </div>
      </main>
    </div>
  );
}
