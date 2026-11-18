"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

// --- SYSTEM INITIALIZATION (Fixes the Build Error) ---
export async function initializeSystem() {
  await requireSession();
  const divisions = [
    { 
      title: "Software Engineering", 
      slug: "software", 
      description: "Web, Mobile, and AI development.", 
      iconName: "AppWindow", 
      colorClass: "text-blue-600" 
    },
    { 
      title: "Computer Networks", 
      slug: "network", 
      description: "Cloud, Security, and Infrastructure.", 
      iconName: "Network", 
      colorClass: "text-emerald-600" 
    },
    { 
      title: "Embedded Systems", 
      slug: "embedded", 
      description: "IoT, Robotics, and Hardware.", 
      iconName: "Cpu", 
      colorClass: "text-orange-600" 
    },
    { 
      title: "Multimedia", 
      slug: "multimedia", 
      description: "UI/UX, Game Dev, and Creative Tech.", 
      iconName: "Clapperboard", 
      colorClass: "text-purple-600" 
    },
  ];

  for (const div of divisions) {
    await prisma.division.upsert({
      where: { slug: div.slug },
      update: {}, // Do nothing if exists
      create: div,
    });
  }

  revalidatePath("/admin");
}

// --- DIVISIONS (Create/Update/Delete) ---
export async function createDivision(formData: FormData) {
  await requireSession();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const iconName = (formData.get("iconName") as string) || "FolderKanban";

  await prisma.division.create({
    data: { title, slug, description, iconName },
  });
  revalidatePath("/admin/divisions");
}

export async function updateDivision(formData: FormData) {
  await requireSession();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const iconName = (formData.get("iconName") as string) || "FolderKanban";

  await prisma.division.update({
    where: { id },
    data: { title, slug, description, iconName },
  });
  revalidatePath("/admin/divisions");
}

export async function deleteDivision(id: string) {
  await requireSession();
  await prisma.division.delete({ where: { id } });
  revalidatePath("/admin/divisions");
}

export async function reorderDivisions(orderData: { id: string; order: number }[]) {
  await requireSession();
  // Update each division's order in a transaction
  await prisma.$transaction(
    orderData.map(({ id, order }) =>
      prisma.division.update({
        where: { id },
        data: { order },
      })
    )
  );
  revalidatePath("/admin/divisions");
  revalidatePath("/");
}

// --- PROJECTS ---
export async function createProject(formData: FormData) {
  await requireSession();
  const divisionId = formData.get("divisionId") as string;
  
  await prisma.project.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
      demoUrl: (formData.get("demoUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      divisionId,
    },
  });
  revalidatePath("/admin/projects");
}

export async function updateProject(formData: FormData) {
  await requireSession();
  const id = formData.get("id") as string;

  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
      demoUrl: (formData.get("demoUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      divisionId: formData.get("divisionId") as string,
    },
  });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireSession();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

export async function reorderProjects(orderData: { id: string; order: number }[]) {
  await requireSession();
  await prisma.$transaction(
    orderData.map(({ id, order }) =>
      prisma.project.update({ where: { id }, data: { order } })
    )
  );
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

// --- MEMBERS ---
export async function createMember(formData: FormData) {
  await requireSession();
  const divisionId = formData.get("divisionId") as string;

  await prisma.member.create({
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      imageUrl: formData.get("imageUrl") as string,
      github: (formData.get("github") as string) || null,
      linkedin: (formData.get("linkedin") as string) || null,
      divisionId,
    },
  });
  revalidatePath("/admin/members");
}

export async function updateMember(formData: FormData) {
  await requireSession();
  const id = formData.get("id") as string;

  await prisma.member.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      imageUrl: formData.get("imageUrl") as string,
      github: (formData.get("github") as string) || null,
      linkedin: (formData.get("linkedin") as string) || null,
      divisionId: formData.get("divisionId") as string, // Allow changing division
    },
  });
  revalidatePath("/admin/members");
}

export async function deleteMember(id: string) {
  await requireSession();
  await prisma.member.delete({ where: { id } });
  revalidatePath("/admin/members");
}

export async function reorderMembers(orderData: { id: string; order: number }[]) {
  await requireSession();
  await prisma.$transaction(
    orderData.map(({ id, order }) =>
      prisma.member.update({ where: { id }, data: { order } })
    )
  );
  revalidatePath("/admin/members");
  revalidatePath("/members");
}

// --- ACHIEVEMENTS ---
export async function createAchievement(formData: FormData) {
  await requireSession();
  const divisionId = formData.get("divisionId") as string;

  await prisma.achievement.create({
    data: {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      issuer: formData.get("issuer") as string,
      winner: formData.get("winner") as string,
      imageUrl: formData.get("imageUrl") as string,
      linkUrl: (formData.get("linkUrl") as string) || null,
      divisionId,
    },
  });
  revalidatePath("/admin/achievements");
}

export async function updateAchievement(formData: FormData) {
  await requireSession();
  const id = formData.get("id") as string;

  await prisma.achievement.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      issuer: formData.get("issuer") as string,
      winner: formData.get("winner") as string,
      imageUrl: formData.get("imageUrl") as string,
      linkUrl: (formData.get("linkUrl") as string) || null,
      divisionId: formData.get("divisionId") as string,
    },
  });
  revalidatePath("/admin/achievements");
}

export async function deleteAchievement(id: string) {
  await requireSession();
  await prisma.achievement.delete({ where: { id } });
  revalidatePath("/admin/achievements");
}

export async function reorderAchievements(orderData: { id: string; order: number }[]) {
  await requireSession();
  await prisma.$transaction(
    orderData.map(({ id, order }) =>
      prisma.achievement.update({ where: { id }, data: { order } })
    )
  );
  revalidatePath("/admin/achievements");
  revalidatePath("/achievements");
}

// --- TECH STACK ---
export async function createTechStack(formData: FormData) {
  await requireSession();
  const divisionId = formData.get("divisionId") as string;

  await prisma.techStack.create({
    data: {
      name: formData.get("name") as string,
      imageUrl: formData.get("imageUrl") as string,
      websiteUrl: (formData.get("websiteUrl") as string) || null,
      divisionId,
    },
  });
  revalidatePath("/admin/tech-stack");
}

export async function deleteTechStack(id: string) {
  await requireSession();
  await prisma.techStack.delete({ where: { id } });
  revalidatePath("/admin/tech-stack");
}

export async function updateTechStack(formData: FormData) {
  await requireSession();
  const id = formData.get("id") as string;

  await prisma.techStack.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      imageUrl: formData.get("imageUrl") as string,
      websiteUrl: (formData.get("websiteUrl") as string) || null,
      divisionId: formData.get("divisionId") as string,
    },
  });
  revalidatePath("/admin/tech-stack");
  revalidatePath("/tech-stack");
}

export async function reorderTechStack(orderData: { id: string; order: number }[]) {
  await requireSession();
  await prisma.$transaction(
    orderData.map(({ id, order }) =>
      prisma.techStack.update({ where: { id }, data: { order } })
    )
  );
  revalidatePath("/admin/tech-stack");
  revalidatePath("/tech-stack");
}