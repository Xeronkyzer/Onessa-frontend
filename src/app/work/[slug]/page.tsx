"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/landing/Navbar";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/work">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </button>
          </Link>

          <div className="text-center py-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Project Details
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Project: {slug}
            </p>
            <p className="text-muted-foreground">
              This page will be customizable from the admin panel.
              <br />
              You can add images, videos, descriptions, and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
