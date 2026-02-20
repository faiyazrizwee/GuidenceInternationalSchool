"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

interface YearPlanEvent {
  id: number;
  date: string;
  month: string;
  class_name: string;
  activity: string;
}

export default function YearPlanManager() {
  const [events, setEvents] = useState<YearPlanEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    date: "",
    month: "",
    class_name: "",
    activity: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      console.error("Failed to fetch events:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      // Auto-set month from date if empty
      let month = newEvent.month;
      if (!month && newEvent.date) {
        const dateObj = new Date(newEvent.date);
        month = dateObj.toLocaleString('default', { month: 'long' }).toUpperCase();
      }

      const payload = { ...newEvent, month };

      const res = await fetch(`${API_URL}/year-plan/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setNewEvent({ date: "", month: "", class_name: "", activity: "" });
        fetchEvents();
      } else {
        const errorData = await res.json();
        console.error("Add event error details:", errorData);
        alert(`Failed to add event: ${JSON.stringify(errorData.detail || errorData)}`);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/year-plan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setEvents(events.filter(ev => ev.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Year Plan</h2>

      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-1">
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            placeholder="Date"
          />
        </div>
        <div className="md:col-span-1">
            <input
            type="text"
            name="month"
            value={newEvent.month}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Month (Auto if empty)"
          />
        </div>
        <div className="md:col-span-1">
          <input
            type="text"
            name="class_name"
            value={newEvent.class_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            placeholder="Class (e.g., Nur to 8)"
          />
        </div>
        <div className="md:col-span-2 flex gap-2">
          <input
            type="text"
            name="activity"
            value={newEvent.activity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded flex-grow"
            required
            placeholder="Activity / Event"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No events found. Add one above.
                </td>
              </tr>
            ) : (
                // Sort by date (roughly) if needed, currently relying on API order
              events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.class_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{event.activity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
