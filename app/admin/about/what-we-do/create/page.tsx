"use client";

import { useRouter } from "next/navigation";
import { createWedoChooseClio } from "@/api/about/wedochooseclio";
import WhatWeDoForm from "@/app/components/WhatWeDoForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateWhatWeDoPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createWedoChooseClio(data);
      router.push("/admin/about/what-we-do");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create What We Do section");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/about/what-we-do"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add What We Do Section</h1>
          <p className="text-gray-500">Create a new What We Do / Why Choose Clio section.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        <WhatWeDoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
