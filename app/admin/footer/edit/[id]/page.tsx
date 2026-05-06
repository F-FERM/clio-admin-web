"use client";

import { useEffect, useState } from "react";
import { updateFooter, getFooter } from "@/api/footer/footer";
import FooterForm from "@/app/components/FooterForm";
import { useRouter, useParams } from "next/navigation";
import { ListFooterResponse } from "@/interfaces/Footer";

export default function EditFooterPage() {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState<ListFooterResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFooter();
        if (data._id === params.id) {
          setInitialData(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load footer data");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      await updateFooter({ ...data, _id: params.id as string });
      router.push("/admin/footer");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update footer");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Edit Footer</h1>
      {initialData && <FooterForm initialData={initialData} onSubmit={handleSubmit} />}
    </div>
  );
}
