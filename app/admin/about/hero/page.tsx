"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListAboutHeroSection } from "@/interfaces/About";
import { deleteAboutHero, ListAboutHeroSectionApi } from "@/api/about/herosection";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AboutHeroPage() {
  const [data, setData] = useState<ListAboutHeroSection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await ListAboutHeroSectionApi({});
      const arrayData = Array.isArray(res) ? res : (res as any)?.data || [res];
      setData(Array.isArray(arrayData) ? arrayData : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this About Hero section?")) return;
    try {
      await deleteAboutHero(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">About Hero Section</h1>
          <p className="text-gray-500">Manage the hero section of the About page.</p>
        </div>

        <Link
          href="/admin/about/hero/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Add Hero Section
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-gray-700">Heading</th>
              <th className="p-4 font-semibold text-gray-700">Hero Image</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-800 font-medium">{item.heading}</td>
                  <td className="p-4 text-gray-600">
                    {item.heroImage ? (
                      <img src={item.heroImage} alt="Hero" className="h-12 w-20 object-cover rounded border" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/about/hero/edit/${item._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500 italic">
                  No About Hero sections found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
