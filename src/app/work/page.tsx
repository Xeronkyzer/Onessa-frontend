"use client";

import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";

const allProjects = [
  {
    id: 1,
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Modern e-commerce solution with seamless checkout and inventory management",
    color: "from-blue-500/10 to-cyan-500/10",
    tags: ["React", "Node.js", "Stripe"],
    year: "2024",
  },
  {
    id: 2,
    slug: "healthcare-app",
    title: "Healthcare App",
    category: "Mobile App",
    description: "Patient management system with telemedicine capabilities",
    color: "from-green-500/10 to-emerald-500/10",
    tags: ["React Native", "Firebase", "WebRTC"],
    year: "2024",
  },
  {
    id: 3,
    slug: "real-estate-portal",
    title: "Real Estate Portal",
    category: "Web Development",
    description: "Property listing platform with virtual tours and mortgage calculator",
    color: "from-orange-500/10 to-red-500/10",
    tags: ["Next.js", "PostgreSQL", "Maps API"],
    year: "2023",
  },
  {
    id: 4,
    slug: "fitness-tracker",
    title: "Fitness Tracker",
    category: "Mobile App",
    description: "AI-powered workout planning and nutrition tracking application",
    color: "from-purple-500/10 to-pink-500/10",
    tags: ["Flutter", "TensorFlow", "HealthKit"],
    year: "2024",
  },
  {
    id: 5,
    slug: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "Web Development",
    description: "Analytics dashboard with real-time data visualization",
    color: "from-indigo-500/10 to-blue-500/10",
    tags: ["Vue.js", "D3.js", "WebSocket"],
    year: "2023",
  },
  {
    id: 6,
    slug: "food-delivery-app",
    title: "Food Delivery App",
    category: "Mobile App",
    description: "On-demand food delivery with live tracking and payment integration",
    color: "from-yellow-500/10 to-orange-500/10",
    tags: ["React Native", "Google Maps", "Stripe"],
    year: "2023",
  },
  {
    id: 7,
    slug: "learning-management-system",
    title: "Learning Management System",
    category: "Web Development",
    description: "Online education platform with video streaming and assessments",
    color: "from-teal-500/10 to-green-500/10",
    tags: ["React", "AWS", "Video.js"],
    year: "2024",
  },
  {
    id: 8,
    slug: "social-media-app",
    title: "Social Media App",
    category: "Mobile App",
    description: "Content sharing platform with stories and live streaming",
    color: "from-pink-500/10 to-rose-500/10",
    tags: ["React Native", "Firebase", "Stream API"],
    year: "2023",
  },
];

export default function WorkPage() {
  const router = useRouter();

  const handleViewDetails = (slug: string) => {
    router.push(`/work/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/#work">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </button>
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Our Work
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Explore our portfolio of successful projects. From startups to enterprises, 
              we've helped businesses achieve their digital goals.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {allProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-muted/30 border border-border rounded-2xl overflow-hidden hover:border-foreground/20 transition-all duration-300"
              >
                {/* Project Image/Placeholder */}
                <div className={`relative h-64 bg-gradient-to-br ${project.color} p-8 flex flex-col justify-between`}>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Top Info */}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wide px-3 py-1 bg-background/80 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-foreground/60 bg-background/80 px-3 py-1 rounded-full backdrop-blur-sm">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>

                  {/* View Details Button - Shows on Hover */}
                  <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleViewDetails(project.slug)}
                      className="w-full px-6 py-3 bg-foreground text-background rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                    >
                      View Details
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-3 py-1 bg-muted rounded-full flex items-center gap-1"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-muted/50 to-muted/30 border border-border rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start your project?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's collaborate and bring your vision to life. Our team is ready to help you succeed.
            </p>
            <Link href="/login">
              <button className="px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
