"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ListAboutHeroSectionApi, updateAboutHero } from "@/api/about/herosection";
import AboutHeroForm from "@/app/components/AboutHeroForm";
import { ListAboutHeroSection } from "@/interfaces/About";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditAboutHeroPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [initialData, setInitialData] = useState<ListAboutHeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ListAboutHeroSectionApi({});
        const arrayData = Array.isArray(res) ? res : (res as any)?.data || [res];
        const item = (arrayData as ListAboutHeroSection[]).find((x) => x._id === id);
        if (item) {
          setInitialData(item);
        } else {
          alert("Item not found");
          router.push("/admin/about/hero");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleSubmit = async (data: any) => {
    try {
      await updateAboutHero({ ...data, _id: id });
      router.push("/admin/about/hero");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update About Hero section");
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
          href="/admin/about/hero"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Hero Section</h1>
          <p className="text-gray-500">Modify the existing hero section content.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        {initialData && <AboutHeroForm initialData={initialData} onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}
