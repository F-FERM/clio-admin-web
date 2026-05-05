"use client";

import { createHero } from "@/api/home/page";
import HeroForm from "@/app/components/HeroForm";
import { useRouter } from "next/navigation";


export default function CreateHeroPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createHero(data);
    router.push("/admin/home/vessel-landing");
  };

  return <HeroForm onSubmit={handleSubmit} />;
}