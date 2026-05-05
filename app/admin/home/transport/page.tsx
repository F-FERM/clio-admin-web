"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListTransportMaritime } from "@/interfaces/Home";
import { getTransportMaritime, deleteTransportMaritime } from "@/api/home/transportmaritime";

export default function TransportPage() {
  const [data, setData] = useState<ListTransportMaritime[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getTransportMaritime();
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
      await deleteTransportMaritime(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Transport Maritime List</h1>
        <Link
          href="/admin/home/transport/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Transport Section
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Heading</th>
            <th className="p-2">Card Title</th>
            <th className="p-2">CTA</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.heading}</td>
              <td className="p-2">{item.cardTitle}</td>
              <td className="p-2">{item.cta}</td>

              <td className="p-2 space-x-3 text-sm">
                <Link
                  href={`/admin/home/transport/edit/${item._id}`}
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
