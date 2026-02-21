"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { useRouter } from "next/navigation";

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  category: string;
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [newImage, setNewImage] = useState({ title: "", image_url: "", category: "General" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_URL}/gallery`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setImages(data);
        else console.error("API returned non-array data:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/admin/login");
        return;
    }

    try {
      const res = await fetch(`${API_URL}/gallery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            ...newImage,
            image_url: newImage.image_url.trim().replace(/^frontend\/public\//, "/").replace(/^public\//, "/")
        }),
      });

      if (res.ok) {
        setNewImage({ title: "", image_url: "", category: "General" }); // Reset form
        fetchImages(); // Refresh list
      } else {
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/admin/login");
            return;
        }
        alert("Failed to add image.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding image.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setImages(images.filter((img) => img.id !== id));
      } else if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Image Form */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Add New Image</h3>
        <form onSubmit={handleAddImage} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              required
              placeholder="https://example.com/image.jpg"
              value={newImage.image_url}
              onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (Optional)</label>
            <input
              type="text"
              placeholder="Sports Day"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
                value={newImage.category}
                onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            >
                <option value="General">General</option>
                <option value="Events">Events</option>
                <option value="Campus">Campus</option>
                <option value="Sports">Sports</option>
                <option value="Achievements">Achievements</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Image
          </button>
        </form>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Gallery Images ({images.length})</h3>
          {loading ? <p>Loading...</p> : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img) => (
                    <div key={img.id} className="group relative rounded-lg overflow-hidden border border-gray-200 aspect-square">
                        <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white text-xs truncate">
                            {img.title || "No Title"}
                        </div>
                        <button 
                            onClick={() => handleDelete(img.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            title="Delete"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                {images.length === 0 && <p className="text-gray-500 col-span-full">No images added yet.</p>}
            </div>
          )}
      </div>
    </div>
  );
}
