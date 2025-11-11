"use client";

import { Briefcase, MessageSquare, Plus, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

interface DashboardSidebarProps {
  currentView: "projects" | "messages";
  onViewChange: (view: "projects" | "messages") => void;
  onNewProject: () => void;
}

export default function DashboardSidebar({ currentView, onViewChange, onNewProject }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleLogout = () => {
    // Firebase logout will go here
    router.push("/login");
  };

  const handleProjectsClick = () => {
    if (pathname === "/dashboard") {
      // Already on dashboard, just change view
      onViewChange("projects");
    } else {
      // Navigate to dashboard
      router.push("/dashboard");
    }
  };

  const handleMessagesClick = () => {
    if (pathname === "/dashboard") {
      // Already on dashboard, just change view
      onViewChange("messages");
    } else {
      // Navigate to dashboard with messages view
      router.push("/dashboard?view=messages");
    }
  };

  const handleNewProjectClick = () => {
    if (pathname === "/dashboard") {
      // Already on dashboard, just open modal
      onNewProject();
    } else {
      // Navigate to dashboard and open modal
      router.push("/dashboard?action=new-project");
    }
  };

  return (
    <aside className="w-64 bg-muted/30 border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight cursor-pointer hover:text-primary transition-colors">
            ONESSA
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={handleNewProjectClick}
          className="w-full flex items-center gap-3 px-4 py-3 bg-foreground text-background rounded-lg font-medium hover:scale-[1.02] transition-all"
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>

        <button
          onClick={handleProjectsClick}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
            pathname === "/dashboard" && currentView === "projects"
              ? "bg-foreground/10 text-foreground"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Briefcase size={20} />
          <span>My Projects</span>
        </button>

        <button
          onClick={handleMessagesClick}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
            pathname === "/dashboard" && currentView === "messages"
              ? "bg-foreground/10 text-foreground"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <MessageSquare size={20} />
          <span>Messages</span>
          <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            3
          </span>
        </button>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <button 
          onClick={handleBackToHome}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-muted-foreground hover:bg-muted/50 transition-all"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
