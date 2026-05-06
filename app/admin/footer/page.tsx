"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ListFooterResponse } from "@/interfaces/Footer";
import { getFooter, deleteFooter } from "@/api/footer/footer";

export default function FooterPage() {
  const [data, setData] = useState<ListFooterResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getFooter();
      setData(res);
    } catch (err) {
      console.error("Fetch error:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this footer?")) return;
    try {
      await deleteFooter(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Footer Management</h1>
        {data ? (
          <div className="space-x-3">
            <Link
              href={`/admin/footer/edit/${data._id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(data._id)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        ) : (
          <Link
            href="/admin/footer/create"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Footer
          </Link>
        )}
      </div>

      {data ? (
        <div className="border rounded-lg p-6 space-y-6 bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Brand</p>
              <p className="font-medium">{data.brand}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-medium">{data.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Office Address</p>
              <p className="font-medium">{data.officeAddress}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Sections ({data.sections?.length || 0})</h3>
            <div className="space-y-4">
              {data.sections?.map((section, idx) => (
                <div key={idx} className="p-4 border rounded bg-white">
                  <h4 className="font-medium mb-2">{section.title}</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {section.links?.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        • {link.label} ({link.url})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No footer data found. Create one to get started.</p>
      )}
    </div>
  );
}
