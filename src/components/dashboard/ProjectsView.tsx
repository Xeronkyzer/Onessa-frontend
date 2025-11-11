"use client";

import { Clock, CheckCircle2, AlertCircle, Plus, MessageSquare } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "E-Commerce Website",
    status: "in-progress",
    progress: 65,
    deadline: "Dec 20, 2025",
    messages: 12,
    description: "Modern e-commerce platform with payment integration",
  },
  {
    id: 2,
    name: "Mobile App Design",
    status: "review",
    progress: 90,
    deadline: "Nov 15, 2025",
    messages: 5,
    description: "iOS and Android app design with Figma prototypes",
  },
  {
    id: 3,
    name: "Brand Identity",
    status: "completed",
    progress: 100,
    deadline: "Nov 1, 2025",
    messages: 23,
    description: "Complete brand identity package with logo and guidelines",
  },
];

interface ProjectsViewProps {
  onNewProject: () => void;
}

export default function ProjectsView({ onNewProject }: ProjectsViewProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      "review": "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
      "completed": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    };
    return styles[status as keyof typeof styles];
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 size={16} />;
    if (status === "review") return <AlertCircle size={16} />;
    return <Clock size={16} />;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage and track your ongoing projects</p>
        </div>
        <button
          onClick={onNewProject}
          className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:scale-105 transition-all"
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-muted/30 border border-border rounded-xl hover:border-foreground/20 transition-all cursor-pointer group"
          >
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                {getStatusIcon(project.status)}
                {project.status.replace("-", " ")}
              </span>
              <button className="p-2 hover:bg-muted rounded-lg transition-all">
                <MessageSquare size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Project Name */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-foreground transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {project.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Due: {project.deadline}</span>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} />
                {project.messages}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
