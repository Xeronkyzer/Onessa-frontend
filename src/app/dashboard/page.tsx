"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectsView from "@/components/dashboard/ProjectsView";
import NewProjectModal from "@/components/dashboard/NewProjectModal";
import MessagesView from "@/components/dashboard/MessagesView";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<"projects" | "messages">("projects");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

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
    <>
      <DashboardSidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        onNewProject={() => setIsNewProjectModalOpen(true)}
      />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {currentView === "projects" ? (
            <ProjectsView onNewProject={() => setIsNewProjectModalOpen(true)} />
          ) : (
            <MessagesView />
          )}
        </main>
      </div>

      <NewProjectModal 
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex animate-fadeIn">
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
