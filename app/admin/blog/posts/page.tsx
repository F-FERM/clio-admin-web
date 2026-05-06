"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/interfaces/Blog";
import { ListBlogSectionApi, updateBlog, deleteBlog } from "@/api/blog/blog";
import { Plus, Edit, Trash2, Calendar, Tag } from "lucide-react";

export default function BlogPostsPage() {
  const [data, setData] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await ListBlogSectionApi({});
      const actualData = Array.isArray(res) ? res : (res as any)?.data || [];
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

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    
    try {
      await deleteBlog(postId);
      alert("Post deleted!");
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Posts</h1>
          <p className="text-gray-500">Manage individual blog posts and articles.</p>
        </div>

        <Link
          href="/admin/blog/posts/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? (
          data.map((post) => (
            <div key={post._id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col group">
              <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">No Image</div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"><Tag size={12} /> {post.tag}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{post.description}</p>
                
                <div className="flex gap-3 pt-4 border-t">
                  <Link
                    href={`/admin/blog/posts/edit/${post._id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <Edit size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed">
            <p className="text-gray-500 italic">No blog posts found. Create your first post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
