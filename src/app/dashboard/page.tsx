"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectsView from "@/components/dashboard/ProjectsView";
import NewProjectModal from "@/components/dashboard/NewProjectModal";
import MessagesView from "@/components/dashboard/MessagesView";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<"projects" | "messages">("projects");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Handle URL parameters
  useEffect(() => {
    const view = searchParams.get("view");
    const action = searchParams.get("action");

    if (view === "messages") {
      setCurrentView("messages");
    }

    if (action === "new-project") {
      setIsNewProjectModalOpen(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex animate-fadeIn">
      {/* Sidebar */}
      <DashboardSidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        onNewProject={() => setIsNewProjectModalOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {currentView === "projects" ? (
            <ProjectsView onNewProject={() => setIsNewProjectModalOpen(true)} />
          ) : (
            <MessagesView />
          )}
        </main>
      </div>

      {/* New Project Modal */}
      <NewProjectModal 
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
}
