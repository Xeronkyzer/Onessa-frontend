"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  DollarSign, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  AlertCircle,
  GripVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Search,
  Filter,
  CheckCircle as Check,
  XCircle,
  IndianRupee
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import ThemeToggle from "@/components/ThemeToggle";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-muted/30 border-r border-border transition-all duration-300 flex flex-col`}>
          <div className="p-6 border-b border-border flex items-center justify-between">
            {sidebarOpen && <h1 className="text-xl font-bold">ONESSA Admin</h1>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg transition-colors">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setCurrentView("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === "overview" ? "bg-foreground text-background" : "hover:bg-muted"}`}>
              <LayoutDashboard size={20} />
              {sidebarOpen && <span>Overview</span>}
            </button>
            <button onClick={() => setCurrentView("projects")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === "projects" ? "bg-foreground text-background" : "hover:bg-muted"}`}>
              <Briefcase size={20} />
              {sidebarOpen && <span>Projects</span>}
            </button>
            <button onClick={() => setCurrentView("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === "users" ? "bg-foreground text-background" : "hover:bg-muted"}`}>
              <Users size={20} />
              {sidebarOpen && <span>Users</span>}
            </button>
            <button onClick={() => setCurrentView("payments")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === "payments" ? "bg-foreground text-background" : "hover:bg-muted"}`}>
              <DollarSign size={20} />
              {sidebarOpen && <span>Payments</span>}
            </button>
            <button onClick={() => setCurrentView("messages")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === "messages" ? "bg-foreground text-background" : "hover:bg-muted"}`}>
              <MessageSquare size={20} />
              {sidebarOpen && <span>Messages</span>}
              {sidebarOpen && <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>}
            </button>
          </nav>

          <div className="p-4 border-t border-border">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border px-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold capitalize">{currentView}</h2>
              <p className="text-sm text-muted-foreground">Manage your platform</p>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {currentView === "overview" && <OverviewContent />}
            {currentView === "projects" && <ProjectsContent />}
            {currentView === "users" && <UsersContent />}
            {currentView === "payments" && <PaymentsContent />}
            {currentView === "messages" && <MessagesContent />}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function OverviewContent() {
  const stats = [
    { label: "Total Projects", value: "24", change: "+3 this month", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Users", value: "156", change: "+12 this week", icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Total Revenue", value: "₹2.4L", change: "+18% from last month", icon: DollarSign, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Pending Requests", value: "8", change: "Needs attention", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" }
  ];

  const recentActivity = [
    { user: "John Doe", action: "submitted a new project", time: "2 hours ago", status: "pending" },
    { user: "Jane Smith", action: "made a payment", time: "5 hours ago", status: "completed" },
    { user: "Mike Johnson", action: "sent a message", time: "1 day ago", status: "new" },
    { user: "Sarah Wilson", action: "project milestone completed", time: "2 days ago", status: "completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 bg-muted/30 border border-border rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                  <Icon size={24} className={stat.color} />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold">{activity.user.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  activity.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                  activity.status === 'pending' ? 'bg-orange-500/20 text-orange-500' :
                  'bg-blue-500/20 text-blue-500'
                }`}>
                  {activity.status}
                </span>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock size={12} />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  const [projects, setProjects] = useState([
    { id: "1", title: "E-Commerce Platform", category: "Web Development", status: "published", order: 1, featured: true },
    { id: "2", title: "Healthcare App", category: "Mobile App", status: "published", order: 2, featured: true },
    { id: "3", title: "Real Estate Portal", category: "Web Development", status: "draft", order: 3, featured: false },
    { id: "4", title: "Fitness Tracker", category: "Mobile App", status: "published", order: 4, featured: true },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleStatus = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p));
  };

  const toggleFeatured = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Projects</h2>
          <p className="text-muted-foreground">Manage your showcase projects</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:scale-105 transition-all">
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-6">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {projects.map((project) => (
                <SortableProjectItem key={project.id} project={project} onToggleStatus={toggleStatus} onToggleFeatured={toggleFeatured} onDelete={deleteProject} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {isAddModalOpen && <AddProjectModal onClose={() => setIsAddModalOpen(false)} />}
    </div>
  );
}

function SortableProjectItem({ project, onToggleStatus, onToggleFeatured, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-4 p-4 bg-background border border-border rounded-lg hover:border-foreground/20 transition-all">
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-2 hover:bg-muted rounded-lg transition-colors">
        <GripVertical size={20} className="text-muted-foreground" />
      </button>
      <div className="flex-1">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.category}</p>
      </div>
      {project.featured && <span className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-xs font-semibold">Featured</span>}
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'published' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>{project.status}</span>
      <div className="flex items-center gap-2">
        <button onClick={() => onToggleFeatured(project.id)} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Toggle Featured">
          {project.featured ? '⭐' : '☆'}
        </button>
        <button onClick={() => onToggleStatus(project.id)} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Toggle Visibility">
          {project.status === 'published' ? <Eye size={18} className="text-green-500" /> : <EyeOff size={18} className="text-gray-500" />}
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit Project">
          <Edit size={18} className="text-blue-500" />
        </button>
        <button onClick={() => onDelete(project.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors" title="Delete Project">
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>
    </div>
  );
}

function AddProjectModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    description: "",
    tags: "",
    year: new Date().getFullYear().toString(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New project:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Project</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Title *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Enter project title" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>UI/UX Design</option>
                <option>Branding</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year *</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="2024" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" rows={4} placeholder="Brief project description" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-all">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:scale-105 transition-all">Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UsersContent() {
  const [users, setUsers] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", projectStatus: "Active", projectName: "E-Commerce Platform", joinedDate: "2024-01-15", totalPaid: "₹50,000" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+91 87654 32109", projectStatus: "Completed", projectName: "Healthcare App", joinedDate: "2023-12-10", totalPaid: "₹75,000" },
  ]);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()));

  const addUser = (newUser: any) => {
    setUsers([...users, { ...newUser, id: Date.now().toString() }]);
    setIsAddUserModalOpen(false);
  };

  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Users Management</h2>
          <p className="text-muted-foreground">Manage client accounts and project requests</p>
        </div>
        <button onClick={() => setIsAddUserModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:scale-105 transition-all">
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search users by name or email..." className="w-full pl-12 pr-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
        </div>
        <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-all flex items-center gap-2">
          <Filter size={20} />
          Filter
        </button>
      </div>

      <div className="bg-muted/30 border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total Paid</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarIcon size={12} />
                          Joined {user.joinedDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        {user.email}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone size={14} className="text-muted-foreground" />
                        {user.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4"><p className="font-medium">{user.projectName}</p></td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.projectStatus === 'Active' ? 'bg-blue-500/20 text-blue-500' : user.projectStatus === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>{user.projectStatus}</span>
                  </td>
                  <td className="px-6 py-4"><p className="font-semibold text-green-500">{user.totalPaid}</p></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View Details">
                        <Eye size={18} className="text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Edit">
                        <Edit size={18} className="text-green-500" />
                      </button>
                      <button onClick={() => deleteUser(user.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddUserModalOpen && <AddUserModal onClose={() => setIsAddUserModalOpen(false)} onAdd={addUser} />}
    </div>
  );
}

function AddUserModal({ onClose, onAdd }: { onClose: () => void; onAdd: (user: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: "",
    projectStatus: "Pending",
    joinedDate: new Date().toISOString().split('T')[0],
    totalPaid: "₹0"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New User</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="John Doe" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="john@example.com" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="+91 98765 43210" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project Name *</label>
              <input type="text" value={formData.projectName} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="E-Commerce Platform" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Status *</label>
              <select value={formData.projectStatus} onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                <option>Pending</option>
                <option>Active</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Paid</label>
              <input type="text" value={formData.totalPaid} onChange={(e) => setFormData({ ...formData, totalPaid: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="₹50,000" />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-all">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:scale-105 transition-all">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PaymentsContent() {
  const [payments, setPayments] = useState([
    { id: "1", userName: "John Doe", projectName: "E-Commerce Platform", amount: "₹50,000", transactionId: "TXN123456789", paymentDate: "2024-01-20", status: "Completed", paymentMethod: "UPI" },
    { id: "2", userName: "Jane Smith", projectName: "Healthcare App", amount: "₹75,000", transactionId: "TXN987654321", paymentDate: "2024-01-18", status: "Pending", paymentMethod: "Bank Transfer" },
  ]);

  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredPayments = payments.filter(payment => filterStatus === "All" || payment.status === filterStatus);

  const addPayment = (newPayment: any) => {
    setPayments([...payments, { ...newPayment, id: Date.now().toString() }]);
    setIsAddPaymentModalOpen(false);
  };

  const updatePaymentStatus = (id: string, newStatus: string) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const deletePayment = (id: string) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      setPayments(payments.filter(p => p.id !== id));
    }
  };

  const totalRevenue = payments.filter(p => p.status === "Completed").reduce((sum, p) => sum + parseInt(p.amount.replace(/[₹,]/g, '')), 0);
  const pendingAmount = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + parseInt(p.amount.replace(/[₹,]/g, '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payments Management</h2>
          <p className="text-muted-foreground">Track and manage client payments</p>
        </div>
        <button onClick={() => setIsAddPaymentModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:scale-105 transition-all">
          <Plus size={20} />
          Add Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <IndianRupee size={20} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-500">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Pending Amount</p>
            <Clock size={20} className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-500">₹{pendingAmount.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <TrendingUp size={20} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-500">{payments.length}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {["All", "Completed", "Pending", "Failed"].map((status) => (
          <button key={status} onClick={() => setFilterStatus(status)} className={`px-4 py-2 rounded-lg font-medium transition-all ${filterStatus === status ? "bg-foreground text-background" : "bg-muted/30 hover:bg-muted"}`}>{status}</button>
        ))}
      </div>

      <div className="bg-muted/30 border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">User & Project</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{payment.userName}</p>
                      <p className="text-sm text-muted-foreground">{payment.projectName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4"><p className="font-bold text-green-500">{payment.amount}</p></td>
                  <td className="px-6 py-4"><p className="text-sm font-mono">{payment.transactionId}</p></td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-muted rounded-full text-xs font-semibold">{payment.paymentMethod}</span></td>
                  <td className="px-6 py-4"><p className="text-sm">{payment.paymentDate}</p></td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${payment.status === 'Completed' ? 'bg-green-500/20 text-green-500' : payment.status === 'Pending' ? 'bg-orange-500/20 text-orange-500' : 'bg-red-500/20 text-red-500'}`}>{payment.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {payment.status === 'Pending' && (
                        <>
                          <button onClick={() => updatePaymentStatus(payment.id, 'Completed')} className="p-2 hover:bg-green-50 dark:hover:bg-green-950/20 rounded-lg transition-colors" title="Mark as Completed">
                            <Check size={18} className="text-green-500" />
                          </button>
                          <button onClick={() => updatePaymentStatus(payment.id, 'Failed')} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors" title="Mark as Failed">
                            <XCircle size={18} className="text-red-500" />
                          </button>
                        </>
                      )}
                      <button onClick={() => deletePayment(payment.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddPaymentModalOpen && <AddPaymentModal onClose={() => setIsAddPaymentModalOpen(false)} onAdd={addPayment} />}
    </div>
  );
}

function AddPaymentModal({ onClose, onAdd }: { onClose: () => void; onAdd: (payment: any) => void }) {
  const [formData, setFormData] = useState({
    userName: "",
    projectName: "",
    amount: "",
    transactionId: "",
    paymentDate: new Date().toISOString().split('T')[0],
    status: "Completed",
    paymentMethod: "UPI"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-background border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Add Payment Record</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">User Name *</label>
              <input type="text" value={formData.userName} onChange={(e) => setFormData({ ...formData, userName: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="John Doe" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project Name *</label>
              <input type="text" value={formData.projectName} onChange={(e) => setFormData({ ...formData, projectName: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="E-Commerce Platform" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount *</label>
              <input type="text" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="₹50,000" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Transaction ID *</label>
              <input type="text" value={formData.transactionId} onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="TXN123456789" required />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Payment Method *</label>
              <select value={formData.paymentMethod} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                <option>UPI</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>Cheque</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Payment Date *</label>
              <input type="date" value={formData.paymentDate} onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })} className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" required />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-all">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:scale-105 transition-all">Add Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MessagesContent() {
  return (
    <div className="text-center py-20">
      <MessageSquare size={64} className="mx-auto mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold mb-2">Messages</h2>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
}
