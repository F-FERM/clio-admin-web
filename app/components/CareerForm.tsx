"use client";

import { useState } from "react";
import { ListCareerResponse } from "@/interfaces/Career";
import ImageUpload from "./ImageUpload";
import { Plus, Trash2 } from "lucide-react";

type Props = {
  initialData?: Partial<ListCareerResponse>;
  onSubmit: (data: any) => Promise<void>;
};

export default function CareerForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Partial<ListCareerResponse>>(
    initialData || {
      heading: "",
      description: "",
      cta: "",
      heroImage: "",
      whyItems: [],
      whoTitle: "",
      whoDescription: "",
      whoImage: "",
      whoImage2: "",
      jobs: [],
    }
  );

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = (arrayKey: "whyItems" | "jobs") => {
    const newItem = arrayKey === "whyItems" 
      ? { title: "", description: "", _id: Date.now().toString() }
      : { title: "", description: "", location: "", type: "Full-time", isActive: true, _id: Date.now().toString() };
    handleChange(arrayKey, [...(form[arrayKey] || []), newItem]);
  };

  const removeItem = (arrayKey: "whyItems" | "jobs", index: number) => {
    const updatedArray = [...(form[arrayKey] || [])];
    updatedArray.splice(index, 1);
    handleChange(arrayKey, updatedArray);
  };

  const handleArrayItemChange = (arrayKey: "whyItems" | "jobs", index: number, field: string, value: any) => {
    const updatedArray = [...(form[arrayKey] || [])] as any[];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    handleChange(arrayKey, updatedArray);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    
    // Clean payload: remove temporary _ids from nested arrays
    const payload = {
      ...form,
      whyItems: form.whyItems?.map(({ _id, ...rest }) => rest),
      jobs: form.jobs?.map(({ _id, ...rest }) => rest),
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-10 max-w-5xl">
      {/* Hero Section */}
      <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-bold border-b pb-3 text-gray-800">Hero Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input"
            placeholder="Main Heading"
            value={form.heading || ""}
            onChange={(e) => handleChange("heading", e.target.value)}
          />
          <input
            className="input"
            placeholder="CTA Text"
            value={form.cta || ""}
            onChange={(e) => handleChange("cta", e.target.value)}
          />
        </div>
        <textarea
          className="input min-h-[80px]"
          placeholder="Hero Description"
          value={form.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <ImageUpload
          label="Hero Image"
          value={form.heroImage || ""}
          onChange={(url) => handleChange("heroImage", url)}
        />
      </div>

      {/* Why Join Us Section */}
      <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-bold text-gray-800">Why Join Us</h3>
          <button
            type="button"
            onClick={() => addItem("whyItems")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
          >
            <Plus size={18} /> Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {form.whyItems?.map((item, index) => (
            <div key={item._id || index} className="p-4 border rounded-xl bg-gray-50 relative group">
              <button
                type="button"
                onClick={() => removeItem("whyItems", index)}
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} />
              </button>
              <div className="space-y-3">
                <input
                  className="input bg-white"
                  placeholder="Item Title"
                  value={item.title}
                  onChange={(e) => handleArrayItemChange("whyItems", index, "title", e.target.value)}
                />
                <textarea
                  className="input bg-white min-h-[80px]"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => handleArrayItemChange("whyItems", index, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who We Are / Culture Section */}
      <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-xl font-bold border-b pb-3 text-gray-800">Culture Section</h3>
        <input
          className="input"
          placeholder="Culture Title"
          value={form.whoTitle || ""}
          onChange={(e) => handleChange("whoTitle", e.target.value)}
        />
        <textarea
          className="input min-h-[120px]"
          placeholder="Culture Description"
          value={form.whoDescription || ""}
          onChange={(e) => handleChange("whoDescription", e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUpload
            label="Culture Image 1"
            value={form.whoImage || ""}
            onChange={(url) => handleChange("whoImage", url)}
          />
          <ImageUpload
            label="Culture Image 2"
            value={form.whoImage2 || ""}
            onChange={(url) => handleChange("whoImage2", url)}
          />
        </div>
      </div>

      {/* Jobs Section */}
      <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-bold text-gray-800">Open Positions</h3>
          <button
            type="button"
            onClick={() => addItem("jobs")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
          >
            <Plus size={18} /> Add Job
          </button>
        </div>

        <div className="space-y-6">
          {form.jobs?.map((job, index) => (
            <div key={job._id || index} className="p-6 border rounded-xl bg-gray-50 relative group">
              <button
                type="button"
                onClick={() => removeItem("jobs", index)}
                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input
                    className="input bg-white"
                    placeholder="Job Title"
                    value={job.title}
                    onChange={(e) => handleArrayItemChange("jobs", index, "title", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className="input bg-white"
                      placeholder="Location"
                      value={job.location}
                      onChange={(e) => handleArrayItemChange("jobs", index, "location", e.target.value)}
                    />
                    <input
                      className="input bg-white"
                      placeholder="Type (e.g. Full-time)"
                      value={job.type}
                      onChange={(e) => handleArrayItemChange("jobs", index, "type", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`isActive-${index}`}
                      checked={job.isActive}
                      onChange={(e) => handleArrayItemChange("jobs", index, "isActive", e.target.checked)}
                    />
                    <label htmlFor={`isActive-${index}`} className="text-sm font-medium text-gray-700">Active / Accepting Applications</label>
                  </div>
                </div>
                <textarea
                  className="input bg-white min-h-[120px]"
                  placeholder="Job Description / Requirements"
                  value={job.description}
                  onChange={(e) => handleArrayItemChange("jobs", index, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full px-4 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg sticky bottom-6 z-10">
        Update Career Page Section
      </button>
    </form>
  );
}
