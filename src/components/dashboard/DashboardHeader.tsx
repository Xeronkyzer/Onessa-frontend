"use client";

import { Bell, Search, Settings, User, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const notifications = [
  {
    id: 1,
    title: "Project Update",
    message: "Your E-Commerce Website project is now in review",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New Message",
    message: "Admin replied to your Mobile App Design inquiry",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Payment for Brand Identity project confirmed",
    time: "1 day ago",
    read: true,
  },
];

export default function DashboardHeader() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    // Firebase logout will go here
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-border px-6 lg:px-8 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-muted/50 rounded-lg transition-all"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-fadeIn">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${
                      !notif.read ? "bg-muted/20" : ""
                    }`}
                  >
                    <h4 className="font-medium text-sm mb-1">{notif.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{notif.message}</p>
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border text-center">
                <Link href="/dashboard/notifications">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-sm text-primary hover:underline"
                  >
                    View all notifications
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 pl-4 border-l border-border hover:bg-muted/30 rounded-lg p-2 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-fadeIn">
              <div className="p-4 border-b border-border">
                <p className="font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
              <div className="py-2">
                <Link href="/dashboard/profile">
                  <button 
                    onClick={() => setShowProfile(false)}
                    className="w-full px-4 py-2 text-left hover:bg-muted/50 transition-colors flex items-center gap-3"
                  >
                    <User size={18} />
                    <span className="text-sm">My Profile</span>
                  </button>
                </Link>
                <Link href="/dashboard/settings">
                  <button 
                    onClick={() => setShowProfile(false)}
                    className="w-full px-4 py-2 text-left hover:bg-muted/50 transition-colors flex items-center gap-3"
                  >
                    <Settings size={18} />
                    <span className="text-sm">Settings</span>
                  </button>
                </Link>
              </div>
              <div className="border-t border-border py-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 transition-colors flex items-center gap-3"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
