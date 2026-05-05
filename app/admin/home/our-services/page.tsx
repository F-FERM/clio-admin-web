"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListOurService } from "@/interfaces/Home";
import { getServices, deleteService } from "@/api/home/service";

export default function ServicePage() {
  const [data, setData] = useState<ListOurService[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getServices();
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
    if (!confirm("Delete this item?")) return;
    try {
      await deleteService(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Service List</h1>
        <Link
          href="/admin/home/our-services/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Service
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Cards</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">{item.cards?.length || 0} cards</td>

              <td className="p-2 space-x-3">
                <Link
                  href={`/admin/home/our-services/edit/${item._id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
