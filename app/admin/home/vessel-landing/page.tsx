"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ListVesselLanding } from "@/interfaces/Home";
import { deleteHero, getHeroes } from "@/api/home/page";

export default function HeroPage() {
  const [data, setData] = useState<ListVesselLanding[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getHeroes();
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
    await deleteHero(id);
    fetchData();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Hero List</h1>

        <Link
          href="/admin/home/vessel-landing/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Hero
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Heading</th>
            <th className="p-2">Summary</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.heading}</td>
              <td className="p-2">{item.summary}</td>

              <td className="p-2 space-x-3">
                <Link
                  href={`/admin/home/vessel-landing/edit/${item._id}`}
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