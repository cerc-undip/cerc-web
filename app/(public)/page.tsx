import { prisma } from "@/lib/db";
import { LandingPage } from "@/components/home/landing-page";

export const revalidate = 60;

export default async function Page() {
  let divisions: Awaited<ReturnType<typeof fetchDivisions>> = [];
  let members: Awaited<ReturnType<typeof fetchMembers>> = [];

  try {
    [divisions, members] = await Promise.all([
      fetchDivisions(),
      fetchMembers(),
    ]);
  } catch (error) {
    console.error("Failed to fetch landing page data:", error);
  }

  return <LandingPage divisions={divisions} members={members} />;
}

async function fetchDivisions() {
  return prisma.division.findMany({
    orderBy: [{ order: "asc" }, { title: "asc" }],
    include: {
      projects: {
        take: 3,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          demoUrl: true,
          githubUrl: true,
        },
      },
      members: {
        take: 4,
        orderBy: { order: "asc" },
        select: {
          id: true,
          name: true,
          role: true,
          imageUrl: true,
        },
      },
      _count: { select: { projects: true, members: true } },
    },
  });
}

async function fetchMembers() {
  return prisma.member.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      role: true,
      imageUrl: true,
    },
  });
}