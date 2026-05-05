"use client";

import { useEffect, useState } from "react";
import { ListCareerResponse } from "@/interfaces/Career";
import { ListCareerApi, updateCareer } from "@/api/career/career";
import CareerForm from "@/app/components/CareerForm";

export default function CareerPage() {
  const [data, setData] = useState<ListCareerResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await ListCareerApi({});
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
        alert("No ID found for updating. Please ensure a career section exists.");
        return;
    }
    try {
      await updateCareer({ ...formData, _id: data._id });
      alert("Career page updated successfully!");
      fetchData();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update career page");
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
        <h1 className="text-2xl font-bold text-gray-800">Career Page Section</h1>
        <p className="text-gray-500">Manage the career hero, benefits, culture, and job listings.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        {data ? (
          <CareerForm initialData={data} onSubmit={handleSubmit} />
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed">
            <p className="text-gray-500 italic">No career data found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}
