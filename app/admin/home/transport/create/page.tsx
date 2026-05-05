"use client";

import { createTransportMaritime } from "@/api/home/transportmaritime";
import TransportForm from "@/app/components/TransportForm";
import { useRouter } from "next/navigation";

export default function CreateTransportPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createTransportMaritime(data);
      router.push("/admin/home/transport");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create transport section");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Add New Transport Maritime Section</h1>
      <TransportForm onSubmit={handleSubmit} />
    </div>
  );
}
