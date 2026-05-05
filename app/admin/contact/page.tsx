"use client";

import { useEffect, useState } from "react";
import { ListContactResponse } from "@/interfaces/Contact";
import { ListContactApi, updateContact, createContact } from "@/api/contact/contact";
import ContactForm from "@/app/components/ContactForm";

export default function ContactPage() {
  const [data, setData] = useState<ListContactResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await ListContactApi({});
      // Handle array or object response based on pattern observed in other pages
      const actualData = Array.isArray(res) ? res[0] : (res as any)?.data?.[0] || res;
      setData(actualData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (formData: any) => {
    try {
      if (data?._id) {
        await updateContact(data._id, formData);
        alert("Contact section updated successfully!");
      } else {
        await createContact(formData);
        alert("Contact section created successfully!");
      }
      fetchData();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to save contact section");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Contact Section</h1>
        <p className="text-gray-500">Manage contact information, form settings, and bottom section content.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-dashed">
        <ContactForm 
          initialData={data || undefined} 
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}
