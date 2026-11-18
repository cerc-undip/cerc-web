import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/divisions",
    "/projects",
    "/members",
    "/tech-stack",
    "/achievements",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    const divisions = await prisma.division.findMany({
      select: { slug: true, updatedAt: true },
    });

    const divisionRoutes: MetadataRoute.Sitemap = divisions.map((div) => ({
      url: `${baseUrl}/divisions/${div.slug}`,
      lastModified: div.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...divisionRoutes];
  } catch {
    return staticRoutes;
  }
}
