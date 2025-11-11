"use client";

import { useState, useRef } from "react";
import { X, Upload, File, AlertCircle, Trash2 } from "lucide-react";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState({
    projectName: "",
    projectType: "",
    description: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const validateForm = () => {
    const newErrors = { projectName: "", projectType: "", description: "" };
    let isValid = true;

    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required";
      isValid = false;
    }

    if (!projectType) {
      newErrors.projectType = "Please select a project type";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Project description is required";
      isValid = false;
    } else if (description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log({
        projectName,
        projectType,
        budget,
        deadline,
        description,
        files: files.map(f => f.name),
      });
      // Firebase/backend logic will go here
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-background rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">New Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-6" noValidate>
          <div className="space-y-5">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                  if (errors.projectName) setErrors({ ...errors, projectName: "" });
                }}
                className={`w-full px-4 py-3 bg-muted/30 border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none transition-all ${
                  errors.projectName ? "border-red-500" : "border-border"
                }`}
                placeholder="E.g., E-Commerce Website"
              />
              {errors.projectName && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.projectName}</span>
                </div>
              )}
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                value={projectType}
                onChange={(e) => {
                  setProjectType(e.target.value);
                  if (errors.projectType) setErrors({ ...errors, projectType: "" });
                }}
                className={`w-full px-4 py-3 bg-muted/30 border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none transition-all ${
                  errors.projectType ? "border-red-500" : "border-border"
                }`}
              >
                <option value="">Select project type</option>
                <option value="website">Website Development</option>
                <option value="app">Mobile App</option>
                <option value="design">Design Services</option>
                <option value="branding">Brand Identity</option>
                <option value="other">Other</option>
              </select>
              {errors.projectType && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.projectType}</span>
                </div>
              )}
            </div>

            {/* Budget & Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Budget (Optional)
                </label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
                  placeholder="$5,000 - $10,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors({ ...errors, description: "" });
                }}
                rows={4}
                className={`w-full px-4 py-3 bg-muted/30 border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none transition-all resize-none ${
                  errors.description ? "border-red-500" : "border-border"
                }`}
                placeholder="Describe your project requirements, goals, and any specific features you need..."
              />
              {errors.description && (
                <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Attachments (Optional)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-foreground/50 transition-all cursor-pointer"
              >
                <Upload className="mx-auto mb-3 text-muted-foreground" size={32} />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, images up to 10MB each
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
              />

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                    >
                      <File size={20} className="text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-950/20 text-red-500 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-muted transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all"
          >
            Submit Project
          </button>
        </div>
      </div>
    </div>
  );
}
