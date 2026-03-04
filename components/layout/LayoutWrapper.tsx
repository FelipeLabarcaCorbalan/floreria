"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const hideChrome = pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideChrome && <Header />}

      <main className="flex-grow">{children}</main>

      {!hideChrome && <Footer />}

      {!hideChrome && <WhatsAppButton />}
    </div>
  );
}
