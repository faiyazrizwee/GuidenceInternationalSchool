"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config";

import YearPlanManager from "./YearPlanManager";

// Combined manager for Year Plan, Test Schedule, Academic Calendar
export default function AcademicsManager() {
  const [activeTab, setActiveTab] = useState("calendar");
  const router = useRouter();

  // Calendar State
  const [events, setEvents] = useState<any[]>([]);
  const [newEvent, setNewEvent] = useState({ event_name: "", event_date: "", event_type: "Event" });

  useEffect(() => {
    fetchCalendar();
  }, []);

  const fetchCalendar = async () => {
    const res = await fetch(`${API_URL}/academics/calendar`);
    if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setEvents(data);
        else console.error("API returned non-array data:", data);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin/login");

    try {
      const res = await fetch(`${API_URL}/academics/calendar`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(newEvent)
      });

      if (res.ok) {
        setNewEvent({ event_name: "", event_date: "", event_type: "Event" });
        fetchCalendar();
      } else {
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/admin/login");
            return;
        }
        const errData = await res.json();
        alert(`Failed to add event: ${JSON.stringify(errData.detail)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="space-y-6">
        <div className="flex space-x-4 border-b">
            <button onClick={() => setActiveTab("calendar")} className={`pb-2 ${activeTab === 'calendar' ? 'border-b-2 border-primary font-bold' : ''}`}>Academic Calendar</button>
            <button onClick={() => setActiveTab("yearplan")} className={`pb-2 ${activeTab === 'yearplan' ? 'border-b-2 border-primary font-bold' : ''}`}>Year Plan</button>
            <button onClick={() => setActiveTab("tests")} className={`pb-2 ${activeTab === 'tests' ? 'border-b-2 border-primary font-bold' : ''}`}>Test Schedule</button>
        </div>

        {activeTab === "calendar" && (
            <div>
                <form onSubmit={handleAddEvent} className="flex gap-4 mb-6">
                    <input type="text" placeholder="Event Name" value={newEvent.event_name} onChange={e => setNewEvent({...newEvent, event_name: e.target.value})} className="border p-2 rounded flex-grow" required />
                    <input type="date" value={newEvent.event_date} onChange={e => setNewEvent({...newEvent, event_date: e.target.value})} className="border p-2 rounded" required />
                    <select value={newEvent.event_type} onChange={e => setNewEvent({...newEvent, event_type: e.target.value})} className="border p-2 rounded">
                        <option>Event</option><option>Holiday</option><option>Exam</option>
                    </select>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add</button>
                </form>
                <ul className="space-y-2">
                    {events.map((ev: any) => (
                        <li key={ev.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm border">
                            <span><strong>{new Date(ev.event_date).toLocaleDateString()}</strong>: {ev.event_name} <span className="text-xs bg-gray-100 px-2 py-1 rounded ml-2">{ev.event_type}</span></span>
                        </li>
                    ))}
                    {events.length === 0 && <p className="text-gray-500">No events found.</p>}
                </ul>
            </div>
        )}

        {activeTab === "yearplan" && <YearPlanManager />}

        {activeTab === "tests" && (
            <div className="text-center py-12 bg-gray-50 rounded border border-dashed">
                <p className="text-gray-500">Editor for {activeTab} coming in next update.</p>
            </div>
        )}
    </div>
  );
}
