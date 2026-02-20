"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/config";

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
  is_active: boolean;
}

export default function SubscriberManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({
    subject: "",
    message: "",
    type: "announcement"
  });
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState("");

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(`${API_URL}/subscriber/`);
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendResult("");

    try {
        const response = await fetch(`${API_URL}/subscriber/broadcast`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notification),
        });

        if (response.ok) {
            const result = await response.json();
            setSendResult(result.message);
            setShowModal(false);
            setNotification({ subject: "", message: "", type: "announcement" });
            alert("Notification sent successfully!");
        } else {
            setSendResult("Failed to send notification.");
        }
    } catch (error) {
        setSendResult("Error sending notification.");
    } finally {
        setSending(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/subscriber/${id}/status`, {
            method: "PUT",
        });
        if (response.ok) {
            const updatedSubscriber = await response.json();
            setSubscribers(subscribers.map(sub => sub.id === id ? updatedSubscriber : sub));
        } else {
            alert("Failed to update status");
        }
    } catch (error) {
        alert("Error updating status");
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Are you sure you want to delete this subscriber?")) return;
    try {
        const response = await fetch(`${API_URL}/subscriber/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setSubscribers(subscribers.filter(sub => sub.id !== id));
        } else {
            alert("Failed to delete subscriber");
        }
    } catch (error) {
        alert("Error deleting subscriber");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Subscribers ({subscribers.length})</h2>
        <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow"
        >
            <i className="fas fa-paper-plane mr-2"></i> Send Update
        </button>
      </div>

      {/* Subscriber List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                    <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
                ) : subscribers.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-4 text-center">No subscribers yet.</td></tr>
                ) : (
                    subscribers.map((sub) => (
                        <tr key={sub.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sub.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sub.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {sub.is_active ? 'Active' : 'Blocked'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button 
                                    onClick={() => handleToggleStatus(sub.id)}
                                    className={`text-xs px-3 py-1 rounded mr-2 ${sub.is_active ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                                >
                                    {sub.is_active ? 'Block' : 'Unblock'}
                                </button>
                                <button 
                                    onClick={() => handleDelete(sub.id)}
                                    className="text-xs px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200"
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

      {/* Broadcast Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Send Update to Subscribers</h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                
                <form onSubmit={handleSendNotification}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Update Type</label>
                        <select 
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={notification.type}
                            onChange={(e) => setNotification({...notification, type: e.target.value})}
                        >
                            <option value="announcement">Announcement</option>
                            <option value="fees">Fees Update</option>
                            <option value="holiday">Holiday/Calendar</option>
                            <option value="exam">Exam Schedule</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                        <input 
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={notification.subject}
                            onChange={(e) => setNotification({...notification, subject: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                        <textarea 
                            className="w-full border border-gray-300 rounded px-3 py-2 h-32"
                            value={notification.message}
                            onChange={(e) => setNotification({...notification, message: e.target.value})}
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={() => setShowModal(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            disabled={sending}
                        >
                            {sending ? "Sending..." : "Send Broadcast"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}
