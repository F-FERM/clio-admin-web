"use client";

import { createService } from "@/api/home/service";
import ServiceForm from "@/app/components/ServiceForm";
import { useRouter } from "next/navigation";

export default function CreateServicePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createService(data);
      router.push("/admin/home/our-services");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create service");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Add New Service Section</h1>
      <ServiceForm onSubmit={handleSubmit} />
    </div>
  );
}
