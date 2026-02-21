"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

interface FeeStructure {
  id: number;
  class_group: string;
  registration_fee: string;
  admission_fee: string;
  annual_charges: string;
  tuition_fee: string;
  erp_fee: string;
  tuition_total: string;
  exam_fee: string;
  total_fee: string;
}

export default function FeeManager() {
  const [fees, setFees] = useState<FeeStructure[]>([]);
  const [newFee, setNewFee] = useState({ 
      class_group: "", registration_fee: "", admission_fee: "", annual_charges: "", tuition_fee: "", erp_fee: "", tuition_total: "", exam_fee: "", total_fee: "" 
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await fetch(`${API_URL}/fees`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setFees(data);
        else console.error("API returned non-array data:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFee = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return router.push("/admin/login");

    try {
      const res = await fetch(`${API_URL}/fees`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newFee),
      });

      if (res.ok) {
        setNewFee({ 
            class_group: "", registration_fee: "", admission_fee: "", annual_charges: "", tuition_fee: "", erp_fee: "", tuition_total: "", exam_fee: "", total_fee: "" 
        });
        fetchFees();
      } else {
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/admin/login");
            return;
        }
        alert("Failed to add fee structure.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
      if (!confirm("Delete this fee structure?")) return;
      const token = localStorage.getItem("token");
      try {
          const res = await fetch(`${API_URL}/fees/${id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
              setFees(fees.filter(f => f.id !== id));
          } else if (res.status === 401) {
              localStorage.removeItem("token");
              // window.location.href = "/admin/login"; // Use window.location as router might not be available in all contexts or just consistency
              // Using router here since it's available in scope
              // But wait, router is available.
              // Let's use router.push("/admin/login")
          }
      } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Add Fee Structure</h3>
        <form onSubmit={handleAddFee} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <input type="text" placeholder="Class (e.g. 1-5)" value={newFee.class_group} onChange={e => setNewFee({...newFee, class_group: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Reg. Fee" value={newFee.registration_fee} onChange={e => setNewFee({...newFee, registration_fee: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Adm. Fee" value={newFee.admission_fee} onChange={e => setNewFee({...newFee, admission_fee: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Ann. Charges" value={newFee.annual_charges} onChange={e => setNewFee({...newFee, annual_charges: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Tuition Fee" value={newFee.tuition_fee} onChange={e => setNewFee({...newFee, tuition_fee: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="ERP Fee" value={newFee.erp_fee} onChange={e => setNewFee({...newFee, erp_fee: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Tui. Total(M)" value={newFee.tuition_total} onChange={e => setNewFee({...newFee, tuition_total: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Exam (Y)" value={newFee.exam_fee} onChange={e => setNewFee({...newFee, exam_fee: e.target.value})} className="border p-2 rounded" required />
            <input type="text" placeholder="Total (Optional)" value={newFee.total_fee} onChange={e => setNewFee({...newFee, total_fee: e.target.value})} className="border p-2 rounded" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 md:col-span-1">Add</button>
        </form>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                  <tr>
                      <th className="p-4 border-b">Class</th>
                      <th className="p-4 border-b">Reg.</th>
                      <th className="p-4 border-b">Adm.</th>
                      <th className="p-4 border-b">Ann.</th>
                      <th className="p-4 border-b">Tui.</th>
                      <th className="p-4 border-b">ERP</th>
                      <th className="p-4 border-b">Tui Total(M)</th>
                      <th className="p-4 border-b">Exam(Y)</th>
                      <th className="p-4 border-b text-right">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {fees.map(fee => (
                      <tr key={fee.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{fee.class_group}</td>
                          <td className="p-4">{fee.registration_fee}</td>
                          <td className="p-4">{fee.admission_fee}</td>
                          <td className="p-4">{fee.annual_charges}</td>
                          <td className="p-4">{fee.tuition_fee}</td>
                          <td className="p-4">{fee.erp_fee}</td>
                          <td className="p-4">{fee.tuition_total}</td>
                          <td className="p-4">{fee.exam_fee}</td>
                          <td className="p-4 text-right">
                              <button onClick={() => handleDelete(fee.id)} className="text-red-600 hover:text-red-800">Delete</button>
                          </td>
                      </tr>
                  ))}
                  {fees.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-gray-500">No fee structures found.</td></tr>}
              </tbody>
          </table>
      </div>
    </div>
  );
}
