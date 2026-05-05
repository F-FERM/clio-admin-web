"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHeroes, updateHero } from "@/api/home/page";
import HeroForm from "@/app/components/HeroForm";


export default function EditHeroPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getHeroes();
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
    await updateHero({ ...form, _id: id as string });
    router.push("/admin/home/vessel-landing");
  };

  if (!data) return <p>Loading...</p>;

  return <HeroForm initialData={data} onSubmit={handleSubmit} />;
}