"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

interface ContactQuery {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submitted_at: string;
}

export default function ContactTable() {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchQueries = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/forms/contact`, {
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
          setQueries(data);
        } else {
            console.error("API returned non-array data:", data);
            setQueries([]);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
        setQueries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [router]);

  if (loading) return <div className="text-center py-4">Loading queries...</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Contact Inquiries</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queries.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No queries found.</td>
               </tr>
            ) : (
                queries.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{item.phone}</div>
                      <div className="text-xs text-gray-400">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={async () => {
                          if (!confirm("Are you sure you want to delete this query?")) return;
                          try {
                            const token = localStorage.getItem("token");
                            const res = await fetch(`${API_URL}/forms/contact/${item.id}`, {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            if (res.ok) {
                              setQueries(queries.filter((q) => q.id !== item.id));
                            } else {
                              alert("Failed to delete query.");
                            }
                          } catch (err) {
                            console.error(err);
                            alert("Error deleting query.");
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
