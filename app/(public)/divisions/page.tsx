import { prisma } from "@/lib/db";
import { SectionHeader } from "@/components/public/section-header";
import { Pagination } from "@/components/public/pagination";
import Link from "next/link";
import { Suspense } from "react";
import {
  AppWindow,
  Network,
  Cpu,
  Clapperboard,
  FolderKanban,
  ArrowUpRight,
  Users,
  Trophy,
  LucideIcon,
} from "lucide-react";

export const revalidate = 60;

const ITEMS_PER_PAGE = 12;

const iconMap: Record<string, LucideIcon> = {
  AppWindow,
  Network,
  Cpu,
  Clapperboard,
  FolderKanban,
};

const divisionAccentMap: Record<
  string,
  {
    iconBg: string;
    iconText: string;
    hoverBorder: string;
    glow: string;
    titleHover: string;
  }
> = {
  software: {
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    iconText: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-500/40",
    glow: "from-blue-500/15",
    titleHover: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  network: {
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconText: "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/40",
    glow: "from-emerald-500/15",
    titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  networking: {
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconText: "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/40",
    glow: "from-emerald-500/15",
    titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
  embedded: {
    iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
    iconText: "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-500/40",
    glow: "from-orange-500/15",
    titleHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400",
  },
  multimedia: {
    iconBg: "bg-purple-500/10 dark:bg-purple-500/15",
    iconText: "text-purple-600 dark:text-purple-400",
    hoverBorder: "hover:border-purple-500/40",
    glow: "from-purple-500/15",
    titleHover: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
  },
};

const defaultAccent = {
  iconBg: "bg-primary/10",
  iconText: "text-primary",
  hoverBorder: "hover:border-primary/40",
  glow: "from-primary/10",
  titleHover: "group-hover:text-primary",
};

export default async function DivisionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const [divisions, totalCount] = await Promise.all([
    prisma.division.findMany({
      orderBy: [{ order: "asc" }, { title: "asc" }],
      include: {
        _count: { select: { projects: true, members: true, achievements: true } },
      },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.division.count(),
  ]);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-8">
      <SectionHeader
        title="Our Divisions"
        description="Specialized research groups pushing the boundaries of computer engineering fields."
        className="text-center"
      />

      {divisions.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border-2 border-dashed border-border bg-muted/50">
          <p className="text-muted-foreground font-medium">No divisions found.</p>
        </div>
      ) : (
        <>
          {/* Divisions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {divisions.map((division) => {
              const Icon = iconMap[division.iconName] || FolderKanban;
              const accent =
                divisionAccentMap[division.slug.toLowerCase()] || defaultAccent;

              return (
                <Link
                  key={division.id}
                  href={`/divisions/${division.slug}`}
                  className={`group relative overflow-hidden flex flex-col justify-between bg-card border border-border rounded-3xl p-6 md:p-8 ${accent.hoverBorder} hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
                >
                  {/* Subtle corner glow on hover */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-20 -right-20 w-52 h-52 rounded-full bg-gradient-to-br ${accent.glow} to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Top row: Icon + Always-visible Arrow */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${accent.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${accent.iconText}`} />
                      </div>

                      <div className="w-9 h-9 rounded-full border border-border bg-background/70 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground/20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2
                      className={`text-xl md:text-2xl font-bold font-mono text-foreground mb-2 transition-colors ${accent.titleHover}`}
                    >
                      {division.title}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                      {division.description ||
                        `Specialized research group focused on ${division.title.toLowerCase()}.`}
                    </p>
                  </div>

                  {/* Stats Pills */}
                  <div className="relative z-10 flex flex-wrap items-center gap-2 pt-4 border-t border-border/60">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 border border-border/60 px-3 py-1 text-xs font-mono text-muted-foreground">
                      <FolderKanban className="w-3.5 h-3.5" />
                      <span className="font-semibold text-foreground">
                        {division._count.projects}
                      </span>
                      projects
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 border border-border/60 px-3 py-1 text-xs font-mono text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      <span className="font-semibold text-foreground">
                        {division._count.members}
                      </span>
                      members
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 border border-border/60 px-3 py-1 text-xs font-mono text-muted-foreground">
                      <Trophy className="w-3.5 h-3.5" />
                      <span className="font-semibold text-foreground">
                        {division._count.achievements}
                      </span>
                      achievements
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <Suspense fallback={null}>
            <Pagination
              totalItems={totalCount}
              itemsPerPage={ITEMS_PER_PAGE}
              className="mt-8"
            />
          </Suspense>
        </>
      )}
    </div>
  );
}