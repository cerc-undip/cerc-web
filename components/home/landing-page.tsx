"use client";

import { useState, useLayoutEffect } from "react";
import Intro from "@/components/Intro";
import { Hero } from "@/components/home/Hero";
import { CoreIdentity } from "@/components/home/CoreIdentity";
import { LMSSection } from "@/components/home/LMSSection";
import { CTASection } from "@/components/home/CTASection";

interface Member {
  id: string;
  name: string;
  role: string | null;
  imageUrl: string | null;
}

interface Project {
  id: string;
  title: string;
  demoUrl: string | null;
  githubUrl: string | null;
}

interface Division {
  id: string;
  title: string;
  description: string;
  iconName: string;
  slug: string;
  projects: Project[];
  members: Member[];
  _count: {
    projects: number;
    members: number;
  };
}

export function LandingPage({ divisions, members = [] }: { divisions: Division[]; members?: Member[] }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // useLayoutEffect prevents flash. Using setTimeout to avoid set-state-in-effect warning.
  useLayoutEffect(() => {
    // Check session storage to see if user has visited before in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplashSession");

    // Only show splash if they haven't seen it
    if (!hasSeenSplash) {
      setTimeout(() => {
        setShowSplash(true);
        setIsChecking(false);
      }, 0);
    } else {
      setTimeout(() => {
        setIsChecking(false);
      }, 0);
    }
  }, []);

  const handleFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplashSession", "true");
  };

  if (isChecking) return <div className="min-h-screen bg-background" />;


  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {showSplash ? (
        <Intro onFinish={handleFinish} />
      ) : (
        <main className="flex-1 w-full animate-in fade-in duration-1000 slide-in-from-bottom-4">

          {/* ========== 1. HERO + TRUST SECTIONS ========== */}
          <Hero members={members} divisions={divisions} />

          {/* ========== 2. CORE IDENTITY SECTION ========== */}
          <CoreIdentity />

          {/* ========== 3. LMS SECTION ========== */}
          <LMSSection />

          {/* ========== 4. CTA SECTION ========== */}
          <CTASection />

        </main>
      )}
    </div>
  );
}