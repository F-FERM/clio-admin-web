"use client";

import { useEffect, useState } from "react";
import { LisBlogResponse } from "@/interfaces/Blog";
import { ListBlogApi, updateBlog, createBlog } from "@/api/blog/blog";
import BlogLandingForm from "@/app/components/BlogLandingForm";

export default function BlogLandingPage() {
  const [data, setData] = useState<LisBlogResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await ListBlogApi({});
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
    try {
      if (data?._id) {
        await updateBlog({ ...formData, _id: data._id });
        alert("Blog landing page updated successfully!");
      } else {
        await createBlog(formData);
        alert("Blog landing page created successfully!");
      }
      fetchData();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save blog landing page");
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
        <h1 className="text-2xl font-bold text-gray-800">Blog Landing Page</h1>
        <p className="text-gray-500">Manage the hero section and main content of the blog page.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        {data && <BlogLandingForm initialData={data} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}
