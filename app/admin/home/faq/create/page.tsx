"use client";

import { createFaqSection } from "@/api/home/faqsection";
import FaqForm from "@/app/components/FaqForm";
import { useRouter } from "next/navigation";

export default function CreateFaqPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createFaqSection(data);
      router.push("/admin/home/faq");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create FAQ section");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Add New FAQ Section</h1>
      <FaqForm onSubmit={handleSubmit} />
    </div>
  );
}
