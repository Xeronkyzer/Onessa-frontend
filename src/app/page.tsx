import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import SelectedWork from "@/components/landing/SelectedWork";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <SelectedWork />
      
      {/* Dark section - rounded top only, extends to bottom */}
      <div className="bg-black rounded-t-[80px]">
        <About />
        <Contact />
      </div>
    </main>
  );
}
