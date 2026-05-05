"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListWorkFlowEfficiency } from "@/interfaces/Home";
import { getWorkflowEfficiency, deleteWorkflowEfficiency } from "@/api/home/workflowefficiency";

export default function WorkflowPage() {
  const [data, setData] = useState<ListWorkFlowEfficiency[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getWorkflowEfficiency();
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
      await deleteWorkflowEfficiency(id);
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
        <h1 className="text-xl font-semibold">Workflow Efficiency List</h1>
        <Link
          href="/admin/home/workflow/create"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Workflow Section
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Heading</th>
            <th className="p-2">CTA</th>
            <th className="p-2">Steps</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.heading}</td>
              <td className="p-2">{item.cta}</td>
              <td className="p-2">{item.steps?.length || 0} steps</td>

              <td className="p-2 space-x-3 text-sm">
                <Link
                  href={`/admin/home/workflow/edit/${item._id}`}
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
