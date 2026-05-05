"use client";

import { useEffect, useState } from "react";
import { ListSafetyResponse } from "@/interfaces/Safety";
import { ListSafetyApi, updateSafety } from "@/api/safety/safety";
import SafetyForm from "@/app/components/SafetyForm";

export default function SafetyPage() {
  const [data, setData] = useState<ListSafetyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await ListSafetyApi({});
      const actualData = Array.isArray(res) ? res[0] : (res as any)?.data?.[0] || res;
      setData(actualData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (formData: any) => {
    if (!data?._id) {
        alert("No ID found for updating.");
        return;
    }
    try {
      await updateSafety({ ...formData, _id: data._id });
      alert("Safety & Compliance section updated successfully!");
      fetchData();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update safety section");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Safety & Compliance Section</h1>
        <p className="text-gray-500">Manage health, safety, environmental principles, and compliance pillars.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        {data ? (
          <SafetyForm initialData={data} onSubmit={handleSubmit} />
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed">
            <p className="text-gray-500 italic">No safety data found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
