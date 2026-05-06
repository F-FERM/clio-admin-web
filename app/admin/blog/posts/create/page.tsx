"use client";

import { useRouter } from "next/navigation";
import { createBlogPost } from "@/api/blog/blog";
import BlogPostForm from "@/app/components/BlogPostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPostPage() {
  const router = useRouter();

  const handleSubmit = async (postData: any) => {
    try {
      await createBlogPost(postData);
      router.push("/admin/blog/posts");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create blog post");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog/posts"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">New Blog Post</h1>
          <p className="text-gray-500">Create and publish a new article.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        <BlogPostForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
