"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getServices, updateService } from "@/api/home/service";
import ServiceForm from "@/app/components/ServiceForm";

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getServices();
        const list = Array.isArray(res) ? res : (res as any)?.data || [res];
        const item = Array.isArray(list) ? list.find((i: any) => i._id === id) : null;
        setData(item);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetch();
  }, [id]);

  const handleSubmit = async (form: any) => {
    try {
      await updateService({ ...form, _id: id as string });
      router.push("/admin/home/our-services");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update service");
    }
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Edit Service Section</h1>
      <ServiceForm initialData={data} onSubmit={handleSubmit} />
    </div>
  );
}
