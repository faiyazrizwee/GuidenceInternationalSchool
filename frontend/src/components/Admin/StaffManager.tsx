"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

interface StaffMember {
  id: number;
  name: string;
  role: string;
  phone: string;
  image_url: string;
}

export default function StaffManager() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", phone: "", image_url: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await fetch(`${API_URL}/staff/`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setStaff(data);
        else console.error("API returned non-array data:", data);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin/login");

    try {
      const payload = {
        ...newStaff,
        image_url: newStaff.image_url.trim().replace(/^frontend\/public\//, "/").replace(/^public\//, "/") === "" ? null : newStaff.image_url.trim().replace(/^frontend\/public\//, "/").replace(/^public\//, "/")
      };

      const res = await fetch(`${API_URL}/staff/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setNewStaff({ name: "", role: "", phone: "", image_url: "" });
        fetchStaff();
        alert("Staff member added successfully!");
      } else {
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/admin/login");
            return;
        }
        const errData = await res.json();
        alert(`Failed to add staff: ${JSON.stringify(errData.detail)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    }
  };

  const handleDelete = async (id: number) => {
      if (!confirm("Delete this staff member?")) return;
      const token = localStorage.getItem("token");
      try {
          const res = await fetch(`${API_URL}/staff/${id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
              setStaff(staff.filter(s => s.id !== id));
          } else if (res.status === 401) {
              localStorage.removeItem("token");
              router.push("/admin/login");
          }
      } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Add Staff Member</h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <input type="text" placeholder="Name" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Role (e.g. Principal)" value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Phone" value={newStaff.phone} onChange={e => setNewStaff({...newStaff, phone: e.target.value})} className="border p-2 rounded" />
            <input type="text" placeholder="Image URL" value={newStaff.image_url} onChange={e => setNewStaff({...newStaff, image_url: e.target.value})} className="border p-2 rounded" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Staff</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map(member => (
              <div key={member.id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4 border">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                      {member.image_url ? <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>}
                  </div>
                  <div className="flex-grow">
                      <h4 className="font-bold">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.phone}</p>
                  </div>
                  <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
              </div>
          ))}
          {staff.length === 0 && <p className="text-gray-500 col-span-full">No staff members found.</p>}
      </div>
    </div>
  );
}
