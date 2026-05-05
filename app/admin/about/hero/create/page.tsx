"use client";

import { useRouter } from "next/navigation";
import { createAboutHero } from "@/api/about/herosection";
import AboutHeroForm from "@/app/components/AboutHeroForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateAboutHeroPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createAboutHero(data);
      router.push("/admin/about/hero");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create About Hero section");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/about/hero"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Hero Section</h1>
          <p className="text-gray-500">Create a new hero section for the About page.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        <AboutHeroForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
