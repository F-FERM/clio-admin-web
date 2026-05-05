"use client";

import { useEffect, useState } from "react";
import { ListGlobalNetworkResponse } from "@/interfaces/Network";
import { ListGlobalNetworkApi, updateGlobalNetwork } from "@/api/network/network";
import NetworkForm from "@/app/components/NetworkForm";

export default function NetworkPage() {
  const [data, setData] = useState<ListGlobalNetworkResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await ListGlobalNetworkApi({});
      // Handle the case where the API might return an array or a single object
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
        alert("No ID found for updating. Please ensure a network section exists.");
        return;
    }
    try {
      await updateGlobalNetwork({ ...formData, _id: data._id });
      alert("Network section updated successfully!");
      fetchData();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update network section");
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
        <h1 className="text-2xl font-bold text-gray-800">Global Network Section</h1>
        <p className="text-gray-500">Manage the global network content and features.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        {data ? (
          <NetworkForm initialData={data} onSubmit={handleSubmit} />
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed">
            <p className="text-gray-500 italic">No network data found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
