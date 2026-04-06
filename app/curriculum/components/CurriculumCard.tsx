import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

interface CurriculumCardProps {
  id: string;
  title: string;
  link?:string;
  description: string;
  level: string;
  status: "completed" | "active" | "locked";
  unlockRequirement?: string;
}

export default function CurriculumCard({
  id,
  title,
  link,
  description,
  level,
  status,
  unlockRequirement,
}: CurriculumCardProps) {
  const isCompleted = status === "completed";
  const isActive = status === "active";
  const isLocked = status === "locked";

  return (
    <div
      className={`group relative p-8 h-full flex flex-col transition-all duration-500 ${
        isActive
          ? "bg-surface-container border border-primary/20 ring-1 ring-primary/10 active-path-glow transform hover:-translate-y-2"
          : isLocked
          ? "bg-surface-container-lowest border border-outline-variant/5 opacity-60 grayscale"
          : "bg-surface-container-low border border-outline-variant/10 hover:border-primary/30"
      }`}
    >
      {/* Top Section: ID and Icon/Badge */}
      <div className="flex justify-between items-start mb-12">
        <span
          className={`font-headline text-2xl ${
            isLocked ? "text-outline/40" : "text-primary"
          }`}
        >
          {id}
        </span>

        {isCompleted && <CheckCircle2 className="text-tertiary w-6 h-6" />}
        
        {isActive && (
          <div className="px-2 py-1 border border-primary/50 text-[9px] text-primary animate-pulse uppercase tracking-widest">
            In Progress
          </div>
        )}
        
        {isLocked && <Lock className="text-outline/40 w-5 h-5" />}
      </div>

      {/* Middle Section: Content */}
      <h3
        className={`text-2xl font-headline mb-4 ${
          isLocked ? "text-outline/60" : isActive ? "text-primary" : "text-on-surface"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm mb-8 grow ${
          isLocked ? "text-outline/40" : "text-outline"
        }`}
      >
        {description}
      </p>

      {/* Bottom Section: Footer/Action */}
      <div className={`pt-6 border-t ${isLocked ? "border-outline-variant/10 text-center" : "border-outline-variant/10 flex justify-between items-center"}`}>
        {isLocked ? (
          <span className="text-[9px] uppercase tracking-widest text-tertiary/50">
            {unlockRequirement || "Locked"}
          </span>
        ) : (
          <>
            <span className="text-[10px] uppercase tracking-widest text-outline">
              {level}
            </span>
            {isActive ? (
              <Link href={`/curriculum/${link}`}>
                <button className="bg-primary text-on-primary px-4 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors">
                  Continue Path
                </button>
              </Link>
            ) : (
              <button className="text-primary text-xs uppercase flex items-center gap-2 hover:text-tertiary transition-colors">
                Review Scroll <ArrowRight size={14} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}