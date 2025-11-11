"use client";

import { useState, useRef } from "react";
import { Camera, Mail, Phone, Building, Calendar, Save, MapPin } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [company, setCompany] = useState("Acme Inc.");
  const [location, setLocation] = useState("New York, USA");
  const [bio, setBio] = useState("Passionate entrepreneur building digital products that make a difference.");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Stats data
  const stats = [
    { label: "Total Projects", value: "12" },
    { label: "Completed", value: "8" },
    { label: "In Progress", value: "3" },
    { label: "Pending Review", value: "1" },
  ];

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
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-8">My Profile</h1>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-950/20 border border-green-500 text-green-700 dark:text-green-300 rounded-lg animate-fadeIn">
                {successMessage}
              </div>
            )}

            {/* Profile Header Card */}
            <div className="bg-muted/30 border border-border rounded-xl p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-4xl overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      "JD"
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full hover:scale-110 transition-all shadow-lg"
                  >
                    <Camera size={18} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-1">{name}</h2>
                  <p className="text-muted-foreground mb-4">{email}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building size={16} />
                      <span>{company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>Joined Nov 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-muted/30 border border-border rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Edit Profile Form */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Building className="inline w-4 h-4 mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline w-4 h-4 mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-muted/30 border border-border rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">Project Completed</p>
                    <p className="text-sm text-muted-foreground">Brand Identity project was marked as completed</p>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">New Message</p>
                    <p className="text-sm text-muted-foreground">Received a message about E-Commerce Website</p>
                    <span className="text-xs text-muted-foreground">5 days ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">Project Started</p>
                    <p className="text-sm text-muted-foreground">Mobile App Design project has begun</p>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
