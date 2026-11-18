import { Navbar } from "@/components/Navbar";
import { ConditionalFooter } from "@/components/public/conditional-footer";
import ReactLenis from "lenis/react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactLenis root />
      <Navbar />
      
      {/* Main content with top padding for fixed navbar */}
      <main className="min-h-screen w-full"> 
          {children}
      </main>
      
      <ConditionalFooter />
    </>
  );
}