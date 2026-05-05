"use client";

import { createWorkflowEfficiency } from "@/api/home/workflowefficiency";
import WorkflowForm from "@/app/components/WorkflowForm";
import { useRouter } from "next/navigation";

export default function CreateWorkflowPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      await createWorkflowEfficiency(data);
      router.push("/admin/home/workflow");
    } catch (err) {
      console.error("Create error:", err);
      alert("Failed to create workflow section");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Add New Workflow Efficiency Section</h1>
      <WorkflowForm onSubmit={handleSubmit} />
    </div>
  );
}
