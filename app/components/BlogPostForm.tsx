"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";

type BlogPost = {
  _id?: string;
  title: string;
  description: string;
  content: string;
  image: string;
  tag: string;
  tags: string[];
  date: string;
  isPublished: boolean;
};

type Props = {
  initialData?: Partial<BlogPost>;
  onSubmit: (data: any) => Promise<void>;
};

export default function BlogPostForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Partial<BlogPost>>(
    initialData || {
      title: "",
      description: "",
      content: "",
      image: "",
      tag: "",
      tags: [],
      date: new Date().toISOString().split("T")[0],
      isPublished: true,
    }
  );

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTags = (value: string) => {
    handleChange("tags", value.split(",").map(t => t.trim()).filter(t => t !== ""));
  };

  const submit = async (e: any) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-8 max-w-4xl">
      <div className="space-y-6 bg-white p-6 rounded-xl border">
        <h3 className="text-xl font-semibold border-b pb-3">Post Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Post Title"
            value={form.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <input
            className="input"
            type="date"
            value={form.date || ""}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Main Category (Tag)"
            value={form.tag || ""}
            onChange={(e) => handleChange("tag", e.target.value)}
          />
          <input
            className="input"
            placeholder="Tags (comma separated)"
            value={form.tags?.join(", ") || ""}
            onChange={(e) => handleTags(e.target.value)}
          />
        </div>

        <textarea
          className="input min-h-[80px]"
          placeholder="Short Description"
          value={form.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <textarea
          className="input min-h-[300px]"
          placeholder="Full Content (Markdown or HTML supported)"
          value={form.content || ""}
          onChange={(e) => handleChange("content", e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            className="w-4 h-4 text-blue-600"
            checked={form.isPublished || false}
            onChange={(e) => handleChange("isPublished", e.target.checked)}
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            Published
          </label>
        </div>

        <ImageUpload
          label="Feature Image"
          value={form.image || ""}
          onChange={(url) => handleChange("image", url)}
        />
      </div>

      <button className="w-full px-4 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg">
        {initialData?._id ? "Update Blog Post" : "Create Blog Post"}
      </button>
    </form>
  );
}
