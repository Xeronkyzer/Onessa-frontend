"use client";

import { useState } from "react";
import { Bell, Check, Trash2, Filter, BellOff } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const allNotifications = [
  {
    id: 1,
    type: "project",
    title: "Project Update",
    message: "Your E-Commerce Website project is now in review",
    time: "2 hours ago",
    read: false,
    icon: "📦",
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    message: "Admin replied to your Mobile App Design inquiry",
    time: "5 hours ago",
    read: false,
    icon: "💬",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment Received",
    message: "Payment for Brand Identity project confirmed",
    time: "1 day ago",
    read: true,
    icon: "💰",
  },
  {
    id: 4,
    type: "project",
    title: "Project Started",
    message: "Mobile App Design project has been initiated",
    time: "2 days ago",
    read: true,
    icon: "🚀",
  },
  {
    id: 5,
    type: "message",
    title: "New Message",
    message: "You have a new message regarding your project timeline",
    time: "3 days ago",
    read: true,
    icon: "💬",
  },
  {
    id: 6,
    type: "system",
    title: "System Update",
    message: "New features have been added to your dashboard",
    time: "4 days ago",
    read: true,
    icon: "⚙️",
  },
  {
    id: 7,
    type: "project",
    title: "Milestone Completed",
    message: "First milestone of E-Commerce Website completed",
    time: "5 days ago",
    read: true,
    icon: "✅",
  },
  {
    id: 8,
    type: "payment",
    title: "Invoice Sent",
    message: "Invoice for upcoming project has been sent",
    time: "1 week ago",
    read: true,
    icon: "📄",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "project" | "message" | "payment">("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-background flex animate-fadeIn">
      <DashboardSidebar 
        currentView="projects"
        onViewChange={() => {}}
        onNewProject={() => {}}
      />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted/50 transition-all flex items-center gap-2"
                  >
                    <Check size={16} />
                    Mark all as read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-sm font-medium border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-all flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
              <Filter size={18} className="text-muted-foreground" />
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  filter === "all" 
                    ? "bg-foreground text-background" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  filter === "unread" 
                    ? "bg-foreground text-background" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter("project")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  filter === "project" 
                    ? "bg-foreground text-background" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setFilter("message")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  filter === "message" 
                    ? "bg-foreground text-background" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setFilter("payment")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  filter === "payment" 
                    ? "bg-foreground text-background" 
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                Payments
              </button>
            </div>

            {/* Notifications List */}
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 border border-border rounded-xl">
                <BellOff size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  {filter === "all" 
                    ? "You're all caught up! No notifications to show."
                    : `No ${filter} notifications to show.`
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`bg-muted/30 border rounded-xl p-5 hover:border-foreground/20 transition-all group ${
                      !notif.read ? "border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/10" : "border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="text-3xl">{notif.icon}</div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h3 className="font-semibold text-base">{notif.title}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{notif.message}</p>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="text-xs px-3 py-1.5 bg-foreground text-background rounded-lg hover:scale-105 transition-all flex items-center gap-1"
                            >
                              <Check size={14} />
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="text-xs px-3 py-1.5 border border-border rounded-lg hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
