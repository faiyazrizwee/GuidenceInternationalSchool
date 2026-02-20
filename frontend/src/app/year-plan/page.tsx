"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";

interface YearPlanEvent {
  id: number;
  date: string;
  month: string;
  class_name: string;
  activity: string;
}

export default function YearPlan() {
  const [events, setEvents] = useState<YearPlanEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/year-plan/`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch year plan:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group events by month
  const groupedEvents: { [key: string]: YearPlanEvent[] } = {};
  events.forEach(event => {
    const month = event.month || "Upcoming"; // Fallback
    if (!groupedEvents[month]) groupedEvents[month] = [];
    groupedEvents[month].push(event);
  });

  // Order months if needed, or rely on API sort order (which sorts by date)
  // Since we group by month string, we might lose order if we iterate object keys.
  // Better to iterate unique months from the sorted event list.
  const uniqueMonths = Array.from(new Set(events.map(e => e.month || "Upcoming")));

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Beyond classroom/WhatsApp Image 2024-12-10 at 8.25.29 PM (2).jpeg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">Year Plan</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>Academics</li>
                  <li>Year Plan</li>
              </ul>
          </div>
      </section>

      {/* Content Section */}
      <section className="section">
          <div className="container">
              <div className="reveal">
                  <h2 className="section-title text-center text-primary">Annual Academic Plan</h2>
                  <p className="text-center text-gray-600 mb-8">Overview of the curriculum distribution and academic goals for the year.</p>

                  <div className="text-center mb-10">
                      <a 
                          href="/assets/files/Year%20plan/UPDATED%20YEARLY%20PLAN%2024-25.xlsx" 
                          className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#002244] transition-all transform hover:-translate-y-1"
                          download
                      >
                          <span>Download Annual Year Plan 2024-25</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                      </a>
                  </div>

                  <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                      <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                              <thead>
                                  <tr className="bg-primary text-white">
                                      <th className="p-4 border-b border-gray-200">Date/Month</th>
                                      <th className="p-4 border-b border-gray-200">Class</th>
                                      <th className="p-4 border-b border-gray-200">Activity/Event</th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white">
                                  {loading && (
                                      <tr>
                                          <td colSpan={3} className="p-8 text-center text-gray-500">Loading year plan...</td>
                                      </tr>
                                  )}

                                  {!loading && events.length === 0 && (
                                      <tr>
                                          <td colSpan={3} className="p-8 text-center text-gray-500">No events scheduled yet.</td>
                                      </tr>
                                  )}

                                  {!loading && uniqueMonths.map(month => (
                                      <>
                                          <tr key={`header-${month}`} className="bg-gray-50">
                                              <td colSpan={3} className="p-3 font-bold text-center text-gray-700 uppercase">{month}</td>
                                          </tr>
                                          {groupedEvents[month].map(event => (
                                              <tr key={event.id} className="hover:bg-blue-50 transition border-b border-gray-100">
                                                  <td className="p-4">{event.date}</td>
                                                  <td className="p-4 font-semibold text-primary">{event.class_name}</td>
                                                  <td className="p-4">{event.activity}</td>
                                              </tr>
                                          ))}
                                      </>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
