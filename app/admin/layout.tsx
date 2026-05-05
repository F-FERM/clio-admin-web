"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Image,
  Briefcase,
  Ship,
  Truck,
  Workflow,
  Info,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const sidebarItems = [
  {
    label: "Home",
    icon: Home,
    children: [
      { label: "Hero", href: "/admin/home/vessel-landing", icon: Image },
      { label: "Service", href: "/admin/home/our-services", icon: Briefcase },
      { label: "Ship", href: "/admin/home/ship", icon: Ship },
      { label: "Transport", href: "/admin/home/transport", icon: Truck },
      { label: "Workflow", href: "/admin/home/workflow", icon: Workflow },
      { label: "FAQ", href: "/admin/home/faq", icon: Info },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>("Home");

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div className="flex min-h-screen">
      <aside className="h-screen w-[260px] bg-[#0F172A] text-white flex flex-col sticky top-0">
        {/* Header */}
        <div className="px-6 py-5 text-xl font-semibold border-b border-white/10">
          Admin Panel
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isOpen = openMenu === item.label;

            return (
              <div key={item.label}>
                {/* Parent Item */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Sub Items */}
                {isOpen && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((sub) => {
                      const SubIcon = sub.icon;
                      const isActive = pathname === sub.href;

                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-md text-sm
                            ${
                              isActive
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }
                          `}
                        >
                          <SubIcon size={16} />
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 bg-[#F6F8FA] p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
