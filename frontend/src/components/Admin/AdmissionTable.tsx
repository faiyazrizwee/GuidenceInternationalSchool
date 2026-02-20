"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

interface Admission {
  id: number;
  student_name: string;
  grade_applying_for: string;
  parent_name: string;
  contact_number: string;
  email?: string;
  date_of_birth: string;
  submitted_at: string;
}

export default function AdmissionTable() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmissions = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/forms/admission`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            router.push("/admin/login");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (Array.isArray(data)) {
          setAdmissions(data);
        } else {
            console.error("API returned non-array data:", data);
            setAdmissions([]);
        }

      } catch (error) {
        console.error("Error fetching admissions:", error);
        setAdmissions([]); // Ensure it's always an array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, [router]);

  if (loading) return <div className="text-center py-4">Loading admissions...</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Admission Applications</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admissions.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No applications found.</td>
               </tr>
            ) : (
                admissions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.student_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.grade_applying_for}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.parent_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{item.contact_number}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={async () => {
                          if (!confirm("Are you sure you want to delete this application?")) return;
                          try {
                            const token = localStorage.getItem("token");
                            const res = await fetch(`${API_URL}/forms/admission/${item.id}`, {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            if (res.ok) {
                              setAdmissions(admissions.filter((a) => a.id !== item.id));
                            } else {
                              alert("Failed to delete application.");
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Error deleting application.");
                          }
                        }}
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
