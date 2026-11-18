"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FlaskConical, Code2, Network, Layers } from "lucide-react";

// Animation variants tetap sama
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
    }
};

// Bento card data - gridClass dihapus agar menjadi 2x2 simetris
const bentoCards = [
    {
        id: "divisions",
        title: "4 Core Divisions",
        desc: "Web, Network, Hardware, dan Multimedia",
        icon: Layers,
        iconColor: "text-blue-500",
        iconBg: "bg-blue-100 dark:bg-blue-500/20",
        showStats: true,
    },
    {
        id: "research",
        title: "Research-Driven",
        desc: "Eksplorasi mendalam dari teori ke praktik",
        icon: FlaskConical,
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
    },
    {
        id: "stack",
        title: "Modern Tech Stack",
        desc: "Next.js, TypeScript, Prisma",
        icon: Code2,
        iconColor: "text-violet-500",
        iconBg: "bg-violet-100 dark:bg-violet-500/20",
        showTechBadges: true,
    },
    {
        id: "network",
        title: "Network Security",
        desc: "STP, HSRP, dan protokol jaringan",
        icon: Network,
        iconColor: "text-orange-500",
        iconBg: "bg-orange-100 dark:bg-orange-500/20",
    },
];

const headlineWords = [
    "CERC",
    "empowers",
    "🎓\u00A0students,",
    "🔬\u00A0researchers,",
    "and",
    "💡\u00A0innovators",
    "to",
    "master",
    "technology",
    "from",
    "circuits",
    "to",
    "code,",
    "while",
    "building",
    "real-world",
    "solutions.",
];

function ScrollRevealWord({
    word,
    progress,
    range,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    const opacity = useTransform(progress, range, [0.25, 1]);

    return (
        <span className="relative inline-block mr-[0.26em]">
            <motion.span style={{ opacity }} className="inline-block">
                {word}
            </motion.span>
        </span>
    );
}

export function CoreIdentity() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const cardsInView = useInView(cardsRef, { once: true, margin: "-50px" });
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start 0.85", "end 0.45"],
    });

    return (
        <section ref={sectionRef} className="relative py-16 md:py-20 bg-neutral-50 dark:bg-neutral-950 overflow-hidden border-t border-border">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">

                {/* ========== HEADLINE ========== */}
                <div
                    ref={headerRef}
                    className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-neutral-900 dark:text-white">
                        {headlineWords.map((word, index) => {
                            const start = index / headlineWords.length;
                            const end = start + 1 / headlineWords.length;
                            return (
                                <ScrollRevealWord
                                    key={`${word}-${index}`}
                                    word={word}
                                    progress={scrollYProgress}
                                    range={[start, end]}
                                />
                            );
                        })}
                    </h2>
                </div>

                {/* ========== BENTO GRID (2X2 CONFIGURATION) ========== */}
                <motion.div
                    ref={cardsRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={cardsInView ? "visible" : "hidden"}
                    // Grid diubah menjadi 2 kolom pada desktop (md:grid-cols-2)
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto"
                >
                    {bentoCards.map((card) => (
                        <motion.div
                            key={card.id}
                            variants={cardVariants}
                            transition={{ duration: 0.2 }}
                            // Tinggi kartu dibuat seragam dan tetap menggunakan mode adaptif
                            className="relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 md:p-10 group transition-shadow duration-300 min-h-[300px]"
                        >
                            <div className="flex flex-col h-full">
                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-6`}
                                >
                                    <card.icon className={`w-6 h-6 md:w-7 md:h-7 ${card.iconColor}`} />
                                </div>

                                {/* Title & Desc */}
                                <h3 className="text-lg md:text-2xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                                    {card.title}
                                </h3>
                                <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                    {card.desc}
                                </p>

                                {/* Stats for main card */}
                                {card.showStats && (
                                    <div className="mt-auto pt-8 flex items-center gap-8">
                                        <div>
                                            <p className="text-3xl font-bold text-neutral-900 dark:text-white">20+</p>
                                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Members</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-neutral-900 dark:text-white">15+</p>
                                            <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Projects</p>
                                        </div>
                                    </div>
                                )}

                                {/* Tech badges */}
                                {card.showTechBadges && (
                                    <div className="mt-auto pt-6 flex flex-wrap gap-2">
                                        {["Next.js", "TS", "Prisma"].map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}