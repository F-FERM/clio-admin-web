"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ListBlogApi, updateBlog } from "@/api/blog/blog";
import BlogPostForm from "@/app/components/BlogPostForm";
import { LisBlogResponse } from "@/interfaces/Blog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [data, setData] = useState<LisBlogResponse | null>(null);
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ListBlogApi({});
        setData(res);
        const item = res.cards.find((x: any) => x._id === id);
        if (item) {
          setPost(item);
        } else {
          alert("Post not found");
          router.push("/admin/blog/posts");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleSubmit = async (postData: any) => {
    if (!data) return;
    try {
      const updatedCards = data.cards.map((c: any) => 
        c._id === id ? { ...postData, _id: id } : c
      );
      await updateBlog({ ...data, cards: updatedCards, _id: data._id });
      router.push("/admin/blog/posts");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update blog post");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

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
          <h1 className="text-2xl font-bold text-gray-800">Edit Blog Post</h1>
          <p className="text-gray-500">Modify the existing article content.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        {post && <BlogPostForm initialData={post} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}
