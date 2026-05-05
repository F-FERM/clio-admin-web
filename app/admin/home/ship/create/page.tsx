"use client";

import { createShipManagement } from "@/api/home/shiplogistics";
import ShipForm from "@/app/components/ShipForm";
import { useRouter } from "next/navigation";

export default function CreateShipPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createShipManagement(data);
      router.push("/admin/home/ship");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create ship section");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Add New Ship Management Section</h1>
      <ShipForm onSubmit={handleSubmit} />
    </div>
  );
}
