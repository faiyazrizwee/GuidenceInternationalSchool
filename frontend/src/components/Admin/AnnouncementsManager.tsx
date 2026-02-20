"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

export default function AnnouncementsManager() {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [text, setText] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:8000/api/v1/announcement/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setAnnouncements(data);
            }
        } catch (err) {
            console.error("Failed to fetch announcements", err);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) return router.push("/admin/login");

        try {
            const res = await fetch("http://localhost:8000/api/v1/announcement/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ text, is_active: true })
            });

            if (res.ok) {
                setText("");
                fetchAnnouncements();
            } else {
                alert("Failed to add announcement");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server.");
        }
    };

    const handleDelete = async (id: number) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (!confirm("Are you sure you want to delete this announcement?")) return;

        try {
            const res = await fetch(`${API_URL}/announcement/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                fetchAnnouncements();
            } else {
                alert("Failed to delete announcement");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800">Manage Announcements</h3>
            
            <form onSubmit={handleAdd} className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="Enter announcement text..." 
                    value={text} 
                    onChange={e => setText(e.target.value)} 
                    className="border p-2 rounded flex-grow" 
                    required 
                />
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                    Add Announcement
                </button>
            </form>

            <div className="space-y-2">
                {announcements.map((ann: any) => (
                    <div key={ann.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm border">
                        <span className="font-medium">{ann.text}</span>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-500">
                                {new Date(ann.created_at).toLocaleDateString()}
                            </span>
                            <button 
                                onClick={() => handleDelete(ann.id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                            >
                                <i className="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                ))}
                {announcements.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No announcements found.</p>
                )}
            </div>
        </div>
    );
}
