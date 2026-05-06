"use client";

import { useEffect, useState } from "react";
import { LisBlogResponse } from "@/interfaces/Blog";
import {
  ListBlogApi,
  updateBlogHome,
  updateBlogSection,
  ListBlogSectionApi,
  updateBlog,
} from "@/api/blog/blog";
import BlogLandingForm from "@/app/components/BlogLandingForm";

export default function BlogLandingPage() {
  const [data, setData] = useState<LisBlogResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [homeRes, articlesRes] = await Promise.all([
        ListBlogApi({}),
        ListBlogSectionApi({}),
      ]);
      
      const homeData = Array.isArray(homeRes)
        ? homeRes[0]
        : (homeRes as any)?.data?.[0] || homeRes;
        
      const articles = Array.isArray(articlesRes) 
        ? articlesRes 
        : (articlesRes as any)?.data || [];
        
      // Override the cards in homeData with the ones from /blog if that's what's intended
      setData({ ...homeData, cards: articles });
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
      await updateBlogHome(formData);
      alert("Blog landing page updated successfully!");
      fetchData();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save blog landing page");
    }
  };

  const handleIndividualCardUpdate = async (id: string, cardData: any) => {
    try {
      await updateBlog(id, cardData);
      alert("Blog post updated successfully!");
      fetchData();
    } catch (err: any) {
      console.error("Card update error:", err);
      const message = err?.message || err?.error || "Failed to update blog post";
      alert(message);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Blog Landing Page</h1>
        <p className="text-gray-500">
          Manage the hero section and main content of the blog page.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        {data && (
          <BlogLandingForm
            initialData={data}
            onSubmit={handleSubmit}
            onIndividualCardUpdate={handleIndividualCardUpdate}
          />
        )}
      </div>
    </div>
  );
}
