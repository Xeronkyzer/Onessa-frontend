"use client";

import { useState } from "react";
import { AlertCircle, Save } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function SettingsPage() {
  // Account Settings
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [company, setCompany] = useState("Acme Inc.");

  // Password Change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);

  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleAccountSave = () => {
    setSuccessMessage("Account settings saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePasswordChange = () => {
    const newErrors = { newPassword: "", confirmPassword: "" };
    let isValid = true;

    if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setSuccessMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
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
            <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>

            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-950/20 border border-green-500 text-green-700 dark:text-green-300 rounded-lg">
                {successMessage}
              </div>
            )}

            {/* Account Information */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleAccountSave}
                className="mt-4 px-6 py-2.5 bg-foreground text-background rounded-lg font-medium hover:scale-105 transition-all flex items-center gap-2"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>

            {/* Change Password */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPassword) setErrors({ ...errors, newPassword: "" });
                    }}
                    className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none ${
                      errors.newPassword ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.newPassword && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{errors.newPassword}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                    }}
                    className={`w-full px-4 py-2.5 bg-background border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none ${
                      errors.confirmPassword ? "border-red-500" : "border-border"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handlePasswordChange}
                className="mt-4 px-6 py-2.5 bg-foreground text-background rounded-lg font-medium hover:scale-105 transition-all"
              >
                Update Password
              </button>
            </div>

            {/* Notification Preferences */}
            <div className="bg-muted/30 border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-foreground/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Project Updates</p>
                    <p className="text-sm text-muted-foreground">Get notified about project progress</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectUpdates}
                      onChange={(e) => setProjectUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-foreground/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Message Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive alerts for new messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={messageAlerts}
                      onChange={(e) => setMessageAlerts(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-foreground/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
